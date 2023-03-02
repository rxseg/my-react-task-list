import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

function Home() {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      height="93%"
      backgroundImage={
        "linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.75)),url(/bg4.jpg)"
      }
    >
      <Box display={"flex"} justifyContent={"center"} flexDirection="column" position={"fixed"}>
        <Text
          fontSize={"4xl"}
          textAlign={"center"}
          as={"i"}
          fontWeight={600}
          color={"white"}
        >
          {" "}
          Bienvenidos a AppTodo
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
            Donde puedes llevar tu vida más organizada, una aplicación fácil de
            usar para cualquier persona, podrás ver, crear, actualizar y borrar
            las tareas que quieras.
          </Text>
        </Box>
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          height="100%"
          width={"100%"}
        >
          <Image boxSize={"600px"} src="../public/meditacion.png"></Image>
        </Box>
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
            Así que... ¿por qué no lo pruebas? Échale un vistazo a esta
            maravillosa aplicación
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
