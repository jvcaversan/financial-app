Aplicativo de Finanças Pessoais
Bem-vindo ao repositório do Aplicativo de Finanças Pessoais! Este é um aplicativo móvel desenvolvido em React Native (Expo) que permite aos usuários gerenciar suas finanças de forma simples e eficiente. Com ele, você pode criar, editar e excluir recebíveis e gastos, visualizar um gráfico de transações, acompanhar todas as transações em uma lista e ter o cálculo automático do saldo.

Este projeto foi desenvolvido utilizando Drizzle ORM e Expo SQLite como banco de dados local, garantindo uma experiência rápida e confiável.

Funcionalidades Principais

1. Gestão de Recebíveis e Gastos
   Criar Recebíveis:

Adicione recebíveis (entradas de dinheiro) com valor e descrição.

Criar Gastos:

Adicione gastos (saídas de dinheiro) com valor e descrição.

Edição:

Edite recebíveis e gastos existentes para atualizar valores ou descrições.

Exclusão:

Remova recebíveis ou gastos que não são mais necessários.

2. Gráfico de Transações
   Visualize um gráfico interativo que mostra a distribuição de recebíveis e gastos ao longo do tempo.

O gráfico ajuda a identificar padrões de gastos e receitas.

3. Lista de Todas as Transações
   Acesse uma aba dedicada com todas as transações (recebíveis e gastos) em uma lista organizada.

Cada transação exibe o valor, a descrição e a data.

4. Cálculo Automático de Saldo
   O saldo é calculado automaticamente com base nas transações registradas.

O saldo é atualizado em tempo real à medida que novas transações são adicionadas, editadas ou excluídas.

Tecnologias Utilizadas
React Native (Expo): Para o desenvolvimento do aplicativo móvel multiplataforma.

Drizzle ORM: Para gerenciar o banco de dados de forma eficiente e com tipagem segura.

Expo SQLite: Como banco de dados local para armazenar as transações.

TypeScript: Para garantir um código mais seguro e escalável.

Tanstack React Query: Adicionar, Editar, Excluir, Buscar transações.

React Native SVG Charts: Para a criação de gráficos interativos.

Requisitos do Sistema
Para rodar o projeto localmente, você precisará dos seguintes requisitos:

Node.js (versão 18 ou superior)

npm ou yarn (gerenciadores de pacotes)

Xcode (para desenvolvimento iOS)

Android Studio (para desenvolvimento Android)

Expo CLI (instalado globalmente)

Como Executar o Projeto
Siga os passos abaixo para configurar e executar o aplicativo no seu ambiente local:

Clone o repositório:

git clone https://github.com/seu-usuario/aplicativo-financas.git
cd aplicativo-financas
Instale as dependências:

npm install
Inicie o servidor de desenvolvimento:

npx expo start
Execute o aplicativo:

No terminal, pressione i para abrir o aplicativo no iOS Simulator (Xcode necessário).

Pressione a para abrir o aplicativo no Android Emulator (Android Studio necessário).

Ou escaneie o QR code com o aplicativo Expo Go no seu smartphone físico.
