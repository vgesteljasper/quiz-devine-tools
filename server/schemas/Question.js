const Joi = require(`joi`);

const schema = {
  quizID: {
    type: String,
    require: true,
    validation: Joi.string().length(24)
  },
  question: {
    type: String,
    required: true,
    validation: Joi.string()
  }
};

module.exports = {schema};
