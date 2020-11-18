const app = require('express')()

const movieController = require('./movieController')

function buildRoutes(app) {
  app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
      console.log(`${Object.keys(r.route.methods)[0].toUpperCase()} ${r.route.path}`);
    } else if (r.handle && r.handle.stack) {
      const controllerMountedString = r.regexp.toString().match(/(\/[a-z]+\\?)+/)[0]
      
      r.handle.stack.forEach((handler) => {        
        const method = Object.keys(handler.route.methods)[0].toUpperCase()
        const path = handler.route.path

        const final = `${method} ${controllerMountedString}${path}`
        console.log(final.split('\\').join(''))
        // it's dumb that r has a regex for its mounting location but not a path?
        // morgan can get the routes, how does it do it?
        // recur
        // handle path regex edge cases
        
      })
    }
  })
}

app.get('/routes', (req, res) => {
  buildRoutes(app)

  res.send('look at your terminal dummy')
})


app.use('/movies/newest', movieController)

app.listen(3000)
