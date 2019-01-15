"use strict";

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

const Ws = use("Ws");
// const members = [];
Ws.channel("chat", "CommentController");
// Ws.channel("chat",  ({ socket }) => {
//   // console.log(socket);
//   socket.on('register',(data)=>{
//     console.log("co nguoi dang ki roi do nha")
//     console.log(data)
//     members.push(data);
//     console.log(members);
//     socket.broadcastToAll("register", data);
//   })
//   socket.on('message',(data)=>{
//     console.log('message lang nghe')
//     console.log(data)
//     socket.broadcastToAll("message", data);
//   })


  // console.log("user joined with %s socket id", socket.id);
// });
