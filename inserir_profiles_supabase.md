## SQL para inserir perfis no Supabase

> Observacao: no seu projeto o frontend usa a tabela `profiles` (plural).  
> Se no seu banco estiver `profile` (singular), troque o nome da tabela no comando abaixo.

```sql
INSERT INTO public.profiles (nome, email, password, role)
VALUES
  ('Andreia Barbosa de Matos Chagas', 'andreia.chagas@aluno.local', 'a1c2', 'aluno'),
  ('Ana Beatriz das Neves Lima', 'ana.lima@aluno.local', 'an3l', 'aluno'),
  ('Aysha Frazao de Oliveira', 'aysha.oliveira@aluno.local', 'ay4o', 'aluno'),
  ('Francisca de Oliveira Morais', 'francisca.morais@aluno.local', 'f5m6', 'aluno'),
  ('Jecivane Martins Silva', 'jecivane.silva@aluno.local', 'j7s8', 'aluno'),
  ('Joao Batista Almeida Apoliano', 'joao.apoliano@aluno.local', 'j9a1', 'aluno'),
  ('Juan Nicolas Vasconcelos Araujo', 'juan.araujo@aluno.local', 'j2a3', 'aluno'),
  ('Pedro Kayo da Silva Silva', 'pedro.silva@aluno.local', 'p4s5', 'aluno'),
  ('Welton Carlos Reis Mendonca', 'welton.mendonca@aluno.local', 'w6m7', 'aluno');
```

