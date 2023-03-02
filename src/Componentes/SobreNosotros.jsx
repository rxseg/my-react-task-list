import { Box, Button, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function SobreNosotros() {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      height="93%"
      backgroundImage={
        "linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.75)),url(/bg4.jpg)"
      }
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexDirection="column"
        position={"fixed"}
      >
        <Text
          fontSize={"4xl"}
          textAlign={"center"}
          as={"i"}
          fontWeight={600}
          color={"white"}
        >
          {" "}
          Acerca del desarrollador
        </Text>
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection="column"
          alignItems={"center"}
        >
          <Text
            fontSize={"3xl"}
            textAlign={"center"}
            as={"i"}
            color={"white"}
            w={"50%"}
          >
            Robert Guerra, aspirante a desarrollador web, cuyo propósito u
            objetivo fue; crear una aplicación donde se organiza de forma
            didáctica y sencilla el manejo de datos para una lista de tareas, la
            cual sirve para anotar información importante por hacer, con sus
            características principales que son esenciales en un CRUD, haciendo
            el uso de React para el Frontend y MongoDB para el Backend
          </Text>
        </Box>
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          height="100%"
          width={"100%"}
        >
          <Image
            src="../public/videollamada.png"
            boxSize="400px"
            width={"%50"}
          ></Image>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection="column"
          alignItems={"center"}
        >
          <Text textAlign={"center"} color={"white"}>
            ¡Siempre es bueno aprender más!
          </Text>
        </Box>
        <Box display={"flex"} justifyContent={"center"} p={"5px"}>
          <Link to="/home">
            <Button p="10px" colorScheme="red">
              Volver
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default SobreNosotros;
