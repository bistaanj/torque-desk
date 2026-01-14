import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineChartBar,
  HiOutlineTruck
} from "react-icons/hi";
import { FaCrown } from "react-icons/fa";

function Navigation() {
  const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-4 py-2 ${
    isActive
      ? "bg-black text-white"
      : "text-gray-700 hover:bg-gray-100"
  }`;

  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold">Torque Desk</h1>
        <p className="text-sm text-gray-500">Admin Panel</p>
      </div>

      <nav className="p-4 space-y-2">
        <NavLink to="/" end className= {(isActive)=> ` ${linkClass(isActive)} opacity-60 cursor-not-allowed pointer-events-none`}  >
        <HiOutlineChartBar className="text-lg" />
          Analytics <FaCrown className="text-lg" />
        </NavLink>

        <NavLink to="/appointment" className={linkClass}>
        <HiOutlineCalendar className="text-lg" />
          Appointments
        </NavLink>

        <NavLink to="/clients" className={linkClass}>
        <HiOutlineUsers className="text-lg" />
          Client Record
        </NavLink>

         <NavLink to="/vehicles" className={linkClass}>
        <HiOutlineTruck className="text-lg" />
          Vehicle Record
        </NavLink>
       
      </nav>
    </aside>
  );
}

export default Navigation;