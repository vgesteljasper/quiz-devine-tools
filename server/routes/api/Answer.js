const {Question, Answer} = require(`mongoose`).models;
const Boom = require(`boom`);
const Joi = require(`joi`);

// GET answers by question ID
  // params: [`question ID`]

// POST anwser by question ID
  // payload: [
  //   {id: `question ID`},
  //   {answer: `answer`},
  //   {correct: `true/false`}
  // ]

// PUT updated answer by answer ID
  // params: [`answer ID`]
  // payload: [
  //   { answer: `updated answer` },
  //   { correct: true/false }
  // ]

// DELETE answer by answer ID
  // params: [`answer ID`]

module.exports = [
  {
    method: `GET`,
    path: `/api/answer/{id}`,
    config: {
      validate: {
        params: {
          id: Joi.string().length(24).required()
        }
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
      validate: {
        payload: {
          id: Joi.string().length(24),
          answer: Joi.string().required(),
          correct: Joi.boolean().required()
        }
      },
      handler: (req, res) => {
        const {id, answer, correct} = req.payload;
        const answerObj = new Answer({questionID: id, answer, correct});
        answerObj.save()
          .then(a => {
            const filteredAnswer = {id: a._id, created: a.created, modified: a.modified, answer: a.answer, correct: a.correct};
            return res(filteredAnswer).code(200);
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
      validate: {
        params: {
          id: Joi.string().length(24)
        },
        payload: {
          answer: Joi.string().required(),
          correct: Joi.boolean().required()
        }
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
      validate: {
        params: {
          id: Joi.string().length(24)
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
