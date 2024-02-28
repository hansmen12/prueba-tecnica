import { createContext, useContext, useState } from "react";
import { IFormValues } from "../interfaces/IFormValues";

interface GeneralContextType {
  dataRegistered: IFormValues[]; 
  setDataRegistered: React.Dispatch<React.SetStateAction<IFormValues[]>>;
  setRegisterEdit: React.Dispatch<React.SetStateAction<IFormValues | null>>,
  registerEdit: IFormValues;
}

const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

const GeneralContextProvider = ({ children }: any) => {
  const [dataRegistered, setDataRegistered] = useState<any>([]);
  const [registerEdit, setRegisterEdit] = useState<any>(null);
  return (
    <GeneralContext.Provider
      value={{
        dataRegistered,
        setDataRegistered,
        setRegisterEdit,
        registerEdit
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error(
      "useGeneralContext debe ser utilizado dentro de un proveedor de GeneralContext"
    );
  }
  return context;
};

export { GeneralContextProvider, useGeneralContext };
