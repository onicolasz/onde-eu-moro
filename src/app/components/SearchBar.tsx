import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


interface SearchBarProps {
  onSearch: (address: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="z-10 items-center justify-between text-sm flex">
     <div className="relative">
        <input
          className="min-w-96 justify-center p-4 pr-10 rounded-3xl shadow-lg bg-p-4 border border-gray-500 bg-slate-200"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite seu endereço de pesquisa"
        />
        <button type="submit" className="absolute right-0 top-0 bottom-0 bg-transparent border-0 cursor-pointer p-3">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-1" size="lg" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
