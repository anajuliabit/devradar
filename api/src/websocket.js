const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistances = require('./utils/calculateDistances');

let io;
const connections = [];

exports.setupWebSocket = server => {
  io = socketio(server);
  io.on('connection', socket => {
    console.log(socket.id);
    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: parseStringAsArray(techs)
    });
  });
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return (
      calculateDistances(coordinates, connection.coordinates) < 10 &&
      connection.techs.some(tech => techs.includes(tech))
    );
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};
