import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Browse from './pages/Browse';
import 'swiper/swiper-bundle.css';
import SearchDetails from './pages/SearchDetails';
import CategoryDetails from './pages/CategoryDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/search" element={<SearchDetails />} />
        <Route path="/category/:slug" element={<CategoryDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
