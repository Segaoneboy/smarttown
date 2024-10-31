import RegistrationPage from "./pages/RegistrationPage";
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import AuthorisationPage from "./pages/АuthorisationPage";

function App() {
  return (
    <>
      <Routes>
        <Route path = "/" element={<MainPage/>}/>
        <Route path = "/registration" element={<RegistrationPage/>}/>
          <Route path = "/authorisation" element={<AuthorisationPage/>}/>
      </Routes>
    </>
  );
}

export default App;
