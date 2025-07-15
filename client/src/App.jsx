// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LandingPage from './pages/LandingPage';
// import DashboardPage from './pages/DashboardPage';
// import EditorPage from './pages/EditorPage';
// import PublicSnippetPage from './pages/PublicSnippetPage';
// import CommunityPage from './pages/CommunityPage';
// import PrivateRoute from './components/Layout/PrivateRoute';

// function App() {
//   return (
//     <div className="dark">
//       <Router>
//         <Routes>
//           {/* Public Route */}
//           <Route path="/" element={<LandingPage />} />

//           {/* Protected Routes */}
//           <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
//           <Route path="/community" element={<PrivateRoute><CommunityPage /></PrivateRoute>} />
//           <Route path="/editor" element={<PrivateRoute><EditorPage /></PrivateRoute>} />
//           <Route path="/editor/:sid" element={<PrivateRoute><EditorPage /></PrivateRoute>} />
//           <Route path="/snippet/:sid" element={<PrivateRoute><PublicSnippetPage /></PrivateRoute>} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import EditorPage from './pages/EditorPage';
import PublicSnippetPage from './pages/PublicSnippetPage';
import CommunityPage from './pages/CommunityPage';
import PrivateRoute from './components/Layout/PrivateRoute';
// import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="dark">
      <Router>
        <Routes>

          {/* Public Route */}
          <Route path="/" element={<LandingPage />} />

          {/* Protected Routes using Outlet */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/editor/:sid" element={<EditorPage />} />
            <Route path="/snippet/:sid" element={<PublicSnippetPage />} />
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
