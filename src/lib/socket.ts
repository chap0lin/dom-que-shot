import { io, Socket } from 'socket.io-client';

class SocketConnection {
  private static instance;
  socket: Socket;
  serverAddress = 'http://localhost:3000';

  connect() {
    if (!this.socket) {
      this.socket = io(this.serverAddress);
      this.socket.on('connection', () => {
        console.log(
          `conectado ao backend do DomQueShot (${this.serverAddress})!`
        );
      });
    }
  }

  joinRoom(userData) {
    this.socket.emit('join-room', userData.roomCode, (reply) => {
      console.log(`resposta do servidor: ${reply}`);
      if (reply === `ingressou na sala ${userData.roomCode}.`) {
        this.addPlayer(userData);
      }
    });
  }

  joinRoomWithCode(roomCode: string) {
    this.socket.emit('join-room', roomCode, (reply) => {
      console.log(`resposta do servidor: ${reply}`);
    });
  }

  addPlayer(userData) {
    this.socket.emit(
      'add-player',
      JSON.stringify({ ...userData, beers: Math.round(5 * Math.random()) })
    );
  }

  setLobbyUpdateListener(useState: any) {
    const lobbyUpdate = this.socket.on('lobby-update', (reply) => {
      console.log('A lista de jogadores foi atualizada.');
      useState(JSON.parse(reply));
    });
  }

  send(tag: string, message: any) {
    this.socket.emit(tag, message);
  }

  //abaixo, as funções originalmente desenvolvidas pelo Carlos para esta classe

  static getInstance() {
    if (!SocketConnection.instance) {
      SocketConnection.instance = new SocketConnection();
    }
    return SocketConnection.instance;
  }

  private push(command, message) {
    return this.socket.emit(command, message);
  }

  addEventListener(eventName, callback) {
    const ref = this.socket.on(eventName, callback);
    return () => this.socket.off(eventName, callback);
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

  getMessages(room) {
    return this.push('get-messages', room);
  }
}

export default SocketConnection;
