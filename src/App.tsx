import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router";
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


import "./App.css";
import DiscoverMeal from "./pages/dashboard/DiscoverMeal";
import MealSwap from "./pages/dashboard/MealSwap";
import MealForm from "./pages/dashboard/MealForm";
import TimeSelector from "./pages/dashboard/TimeSelector";
import DeliveryMethod from "./pages/dashboard/DeliveryMethod";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/intro/nameform" />} />
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
        <Route path="/dashboard/discovermeal" element={<DiscoverMeal />} />
        <Route path="/dashboard/mealswap" element={<MealSwap />} />
        <Route path="/dashboard/mealform" element={<MealForm />} />
        <Route path="/dashboard/timeselector" element={<TimeSelector />} />
        <Route path="/dashboard/deliverymethod" element={<DeliveryMethod />} />
      </Routes>
    </Router >
  );
}

export default App;
