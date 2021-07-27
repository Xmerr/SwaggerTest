const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const cors = require('koa2-cors');
const { koaSwagger } = require('koa2-swagger-ui')
const { router, config } = require('./swagRouter');

const app = new Koa()

const petRouter = require('./routes/petRouter');

app.use(koaSwagger(config))
    .use(cors({ allowMethods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'] }))
    .use(bodyparser({ enableTypes: ['json'] }))
    .use(petRouter.routes())
    .use(router.routes());

const server = app.listen(3400, () => {
    console.log(`API running on 3400`); // eslint-disable-line no-console
});

module.exports = server;