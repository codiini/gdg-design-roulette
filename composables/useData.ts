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
    designVariables,
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
          // design variables
          primary_color: designVariables.primaryColor,
          font: designVariables.font,
          design_system: designVariables.designSystem,
          icon_pack: designVariables.iconPack,
          screen_size: designVariables.screenSize,
          product_service: designVariables.productService,
          business_type: designVariables.businessType,
          ui_task: designVariables.uiTask,
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
