const {Quiz, Question, Answer} = require(`mongoose`).models;
const Boom = require(`boom`);
const Joi = require(`joi`);

// GET all quezzes

// GET quiz + questions + answers by quiz ID
  // params: [`quiz ID`]

// POST new quiz
  // payload: [ {name: `quiz name`} ]

// PUT updated quiz by quiz ID
  // params: [`quiz ID`]
  // payload: [ {name: `updated quiz name`} ]

// DELETE quiz by quiz ID
  // params: [`quiz ID`]

module.exports = [
  {
    method: `GET`,
    path: `/api/quiz`,
    handler: (req, res) => {
      Quiz.find({isActive: true})
        .then(quizzes => {
          const filteredQuizzes = [];
          quizzes.forEach(q => filteredQuizzes.push({id: q._id, created: q.created, modified: q.modified, name: q.name}));
          return res(filteredQuizzes).code(200);
        });
    }
  },
  {
    method: `GET`,
    path: `/api/quiz/{id}`,
    config: {
      validate: {
        params: {
          id: Joi.string().length(24).required()
        }
      },
      handler: (req, res) => {
        const {id} = req.params;
        Quiz.findById(id, (err, foundQuiz) => {
          if (err) {
            console.log(err);
            return res(Boom.notFound(`Quiz doesn't exist.`));
          }
          if (foundQuiz) {
            if (!foundQuiz.isActive) {
              return res(Boom.notFound(`Quiz doesn't exist.`));
            } else {
              const quizObj = {id: foundQuiz._id, created: foundQuiz.created, modified: foundQuiz.modified, name: foundQuiz.name};
              const questionsArr = [];
              Question.find({quizID: id, isActive: true})
                .then(questions => {
                  questions.forEach(q => {
                    const questionObj = {id: q._id, created: q.created, modified: q.modified, question: q.question};
                    Answer.find({questionID: questionObj.id, isActive: true})
                      .then(foundAnswers => {
                        const answersArr = [];
                        foundAnswers.forEach(a => answersArr.push({id: a._id, created: a.created, modified: a.modified, answer: a.answer, correct: a.correct}));
                        return answersArr;
                      })
                      .then(answers => {
                        questionObj.answers = answers;
                        questionsArr.push(questionObj);
                        quizObj.questions = questionsArr;
                        return res(quizObj).code(200);
                      })
                      .catch(err => {
                        if (err) console.log(err);
                        return res(quizObj).code(200);
                      });
                  });
                })
                .catch(err => {
                  if (err) console.log(err);
                  res(quizObj).code(200);
                });
            }
          }
        });
      }
    }
  },
  {
    method: `POST`,
    path: `/api/quiz`,
    config: {
      validate: {
        payload: {
          name: Joi.string().required()
        }
      },
      handler: (req, res) => {
        const {name} = req.payload;
        const quizObj = new Quiz({name});
        quizObj.save()
          .then(quiz => {
            const filteredQuiz = {id: quiz._id, created: quiz.created, modified: quiz.modified, name: quiz.name};
            return res(filteredQuiz).code(200);
          })
          .catch(err => {
            if (err) console.log(err);
            return res({statusCode: 500, error: `Something went wrong creating new quiz.`}).code(500);
          });
      }
    }
  },
  {
    method: `PUT`,
    path: `/api/quiz/{id}`,
    config: {
      validate: {
        params: {
          id: Joi.string().length(24).required()
        },
        payload: {
          name: Joi.string().required()
        }
      },
      handler: (req, res) => {
        const {id} = req.params;
        const {name} = req.payload;
        if (!name) return res(Boom.badRequest(`No name provided.`));
        Quiz.findById(id, (err, foundObj) => {
          if (err) {
            console.log(err);
            return res(Boom.notFound(`quiz doesn't exist.`));
          }
          if (foundObj) {
            if (!foundObj.isActive) {
              return res(Boom.notFound(`quiz doesn't exist.`));
            } else {
              foundObj.name = name;
              foundObj.save()
                .then(quiz => res(quiz).code(200))
                .catch(err => {
                  if (err) console.log(err);
                  return res({statusCode: 500, error: `Something went wrong updating this quiz.`}).code(500);
                });
            }
          }
        });
      }
    }
  },
  {
    method: `DELETE`,
    path: `/api/quiz/{id}`,
    config: {
      validate: {
        params: {
          id: Joi.string().length(24).required()
        }
      },
      handler: (req, res) => {
        const {id} = req.params;
        Quiz.findById(id, (err, foundObj) => {
          if (err) {
            console.log(err);
            return res(Boom.notFound(`Quiz doesn't exist.`));
          }
          if (foundObj) {
            if (!foundObj.isActive) {
              return res(Boom.notFound(`Quiz doesn't exist.`));
            } else {
              foundObj.isActive = false;
              foundObj.save()
                .then(() => res({statusCode: 200, message: `Quiz deleted.`}).code(200))
                .catch(err => {
                  if (err) console.log(err);
                  return res({statusCode: 500, error: `Something went wrong deleting this quiz.`}).code(500);
                });
            }
          }
        });
      }
    }
  }
];
