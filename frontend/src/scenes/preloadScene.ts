export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'PreloadScene',
    })
  }

  preload() {
    const images = ['tile-left', 'tile-middle', 'tile-right', 'tile-single', 'controls', 'background', 'city', 'cave', 'goal', 'mountain_platform']
    images.forEach((img) => {
      this.load.image(img, `assets/img/${img}.png`)
    })
    this.load.spritesheet('player', 'assets/img/player.png', { frameHeight: 165, frameWidth: 120 })
    this.load.spritesheet('coin', 'assets/img/coin.png', { frameHeight: 42, frameWidth: 42 })
    this.load.spritesheet('crow', 'assets/img/crow.png', { frameHeight: 45, frameWidth: 45 })
    this.load.spritesheet('wasp', 'assets/img/wasp.png', { frameHeight: 40, frameWidth: 40 })
    this.load.spritesheet('worm', 'assets/img/worm.png', { frameHeight: 80, frameWidth: 80 })
    this.load.spritesheet('frog', 'assets/img/frog.png', { frameHeight: 40, frameWidth: 40 })
    this.load.spritesheet('magic_arrow', 'assets/img/magic_arrow.png', { frameHeight: 20, frameWidth: 20 })
    this.load.setPath('assets/spine')
    // @ts-ignore
    this.load.spine('boy', 'boy.json', 'boy.atlas')
  }

  create() {
    this.scene.start('MainScene')
  }
}
