import React from 'react';
import {observer, inject, PropTypes} from 'mobx-react';

import QuizList from './../components/QuizList';
import Add from './../components/Add/';

const IndexPage = ({store}) => (
  <div className='indexpage-content'>
    <QuizList />
    {store.isCreating ? <Add /> : null}
  </div>
);

IndexPage.propTypes = {
  store: PropTypes.observableObject.isRequired
};

export default inject(`store`)(observer(IndexPage));
