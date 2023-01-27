import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import BaseGrid from "components/templates/Basegrid";
import HomeScreen from "screens/HomeScreen";
import "./App.css";

function App() {
  return (
    <Router>
      <BaseGrid>
        <Routes>
          <Route path="*" element={<Navigate to="/home" replace />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </BaseGrid>
    </Router>
  );
}

export default App;
