# Sistema de Gerenciamento de Eventos Acadêmicos
**Aluno:** Vítor Camacho (ADS – IFC Fraiburgo)  
**Avaliação:** Extraordinário do Saber – Programação Web 2  
**Projeto:** Estrela de Jardim do Saber



---

## Objetivo do sistema
Disponibilizar uma aplicação web para **gerenciar eventos acadêmicos**:
- Usuários **autenticados** podem **listar** eventos, ver **detalhes** e **inscrever/cancelar** a inscrição.
- Usuários **administradores** podem **criar, editar e excluir** eventos e visualizar a **lista de inscritos** por evento.

## Escopo implementado
- **Arquitetura cliente-servidor**: Express no servidor; HTML/CSS/JS no cliente.
- **MVC completo**: *models* (acesso ao BD), *controllers* (regras), *routes* (rotas), *views* (EJS).
- **Autenticação** com **sessões**; bloqueio de áreas internas sem login.
- **Cookie** `rememberEmail` para preencher o e-mail ao retornar ao login.
- **Eventos**:
  - Listar e detalhar (usuário autenticado).
  - **Criar, editar, excluir** (somente **admin**).
- **Inscrições**:
  - Inscrever e cancelar inscrição.
  - **Prevenção de duplicidade** por chave composta (`user_id`, `event_id`).
- **Feedback em JS**: exibição de mensagem simples (toast) quando há `?msg=` na URL.

> Interface direta, focada no entregável solicitado, sem elementos além do necessário.

## Como executar
**Pré-requisito**: Node.js 18+

No terminal, dentro da pasta do projeto:
```bash
npm install
npm start
```
Acesse: `http://localhost:3000`

Opções úteis (Windows):
```bash
# Porta alternativa
set PORT=3001 && npm start

# Definir caminho do banco explicitamente (evita erro SQLITE_CANTOPEN em ambientes restritos)
set DB_PATH=%CD%\db\database.sqlite && npm start
```

O projeto **cria automaticamente a pasta do banco**; se necessário, a variável `DB_PATH` permite apontar o arquivo de banco manualmente.

## Regra para usuário administrador (para correção)
Para facilitar a validação, **qualquer e-mail que comece com `admin@` se torna administrador** no cadastro.
- Exemplo funcional: `admin@ifc.edu.br`

Como **admin**, além de listar/detalhar, o menu mostra **“Novo Evento”** e, no detalhe, são exibidos **Editar**, **Excluir** e a **lista de inscritos**.

## Roteiro de validação sugerido
1. **Cadastro de admin** (`admin@ifc.edu.br`) e **login**.
   - Criar um evento em **Eventos → Novo Evento** (título, data/hora, local, descrição).
   - Abrir o detalhe, **editar**, voltar à lista e confirmar a alteração.
   - (Opcional) Criar e **excluir** um evento para testar a remoção.
2. **Cadastro de usuário comum** (ex.: `aluno@teste.com`) e **login**.
   - Em **Eventos**, abrir um evento e **inscrever-se**.
   - Tentar inscrever-se novamente (o sistema bloqueia duplicidade).
   - Acessar **Meus Eventos (/my)** e confirmar a presença do evento.
   - **Cancelar inscrição** no detalhe e validar a remoção em **/my**.
3. **Login como admin** novamente.
   - Abrir o evento e validar a **lista de inscritos** refletindo as ações do aluno.

## Estrutura do projeto (resumo)
```
src/
  controllers/    authController.js, eventController.js, subscriptionController.js
  middleware/     auth.js
  models/         db.js, userModel.js, eventModel.js, subscriptionModel.js
  routes/         authRoutes.js, eventRoutes.js, indexRoutes.js
  views/          home.ejs, login.ejs, register.ejs, my.ejs,
                  events/ (index.ejs, new.ejs, show.ejs, edit.ejs),
                  partials/ (header.ejs, footer.ejs, layout.ejs)
public/           styles.css, script.js
db/               (arquivo SQLite é criado automaticamente)
app.js, package.json, README.md
```

## Considerações finais
- O sistema entrega autenticação, sessões, cookie, MVC, CRUD para admin e inscrições com trava de duplicidade.
- Rodapé personalizado: **“Vítor Camacho — Estrela de Jardim do Saber”**.
- Caso necessário, posso ajustar critérios (por exemplo, regra de admin por domínio) mantendo a mesma arquitetura.

---

**Vítor Camacho**  
*Extraordinário do Saber — Programação Web 2*
