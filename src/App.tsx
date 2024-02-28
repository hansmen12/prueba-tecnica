import "./App.css";
import { FormGeneral } from "./components/molecules/FormGeneral";
import { RegisterTable } from "./components/molecules/RegisterTable";
import { GeneralContextProvider } from "./context/GeneralContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <GeneralContextProvider>
      <div className="w-full h-full flex  flex-col-reverse lg:flex-row gap-5" >
        <FormGeneral />
        <RegisterTable />
      </div>
      <ToastContainer />
    </GeneralContextProvider>
  );
}

export default App;
