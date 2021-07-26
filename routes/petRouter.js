const Router = require('koa-router');
const uuid = require('uuid').v4;

const petRouter = new Router({ prefix: '/pet' });
let pets = [
    {
        id: uuid(),
        name: 'Mr. Peanut Butter',
        type: 'dog'
    },
    {
        id: uuid(),
        name: 'Doctor Curt Connors',
        type: 'reptile'
    },
    {
        id: uuid(),
        name: 'Princess Carolyn',
        type: 'cat'
    },
];

/**
 * @swagger
 * definitions:
 *      Pet:
 *          type: object
 *          required:
 *              - name
 *              - type
 *          properties:
 *              name:
 *                  type: string
 *                  description: Name of the animal
 *                  example: Fluffy
 *              type:
 *                  type: string
 *                  description: What type of animal is this 
 *                  enum:
 *                      - dog
 *                      - cat
 *                      - bird
 *                      - reptile
 */

/**
 * @swagger
 * /pet:
 *      post:
 *          tags: [Pet]
 *          summary: Adds a new pet
 *          description: Adds a new pet to the temporary array
 *          requestBody:
 *              description: Pet to be added
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Pet'
 *          responses:
 *              201:
 *                  description: Successfully Added Pet
 */
petRouter.post('/', async ctx => {
    const { name, type } = ctx.request.body;

    pets.push({
        id: uuid(),
        name,
        type
    });

    ctx.status = 201;
    ctx.body = pets;
});

/**
 * @swagger
 * /pet:
 *   get:
 *     tags: [Pet]
 *     summary: Gets all pets
 *     description: Returns all the pets currently being tracked
 *     responses:
 *       200:
 *         description: All the gets are returned
 */
petRouter.get('/', async ctx => {
    ctx.status = 200;
    ctx.body = pets;
});

/**
 * @swagger
 * /pet/{petId}:
 *   put:
 *     tags: [Pet]
 *     summary: Update Pet
 *     description: Updates the specified pet coming in
 *     parameters:
 *          - name: petId
 *            in: path
 *            description: ID of pet
 *            required: true
 *            type: integer
 *            format: int64
 *     requestBody:
 *          description: Pet to be added
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/Pet'
 *     responses:
 *       200:
 *         description: All the gets are returned
 *       404:
 *         description: Couldn't find the specified pet
 */
petRouter.put('/:id', async ctx => {
    const { id } = ctx.params;
    const { name, type } = ctx.request.body;

    let found = false;

    pets = pets.map(pet => {
        if(pet.id !== id) {
            return pet;
        }

        found = true;

        return {
            id,
            name,
            type,
        };
    });

    if(!found) {
        ctx.throw(404, 'Could not find pet');
    }

    ctx.status = 200;
    ctx.body = pets;
});

/**
 * @swagger
 * /pet/{petId}:
 *   delete:
 *     tags: [Pet]
 *     summary: Removes Pet
 *     description: Removes the specified pet from the list
 *     parameters:
 *          - name: petId
 *            in: path
 *            description: ID of pet
 *            required: true
 *            type: integer
 *            format: int64
 *     responses:
 *       200:
 *         description: Successful
 *       404:
 *         description: Couldn't find the specified pet
 */
petRouter.delete('/:id', async ctx => {
    const { id } = ctx.params;

    let found = false;

    pets = pets.reduce((pets, pet) => {
        if(pet.id !== id) {
            return [
                ...pets,
                pet
            ];
        }

        found = true;
        return pets;
    }, []);

    if(!found) {
        ctx.throw(404, 'Could not find pet');
    }

    ctx.status = 200;
    ctx.body = pets;
});


module.exports = petRouter;