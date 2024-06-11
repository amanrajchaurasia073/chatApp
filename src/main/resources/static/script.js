var stompClient = null;

function sendMessage() {
    let jsonOb = {
        name: localStorage.getItem("name"),
        content: $("#message-value").val()
    };
    stompClient.send("/app/message", {}, JSON.stringify(jsonOb));

    // Clear the input field after sending the message
    $("#message-value").val('');
}

function connect() {
    let socket = new SockJS("/server1");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function(frame) {
        console.log("Connected : " + frame);

        $("#name-form").addClass('d-none');
        $("#chat-room").removeClass('d-none');

        // Add class to body to apply background image
        $("body").addClass("chat-room-background");

        stompClient.subscribe("/topic/return-to", function(response) {
            showMessage(JSON.parse(response.body));
        });
    });
}

function showMessage(message) {
    $("#message-container-table").prepend(`<tr><td><b>${message.name} :</b> ${message.content}</td></tr>`);
}

$(document).ready(function() {
    $("#login").click(function() {
        let name = $("#name-value").val();
        if (name.trim() === "") {
            alert("Please enter your name.");
            return;
        }
        localStorage.setItem("name", name);
        $("#name-title").html(`Welcome, <b>${name}</b>`);
        connect();
    });

    $("#send-btn").click(function() {
        sendMessage();
    });

    $("#logout").click(function() {
        localStorage.removeItem("name");
        if (stompClient !== null) {
            stompClient.disconnect();
            $("#name-form").removeClass('d-none');
            $("#chat-room").addClass('d-none');
            $("body").removeClass("chat-room-background"); // Remove background image class
            console.log("Disconnected");
        }
    });
});
