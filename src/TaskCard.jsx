import { Box, Button, Text } from "@chakra-ui/react";
export const TaskCard = ({ task, deleteTask, editTask }) => {
  console.log(task);

  return (
    <Box
      display="flex"
      w="100%"
      alignItems="center"
      borderWidth="1px"
      flexDirection={"column"}
      borderRadius="lg"
      overflow="hidden"
      padding={"10px"}
      marginBottom="10px"
    >
      <Box display={"flex"} width={"100%"} flexDirection="column">
        <Box display={"flex"} flexDirection="column">
          <Text fontWeight={"700"}>Tarea:</Text>
          <Text>{task.nombre}</Text>
        </Box>
        <Box display={"flex"} flexDirection="column">
          <Text fontWeight={"700"}>Descripción:</Text>
          <Text>{task.descripcion}</Text>
        </Box>
      </Box>
      <Box display={"flex"} gap="5px" width={"100%"}>
        <Button
          size="xs"
          colorScheme={"red"}
          onClick={() => {
            deleteTask(task.id);
          }}
        >
          <Text>Delete</Text>
        </Button>
        <Button
          size="xs"
          colorScheme={"yellow"}
          onClick={() => {
            editTask(task.id);
          }}
        >
          <Text>Edit</Text>
        </Button>
      </Box>
    </Box>
  );
};
