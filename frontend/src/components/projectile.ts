export default class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, dx: number, texture: string) {
    super(scene, x, y, texture)
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setScale(1.5)
    // @ts-ignore
    this.body.setAllowGravity(false)

    scene.anims.create({
      key: 'projectile',
      frames: scene.anims.generateFrameNames('magic_arrow'),
      frameRate: 16,
      repeat: -1,
    })
    this.play('projectile')

		// @ts-ignore
		this.body.setVelocityX(dx)
		this.setScale(3)
		this.setFlipX(dx < 0)
  }
}
