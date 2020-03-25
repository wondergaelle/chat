var express = require('express');
var router = express.Router();
var Message = require('../models/Message');

router.get('/', (req, res) => {
    Message.find().sort({ createdAt: -1 }).populate('user').exec((err, messages) => {
        res.render('chats/show', { title: 'Mon Chat', messages: messages });
    });
});

router.post('/message', (req, res) => {
    const message = new Message({ content: req.body.content, user: req.user });
    message.save((err, newMessage) => {
        res.redirect('/chats');
    });
});

module.exports = router;