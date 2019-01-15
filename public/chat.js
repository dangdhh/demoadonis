let ws = null;
let user = null;
$(function() {
  if (window.username) {
    startChat();
  }
});

function startChat() {
  ws = adonis.Ws().connect();

  ws.on("open", () => {
    console.log("start")
    $(".connection-status").addClass("connected");
    subscribeToChannel()

  });

  ws.on("error", () => {
    $(".connection-status").removeClass("connected");
  });
}

function subscribeToChannel() {
  const chat = ws.subscribe('chat')

  chat.on('error', () => {
    $('.connection-status').removeClass('connected')
  })

  chat.on('message', (message) => {
    sameLastMessage = false;
    console.log("response")
    if(window.username == message.username){
      const html = `<div class="message-group me" username="` + message.username + `">
                    <div class="message-body">
                        <div id="messages">
                            <div class="including">
                                <div class="message">` + message.body + `</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $('#listMessages').append(html);
    }else{
      const html = `<div class="message-group" username="` + message.username + `">
                <img src="images/no-avatar.png" class="message-avatar" />
                <div class="message-body">
                    <h4 class="message-username">` + message.username + `</h4>
                    <div id="messages">
                        <div class="including">
                            <div class="message">` + message.body + `</div>
                        </div>
                    </div>
                </div>
            </div>`;
            $('#listMessages').append(html);
    }
    if (sameLastMessage) {
      $( "#listMessages > div.message-group:last" ).find('.message:last').removeClass('bottom');
      $( "#listMessages > div.message-group:last" ).find('.message:last').addClass('top');
    }

    $('#listMessages').scrollTop($('#listMessages').prop('scrollHeight'));
  })

  chat.on('register',(listUser)=>{
    console.log("register")
    console.log(register)
  })

}

$("#textMessage").keyup(function(e) {
  // console.log("aaaaa", e);
  if (e.which === 13) {
    e.preventDefault();

    const message = $(this).val();
    if(message == ""){
      return
    }else{
      ws.getSubscription("chat").emit("message", {
        username: window.username,
        body: message
      });
      $(this).val("");
    }

    return;
  }
});


$("#yourName").keyup(function(e) {
  // console.log("aaaaa", e);
  if (e.which === 13) {
    e.preventDefault();

    user = $(this).val();
    $(this).val("");

    ws.getSubscription("chat").emit("register", {
      username: user,
    });
    return;
  }
});

