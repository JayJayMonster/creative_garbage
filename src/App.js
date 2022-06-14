import './style.css';
import './assets/MyFontsWebfontsKit/MyFontsWebfontsKit.css'
import { Detail } from './components/Detail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { HardcodedDetail } from './components/HardcodedDetail';
import usedMediaQuery from './components/useMediaQuery';

export function App() {
  const matches = usedMediaQuery("(min-width: 600px)");
  
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
