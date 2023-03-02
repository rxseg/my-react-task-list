import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  useDeleteTasksMutation,
  useGetCompletedTasksQuery,
} from "../Redux/endpoints";
import ConfirmDelete from "../ConfirmDelete";
import { useAuthStore } from "../Redux/zustand";

function TareasCompletas() {
  const [accionConfirmar, setAccionConfirmar] = useState(1);
  const profileAuth = useAuthStore((state) => state.profile);
  const { data: isGet } = useGetCompletedTasksQuery(profileAuth?.token);
  console.log(isGet);

  const [aliasdeleteTask] = useDeleteTasksMutation();
  let msg = "nan";

  const [idAeliminar, setidAeliminar] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const deleting = async (_id) => {
    const data = await aliasdeleteTask({
      _id,
      token: profileAuth?.token,
    });
    msg = data?.data?.message;
    toast({
      title: `${msg}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  const boxes = useColorModeValue("white", "gray.800");
  return (
    <Box display={"flex"} flexDirection="column" height={"92%"} bg={boxes}>
      {isGet == "" ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          height={"100%"}
          alignItems="center"
        >
          <Text textAlign={"center"} fontSize={"35px"}>
            No hay tareas completas que mostrar aún
          </Text>
        </Box>
      ) : (
        <>
          {isGet?.map((tasks, id) => {
            return (
              <Box
                bg={boxes}
                display="flex"
                w="100%"
                alignItems="center"
                flexDirection={"column"}
                overflow="hidden"
                padding={"10px"}
                key={id}
                gap="10px"
                _hover={{
                  background: "#FED7D7",
                  transition: "0.2s linear",
                }}
              >
                <Box display={"flex"} width={"100%"} flexDirection="column">
                  <Box display={"flex"} flexDirection="column">
                    <Text fontWeight={"700"}> Tarea:</Text>
                    <Text>{tasks.nombre}</Text>
                  </Box>
                  <Box display={"flex"} flexDirection="column">
                    <Text fontWeight={"700"}>Descripción:</Text>
                    <Text>{tasks.descripcion}</Text>
                  </Box>
                  <Box display={"flex"} flexDirection="column">
                    <Text fontWeight={"700"}>Estado:</Text>
                    <Text>
                      {tasks.estado == true ? "Completa" : "Incompleta"}
                    </Text>
                  </Box>
                  <Box display={"flex"} flexDirection={"column"}>
                    <Text fontWeight={"700"}>Creado en:</Text>
                    <Text>{tasks.createdAt}</Text>
                  </Box>
                </Box>
                <Box display={"flex"} gap="5px" width={"100%"}>
                  <Button
                    boxShadow={"lg"}
                    size="xs"
                    colorScheme={"red"}
                    onClick={() => {
                      onOpen();
                      setidAeliminar(tasks._id);
                      setAccionConfirmar(2);
                    }}
                  >
                    <Text>Delete</Text>
                  </Button>
                  <Button
                    boxShadow={"lg"}
                    size="xs"
                    colorScheme={"yellow"}
                    isDisabled
                  >
                    <Text>Edit</Text>
                  </Button>
                </Box>
                {onOpen ? (
                  idAeliminar == tasks._id ? (
                    <ConfirmDelete
                      msg={msg}
                      tasks={tasks}
                      accionConfirmar={accionConfirmar}
                      idAeliminar={idAeliminar}
                      isOpen={isOpen}
                      onClose={onClose}
                      deleting={deleting}
                    />
                  ) : null
                ) : null}

                <Divider orientation="horizontal" borderWidth={"1px"} />
              </Box>
            );
          })}
        </>
      )}
    </Box>
  );
}

export default TareasCompletas;
