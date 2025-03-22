import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/home/Home";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Toaster } from "./components/ui/sonner";

import About from "./components/About";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Companies from "./components/admin/Companies";
import CreateCompany from "./components/admin/createCompany";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";


const persistor = persistStore(store);
const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/jobs" element={<Jobs/>} />
      <Route path="/about" element={<About/>}/>
      <Route path="/browse" element={<Browse/>} />
      <Route path="/profile" element={<Profile/>}/> 
      <Route path="/jobDescription/:id" element={<JobDescription/>} />
{/* //admin routes */}
      <Route path="/admin/companies" element={<Companies/>}/>
      <Route path="/admin/companies/create" element={<CreateCompany/>}/>
      <Route path="/admin/companies/:id" element={<CompanySetup/>}/>
      <Route path="/admin/jobs" element={<AdminJobs/>}/>
      <Route path="/admin/jobs/create" element={<PostJob/>} />
      <Route path="/admin/jobs/:id/applicants" element={<Applicants/>} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={Router} />
    <Toaster />
    </PersistGate>
    </Provider>
  </StrictMode>
);
