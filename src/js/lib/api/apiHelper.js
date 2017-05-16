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
  },
  remove: quizId => {
    const method = `DELETE`;
    return fetch(`/api/quizzes/${quizId}`, {method})
      .then(response => {
        if (response.status !== 204) throw new Error();
        return true;
      });
  },
  togglePublished: (quizId, published) => {
    const method = `PATCH`;
    const body = new FormData();
    body.append(`published`, published);
    return fetch(`/api/quizzes/${quizId}`, {method, body})
      .then(response => {
        if (response.status !== 200) throw new Error();
        return true;
      });
  },
  update: (quizId, name) => {
    const method = `PATCH`;
    const body = new FormData();
    body.append(`name`, name);
    return fetch(`/api/quizzes/${quizId}`, {method, body})
      .then(response => {
        if (response.status !== 200) throw new Error();
        return true;
      });
  }
};

export const questionAPI = {
  get: () => {
    return fetch(`/api/questions?isActive=true`)
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
  },
  remove: questionId => {
    const method = `DELETE`;
    return fetch(`/api/questions/${questionId}`, {method})
      .then(response => {
        if (response.status !== 204) throw new Error();
        return true;
      });
  },
  update: (questionId, question) => {
    const method = `PATCH`;
    const body = new FormData();
    body.append(`question`, question);
    return fetch(`/api/questions/${questionId}`, {method, body})
      .then(response => {
        if (response.status !== 200) throw new Error();
        return true;
      });
  }
};

export const answerAPI = {
  get: () => {
    return fetch(`/api/answers`)
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
  },
  remove: answerId => {
    const method = `DELETE`;
    return fetch(`/api/answers/${answerId}`, {method})
      .then(response => {
        if (response.status !== 204) throw new Error();
        return true;
      });
  },
  vote: answerId => {
    const method = `PATCH`;
    const body = new FormData();
    body.append(`votesInc`, `+1`);
    return fetch(`/api/answers/${answerId}?fields=votes`, {method, body})
      .then(response => {
        if (response.status !== 200) throw new Error();
        return response.json();
      });
  }
};

export const voteAPI = {
  get: questionId => {
    return fetch(`/api/answers?questionId=${questionId}&fields=votes`)
      .then(response => {
        if (response.status !== 200) throw new Error();
        return response.json();
      })
      .then(results => results.answers);
  }
};
