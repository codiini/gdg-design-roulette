import type { FormState } from "~/types";

const useData = () => {
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
      const response = await $fetch("/api/db", {
        method: 'POST',
        body: {
          range: 'Sheet1',
          dupColIdx: 0,
          dupRowIdx: 0,
          values: [
            [email],
            [fullName],
            [designLevel],
            [yearsOfExperience],
            [usesFigma],
            [inputDevice],
            [designVariables.primaryColor],
            [designVariables.font],
            [designVariables.designSystem],
            [designVariables.iconPack],
            [designVariables.screenSize],
            [designVariables.productService],
            [designVariables.businessType],
            [designVariables.uiTask],
          ],
        },
      });
      return response
    } catch (error) {
      throw error;
    }
  };

  return { saveProfile };
};

export default useData;
