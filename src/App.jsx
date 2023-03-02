import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import RutaProtegida from "./Componentes/rutaProtegida";
import RutaProtegidaLogin from "./Componentes/rutaProtegidaLogin";
import { useAuthStore } from "./Redux/zustand";
const Home = lazy(() => import("./Componentes/Home"));
const Task = lazy(() => import("./Task"));
const SobreNosotros = lazy(() => import("./Componentes/SobreNosotros"));
const Nav = lazy(() => import("./Nav"));
const Login = lazy(() => import("./Componentes/Login"));
const SignUp = lazy(() => import("./Componentes/SignUpw"));

export const App = () => {
  const profileAuth = useAuthStore((state) => state.profile);
  const [usuarios, setUsuario] = useState({
    email: null,
  });
  useEffect(() => {
    const userLoged = JSON.parse(localStorage.getItem("auth"));
    if (userLoged) {
      setUsuario(userLoged);
    } else {
      setUsuario({
        email: null,
      });
    }
  }, []);

  return (
    <>
      <Suspense
        fallback={
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            m={"auto"}
            h={"100%"}
            backgroundImage={
              "linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.75)),url(/bg4.jpg)"
            }
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="red.500"
              size="xl"
            />
            <Text color={"white"}>Cargando...</Text>
          </Box>
        }
      >
        <BrowserRouter>
          <>
            <Nav />
          </>
          <Routes>
            <Route
              element={
                <RutaProtegidaLogin
                  isAllowed={!!usuarios.email}
                  redirectTo={usuarios ? "/home" : "/"}
                />
              }
            >
              <Route index element={<Login />} />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
            <Route
              element={
                <RutaProtegida
                  isAllowed={!!profileAuth?.usuarios && profileAuth?.usuarios}
                  redirectTo="/"
                />
              }
            >
              <Route path="/home" element={<Home />}></Route>
              <Route path="/tasklist" element={<Task />}></Route>
              <Route path="/about-us" element={<SobreNosotros />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
};
