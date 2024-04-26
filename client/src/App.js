import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import {useSelector} from "react-redux"
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notofication from "./pages/Notofication";
import Users from "./pages/admin/Users";
import Doctor from "./pages/admin/Doctor";
import Profile from "./pages/doctor/Profile";

function App() {
  const {loading} = useSelector(state => state.alert)
  return (
   <>
   <BrowserRouter>
   {loading ?  (<Spinner/>) :(
       <Routes>
       <Route path="/" element = {<ProtectedRoute> <HomePage /></ProtectedRoute>}/>
       <Route path="/apply-doctor" element = {<ProtectedRoute> <ApplyDoctor /></ProtectedRoute>}/>
       <Route path="/notification" element = {<ProtectedRoute> <Notofication /></ProtectedRoute>}/>
       <Route path="/users" element = {<ProtectedRoute> <Users /></ProtectedRoute>}/>
       <Route path="/doctors" element = {<ProtectedRoute> <Doctor /></ProtectedRoute>}/>
       <Route path="/doctor/profile/:id" element = {<ProtectedRoute> <Profile /></ProtectedRoute>}/>
       <Route path="/appointments" element = {<ProtectedRoute> <HomePage /></ProtectedRoute>}/>
       <Route path="/signup" element = {<PublicRoute><Signup/></PublicRoute>}/>
       <Route path="/login" element = {<PublicRoute><Login/></PublicRoute>}/>
      </Routes>

   )}
   </BrowserRouter>

   </>
  );
}

export default App;
