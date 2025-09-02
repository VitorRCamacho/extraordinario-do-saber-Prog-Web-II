const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

exports.getRegister = (req, res) => {
  res.render('register', { title: 'Cadastro' });
};

exports.postRegister = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.redirect('/auth/register?msg=Preencha+todos+os+campos');
  }
  try {
    const existing = await userModel.findByEmail(email);
    if (existing) {
      return res.redirect('/auth/register?msg=E-mail+já+cadastrado');
    }
    const password_hash = await bcrypt.hash(password, 10);
    // regra simples provisória: emails iniciando com "admin@" viram admin
    const is_admin = email.startsWith('admin@') ? 1 : 0;
    const user = await userModel.create({ name, email, password_hash, is_admin });
    req.session.userId = user.id;
    res.redirect('/?msg=Cadastro+realizado+com+sucesso');
  } catch (e) {
    console.error(e);
    res.redirect('/auth/register?msg=Erro+ao+cadastrar');
  }
};

exports.getLogin = (req, res) => {
  const remembered = req.cookies.rememberEmail || '';
  res.render('login', { title: 'Login', remembered });
};

exports.postLogin = async (req, res) => {
  const { email, password, remember } = req.body;
  try {
    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.redirect('/auth/login?msg=Credenciais+inválidas');
    }
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.redirect('/auth/login?msg=Credenciais+inválidas');
    }
    req.session.userId = user.id;
    if (remember) {
      res.cookie('rememberEmail', email, { maxAge: 1000 * 60 * 60 * 24 * 30 }); // 30 dias
    }
    res.redirect('/?msg=Login+efetuado');
  } catch (e) {
    console.error(e);
    res.redirect('/auth/login?msg=Erro+no+login');
  }
};

exports.postLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login?msg=Você+saiu+da+sessão');
  });
};