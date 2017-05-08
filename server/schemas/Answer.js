const Joi = require(`joi`);

const schema = {
  questionID: {
    type: String,
    require: true,
    validation: Joi.string().length(24).required()
  },
  answer: {
    type: String,
    required: true,
    validation: Joi.string().required()
  },
  correct: {
    type: Boolean,
    required: true,
    validation: Joi.boolean().required()
  }
};

module.exports = {schema};
