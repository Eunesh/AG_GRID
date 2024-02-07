import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import { LoginSchema } from "../../Schema/LoginSchema";

const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={"40px"}>
        <FormControl
          isInvalid={Boolean(formik.touched.name && formik.errors.name)}
          isRequired
        >
          <FormLabel>Name</FormLabel>
          <Input
            type="name"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && (
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          isInvalid={Boolean(formik.touched.email && formik.errors.email)}
          isRequired
        >
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && (
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
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
