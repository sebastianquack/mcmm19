let Joi = require('joi')

module.exports = function(mongoose) {
  let modelName = "filter";
  let Types = mongoose.Schema.Types;
  let Schema = new mongoose.Schema({
    username: {
      type: Types.String,
      required: true,
      unique: true
    },
    filter: {
      type: [Types.String],
    }
  });

  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      readAuth: false, 
      createAuth: false,
      updateAuth: false,
      deleteAuth: false,

      extraEndpoints: [
                    
          /* set filter for user

          */

          function (server, model, options, logger) {
            const Log = logger.bind("set filter for user")
            let Boom = require('boom')

            let handler = async function (request, h) {
              try {

                console.log("set filter", request.params.target, request.params.source)

                let target = await model.findOne({username: request.params.target});
                console.log("target", target);
                if(target) {
                  target.filter = [request.params.source];
                  await target.save();
                } else {
                  await model.create({ username: request.params.target, filter: [request.params.source] });
                }
                
                return h.response("ok");
                
              } catch(err) {
                if (!err.isBoom) {
                  Log.error(err)
                  throw Boom.badImplementation(err)
                } else {
                  throw err
                }
              }
            }

            server.route({
              method: 'GET',
              path: '/set_filter/{target}/{source}',
              config: {
                handler: handler,
                auth: false,
                description: 'set filter for user',
                tags: ['api'],
                validate: {
                  params: {
                    target: Joi.string(),
                    source: Joi.string(),
                  },
                },
                plugins: {
                  'hapi-swagger': {
                    responseMessages: [
                      {code: 200, message: 'Success'},
                      {code: 400, message: 'Bad Request'},
                      {code: 404, message: 'Not Found'},
                      {code: 500, message: 'Internal Server Error'}
                    ]
                  }
                }
              }
            })
          },

          /* remove filter for user

          */

          function (server, model, options, logger) {
            const Log = logger.bind("remove filter for user")
            let Boom = require('boom')

            let handler = async function (request, h) {
              try {

                console.log("remove filters for", request.params.username)
                const res = await model.remove({ username: request.params.username });
                console.log(res);

                return h.response("ok");
                
              } catch(err) {
                if (!err.isBoom) {
                  Log.error(err)
                  throw Boom.badImplementation(err)
                } else {
                  throw err
                }
              }
            }

            server.route({
              method: 'GET',
              path: '/remove_filter/{username}',
              config: {
                handler: handler,
                auth: false,
                description: 'remove filter for user',
                tags: ['api'],
                validate: {
                  params: {
                    username: Joi.string(),
                  },
                },
                plugins: {
                  'hapi-swagger': {
                    responseMessages: [
                      {code: 200, message: 'Success'},
                      {code: 400, message: 'Bad Request'},
                      {code: 404, message: 'Not Found'},
                      {code: 500, message: 'Internal Server Error'}
                    ]
                  }
                }
              }
            })
          }

          ]

    }
  }

  return Schema;
};
