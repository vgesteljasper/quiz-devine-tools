const {Answer} = require(`mongoose`).models;
const Boom = require(`boom`);
const Joi = require(`joi`);
Joi.objectId = require(`joi-objectid`)(Joi);


const answerSchema = Joi.object().keys({
  id: Joi.description(`ID of answer`).example(`590e165d3b8f8d41d8e2b145`).required(),
  created: Joi.date().description(`Date answer was created on`).example(`2017-05-06T18:30:53.391Z`).required(),
  modified: Joi.date().description(`Date answer was last modified on`).example(`2017-05-06T18:30:53.391Z`).required(),
  answer: Joi.string().description(`The answer`).example(`Albert Einstein`).required(),
  correct: Joi.boolean().description(`Is the answer correct?`).example(true).required()
});


const GET = {
  method: `GET`,
  path: `/api/answer/{id}`,
  config: {
    description: `Get all answers that belong to question ID`,
    tags: [`api`, `get`],
    validate: {
      params: {
        id: Joi.objectId().description(`ID of question to find answers for.`).example(`590e165d3b8f8d41d8e2b145`).required()
      }
    },
    response: {
      schema: Joi.array().items(answerSchema)
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {description: `Success`},
          404: {description: `Not Found`},
          500: {description: `An internal server error occurred`}
        }
      }
    },
    handler: (req, res) => {
      const {id} = req.params;
      Answer.find({questionID: id, isActive: true}, (err, answers) => {
        if (err) {
          console.log(err);
          return res(Boom.badImplementation(`An internal server error occurred`));
        }
        if (answers.length > 0) {
          const filteredAnswers = [];
          answers.forEach(a => {
            filteredAnswers.push({id: a._id, created: a.created, modified: a.modified, answer: a.answer, correct: a.correct});
          });
          return res(filteredAnswers).code(200);
        } else {
          return res(Boom.notFound(`No answers found for this question ID`));
        }
      });
    }
  }
};


const POST = {
  method: `POST`,
  path: `/api/answer`,
  config: {
    description: `Post new answer`,
    tags: [`api`, `post`],
    validate: {
      payload: {
        questionID: Joi.objectId().description(`ID of question to link answer to`).example(`590e165d3b8f8d41d8e2b145`).required(),
        answer: Joi.string().description(`Answer`).example(`Who was the first king of Belgium?`).required(),
        correct: Joi.boolean().description(`Is correct answer?`).example(true).required()
      }
    },
    response: {
      schema: answerSchema
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {description: `Success`},
          500: {description: `An internal server error occurred`}
        }
      }
    },
    handler: (req, res) => {
      const {questionID, answer, correct} = req.payload;
      const answerObj = new Answer({questionID, answer, correct});
      answerObj.save((err, a) => {
        if (err) {
          console.log(err);
          return res(Boom.badImplementation(`An internal server error occurred`));
        }
        const filteredAnswer = {id: a._id, created: a.created, modified: a.modified, answer: a.answer, correct: a.correct};
        return res(filteredAnswer).code(200);
      });
    }
  }
};


const PUT = {
  method: `PUT`,
  path: `/api/answer/{id}`,
  config: {
    description: `Update answer`,
    tags: [`api`, `put`],
    validate: {
      params: {
        id: Joi.objectId().description(`ID of answer to update`).example(`590e165d3b8f8d41d8e2b145`).required()
      },
      payload: {
        answer: Joi.string().description(`Answer`).example(`Who was the first king of Belgium?`).required(),
        correct: Joi.boolean().description(`Is answer correct?`).example(true).required()
      }
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {description: `Success`},
          404: {description: `Not Found`},
          500: {description: `An internal server error occurred`}
        }
      }
    },
    handler: (req, res) => {
      const {answer, correct} = req.payload;
      const {id} = req.params;
      Answer.findOneAndUpdate({_id: id, isActive: true}, {$set: {answer, correct}}, (err, a) => {
        if (err) {
          console.log(err);
          return res(Boom.badImplementation(`An internal server error occurred`));
        }
        if (a) {
          return res().code(200);
        } else {
          return res(Boom.notFound(`Answer with this ID couldn't be found`));
        }
      });
    }
  }
};


const DELETE = {
  method: `DELETE`,
  path: `/api/answer/{id}`,
  config: {
    description: `Delete answer`,
    tags: [`api`, `delete`],
    validate: {
      params: {
        id: Joi.objectId().description(`ID of answer to delete`).example(`590e165d3b8f8d41d8e2b145`).required()
      }
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {description: `Success`},
          400: {description: `Not Found`},
          500: {description: `An internal server error occurred`}
        }
      }
    },
    handler: (req, res) => {
      const {id} = req.params;
      Answer.findOneAndUpdate({_id: id, isActive: true}, {$set: {isActive: false}}, (err, answer) => {
        if (err) {
          console.log(err);
          return res(Boom.badImplementation(`An internal server error occurred`));
        }
        if (answer) {
          return res().code(200);
        } else {
          return res(Boom.notFound(`Answer with this ID couldn't be found`));
        }
      });
    }
  }
};


module.exports = [GET, POST, PUT, DELETE];
