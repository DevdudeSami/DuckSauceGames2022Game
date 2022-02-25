import { v4 as uuidv4 } from 'uuid'
import { ClientsManager } from './clients'

export class GameStateManager {
	private static _instance: GameStateManager = new GameStateManager()
	private constructor() {
		if (GameStateManager._instance) {
			throw new Error('Error: Instantiation failed: Use GameStateManager.instance instead of new.')
		}
		GameStateManager._instance = this

		// Garbage collection interval for inactive game states
		setInterval(() => {
			const currentTime = currentUnixTimestamp()
			for (const gameState of this.gameStates.values()) {
				const cleanupThreshold = gameState.gameStarted ? 30 : 60 * 2
				if(currentTime - gameState.lastUpdated > cleanupThreshold) {
					this.deleteGameState(gameState.gameId)
				}
			}
		}, 10000)

		// this.printGameStates()
	}
	public static get instance(): GameStateManager {
		return this._instance
	}

	private gameStates: Map<string, GameState> = new Map()

	private printGameStates(): void {
		console.log('GameStates:')
		for (const gameState of this.gameStates.values()) {
			console.log(gameState)
		}
	}

	public createGameState(hostPlayer: Player): GameState {
		const gameState = new GameState(hostPlayer)
		this.gameStates.set(gameState.gameId, gameState)

		// this.printGameStates()
		return gameState
	}

	public getGameState(id: string): GameState {
		return this.gameStates.get(id)!
	}

	public getAllGameStates(): GameState[] {
		return [...this.gameStates.values()]
	}

	public getGameStateWithCode(code: string): GameState {
		const res = [...this.gameStates.values()].filter(gameState => gameState.gameCode === code)
		if (res.length === 0) {
			console.error('No game state found with code: ' + code)
			return null
		} else {
			return res[0]
		}
	}

	public startGame(gameId: any, taskIds: string[]): void {
		const gameState = this.getGameState(gameId)
		gameState.gameStarted = true
	
		gameState.broadcastToPlayers()
	}

	public updatePlayerPosition(gameId: string, playerId: string, pos: {x:number,y:number}): boolean {
		const gameState = this.getGameState(gameId)
		const player = gameState.players.find(player => player.id === playerId)
		player.position = pos
		gameState.broadcastToPlayers()
		return true
	}

	public registerPlayerToGame(player: Player, code: string): GameState {
		const gameState = this.getGameStateWithCode(code)
		if(gameState.gameStarted) {
			console.error('Game already started ' + code)
			return null
		}
		gameState.players.push(player)

		gameState.broadcastToPlayers()
		// this.printGameStates()
		return gameState
	}

	public broadcastGameUpdates(gameId: string): void {
		const gameState = this.getGameState(gameId)
		gameState.broadcastToPlayers()
	}

	public deleteGameState(id: string): void {
		// this.printGameStates()
		this.getGameState(id).cleanGameSockets()
		this.gameStates.delete(id)
	}

	public unregisterPlayerFromGame(gameId: string, playerId: string): void {
		const gameState = this.getGameState(gameId)
		const player = gameState.players.find(player => player.id === playerId)
		gameState.players.splice(gameState.players.indexOf(player), 1)
		gameState.broadcastToPlayers()
	}

	public kickPlayerFromGame(gameId: string, playerId: string): boolean {
		const gameState = this.getGameState(gameId)
		const player = gameState.players.find(player => player.id === playerId)
		gameState.players.splice(gameState.players.indexOf(player), 1)
		gameState.broadcastToPlayers()
		return true
	}	
}

function currentUnixTimestamp(): number {
	return Math.floor(new Date().getTime() / 1000)
}

export class GameState {
	gameId: string = uuidv4()
	lastUpdated: number = currentUnixTimestamp()
	gameCode: string = makeFourLetterID()
	gameStarted: boolean = false
	players: Player[]

	constructor(hostPlayer: Player) {
		this.players = [hostPlayer]
	}

	cleanGameSockets() {
		this.players.forEach(player => {
			const client = ClientsManager.instance.getClientByPlayerID(player.id)
			if(client) client.socket.close
		})
	}

	broadcastToPlayers() {
		this.lastUpdated = currentUnixTimestamp()
		for(const player of this.players) {
			ClientsManager.instance.updateGameStateForPlayer(player.id, this)
		}
	}
}

export class Player {
	id: string = uuidv4()
	name: string = "Newbie"
	position: {x: number, y: number} = {x: 0, y: 0}
	alive: boolean = true
}

function makeFourLetterID(): string {
  var text = ""
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

  for (var i = 0; i < 4; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}