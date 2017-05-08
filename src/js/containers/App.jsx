import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
// import {observer, inject, PropTypes} from 'mobx-react';
// import DevTools from 'mobx-react-devtools';

import routes from './../routes/';

// import Header from './../components/Header/';
// import Quizzes from './../components/Quizzes';
// import Add from './../components/Add/';

// const App = ({store}) => {
//
//   return (
//     <div>
//       {/* {process.env.NODE_ENV !== `production` ? <DevTools /> : null} */}
//       <Header />
//       <Quizzes />
//       {
//         store.isCreating
//           ? <Add />
//           : null
//       }
//     </div>
//   );
//
// };

class App extends Component {

  state = {}

  render() {
    return <Router routes={routes} />;
  }
}

export default App;
