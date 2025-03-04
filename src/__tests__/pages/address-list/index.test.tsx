import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import AddressList from "@/pages/address-list";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("AddressList", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should render correctly", () => {
    render(<AddressList />);
    expect(screen.getByText("Lista de Endereços")).toBeInTheDocument();
    expect(screen.getByText("Nenhum endereço cadastrado.")).toBeInTheDocument();
  });

  it("should display addresses stored in localStorage", async () => {
    const mockAddresses = [
      {
        cep: "74070-010",
        logradouro: "Rua Teste",
        bairro: "Bairro Teste",
        localidade: "Cidade Teste",
        uf: "TT",
      },
    ];
    localStorage.setItem("addresses", JSON.stringify(mockAddresses));

    render(<AddressList />);

    await waitFor(() => {
      expect(screen.getByText("74070-010")).toBeInTheDocument();
      expect(screen.getByText("Rua Teste")).toBeInTheDocument();
      expect(screen.getByText("Bairro Teste")).toBeInTheDocument();
      expect(screen.getByText("Cidade Teste")).toBeInTheDocument();
      expect(screen.getByText("TT")).toBeInTheDocument();
    });
  });

  it("should navigate to the form page when clicking the button", () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<AddressList />);

    fireEvent.click(screen.getByText("Voltar ao formulário"));

    expect(pushMock).toHaveBeenCalledWith("/form");
  });

  it("must match the snapshot", () => {
    const { asFragment } = render(<AddressList />);
    expect(asFragment()).toMatchSnapshot();
  });
});
