const Joi = require(`joi`);

const schema = {
  name: {
    type: String,
    required: true,
    validation: Joi.string()
  },
  isLive: {
    type: Boolean,
    default: false,
    validation: Joi.boolean()
  }
};

module.exports = {schema};
