# inveXP :: backend

este é um projeto desenvolvido para solução do desafio técnico proposto pela XP Inc em seu processo seletivo para Engenheiro de Software I (julho 2022). 

<details>
  <summary><strong>Desafio Técnico</strong></summary><br />
o desafio técnico propõe o desenvolvimento de um aplicativo de investimento de ações, com funcionalidade de conta digital. Para o desenvolvimento de frontend espera-se a elaboração de 4 (quatro) telas: login, lista de ações, tela de compra e venda de ações e tela de depósito e retirada da conta. Do backend, espera-se o desenvolvimento de APIs que forneçam as informações de clientes, contas, ações e carteiras para popular as quatro telas.
<br /><br />
este repositório compreende apenas o desenvolvimento backend do desafio.

  <br />
</details>
<details>
  <summary><strong>Planejamento</strong></summary><br />

foram disponibilizados 10 dias para a realização do desafio. Considerando a alta demanda de tarefas do meu dia-a-dia para as atividades de finalização do meu mestrado e do curso da Trybe, foi impressindível o planejamento inicial do projeto. Dessa forma, pude garantir a entrega no prazo, com qualidade.

um cronograma foi elaborado no dia 1 de projeto com as atividades a serem desenvolvidas. Um gráfico de burndown foi traçado a partir desta expectativa. Diariamente, registrava os meus avanços no andamento do projeto. O planejamento e os registros podem ser acompanhados no arquivo <i>[cronograma](./cronograma.ods)</i>.

  <br />
</details>
<details>
  <summary><strong>Banco de Dados</strong></summary><br />

para fornecer as informações à aplicação, foi desenhado um banco de dados conforme o [diagrama ER](https://drawsql.app/trybe-26/diagrams/invexp).

![ER](https://github.com/telm-e/inveXP/blob/main/ER%20Diagram.png)

o mySQL foi escolhido para criar uma simulação do banco de dados por ser a ferramenta que possuo maior fluência. O <i>[script](./invexp.sql)</i> pode ser executado para criação do banco de dados.

algumas decisões foram tomadas durante o desenvolvimento da aplicação para adaptação do banco de dados desenhado inicialmente:
> a) apesar de entender que pode existir uma relação 1:N entre Clients e Accounts (um cliente pode ter mais de uma conta), foi considerado que a relação é 1:1 (um cliente possuí uma única conta). Dessa forma, o número de identificação clientID é utilizado para identificar clientes e contas, sem distinção.<br /><br />
> b) é feita a distinção de clientId e assetId de acordo com o número de dígitos do identificador. Os IDs de ativos (assetId) começam a ser registrados a partir do número 100 (3 dígitos). Os IDs de clientes (clientId) começam a ser registrados a partir do número 10000 (5 dígitos). Dessa forma, para os endpoints GET /assets/{clientId} e GET /assets/{assetId} foi feita a distinção dos dados a serem buscados através do número de dígitos dos identificadores.


  <br />
</details>
<details>
  <summary><strong>Desenvolvimento</strong></summary><br />

o desenvolvimento foi realizado utilizando node.js, express e mysql. Optei por utilizar o javascript por ser a linguagem que tenho mais fluência. Na realização do desafio havia apenas 2 semanas que eu estava em contato com o typescript e descartei a possibilidade de pratica-la por conta do tempo limitado.

foi utilizada a arquitetura MSC - Model, Service, Controller. As validações de requisição foram desenvolvidas como middlewares. Foi utilizado JWT para criar e verificar token nas requisições. Foi durante o desenvolvimento deste projeto que tive o primeiro contato com o swagger e pude praticar a documentação de APIs a partir dessa ferramenta para melhor apresentação da lista das ações para o time de frontend.

  <br />
</details>
<details>
  <summary><strong>Próximos passos</strong></summary><br />

consigo elencar algumas melhorias que podem ser feitas nas próximas etapas do desenvolvimento deste aplicativo, que não foram contempladas nesta sprint do projeto:
> a) correção dos endpoints POST wallet/sale e POST wallet/purchase: ao criar uma transação nas carteiras de investimentos, outras atualizações são feitas no banco de dados (número de ativos disponíveis na corretora, em Assets; saldo em conta do cliente, em Accounts; número de ativos do cliente, em Wallets). No entanto, a transação do débito ou crédito devido à compra ou venda do ativo não está sendo registrada nas transições da conta corrente do cliente. Acredito que isso deve ser implementado para acompanhamento do extrato da conta.
<br /><br />
> b) ao vender toda a quantidade de um ativo existente em carteira, o ativo permanece sendo apresentado com a quantidade "0". Refatorar para que o registro seja apagado de Wallets quando não houver mais ativos em carteira.
<br /><br />
> c) desenvolver testes: a principio, o desenvolvimento de testes tinha sido considerado no planejamento do meu cronograma de trabalho. No entanto, com alguns atrasos com a aprendizagem de swagger e a implementação de JWT com esta ferramenta (priorização que julguei mais relevante para a área de dados, minha área de interesse), esse desenvolvimento não foi contemplado.
<br /><br />
> d) fazer deploy da API

  <br />
</details>

### inveXP API: como utilizar

para acompanhar o desenvolvimento desta API você pode:

1) Fazer o fork do repositório e clonar o seu fork em um repositório local.
2) Instalar as dependências `npm install`
3) Rodar o script no SQL para criar o schema "Invexp".
3) Criar na raiz da pasta do projeto um arquivo .env com as seguintes variáveis de ambiente:
> MYSQL_HOST=host <br />
> MYSQL_USER=user <br />
> MYSQL_PASSWORD=suasenha <br />
> MYSQL_DATABASE=Invexp <br />
> JWT_SECRET=suasenhasecreta <br />
4) Colocar o aplicativo para rodar. Para isso, utilize `npm run dev` . O aplicativo está configurado para rodar na porta 3000.
5) Após rodar a aplicação no servidor local, acompanhe as ações possíveis a partir da lista de endpoints na documentação do swagger: http://localhost:3000/docs
6) Para rodar os endpoints protegidos por verificação de token, solicite um token utilizando o endpoint /login. Copie e cole apenas a hash no campo "authorize" do swagger.

  <br />
