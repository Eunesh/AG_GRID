import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import Cookie from "universal-cookie";

import { useFormik } from "formik";
import { LoginSchema } from "../../Schema/LoginSchema";
import { useLoginUserMutation } from "../../generated/graphql";
import { useNavigate } from "react-router-dom";

const Form = () => {
  //Cookie
  const cookie = new Cookie();

  // Use navigate
  const navigate = useNavigate();

  // Mutation hook
  const [login, { loading }] = useLoginUserMutation();

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const { data: newData } = await login({
          variables: { phone: values.phone, password: values.password },
        });

        const token = newData?.signInUser?.token;
        if (token) {
          cookie.set("Login_token", token, { path: "/" });
          navigate("/table");
        }
      } catch (err) {
        console.error("Error adding event:", err);
        alert("Password or Phone number doesnt match");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={"40px"}>
        <FormControl
          isInvalid={Boolean(formik.touched.phone && formik.errors.phone)}
          isRequired
        >
          <FormLabel htmlFor="PhoneNumber">Phone Number</FormLabel>
          <Input
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && (
            <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          isInvalid={Boolean(formik.touched.password && formik.errors.password)}
          isRequired
        >
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && (
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          )}
        </FormControl>
        <Button size="lg" type="submit">
          Login
        </Button>
      </Stack>
    </form>
  );
};

export default Form;
