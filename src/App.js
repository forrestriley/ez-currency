import { HashRouter as Router, Routes, Route } from 'react-router-dom'

//css
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
//pages
import {Home} from './pages/Home'
import {Calc} from './pages/Calc'
import {Rates} from './pages/Rates'
//componets
import { Layout } from './Componets/Layout';

function App() {
  return (
      <>
        <Router>
          <Routes>
            <Route element={<Layout/>}>
              <Route path="/" element={<Home/>}/>
              <Route path="/calc" element={<Calc/>}/>
              <Route path="/rates" element={<Rates/>}/>
            </Route>
          </Routes>
        </Router>

      </>
  );
}

export default App;
