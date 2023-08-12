import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Home from "./pages/Home"
import React from "react";
import Rules from "./pages/Rules.tsx";
import Files from "./pages/Files.tsx";
import Rejected from "./pages/Rejected.tsx";
import ToggleColorMode from "./components/ToggleColorMode.tsx";
import Login from "./pages/Login.tsx";
import {DrawerProvider} from "./context/DrawerProvider.tsx";
import {AuthServiceProvider} from "./context/AuthContext.tsx";
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
          <Route path="/" element = {<Home />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/files" element={<Files />} />
            <Route path="/rejected" element={<Rejected />}/>
            <Route path = "/login" element={<Login /> }/>
        </Route>
    )
)
const App: React.FC = () => {

  return(
      <AuthServiceProvider>
          <ToggleColorMode>
              <DrawerProvider>
                  <RouterProvider router={router} />
              </DrawerProvider>

          </ToggleColorMode>

      </AuthServiceProvider>


  )
}

export default App
