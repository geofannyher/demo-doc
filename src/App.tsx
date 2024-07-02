import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "./pages/chat";
import MainLayout from "./pages/main.layout";
import LoginAdmin from "./pages/admin/login";
import AdminLayout from "./pages/admin/admin.layout";
import DashboardAdmin from "./pages/admin/dashboard";
import AdminChat from "./pages/admin/admin.chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="*" element={<MaintenancePage />} /> */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<ChatPage />} />
          <Route path="/adminlogin" element={<LoginAdmin />} />
          <Route path="" element={<AdminLayout />}>
            <Route path="adminavatara" element={<DashboardAdmin />} />
            <Route path="history" element={<AdminChat />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
