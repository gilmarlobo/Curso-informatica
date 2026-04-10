# Migração: Adicionar Coluna de Pontos na Tabela Profiles

## Objetivo
Adicionar um sistema de pontos para cada aluno, permitindo rastreamento de pontuação com base em critérios que serão definidos posteriormente.

## SQL de Migração

Execute o comando abaixo no Supabase (SQL Editor):

```sql
-- Adicionar coluna 'pontos' na tabela profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS pontos INTEGER DEFAULT 0;

-- Opcional: Criar índice para melhorar performance nas consultas de ranking
CREATE INDEX IF NOT EXISTS idx_profiles_pontos ON public.profiles(pontos DESC);
```

## Detalhes da Coluna

| Propriedade | Valor |
|-------------|-------|
| **Nome** | pontos |
| **Tipo** | INTEGER |
| **Padrão** | 0 |
| **Nulo** | SIM |
| **Descrição** | Armazena a pontuação acumulada do aluno |

## Passo a Passo no Supabase

1. Acesse o console do Supabase: https://supabase.com/
2. Selecione seu projeto
3. Navegue até **SQL Editor**
4. Cole o SQL acima
5. Clique em **Run** ou **Ctrl + Enter**
6. Confirme que a coluna foi adicionada

## Verificação

Para verificar se a coluna foi criada corretamente:

```sql
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'profiles' AND column_name = 'pontos';
```

## Notas

- A coluna foi criada com valor padrão de `0` para novos registros
- Registros existentes receberão valor `0` automaticamente
- O índice foi criado para otimizar consultas de ranking (ORDER BY pontos DESC)
- Esta coluna será utilizada para contabilizar pontos conforme regras definidas em prompts posteriores

## Scripts de Teste (Opcional)

Para atualizar manualmente o valor de pontos de um aluno:

```sql
-- Adicionar 10 pontos a um aluno específico
UPDATE public.profiles 
SET pontos = pontos + 10 
WHERE id = 'uuid-do-usuario';

-- Visualizar ranking de pontos
SELECT id, nome, email, pontos 
FROM public.profiles 
WHERE role = 'aluno' 
ORDER BY pontos DESC 
LIMIT 10;
```
