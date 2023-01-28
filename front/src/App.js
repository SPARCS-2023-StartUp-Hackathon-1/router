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
import CreateScreen from "screens/CreateScreen";
import ProfileScreen from "screens/ProfileScreen";

import "./App.css";

function App() {
  return (
    <Router>
      <BaseGrid>
        <Routes>
          <Route path="*" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/travel" element={<TravelScreen />} />
          <Route path="/create" element={<CreateScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      </BaseGrid>
    </Router>
  );
}

export default App;
