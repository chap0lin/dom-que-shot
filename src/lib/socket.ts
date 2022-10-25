import { io, Socket } from 'socket.io-client';

class SocketConnection {
  private static instance;
  socket: Socket;
  serverAddress = 'http://localhost:3000';

  constructor() {
    if (!SocketConnection.instance) {
      SocketConnection.instance = this;
      this.socket = io(this.serverAddress);

      this.socket.on('connection', () => {
        console.log(
          `conectado ao backend do DomQueShot (${this.serverAddress})!`
        );
      });
    }
    return SocketConnection.instance;
  }

  joinRoom(userData) {
    this.socket.emit('join-room', userData.roomCode, (reply) => {
      //join na sala e envio dos dados do player
      console.log(`resposta do servidor: ${reply}`);
      if (reply === `ingressou na sala ${userData.roomCode}.`) {
        this.addPlayer(userData);
      }
    });
  }

  joinRoomWithCode(roomCode: string) {
    this.socket.emit('join-room', roomCode, (reply) => {
      //join na sala e envio dos dados do player
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
    this.socket.on('lobby-update', (reply) => {
      //em caso de update na lista de jogadores
      //console.log(`Reposta do servidor: ${reply}`)
      console.log('A lista de jogadores foi atualizada.');
      useState(JSON.parse(reply));
    });
  }

  //abaixo, as funções originalmente desenvolvidas pelo Carlos para esta classe

  getInstance() {
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

  getMessages(room) {
    return this.push('get-messages', room);
  }
}

const socketConnection = new SocketConnection();
Object.freeze(socketConnection);
export default socketConnection;
