import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/RegisterPage";
import Navbar from "./components/Navbar";
import Upload from "./components/Upload";
import "./App.css";
import ApplicationPage from "./components/ApplicationPage";
import PersonalInfoPage from "./components/PersonalInfoPage";
import {store,persistor} from "./redux/store";
import PendingPage from "./components/pendingPage";
import VisaPage from "./components/VisaPage";
import EmployeeProfiles from "./components/EmployeeProfiles";
import HousePage from "./components/HousePage";
import HRVisaManagement from "./components/HRVisaManagement";
// import HouseManagePage from "./components/houseManagePage";
import { persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import HireManagePage from "./components/HireManagePage";
import HouseManagePage from "./components/houseManagePage";




function App() {
  return (
    <div className="App">
      <Provider store={store}>
<PersistGate loading={null} persistor={persistor}>


      <BrowserRouter>
        <div className="pages">
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/register/:tokenId" element={<Register />} />

            <Route path="/uploadFile" element={<Upload />} />
            <Route path="/onboarding" element={<ApplicationPage/>}/>
            <Route path="/profile" element={<PersonalInfoPage/>}/>
            <Route path="/pending" element={<PendingPage/>}/>
            <Route path="/visa" element={<VisaPage></VisaPage>}/>
            <Route path ="/profiles" element={<EmployeeProfiles></EmployeeProfiles>}/>
           


          <Route path="/hr/visa" element={<HRVisaManagement></HRVisaManagement>}/>

            <Route path="/house" element={<HousePage></HousePage>}/>
            <Route path="/hr/house" element={<HouseManagePage></HouseManagePage>}/>
            <Route path="/hr/hire" element={<HireManagePage></HireManagePage>}/>

          </Routes>

        </div>
      </BrowserRouter>
</PersistGate>
      </Provider>
    </div>
  );
}

export default App;
