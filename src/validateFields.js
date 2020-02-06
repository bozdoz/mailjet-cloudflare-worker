import * as Types from './types'
import recaptcha from './recaptcha'

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET

/**
 * @param {Message} body
 */
const validateFields = async body => {
  if (!body.TextPart && !body.HTMLPart) {
    throw new Error(
      'Either TextPart or HTMLPart fields must be sent! Optional: {Subject}',
    )
  }

  if (RECAPTCHA_SECRET) {
    // secret means that google recaptcha has been setup
    // verify that the request is not from a bot
    if (!body.token) {
      throw new Error('Captcha token not submitted')
    }

    const verified = await recaptcha(body.token)

    if (!verified) {
      throw new Error('Captcha verification failed')
    }
  }
}

export default validateFields
