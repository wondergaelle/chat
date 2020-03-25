var socket = io.connect('http://localhost:5000');
var messageForm = document.getElementById('message');
var messageTextarea = messageForm.querySelector('textarea');
var listMessages = document.getElementById('list-messages');
var writing = document.getElementById('writing');
var username = document.getElementById('username').innerText;

function addMessage(message) {
    var article = document.createElement('article');

    var em = document.createElement('em');
    em.innerText = "Posté il y a quelques secondes par " + message.user.username;
    article.appendChild(em);

    var p = document.createElement('p');
    p.innerText = message.content;
    article.appendChild(p);

    listMessages.prepend(article);
}

function checkTextarea() {
    if (messageTextarea.value.length > 0) {
        socket.emit('writing', username);
    } else {
        socket.emit('not-writing', username);
    }
}

messageForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var url = messageForm.action;
    var method = messageForm.method;
    var content = messageTextarea.value;

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: content })
    })
        .then(response => response.json())
        .then(message => {
            addMessage(message);
            messageForm.reset();
            checkTextarea();
            socket.emit('new-message', message);
        })
    ;
});

messageTextarea.addEventListener('input', checkTextarea);
messageTextarea.addEventListener('change', checkTextarea);

socket.on('show-message', function(message) {
    addMessage(message);
});

socket.on('writing', function(username) {
    writing.innerText = username + " est en train d'écrire...";
    writing.style.display = 'block';
});

socket.on('not-writing', function(username) {
    writing.style.display = 'none';
});