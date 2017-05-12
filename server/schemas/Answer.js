const Joi = require(`joi`);
Joi.objectId = require(`joi-objectid`)(Joi);

const schema = {
  questionId: {
    type: String,
    required: true,
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
    required: false,
    default: 0,
    validation: Joi.number().integer().min(0)
  },
  votesInc: {
    type: String,
    required: false,
    default: `0`,
    validation: Joi.string().regex(/^[\+\-]?[0-9]+$/, `string example: 1 20 +1 -1 +10 -50`),
    project: false
  }
};

module.exports = {schema};
