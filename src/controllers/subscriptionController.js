const subModel = require('../models/subscriptionModel');
const eventModel = require('../models/eventModel');

exports.subscribe = async (req, res) => {
  const event_id = req.params.id;
  try {
    await subModel.subscribe({ user_id: req.currentUser.id, event_id });
    res.redirect(`/events/${event_id}?msg=Inscrição+realizada`);
  } catch (e) {
    // erro provável: duplicidade (chave primária composta)
    res.redirect(`/events/${event_id}?msg=Você+já+está+inscrito+nesse+evento`);
  }
};

exports.unsubscribe = async (req, res) => {
  const event_id = req.params.id;
  await subModel.unsubscribe({ user_id: req.currentUser.id, event_id });
  res.redirect(`/events/${event_id}?msg=Inscrição+cancelada`);
};

exports.myArea = async (req, res) => {
  const events = await subModel.byUser(req.currentUser.id);
  res.render('my', { title: 'Meus Eventos', events });
};