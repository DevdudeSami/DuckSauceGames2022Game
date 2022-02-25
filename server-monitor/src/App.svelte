<script lang="ts">
	const fetchGameState = async () => {
		// @ts-ignore: reeee
		const response = await fetch(`http://localhost:8089/serverState?superSecretServerPassword=superSecretServerPassword`)
    return await response.json()
	}

	let gameStateReq
	let gameState
	let loaded = false

	let currentTime = Math.floor(new Date().getTime() / 1000)
	
	setInterval(async () => {
		gameStateReq = await fetchGameState()
		currentTime = Math.floor(new Date().getTime() / 1000)
		gameState = gameStateReq.gameState
		gameState.forEach(game => {
			game.secsSinceLastUpdate = currentTime - game.lastUpdated
		})
		loaded = true
	}, 1000)
</script>

<svelte:head>
<title>WORM Game Server Monitor</title>
<meta name="robots" content="noindex nofollow" />
<html lang="en" />
</svelte:head>

<main>
	<h1>WORM Game Server Monitor</h1>
	{#if !loaded}
		<p>...waiting</p>

		
	{:else}	
		<h2>Games: {gameState.length}</h2>
		{#each gameState as game}
			<h3>Game [last updated {game.secsSinceLastUpdate}s ago]</h3>
			<p>Game ID: {game.gameId} | Code: {game.gameCode} | Status: {game.gameStarted ? "Started" : "Not started"} </p>
			<p><b>Players</b>: {game.players.length}</p>
			{#each game.players as player}
				<p>Player ID: {player.id}</p>
			{:else}
				<p>No players</p>
			{/each}
			<hr />
		{:else}
			<p>No games</p>
		{/each}
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>