import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import NoteState from "./context/noteState";
import { DrawerState } from "./context/drawerState";
import { ReadState } from "./context/readMore";
import Home from "./pages/Home/home";
import Signin from "./pages/GetIn/signin";
import Register from "./pages/GetIn/register";
import PageNotFound from "./pages/GetIn/pageNotFound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Notes/main";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <>
      <NoteState>
        <ReadState>
          <DrawerState>
            <RouterProvider router={Router}></RouterProvider>
            <Toaster></Toaster>
          </DrawerState>
        </ReadState>
      </NoteState>
    </>
  );
}

export default App;
