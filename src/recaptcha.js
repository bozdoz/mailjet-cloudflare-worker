/**
 * Google Response
 * @typedef {Object<string, any>} GoogleResponse
 * @property {boolean} success
 * @property {number} score
 * @property {string} action
 * @property {string} [challenge_ts] ISO formatted timestamp
 * @property {string} hostname
 */

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET

/**
 * Uses Google Recaptcha v3 to prevent spam from bots
 * @param {string} token
 */
const recaptcha = async token => {
  const data = {
    secret: RECAPTCHA_SECRET,
    response: token,
  }

  /** @type {GoogleResponse} */
  const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(resp => resp.json())

  const { success, score, action, challenge_ts, hostname } = resp

  return success && score > 0.5
}

export default recaptcha
