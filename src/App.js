import './App.css';
import { Provider } from 'react-redux';

import store from './store/index.js';
import Input from './components/Input';

const App = () => (
  
  <div className='container'>
    <Provider store={store}>
      <Input />
    </Provider>
  </div>
)

export default App;
