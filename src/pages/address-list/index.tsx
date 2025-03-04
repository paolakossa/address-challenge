import React, { useEffect, useState } from "react";
import Address from "@/models/Address";
import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const AddressList = () => {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    const storedAddresses = localStorage.getItem("addresses");
    if (storedAddresses) {
      setAddresses(JSON.parse(storedAddresses));
    }
  }, []);

  return (
    <div className="h-screen flex flex-col items-center bg-[#f4fdf8] p-6">
      <button
        type="button"
        className="mb-6 px-6 py-2 bg-[#225741] text-white font-semibold rounded-lg hover:bg-green-700 transition"
        onClick={() => router.push("/form")}
      >
        <div className="flex items-center">
            <ChevronLeftIcon className="w-6 h-6" />
            <span className="mr-2">Voltar ao formulário</span>
          </div>
      </button>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-[#225741]">
          Lista de Endereços
        </h1>

        {addresses.length === 0 ? (
          <p className="text-center text-gray-500">
            Nenhum endereço cadastrado.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg shadow-md">
              <thead>
                <tr className="bg-[#225741] text-white">
                  <th className="p-3 text-left">CEP</th>
                  <th className="p-3 text-left">Logradouro</th>
                  <th className="p-3 text-left">Bairro</th>
                  <th className="p-3 text-left">Localidade</th>
                  <th className="p-3 text-left">UF</th>
                </tr>
              </thead>
              <tbody>
                {addresses.map((addr, index) => (
                  <tr
                    key={index}
                    className="border-b transition hover:bg-[#e3f2e1]"
                  >
                    <td className="p-3">{addr.cep}</td>
                    <td className="p-3">{addr.logradouro}</td>
                    <td className="p-3">{addr.bairro}</td>
                    <td className="p-3">{addr.localidade}</td>
                    <td className="p-3">{addr.uf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressList;
