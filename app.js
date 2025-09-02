const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const methodOverride = require('method-override');

const { attachUser } = require('./src/middleware/auth');

const authRoutes = require('./src/routes/authRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const indexRoutes = require('./src/routes/indexRoutes');

// inicia DB e tabelas
require('./src/models/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-mvc',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 2 } // 2h
}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// injeta usuário logado (se existir)
app.use(attachUser);

// Rotas
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);

// 404
app.use((req, res) => {
  res.status(404).render('partials/layout', { 
    title: '404', 
    content: '<div class="card"><h2>404</h2><p>Página não encontrada.</p></div>' 
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});