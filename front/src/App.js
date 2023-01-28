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
import "./App.css";

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <BaseGrid>
          <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
          </Routes>
        </BaseGrid>
      </Router>
    </RecoilRoot>
  );
};

export default App;
