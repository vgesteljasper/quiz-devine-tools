module.exports = Model => {

  const {fields, validation, projection, collectionName, modelName, route} = require(`hapi-devine-api-config`)(Model);
  const parseQuery = require(`hapi-devine-parse-query`);
  const Boom = require(`boom`);
  const {omit, pick} = require(`lodash`);
  const getFullUrl = require(`./getFullUrl`);

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

  const methods = {

    POST: (req, res) => {
      const payload = pick(req.payload, fields);
      const model = new Model(payload);
      model.save()
        .then(d => {
          if (!d) return res(Boom.badRequest(`cannot save ${modelName}`));
          d = omit(d.toJSON(), projection.map(p => p.startsWith(`-`) ? p.slice(1) : p));
          return res(d).header(`Location`, getFullUrl(`${route}/${d._id}`)).code(201);
        })
        .catch(err => res(Boom.badRequest(err.message)));
    },

    GET: (req, res) => {
      parseQuery(Model, req.query)
        .then(({sort, skip, limit, fields: f, meta, filter}) => {
          Model.find(
            filter,
            f ? f : projection.join(` `),
            {sort, skip, limit}
          )
          .then(d => res({[collectionName]: d, meta}));
        })
        .catch(err => res(Boom.badRequest(err.message)));
    },

    GET_ONE: (req, res) => {
      /*
        NOTE: added parseQuery to be able to filter results on this route
        NOTE: won't show up in /api/documentation
      */
      const {_id} = req.params;
      parseQuery(Model, req.query)
        .then(({fields}) => {
          Model.findOne(
            {_id},
            fields ? fields : projection.join(` `)
          )
          .then(d => {
            if (!d) return res(Boom.notFound(`${modelName} with _id ${_id} does not exist`));
            return res(d);
          })
          .catch(err => res(Boom.badRequest(err.message)));
        })
        .catch(err => res(Boom.badRequest(err.message)));
    },

    UPDATE: (req, res) => {
      /*
        NOTE: added parseQuery to be able to filter results on this route
        NOTE: won't show up in /api/documentation
      */
      const {_id} = req.params;
      let payload = pick(req.payload, fields);
      /*
        NOTE: added support for doing calculations to votes value
      */
      if (`votesInc` in payload) {
        payload = transformPayloadForVotes(payload);
      }
      parseQuery(Model, req.query)
        .then(({fields}) => {
          Model.update({_id}, payload)
            .then(d => {
              if (d.ok) {
                Model.findOne(
                  {_id},
                  fields ? fields : projection.join(` `)
                )
                .then(d => {
                  if (!d) return res(Boom.notFound(`${modelName} does not exist`));
                  return res(d);
                })
                .catch(err => res(Boom.badRequest(err.message)));
              } else return (Boom.badRequest(`error while updating ${modelName} with _id ${_id}`));
            })
            .catch(err => res(Boom.badRequest(err.message)));
        })
        .catch(err => res(Boom.badRequest(err.message)));
    },

    DELETE: (req, res) => {
      const {_id} = req.params;
      const {hard} = req.query;
      if (hard) {
        Model.remove({_id})
          .then(() => res().code(204))
          .catch(err => res(Boom.badRequest(err.message)));
      } else {
        Model.update({_id}, {isActive: false})
          .then(d => {
            if (d.ok) return res().code(204);
            else return res(Boom.badRequest(`error while deleting ${modelName} with _id ${_id}`));
          })
          .catch(err => res(Boom.badRequest(err.message)));
      }
    }

  };

  const routes = [
    {
      method: `GET`,
      path: `${route}`,
      handler: methods.GET,
      config: {
        tags: [`api`],
        validate: validation.GET
      }
    },
    {
      method: `GET`,
      path: `${route}/{_id}`,
      handler: methods.GET_ONE,
      config: {
        tags: [`api`],
        validate: validation.GET_ONE
      }
    },
    {
      method: `POST`,
      path: `${route}`,
      handler: methods.POST,
      config: {
        tags: [`api`],
        validate: validation.POST
      }
    },
    {
      method: `DELETE`,
      path: `${route}/{_id}`,
      handler: methods.DELETE,
      config: {
        tags: [`api`],
        validate: validation.DELETE
      }
    },
    {
      method: `PATCH`,
      path: `${route}/{_id}`,
      handler: methods.UPDATE,
      config: {
        tags: [`api`],
        validate: validation.PATCH
      }
    },
    {
      method: `PUT`,
      path: `${route}/{_id}`,
      handler: methods.UPDATE,
      config: {
        tags: [`api`],
        validate: validation.PUT
      }
    }
  ];

  return routes;
};
