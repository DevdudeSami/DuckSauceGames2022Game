import { ClientsManager } from "./clients"
import { GameStateManager } from "./gameState"

export const joinGameHandler = (ws: WebSocket, data: any) => {
	const client = ClientsManager.instance.addClient(data.playerId, ws)
	ws.send(JSON.stringify({
		success: true,
		gameState: GameStateManager.instance.getGameState(data.gameId),
		secretToken: client.secretToken
	}))
}

export const startGameHandler = (ws: WebSocket, data: any) => {
	const client = ClientsManager.instance.getClient(data.secretToken)
	const game = GameStateManager.instance.getGameState(data.gameId)
	if (client && game) {
		if(game.players[0].id === client.playerId) {
			GameStateManager.instance.startGame(game.gameId, data.taskIds)
			// ws.send(JSON.stringify({
			// 	messageType: "START_GAME_RESPONSE",
			// 	success: true,
			// }))

		} else {
			ws.send(JSON.stringify({
				messageType: "START_GAME_RESPONSE",
				success: false,
				error: "You are not the host of this game"
			}))
		}
	}
}

export const playerPositionUpdateHandler = (ws: WebSocket, data: any) => {
	const client = ClientsManager.instance.getClient(data.secretToken)
	const success = GameStateManager.instance.updatePlayerPosition(data.gameId, client.playerId, data.position)
	if(success) return
	ws.send(JSON.stringify({
		messageType: "PLAYER_POSITION_UPDATE_RESPONSE",
		success,
	}))
}

export const leaveLobbyHandler = (ws: WebSocket, data: any) => {
	const client = ClientsManager.instance.getClient(data.secretToken)
	const game = GameStateManager.instance.getGameState(data.gameId)
	if (client && game) {
		ClientsManager.instance.removeClient(client.playerId)
		GameStateManager.instance.unregisterPlayerFromGame(data.gameId, client.playerId)
		// ws.send(JSON.stringify({
		// 	messageType: "LEAVE_LOBBY_RESPONSE",
		// 	success: true,
		// }))
	} else {
		ws.send(JSON.stringify({
			messageType: "LEAVE_LOBBY_RESPONSE",
			success: false,
		}))
	}
}

export const kickPlayerHandler = (ws: WebSocket, data: any) => {
	const client = ClientsManager.instance.getClient(data.secretToken)
	const game = GameStateManager.instance.getGameState(data.gameId)
	if (client && game) {
		if(game.players[0].id === client.playerId) {
			const success = GameStateManager.instance.kickPlayerFromGame(data.gameId, data.playerId)
			if(success) return
			ws.send(JSON.stringify({
				messageType: "KICK_PLAYER_RESPONSE",
				success,
			}))
		} else {
			ws.send(JSON.stringify({
				messageType: "KICK_PLAYER_RESPONSE",
				success: false,
				error: "You are not the host of this game"
			}))
		}
	}
}