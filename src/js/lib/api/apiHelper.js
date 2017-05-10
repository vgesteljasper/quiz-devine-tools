export const quizAPI =  {
  get: () => {
    return fetch(`/api/quizzes`)
      .then(response => {
        if (response.status !== 200) throw new Error();
        return response;
      })
      .then(response => response.json())
      .then(results => results.quizzes);
  },
  insert: name => {
    const method = `POST`;
    const body = new FormData();
    body.append(`name`, name);
    return fetch(`/api/quizzes?fields=created,name`, {method, body})
      .then(response => {
        if (response.status !== 201) throw new Error();
        return response.json();
      });
  }
};

export const questionAPI = {
  get: _id => {
    return fetch(`/api/questions?quizId=${_id}&fields=question`)
      .then(response => {
        if (response.status !== 200) throw new Error();
        return response;
      })
      .then(response => response.json())
      .then(results => results.questions);
  },
  insert: (quizId, question) => {
    const method = `POST`;
    const body = new FormData();
    body.append(`quizId`, quizId);
    body.append(`question`, question);
    return fetch(`/api/questions`, {method, body})
      .then(response => {
        if (response.status !== 201) throw new Error();
        return response.json();
      });
  }
};

export const answerAPI = {
  get: _id => {
    return fetch(`/api/answers?questionId=${_id}&fields=answer,votes`)
      .then(response => {
        if (response.status !== 200) throw new Error();
        return response;
      })
      .then(response => response.json())
      .then(results => results.answers);
  },
  insert: (questionId, answer, correct) => {
    const method = `POST`;
    const body = new FormData();
    body.append(`questionId`, questionId);
    body.append(`answer`, answer);
    body.append(`correct`, correct);
    return fetch(`/api/answers`, {method, body})
      .then(response => {
        if (response.status !== 201) throw new Error();
        return response.json();
      });
  }
};

export const voteAPI = {
  get: _id => {
    return fetch(`/api/answers?questionId=${_id}&fields=votes`)
      .then(response => {
        if (response.status !== 200) throw new Error();
        return response.json();
      })
      .then(results => results.answers);
  },
  voteUp: _id => {
    const method = `PATCH`;
    const body = new FormData();
    body.append(`votesInc`, `+1`);
    return fetch(`/api/answers/${_id}?fields=votes`, {method, body})
      .then(response => {
        if (response.status !== 200) throw new Error();
        return response.json();
      });
  }
};
