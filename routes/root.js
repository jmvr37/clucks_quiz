const express = require('express')
const router = express.Router()



router.get('/hello_world', (request, response) => {
  response.send('<h1>Hello, World!</h1>')
})

router.get('/', (request, response) => {
  response.render('welcome')
})

router.get('/sign_in', (request, response) => {
    response.render('sign_in')
})

router.get('/new_cluck', (request, response) => {
    response.render('new_cluck')
})


// router.get('/contact_us', (request, response) => response.render('contact'))

//router.get('/thank_you', (request, response) => {
  // http://localhost:3000/thank_you?name=Anson&email=anson%40codecore.ca&message=Have+a+great+day
  // scheme| address |port|   path  | query

  // The "query" comes after the "?" in the URL. It encodes data as key-value pairs in the URL
  // itself. When a form gets submitted with a GET request, the query is included with the
  // request and we'll see it in the url. The key-value pairs store data from the form's inputs.
  
  // The encoding format looks like this:
  // ?key_1=value1&key_2=value_2&key3=value_3
  // Express takes the query string and converts it to an object
  // which we can access from "request.query".
  // { 
  //   key_1: value_1, 
  //   key_2: value_2, 
  //   key_3: value_3, 
  // }

  // "response.send()" is useful for debugging if you want to see the output
  // in the browser. Use it like you would use "console.log()".
  // response.send(request.query)

  //const { name, email, message } = request.query
  // const name = request.query.name
  // const email = request.query.email
  // const message = request.query.message

  // We can pass an object as a second argument to "render" for our
  // local variables. These variables are availabe for us to use in 
  // the template that we render: { variableName: variableValue, }
//   response.render('thank_you', {
//     name, // name: name
//     email,
//     message,
//   })
// })



const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30 // number of milliseconds in 30 days
router.post('/sign_in', (request, response) => {
  // This route handles a POST request instead of a GET. Only with GET requests is the 
  // form data available in the query string e.g. "request.query". With a POST request,
  // we access the data from "request.body", which is only available if the "urlencoded"
  // middleware is used. It will contain data from an HTML form submitted from a POST request.
  const { username } = request.body

  // "response.cookie" is available for us to use if the "cookie-parser" middleware was
  // setup. Use it to send back cookies to the client. The arguments are:
  // response.cookie(<name-of-cookie>, <value-of-cookie>, <options>)
  // The "maxAge" property of <options> sets the age of the cookie. The time starts from when 
  // the cookie was set, plus the number of milliseconds for the age until expiration.
  response.cookie("username", username, { maxAge: COOKIE_MAX_AGE })

  // Like "response.send" and "response.render", "response.redirect" also terminates the
  // response. It sets a redirect status code (300s) and it also makes a follow-up 
  // request to the provided location. In this case, the request will go through all
  // our middleware again and hit our route handler that renders our welcome page (i.e. "/")
  response.redirect('/')
})

router.post('/sign_out', (request, response) => {
  // Deletes the cookie named 'username'
  response.clearCookie('username')
  response.redirect('/')
})

module.exports = router