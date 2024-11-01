import RegistrationPage from "./pages/RegistrationPage";
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import AuthorisationPage from "./pages/АuthorisationPage";
import OpinionBoardPage from "./pages/OpinionBoardPage";
import PrivateAccountPage from "./pages/PrivateAccountPage";
import PosterPage from "./pages/PosterPage";
import NotFoundPage from "./pages/NotFoundPage";
import EmergencyPage from "./pages/EmergencyPage";


function App() {
  return (
    <>
      <Routes>
        <Route path = "/" element={<MainPage/>}/>
        <Route path = "/registration" element={<RegistrationPage/>}/>
          <Route path = "/authorisation" element={<AuthorisationPage/>}/>
          <Route path = "/opinionboard" element={<OpinionBoardPage/>}/>
          <Route path = "/account" element={<PrivateAccountPage/>}/>
          <Route path = "/posterpage" element={<PosterPage/>}/>
          <Route path = "/sos" element={<EmergencyPage/>}/>
          <Route path = {"*"} element={<NotFoundPage/>}/>
      </Routes>
    </>
  );
}

export default App;
