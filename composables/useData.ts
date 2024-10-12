import type { FormState } from "~/types";

const useData = () => {
  const supabase = useSupabaseClient();
  const saveProfile = async ({
    email,
    fullName,
    designLevel,
    yearsOfExperience,
    usesFigma,
    inputDevice,
  }: FormState) => {
    try {
      const { data, error } = await supabase
        .from("design_roulette")
        .insert({
          email: email,
          full_name: fullName,
          design_level: designLevel,
          years_of_experience: yearsOfExperience,
          uses_figma: usesFigma,
          input_device: inputDevice,
        })
        .select();

      if (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  };

  return { saveProfile };
};

export default useData;
