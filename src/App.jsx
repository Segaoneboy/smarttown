import RegistrationPage from "./pages/RegistrationPage";
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import AuthorisationPage from "./pages/АuthorisationPage";
import PosterPage from "./pages/PosterPage";
import OpinionBoardPage from "./pages/OpinionBoardPage";
import PrivateAccountPage from "./pages/PrivateAccountPage";
import useCookieCheck from "./lib/useCookieCheck";

function App() {
  return (
    <>
      <Routes>
        <Route path = "/" element={<MainPage/>}/>
        <Route path = "/registration" element={<RegistrationPage/>}/>
          <Route path = "/authorisation" element={<AuthorisationPage/>}/>
          <Route path = "/createpost" element={<PosterPage/>}/>
          <Route path = "/opinionboard" element={<OpinionBoardPage/>}/>
          <Route path = "/account" element={<PrivateAccountPage/>}/>
      </Routes>
    </>
  );
}

export default App;
