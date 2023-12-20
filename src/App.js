import './App.css';
import { Provider } from 'react-redux';

import store from './store/index.js';
import Input from './components/Input';
import Table from './components/Table.jsx';

const App = () => (
  
  <div className='container'>
    <Provider store={store}>
      <Input />
      <Table />
    </Provider>
  </div>
)

export default App;
