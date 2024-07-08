import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase/connection";
import { LoadingOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface IReport {
  bukti_laporan: string;
  detail_laporan: string;
}

const AdminHistory = () => {
  const [reports, setReports] = useState<IReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState("");
  const [displayedMessage, setDisplayedMessage] = useState("");
  const fetchReports = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("laporan")
      .select("detail_laporan, bukti_laporan");

    if (error) {
      console.error("Error fetching reports:", error);
      setLoading(false);
    } else {
      setLoading(false);
      setReports(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (typeof data !== "string") {
      return;
    }

    const cleanedMessage = data
      .replace("#record#", "")
      .replace("#/record#", ""); // Hapus string #upload#

    setDisplayedMessage(cleanedMessage);
  }, [data, loading]);
  return (
    <div className="container mx-auto m-10">
      <div className="relative overflow-x-auto rounded-lg">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingOutlined />
          </div>
        ) : reports.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Data kosong</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-white">
            <thead className="text-xs bg-mainColor uppercase">
              <tr>
                <th scope="col" className="px-3 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Detail Laporan
                </th>
                <th scope="col" className="px-6 py-3">
                  Bukti File
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr
                  key={index}
                  className="bg-white border-gray-300 border text-gray-900"
                >
                  <th className="px-3 py-4 font-medium w-20 whitespace-nowrap">
                    {index + 1}
                  </th>
                  <th>
                    <div className="overflow-hidden whitespace-nowrap overflow-ellipsis w-96 text-sm font-medium">
                      {report.detail_laporan}
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <div className="overflow-hidden whitespace-nowrap overflow-ellipsis w-72">
                      {report?.bukti_laporan ? (
                        <a target="_blank" href={report?.bukti_laporan}>
                          <button className=" bg-mainColor cursor-pointer hover:bg-red-500 transition duration-500 text-white px-4 py-2 rounded-full shadow-lg">
                            Download
                          </button>
                        </a>
                      ) : (
                        <p>tidak ada berkas file</p>
                      )}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setData(report?.detail_laporan);
                      }}
                      className=" bg-mainColor cursor-pointer hover:bg-red-500 transition duration-500 text-white px-4 py-2 rounded-full shadow-lg"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Modal
          title="Detail Laporan"
          open={isModalOpen}
          footer={false}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div style={{ whiteSpace: "pre-line" }}>
            <Markdown
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} style={{ color: "blue" }} />
                ),
              }}
              remarkPlugins={[remarkGfm]}
            >
              {displayedMessage}
            </Markdown>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AdminHistory;
