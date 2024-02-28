import { useEffect } from "react";
import { IFormValues } from "../../../interfaces/IFormValues";
import { useGeneralContext } from "../../../context/GeneralContext";
import { toast } from "react-toastify";

export function RegisterTable() {
  const { dataRegistered, setDataRegistered, setRegisterEdit } =
    useGeneralContext();

  const handleDelete = (id: number) => {
    try {
      const filterData = dataRegistered.filter(
        (_: IFormValues, index: number) => index !== id
      );
      localStorage.setItem("register-test", JSON.stringify(filterData));
      setDataRegistered(filterData);
      toast("Registro eliminado correctamente!");
    } catch (error) {}
  };

  const handleSelectEdit = (data: IFormValues, id: number) => {
    setRegisterEdit({ ...data, id });
  };

  useEffect(() => {
    const isLoacalstorage = localStorage.getItem("register-test");
    if (isLoacalstorage) {
      const data: IFormValues[] = JSON.parse(isLoacalstorage);
      setDataRegistered(data);
    }
  }, []);
  return (
    <div className="h-full w-full overflow-x-auto">
      <div className="mb-5">
        <h3 className="text-lg uppercase font-bold text-center">
          Registros de inspección
        </h3>
      </div>
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border-b text-sm px-2">Nombre de personal</th>
            <th className="border-b text-sm px-2">Email de personal</th>
            <th className="border-b text-sm px-2">Nombre de inspector</th>
            <th className="border-b text-sm px-2">Email de inspector</th>
            <th className="border-b text-sm px-2">Resultado inspección</th>
            <th className="border-b text-sm px-2">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {dataRegistered?.length > 0 &&
            dataRegistered?.map((register, index: number) => {
              const response = register?.itemsWithAnswers?.filter(
                (item) => item.answer === false
              );
              return (
                <tr className="">
                  <td className=" text-center border-b">
                    {register.namesPerson}
                  </td>
                  <td className=" text-center border-b">
                    {register.emailPerson}
                  </td>
                  <td className=" text-center border-b">
                    {register.namesInspector}
                  </td>
                  <td className=" text-center border-b">
                    {register.emailInspector}
                  </td>

                  <td className=" text-center border-b">
                    {response?.length || 0 > 3 ? "Observado" : "Correcta"}
                  </td>
                  <td className="flex gap-2 text-center border-b p-2">
                    <button
                      className="bg-yellow-300 px-2 text-gray-900 rounded-lg"
                      onClick={() => handleSelectEdit(register, index)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-400 px-2 text-gray-900 rounded-lg"
                      onClick={() => handleDelete(index)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
