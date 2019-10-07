const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();

const server = http.Server(app);
const io = socketio(server);

mongoose.connect("mongodb://localhost:27017/aircnc", { useNewUrlParser: true, useUnifiedTopology: true });

//variável para guardar informações temporárias, em produção seria mais interessante utilizar Redis
const connectedUsers = {}

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id; //chave-valor
});

//dá acesso ao protocolo de comunicação com o frontend para todas as rotas
app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json()); //agora express já vem com body-parser
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads'))); //usado para retornar arquivos estáticos
app.use(routes);

server.listen(3333);