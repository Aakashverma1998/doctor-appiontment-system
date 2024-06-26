import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notofication from "./pages/Notofication";
import Users from "./pages/admin/Users";
import Doctor from "./pages/admin/Doctor";
import Profile from "./pages/doctor/Profile";
import ForgetPaasword from "./pages/ForgetPaasword";
import ResetPassword from "./pages/ResetPassword";
import Booking from "./pages/Booking";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import UserProfile from "./pages/UserProfile";
import VerifyMail from "./pages/VerifyMail";

function App() {
  const { loading } = useSelector((state) => state.alert);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  {" "}
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/apply-doctor"
              element={
                <ProtectedRoute>
                  {" "}
                  <ApplyDoctor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  {" "}
                  <Notofication />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  {" "}
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute>
                  {" "}
                  <Doctor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/api/v1/user/forgetPassword"
              element={
                <PublicRoute>
                  {" "}
                  <ForgetPaasword />
                </PublicRoute>
              }
            />
            <Route
              path="/doctor/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/api/v1/user/resetPassword/:id"
              element={
                <PublicRoute>
                  {" "}
                  <ResetPassword />
                </PublicRoute>
              }
            />
            <Route
              path="/doctor/book-appointment/:id"
              element={
                <ProtectedRoute>
                  {" "}
                  <Booking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  {" "}
                  <Appointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/appointments"
              element={
                <ProtectedRoute>
                  {" "}
                  <DoctorAppointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/profile"
              element={
                <ProtectedRoute>
                  {" "}
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/api/v1/user/verifyMail/:id"
              element={
                <PublicRoute>
                  <VerifyMail/>
                </PublicRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
