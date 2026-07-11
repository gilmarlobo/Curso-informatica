# O Que é uma Planilha e Tipos de Dados

> *Antes de aprender qualquer fórmula, existe uma pergunta mais básica — e que quase ninguém para para responder: afinal, o que é uma planilha? Entender isso muda completamente a forma como você enxerga cada célula na tela.*

---

## Planilha, pasta de trabalho e célula: destrinchando os termos

É comum usar a palavra "planilha" para se referir a tudo dentro do Excel, mas existem três conceitos diferentes escondidos nesse termo:

- **Pasta de trabalho** (*workbook*) — é o arquivo `.xlsx` como um todo, o que você salva no computador;
- **Planilha** (*worksheet*) — é cada uma das "abas" dentro do arquivo, geralmente vistas na parte inferior da tela (Plan1, Plan2...);
- **Célula** — é o menor espaço dentro da planilha, formado pelo cruzamento de uma **linha** com uma **coluna**.

Cada célula tem um endereço único, formado pela letra da coluna e o número da linha — como **A1**, **B7** ou **D23**. Esse endereço é o que permite que uma célula "converse" com outra através de fórmulas, como veremos nas próximas aulas.

> 🧠 **Curiosidade:** Uma planilha do Excel tem, atualmente, **1.048.576 linhas** e **16.384 colunas**. Se você tentasse preencher todas essas células manualmente, digitando um valor por segundo, levaria mais de **500 anos** sem parar. Na prática, ninguém usa nem 1% dessa capacidade — mas é bom saber que o espaço não costuma ser o limite.

> 💡 **Dica:** Para ir direto a uma célula específica sem precisar rolar a tela, digite o endereço dela na **Caixa de Nome**, no canto superior esquerdo, e pressione Enter. Funciona como um "teleporte" dentro da planilha.

---

## Por que o tipo de dado importa

Um erro comum de quem está começando é tratar tudo como se fosse a mesma coisa: só "informação digitada na célula". Mas o Excel enxerga tipos de dados diferentes, e essa distinção é o que faz fórmulas funcionarem — ou quebrarem.

Se o Excel entende um número como texto, por exemplo, ele simplesmente não vai conseguir somá-lo. Por isso, reconhecer os tipos de dados é uma das primeiras habilidades que separam quem "mexe no Excel" de quem realmente **entende** o Excel.

---

## Os principais tipos de dados

| Tipo | Exemplo | Alinhamento padrão |
|---|---|---|
| **Texto** | Maria, Zé Doca, Produto A | Esquerda |
| **Número** | 150, 3,14, -20 | Direita |
| **Data** | 11/07/2026 | Direita |
| **Hora** | 14:30 | Direita |
| **Moeda** | R$ 1.250,00 | Direita |
| **Percentual** | 25% | Direita |
| **Lógico (booleano)** | VERDADEIRO / FALSO | Centro |

> 🧠 **Curiosidade:** Existe um truque simples para identificar rapidamente se o Excel reconheceu um valor como número: observe o **alinhamento automático**. Números e datas se alinham à direita da célula, enquanto textos se alinham à esquerda — sem você precisar tocar em nenhum botão de formatação. Se um número aparece alinhado à esquerda, é sinal de alerta: o Excel provavelmente está tratando aquele valor como texto.

---

## O problema silencioso: números disfarçados de texto

Um dos erros mais comuns em planilhas — e um dos mais difíceis de perceber à primeira vista — é quando um número é digitado ou importado de forma que o Excel o interpreta como texto. Isso costuma acontecer quando:

- O número tem espaços extras antes ou depois;
- O número foi digitado com um caractere estranho (como um apóstrofo antes dele);
- Os dados vieram de um sistema externo ou de um arquivo `.csv` mal formatado.

Nesses casos, o valor **parece** um número, mas o Excel se recusa a somá-lo, calcular médias ou aplicar qualquer fórmula matemática sobre ele.

> 💡 **Dica:** Se uma fórmula de soma está retornando **0** mesmo com números visíveis na coluna, o primeiro suspeito é sempre esse: números guardados como texto. Um pequeno triângulo verde no canto superior esquerdo da célula costuma indicar exatamente esse tipo de inconsistência.

---

## Erros também são um tipo de dado

O Excel possui uma categoria própria para quando algo dá errado dentro de uma fórmula. Os mais comuns são:

- **#DIV/0!** — tentativa de dividir um número por zero;
- **#VALOR!** — tipo de dado incompatível com a operação (ex: somar texto com número);
- **#REF!** — a fórmula está referenciando uma célula que foi excluída;
- **#N/D** — um valor não foi encontrado (comum em fórmulas de busca, como o PROCV).

> 🧠 **Curiosidade:** Diferente do que parece à primeira vista, esses códigos de erro não são "falhas" do programa — são **mensagens de diagnóstico**. Cada um aponta exatamente qual foi o problema na fórmula, funcionando quase como um mecânico apontando qual peça do motor quebrou. Aprender a interpretá-los economiza um tempo enorme na hora de corrigir planilhas.

---

*Entender a diferença entre linha, coluna, célula e tipo de dado pode parecer básico demais para uma aula — mas é exatamente essa base que vai sustentar tudo que vier depois. Fórmula errada quase sempre tem origem em tipo de dado mal interpretado. Dominar isso desde o início evita boa parte da dor de cabeça nas próximas aulas.*
