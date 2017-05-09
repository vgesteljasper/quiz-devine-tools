const Joi = require(`joi`);
Joi.objectId = require(`joi-objectid`)(Joi);

const schema = {
  questionId: {
    type: String,
    require: true,
    validation: Joi.objectId().required()
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
  },
  votes: {
    type: Number,
    required: true,
    validation: Joi.number().integer().required()
  }
};

module.exports = {schema};
