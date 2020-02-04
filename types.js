/**
 * Email
 * @typedef {Object<string, any>} Person
 * @property {string} Email
 * @property {string} Name
 */
/**
 * Message
 * @typedef {Object<string, any>} Message
 * @property {Person} From
 * @property {Person[]} To
 * @property {string} Subject
 * @property {string} TextPart
 * @property {string} HTMLPart
 */
/**
 * Expected Inputs
 * @typedef {Object<string, any>} Contact
 * @property {string} text
 * @property {string} subject
 */
/**
 * Expected Output
 * @typedef {Object<string, any>} Output
 * @property {Message[]} Messages
 */
