import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Admin/DashboardPage";
import OfficerReg from "./pages/Admin/OfficerRegPage";
import Officers from "./pages/Admin/OfficersPage";
import Drivers from "./pages/Admin/DriversPage";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import ForgotPassword from "./pages/ForgotPassword";
import AdminProfile from "./pages/Admin/Profile";
import Stations from "./pages/Admin/StationsPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin" element={<PrivateRoute />}>
            <Route path="/admin" element={<Dashboard />} />
          </Route>
          <Route path="/admin/officerReg" element={<PrivateRoute />}>
            <Route path="/admin/officerReg" element={<OfficerReg />} />
          </Route>
          <Route path="/admin/officers" element={<PrivateRoute />}>
            <Route path="/admin/officers" element={<Officers />} />
          </Route>
          <Route path="/admin/drivers" element={<PrivateRoute />}>
            <Route path="/admin/drivers" element={<Drivers />} />
          </Route>
          <Route path="/admin/stations" element={<PrivateRoute />}>
            <Route path="/admin/stations" element={<Stations />} />
          </Route>
          
          <Route path="/admin/profile" element={<PrivateRoute />}>
            <Route path="/admin/profile" element={<AdminProfile />} />
          </Route>

          {/* <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/category/:categoryName/:listingId"
            element={<Listing />}
          />
          <Route path="/offers" element={<Offers />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="create-listing" element={<PrivateRoute />}>
            <Route path="/create-listing" element={<CreateVehicleListing />} />
          </Route>
          <Route path="edit-listing" element={<PrivateRoute />}>
            <Route path="/edit-listing/:listingId" element={<EditListing />} />
          </Route> */}
        </Routes>

      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
