# Criando Tabelas e Aplicando Filtros Condicionais

> *Uma planilha com 500 linhas de dados soltos é um labirinto. A mesma planilha organizada como tabela, com filtros ativos, vira uma ferramenta que responde perguntas em segundos. A diferença não está nos dados — está na organização.*

---

## De "dados numa planilha" para "tabela de verdade"

É comum confundir os dois conceitos, mas eles não são a mesma coisa. Digitar informações organizadas em linhas e colunas é apenas o primeiro passo. Transformar esse conjunto de dados numa **Tabela** (com T maiúsculo, no sentido técnico do Excel) é o que libera um conjunto de recursos muito mais poderoso.

Para transformar um intervalo de dados numa tabela oficial, selecione as células e use o atalho **Ctrl + T**, ou acesse **Inserir → Tabela**.

> 🧠 **Curiosidade:** Antes do Excel 2007, esse recurso se chamava **Lista**. A partir dessa versão, a Microsoft renomeou e expandiu drasticamente as funcionalidades, transformando o que era um recurso simples de organização em uma verdadeira estrutura de banco de dados dentro da própria planilha.

---

## O que muda quando você formata como Tabela

Ao transformar um intervalo em Tabela, o Excel entrega automaticamente:

- **Cabeçalhos com filtros já ativados** — pequenas setas aparecem em cada coluna;
- **Formatação visual em faixas coloridas alternadas**, facilitando a leitura de cada linha;
- **Expansão automática** — ao digitar uma nova linha logo abaixo da tabela, ela é incorporada automaticamente à estrutura, arrastando fórmulas e formatação junto;
- **Referências estruturadas** — fórmulas passam a poder usar o nome da coluna em vez do endereço da célula, como `=Tabela1[Valor]` em vez de `=B2:B50`.

> 💡 **Dica:** Dê um nome descritivo à sua tabela em **Design da Tabela → Nome da Tabela**, em vez de deixar o padrão genérico "Tabela1". Isso facilita muito na hora de escrever fórmulas em planilhas grandes com várias tabelas diferentes.

---

## Entendendo o filtro básico

Com os dados formatados como tabela, cada cabeçalho de coluna ganha uma pequena seta. Clicar nela abre um menu com todas as opções de filtro disponíveis para aquela coluna específica.

O filtro não apaga nenhum dado — ele apenas **esconde temporariamente** as linhas que não atendem ao critério escolhido, mantendo tudo intacto por baixo.

> 🧠 **Curiosidade:** Quando um filtro está ativo, o Excel altera discretamente a cor do ícone na seta do cabeçalho, indicando visualmente quais colunas estão sendo filtradas naquele momento. É um detalhe pequeno, mas evita a armadilha clássica de esquecer um filtro ativo e interpretar dados incompletos como se fossem o conjunto completo.

---

## Filtros condicionais: indo além do "igual a"

A verdadeira força dos filtros aparece quando você vai além de simplesmente marcar valores específicos numa lista, e passa a usar **condições**. O Excel oferece opções diferentes dependendo do tipo de dado da coluna:

**Em colunas de números:**
- Maior que, menor que, entre valores;
- 10 primeiros (ou últimos) valores;
- Acima ou abaixo da média.

**Em colunas de texto:**
- Contém, não contém;
- Começa com, termina com;
- Igual a um valor exato.

**Em colunas de data:**
- Este mês, mês passado, este ano;
- Antes de, depois de, entre datas.

> 💡 **Dica:** Para acessar essas condições, clique na seta do cabeçalho e vá até **Filtros de Número**, **Filtros de Texto** ou **Filtros de Data**, dependendo do tipo de coluna. O Excel identifica automaticamente qual conjunto de opções faz sentido oferecer para cada tipo de dado.

---

## Filtrando por cor: quando a formatação vira critério

Se você já aplicou alguma formatação condicional numa coluna — destacando em vermelho valores baixos ou em verde valores altos, por exemplo — é possível usar essas próprias cores como critério de filtro, através da opção **Filtrar por Cor**.

> 🧠 **Curiosidade:** Esse recurso é particularmente útil em planilhas de controle e acompanhamento, onde cores costumam representar status — vermelho para atrasado, amarelo para em andamento, verde para concluído. Filtrar diretamente pela cor evita ter que criar uma coluna extra só para guardar essa informação em texto.

---

## Ordenando dados junto com o filtro

O mesmo menu que abre os filtros também permite **ordenar** a coluna, do menor para o maior valor, de A a Z, ou pela cor da célula. Combinar ordenação com filtro é uma das formas mais rápidas de responder perguntas como "quais foram os cinco produtos mais vendidos do mês, entre os que ainda estão em estoque?" — sem precisar de nenhuma fórmula.

> 💡 **Dica:** Para remover todos os filtros ativos de uma vez e visualizar novamente a tabela completa, use **Dados → Limpar** na guia Dados, ou clique no ícone de funil ao lado do botão de filtro.

---

## Um exemplo prático de uso combinado

Imagine uma tabela de controle de estoque com colunas de Produto, Categoria, Quantidade e Última Reposição. Para descobrir rapidamente quais produtos de uma categoria específica estão com estoque abaixo de 10 unidades, o caminho seria:

1. Aplicar o filtro de texto na coluna **Categoria**, selecionando apenas a categoria desejada;
2. Aplicar o filtro de número **Menor que** na coluna **Quantidade**, digitando 10;
3. Ordenar o resultado por **Última Reposição**, para ver primeiro os produtos que estão há mais tempo sem reabastecimento.

Em três cliques, uma planilha com centenas de linhas se transforma numa resposta direta e visual, sem escrever uma única fórmula.

---

*Transformar dados soltos em uma Tabela de verdade, com filtros condicionais bem aplicados, é o que separa uma planilha confusa de uma ferramenta de consulta rápida e confiável. Com as cinco aulas até aqui — história, estrutura, dinamismo, funções e tabelas — você já tem a base necessária para organizar, calcular e interpretar dados no Excel com muito mais confiança.*
