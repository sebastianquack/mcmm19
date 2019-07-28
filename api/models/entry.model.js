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
          
          // get data for graph
          function (server, model, options, logger) {
            const Log = logger.bind("Get graph data")
            let Boom = require('boom')

            let handler = async function (request, h) {
              try {                

                let nodes = [];
                let links = [];

                const emoji = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🦝"];
                let user_ids = await model.find({isDeleted: {$ne: true}}).distinct('user_id');
                
                // assemble nodes
                
                /*let musicians = await model.find({isDeleted: {$ne: true}}).distinct('musician');
                musicians.forEach((musician) => {
                  nodes.push({
                    name: musician,
                    id: musician,
                    key: musician,
                    type: "music_name",
                    weight: 1
                  });
                })

                let cities = await model.find({isDeleted: {$ne: true}}).distinct('city');
                cities.forEach((city) => {
                  nodes.push({
                    name: city,
                    id: city,
                    key: city,
                    type: "city",
                    weight: 1
                  });
                })
                
                user_ids.forEach((user_id, index) => {
                  nodes.push({
                    name: emoji[Math.floor(Math.random() * emoji.length)],
                    id: user_id,
                    key: user_id,
                    type: "user",
                    weight: 1
                  });
                }) 

                // assemble links - a link between two entries is created when they have the same user_id

                // music - city links
                //let all = await model.find({isDeleted: {$ne: true}});
                all.forEach(e=>{
                  let musicIndex = musicians.indexOf(e.musician);
                  let cityIndex = cities.indexOf(e.city);
                  let userIndex = user_ids.indexOf(e.user_id);

                  // music - city
                  links.push({
                    source: musicIndex,
                    target: musicians.length + cityIndex,
                    value: 1
                  });

                  // user - music
                  links.push({
                    source: musicians.length + cities.length + userIndex,
                    target: musicIndex,
                    value: 1
                  })

                  // user - city
                  links.push({
                    source: musicians.length + cities.length + userIndex,
                    target: musicians.length + cityIndex,
                    value: 1
                  })
                })

                /*
                // music - music & city - city links 

                // go over all individual users
                let user_ids = await model.find({isDeleted: {$ne: true}}).distinct('user_id');
                for(let i = 0; i < user_ids.length; i++) {
                  
                  // go over entries by this user
                  let user_entries = await model.find({user_id: user_ids[i], isDeleted: {$ne: true}});
                  user_entries.forEach((sourceEntry) => {
                    
                    // look at this entry's city and musician
                    let sourceIndex = musicians.indexOf(sourceEntry.musician);
                    let sourceIndex2 = cities.indexOf(sourceEntry.city);
                    
                    // look at all this users other entries
                    user_entries.forEach((targetEntry) => {

                      // add links for all musicians
                      let targetIndex = musicians.indexOf(targetEntry.musician);
                      if(targetIndex > -1 && targetIndex != sourceIndex) {
                        links.push({
                          source: sourceIndex,
                          target: targetIndex,
                          value: 1
                        });   
                      }
                      // add links to all cities
                      let targetIndex2 = cities.indexOf(targetEntry.city);
                      if(targetIndex2 > -1 && targetIndex2 != sourceIndex2) {
                        links.push({
                          source: musicians.length + sourceIndex2,
                          target: musicians.length + targetIndex2,
                          value: 1
                        });   
                      }
                    });
                  });
                }*/

                // try something simple - a node for each entry and links betwwen them
                let user_index = 0;
                for(let i = 0; i < user_ids.length; i++) {
                  let user_id = user_ids[i];  
                  let user_emoji = emoji[Math.floor(Math.random() * emoji.length)];
                  
                  let user_entries = await model.find({user_id: user_id, isDeleted: {$ne: true}}).sort({year: 1});
                  
                  console.log(user_entries);

                  user_entries.forEach(e=>{
                    nodes.push({
                      name: user_emoji + " " + e.musician + " " + e.city + " " + e.year,
                      id: e._id,
                      key: e._id,
                      type: "entry",
                      weight: 1
                    });

                    if(user_entries.length > 1) {
                      for(let j = user_index; j < user_index + user_entries.length - 1; j++) {
                        links.push({
                          source: j,
                          target: j + 1,
                          value: 1
                        })
                      }
                    }
                  }) 

                  user_index += user_entries.length               
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

          // get unique musicians and cities
          function (server, model, options, logger) {
            const Log = logger.bind("Get unique musicians and cities")
            let Boom = require('boom')

            let handler = async function (request, h) {
              try {                
                let musicians = await model.find({isDeleted: {$ne: true}}).distinct('musician');
                let cities = await model.find({isDeleted: {$ne: true}}).distinct('city');
                if (musicians && cities) {
                  return h.response({musicians, cities});
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
              path: '/entry_uniques/',
              config: {
                handler: handler,
                auth: false,
                description: 'get unique musicians and cities',
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

          // get entries by user_id endpoint
          function (server, model, options, logger) {
            const Log = logger.bind("Get entries by user")
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
                description: 'Retreive entries by user_id',
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