import Form from "../Component/Login/Form";

import { Card, Stack, Text, Center } from "@chakra-ui/react";

const Login = () => {
  return (
    <Center paddingTop={"40px"}>
      <Card width={"35vw"}>
        <Stack spacing={"5px"} padding={"30px 10px"}>
          <Center>
            <Text fontSize="5xl">Login</Text>
          </Center>
          <Form />
        </Stack>
      </Card>
    </Center>
  );
};

export default Login;
