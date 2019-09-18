let Joi = require('joi')
let RestHapi = require('rest-hapi')

const axios = require('axios');

addCityLocation = async (payload) => {
  let response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+payload.city+"&key="+process.env.GEOCODING_KEY);  
          
  if(response.status == 200) {
    console.log(response.data.results[0]);  
    if(response.data.results[0]) {
      payload.cityLocation = response.data.results[0].geometry.location;  
    }
  }

  return payload;
}

module.exports = function (mongoose) {
  let modelName = "entry";
  let Types = mongoose.Schema.Types;
  let Schema = new mongoose.Schema({
    user_id: {
      type: Types.String,
      required: true,
    },
    musician: {
      type: Types.String,
      required: true,
    },
    city: {
      type: Types.String,
      required: true,
    },
    cityLocation: {
      type: Types.Object,
      required: false
    },
    year: {
      type: Types.Number,
      required: true,
    },
    note: {
      type: Types.String,
    }
  });
  
  Schema.statics = {
    collectionName: modelName,
    
    routeOptions: {
      readAuth: true, 
      createAuth: false,
      updateAuth: false,
      deleteAuth: false,

      create: {
        pre: async function (payload, request, Log) {
          if(!payload.cityLocation)
            payload = await addCityLocation(payload);
          return payload;
        }
      },

      update: {
        pre: async function (_id, payload, request, Log) {
          payload = await addCityLocation(payload);
          return payload;
        }
      },

      extraEndpoints: [
          
          /* get data for graph



          */

          function (server, model, options, logger) {
            const Log = logger.bind("Get graph data")
            let Boom = require('boom')

            let handler = async function (request, h) {
              try {                

                let nodes = [];
                let links = [];

                // assemble nodes
                
                let musicians = await model.find({isDeleted: {$ne: true}}).distinct('musician');
                for(let i = 0; i < musicians.length; i++) {
                  let musician = musicians[i];
                  let count = await model.find({musician: musician}).count();
                  nodes.push({
                    name: musician,
                    id: musician,
                    weight: count
                  });
                }

                // create music - music links out of music - user - music

                // go over all individual users
                let user_ids = await model.find({isDeleted: {$ne: true}}).distinct('user_id');
                for(let i = 0; i < user_ids.length; i++) {
                  // go over entries by this user
                  let user_entries = await model.find({user_id: user_ids[i], isDeleted: {$ne: true}});
                  user_entries.forEach((sourceEntry) => {
                    // look at all this users other entries
                    user_entries.forEach((targetEntry) => {
                      if(sourceEntry.musician != targetEntry.musician) {
                        links.push({
                          source: sourceEntry.musician,
                          target: targetEntry.musician,
                          strength: 1
                        });   
                      }
                    });
                  });
                }

                console.log(nodes, links);

                return h.response({
                  nodes: nodes,
                  links: links
                });
                
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
              path: '/graph_data/',
              config: {
                handler: handler,
                auth: false,
                description: 'Get graph data',
                tags: ['api'],
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

          
          /* get distribution of years



          */

          function (server, model, options, logger) {
            const Log = logger.bind("get distribution of years")
            let Boom = require('boom')

            let handler = async function (request, h) {
              try {
                
                let minYears = await model.find({}).sort({ "year": 1 }).limit(1)
                let minYear = minYears[0].year;

                let maxYears = await model.find({}).sort({ "year": -1 }).limit(1)
                let maxYear = maxYears[0].year;
                
                let data = [];

                for(let i = minYear; i <= maxYear; i++) {

                  let amount = await model.find({year: i, isDeleted: {$ne: true}}).count();
                  data.push({
                    year: i,
                    amount
                  })
                }

                return h.response(data);
                
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
              path: '/year_data/',
              config: {
                handler: handler,
                auth: false,
                description: 'get distribution of years',
                tags: ['api'],
                validate: {
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


          /* get top musicians


          */

          function (server, model, options, logger) {
            const Log = logger.bind("get top musicians")
            let Boom = require('boom')

            let handler = async function (request, h) {
              try {
                
                let data = [];
                let musicians = await model.find({isDeleted: {$ne: true}}).distinct('musician');
                let totalEntriesCount = await await model.find().count();

                for(let i = 0; i < musicians.length; i++) {
                  let musician = musicians[i];
                  let count = await model.find({musician: musician}).count();
                  data.push({
                    name: musician,
                    id: musician,
                    count: count,
                    percent: Math.floor((count / totalEntriesCount) * 100)
                  });
                }
                data.sort((a,b) => (a.count < b.count) ? 1 : ((b.count > a.count) ? -1 : 0)); 

                let limit = request.params.limit ? request.params.limit : 10; 

                data = data.slice(0, limit);

                return h.response(data);
                
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
              path: '/top_musicians/{limit}/',
              config: {
                handler: handler,
                auth: false,
                description: 'get top musicians',
                tags: ['api'],
                validate: {
                  params: {
                    limit: Joi.number()
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


          /* get all entries sorted by user_id endpoint



          */

          function (server, model, options, logger) {
            const Log = logger.bind("Get all entries for all users")
            let Boom = require('boom')

            let handler = async function (request, h) {
              try {
                
                const emoji = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🦝"];
                let user_ids = await model.find({isDeleted: {$ne: true}}).distinct('user_id');

                let result = [];

                for(let i = 0; i < user_ids.length; i++) {
                  
                  let entries = await model.find({
                    user_id: user_ids[i], 
                    isDeleted: {$ne: true}
                  }).sort({year: 1});

                  result.push({
                    user_id: user_ids[i],
                    emoji: emoji[Math.floor(Math.random() * emoji.length)],
                    entries  
                  })
                    
                }

                if (result) {
                  return h.response(result);
                }
                else {
                  throw Boom.notFound("nothing found")
                }
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
              path: '/entries_by_users/',
              config: {
                handler: handler,
                auth: false,
                description: 'Get all entries for all users',
                tags: ['api'],
                validate: {
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


          /* get entries by user_id endpoint


          */

          function (server, model, options, logger) {
            const Log = logger.bind("Get entries for a single user")
            let Boom = require('boom')

            let handler = async function (request, h) {
              try {
                /*let result = await RestHapi.list(model, {
                  user_id: request.params.user_id, $where: {isDeleted: {$ne: true}}}, Log) */

                let docs = await model.find({
                  user_id: request.params.user_id, 
                  isDeleted: {$ne: true}
                }).sort({year: 1});
                let result = {docs};

                console.log(result);

                if (result) {
                  return h.response(result);
                }
                else {
                  throw Boom.notFound("No entry was found with that user_id.")
                }
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
              path: '/entry_by_user/{user_id}/',
              config: {
                handler: handler,
                auth: false,
                description: 'Get entries for a single user',
                tags: ['api'],
                validate: {
                  params: {
                    user_id: Joi.string().required()
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

  };
  
  return Schema;
};