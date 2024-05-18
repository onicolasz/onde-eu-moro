interface CreateEventProps {
  address: string;
}

const CreateEvent: React.FC<CreateEventProps> = ({ address }) => {
  return (
    <div className="fixed bottom-4 right-16 bg-slate-200 border border-gray-600 p-4 rounded-xl max-w-md shadow-lg">
      <div>
        <p className="font-bold">{address}</p>
        <div className="mt-5">
          <label className="block mb-1" htmlFor="eventType">Tipo de Evento:</label>
          <select id="eventType" className="w-full border border-zinc-300 p-2 rounded">
            <option value="Incendio">Incêndio</option>
            <option value="Queda de Luz">Queda de Luz</option>
            <option value="Queda de Arvore">Queda de Árvore</option>
            <option value="Falta de Agua">Falta de Água</option>
            <option value="Assalto">Assalto</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
