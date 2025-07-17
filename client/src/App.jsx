import NavBar from './components/NavBar.jsx';
import { Routes, Route } from 'react-router-dom';
import WorkExperience from './routes/WorkExperience.jsx';
import Consultancy from './routes/Consultancy.jsx';
import CompletedProjects from './routes/CompletedProjects.jsx';
import OngoingProjects from './routes/OngoingProjects.jsx';

function App() {
  return (
    <>
      <NavBar />
      <div className="pt-20 px-6">
        <Routes>
          <Route path="/" element={<WorkExperience />} />
          <Route path="/consultancy" element={<Consultancy />} />
          <Route path="/completed-projects" element={<CompletedProjects />} />
          <Route path="/ongoing-projects" element={<OngoingProjects />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
