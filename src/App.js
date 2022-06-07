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
          <Route exact path="/creative_garbage" element={<Home />}></Route>
          <Route path="/creative_garbage/detail" element={<Detail />}></Route>
          <Route
            path="/creative_garbage/hardcoded"
            element={<HardcodedDetail />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
