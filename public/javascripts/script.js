var socket = io.connect('http://localhost:5000');
var messageForm = document.getElementById('message');
var listMessages = document.getElementById('list-messages');

messageForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var url = messageForm.action;
    var method = messageForm.method;
    var content = messageForm.querySelector('textarea').value;

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: content })
    })
        .then(response => response.json())
        .then(message => {
            var article = document.createElement('article');

            var em = document.createElement('em');
            em.innerText = "Posté il y a quelques secondes par " + message.user.username;
            article.appendChild(em);

            var p = document.createElement('p');
            p.innerText = message.content;
            article.appendChild(p);

            listMessages.prepend(article);

            messageForm.reset();
        })
    ;
});