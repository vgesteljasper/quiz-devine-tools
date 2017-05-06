const {API_BASE} = process.env;
const route = `${API_BASE}/test`;

module.exports = [

  {

    method: `GET`,
    path: `${route}`,

    handler: (req, res) => {
      return res(`ok`);
    }

  }

];
