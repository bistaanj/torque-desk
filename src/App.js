import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from 'Pages/Login/Login'// Layout
import AdminLayout from "Layouts/AdminLayout";

// Pages
import Appointment from "Pages/Appointment/Appointment";
import ClientRecord from 'Pages/Client/ClientRecord'
import VehicleRecord from "Pages/Vehicle/VehicleRecord";
import VehicleMaintenanceRecord from 'Pages/Vehicle/VehicleMaintenanceRecord';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Appointment />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="clients" element={<ClientRecord />} />
          <Route path="vehicles" element={<VehicleRecord />} />
        </Route>
        <Route path="/vehicle-maintenance-record" element={<VehicleMaintenanceRecord />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
