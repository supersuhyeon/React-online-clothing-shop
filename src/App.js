import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import { ResponsiveContextProvider } from "./context/ResponsiveContext";

const queryClient = new QueryClient()

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ResponsiveContextProvider>
             <Navbar></Navbar>
        <Outlet></Outlet>
        </ResponsiveContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
    </>
  );
}

export default App;
