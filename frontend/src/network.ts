import { io, Socket } from 'socket.io-client'

export default class NetworkManager {
  private static _socket: Socket

  public static connectSocket() {
    const socket = io('http://localhost:3000')

    socket.on('connect', () => {
      console.log(socket.id)
    })
    socket.on('disconnect', () => {
      console.log(socket.id)
    })
  }

  public static createGame() {

  }

  public static joinGame() {
        
  }
}
