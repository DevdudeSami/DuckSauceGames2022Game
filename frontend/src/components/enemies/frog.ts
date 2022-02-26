import EnemyClass from './enemyClass'
export default class FrogSprite extends EnemyClass {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'frog')
    scene.add.existing(this)
    scene.physics.add.existing(this)

    scene.anims.create({
      key: 'crawl',
      frames: scene.anims.generateFrameNumbers('frog', { start: 0, end: 4 }),
      frameRate: 6,
      yoyo: true,
      repeat: -1,
    })
    this.play('crawl')

    //@ts-ignore
    this.body.setVelocityX(-60)
    this.setOrigin(0.5, 1)
    this.setScale(3,3)
    this.body.setSize(40, 40)
    this.body.setOffset(0,0)
  }

  update() {}

  kill() {
    if (this.dead) return
    this.setFrame(5)
    this.removeEnemy()
  }
}
