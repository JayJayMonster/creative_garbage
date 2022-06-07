import './style.css';
import { Detail } from './components/Detail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { HardcodedDetail } from './components/HardcodedDetail';

export function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/detail" element={<Detail />}></Route>
          <Route path="/hardcoded" element={<HardcodedDetail />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
