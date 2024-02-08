import * as Yup from "yup";

// const phoneRegExp = /^[0-9]{10}$/;

export const LoginSchema = Yup.object().shape({
  phone: Yup.string()
    // .matches(phoneRegExp, "Phone number is not valid") // Validate against the regular expression
    .required("Phone number is required"), // Require the field
  password: Yup.string().min(2, "Too short!").max(50, "Too Long!").required(),
});
