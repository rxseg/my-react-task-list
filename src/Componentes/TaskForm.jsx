import { useState } from "react";
import { Button, FormControl, Input, Textarea } from "@chakra-ui/react";

export const TaskForm = ({ createTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length < 3) {
      setError(true);
    } else if (title.length === 0) {
      setError(true);
    } else {
      createTask({ title: title, description: description });
    }
    setTitle("");
    setDescription("");
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
          placeholder="Add your new todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {error ? (
          <span className="error" role="alert">
            La tarea debe tener al menos 3 o más caractéres
          </span>
        ) : (
          <></>
        )}
        <Textarea
          className="textarea"
          placeholder="Add a description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Textarea>
        <div className="div-btnadd">
          <Button type="submit" colorScheme="messenger">
            Agregar
          </Button>
        </div>
      </FormControl>
    </form>
  );
};
