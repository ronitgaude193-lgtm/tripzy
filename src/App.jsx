import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./context/AuthContext";
import SocketProvider from "./context/SocketContext";
import SOSButton from "./components/SOSButton";

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppRoutes />
        <SOSButton />
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;