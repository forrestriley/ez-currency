import { HashRouter as Router, Routes, Route } from 'react-router-dom'

//css
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
//pages
import {Home} from './pages/Home'
import {Calc} from './pages/Calc'
import {Rates} from './pages/Rates'

function App() {
  return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/calc" element={<Calc/>}/>
            <Route path="/rates" element={<Rates/>}/>
          </Routes>
        </Router>

      </>
  );
}

export default App;
