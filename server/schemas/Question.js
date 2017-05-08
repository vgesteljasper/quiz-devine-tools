const Joi = require(`joi`);

const schema = {
  quizID: {
    type: String,
    require: true,
    validation: Joi.string().length(24).required()
  },
  question: {
    type: String,
    required: true,
    validation: Joi.string().required()
  }
};

module.exports = {schema};
