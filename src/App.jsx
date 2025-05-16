import {BrowserRouter ,Routes,Route } from 'react-router-dom';

import About from './Pages/About';
import Signin from './Pages/Signin';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import Header from './components/header';
import PrivateRoutes from './components/PrivateRoutes';

import ItemProfile from './Pages/MaintananceProfile';


import AddMaintenance from './Pages/Maintenance';
import AllMainDetails from './Pages/MaintainanceHome';
import UpdateMaintenance from './Pages/UpdateItem';
import AllDetails from './Pages/AllDetails';
import MaintainProfile from './Pages/MaintananceProfile';







export default function App() {
  return <BrowserRouter>
<Header/>
  <Routes>
    <Route path="/" element={<AllMainDetails/>}></Route>
    <Route path="/about" element={<About/>}></Route>
    <Route path="/sign-in" element={<Signin/>}></Route>
    <Route path="/addmain" element={<AddMaintenance/>}></Route>
    <Route path="/alldetails" element={<AllDetails/>}></Route>

    
    <Route path="/sign-up" element={<SignUp/>}></Route>

    <Route element={<PrivateRoutes/>}>
    <Route path="/profile" element={<Profile/>}></Route>
    <Route path="/mainprofile" element={<MaintainProfile/>}></Route>


    <Route path="/update-item/:id" element={<UpdateMaintenance/>}></Route>


    </Route>
 
    
  </Routes>
  
  </BrowserRouter>
  
}
