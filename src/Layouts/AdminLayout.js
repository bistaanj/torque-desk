import { Outlet } from "react-router-dom";
import Navigation from "Components/Navigation";


function AdminLayout() {
  return (
    <div className="flex min-h-screen -">
      <Navigation />

      <main className="flex-1 p-1 ">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;