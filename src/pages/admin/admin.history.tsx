import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase/connection";
import { LoadingOutlined } from "@ant-design/icons";

interface IReport {
  tiket: string;
  kategori: string;
  nama_pelapor: string;
  obyek_terlapor: string;
  waktu_kejadian: string;
  keluhan: string;
  bukti_laporan: string;
}

const AdminHistory = () => {
  const [reports, setReports] = useState<IReport[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("laporan")
      .select(
        "tiket, kategori, nama_pelapor, obyek_terlapor, waktu_kejadian, keluhan, bukti_laporan"
      );

    if (error) {
      console.error("Error fetching reports:", error);
      setLoading(false);
    } else {
      setReports(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

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
                  Tiket
                </th>
                <th scope="col" className="px-6 py-3">
                  Kategori
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama Pelapor
                </th>
                <th scope="col" className="px-6 py-3">
                  Obyek Terlapor
                </th>
                <th scope="col" className="px-6 py-3">
                  Waktu Kejadian
                </th>
                <th scope="col" className="px-6 py-3">
                  Keluhan
                </th>
                <th scope="col" className="px-6 py-3">
                  Bukti File
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
                  <td className="px-6 py-4">{report.tiket}</td>
                  <td className="px-6 py-4">{report.kategori}</td>
                  <td className="px-6 py-4">{report.nama_pelapor}</td>
                  <td className="px-6 py-4">{report.obyek_terlapor}</td>
                  <td className="px-6 py-4">{report.waktu_kejadian}</td>
                  <td className="px-6 py-4">{report.keluhan}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminHistory;
