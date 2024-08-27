import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Browse from './pages/Browse';
import 'swiper/swiper-bundle.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Browse />} />
      </Routes>
    </Router>
  );
}

export default App;
