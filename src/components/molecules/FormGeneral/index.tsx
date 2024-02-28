import { useEffect, useState } from "react";
import { InputText } from "../../atoms";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormValues } from "../../../interfaces/IFormValues";
import { useGeneralContext } from "../../../context/GeneralContext";
import { toast } from 'react-toastify';

const ITEMS = [
  {
    id: 1,
    question: "¿Cumple con los estándares de seguridad?",
    options: ["Sí", "No"],
  },
  {
    id: 2,
    question: "¿Se han corregido las deficiencias identificadas previamente?",
    options: ["Sí", "No"],
  },
  {
    id: 3,
    question: "¿Todos los empleados han recibido la capacitación requerida?",
    options: ["Sí", "No"],
  },
  {
    id: 4,
    question: "¿Se han implementado medidas para la eficiencia energética?",
    options: ["Sí", "No"],
  },
  {
    id: 5,
    question: "¿Se han llevado a cabo inspecciones regulares?",
    options: ["Sí", "No"],
  },
  {
    id: 6,
    question: "¿Se siguen los procedimientos de emergencia establecidos?",
    options: ["Sí", "No"],
  },
  {
    id: 7,
    question: "¿Existe un plan de gestión de residuos?",
    options: ["Sí", "No"],
  },
  {
    id: 8,
    question: "¿Se han implementado medidas para la accesibilidad?",
    options: ["Sí", "No"],
  },
  {
    id: 9,
    question: "¿Todos los equipos están debidamente etiquetados?",
    options: ["Sí", "No"],
  },
  {
    id: 10,
    question:
      "¿Se realiza un seguimiento regular de las actividades de inspección?",
    options: ["Sí", "No"],
  },
];

export function FormGeneral() {
  const { dataRegistered, setDataRegistered, registerEdit, setRegisterEdit } =
    useGeneralContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>();

  const [selectedOptions, setSelectedOptions] = useState<boolean[]>(
    new Array(ITEMS.length).fill(false)
  );

  const handleCheckboxChange = (index: number, value: boolean) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = value;
    setSelectedOptions(newSelectedOptions);
  };

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    const isLocalstorage = localStorage.getItem("register-test");
    try {
      if (registerEdit) {
        const values: IFormValues = {
          ...data,
          itemsWithAnswers: registerEdit.itemsWithAnswers,
        };
        const registeredOld = dataRegistered;
        const registerEditNew: any = registeredOld.map(
          (item, index: number) => {
            if (index === registerEdit.id) {
              return values;
            } else {
              return item;
            }
          }
        );
        setDataRegistered(registerEditNew);
        localStorage.setItem("register-test", JSON.stringify(registerEditNew));
        setRegisterEdit(null);
        reset();
        toast('Registro editado correctamente!')
        return true;
      }
      const itemsWithAnswers = ITEMS.map((item, index) => ({
        ...item,
        answer: selectedOptions[index] ? true : false,
      }));

      const values: IFormValues = { ...data, itemsWithAnswers };

      if (isLocalstorage) {
        const registerOld = JSON.parse(isLocalstorage);
        localStorage.setItem(
          "register-test",
          JSON.stringify([...registerOld, values])
        );
      } else {
        localStorage.setItem("register-test", JSON.stringify([values]));
      }

      setDataRegistered([...dataRegistered, values]);

      reset();
      toast('Registro guardado correctamente!')

    } catch (error) {}
  };

  useEffect(() => {
    if (registerEdit) {
      reset(registerEdit);
    }
  }, [registerEdit]);

  return (
    <form
      className="bg-gray-700 w-full flex flex-col p-5 gap-5 rounded-lg "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <h3 className="text-lg uppercase font-bold text-center">Formulario de inspección</h3>
      </div>
      <div className="w-full">
        <h3 className="text-lg mb-2">Datos de personal</h3>
        <div className="grid grid-cols-4 gap-2 ">
          <InputText
            label="Tipo Documento Identidad"
            name="documentTypePerson"
            register={register}
            type="text"
            error={
              errors?.documentTypePerson?.type === "required"
                ? "Campo requrido"
                : null
            }
          />
          <InputText
            label="Número Documento Identidad"
            name="documentPerson"
            register={register}
            type="text"
            error={
              errors?.documentPerson?.type === "required"
                ? "Campo requrido"
                : null
            }
          />
          <InputText
            label="Apellidos"
            name="lastnamePerson"
            register={register}
            type="text"
            error={
              errors?.lastnamePerson?.type === "required"
                ? "Campo requrido"
                : null
            }
          />
          <InputText
            label="Nombres"
            name="namesPerson"
            register={register}
            type="text"
            error={
              errors?.namesPerson?.type === "required" ? "Campo requrido" : null
            }
          />
          <InputText
            label="Telefono Celular"
            name="phonePerson"
            register={register}
            type="text"
            error={
              errors?.phonePerson?.type === "required" ? "Campo requrido" : null
            }
          />
          <div className="col-span-2">
            <InputText
              label="Email"
              name="emailPerson"
              register={register}
              type="text"
              error={
                errors?.emailPerson?.type === "required"
                  ? "Campo requrido"
                  : null
              }
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <h3 className="text-lg mb-2">Datos de inspector</h3>
        <div className="grid grid-cols-4 gap-2 ">
          <InputText
            label="Tipo Documento Identidad"
            name="documentTypeInspector"
            register={register}
            type="text"
            error={
              errors?.documentTypeInspector?.type === "required"
                ? "Campo requrido"
                : null
            }
          />
          <InputText
            label="Número Documento Identidad"
            name="documentInspector"
            register={register}
            type="text"
            error={
              errors?.documentInspector?.type === "required"
                ? "Campo requrido"
                : null
            }
          />
          <InputText
            label="Apellidos"
            name="lastnameInspector"
            register={register}
            type="text"
            error={
              errors?.lastnameInspector?.type === "required"
                ? "Campo requrido"
                : null
            }
          />
          <InputText
            label="Nombres"
            name="namesInspector"
            register={register}
            type="text"
            error={
              errors?.namesInspector?.type === "required"
                ? "Campo requrido"
                : null
            }
          />
          <InputText
            label="Telefono Celular"
            name="phoneInspector"
            register={register}
            type="text"
            error={
              errors?.phoneInspector?.type === "required"
                ? "Campo requrido"
                : null
            }
          />
          <div className="col-span-2">
            <InputText
              label="Email"
              name="emailInspector"
              register={register}
              type="text"
              error={
                errors?.emailInspector?.type === "required"
                  ? "Campo requrido"
                  : null
              }
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <h3 className="text-lg mb-2">Datos de Generales</h3>
        <div className="grid grid-cols-4 gap-2 ">
          <InputText
            label="País"
            type="text"
            register={register}
            name="country"
            error={
              errors?.country?.type === "required" ? "Campo requrido" : null
            }
          />
          <InputText
            label="Dirección"
            type="text"
            register={register}
            name="direction"
            error={
              errors?.direction?.type === "required" ? "Campo requrido" : null
            }
          />
          <InputText
            label="Cliente"
            type="text"
            register={register}
            name="client"
            error={
              errors?.client?.type === "required" ? "Campo requrido" : null
            }
          />
          <InputText
            label="Obra"
            type="text"
            register={register}
            name="work"
            error={errors?.work?.type === "required" ? "Campo requrido" : null}
          />
          <InputText
            label="Fecha"
            type="text"
            register={register}
            name="date"
            error={errors?.date?.type === "required" ? "Campo requrido" : null}
          />
        </div>
      </div>
      <div className="w-full">
        <h3 className="text-lg mb-2">Items</h3>
        <div className="">
          {ITEMS.map((item, index: number) => (
            <div>
              <p>{item.question}</p>
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <label>{item.options[0]}</label>
                  <input
                    type="checkbox"
                    name=""
                    checked={
                      registerEdit?.itemsWithAnswers
                        ? registerEdit?.itemsWithAnswers[index].answer
                        : undefined
                    }
                    onChange={(e) =>
                      handleCheckboxChange(index, e.target.checked)
                    }
                  />
                </div>
                <div className="flex items-center gap-1">
                  <label>{item.options[1]}</label>
                  <input
                    type="checkbox"
                    name=""
                    checked={
                      registerEdit?.itemsWithAnswers
                        ? !registerEdit?.itemsWithAnswers[index].answer
                        : undefined
                    }
                    onChange={(e) =>
                      handleCheckboxChange(index, !e.target.checked)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center gap-5">
        <button
          type="submit"
          className="bg-blue-500 h-10 rounded-lg font-bold w-36"
        >
          {registerEdit ? "Editar" : "Guardar"}
        </button>
        <button
          type="button"
          className="bg-yellow-500 h-10 rounded-lg font-bold w-36"
          onClick={() => {
            setRegisterEdit(null);
            reset();
          }}
        >
          Crear Nuevo
        </button>
      </div>
    </form>
  );
}
