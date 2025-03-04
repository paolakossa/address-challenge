import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import FormPage from "@/pages/form";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../components/CepField", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ name, label, onCepSearch }: any) => {
    return (
      <div>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          id={name}
          data-testid={name}
          onChange={() =>
            onCepSearch?.({
              logradouro: "Rua Teste",
              bairro: "Bairro Teste",
              localidade: "Cidade Teste",
              uf: "TT",
            })
          }
        />
      </div>
    );
  },
}));

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("FormPage", () => {
  it("should render correctly", () => {
    render(
      <Wrapper>
        <FormPage />
      </Wrapper>
    );

    expect(
      screen.getByText("Digite o CEP para preencher os campos automaticamente.")
    ).toBeInTheDocument();
    expect(screen.getByText("Salvar")).toBeInTheDocument();
  });

  it("must fill in the fields correctly when searching for a zip code", async () => {
    render(
      <Wrapper>
        <FormPage />
      </Wrapper>
    );

    const cepInput = screen.getByTestId("cep");
    fireEvent.change(cepInput, { target: { value: "74070010" } });

    await waitFor(() => {
      expect(screen.getByLabelText("Logradouro:")).toHaveValue("Rua Teste");
      expect(screen.getByLabelText("Bairro:")).toHaveValue("Bairro Teste");
      expect(screen.getByLabelText("Localidade:")).toHaveValue("Cidade Teste");
      expect(screen.getByLabelText("UF:")).toHaveValue("TT");
    });
  });

  it("should store the address in localStorage and redirect on save", async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(
      <Wrapper>
        <FormPage />
      </Wrapper>
    );

    fireEvent.change(screen.getByTestId("cep"), {
      target: { value: "74070010" },
    });
    fireEvent.change(screen.getByLabelText("Logradouro:"), {
      target: { value: "Rua Teste" },
    });
    fireEvent.change(screen.getByLabelText("Bairro:"), {
      target: { value: "Bairro Teste" },
    });
    fireEvent.change(screen.getByLabelText("Localidade:"), {
      target: { value: "Cidade Teste" },
    });
    fireEvent.change(screen.getByLabelText("UF:"), { target: { value: "TT" } });

    fireEvent.click(screen.getByText("Salvar"));

    await waitFor(() => {
      expect(localStorage.getItem("addresses")).toContain("Rua Teste");
      expect(pushMock).toHaveBeenCalledWith("/address-list");
    });
  });

  it("must match the snapshot", () => {
    const { asFragment } = render(
      <Wrapper>
        <FormPage />
      </Wrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
