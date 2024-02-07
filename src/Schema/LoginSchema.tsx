import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too short!").max(50, "Too Long!").required(),
  email: Yup.string().email("Invalid emaail").required(),
  password: Yup.string().min(2, "Too short!").max(50, "Too Long!").required(),
});
