// import * as Types from './types'

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
}

/**
 * @param {Message} message
 */
const sendMail = async message => {
  // convert inputs to expected outputs
  /** @type {Output} */
  const data = {
    Messages: [
      {
        ...defaults,
        ...message,
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

export default sendMail
