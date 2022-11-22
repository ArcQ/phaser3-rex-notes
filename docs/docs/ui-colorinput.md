## Introduction

Color number (`0x0`~`0xffffff`) or color string (`'#000000'`~`'#ffffff'`, or `'red'`) input field.

- Author: Rex
- Game object

## Live demos

- [Color input](https://codepen.io/rexrainbow/pen/MWXpmYP)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-colorinput)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add color-input object
    ```javascript
    var colorInput = scene.rexUI.add.colorInput(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
    var config = {
        // ...
        plugins: {
            scene: [{
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add color-input object
    ```javascript
    var colorInput = scene.rexUI.add.colorInput(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { ColorInput } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add color-input object
    ```javascript    
    var colorInput = new ColorInput(scene, config);
    scene.add.existing(colorInput);
    ```

### Add colorInput object

```javascript
var colorInput = scene.rexUI.add.colorInput({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    background: backgroundGameObject,

    swatch: undefined,
    // swatch: { shape: 'circle' },
    // swatch: swatchGameObject,
    // swatch: false,

    inputText: inputTextConfig,

    colorPicker : {
        width: 160, height: 170,

        background: {
            radius: 0,
            color: undefined, alpha: undefined,
            strokeColor: undefined, strokeAlpha: undefined, strokeWidth: 2
        },
        // createBackgroundCallback: function(scene) {
        //     return gameObject;
        // }

        space: { left: 10, right: 10, top: 10, bottom: 10, item: 8 }
    },

    colorComponents: {
        height: undefined,
        
        formatLabel: undefined,

        inputText: undefined,

        space: { item: 8 }
    },

    valuechangeCallback: function(newValue, oldValue, colorInput) {
    },
    valuechangeCallbackScope: undefined,

    value: 0xffffff,

    space: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

        icon: 0,
        text: 0,
    },

    // name: '',
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,    
});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
- `anchor` : See [anchor](anchor.md#create-instance).
    - `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y` : Position based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
            - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
            - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
        - Offset : `'+n'`, or `'-n'`.
    - `width`, `height` : Set size (invoke `onResizeCallback`) based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.        
        - Padding : `'+n'`, or `'-n'`.
    - `onResizeCallback` : A default resize callback will be assigned interanlly. 
- `width`, `height` : Minimum width, minimum height.
- `background` : [Game object of background](ui-basesizer.md#background), optional. This background game object will be resized to fit the size of colorInput.
- `swatch` : Display color value on a square, circle shape, or an image game object with tint.
    - `undefein` : A square swatch. Default game object.
    - A plain object : A circle, or a round square swatch.
        ```javascript
        { shape: 'circle' }
        ```
        or
        ```javascript
        { radius: 10 }
        ```
    - An Image or Sprite game object : Tint this game object for displaying color value.
    - `false` : No swatch game object.
- `inputText` : Configuration of [canvasInput](canvasinput.md#create-instance)
- `colorPicker` : Configuration of a drop-down [color picker](ui-colorpicker.md), triggered by clicking swatch.
    - `colorPicker.width`, `colorPicker.height` : Sizer of color picker. Default value is `180`x`170`
    - `colorPicker.background` : Parameters to create [round rectangle](shape-roundrectangle.me) game object, optional.
    - `colorPicker.createBackgroundCallback` : Callback to create background game object, optional.
        ```javascript
        function(scene) {
            return gameObject;
        }
        ```
    - `colorPicker.space` : Padding space around color picker. Default value is
        ```javascript
        { left: 10, right: 10, top: 10, bottom: 10, item: 8 }
        ```
    - `false` : No color picker.
- `colorComponents` : Configuration of [color components](ui-colorcomponents.md) inside the drop down color picker.
    - `colorComponents.height` : Height of color components.
    - `colorComponents.formatLabel` : Clicking this label can switch color format between *RGB* and *HSV* 
        - `undefined` : Will create a label with default [text](text.md) game object.
        - A plain object
            ```javascript
            {
                background: {
                    radius: 0,
                    color: undefined, alpha: undefined,
                    strokeColor: undefined, strokeAlpha: undefined, strokeWidth: 2
                },
            
                text: textStyle,
            
                space: {left: 0, right: 0, top: 0, bottom: 0}
            }            
            ```
    - `colorComponents.inputText` : Configuration of [canvasInput](canvasinput.md#create-instance) used in this color components. Will use `inputText` of color input if this parameter is not given.
    - `colorComponents.space` : Padding space around color components. Default value is
        ```javascript
        { item: 8 }
        ```
    - `false` : No color components.
- `valuechangeCallback` : callback function when value changed.
- `value` : Initial color value (0 ~ 0xffffff).
    - Number :  0 ~ 0xffffff
    - String : 
        - `0x0`~`0xffffff`
        - `'#000000'`~`'#ffffff'`
        - `'red'`
- `space` : Pads spaces.
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.item` : Space between swatch and inputText.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#layer).

### Custom class

- Define class
    ```javascript
    class MyColorInput extends RexPlugins.UI.ColorInput {
        constructor(scene, config) {
            super(scene, config);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var colorInput = new MyColorInput(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
colorInput.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Get element

- Get element
    - Background game object
        ```javascript
        var background = colorInput.getElement('background');
        ```
    - Swatch game object
        ```javascript
        var icon = colorInput.getElement('swatch');
        ```
    - Input text game object
        ```javascript
        var textObject = colorInput.getElement('inputText');
        ```
- Get by name
    ```javascript
    var gameObject = colorInput.getElement('#' + name);
    // var gameObject = colorInput.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = colorInput.getByName(name);
    // var gameObject = colorInput.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.

### Value

Change value will also change the position of marker on H-palette and SV-palette

- Get color value
    ```javascript
    var value = colorInput.value;
    // var value = colorInput.color;
    ```
- Set color value
    ```javascript
    colorInput.setValue(value);
    // colorInput.setColor(value);
    ```
    or
    ```javascript
    colorInput.value = value;
    colorInput.color = value;
    ```

### Events

- On value changed
    ```javascript
    colorInput.on('valuechange', function(newValue, oldValue, colorInput){
        //
    }, scope);
    ```

### Other properties

See [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md).