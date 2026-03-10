# Setup local - Merry Rains

## 1. Instalar dependências

```bash
pnpm install
```

## 2. Banco de dados (PostgreSQL)

O banco precisa estar rodando antes de `pnpm db:push`. Escolha uma opção:

### Opção A: Docker

```bash
docker compose up -d
```

Conexão DBeaver:
- Host: localhost | Porta: 5432 | Database: merryrains
- Usuário: merryrains | Senha: merryrains_local

### Opção B: Neon (Postgres na nuvem, gratuito)

1. Acesse [neon.tech](https://neon.tech) e crie uma conta
2. Crie um projeto e copie a connection string
3. Cole no `.env` como `DATABASE_URL`

Você consegue conectar o DBeaver usando os dados da connection string.

### Opção C: PostgreSQL instalado localmente

Crie um banco `merryrains` e atualize a `DATABASE_URL` no `.env`.

## 3. Variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` e gere um `NEXTAUTH_SECRET`:
```bash
# Windows PowerShell:
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

## 4. Prisma

```bash
pnpm db:generate
pnpm db:push
```

## 5. Rodar o projeto

```bash
pnpm dev
```

## Rotas

- `/` - Landing page
- `/login` - Entrar
- `/registro` - Cadastrar
- `/livro` - Leitor (requer login)

## Stripe (pagamento)

1. Crie conta em [dashboard.stripe.com](https://dashboard.stripe.com)
2. Pegue a chave `sk_test_...` em Developers → API keys
3. Adicione no `.env`: `STRIPE_SECRET_KEY=sk_test_...`
4. Para webhook (em produção): Developers → Webhooks → Add endpoint
   - URL: `https://seu-dominio.com/api/webhooks/stripe`
   - Evento: `checkout.session.completed`
   - Copie o `STRIPE_WEBHOOK_SECRET`

Preço do livro está em R$ 29,90 (ajuste em `app/api/checkout/route.ts` se quiser).

## Kiwify (pagamento)

O checkout redireciona para Kiwify. Para liberar o acesso ao livro automaticamente após o pagamento:

1. Na Kiwify: **Apps** → **Webhooks** → **Criar webhook**
2. **Produto:** selecione MERRY RAINS (ou "Todos")
3. **Eventos:** marque `compra_aprovada`
4. **URL do webhook:** `https://seu-dominio.com/api/webhooks/kiwify`
5. **Token** (opcional): gere um token e adicione no Vercel como `KIWIFY_WEBHOOK_TOKEN`
6. Clique em **Criar**

**Importante:** O email do comprador na Kiwify deve ser o mesmo da conta no site. O usuário precisa se cadastrar no site antes de comprar.

**URL de sucesso:** Na configuração do produto na Kiwify, defina a página de redirecionamento após pagamento como `https://seu-dominio.com/biblioteca`.

## Amanhã: deploy no Railway

1. Crie o projeto no Railway
2. Adicione PostgreSQL (ou use Neon)
3. Configure: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
4. Faça deploy
