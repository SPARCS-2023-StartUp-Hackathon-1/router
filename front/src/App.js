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
import TravelScreen from "screens/TravelScreen";
import TestImageUpload from "screens/TestImageUpload";

import "./App.css";

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <BaseGrid>
          <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/travel" element={<TravelScreen />} />
            <Route path="/testImageUpload" element={<TestImageUpload />} />
          </Routes>
        </BaseGrid>
      </Router>
    </RecoilRoot>
  );
};

export default App;
