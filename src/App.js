import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import AdminLayout from "Layouts/AdminLayout";

// Pages
import Appointment from "Pages/Appointment/Appointment";
import ClientRecord from 'Pages/Client/ClientRecord'
import VehicleRecord from "Pages/Vehicle/VehicleRecord";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Appointment />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="clients" element={<ClientRecord />} />
          <Route path="vehicles" element={<VehicleRecord />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
