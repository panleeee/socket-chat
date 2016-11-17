$(document).ready(function() {
    var socket = io();

    $("#submit").on("click", function() {
        var now = new Date();
        var nowTime = now.getHours() + " : " + now.getMinutes();
        $("#content").append(`
            <div class = "mine">
                <span>name</span>
                <p class = myContent>
                    ${$("#msg").val()}<br>
                </p>
                <span class ="otherTime">${nowTime}</span>
            </div>
            `);
        socket.emit('sendMsg', $("#msg").val());
        $("#msg").val("");
    });

    socket.on('receiveMsg',function (data) {
        var now = new Date();
        var nowTime = now.getHours() + " : " + now.getMinutes();
        $("#content").append(`
            <div class = "others">
                <span>${data.name}</span>
                <p class = "otherContent">
                    ${data.desc}
                </p>
                <span class = "myTime">${nowTime}</span>
            </div>
            `);
    });
});
