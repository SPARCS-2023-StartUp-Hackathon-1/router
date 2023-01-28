import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import BaseGrid from "components/templates/Basegrid";

import HomeScreen from "screens/HomeScreen";
import LoginScreen from "screens/LoginScreen";
import TravelScreen from "screens/TravelScreen";

import "./App.css";

function App() {
  return (
    <Router>
      <BaseGrid>
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/travel" element={<TravelScreen />} />
        </Routes>
      </BaseGrid>
    </Router>
  );
}

export default App;
