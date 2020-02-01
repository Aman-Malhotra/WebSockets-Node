// Make connection
var socket = io.connect('http://localhost:4000');

var socket;

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var group_id = document.getElementById('group_id');
var group_title = document.getElementById('group_title');
var name_group = document.getElementById('name_group');
var send_btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// emit Event
send_btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value,
        group_id: group_id.value
    });
});

name_group.addEventListener('click', () => {
    group_title.innerHTML = group_id.value
    group_id.disabled = true;
});

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});


// listen for events
socket.on('chat', (data) => {
    if (data.group_id == group_id.value) {
        feedback.innerHTML = "";
        output.innerHTML += '<p><strong>' + data.handle + '</strong> ' + data.message + '</p>';
    }

});

socket.on('typing', (data) => {
    if (data.group_id == group_id.value) {
        feedback.innerHTML = '<p><strong>' + data + '</strong>' + " is typing" + '</p>';
    }

}); 