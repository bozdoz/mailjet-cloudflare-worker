// import * as Types from './types'

import sendMail from './sendMail'
import validateFields from './validateFields'

/**
 * Respond with a message indicating whether the email has been sent
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

    /** @type {Message} */
    const body = await request.json()

    await validateFields(body)

    /** @type {Message} */
    const contact = {}

    // be safe about which fields we add
    ;['TextPart', 'Subject', 'HTMLPart'].forEach(field => {
      if (body[field]) {
        contact[field] = body[field]
      }
    })

    const resp = await sendMail(contact)

    if (!resp.ok) {
      status = resp.status
      const output = await resp.json()
      throw new Error(output.ErrorMessage)
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

export default handleRequest
