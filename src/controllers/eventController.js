const eventModel = require('../models/eventModel');
const subModel = require('../models/subscriptionModel');

exports.list = async (req, res) => {
  const events = await eventModel.all();
  res.render('events/index', { title: 'Eventos', events });
};

exports.newForm = (req, res) => {
  res.render('events/new', { title: 'Novo Evento' });
};

exports.create = async (req, res) => {
  const { title, description, location, date } = req.body;
  if (!title || !date) {
    return res.redirect('/events/new?msg=Preencha+os+campos+obrigatórios');
  }
  await eventModel.create({ title, description, location, date });
  res.redirect('/events?msg=Evento+criado');
};

exports.show = async (req, res) => {
  const id = req.params.id;
  const event = await eventModel.findById(id);
  if (!event) return res.status(404).render('partials/layout', { title: 'Não encontrado', content: '<div class="card"><h2>Evento não encontrado</h2></div>' });
  const isSubscribed = req.currentUser ? await subModel.isSubscribed({ user_id: req.currentUser.id, event_id: id }) : false;
  let subscribers = [];
  if (req.currentUser?.is_admin) {
    subscribers = await subModel.usersByEvent(id);
  }
  res.render('events/show', { title: event.title, event, isSubscribed, subscribers });
};

exports.editForm = async (req, res) => {
  const event = await eventModel.findById(req.params.id);
  if (!event) return res.redirect('/events?msg=Evento+não+existe');
  res.render('events/edit', { title: 'Editar Evento', event });
};

exports.update = async (req, res) => {
  const { title, description, location, date } = req.body;
  const id = req.params.id;
  const ok = await eventModel.update({ id, title, description, location, date });
  if (!ok) return res.redirect(`/events/${id}/edit?msg=Erro+ao+atualizar`);
  res.redirect(`/events/${id}?msg=Evento+atualizado`);
};

exports.destroy = async (req, res) => {
  const id = req.params.id;
  await eventModel.remove(id);
  res.redirect('/events?msg=Evento+excluído');
};