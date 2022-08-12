var EaseMode = {
    to: true,
    yoyo: true
}

var IsEasePropertyTag = function (tags, prefix) {
    // prefix.name.prop.to, or prefix.name.prop.yoyo
    return (tags.length === 4) && (tags[0] === prefix) && EaseMode[tags[3]];
}

var OnParseEaseGameObjectPropertyTag = function (tagPlayer, parser, config) {
    var prefix = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(prefix);
    parser
        .on(`+`, function (tag, value, duration, ease, repeat) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [prefix.name.prop.to=value,duration]
            // [prefix.name.prop.to=value,duration,ease,repeat]
            // [prefix.name.prop.to=value,duration,repeat]
            var tags = tag.split('.');
            var name, property, isYoyo;
            if (IsEasePropertyTag(tags, prefix)) {
                name = tags[1];
                property = tags[2];
                isYoyo = (tags[3] === 'yoyo');
            } else {
                return;
            }

            if (typeof (ease) === 'number') {
                repeat = ease;
                ease = undefined;
            }

            gameObjectManager.easeProperty(
                name, property, value,
                duration, ease, repeat, isYoyo
            );

            parser.skipEvent();
        })
}

export default OnParseEaseGameObjectPropertyTag;