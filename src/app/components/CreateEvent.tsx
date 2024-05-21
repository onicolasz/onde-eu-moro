import { DatePicker } from "@nextui-org/date-picker";
import { Slider } from "@nextui-org/slider";
import { now, getLocalTimeZone } from "@internationalized/date";
import Button from "./Button";
interface CreateEventProps {
  address: string | null;
  updateCircleRadius: (radius: number) => void;
  onClose: () => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({
  address,
  updateCircleRadius,
  onClose,
}) => {
  const options = [
    { value: "Incendio", label: "Incêndio" },
    { value: "Queda de Luz", label: "Queda de Luz" },
    { value: "Queda de Arvore", label: "Queda de Árvore" },
    { value: "Falta de Agua", label: "Falta de Água" },
    { value: "Barulho excessivo", label: "Barulho excessivo" },
    { value: "Assalto", label: "Assalto" },
  ];

  const handleRadiusChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      updateCircleRadius(value[0]);
    } else {
      updateCircleRadius(value);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 bg-white border border-slate-200 p-4 rounded-xl max-w-md shadow-lg">
      <div>
        <p className="font-bold">{address}</p>
        <div className="mt-5">
          <label className="block mb-1 ml-1 font-medium" htmlFor="eventType">
            Tipo de Evento
          </label>
          <select
            id="eventType"
            className="w-full border border-slate-200 p-2 rounded-xl"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-5">
          <label className="block mb-1 ml-1 font-medium">Título</label>
          <input
            className="min-w-full p-2 rounded-xl bg-gray-200"
            type="text"
          />
        </div>
        <div className="mt-5">
          <label className="block mb-1 ml-1 font-medium">
            Data do ocorrido
          </label>
          <DatePicker
            variant="faded"
            color="default"
            hideTimeZone
            showMonthAndYearPickers
            defaultValue={now(getLocalTimeZone())}
          />
        </div>
        <div className="mt-5">
          <label className="block mb-1 ml-1 font-medium">Nível de risco</label>
          <Slider
            size="md"
            step={1}
            color="foreground"
            showSteps={true}
            showTooltip={true}
            maxValue={5}
            minValue={1}
            defaultValue={1}
            startContent={1}
            endContent={5}
            className="max-w-md"
          />
        </div>
        <div className="mt-5">
          <label className="block mb-1 ml-1 font-medium">Área afetada</label>
          <Slider
            size="md"
            step={0.1}
            color="foreground"
            maxValue={50}
            minValue={1}
            defaultValue={1}
            className="max-w-md"
            onChange={handleRadiusChange}
          />
        </div>
        <div className="mt-5 justify-between flex">
          <Button
            onClick={onClose}
            text="Descartar"
            className="w-40 justify-center flex font-medium border-none hover:bg-zinc-300 duration-300 active:bg-white"
          ></Button>
          <Button
            text="Criar"
            className="w-40 justify-center flex bg-black text-white border-none font-medium hover:bg-zinc-900 duration-300 active:bg-black"
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
