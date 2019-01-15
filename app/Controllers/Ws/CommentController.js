"use strict";

class CommentController {
  constructor({ socket, request  }) {
    this.socket = socket;
    this.request = request;
    console.log("ket noi thanh cong", socket.id)
  }

  onMessage(message) {
    console.log("day la controller");
    // console.log(message);
    // console.log(this.socket);
    // return this.socket;
    this.socket.broadcastToAll("message", message);
    console.log("Xong roi");
  }

  onRegister(register){
    const listUser = [];
    listUser.push(register);
    this.socket.broadcastToAll("register", listUser);
    console.log("co tk dang ki",register)
    console.log('danh sach onl hien tai',listUser)
  }

}

module.exports = CommentController;
