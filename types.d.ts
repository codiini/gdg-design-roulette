export type FormState = {
  email: string;
  fullName: string;
  designLevel: string;
  yearsOfExperience: number;
  usesFigma: string;
  inputDevice: string;
};

export type RandomizerInput = Omit<FormState, "email" | "usesFigma">;
