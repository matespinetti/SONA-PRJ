import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthServiceProvider } from "./context/AuthContext.tsx";
import ToggleColorMode from "./components/ToggleColorMode.tsx";
import { DrawerProvider } from "./context/DrawerProvider.tsx";
import Home from "./pages/Home";
import Rules from "./pages/Rules";
import Files from "./pages/Files";
import Rejected from "./pages/Rejected";
import Login from "./pages/Login";
import ProtectedRoute from "./services/ProtectedRoute.tsx";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AuthServiceProvider>
                <ToggleColorMode>
                    <DrawerProvider>
                        <Routes>
                            {/* Non-protected route */}
                            <Route path="/login" element={  <Login />} />

                            {/* Protected routes */}
                                <Route path = "/" index element={<ProtectedRoute> <Home /></ProtectedRoute>} />
                                <Route path="/rules" element={ <ProtectedRoute> <Rules /> </ProtectedRoute> } />
                                <Route path="/files" element={<ProtectedRoute> <Files /> </ProtectedRoute> } />
                                <Route path="/rejected" element={<ProtectedRoute> <Rejected /> </ProtectedRoute> } />

                        </Routes>
                    </DrawerProvider>
                </ToggleColorMode>
            </AuthServiceProvider>
        </BrowserRouter>
    );
};


export default App
