"use strict";

const http = require('http');
const nodeStatic = require('node-static');
const fs = require("fs");
const WebSocketServer = require('websocket').server;


// su dung de tao ra 1 mang luu tru cac ket noi
let connectionArray = [];
let nextID = Date.now();

// ghi log ra console
function log(text) {
    console.log("[" + new Date().toLocaleTimeString() + "] " + text);
}

// gui tin nhan den target
function sendToOneUser(target, msgString) {
    for (let i = 0; i < connectionArray.length; i++) {
        if (connectionArray[i].username === target) {
            connectionArray[i].sendUTF(msgString);
            break;
        }
    }
}

// Gui danh sach user den tat ca client
function sendUserListToAll() {
    let list = {
        type: "userlist",
        users: connectionArray.map(e => e.username)
    };
    connectionArray.forEach(e => {
        let listClone = JSON.parse(JSON.stringify(list));
        listClone.users = listClone.users.filter(u => u !== e.username);
        e.sendUTF(JSON.stringify(listClone));
    });
}

let fileServer = new (nodeStatic.Server)();

let server = http.createServer( (req, res) => fileServer.serve(req, res))
    .listen(80, () => log("Server is listening on port 80"));

// Tao ra 1 websocket server
let ws = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

if (!ws) {
    log("ERROR: Unable to create WbeSocket server!");
}

// Khi co 1 client ket noi den server
ws.on('request', request => {
    // Chap nhan ket noi
    let connection = request.accept("json", request.origin);

    // add connection vao mang
    log("Connection accepted from " + connection.remoteAddress + ".");
    connectionArray.push(connection);

    // Gan clientID cho connection
    connection.clientID = nextID;
    nextID++;

    // Gui lai clientID cho client
    let msg = {
        type: "id",
        id: connection.clientID
    };
    connection.sendUTF(JSON.stringify(msg));

    // Handler cho tin nhan tu client
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            log("Received Message: " + message.utf8Data);

            msg = JSON.parse(message.utf8Data);
            if (msg.target && msg.target.length !== 0) {
                sendToOneUser(msg.target, message.utf8Data);
            } else if (msg.type === "username") {
                connection.username = msg.name;
                sendUserListToAll();
            }
        }
    });

    // Handler cho viec client ngat ket noi
    connection.on('close', () => {
        // Xoa connection khoi mang
        connectionArray = connectionArray.filter(e => e.connected);

        // Gui lai danh sach user cho tat ca client
        sendUserListToAll();
        log("Connection closed from " + connection.username + ".");
    });
});