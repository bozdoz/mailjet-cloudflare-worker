/**
 * VSCode Intellisense Types:
 * https://medium.com/@trukrs/type-safe-javascript-with-jsdoc-7a2a63209b76
 */
/**
 * Email Type
 * @typedef {Object<string, any>} Person
 * @property {string} Email
 * @property {string} Name
 */
/**
 * Message Type
 * @typedef {Object<string, any>} Message
 * @property {Person} From
 * @property {Person[]} To
 * @property {string} Subject
 * @property {string} TextPart
 * @property {string} HTMLPart
 */
/**
 * Expected Output type
 * @typedef {Object<string, any>} Output
 * @property {Message[]} Messages
 */
