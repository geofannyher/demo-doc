import { supabase } from "../services/supabase/connection";
type TSubmitDataProps = {
  detail_laporan: string;
  bukti_laporan?: string;
};
export const submitData = async ({
  bukti_laporan,
  detail_laporan,
}: TSubmitDataProps) => {
  const { data, error } = await supabase
    .from("laporan")
    .insert([{ detail_laporan, bukti_laporan }]);

  if (error) {
    return { error };
  } else {
    return data;
  }
};
