module.exports = Model => {

  //******************************************************************//
  //******************************************************************//

  // in these comments => Model = User.js

  const {

    fields, // input fields (all possible input fields for POST / PATCH / PUT)
    validation, // JOI validation object (validate params, query, payload via schema)
    projection, // mongoose projection (default: ['__v']), add in schema via project: false
    collectionName, // "users"
    modelName, // "user"
    route, // "api/users"

  } = require(`hapi-devine-api-config`)(Model);

  //******************************************************************//

  const parseQuery = require(`hapi-devine-parse-query`);

  const Boom = require(`boom`);
  const {omit, pick} = require(`lodash`);

  const getFullUrl = suffix => {
    const {URL = `http://localhost`, PORT} = process.env;
    const isDevelopment = (URL === `http://localhost`);
    return `${URL}${isDevelopment ? `:${PORT}` : ``}${suffix}`;
  };

  const transformPayloadForVotes = payload => {

    const votesInc = payload.votesInc;
    let votesPayload = {};

    // check if votesInc starts with a + or -
    // $inc takes negative values as well so we can pass
    // all +... and -... values
    if (/^[\+\-]{1}[0-9]+$/.test(votesInc)) {
      votesPayload = {$inc: {votes: Number(votesInc)}};
    }
    // if votesInc doesn't match it's a regular number
    // and we'll replace the current votes value with this one
    else {
      votesPayload = {votes: votesInc};
    }

    payload = omit(payload, `votesInc`);
    payload = Object.assign({}, votesPayload, payload);

    return payload;
  };

  // NOTE: never send results that are inactive
  const removeInactive = filter => {
    if (!(`isActive` in filter)) {
      filter = Object.assign({}, {isActive: true}, filter);
    }
    return filter;
  };

  const methods = {

    create: (req, res) => {

      const payload = pick(req.payload, fields);

      // create new instance of model (with payload as data)
      const model = new Model(payload);

      // insert model
      model.save()
        .then(d => {

          if (!d) return res( // insert failed
            Boom.badRequest(`cannot save ${modelName}`)
          );

          // no projection on save, manual via omit
          d = omit(
            d.toJSON(),
            projection.map(p => p.startsWith(`-`) ? p.slice(1) : p) // projection without ('-')
          );

          return (
            res(d) // result
              .header(`Location`, getFullUrl(`${route}/${d._id}`)) // LOCATION HEADER
              .code(201) // code: 201 => CREATED
          );

        })
        .catch(err => res(
          Boom.badRequest(err.message) // mongoose, mongodb errors
        ));

    },

    read: (req, res) => {

      // parse querystrings (filtering, fields, sorting etc...)
      parseQuery(Model, req.query)
        .then(({sort, skip, limit, fields: f, meta, filter}) => {

          filter = removeInactive(filter);

          Model.find(
            filter, // filter = empty as default
            f ? f : projection.join(` `), // projection (manual add fields)
            {sort, skip, limit} // sorting + pagination
          )
          .then(d => {

            return res({
              [collectionName]: d, // in example. users: [{...}, {...}, etc]
              meta // meta data on GET (total, page (per_page, total, current))
            }); // CODE: 200 => OK

          });

        })
        .catch(err => res(
          Boom.badRequest(err.message) // mongoose, mongodb errors (400)
        ));

    },

    readOne: (req, res) => {

      const {_id} = req.params; // _id from route

      let filter = {_id}; // select by _id
      filter = removeInactive(filter);

      Model.findOne(
        filter,
        projection.join(` `) // projection
      )
      .then(d => {

        // no data -> CODE: 404 => NOT FOUND
        if (!d) return res(
          Boom.notFound(`${modelName} with _id ${_id} does not exist`)
        );

        return res(
          d // data
        ); // CODE: 200 =>  OK

      })
      .catch(err => res(
        Boom.badRequest(err.message)) // mongoose, mongodb errors (400)
      );

    },

    update: (req, res) => {

      const {_id} = req.params; // _id from route

      let payload = pick(req.payload, fields); // clean payload data

      if (`votesInc` in payload) {
        payload = transformPayloadForVotes(payload);
      }

      Model.update({_id}, payload) // automatically changes updated field
        .then(d => {

          if (d.ok) { // update success?

            // const filter = {_id, isActive: true}; // USER
            let filter = {_id};
            filter = removeInactive(filter);

            Model.findOne(
              filter,
              projection.join(` `)
            )
            .then(d => {

              if (!d) return res( // error on update
                Boom.notFound(`${modelName} does not exist`)
              );

              return res(d); // CODE: 200 => OK

            })
            .catch(err => res( // mongoose, mongodb errors (400)
              Boom.badRequest(err.message)
            ));

          } else return res( // update failed
            Boom.badRequest(`error while updating ${modelName} with _id ${_id}`)
          );

        })
        .catch(err => res(
          Boom.badRequest(err.message) // mongoose, mongodb errors (400)
        ));

    },

    delete: (req, res) => {

      const {_id} = req.params; // _id from route

      // hard / soft delete, default: hard: false
      const {hard} = req.query;

      if (hard) {

        // hard delete
        // remove entry in collection

        Model.remove({_id})
          .then(() => res().code(204)) // CODE: 204 => NO CONTENT
          .catch(err => res(
            Boom.badRequest(err.message) // mongoose, mongodb error (400)
          ));

      } else {

        // soft delete (DEFAULT)
        // update isActive => false

        Model.update({_id}, {isActive: false}, {upsert: true})
          .then(d => {

            if (d.ok) return res().code(204); // CODE: 204 => NO CONTENT

            else return res(
              Boom.badRequest(`error while deleting ${modelName} with _id ${_id}`)
            );

          })
          .catch(err => res(
            Boom.badRequest(err.message) // mongoose, mongodb error (400)
          ));

      }

    }

  };

  //******************************************************************//

  const routes = [

    {

      method: `GET`,
      path: `${route}`,

      handler: methods.read,

      config: {
        tags: [`api`],
        validate: validation.GET
      }

    },

    {

      method: `GET`,
      path: `${route}/{_id}`,

      handler: methods.readOne,

      config: {
        tags: [`api`],
        validate: validation.GET_ONE
      }

    },

    {

      method: `POST`,
      path: `${route}`,

      handler: methods.create,

      config: {
        tags: [`api`],
        validate: validation.POST
      }

    },

    {

      method: `DELETE`,
      path: `${route}/{_id}`,

      handler: methods.delete,

      config: {
        tags: [`api`],
        validate: validation.DELETE
      }

    },

    {

      method: `PATCH`,
      path: `${route}/{_id}`,

      handler: methods.update,

      config: {
        tags: [`api`],
        validate: validation.PATCH
      }

    },

    {

      method: `PUT`,
      path: `${route}/{_id}`,

      handler: methods.update,

      config: {
        tags: [`api`],
        validate: validation.PUT
      }

    }

  ];

  return routes;

};
