import React from 'react';
import { Provider } from 'react-redux';

import store from './store/index.js';
import Input from './components/Input.jsx';

const App = () => (
  <div className="container">
    <Provider store={store}>
      <Input />
    </Provider>
  </div>
);

export default App;
