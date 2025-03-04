import React, { useReducer, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import Cep from "@/models/Cep";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type CepCacheState = {
  [cep: string]: Cep;
};

type CacheAction = { type: "ADD_CEP"; cep: string; data: Cep };

function cacheReducer(
  state: CepCacheState,
  action: CacheAction
): CepCacheState {
  switch (action.type) {
    case "ADD_CEP":
      const newState = { ...state, [action.cep]: action.data };
      localStorage.setItem("cepCache", JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
}

type CepFieldProps = {
  name: string;
  label?: string;
  valueDefault?: string;
  onCepSearch?: (cepData: Cep | null) => void;
};

const CepField = ({
  name,
  label,
  valueDefault,
  onCepSearch,
}: CepFieldProps) => {
  const { control } = useFormContext();
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
    defaultValue: valueDefault || "",
  });

  const [cacheState, dispatch] = useReducer(cacheReducer, {}, () => {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("cepCache");
      return localData ? JSON.parse(localData) : {};
    }
    return {};
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [skipOnBlur, setSkipOnBlur] = useState(false);

  const handleCepSearch = async () => {
    const cep = value.replace(/\D/g, "");
    if (cep.length !== 8) {
      setError("CEP deve conter 8 dígitos.");
      onCepSearch?.(null);
      return;
    }

    if (cacheState[cep]) {
      setError("");
      onCepSearch?.(cacheState[cep]);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data: Cep = await response.json();
      if (data.erro) {
        setError("CEP inválido.");
        onCepSearch?.(null);
      } else {
        dispatch({ type: "ADD_CEP", cep, data });
        onCepSearch?.(data);
      }
    } catch (err) {
      console.error("Erro na requisição do CEP:", err);
      setError("Erro ao buscar o CEP.");
      onCepSearch?.(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBlur = async () => {
    if (skipOnBlur) {
      onBlur();
      setSkipOnBlur(false);
      return;
    }
    await handleCepSearch();
    onBlur();
  };

  return (
    <div>
      {label && (
        <label htmlFor={name} className="block mb-1 font-medium">
          {label}
        </label>
      )}
      <div className="flex items-center">
        <input
          id={name}
          ref={ref}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          placeholder="Digite seu CEP"
          className="border p-2 rounded flex-1"
        />
        <button
          type="button"
          onMouseDown={() => setSkipOnBlur(true)}
          onClick={handleCepSearch}
          className="ml-2 px-4 py-2 bg-[#225741] text-white rounded cursor-pointer  hover:bg-green-700 transition"
        >
          <div className="flex items-center">
            <MagnifyingGlassIcon className="w-6 h-6" />
            <span className="mr-2">Pesquisar</span>
          </div>
        </button>
      </div>
      {loading && <p className="text-sm text-gray-500 mt-2">Buscando...</p>}
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default CepField;
