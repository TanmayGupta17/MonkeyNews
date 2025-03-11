import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import NewsComponent from './Components/NewsComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './Components/About';

function App() {
  const [query, setQuery] = useState('');

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  // business
  // entertainment
  // general
  // health
  // science
  // sports
  // technology
  return (
    <Router>
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route path="/Home" element={<NewsComponent query={query} />} />
        <Route path="/About" element={<About />} />
        <Route path="/general" element={<NewsComponent category="general" query={query}/>} />
        <Route path="/business" element={<NewsComponent category="business" query={query}/>} />
        <Route path="/entertainment" element={<NewsComponent category="entertainment" query={query}/>} />
        <Route path="/health" element={<NewsComponent category="health" query={query}/>} />
        <Route path="/science" element={<NewsComponent category="science" query={query}/>} />
        <Route path="/sports" element={<NewsComponent category="sports" query={query}/>} />
        <Route path="/technology" element={<NewsComponent category="technology" query={query}/>} />
        {/* <Route path="/Contact" element={<div>Contact</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;