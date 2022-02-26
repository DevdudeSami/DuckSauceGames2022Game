import Projectile from "../projectile"

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private _dead: boolean = false
  private _halt: boolean = false
  private mapSize: MapSize

  private spaceBarPressedObj: any

  constructor(scene: Phaser.Scene, player: TilesConfig, mapSize: MapSize, level: number) {
    super(scene, player.x, player.y, player.texture)
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.scene = scene
    this.mapSize = mapSize

    this.setOrigin(0, 1)
    this.setDragX(1500)
    this.body.setSize(80, 80)
    this.body.setOffset(0, 0)

    this.spaceBarPressedObj = scene.input.keyboard.addKey('SPACE')

    scene.anims.create({
      key: 'wriggle',
      frames: scene.anims.generateFrameNumbers('worm2', { start: 0, end: 1 }),
      frameRate: 8,
      repeat: -1,
    })
    this.play('wriggle')

  }

  kill() {
    this._dead = true

    // animate the camera if the player dies
    this.scene.cameras.main.shake(500, 0.025)
    this.scene.time.addEvent({
      delay: 500,
      callback: () => this.scene.scene.restart(),
    })
  }

  killEnemy() {
    this.setVelocityY(-600)
  }

  halt() {
    this.body.enable = false
    this._halt = true
  }

  update(cursors: any) {
    if (this._halt || this._dead) return

    // check if out of camera and kill
    if (this.body.right < this.mapSize.x || this.body.left > this.mapSize.width || this.body.top > this.mapSize.height)
      this.kill()

    // controls left & right
    if (cursors.left.isDown) {
      this.setVelocityX(-500)
      this.setFlipX(true)
    } else if (cursors.right.isDown) {
      this.setVelocityX(550)
      this.setFlipX(false)
    }
    // controls up
    if ((cursors.up.isDown) && this.body.blocked.down) {
      this.setVelocityY(-1250)
    }

    if(this.spaceBarPressedObj.isDown) {
      this.shoot()
    }

    if(!this.allowToShoot) {
      this.shootTimer += 1
      if(this.shootTimer > this.shootCooldown) {
        this.allowToShoot = true
        this.shootTimer = 0
      }
    }

    if(this.body.velocity.x < 0) this.lookingRight = false
    if(this.body.velocity.x > 0) this.lookingRight = true

    // update spine animation
  }

  allowToShoot = true
  shootTimer = 0
  shootCooldown = 50
  lookingRight = true

  shoot() {
    if(!this.allowToShoot) {
      return
    }
    this.allowToShoot = false
    const baseVelX = 400
    new Projectile(this.scene, this.x+10, this.y-20, this.body.velocity.x + (this.lookingRight ? baseVelX : -baseVelX), 'magic_arrow')
  }
}
