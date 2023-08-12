import {createContext, useContext, useState} from "react";

const DrawerContext = createContext({
    isDrawerOpen: false,
    toggleDrawer: () => {}
})
export const useDrawer = () => {
    return useContext(DrawerContext)
}

export const DrawerProvider = ({children}) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }

    const value = {
        isDrawerOpen, toggleDrawer
    }
    return (
        <DrawerContext.Provider value={value}>
            {children}
        </DrawerContext.Provider>
    )
}

