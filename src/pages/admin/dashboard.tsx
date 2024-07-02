import { useState, useEffect } from "react";
import { generateRandomString } from "../../services/api/chat.services";
import useNotification from "antd/es/notification/useNotification";
import {
  changelocalid,
  getIdSession,
} from "../../services/supabase/session.service";

const DashboardAdmin = () => {
  const [loadingid, setLoadingid] = useState(false);

  const [id, setId] = useState("");
  const [api, ref] = useNotification();
  useEffect(() => {
    getSes();
  }, [id]);

  const getSes = async () => {
    const res = await getIdSession();
    setId(res?.data?.uuid);
  };

  const switchID = async () => {
    const res = await generateRandomString();
    setLoadingid(true);
    if (res) {
      const respons = await changelocalid({ newUserId: res });
      if (respons?.status === 204) {
        setTimeout(() => {
          location.reload();
        }, 600);
        setLoadingid(false);

        return api.success({ message: "Success Change ID" });
      }
    }
  };

  return (
    <div className="container mx-auto">
      {ref}
      <div className="grid grid-cols-12 space-y-2 py-10">
        <div className="col-span-3"></div>
        <div className="col-span-8 rounded-md p-4"></div>
        <div className="col-span-3"></div>
        <div className="col-span-8 border-2 rounded-md p-4">
          <h1 className="font-semibold">Change ID</h1>
          <div className="text-sm py-2 flex items-center justify-between">
            <h1>{id ? id : "loading"}</h1>
            <button
              disabled={loadingid}
              className={`px-4 py-2 font-semibold text-white rounded-md bg-mainColor transition duration-300`}
              onClick={switchID}
            >
              {loadingid ? "Loading ..." : "Change"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
