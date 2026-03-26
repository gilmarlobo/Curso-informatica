## SQL para inserir perfis no Supabase

> Observacao: no seu projeto o frontend usa a tabela `profiles` (plural).  
> Se no seu banco estiver `profile` (singular), troque o nome da tabela no comando abaixo.

```sql
INSERT INTO public.profiles (nome, email, password, role)
VALUES
  ('Júlia Riglene Dias Rabelo', 'rabelo.julia@aluno.local', 'kj3w', 'aluno'),
  
```

## SQL para criar tabela de progresso de aulas

```sql
CREATE TABLE public.progresso_aulas (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    modulo VARCHAR(255) NOT NULL,
    aula_numero INTEGER NOT NULL,
    concluida BOOLEAN DEFAULT TRUE,
    data_conclusao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, modulo, aula_numero)
);
```

