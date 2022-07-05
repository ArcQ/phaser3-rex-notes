import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseFadeOutBackgroundMusicTag = function (textPlayer, parser, config) {
    var tagName = 'bgm.fadeout';
    parser
        .on(`+${tagName}`, function (time, isStopped) {
            isStopped = (isStopped === 'stop');
            AppendCommandBase.call(textPlayer,
                'bgm.fadeout',           // name
                FadeOutBackgroundMusic,  // callback
                [time, isStopped],       // params
                textPlayer,              // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var FadeOutBackgroundMusic = function (params) {
    // this: textPlayer
    this.soundManager.fadeOutBackgroundMusic(...params);
}

export default OnParseFadeOutBackgroundMusicTag;