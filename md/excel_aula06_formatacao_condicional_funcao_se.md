# Formatação Condicional e a Função SE

> *Duas planilhas podem ter exatamente os mesmos números e contar histórias completamente diferentes. Numa, os dados estão parados, esperando serem lidos linha por linha. Na outra, as células mudam de cor sozinhas e as fórmulas já dizem "aprovado" ou "reprovado" antes de você perguntar. A diferença é fazer o Excel pensar por você.*

---

## Formatação Condicional: quando a cor vira informação

Formatação Condicional é o recurso que permite que o Excel **mude a aparência de uma célula automaticamente**, com base no valor que ela contém. Em vez de você olhar número por número para descobrir quais estão fora do esperado, a própria planilha destaca isso visualmente.

Para aplicar, selecione o intervalo desejado e acesse **Página Inicial → Formatação Condicional**.

> 🧠 **Curiosidade:** A Formatação Condicional existe desde o Excel 97, mas era bem limitada — permitia no máximo três condições por célula. Só a partir do Excel 2007 ela ganhou as escalas de cor, barras de dados e ícones que conhecemos hoje, além do limite de condições praticamente ilimitado.

---

## As três famílias de regras mais usadas

O Excel organiza a Formatação Condicional em alguns grupos principais:

- **Realçar Regras das Células** — destaca valores maiores que, menores que, entre, duplicados, ou que contenham um texto específico;
- **Regras de Primeiros/Últimos** — destaca os 10 primeiros valores, os 10% últimos, valores acima da média, entre outros;
- **Barras de Dados, Escalas de Cor e Conjuntos de Ícones** — transformam os próprios números em pequenos gráficos dentro da célula, permitindo comparar valores só de bater o olho.

> 💡 **Dica:** As Barras de Dados são especialmente úteis em planilhas de notas ou vendas, porque permitem enxergar o "tamanho" de cada valor em relação aos outros sem precisar de um gráfico separado ao lado da tabela.

---

## Criando uma regra personalizada com fórmula

Além das opções prontas, é possível criar uma regra baseada numa fórmula própria, em **Nova Regra → Usar uma fórmula para determinar quais células devem ser formatadas**. Isso abre a porta para condições muito mais específicas do que os modelos padrão oferecem — por exemplo, destacar uma linha inteira quando o valor de uma única coluna atende a um critério.

> 🧠 **Curiosidade:** Quando a regra é criada com fórmula, o Excel avalia a condição como um teste lógico que retorna VERDADEIRO ou FALSO — exatamente a mesma lógica usada pela função SE. Entender uma ajuda a entender a outra, porque as duas falam a mesma "língua" por trás dos panos.

---

## A função SE: fazendo o Excel tomar decisões

Se a Formatação Condicional muda a aparência, a **função SE** muda o resultado que aparece na célula, dependendo de uma condição. A estrutura básica é:

```
=SE(teste_lógico; valor_se_verdadeiro; valor_se_falso)
```

Um exemplo simples: para indicar se um aluno foi aprovado com base na média na célula B2, a fórmula seria:

```
=SE(B2>=6; "Aprovado"; "Reprovado")
```

O Excel avalia se o conteúdo de B2 é maior ou igual a 6. Se for verdadeiro, escreve "Aprovado"; se for falso, escreve "Reprovado".

> 💡 **Dica:** Os textos usados como resultado (como "Aprovado" e "Reprovado") sempre precisam ficar entre aspas. Números e outras fórmulas, por outro lado, entram sem aspas.

---

## Combinando várias condições: o SE aninhado e as funções E / OU

Quando uma única condição não é suficiente, existem duas estratégias comuns:

- **SE aninhado** — colocar um SE dentro do outro, para criar mais de dois resultados possíveis;
- **Funções E() e OU()** — usadas dentro do teste lógico do SE, para exigir que várias condições sejam verdadeiras ao mesmo tempo (E) ou que pelo menos uma delas seja (OU).

Um exemplo de SE aninhado, classificando uma média em três faixas:

```
=SE(B2>=8; "Ótimo"; SE(B2>=6; "Bom"; "Precisa melhorar"))
```

> 🧠 **Curiosidade:** É possível aninhar até 64 funções SE numa única fórmula no Excel moderno. Na prática, porém, a partir da terceira ou quarta condição a fórmula já fica difícil de ler — muitos profissionais preferem trocar por PROCX ou SES nesses casos, funções mais recentes feitas justamente para simplificar decisões com várias faixas.

---

## Formatação Condicional e função SE trabalhando juntas

As duas ferramentas se completam muito bem numa planilha real. Um uso comum é usar a função SE numa coluna auxiliar para classificar cada linha (por exemplo, "Aprovado" ou "Reprovado"), e depois aplicar uma Formatação Condicional baseada em texto para colorir automaticamente essa coluna — verde para "Aprovado", vermelho para "Reprovado".

> 💡 **Dica:** Para isso, use a regra **Realçar Regras das Células → Texto que Contém**, digite o resultado exato que a função SE pode gerar, e escolha a cor de destaque. Assim, sempre que a fórmula mudar o resultado, a cor muda junto — sem nenhum trabalho manual.

---

## Um exemplo prático de uso combinado

Imagine uma planilha de controle de notas com colunas de Aluno, Nota Final e Situação. Para automatizar completamente a análise, o caminho seria:

1. Na coluna **Situação**, usar `=SE(NotaFinal>=6; "Aprovado"; "Reprovado")` para gerar o resultado automaticamente;
2. Selecionar a coluna Situação e aplicar Formatação Condicional do tipo **Texto que Contém**, com verde para "Aprovado" e vermelho para "Reprovado";
3. Opcionalmente, aplicar uma **Escala de Cor** na coluna Nota Final, para visualizar de forma gradual quais alunos estão mais próximos ou mais distantes da média.

Em poucos passos, a planilha deixa de apenas armazenar notas e passa a interpretar e sinalizar os resultados sozinha.

---

*Formatação Condicional e função SE são, no fundo, duas formas diferentes de fazer a mesma pergunta ao Excel: "isso atende a uma condição ou não?" — uma responde com cor, a outra com texto ou número. Dominar as duas juntas é o que transforma uma planilha de simples registro em uma ferramenta que analisa dados por conta própria.*
