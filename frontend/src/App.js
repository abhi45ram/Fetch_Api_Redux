import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Table from './Components/Table';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={ 
            <>
              <Table />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
