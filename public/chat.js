// Make connection
var socket = io.connect('http://localhost:4000');


// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// emit Event
btn.addEventListener('click', () => {
    console.log('sending data to backend')
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
});

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});


// listen for events
socket.on('chat', (data) => {
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + '</strong> ' + data.message + '</p>';
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><strong>' + data + '</strong>' + " is typing" + '</p>';
}); 