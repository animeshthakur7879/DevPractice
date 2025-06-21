import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import EditorPage from './pages/EditorPage';
import PublicSnippetPage from './pages/PublicSnippetPage';
import CommunityPage from './pages/CommunityPage';

function App() {
  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/editor/:sid" element={<EditorPage />} />
          <Route path="/snippet/:sid" element={<PublicSnippetPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;