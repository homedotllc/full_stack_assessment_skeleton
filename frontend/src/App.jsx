import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import HomesForUser from './components/HomesForUser';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <HomesForUser />
      </div>
    </Provider>
  );
}

export default App;
