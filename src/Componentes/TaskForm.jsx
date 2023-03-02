import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { usePostTasksMutation } from "../Redux/endpoints";
import { useAuthStore } from "../Redux/zustand";

export const TaskForm = () => {
  const toast = useToast();
  const [error, setError] = useState(false);
  const [dataInputs, setDataInputs] = useState({});
  const [createTask] = usePostTasksMutation();
  const profileAuth = useAuthStore((state) => state.profile);
  let message = "nan";
  const handleChange = (e) => {
    e.preventDefault();
    setDataInputs({
      ...dataInputs,
      [e.target.name]: e.target.value,
      estado: false,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    if (nombre.length < 3) {
      setError(true);
    } else if (nombre.length === 0) {
      setError(true);
    } else {
      setError(false);
      const data = await createTask({
        createTask: dataInputs,
        token: profileAuth.token,
      });
      console.log(data);

      message = data?.data?.message;
      console.log(message);
      toast({
        title: `${message}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <form className="container-texto" onSubmit={handleSubmit}>
      <FormControl
        display="flex"
        flexDirection="column"
        w="100%"
        justifyItems="center"
        alignItems="center"
      >
        <Input
          className="texto"
          placeholder="Ingresa una nueva tarea"
          name="nombre"
          onChange={handleChange}
        />
        {error ? (
          <Text as={"i"} color={"red"} fontSize={"sm"}>
            El titulo debe tener al menos 3 o más caractéres
          </Text>
        ) : (
          <></>
        )}
        <Textarea
          className="textarea"
          placeholder="Ingresa una descripción"
          name="descripcion"
          onChange={handleChange}
        ></Textarea>
        <Box margin={"0px 0px 6px 0px"}>
          <Button type="submit" colorScheme="whatsapp" boxShadow={"lg"}>
            Agregar
          </Button>
        </Box>
      </FormControl>
    </form>
  );
};
