const Router = require('koa-router');;
const swaggerJsdoc = require('swagger-jsdoc');

const swagRouter = new Router({ prefix: '/swag' });

const config = {
    routePrefix: '/swagger', // Where to find the docs
    swaggerOptions: {
        url: 'http://localhost:3400/swag', // Where to pull the doc config from - could be stored in the config yamls
    },
}

swagRouter.get('/', async ctx => {

    // Not 100% sure if we have any use cases for this, but we could pull data from our databases and change what's in the docs based on that.
    // For instance, if you have to pass in a permission id on one of the routes we could get a list of the uuids here and set a value in the `openapiSpecification` that'll render on the docs

    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Swagger + JSDoc Test',
                version: '0.0.1',
            },
            tags: [
                {
                    name: 'Pet',
                    description: 'Everything about your pet'
                }
            ],
        },
        apis: ['./routes/*.js'],
    };

    const openapiSpecification = swaggerJsdoc(options);
    ctx.body = openapiSpecification;
});

module.exports = {
    router: swagRouter,
    config
};