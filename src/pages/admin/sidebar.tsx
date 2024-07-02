import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const menus = [
    {
      to: "/adminavatara",
      name: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
    },
    {
      to: "/history",
      name: "Admin Chat",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12,2A10,10,0,0,0,5.12,4.77V3a1,1,0,0,0-2,0V7.5a1,1,0,0,0,1,1H8.62a1,1,0,0,0,0-2H6.22A8,8,0,1,1,4,12a1,1,0,0,0-2,0A10,10,0,1,0,12,2Zm0,6a1,1,0,0,0-1,1v3a1,1,0,0,0,1,1h2a1,1,0,0,0,0-2H13V9A1,1,0,0,0,12,8Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-mainColor w-20 p-2 flex flex-col items-center justify-between h-screen text-white">
      <div className="py-4">
        <h1
          className="font-bold cursor-pointer hover:text-gray-300 duration-300 transition text-sm"
          onClick={() => navigate("/chat")}
        >
          Admin Panel
        </h1>
        <ul className="mt-4 space-y-2">
          {menus.map((item, index) => (
            <li key={index}>
              <Link to={item?.to}>
                <div
                  className={`p-2 rounded-lg flex justify-center  ${
                    location.pathname === item.to
                      ? "bg-red-400"
                      : "hover:bg-red-400 transition duration-500 hover:scale-105"
                  }`}
                >
                  {item?.icon}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
