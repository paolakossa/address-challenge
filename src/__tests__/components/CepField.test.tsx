import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import CepField from "@/components/CepField";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("CepField", () => {
  it("should render correctly with label", () => {
    render(
      <Wrapper>
        <CepField name="cep" label="CEP" />
      </Wrapper>
    );

    expect(screen.getByLabelText("CEP")).toBeInTheDocument();
  });

  it("must allow typing in the input", () => {
    render(
      <Wrapper>
        <CepField name="cep" />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText("Digite seu CEP");
    fireEvent.change(input, { target: { value: "74070010" } });

    expect(input).toHaveValue("74070010");
  });

  it("should call the API when clicking the Search button", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cep: "74070-010",
            logradouro: "Avenida Independência",
            bairro: "Setor Aeroporto",
            localidade: "Goiânia",
            uf: "GO",
          }),
      })
    ) as jest.Mock;

    const onCepSearchMock = jest.fn();

    render(
      <Wrapper>
        <CepField name="cep" onCepSearch={onCepSearchMock} />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText("Digite seu CEP");
    const button = screen.getByRole("button", { name: /Pesquisar/i });

    fireEvent.change(input, { target: { value: "74070010" } });
    fireEvent.click(button);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(onCepSearchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        cep: "74070-010",
        logradouro: "Avenida Independência",
      })
    );
  });

  it("should display error when entering an invalid zip code", async () => {
    render(
      <Wrapper>
        <CepField name="cep" />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText("Digite seu CEP");
    fireEvent.change(input, { target: { value: "123" } });
    fireEvent.blur(input);

    await waitFor(() =>
      expect(screen.getByText("CEP deve conter 8 dígitos.")).toBeInTheDocument()
    );
  });

  it("must use the cache when searching for a previously queried zip code", async () => {
    const onCepSearchMock = jest.fn();
    localStorage.setItem(
      "cepCache",
      JSON.stringify({
        "74070010": {
          cep: "74070-010",
          logradouro: "Avenida Independência",
          bairro: "Setor Aeroporto",
          localidade: "Goiânia",
          uf: "GO",
        },
      })
    );

    render(
      <Wrapper>
        <CepField name="cep" onCepSearch={onCepSearchMock} />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText("Digite seu CEP");
    const button = screen.getByRole("button", { name: /Pesquisar/i });

    fireEvent.change(input, { target: { value: "74070010" } });
    fireEvent.click(button);

    await waitFor(() => expect(onCepSearchMock).toHaveBeenCalledTimes(1));

    expect(onCepSearchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        cep: "74070-010",
        logradouro: "Avenida Independência",
      })
    );
  });

  it("must match the snapshot", () => {
    const { asFragment } = render(
      <Wrapper>
        <CepField name="cep" label="CEP" />
      </Wrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
