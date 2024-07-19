import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getSession } from "../../shared/Session";

const AuthLayout = () => {
  const navigate = useNavigate();
  const token = getSession();
  useEffect(() => {
    if (token) {
      navigate("/chat");
    }
  }, []);
  return (
    <div className="h-[100dvh]">
      <div className="flex h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-main">
            Masuk Akun
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
