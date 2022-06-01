import './style.css';
import { Detail } from './components/Detail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';

export function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/detail/:label" element={<Detail />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
