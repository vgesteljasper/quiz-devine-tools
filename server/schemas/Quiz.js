const Joi = require(`joi`);

const schema = {
  name: {
    type: String,
    required: true,
    validation: Joi.string().required()
  }
};

module.exports = {schema};
