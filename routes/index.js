const user = require('./userRoutes')
const admin = require('./adminRoutes')

const routes = (app) => {
  app.use('/admin', admin)
  app.use('/user', user)
  app.use('/', user)
}

module.exports = routes;
