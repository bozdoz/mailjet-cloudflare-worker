import handleRequest from './src/handleRequest'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
