const Joi = require(`joi`);
Joi.objectId = require(`joi-objectid`)(Joi);

const schema = {
  quizId: {
    type: String,
    require: true,
    validation: Joi.objectId().required()
  },
  question: {
    type: String,
    required: true,
    validation: Joi.string().required()
  }
};

module.exports = {schema};
