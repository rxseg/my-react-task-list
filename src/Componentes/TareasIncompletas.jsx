import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Input,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  useDeleteTasksMutation,
  useGetIncompletedTasksQuery,
  useUpdateStateMutation,
  useUpdateTasksMutation,
} from "../Redux/endpoints";
import ConfirmDelete from "../ConfirmDelete";
import { useAuthStore } from "../Redux/zustand";

function TareasIncompletas() {
  const profileAuth = useAuthStore((state) => state.profile);
  const { data: isGet } = useGetIncompletedTasksQuery(profileAuth?.token);
  console.log(isGet);
  const [aliasupdateTask] = useUpdateTasksMutation();
  const [aliasdeleteTask] = useDeleteTasksMutation();
  const [accionConfirmar, setAccionConfirmar] = useState(1);
  let msg = "nan";
  const [aliasupdateStateTask] = useUpdateStateMutation();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [idAeliminar, setidAeliminar] = useState("");
  const [boolean, setBoolean] = useState(false);
  const [edit, setEdit] = useState("");
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
  const updating = async (_id) => {
    let message = "";
    const data = await aliasupdateTask({
      _id,
      dataTasks: { nombre: nombre, descripcion: descripcion },
      token: profileAuth?.token,
    });
    message = data.data.message;
    setBoolean(!boolean);
    toast({
      title: `${message}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    console.log("Listo");
  };
  const updatingState = async (_id, estado) => {
    let message = "";
    const data = await aliasupdateStateTask({
      _id,
      dataEstado: { estado: estado },
      token: profileAuth?.token,
    });
    message = data?.data?.message;
    setBoolean(!boolean);
    toast({
      title: `${message}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    console.log("Listo");
  };
  const editNombre = (e) => {
    e.preventDefault();
    setTarea(e.target.value);
  };
  const editDescripcion = (e) => {
    e.preventDefault();
    setDescripcion(e.target.value);
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
          bg={boxes}
        >
          <Text textAlign={"center"} fontSize={"35px"}>
            No hay tareas incompletas que mostrar aún
          </Text>
        </Box>
      ) : (
        <>
          {isGet?.map((tasks, id) => {
            console.log(tasks);
            return edit == tasks._id && boolean ? (
              <Box
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
                    <Text fontWeight={"700"}>Tarea:</Text>
                    <Input
                      background={"white"}
                      name="nombre"
                      value={nombre}
                      onChange={editNombre}
                    />
                  </Box>
                  <Box display={"flex"} flexDirection="column">
                    <Text fontWeight={"700"}>Descripción:</Text>
                    <Input
                      background={"white"}
                      name="descripcion"
                      value={descripcion}
                      onChange={editDescripcion}
                    />
                  </Box>
                </Box>
                <Box display={"flex"} gap="5px" width={"100%"}>
                  <Button
                    boxShadow={"lg"}
                    size="xs"
                    colorScheme={"red"}
                    onClick={() => setBoolean(!boolean)}
                  >
                    <Text>Cancelar</Text>
                  </Button>
                  <Button
                    boxShadow={"lg"}
                    size="xs"
                    colorScheme={"whatsapp"}
                    onClick={(e) => {
                      e.preventDefault();
                      updating(tasks._id);
                    }}
                  >
                    <Text>Save</Text>
                  </Button>
                </Box>
                <Divider orientation="horizontal" />
              </Box>
            ) : (
              <Box
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
                    }}
                  >
                    <Text>Delete</Text>
                  </Button>
                  <Button
                    boxShadow={"lg"}
                    size="xs"
                    colorScheme={"yellow"}
                    onClick={() => {
                      setBoolean(!boolean);
                      setEdit(tasks._id);
                      setDescripcion(tasks.descripcion);
                      setNombre(tasks.nombre);
                    }}
                  >
                    <Text>Edit</Text>
                  </Button>
                  {tasks.estado == false ? (
                    <Button
                      boxShadow={"lg"}
                      size="xs"
                      colorScheme="whatsapp"
                      onClick={() => {
                        onOpen();
                        setidAeliminar(tasks._id);
                        setAccionConfirmar(1);
                      }}
                    >
                      Completar
                    </Button>
                  ) : null}
                </Box>
                {onOpen ? (
                  idAeliminar == tasks._id ? (
                    <ConfirmDelete
                      msg={msg}
                      tasks={tasks}
                      isOpen={isOpen}
                      accionConfirmar={accionConfirmar}
                      updatingState={updatingState}
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

export default TareasIncompletas;
