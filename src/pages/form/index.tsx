import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import CepField from "../../components/CepField";
import Cep from "../../models/Cep";
import TextField from "../../components/TextField";
import { useRouter } from "next/router";

type FormData = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};

const FormPage = () => {
  const methods = useForm<FormData>();
  const router = useRouter();

  const handleCepSearch = (data: Cep | null) => {
    if (data) {
      methods.setValue("logradouro", data.logradouro || "");
      methods.setValue("bairro", data.bairro || "");
      methods.setValue("localidade", data.localidade || "");
      methods.setValue("uf", data.uf || "");
    } else {
      methods.setValue("logradouro", "");
      methods.setValue("bairro", "");
      methods.setValue("localidade", "");
      methods.setValue("uf", "");
    }
  };

  const onSubmit = (formData: FormData) => {
    const storedAddresses = localStorage.getItem("addresses");
    const addresses = storedAddresses ? JSON.parse(storedAddresses) : [];
    addresses.push(formData);
    localStorage.setItem("addresses", JSON.stringify(addresses));
    router.push("/address-list");
  };

  return (
    <FormProvider {...methods}>
      <div className="h-screen flex flex-col md:flex-row items-center justify-center  bg-[#f4fdf8]">
        <div
          className="w-full md:w-1/2 h-150 md:h-screen bg-cover bg-center md:bg-right"
          style={{ backgroundImage: "url('/assets/images/address.png')" }}
        />
        <div className="md:w-1/2 flex justify-center items-center">
          <div className=" bg-gray-50 p-10 rounded-xl shadow-lg max-w-md w-full">
            <h1 className="text-xl font-bold mb-4 text-center">
              {" "}
              Digite o CEP para preencher os campos automaticamente.
            </h1>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <CepField name="cep" label="CEP:" onCepSearch={handleCepSearch} />
              <div className="mt-2">
                <TextField name="logradouro" label="Logradouro:" />
              </div>
              <div className="mt-2">
                <TextField name="bairro" label="Bairro:" />
              </div>
              <div className="my-2">
                <TextField name="localidade" label="Localidade:" />
              </div>{" "}
              <TextField name="uf" label="UF:" />
              <button
                type="submit"
                className="w-full mt-4 px-4 py-2 bg-[#225741] text-white rounded hover:bg-green-700 transition"
              >
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default FormPage;
