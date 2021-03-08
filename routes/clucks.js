const knex = require('../db/client')
const router = require('express').Router()


// router.get('/', (request, response) => {
//     knex('clucks')
//       .orderBy('created_at', 'DESC')
//       .then(clucks => response.render('/welcome', { clucks }))
//   })

// router.get('/new_cluck', (request, response) => { // The route is prepended already with /articles
//     knex
//     .select('*')
//     .from('clucks')
//     .then(data => {
//       response.render('show', {clucks: data})
//     })
//   })


// router.post('/show', (request, response) => { // The route
//     const { content, image } = request.body
  
//     knex('clucks')
//       .insert({
//         content,
//         image,
//       }, "*") // 2nd arg of "*" outputs an array of objects representing the rows that we inserted
//       .then(() => {
//         // This path is from the host, not /articles
//         // It allows us to redirect to other routers
//         response.redirect('/show') 
//       })
//   })

module.exports = router