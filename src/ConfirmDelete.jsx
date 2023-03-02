import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";

export default function ConfirmDelete({
  isOpen,
  onClose,
  deleting,
  updatingState,
  accionConfirmar,
  tasks,
  onClick,
}) {
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        {accionConfirmar == 1 ? (
          <>
            <AlertDialogHeader>Editar estado</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              ¿Estás seguro de querer completar esta tarea? No podrás editarla
              luego
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>No</Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={() => {
                  updatingState(tasks._id, tasks.estado !== true);
                  onClose();
                }}
              >
                Sí
              </Button>
            </AlertDialogFooter>
          </>
        ) : accionConfirmar == 2 ? (
          <>
            <AlertDialogHeader>Eliminar</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              ¿Estás seguro de querer borrar esta tarea?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>No</Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={() => {
                  deleting(tasks._id);
                  onClose();
                }}
              >
                Sí
              </Button>
            </AlertDialogFooter>
          </>
        ) : accionConfirmar == 3 ? (
          <>
            <AlertDialogHeader>Cerrar sesion</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              ¿Estás seguro de querer cerrar sesion?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>No</Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={() => {
                  onClick();
                  onClose();
                }}
              >
                Sí
              </Button>
            </AlertDialogFooter>
          </>
        ) : null}
      </AlertDialogContent>
    </AlertDialog>
  );
}
