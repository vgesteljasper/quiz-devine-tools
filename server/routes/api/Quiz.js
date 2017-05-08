const {Quiz, Question} = require(`mongoose`).models;
const Boom = require(`boom`);
const Joi = require(`joi`);
Joi.objectId = require(`joi-objectid`)(Joi);


const quizSchema = Joi.object().keys({
  id: Joi.description(`ID of quiz`).example(`590e165d3b8f8d41d8e2b145`).required(),
  created: Joi.date().description(`Date quiz was created on`).example(`2017-05-06T18:30:53.391Z`).required(),
  modified: Joi.date().description(`Date quiz was last modified on`).example(`2017-05-06T18:30:53.391Z`).required(),
  name: Joi.string().description(`Name of quiz`).example(`Week 7 JavaScript Quiz`).required()
});


const GETALL = {
  method: `GET`,
  path: `/api/quiz`,
  config: {
    description: `Get all quizzes`,
    tags: [`api`, `get`],
    response: {
      schema: Joi.array().items(quizSchema)
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
      Quiz.find({isActive: true}, (err, quizzes) => {
        if (err) {
          console.log(err);
          return res(Boom.badImplementation(`An internal server error occurred`));
        }
        if (quizzes.length > 0) {
          const filteredQuizzes = [];
          quizzes.forEach(q => {
            filteredQuizzes.push({id: q._id, created: q.created, modified: q.modified, name: q.name});
          });
          return res(filteredQuizzes).code(200);
        } else {
          return res(Boom.notFound(`No quizzes found`));
        }
      });
    }
  }
};


const GETCOMPLETE = {
  method: `GET`,
  path: `/api/quiz/{id}`,
  config: {
    description: `Get complete quiz by quiz id`,
    tags: [`api`, `get`],
    validate: {
      params: {
        id: Joi.objectId().description(`ID of the quiz to get`).example(`590e165d3b8f8d41d8e2b145`).required()
      }
    },
    // response: {
    //   schema: Joi.array().items(quizSchema)
    // },
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
      Quiz.findOne({_id: id, isActive: true}, (err, q) => {
        if (err) {
          console.log(err);
          return res(Boom.badImplementation(`An internal server error occurred`));
        }
        if (q) {
          const filteredQuiz = {id: q._id, created: q.created, modified: q.modified, name: q.name};
          Question.find({quizID: id, isActive: true}, (err, questions) => {
            if (err) {
              console.log(err);
              return res(Boom.badImplementation(`An internal server error occurred`));
            }
            if (questions.length > 0) {
              const filteredQuestions = [];
              questions.forEach(a => {
                const filteredQuestion = {id: a._id, created: a.created, modified: a.modified, question: a.question};
                filteredQuestions.push(filteredQuestion);
              });
              filteredQuiz.questions = filteredQuestions;
            }
            return res(filteredQuiz).code(200);
          });
        } else {
          return res(Boom.notFound(`No quizzes found`));
        }
      });
    }
  }
};


const POST = {
  method: `POST`,
  path: `/api/quiz`,
  config: {
    description: `Post new quiz`,
    tags: [`api`, `post`],
    validate: {
      payload: {
        name: Joi.string().description(`Name of the quiz to create`).example(`Week 7 JavaScript Quiz`).required()
      }
    },
    response: {
      schema: quizSchema
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
      const {name} = req.payload;
      const quizObj = new Quiz({name});
      quizObj.save((err, q) => {
        if (err) {
          console.log(err);
          return res(Boom.badImplementation(`An internal server error occurred`));
        }
        const filteredQuiz = {id: q._id, created: q.created, modified: q.modified, name: q.name};
        return res(filteredQuiz).code(200);
      });
    }
  }
};


const PUT = {
  method: `PUT`,
  path: `/api/quiz/{id}`,
  config: {
    description: `Update quiz`,
    tags: [`api`, `put`],
    validate: {
      params: {
        id: Joi.objectId().description(`ID of quiz to update`).example(`590e165d3b8f8d41d8e2b145`).required()
      },
      payload: {
        name: Joi.string().description(`New name for quiz`).example(`Week 7 JavaScript Quiz`).required()
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
      const {name} = req.payload;
      Quiz.findOneAndUpdate({_id: id, isActive: true}, {$set: {name}}, (err, q) => {
        if (err) {
          console.log(err);
          return res(Boom.badImplementation(`An internal server error occurred`));
        }
        if (q) {
          return res().code(200);
        } else {
          return res(Boom.notFound(`Quiz with this ID couldn't be found`));
        }
      });
    }
  }
};


const DELETE = {
  method: `DELETE`,
  path: `/api/quiz/{id}`,
  config: {
    description: `Delete quiz`,
    tags: [`api`, `delete`],
    validate: {
      params: {
        id: Joi.objectId().description(`ID of quiz to delete`).example(`590e165d3b8f8d41d8e2b145`).required()
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
      Quiz.findOneAndUpdate({_id: id, isActive: true}, {$set: {isActive: false}}, (err, q) => {
        if (err) {
          console.log(err);
          return res(Boom.badImplementation(`An internal server error occurred`));
        }
        if (q) {
          return res().code(200);
        } else {
          return res(Boom.notFound(`Quiz with this ID couldn't be found`));
        }
      });
    }
  }
};


module.exports = [GETALL, GETCOMPLETE, POST, PUT, DELETE];
