const mongoose = require(`mongoose`);
const {Question, Quiz} = mongoose.models;
const Boom = require(`boom`);
const Joi = require(`joi`);
Joi.objectId = require(`joi-objectid`)(Joi);


const questionSchema = Joi.object().keys({
  id: Joi.description(`ID of question`).example(`590e165d3b8f8d41d8e2b145`).required(),
  created: Joi.date().description(`Date question was created on`).example(`2017-05-06T18:30:53.391Z`).required(),
  modified: Joi.date().description(`Date question was last modified on`).example(`2017-05-06T18:30:53.391Z`).required(),
  question: Joi.string().description(`The question`).example(`Who was the first king of Belgium?`).required()
});


const GET = {
  method: `GET`,
  path: `/api/question/{quizId}`,
  config: {
    description: `Get all questions that belong to quiz ID`,
    tags: [`api`, `get`],
    validate: {
      params: {
        quizId: Joi.objectId().description(`ID of quiz to get questions for`).example(`590e165d3b8f8d41d8e2b145`).required()
      }
    },
    response: {
      schema: Joi.array().items(questionSchema)
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
      const {quizId} = req.params;
      Question.find({quizId, isActive: true}, (err, questions) => {
        if (err) {
          console.log(err);
          return res(Boom.badImplementation(`An internal server error occurred`));
        }
        if (questions.length > 0) {
          const filteredQuestions = [];
          questions.forEach(q => {
            filteredQuestions.push({id: q._id, created: q.created, modified: q.modified, question: q.question});
          });
          return res(filteredQuestions).code(200);
        } else {
          return res(Boom.notFound(`No questions found for this quiz ID`));
        }
      });
    }
  }
};


const POST = {
  method: `POST`,
  path: `/api/question`,
  config: {
    description: `Post new question`,
    tags: [`api`, `post`],
    validate: {
      payload: {
        quizId: Joi.objectId().description(`ID of quiz to post answer to`).example(`590e165d3b8f8d41d8e2b145`).required(),
        question: Joi.string().description(`The question`).example(`Who was the first king of Belgium?`).required()
      }
    },
    response: {
      schema: questionSchema
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
      const {quizId, question} = req.payload;
      Quiz.findOne({_id: quizId, isActive: true}, (err, quiz) => {
        if (err) {
          console.log(err);
          return res(Boom.badImplementation(`An internal server error occurred`));
        }
        if (quiz) {
          const questionObj = new Question({quizId, question});
          questionObj.save((err, q) => {
            if (err) {
              console.log(err);
              return res(Boom.badImplementation(`An internal server error occurred`));
            }
            const filteredQuestion = {id: q._id, created: q.created, modified: q.modified, question: q.question};
            return res(filteredQuestion).code(200);
          });
        } else {
          return res(Boom.notFound(`Quiz you are trying to post question to doesn't exist`));
        }
      });
    }
  }
};


const PUT = {
  method: `PUT`,
  path: `/api/question/{id}`,
  config: {
    description: `Update question`,
    tags: [`api`, `put`],
    validate: {
      params: {
        id: Joi.objectId().description(`ID of question to update`).example(`590e165d3b8f8d41d8e2b145`).required()
      },
      payload: {
        question: Joi.string().description(`The question`).example(`WHo was the first king of Belgium?`).required()
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
      const {id} = req.params;
      const {question} = req.payload;
      Question.findOneAndUpdate({_id: id, isActive: true}, {$set: {question}}, (err, q) => {
        if (err) {
          console.log(err);
          return res(Boom.badImplementation(`An internal server error occurred`));
        }
        if (q) {
          return res().code(200);
        } else {
          return res(Boom.notFound(`Question with this ID couldn't be found`));
        }
      });
    }
  }
};


const DELETE = {
  method: `DELETE`,
  path: `/api/question/{id}`,
  config: {
    description: `Delete question`,
    tags: [`api`, `delete`],
    validate: {
      params: {
        id: Joi.objectId().description(`ID of question to delete`).example(`590e165d3b8f8d41d8e2b145`).required()
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
      const {id} = req.params;
      Question.findOneAndUpdate({_id: id, isActive: true}, {$set: {isActive: false}}, (err, q) => {
        if (err) {
          console.log(err);
          return res(Boom.badImplementation(`An internal server error occurred`));
        }
        if (q) {
          return res().code(200);
        } else {
          return res(Boom.notFound(`No question found with this ID`));
        }
      });
    }
  }
};


module.exports = [GET, POST, PUT, DELETE];
