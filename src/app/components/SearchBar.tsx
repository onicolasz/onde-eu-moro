import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { MapContext } from "@/contexts/map";


const SearchBar = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { searchAddress  } = useContext(MapContext)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchAddress(input);
  };

  const handleInputChange = async (value: string) => {
    setInput(value);
    if (value.length > 2) {
      const fetchedSuggestions = await fetch(`/api/suggestions?input=${value}`);

      if (fetchedSuggestions.status == 200) {
        const data = await fetchedSuggestions.json();
        setSuggestions(data);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="z-10 items-center justify-between text-sm flex"
      >
        <div className="relative">
          <input
            className="min-w-96 justify-center p-4 pr-10 rounded-3xl shadow-lg bg-p-4 border border-slate-200 bg-white text-medium"
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleInputChange(e.target.value);
            }}
            placeholder="Digite seu endereço de pesquisa"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 bottom-0 bg-transparent border-0 cursor-pointer p-3"
          >
            <FontAwesomeIcon
              icon={faSearch}
              className="text-slate-400 mr-1"
              size="lg"
            />
          </button>
        </div>
      </form>
      <ul className="absolute w-full bg-white rounded-xl mt-2">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="p-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => setInput(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
