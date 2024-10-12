export type FormState = {
  email: string;
  fullName: string;
  designLevel: string;
  yearsOfExperience: number;
  usesFigma: string;
  inputDevice: string;
  designVariables: DesignVariables;
};

type DesignVariables = {
  primaryColor: string;
  font: string;
  designSystem: string;
  iconPack: string;
  screenSize: string;
  productService: string;
  businessType: string;
  uiTask: string;
  expireAt: string;
};

export type RandomizerInput = Omit<FormState, "email" | "usesFigma">;
