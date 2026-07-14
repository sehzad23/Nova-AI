import AppRoutes from "./AppRoutes";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <AppRoutes />
      <Toaster
        theme="dark"
        position="top-center"
        expand={true}
        richColors
        closeButton
        gap={20}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#171717",
            color: "#fff",
            border: "1px solid rgba(59,130,246,.25)",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,.45)",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
};

export default App;
