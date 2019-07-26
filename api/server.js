let Hapi = require('hapi')
let mongoose = require('mongoose')
let RestHapi = require('rest-hapi')

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

    let userRoutes = server.table().filter(t=>t.path == "/api/user");
    let userModel = userRoutes[0].settings.plugins.model;
    console.log(userModel);

    let Log = RestHapi.getLogger('seed')
    let adminUser = await RestHapi.list(userModel, {$where: {username: "admin"}}, Log)
    console.log(adminUser);
    if(adminUser.docs.length == 0) {
      Log.log('seeding admin user')
      RestHapi.create(userModel, {username: "admin", password: process.env.ADMIN_PASSWORD}, Log)  
    }
    
    console.log("Server ready", server.info)

    return server
  } catch (err) {
    console.log("Error starting server:", err);
  }
}

module.exports = api()