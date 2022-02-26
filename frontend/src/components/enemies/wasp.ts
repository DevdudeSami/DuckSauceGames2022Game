import EnemyClass from './enemyClass'
export default class WaspSprite extends EnemyClass {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'wasp')
    scene.add.existing(this)
    scene.physics.add.existing(this)

    scene.anims.create({
      key: 'fly',
      frames: scene.anims.generateFrameNumbers('wasp', { start: 0, end: 1 }),
      frameRate: 8,
      repeat: -1,
    })
    this.play('fly')

    this.type = 'wasp'

    //@ts-ignore
    this.body.setVelocityX(-120)
    this.setOrigin(0.5, 1)
    this.body.setSize(40, 40)
    this.body.setOffset(0,0)
    //@ts-ignore
    this.body.setAllowGravity(false)
  }

  frameCounter = 0

  flipDirection() {
    //@ts-ignore
    this.body.setVelocityX(this.body.velocity.x * -1)
    this.setFlipX(this.body.velocity.x >= 0)
  }

  update() {
    this.frameCounter += 1
    if (this.frameCounter > 250) {
      this.flipDirection()
      this.frameCounter = 0
    }
  }

  kill() {
    if (this.dead) return
    this.body.setSize(40, 40)
    this.setFrame(2)
    this.removeEnemy()
  }
}
