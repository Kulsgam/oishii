import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Loading from "@/pages/intro/Loading";
import GetStarted from "@/pages/intro/GetStarted";
import CookType from "@/pages/intro/CookType";
import NameForm from "./pages/intro/NameForm";
import TellUsMore from "./pages/intro/TellUsMore";
import HowOftenCook from "./pages/intro/HowOftenCook";
import Dietary from "./pages/intro/Dietary";
import Allergies from "./pages/intro/Allergies";
import Purpose from "./pages/intro/Purpose";
import HomeAddress from "@/pages/intro/HomeAddress";
import UniEmail from "@/pages/intro/UniEmail";
import Verification from "@/pages/intro/Verification";
import Login from "@/pages/intro/Login";
import Welcome from "@/pages/intro/Welcome";
import DescribeNeeds from "@/pages/intro/DescribeNeeds";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";

import "./App.css";
import DiscoverMeal from "./pages/dashboard/DiscoverMeal";
import MealSwap from "./pages/dashboard/MealSwap";
import MealForm from "./pages/dashboard/MealForm";
import TimeSelector from "./pages/dashboard/TimeSelector";
import DeliveryMethod from "./pages/dashboard/DeliveryMethod";
import MealDetail from "./pages/dashboard/MealDetail";
import Profile from "./pages/dashboard/Profile";
import DrFoodlove from "./pages/dashboard/DrFoodlove";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/intro/welcome" />} />
        <Route path="intro/welcome" element={<Welcome />} />
        <Route path="intro/login" element={<Login />} />
        <Route path="intro/nameform" element={<NameForm />} />
        <Route path="intro/tellusmore" element={<TellUsMore />} />
        <Route path="intro/getstarted" element={<GetStarted />} />
        <Route path="intro/cooktype" element={<CookType />} />
        <Route path="intro/howoftencook" element={<HowOftenCook />} />
        <Route path="intro/dietary" element={<Dietary />} />
        <Route path="intro/allergies" element={<Allergies />} />
        <Route path="intro/purpose" element={<Purpose />} />
        <Route path="intro/homeaddress" element={<HomeAddress />} />
        <Route path="intro/uniemail" element={<UniEmail />} />
        <Route path="intro/verification" element={<Verification />} />
        <Route path="intro/loading" element={<Loading />} />
        <Route path="intro/describeneeds" element={<DescribeNeeds />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard/discovermeal" element={
          <ProtectedRoute>
            <DiscoverMeal />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/mealswap" element={
          <ProtectedRoute>
            <MealSwap />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/mealswap/:id" element={
          <ProtectedRoute>
            <MealSwap />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/mealform" element={
          <ProtectedRoute>
            <MealForm />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/timeselector" element={
          <ProtectedRoute>
            <TimeSelector />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/deliverymethod" element={
          <ProtectedRoute>
            <DeliveryMethod />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/meal/:id" element={
          <ProtectedRoute>
            <MealDetail />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/drfoodlove" element={
          <ProtectedRoute>
            <DrFoodlove />
          </ProtectedRoute>
        } />
      </Routes>
      <Toaster />
    </Router >
  );
}

export default App;
