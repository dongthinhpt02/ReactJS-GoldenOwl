import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ScoreBySBD from './components/ScoreBySBD';
import ScoreSummary from './components/ScoreSumary';
import TopStudents from './components/TopStudents';

function App() {


  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>G Scores</h1>
        </header>

        <div className="container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
         

          {/* Sidebar */}
          <aside className="sidebar">
            <h3>Menu</h3>
            <ul>
              <li style={{ marginBottom: '10px' }}><Link to="/top10">Dashboard</Link></li>
              <li style={{ marginBottom: '10px' }}><Link to="/search">Search Scores</Link></li>
              <li style={{ marginBottom: '10px' }}><Link to="/report">Reports</Link></li>
              <li style={{ marginBottom: '10px' }}><Link to="/settings">Settings</Link></li>
            </ul>
          </aside>

          <div className="content" style={{ flex: 1, padding: '20px' }}>
            <Routes>
              <Route path="/top10" element={<TopStudents />} />
              <Route path="/search" element={<ScoreBySBD />} />
              <Route path="/report" element={<ScoreSummary />} />
              <Route path="/settings" element={<div>Cài đặt</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
