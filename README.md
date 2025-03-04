📌 README - Consulta e Cadastro de Endereços via CEP
📍 Consulta e Cadastro de Endereços
Este projeto é uma aplicação web para busca de endereços via CEP utilizando a API do ViaCEP. Além disso, permite salvar os endereços localmente no navegador e exibi-los em uma listagem.

✅ Busca automática de endereço pelo CEP
✅ Armazena os endereços no LocalStorage
✅ Exibe os endereços salvos em uma tabela estilizada
✅ Cache local para evitar requisições repetidas
✅ Interface responsiva usando Tailwind CSS

🚀 Tecnologias Utilizadas
Next.js - Framework React para aplicações server-side

TypeScript - Tipagem estática para maior segurança no código

React Hook Form - Gerenciamento de formulários

Tailwind CSS - Estilização flexível e responsiva

Jest + Testing Library - Testes unitários

Heroicons - Ícones modernos para interface

📂 Estrutura do Projeto
bash
Copiar
Editar
/address-challenge
│── /components # Componentes reutilizáveis
│── /models # Tipagem e modelos de dados
│── /pages # Páginas do projeto (Next.js)
│── /public/assets # Imagens e assets do projeto
│── /styles # Arquivos de estilo
│── /tests # Testes unitários
│── package.json # Dependências do projeto
│── README.md # Documentação do projeto

🛠️ Instalação e Execução
1️⃣ Clone o repositório
bash
Copiar
Editar
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

2️⃣ Instale as dependências
bash
Copiar
Editar
npm install

# ou

yarn install

3️⃣ Inicie o projeto
bash
Copiar
Editar
npm run dev

# ou

yarn dev
Acesse http://localhost:3000 no navegador.

📝 Decisões Técnicas
Next.js foi escolhido para facilitar o roteamento e otimizar o desempenho da aplicação.

React Hook Form foi utilizado para um gerenciamento eficiente dos inputs e validação.

useReducer foi implementado para o cache de CEPs, evitando requisições desnecessárias.

LocalStorage foi usado para persistir os endereços salvos, garantindo que o usuário não perca os dados ao recarregar a página.

Tailwind CSS foi aplicado para tornar o design responsivo e estilizar os componentes de forma modular.

Testes unitários foram desenvolvidos usando Jest e Testing Library para garantir o correto funcionamento dos componentes principais.

🤖 Uso de Inteligência Artificial
Parte da solução foi desenvolvida com o auxílio de inteligência artificial (ChatGPT e Copilot) para:

Gerar estrutura inicial do README

Auxiliar na lógica do useReducer para cache de CEPs

Refinar código CSS/Tailwind para responsividade

Escrever e melhorar testes unitários

Todo código gerado foi revisado e ajustado para seguir boas práticas de programação.

✅ Testes
Para rodar os testes unitários:

bash
Copiar
Editar
npm run test

# ou

yarn test
Os testes verificam:

Renderização dos componentes principais

Busca de endereço pelo CEP

Armazenamento e listagem correta dos endereços

Redirecionamento entre páginas

📄 Licença
Este projeto é open-source e pode ser utilizado livremente.
