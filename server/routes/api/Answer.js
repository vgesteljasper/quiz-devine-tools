const {Question, Answer} = require(`mongoose`).models;
const Boom = require(`boom`);
const Joi = require(`joi`);

const answerSchema = Joi.object().keys({
  id: Joi.string().length(24).description(`ID of answer`).example(`590e165d3b8f8d41d8e2b145`),
  created: Joi.date().description(`Date answer was created on`).example(`2017-05-06T18:30:53.391Z`),
  modified: Joi.date().description(`Date answer was last modified on`).example(`2017-05-06T18:30:53.391Z`),
  questionID: Joi.string().length(24).description(`ID of question this answer belongs to`).example(`590e165d3b8f8d41d8e2b145`),
  answer: Joi.string().description(`The answer`).example(`Albert Einstein`),
  correct: Joi.boolean().description(`Is the answer correct?`).example(true)
});

module.exports = [
  {
    method: `GET`,
    path: `/api/answer/{id}`,
    config: {
      description: `Get all answers that belong to question ID`,
      tags: [`api`],
      validate: {
        params: {
          id: Joi.string().length(24).required().description(`ID of question to find answers for.`).example(`590e165d3b8f8d41d8e2b145`)
        }
      },
      response: {
        schema: Joi.array().items(answerSchema)
      },
      handler: (req, res) => {
        const {id} = req.params;
        Question.findById(id, (err, foundObj) => {
          if (err) {
            console.log(err);
            if (!foundObj.isActive) return res(Boom.notFound(`No answer(s) found because the question doesn't exist.`));
          }
          if (foundObj) {
            if (!foundObj.isActive) {
              return res(Boom.notFound(`No answer(s) found for this question.`));
            } else {
              Answer.find({isActive: true, questionID: id})
                .then(answers => {
                  const filteredAnswers = [];
                  answers.forEach(a => filteredAnswers.push({id: a._id, created: a.created, modified: a.modified, answer: a.answer, correct: a.correct}));
                  return res(filteredAnswers).code(200);
                });
            }
          }
        });
      }
    }
  },
  {
    method: `POST`,
    path: `/api/answer`,
    config: {
      description: `Post new answer`,
      tags: [`api`],
      validate: {
        payload: {
          id: Joi.string().length(24).required().description(`ID of question to link answer to`).example(`590e165d3b8f8d41d8e2b145`),
          answer: Joi.string().required().description(`Answer`).example(`Who was the first king of Belgium?`),
          correct: Joi.boolean().required().description(`Is correct answer?`).example(true)
        }
      },
      response: {
        schema: answerSchema
      },
      handler: (req, res) => {
        const {id, answer, correct} = req.payload;
        const answerObj = new Answer({questionID: id, answer, correct});
        answerObj.save()
          .then(a => {
            const filteredAnswer = {id: a._id, created: a.created, modified: a.modified, answer: a.answer, correct: a.correct};
            return res(filteredAnswer).code(201);
          })
          .catch(err => {
            if (err) console.log(err);
            return res({statusCode: 500, error: `Something went wrong creating new answer.`}).code(500);
          });
      }
    }
  },
  {
    // ??? VALIDATE 2 PAYLOAD VALUES, ONLY 1 NEEDED ???
    method: `PUT`,
    path: `/api/answer/{id}`,
    config: {
      description: `Update answer`,
      tags: [`api`],
      validate: {
        params: {
          id: Joi.string().length(24).description(`ID of answer to update`).example(`590e165d3b8f8d41d8e2b145`)
        },
        payload: {
          answer: Joi.string().required().description(`Answer`).example(`Who was the first king of Belgium?`),
          correct: Joi.boolean().required().description(`Is answer correct?`).example(true)
        }
      },
      response: {
        schema: answerSchema
      },
      handler: (req, res) => {
        const {answer, correct} = req.payload;
        const {id} = req.params;
        Answer.findById(id, (err, foundObj) => {
          if (err) {
            console.log(err);
            if (!foundObj.isActive) return res(Boom.notFound(`Answer doesn't exist.`));
          }
          if (foundObj) {
            if (!foundObj.isActive) {
              return res(Boom.notFound(`Answer doesn't exist.`));
            } else {
              if (foundObj.answer !== answer) foundObj.answer = answer;
              if (foundObj.correct !== correct) foundObj.correct = correct;
              foundObj.save()
                .then(() => {
                  const filteredAnswer = {id: foundObj.id, created: foundObj.created, updated: foundObj.updated, questionID: foundObj.questionID, answer: foundObj.answer, correct: foundObj.correct};
                  return res(filteredAnswer).code(200);
                })
                .catch(err => {
                  if (err) console.log(err);
                  return res({statusCode: 500, error: `Something went wrong updating this answer.`}).code(500);
                });
            }
          }
        });
      }
    }
  },
  {
    method: `DELETE`,
    path: `/api/answer/{id}`,
    config: {
      description: `Delete answer`,
      tags: [`api`],
      validate: {
        params: {
          id: Joi.string().length(24).description(`ID of answer to delete`).example(`590e165d3b8f8d41d8e2b145`)
        }
      },
      handler: (req, res) => {
        const {id} = req.params;
        Answer.findById(id, (err, foundObj) => {
          if (err) {
            console.log(err);
            if (!foundObj.isActive) return res(Boom.notFound(`Answer doesn't exist.`));
          }
          if (foundObj) {
            if (!foundObj.isActive) {
              return res(Boom.notFound(`Answer doesn't exist.`));
            } else {
              foundObj.isActive = false;
              foundObj.save()
                .then(() => res({statusCode: 200, message: `Answer deleted.`}).code(200))
                .catch(err => {
                  if (err) console.log(err);
                  return res({statusCode: 500, error: `Something went wrong deleting this answer.`}).code(500);
                });
            }
          }
        });
      }
    }
  }
];
