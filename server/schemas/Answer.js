const Joi = require(`joi`);

const schema = {
  questionID: {
    type: String,
    require: true,
    validation: Joi.string().length(24)
  },
  answer: {
    type: String,
    required: true,
    validation: Joi.string()
  },
  correct: {
    type: Boolean,
    required: true,
    validation: Joi.boolean()
  }
};

module.exports = {schema};
