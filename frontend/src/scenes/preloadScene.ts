export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'PreloadScene',
    })
  }

  preload() {
    const images = ['tile-left', 'tile-middle', 'tile-right', 'tile-single', 'controls', 'background', 'goal']
    images.forEach((img) => {
      this.load.image(img, `assets/img/${img}.png`)
    })
    this.load.spritesheet('player', 'assets/img/player.png', { frameHeight: 165, frameWidth: 120 })
    this.load.spritesheet('coin', 'assets/img/coin.png', { frameHeight: 42, frameWidth: 42 })
    this.load.spritesheet('wasp', 'assets/img/wasp.png', { frameHeight: 40, frameWidth: 40 })
    this.load.spritesheet('worm', 'assets/img/worm.png', { frameHeight: 20, frameWidth: 20 })
    this.load.spritesheet('frog', 'assets/img/frog.png', { frameHeight: 40, frameWidth: 40 })
    this.load.setPath('assets/spine')
    // @ts-ignore
    this.load.spine('boy', 'boy.json', 'boy.atlas')
  }

  create() {
    this.scene.start('MainScene')
  }
}
