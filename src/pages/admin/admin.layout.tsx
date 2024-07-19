import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
