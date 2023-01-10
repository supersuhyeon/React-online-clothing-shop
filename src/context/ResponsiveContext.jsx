import { createContext, useContext } from "react";
import {useMediaQuery} from 'react-responsive'

const Responsive = createContext()

export function ResponsiveContextProvider({children}){
    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth:769 })
        return isDesktop ? children : null
      }
      const DesktopBelowDevice = ({ children }) => {
        const isTablet = useMediaQuery({ maxWidth:768 })
        return isTablet ? children : null
      }

      return <Responsive.Provider value={{Desktop, DesktopBelowDevice}}>
      {children}
  </Responsive.Provider>
}

export function useResponsiveContext(){
    return useContext(Responsive)
}