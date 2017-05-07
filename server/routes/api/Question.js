const {Question} = require(`mongoose`).models;
const Boom = require(`boom`);
const Joi = require(`joi`);

const questionSchema = Joi.object().keys({
  id: Joi.string().length(24).description(`ID of question`).example(`590e165d3b8f8d41d8e2b145`),
  created: Joi.date().description(`Date question was created on`).example(`2017-05-06T18:30:53.391Z`),
  modified: Joi.date().description(`Date question was last modified on`).example(`2017-05-06T18:30:53.391Z`),
  question: Joi.string().description(`The question`).example(`Who was the first king of Belgium?`)
});

module.exports = [
  {
    method: `GET`,
    path: `/api/question/{id}`,
    config: {
      description: `Get all questions that belong to quiz ID`,
      tags: [`api`],
      validate: {
        params: {
          id: Joi.string().length(24).required().description(`ID of quiz to get questions for`).example(`590e165d3b8f8d41d8e2b145`)
        }
      },
      response: {
        schema: Joi.array().items(questionSchema)
      },
      handler: (req, res) => {
        const {id} = req.params;
        Question.find({quizID: id, isActive: true})
          .then(questions => {
            const filteredQuestions = [];
            questions.forEach(q => filteredQuestions.push({id: q._id, created: q.created, modified: q.modified, question: q.question}));
            return res(filteredQuestions).code(200);
          })
          .catch(() => res(Boom.notFound(`No questions were found for this quiz.`)));
      }
    }
  },
  {
    method: `POST`,
    path: `/api/question`,
    config: {
      description: `Post new question`,
      tags: [`api`],
      validate: {
        payload: {
          id: Joi.string().length(24).required().description(`ID of quiz to post answer to`).example(`590e165d3b8f8d41d8e2b145`),
          question: Joi.string().required().description(`The question`).example(`Who was the first king of Belgium?`)
        }
      },
      response: {
        schema: questionSchema
      },
      handler: (req, res) => {
        const {id, question} = req.payload;
        if (!id) return res(Boom.badRequest(`No quiz ID provided.`));
        if (!question) return res(Boom.badRequest(`No question provided.`));
        const questionObj = new Question({quizID: id, question});
        questionObj.save()
          .then(question => res(question).code(201))
          .catch(err => {
            console.log(err);
            return res({statusCode: 500, error: `Something went wrong creating new question.`}).code(500);
          });
      }
    }
  },
  {
    method: `PUT`,
    path: `/api/question/{id}`,
    config: {
      description: `Update question`,
      tags: [`api`],
      validate: {
        params: {
          id: Joi.string().length(24).required().description(`ID of question to update`).example(`590e165d3b8f8d41d8e2b145`)
        },
        payload: {
          question: Joi.string().required().description(`The question`).example(`WHo was the first king of Belgium?`)
        }
      },
      response: {
        schema: questionSchema
      },
      handler: (req, res) => {
        const {id} = req.params;
        const {question} = req.payload;
        Question.findById(id, (err, foundObj) => {
          if (err) {
            console.log(err);
            return res(Boom.notFound(`Question doesn't exist`));
          }
          if (foundObj) {
            if (!foundObj.isActive) {
              return res(Boom.notFound(`Question doesn't exist`));
            } else {
              foundObj.question = question;
              foundObj.save();
              return res(foundObj).code(200);
            }
          }
        });
      }
    }
  },
  {
    method: `DELETE`,
    path: `/api/question/{id}`,
    config: {
      description: `Delete question`,
      tags: [`api`],
      validate: {
        params: {
          id: Joi.string().length(24).required().description(`ID of question to delete`).example(`590e165d3b8f8d41d8e2b145`)
        }
      },
      handler: (req, res) => {
        const {id} = req.params;
        Question.findById(id, (err, foundObj) => {
          if (err) {
            console.log(err);
            return res(Boom.notFound(`Question doesn't exist.`));
          }
          if (foundObj) {
            if (!foundObj.isActive) {
              return res(Boom.notFound(`Quiz doesn't exist.`));
            } else {
              foundObj.isActive = false;
              foundObj.save()
                .then(() => res({statusCode: 200, message: `Question deleted.`}).code(200))
                .catch(err => {
                  if (err) console.log(err);
                  return res({statusCode: 500, error: `Something went wrong deleting this question.`}).code(500);
                });
            }
          }
        });
      }
    }
  }
];
