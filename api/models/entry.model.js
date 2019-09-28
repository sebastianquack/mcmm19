let Joi = require('joi')
let RestHapi = require('rest-hapi')

const axios = require('axios');

addCityLocation = async (payload) => {
  let response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json",
    {params: {address: payload.city, key: process.env.GEOCODING_KEY}});  
          
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
          payload.musician = payload.musician.toLowerCase().trim();
          payload.city = payload.city.toLowerCase().trim();
          if(!payload.cityLocation)
            payload = await addCityLocation(payload);
          return payload;
        }
      },

      update: {
        pre: async function (_id, payload, request, Log) {
          payload.musician = payload.musician.toLowerCase().trim();
          payload.city = payload.city.toLowerCase().trim();
          payload = await addCityLocation(payload);
          return payload;
        }
      },

      extraEndpoints: [


          /* get unique musicians and cities for autocomplete 


              
          */

         function (server, model, options, logger) {
            const Log = logger.bind("get unique musicians and cities")
            let Boom = require('boom')

            let handler = async function (request, h) {
              try {

                
                let musicians = await model.find({
                    isDeleted: {$ne: true},
                }).distinct('musician');

                musicians.sort(function (a, b) {
                  return a.toLowerCase().localeCompare(b.toLowerCase());
                });

                let cities = await model.find({
                    isDeleted: {$ne: true},
                }).distinct('city');

                cities.sort(function (a, b) {
                  return a.toLowerCase().localeCompare(b.toLowerCase());
                });

                return h.response({musicians, cities});
                
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

                    
          /* get distribution of years



          */

          function (server, model, options, logger) {
            const Log = logger.bind("get distribution of years")
            let Boom = require('boom')

            let handler = async function (request, h) {
              try {

                queryFilter = {};

                if(request.query.musician) {
                
                  let user_ids = await model.find({
                      isDeleted: {$ne: true},
                      musician: request.query.musician
                  }).distinct('user_id');

                  queryFilter = {user_id: {$in: user_ids}}

                }

                if(request.query.userIds) {

                  queryFilter = {user_id: {$in: request.query.userIds}}                  

                }
                
                let minYears = await model.find(queryFilter).sort({ "year": 1 }).limit(1)
                let minYear = minYears[0].year;

                let maxYears = await model.find(queryFilter).sort({ "year": -1 }).limit(1)
                let maxYear = maxYears[0].year;
                
                let data = [];

                for(let i = minYear; i <= maxYear; i++) {

                  let amount = 0;
                  if(!request.query.year) {
                    amount = await model.find({...queryFilter, year: i, isDeleted: {$ne: true}}).count();
                  } else {
                    if(i == request.query.year) {
                      amount = await model.find({year: i, isDeleted: {$ne: true}}).count();
                    }
                  }
                  
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
                  query: {
                    musician: Joi.string(),
                    userIds: Joi.array(),
                    year: Joi.number()
                  }
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
              - filter by musician
              - filter by user_ids
          */

          function (server, model, options, logger) {
            const Log = logger.bind("get top musicians")
            let Boom = require('boom')

            let handler = async function (request, h) {
              try {

                //console.log("userIds to filter", request.query.userIds);

                let data = [];
                let musicians = [];
                let musician_user_ids = [];

                let totalEntriesCount = 0;

                // manage filters
                if(!request.query.musician) {

                  if(!request.query.userIds) {

                    // year filter
                    if(request.query.year) {
                      musicians = await model.find({
                        isDeleted: {$ne: true},
                        year: request.query.year
                      }).distinct('musician');  

                      // all entries with that year
                      totalEntriesCount = await model.find({year: request.query.year, isDeleted: {$ne: true}}).count();
                    
                    // no filter
                    } else {
                      musicians = await model.find({isDeleted: {$ne: true}}).distinct('musician');  
                      
                      // all entries
                      totalEntriesCount = await model.find({isDeleted: {$ne: true}}).count();
                    }

                  } else {

                    // user filter
                    musicians = await model.find({
                      isDeleted: {$ne: true},
                      user_id: {$in: request.query.userIds}
                    }).distinct('musician');
                  
                    // all entries from these users
                    totalEntriesCount = await model.find({
                      isDeleted: {$ne: true},
                      user_id: {$in: request.query.userIds}
                    }).count();

                  }

                } else {

                  // musician filter
                  musician_user_ids = await model.find({
                      isDeleted: {$ne: true},
                      musician: request.query.musician
                    }).distinct('user_id');

                  console.log(musician_user_ids);

                  musicians = await model.find({
                      isDeleted: {$ne: true},
                      user_id: {$in: musician_user_ids}
                  }).distinct('musician');

                  console.log(musicians);

                  // all entries of users who named this musician
                  totalEntriesCount = await model.find({
                    isDeleted: {$ne: true},
                    user_id: {$in: musician_user_ids}
                  }).count();

                  console.log(totalEntriesCount);

                }

                // now we have all musicians we want
                for(let i = 0; i < musicians.length; i++) {
                  let musician = musicians[i];
                  
                  let count = 0;
                  if(request.query.year) {
                    // year
                    // all entries with this musician and this year
                    count = await model.find({musician: musician, year: request.query.year}).count();
                  } else {

                    // user filter
                    if(request.query.userIds) {
                      // all entries from these users
                      count = await model.find({
                        isDeleted: {$ne: true},
                        musician: musician,
                        user_id: {$in: request.query.userIds}
                      }).count();
  
                    } else {

                      // musician filter
                      if(request.query.musician) {
                        // all entries of users who named this musician
                        count = await model.find({
                          isDeleted: {$ne: true},
                          musician: musician,
                          user_id: {$in: musician_user_ids}
                        }).count();

                      } else {

                        // no filter
                        // all entries of this musician
                        count = await model.find({isDeleted: {$ne: true}, musician: musician}).count();
                      }

                    }
                    
                  }
                  
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
                    limit: Joi.number(),
                  },
                  query: {
                    userIds: Joi.array(),
                    musician: Joi.string(),
                    year: Joi.string()
                  }
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


          /* get entries for map
              - group by city
              - filter by musician
              - filter by user_ids
              - filter by year
          */

          function (server, model, options, logger) {
            const Log = logger.bind("Get all entries for all users")
            let Boom = require('boom')

            let handler = async function (request, h) {
              try {
                
                let result = {};
                let users = [];

                // manage filters
                if(request.query.year) {
                  
                  let entries = await model.find({
                      year: request.query.year,
                      isDeleted: {$ne: true},
                  });

                  if(entries.length) {
                    entries.forEach(e=>{
                      if(!result[e.city.toLowerCase()]) {
                        result[e.city.toLowerCase()] = [];
                      }
                      result[e.city.toLowerCase()].push(e);
                    })
                  }

                } else {
                
                  if(request.query.musician) {
                    users = await model.find({
                      musician: request.query.musician,
                      isDeleted: {$ne: true},
                    }).distinct('user_id');
                  } else {
                    if(request.query.userIds) {
                      console.log("userIds", request.query.userIds);
                      users = request.query.userIds;
                    } else {
                      users = await model.find({
                        isDeleted: {$ne: true},
                      }).distinct('user_id');
                    }
                  }

                  for(let i = 0; i < users.length; i++) {
                    let u = users[i];
                    let entries = await model.find({
                      user_id: u,
                      isDeleted: {$ne: true},
                    });

                    if(entries.length) {

                      entries.forEach(e=>{
                        if(!result[e.city.toLowerCase()]) {
                          result[e.city.toLowerCase()] = [];
                        }
                        result[e.city.toLowerCase()].push(e);
                      })
                    }
                  }
                }

                return h.response(result);
                
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
              path: '/map_entries/',
              config: {
                handler: handler,
                auth: false,
                description: 'Get entries for map',
                tags: ['api'],
                validate: {
                  query: {
                    userIds: Joi.array(),
                    musician: Joi.string(),
                    year: Joi.number()
                  }
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