# Funções: SOMA, MÉDIA, MÁXIMO e MÍNIMO

> *Somar dez números um por um, com o sinal de +, funciona. Mas somar duzentos números da mesma forma é uma tortura desnecessária. Existe um jeito muito mais inteligente — e ele já vem pronto dentro do Excel.*

---

## O que é uma função, afinal

Uma **função** é uma fórmula pronta, criada pelo Excel para resolver operações comuns sem que você precise escrever tudo manualmente. Em vez de somar célula por célula com o sinal de `+`, você entrega ao Excel um **intervalo** de células, e ele faz o cálculo inteiro de uma vez.

Toda função segue a mesma estrutura básica:

`=NOME_DA_FUNÇÃO(argumento)`

O "argumento" é a informação que a função precisa para trabalhar — geralmente um intervalo de células, como `A1:A10`.

> 🧠 **Curiosidade:** O símbolo de dois pontos (**:**) dentro de um intervalo, como em `A1:A10`, significa "até". Ou seja, `A1:A10` deve ser lido como "da célula A1 até a célula A10". Já a vírgula (**,**) significa "e", permitindo somar células separadas: `=SOMA(A1:A10;C1:C10)` soma dois intervalos diferentes de uma só vez.

---

## SOMA: a função mais usada do Excel

A função **SOMA** adiciona todos os valores de um intervalo selecionado.

`=SOMA(B2:B15)`

Essa fórmula soma tudo que estiver entre a célula B2 e a célula B15, sem que você precise digitar `+` entre cada uma delas.

> 💡 **Dica:** Você não precisa nem digitar a função manualmente. Selecione o intervalo de números que quer somar e observe o canto inferior direito da tela: o Excel já mostra a soma automática ali, sem nenhuma fórmula. Para transformar isso numa célula de resultado, use o botão **AutoSoma** (o símbolo Σ) na guia **Página Inicial**.

---

## MÉDIA: o valor típico de um conjunto de dados

A função **MÉDIA** calcula a média aritmética simples de um intervalo — soma todos os valores e divide pela quantidade de números.

`=MÉDIA(B2:B15)`

> 🧠 **Curiosidade:** A MÉDIA no Excel ignora automaticamente células vazias na hora do cálculo — mas **não** ignora células com o valor zero. Isso é uma armadilha comum: se você tem uma célula vazia (por falta de dado) e outra com valor 0 (uma venda que realmente não aconteceu), o Excel trata as duas de forma completamente diferente no cálculo da média, o que pode distorcer bastante o resultado se você não prestar atenção.

---

## MÁXIMO e MÍNIMO: encontrando os extremos

As funções **MÁXIMO** e **MÍNIMO** identificam, respectivamente, o maior e o menor valor dentro de um intervalo de células.

`=MÁXIMO(B2:B15)` → retorna o maior valor do intervalo

`=MÍNIMO(B2:B15)` → retorna o menor valor do intervalo

Essas funções são especialmente úteis para identificar rapidamente o melhor e o pior resultado dentro de um conjunto grande de dados, sem precisar procurar manualmente linha por linha.

> 💡 **Dica:** Combine MÁXIMO ou MÍNIMO com a função **CORRESP** ou **PROCV** quando quiser não só o valor extremo, mas também **quem** ou **o quê** gerou aquele valor — por exemplo, descobrir não apenas qual foi a maior venda do mês, mas qual vendedor foi responsável por ela.

---

## Comparando as quatro funções lado a lado

| Função | O que faz | Exemplo |
|---|---|---|
| **SOMA** | Soma todos os valores do intervalo | `=SOMA(B2:B15)` |
| **MÉDIA** | Calcula a média aritmética | `=MÉDIA(B2:B15)` |
| **MÁXIMO** | Retorna o maior valor | `=MÁXIMO(B2:B15)` |
| **MÍNIMO** | Retorna o menor valor | `=MÍNIMO(B2:B15)` |

---

## Erros comuns ao usar funções

Mesmo funções simples costumam gerar dor de cabeça por alguns motivos recorrentes:

- **Intervalo errado** — selecionar uma linha a menos ou a mais, deixando de fora um dado importante;
- **Números como texto** — como vimos na aula sobre tipos de dados, valores digitados como texto são ignorados por essas funções, mesmo parecendo números normais;
- **Células mescladas** — mesclar células dentro de um intervalo pode confundir o cálculo e gerar resultados inesperados;
- **Parênteses fora do lugar** — esquecer de fechar o parênteses da função é um dos erros de digitação mais comuns.

> 🧠 **Curiosidade:** Quando o Excel percebe que uma fórmula está incompleta — como um parênteses que não foi fechado — ele geralmente tenta **corrigir automaticamente** e propõe a correção numa caixa de diálogo. Vale sempre conferir se a sugestão automática realmente corresponde ao que você queria calcular, porque nem sempre o "conserto automático" acerta a intenção real da fórmula.

---

## Indo além: funções dentro de funções

Uma vez dominadas essas quatro funções básicas, é possível combiná-las dentro de outras fórmulas. Por exemplo, para descobrir a diferença entre o maior e o menor valor de um intervalo (a chamada **amplitude**):

`=MÁXIMO(B2:B15)-MÍNIMO(B2:B15)`

Essa é a base de um princípio poderoso no Excel: funções podem ser combinadas livremente, criando cálculos cada vez mais sofisticados a partir de blocos simples.

---

*SOMA, MÉDIA, MÁXIMO e MÍNIMO parecem simples — e são mesmo simples de digitar. Mas são também as funções mais usadas em relatórios, painéis e planilhas do mundo inteiro, porque respondem às perguntas mais básicas que qualquer análise de dados precisa responder: quanto no total, qual a média, qual o melhor e qual o pior resultado. Na próxima aula, vamos organizar esses dados de um jeito ainda mais poderoso: em tabelas, com filtros que respondem exatamente ao que você quer enxergar.*
