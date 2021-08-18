import Container from '../containerlite/ContainerLite.js';
import SetTransitionCallbackMethods from './SetTransitionCallbackMethods.js';
import TransitionMethods from './TransitionMethods.js';
import {
    OnStart as DefaultOnStart,
    OnProgress as DefaultOnProgress,
    OnComplete as DefaultOnComplete
} from './CrossFadeTransition.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class TransitionImage extends Container {
    constructor(scene, x, y, texture, frame, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            texture = GetValue(config, 'key', undefined);
            frame = GetValue(config, 'frame', undefined);
        } else if (IsPlainObject(frame)) {
            config = frame;
            frame = undefined;
        }

        var backImage = scene.add.image(x, y, texture, frame).setVisible(false);
        var frontImage = scene.add.image(x, y, texture, frame);
        var width = GetValue(config, 'width', frontImage.width);
        var height = GetValue(config, 'height', frontImage.height);
        super(scene, x, y, width, height, [backImage, frontImage]);

        this.type = 'rexTransitionImage';
        this.backImage = backImage;
        this.frontImage = frontImage;

        // Transition parameters
        var onStart = GetValue(config, 'onStart', undefined);
        var onProgress = GetValue(config, 'onProgress', undefined);
        var onComplete = GetValue(config, 'onComplete', undefined);
        var dir = GetValue(config, 'dir', 0);
        if ((onStart === undefined) && (onProgress === undefined) && (onComplete === undefined)) {
            onStart = DefaultOnStart;
            onProgress = DefaultOnProgress;
            onComplete = DefaultOnComplete;
            dir = 0;
        }

        this
            .setTransitionStartCallback(
                onStart,
                GetValue(config, 'onStartScope', undefined)
            )
            .setTransitionProgressCallback(
                onProgress,
                GetValue(config, 'onProgressScope', undefined)
            )
            .setTransitionCompleteCallback(
                onComplete,
                GetValue(config, 'onCompleteScope', undefined)
            )
            .setTransitionDirection(dir)
            .setDuration(GetValue(config, 'duration', 1000))
            .setEaseFunction(GetValue(config, 'ease', 'Linear'))
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        super.destroy(fromScene);

        this.backImage = undefined;
        this.frontImage = undefined;
        this.onStartCallback = undefined;
        this.onStartCallbackScope = undefined;
        this.onProgressCallback = undefined;
        this.onProgressCallbackScope = undefined;
        this.onCompleteCallback = undefined;
        this.onCompleteCallbackScope = undefined;
        this.easeValueTask = undefined;
    }

    get currentImage() {
        return (this.dir === 0) ? this.frontImage : this.backImage;
    }

    get nextImage() {
        return (this.dir === 0) ? this.backImage : this.frontImage;
    }

    get texture() {
        return this.backImage.texture;
    }

    get frame() {
        return this.backImage.frame;
    }

    get t() {
        return this._t;
    }

    set t(value) {
        value = Clamp(value, 0, 1);
        if (this._t === value) {
            return;
        }
        this._t = value;

        var currentImage = this.currentImage;
        var nextImage = this.nextImage;

        // Start
        if (value === 0) {
            this
                .setChildVisible(this.frontImage, true)
                .setChildVisible(this.backImage, true)

            RunCallback(
                this.onStartCallback, this.onStartCallbackScope,
                this, currentImage, nextImage, value
            );
        }

        // Progress
        RunCallback(
            this.onProgressCallback, this.onProgressCallbackScope,
            this, currentImage, nextImage, value
        );

        // Complete
        if (value === 1) {
            RunCallback(
                this.onCompleteCallback, this.onCompleteCallbackScope,
                this, currentImage, nextImage, value
            );

            var key = nextImage.texture.key,
                frame = nextImage.frame.name;
            this.frontImage.setTexture(key, frame);
            this.backImage.setTexture(key, frame);

            this
                .setChildVisible(this.frontImage, true)
                .setChildVisible(this.backImage, false)
        }

        if (value === 1) {
            this.emit('complete');
        }
    }

    setT(value) {
        this.t = value;
        return this;
    }

    setOrigin(originX, originY) {
        super.setOrigin(originX, originY);
        this.frontImage.setOrigin(originX, originY);
        this.backImage.setOrigin(originX, originY);
        return this;
    }

    setTexture(texture, frame) {
        // Without transition
        this.frontImage.setTexture(texture, frame);
        this.backImage.setTexture(texture, frame).setVisible(false);
        return this;
    }
}

var RunCallback = function (callback, scope, parent, currentImage, nextImage, t) {
    if (!callback) {
        return;
    }

    if (scope) {
        callback.call(scope, parent, currentImage, nextImage, t);
    } else {
        callback(parent, currentImage, nextImage, t);
    }
}

// mixin
Object.assign(
    TransitionImage.prototype,
    SetTransitionCallbackMethods,
    TransitionMethods
);

export default TransitionImage;