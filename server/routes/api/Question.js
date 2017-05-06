const {Question} = require(`mongoose`).models;
const Boom = require(`boom`);
const Joi = require(`joi`);

// GET all questions by quiz ID

// POST question for quiz
  // payload: [
  //   {id: `quiz ID`},
  //   {question: `new question`}
  // ]

// PUT updated question by question ID
  // params: [`question ID`]
  // payload: [ {question: `updated question`} ]

// DELETE question by question ID
  // params: [`question ID`]

module.exports = [
  {
    method: `GET`,
    path: `/api/question/{id}`,
    config: {
      validate: {
        params: {
          id: Joi.string().length(24).required()
        }
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
      validate: {
        payload: {
          id: Joi.string().length(24).required(),
          question: Joi.string().required()
        }
      },
      handler: (req, res) => {
        const {id, question} = req.payload;
        if (!id) return res(Boom.badRequest(`No quiz ID provided.`));
        if (!question) return res(Boom.badRequest(`No question provided.`));
        const questionObj = new Question({quizID: id, question});
        questionObj.save()
          .then(question => res(question).code(200))
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
      validate: {
        params: {
          id: Joi.string().length(24).required()
        },
        payload: {
          question: Joi.string().required()
        }
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
