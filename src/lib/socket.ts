import { io, Socket } from 'socket.io-client';

export class SocketConnection {
  private static instance;
  socket: Socket;

  constructor() {
    const socketParams = { auth: { name: 'Joana' } };
    console.log(socketParams);
    this.socket = io('http://192.168.0.14:3030', socketParams);
  }
  static getInstance() {
    if (!SocketConnection.instance) {
      SocketConnection.instance = new SocketConnection();
    }
    return SocketConnection.instance;
  }
  private push(command, message) {
    return this.socket.emit(command, message);
  }
  private addEventListener(eventName, callback) {
    const ref = this.socket.on(eventName, callback);
    return () => this.socket.off(eventName, ref);
  }
  getSocketId() {
    return this.socket.id;
  }
  onMessageReceived(callback) {
    return this.addEventListener(`message`, callback);
  }
  pushMessage(room, message, payload) {
    return this.push(`message`, { message, room, payload });
  }
  joinRoom(room) {
    return this.push('join-room', room);
  }
  getMessages(room) {
    return this.push('getMessages', room);
  }
}
