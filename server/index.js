const path = require(`path`);
const log = true;

require(`dotenv`).load({silent: true});

const {PORT = 3000, URL, MONGO_URL} = process.env;

const Server = require(`hapi`).Server;

const server = new Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, `public`)
      }
    }
  }
});

server.connection({port: PORT});

server.start(err => {

  if (err) return console.error(err);

  console.log(``);
  console.log(`Server running at: ${URL}:${PORT}`);

  server.register({

    register: require(`hapi-devine-autoload`),

    options: {

      path: path.join(__dirname, `plugins`),
      log,

      plugins: [
        require(`hapi-devine-mongodb`),
        require(`hapi-devine-routes`),
        require(`inert`)
      ],

      pluginOptions: {

        'hapi-devine-mongodb': {
          connectionString: MONGO_URL,
          log,
          path: path.join(__dirname, `schemas`)
        },

        'hapi-devine-routes': {
          log,
          path: path.join(__dirname, `routes`)
        },

      }

    }

  }, error => {
    if (error) return console.error(error);
  });

});
