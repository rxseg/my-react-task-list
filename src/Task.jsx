import React from "react";
import "./App.css";
import { TaskForm } from "./Componentes/TaskForm";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  useDeleteTasksMutation,
  useGetTasksQuery,
  useUpdateStateMutation,
  useUpdateTasksMutation,
} from "./Redux/endpoints";
import ConfirmDelete from "./ConfirmDelete";
import { useAuthStore } from "./Redux/zustand";
import TareasIncompletas from "./Componentes/TareasIncompletas";
import TareasCompletas from "./Componentes/TareasCompletas";

function Task() {
  const profileAuth = useAuthStore((state) => state.profile);
  const { data: isGet } = useGetTasksQuery(profileAuth?.token);
  const [aliasupdateTask] = useUpdateTasksMutation();
  const [aliasupdateStateTask] = useUpdateStateMutation();
  const [aliasdeleteTask] = useDeleteTasksMutation();
  let msg = "nan";

  const [tareasCompletas, setTareasCompletas] = useState(false);
  const [tareasIncompletas, setTareasIncompletas] = useState(false);
  const [accionConfirmar, setAccionConfirmar] = useState(1);
  const [todasTareas, setTodasTareas] = useState(true);
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
  };

  const editNombre = (e) => {
    e.preventDefault();
    setTarea(e.target.value);
  };
  const editDescripcion = (e) => {
    e.preventDefault();
    setDescripcion(e.target.value);
  };
  const bg = useColorModeValue("red.500", "red.400");
  const color = useColorModeValue("white", "black");
  const boxes = useColorModeValue("white", "gray.800");
  const text = useColorModeValue("black", "white");
  return (
    <Box display={"flex"} flexDirection="column" height={"93%"}>
      <Box
        height="100%"
        width={"100%"}
        position="absolute"
        backgroundImage={
          "linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.75)),url(/bg4.jpg)"
        }
      ></Box>
      <Box
        width={"100%"}
        height={"90vh"}
        display={"flex"}
        position={"relative"}
        justifyContent={"space-evenly"}
        p="10px"
        alignItems={"center"}
      >
        <Box w="18vw" h="80%">
          <Box boxShadow={"lg"} bg={boxes}>
            <Box bg={bg} color={color} padding="10px">
              <Text fontWeight={"400"}>AppTodo</Text>
            </Box>
            <Box p="16px">
              <TaskForm />
            </Box>
          </Box>
          <Text textAlign={"center"} color={"white"}>
            ¡Manten tu vida más <Text as={"em"}>organizada</Text>!
          </Text>
          <Box w="18vw" display={"flex"} justifyContent={"center"}>
            <Image
              boxSize="200px"
              objectFit="cover"
              src="https://cdn-icons-png.flaticon.com/512/4105/4105455.png"
              alt="Emoticon"
            />
          </Box>
        </Box>
        <Box height={"100%"} display="flex" alignItems={"center"}>
          <Box
            boxShadow={"lg"}
            display="flex"
            flexDirection="column"
            w="30vw"
            h="80%"
            overflow="hidden"
          >
            <Box
              padding="10px"
              bg={bg}
              color={color}
              display="flex"
              alignItems={"center"}
              width="100%"
            >
              <Box width="50%">
                <Text fontWeight={"400"}>Listado de Tareas</Text>
              </Box>
              <Box width="50%" display="flex" justifyContent="flex-end">
                <Menu>
                  <MenuButton colorScheme="whatsapp" as={Button}>
                    {todasTareas ? (
                      <>Todas las tareas</>
                    ) : tareasCompletas ? (
                      <>Tareas completas</>
                    ) : tareasIncompletas ? (
                      <>Tareas incompletas</>
                    ) : null}
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      color={text}
                      onClick={() => {
                        setTodasTareas(true);
                        setTareasCompletas(false);
                        setTareasIncompletas(false);
                      }}
                    >
                      Todas las tareas
                    </MenuItem>
                    <MenuItem
                      color={text}
                      onClick={() => {
                        setTareasCompletas(true);
                        setTareasIncompletas(false);
                        setTodasTareas(false);
                      }}
                    >
                      Tareas completas
                    </MenuItem>
                    <MenuItem
                      color={text}
                      onClick={() => {
                        setTareasIncompletas(true);
                        setTareasCompletas(false);
                        setTodasTareas(false);
                      }}
                    >
                      Tareas incompletas
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Box>
            {todasTareas ? (
              <Box
                bg={boxes}
                width="100%"
                display="block"
                flexDirection="column"
                justifyItems="center"
                alignItems="center"
                height={"100%"}
                overflowY={"auto"}
                p={"auto"}
                css={{
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::webkit-scrollbar-track": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "lightgray",
                    borderRadius: "24px",
                  },
                }}
              >
                {isGet == "" ? (
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    height={"100%"}
                    alignItems="center"
                    bg={boxes}
                    color={"black"}
                  >
                    <Text textAlign={"center"} fontSize={"35px"} color={text}>
                      No hay tareas que mostrar aún
                    </Text>
                  </Box>
                ) : (
                  <>
                    {isGet?.map((tasks, id) => {
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
                          <Box
                            display={"flex"}
                            width={"100%"}
                            flexDirection="column"
                          >
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
                          <Box
                            display={"flex"}
                            width={"100%"}
                            flexDirection="column"
                          >
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
                              <Box display={"flex"} gap="10px">
                                <Text>
                                  {tasks.estado == true
                                    ? "Completa"
                                    : "Incompleta"}
                                </Text>
                              </Box>
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
                            {tasks.estado == true ? (
                              <Button
                                boxShadow={"lg"}
                                size="xs"
                                colorScheme={"yellow"}
                                isDisabled
                              >
                                <Text>Edit</Text>
                              </Button>
                            ) : (
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
                            )}

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

                          <Divider
                            orientation="horizontal"
                            borderWidth={"1px"}
                          />
                        </Box>
                      );
                    })}
                  </>
                )}
              </Box>
            ) : null}

            {tareasIncompletas ? <TareasIncompletas /> : null}
            {tareasCompletas ? <TareasCompletas /> : null}
          </Box>
        </Box>
      </Box>
      <Box
        display={"flex"}
        justifyItems={"center"}
        justifyContent={"center"}
        margin={"5px"}
      >
        <Link to="/home">
          <Button p="10px" colorScheme="red">
            Volver
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Task;
