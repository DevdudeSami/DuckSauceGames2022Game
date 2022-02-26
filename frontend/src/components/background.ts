export default class Background extends Phaser.GameObjects.TileSprite {
  constructor(scene: Phaser.Scene) {
    const backgrounds = ['background', 'city', 'cave']
    const bgToUse = Math.floor(Math.random() * 3); 
    super(scene, 0, 0, 0, 0, backgrounds[bgToUse])
    scene.add.existing(this)

    this.setOrigin(0.5).setScrollFactor(0)
  }

  adjustPosition() {
    const imgHeight = 300
    this.setScale(this.scene.cameras.main.height / imgHeight)
    this.x = this.scene.cameras.main.centerX
    this.y = this.scene.cameras.main.centerY
    this.width = this.scene.cameras.main.width
  }

  parallax() {
    this.tilePositionX = this.scene.cameras.main.worldView.x * 0.2
  }
}
