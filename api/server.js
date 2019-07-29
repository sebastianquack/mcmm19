let Hapi = require('hapi')
let mongoose = require('mongoose')
let RestHapi = require('rest-hapi')

const music_name_fixtures = require('./fixtures.js');
const cities = require('cities.json')

let Auth = require("./plugins/auth.plugin.js");

const Path = require('path');
const Inert = require('@hapi/inert');

if(process.env.NODE_ENV != "production") {
  require('dotenv-safe').config()  
}

async function api() {
  try {

    let server = Hapi.Server({ 
      port: process.env.PORT,
      routes: {
        files: {
          relativeTo: Path.join(__dirname, 'public')
        }
      }
    })

    await server.register(Inert);

    if(process.env.NODE_ENV == "production") {
      server.ext('onRequest', function (request, h) {
        if(request.headers['x-forwarded-proto'] != 'https') {
          let newUrl = 'https://' + request.headers.host + (request.url.path || request.url.pathname + request.url.search);
          console.log(newUrl);
          return h
            .redirect(newUrl)
            .takeover()
            .code(301)
        }
        else 
          return h.continue; 
      });
    }

    server.route({
        method: 'GET',
        path: '/admin/{param*}',
        handler: {
            directory: {
                path: './admin',
                redirectToSlash: true
            }
        },
        options: {
          auth: false
        }
    });

    server.route({
        method: 'GET',
        path: '/client/{param*}',
        handler: {
            directory: {
                path: './client',
                redirectToSlash: true
            }
        },
        options: {
          auth: false
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './client',
                redirectToSlash: true
            }
        },
        options: {
          auth: false
        }
    });

    let config = {
      appTitle: "testresthapi",
      version: "1.0.0",
      apiPath: 'custom_endpoints',
      authStrategy: Auth.strategy,
      mongo: {
        URI: process.env.MONGODB_URI
      },
      enableSoftDelete: true
    };

    await server.register(Auth);
    await server.register({
      plugin: RestHapi,
      options: {
        mongoose,
        config
      },
      routes: {
        prefix: '/api'
      }
    })

    await server.start()

    // seed admin user if necessary
    let userRoutes = server.table().filter(t=>t.path == "/api/user");
    let userModel = userRoutes[0].settings.plugins.model;
    let Log = RestHapi.getLogger('seed')
    let adminUser = await RestHapi.list(userModel, {$where: {username: "admin"}}, Log)
    if(adminUser.docs.length == 0) {
      Log.log('seeding admin user')
      RestHapi.create(userModel, {username: "admin", password: process.env.ADMIN_PASSWORD}, Log)  
    }
    
    // seed entries
    let entryRoutes = server.table().filter(t=>t.path == "/api/entry");
    let entryModel = entryRoutes[0].settings.plugins.model;
    let entries = await RestHapi.list(entryModel, {$where: {isDeleted: {$ne: true}}}, Log)
    let num_seed_users = 20;
    let max_seed_entries_per_user = 4;
    let max_cities = cities.length;
    if(entries.docs.length < 20) {
      Log.log('seeding entries')
      for(let i = 0; i < num_seed_users; i++) {
        let user_id = "user_" + i;
        for(let j = 0; j < Math.floor(Math.random() * max_seed_entries_per_user) + 1; j++) {
          let city = cities[Math.floor(Math.random() * max_cities)];
          RestHapi.create(entryModel, {
            user_id: user_id,
            musician: music_name_fixtures.music_name_fixtures[Math.floor(Math.random() * 10)].name,
            year: Math.floor((Math.random() * 60) + 1959),
            city: city.name,
            cityLocation: {lat: Number(city.lat), lng: Number(city.lng)}
          }, Log);
        }
      }
    }

    console.log("Server ready", server.info)

    return server
  } catch (err) {
    console.log("Error starting server:", err);
  }
}

module.exports = api()