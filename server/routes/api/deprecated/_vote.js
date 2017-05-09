const {Answer, Question} = require(`mongoose`).models;
const Boom = require(`boom`);
const Joi = require(`joi`);
Joi.objectId = require(`joi-objectid`)(Joi);


const voteSchema = Joi.object().keys({
  answerId: Joi.description(`ID of answer`).example(`590e165d3b8f8d41d8e2b145`).required(),
  votes: Joi.number().integer().description(`Amount of votes for this answer`).example(347).required()
});


const GET = {
  method: `GET`,
  path: `/api/vote/{questionId}`,
  config: {
    description: `Get amount of votes for all answers that belong to question ID`,
    tags: [`api`, `get`],
    validate: {
      params: {
        questionId: Joi.objectId().description(`ID of question to find answers for.`).example(`590e165d3b8f8d41d8e2b145`).required()
      }
    },
    response: {
      schema: Joi.array().items(voteSchema)
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
      const {questionId} = req.params;
      Question.findOne({_id: questionId, isActive: true}, (err, question) => {
        if (err) {
          console.log(err);
          res(Boom.badImplementation(`An internal server error occurred`));
        }
        if (question) {
          Answer.find({questionId, isActive: true}, (err, answers) => {
            if (err) {
              console.log(err);
              res(Boom.badImplementation(`An internal server error occurred`));
            }
            if (answers.length > 0) {
              const filteredVotes = [];
              answers.forEach(a => {
                filteredVotes.push({answerId: a._id, votes: a.votes});
              });
              res(filteredVotes).code(200);
            } else {
              res(Boom.notFound(`No answers could be found for question with this ID`));
            }
          });
        } else {
          res(Boom.notFound(`No question could be found with this ID`));
        }
      });
    }
  }
};


module.exports = [GET];
