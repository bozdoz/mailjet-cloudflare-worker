/**
 * VSCODE IntelliSense types
 * @typedef {import('./types').Message} Message
 * @typedef {import('./types').Contact} Contact
 * @typedef {import('./types').Output} Output
 */

const MJ_APIKEY_PUBLIC = process.env.MJ_APIKEY_PUBLIC
const MJ_APIKEY_PRIVATE = process.env.MJ_APIKEY_PRIVATE
const TO_EMAIL = process.env.TO_EMAIL
const FROM_EMAIL = process.env.FROM_EMAIL

/**
 * @type {Message}
 */
const defaults = {
  From: {
    Email: FROM_EMAIL,
  },
  To: [
    {
      Email: TO_EMAIL,
    },
  ],
  Subject: 'Subject Line',
  TextPart: 'Lots of text!',
  HTMLPart: '<h1>Header</h1><p>Hello there</p>',
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  let message = {}
  let status = 200

  try {
    if (request.method !== 'POST') {
      status = 405
      throw new Error(
        'Must use POST method, with fields: {TextPart, HTMLPart, Subject}',
      )
    }

    // TODO: add captcha service

    /** @type {Message} */
    const body = await request.json()

    if (!body.TextPart) {
      throw new Error(
        'TextPart field is required! Optional: {HTMLPart, Subject}',
      )
    }

    /** @type {Message} */
    const contact = {
      TextPart: body.TextPart,
    }

    // be safe about which fields we add
    ;['Subject', 'HTMLPart'].forEach(field => {
      if (body[field]) {
        contact[field] = body[field]
      }
    })

    const resp = await sendMail(contact)

    if (!resp.ok) {
      status = resp.status
      const output = await resp.json()
      throw new Error(output)
    }

    message.success = true
  } catch (e) {
    message.error = e.message
    if (status === 200) {
      status = 400
    }
  }

  return new Response(JSON.stringify(message), {
    status,
    headers: {
      // JSON response
      'content-type': 'application/json;charset=UTF-8',
      // CORS
      'Access-Control-Allow-Origin': '*',
      // caching
      Vary: 'Origin',
    },
  })
}

/**
 * Sends the email
 * @param {Message} contact
 */
const sendMail = async contact => {
  // convert inputs to expected outputs
  /** @type {Output} */
  const data = {
    Messages: [
      {
        ...defaults,
        ...contact,
      },
    ],
  }

  return fetch(`https://api.mailjet.com/v3.1/send`, {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' + btoa(`${MJ_APIKEY_PUBLIC}:${MJ_APIKEY_PRIVATE}`),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}
