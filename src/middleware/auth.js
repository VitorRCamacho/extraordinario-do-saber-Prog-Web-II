const { findById } = require('../models/userModel');

exports.requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/auth/login?msg=Faça+login+para+continuar');
  }
  next();
};

exports.attachUser = async (req, res, next) => {
  res.locals.currentUser = null;
  if (req.session.userId) {
    try {
      const user = await findById(req.session.userId);
      res.locals.currentUser = user;
      req.currentUser = user;
    } catch (e) {}
  }
  next();
};

exports.requireAdmin = (req, res, next) => {
  if (!req.currentUser || !req.currentUser.is_admin) {
    return res.status(403).render('partials/layout', { 
      title: 'Acesso negado', 
      content: '<div class="card"><h2>Acesso negado</h2><p>Você precisa ser administrador.</p></div>'
    });
  }
  next();
};