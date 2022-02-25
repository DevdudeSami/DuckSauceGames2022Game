import { io, Socket } from 'socket.io-client'

export default class NetworkManager {
  private static _socket: Socket

  public static connectSocket() {
    var socket = new WebSocket('ws://localhost:8089/')
    console.log('connecting socket connection')
    socket.onopen = function (event) {
      socket.send("Here's some text that the server is urgently awaiting!")
    }
    socket.onmessage = function (event) {
      console.log(event.data)
    }
  }

  public static createGame() {}

  public static joinGame() {}
}
