import 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin';

class Demo extends Phaser.Scene {
    rexUI: UIPlugin;

    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
    }

    create() {
        var s = `
a : 10
b : 20
c :    # null
`
        const doc = this.rexUI.yaml.load(s);
        console.log(doc);

    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);