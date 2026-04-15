import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./context/AuthContext";
import SocketProvider from "./context/SocketContext";
import SOSButton from "./components/SOSButton";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <AppRoutes />
          <SOSButton />
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;