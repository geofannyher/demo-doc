import { supabase } from "../services/supabase/connection";

type TSubmitDataProps = {
  tiket: string;
  kategori: string;
  nama_pelapor: string;
  obyek_terlapor: string;
  waktu_kejadian: string;
  keluhan: string;
  bukti_laporan?: string;
};

export const submitData = async ({
  tiket,
  kategori,
  nama_pelapor,
  obyek_terlapor,
  waktu_kejadian,
  keluhan,
  bukti_laporan,
}: TSubmitDataProps) => {
  const { data, error } = await supabase.from("laporan").insert([
    {
      tiket,
      kategori,
      nama_pelapor,
      obyek_terlapor,
      waktu_kejadian,
      keluhan,
      bukti_laporan,
    },
  ]);

  if (error) {
    return { error };
  } else {
    return data;
  }
};
