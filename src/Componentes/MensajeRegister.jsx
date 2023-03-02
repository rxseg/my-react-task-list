import { Alert, AlertIcon, Box } from "@chakra-ui/react";
import React from "react";

export const MensajeRegisterExito = ({ isPost }) => {
  return (
    <Box
      width="100%"
      display={"flex"}
      justifyContent="center"
      position="absolute"
      top={"85%"}
    >
      {isPost ? (
        <Alert
          status="success"
          display="flex"
          justifyContent="flex-end"
          width={"auto"}
        >
          <AlertIcon />
          <>{isPost?.msg}</>
        </Alert>
      ) : null}
    </Box>
  );
};
export const MensajeNoRegister = ({ msgError }) => {
  console.log(msgError?.data);
  return (
    <Box
      width="100%"
      display={"flex"}
      justifyContent="center"
      position="absolute"
      top={"85%"}
    >
      {msgError ? (
        <Alert
          status="error"
          display="flex"
          justifyContent="flex-end"
          width={"auto"}
        >
          <AlertIcon />
          <>{msgError?.data?.msg}</>
        </Alert>
      ) : null}
    </Box>
  );
};
export const MensajeLoginError = ({ error }) => {
  return (
    <Box
      width="100%"
      display={"flex"}
      justifyContent="center"
      position="absolute"
      top={"77%"}
    >
      {error ? (
        <Alert
          status="error"
          display="flex"
          justifyContent="flex-end"
          width={"auto"}
        >
          <AlertIcon />
          <>{error?.data?.message}</>
        </Alert>
      ) : null}
    </Box>
  );
};
export const MensajeLogin = ({ userChecked }) => {
  console.log(userChecked);
  return (
    <Box
      width="100%"
      display={"flex"}
      justifyContent="center"
      position="absolute"
      top={"77%"}
    >
      {userChecked ? (
        <Alert
          status="success"
          display="flex"
          justifyContent="flex-end"
          width={"auto"}
        >
          <AlertIcon />
          <>{userChecked?.message}</>
        </Alert>
      ) : null}
    </Box>
  );
};
