const path = require('path')
const express = require('express')
const logger = require('morgan')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const rootRouter = require('./routes/root')
const clucksRouter = require('./routes/clucks')
const { request, response } = require('express')
const knex = require('./db/client')

const app = express()
app.set("view engine", "ejs")

app.use(logger('dev'))


app.use(express.static(path.join(__dirname, 'public')))


app.use(cookieParser())


app.use(express.urlencoded({ extended: false }))

app.use(methodOverride((request, response) => {
  if (request.body && request.body._method) {
    const method = request.body._method

    delete request.body._method

    return method
  }
}))


app.use((request, response, next) => {
    
  const { username } = request.cookies
  response.locals.username = username
  next()
})


app.get('/', (request, response) => {
  response.render('new_cluck')
})

app.get('/show', (request, response) => { // The route is prepended already with /articles
  knex
  .select('*')
  .from('clucks')
  .then(data => {
    response.render('show', {clucks: data})
  })
})


app.post('/show', (request, response) => { // The route
  const { content, image } = request.body

  knex('clucks')
    .insert({
      content,
      image,
     
    }, "*") 
    .then(data => {
      //response.send(data)
      response.redirect('/show') 
    })
})



app.use('/', rootRouter)
app.use('/clucks', clucksRouter)


const PORT = process.env.PORT || 3000
const ADDRESS = 'localhost' // 127.0.0.1

app.listen(PORT, ADDRESS, () => {
  console.log(`Server listenning on http://${ADDRESS}:${PORT}`)
})