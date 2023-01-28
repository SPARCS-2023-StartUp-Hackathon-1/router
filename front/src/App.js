import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import BaseGrid from "components/templates/Basegrid";

import HomeScreen from "screens/HomeScreen";
import LoginScreen from "screens/LoginScreen";
import PastScreen from "screens/PastScreen";
import TravelScreen from "screens/TravelScreen";
import CreateScreen from "screens/CreateScreen";
import ProfileScreen from "screens/ProfileScreen";
import TestImageUpload from "screens/TestImageUpload";

import "./App.css";

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <BaseGrid>
          <Routes>
            <Route path="*" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/past" element={<PastScreen />} />
            <Route path="/travel/:tripId" element={<TravelScreen />} />
            <Route path="/create" element={<CreateScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/testImageUpload" element={<TestImageUpload />} />
          </Routes>
        </BaseGrid>
      </Router>
    </RecoilRoot>
  );
};

export default App;
