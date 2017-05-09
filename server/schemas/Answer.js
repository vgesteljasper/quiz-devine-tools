const Joi = require(`joi`);
Joi.objectId = require(`joi-objectid`)(Joi);

const schema = {
  questionId: {
    type: String,
    require: true,
    validation: Joi.objectId()
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
  },
  votes: {
    type: Number,
    required: true,
    validation: Joi.number().integer()
  }
};

module.exports = {schema};
