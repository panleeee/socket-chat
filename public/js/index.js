$(document).ready(function() {
    var socket = io();

    $("#submit").on("click", function() {
        console.log('clicked');
        $("#content").append(`
            <p class = "mine">${$("#msg").val()}</p>
            `);
        socket.emit('sendMsg', $("#msg").val());
        $("#msg").val("");
    });

    socket.on('receiveMsg',function (data) {
        console.log(data);
        $("#content").append(`
            <p class = "others">
                <span>${data}</span>
            </p>
            `);
    });
});
