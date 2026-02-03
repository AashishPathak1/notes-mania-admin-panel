import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import PageWrapper from "./components/PageWrapper";

import Dashboard from "./pages/Dashboard";
import Course from "./pages/Course";
import CourseName from "./pages/CourseName";
import BranchName from "./pages/BranchName";

function App() {
  return (
    <Router>
      <PageWrapper>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Course Routes */}
          <Route path="/course" element={<Course />} />
          <Route path="/course/name" element={<CourseName />} />
          <Route path="/course/branch" element={<BranchName />} />
        </Routes>
      </PageWrapper>
    </Router>
  );
}

export default App;
