import FrogSprite from './frog'
import EnemyClass from './enemyClass'
import WaspSprite from './wasp'

export default class EnemiesGroup extends Phaser.GameObjects.Group {
  tiles: TilesConfig[]
  TILE_SIZE = 96
  constructor(scene: Phaser.Scene, tilesConfig: TilesConfig[]) {
    super(scene)

    this.tiles = tilesConfig.filter((tile) => tile.type === 'tile')
    let enemyTypes = tilesConfig.filter((tile) => tile.type === 'enemy')

    let enemies: Array<WaspSprite | FrogSprite> = []
    enemyTypes.forEach((enemy) => {
      switch (enemy.texture) {
        case 'wasp':
          enemies.push(new WaspSprite(scene, enemy.x, enemy.y))
          break
        case 'frog':
          enemies.push(new FrogSprite(scene, enemy.x, enemy.y))
          break
      }
    })
    this.addMultiple(enemies)
  }

  update() {
    // check if the enemy should change its direction
    // @ts-ignore
    this.children.iterate((enemy: WaspSprite | FrogSprite) => {
      if((enemy as WaspSprite).type) {
        enemy.update()
        return
      }
      if (enemy.dead) return

      let enemyIsMovingRight = enemy.body.velocity.x >= 0

      let hasGroundDetection = this.tiles.filter((tile) => {
        let enemyPositionX = enemyIsMovingRight ? enemy.body.right : enemy.body.left
        let x = enemyPositionX + 32 > tile.x && enemyPositionX - 32 < tile.x + this.TILE_SIZE
        let y =
          enemy.body.bottom + this.TILE_SIZE / 2 > tile.y &&
          enemy.body.bottom + this.TILE_SIZE / 2 < tile.y + this.TILE_SIZE
        return x && y
      })

      if (hasGroundDetection.length === 0) {
        //@ts-ignore
        enemy.body.setVelocityX(enemy.body.velocity.x * -1)
        enemy.setFlipX(!enemyIsMovingRight)
      }
    }, null)
  }
}
