/*jsc
["tinymce.plugins.colorpicker.Plugin","tinymce.core.PluginManager","tinymce.core.util.Color","global!tinymce.util.Tools.resolve"]
jsc*/
defineGlobal("global!tinymce.util.Tools.resolve", tinymce.util.Tools.resolve);
/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.PluginManager',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.PluginManager');
  }
);

/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.util.Color',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.util.Color');
  }
);

/**
 * Plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class contains all core logic for the colorpicker plugin.
 *
 * @class tinymce.colorpicker.Plugin
 * @private
 */
define(
  'tinymce.plugins.colorpicker.Plugin',
  [
    'tinymce.core.PluginManager',
    'tinymce.core.util.Color'
  ],
  function (PluginManager, Color) {
    PluginManager.add('colorpicker', function (editor) {
      function colorPickerCallback(callback, value) {
        function setColor(value) {
          var color = new Color(value), rgb = color.toRgb();

          win.fromJSON({
            r: rgb.r,
            g: rgb.g,
            b: rgb.b,
            hex: color.toHex().substr(1)
          });

          showPreview(color.toHex());
        }

        function showPreview(hexColor) {
          win.find('#preview')[0].getEl().style.background = hexColor;
        }

        var win = editor.windowManager.open({
          title: 'Color',
          items: {
            type: 'container',
            layout: 'flex',
            direction: 'row',
            align: 'stretch',
            padding: 5,
            spacing: 10,
            items: [
              {
                type: 'colorpicker',
                value: value,
                onchange: function () {
                  var rgb = this.rgb();

                  if (win) {
                    win.find('#r').value(rgb.r);
                    win.find('#g').value(rgb.g);
                    win.find('#b').value(rgb.b);
                    win.find('#hex').value(this.value().substr(1));
                    showPreview(this.value());
                  }
                }
              },
              {
                type: 'form',
                padding: 0,
                labelGap: 5,
                defaults: {
                  type: 'textbox',
                  size: 7,
                  value: '0',
                  flex: 1,
                  spellcheck: false,
                  onchange: function () {
                    var colorPickerCtrl = win.find('colorpicker')[0];
                    var name, value;

                    name = this.name();
                    value = this.value();

                    if (name == "hex") {
                      value = '#' + value;
                      setColor(value);
                      colorPickerCtrl.value(value);
                      return;
                    }

                    value = {
                      r: win.find('#r').value(),
                      g: win.find('#g').value(),
                      b: win.find('#b').value()
                    };

                    colorPickerCtrl.value(value);
                    setColor(value);
                  }
                },
                items: [
                  { name: 'r', label: 'R', autofocus: 1 },
                  { name: 'g', label: 'G' },
                  { name: 'b', label: 'B' },
                  { name: 'hex', label: '#', value: '000000' },
                  { name: 'preview', type: 'container', border: 1 }
                ]
              }
            ]
          },
          onSubmit: function () {
            callback('#' + this.toJSON().hex);
          }
        });

        setColor(value);
      }

      if (!editor.settings.color_picker_callback) {
        editor.settings.color_picker_callback = colorPickerCallback;
      }
    });

    return function () { };
  }
);