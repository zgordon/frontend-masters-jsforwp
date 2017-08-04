(function () {

var defs = {}; // id -> {dependencies, definition, instance (possibly undefined)}

// Used when there is no 'main' module.
// The name is probably (hopefully) unique so minification removes for releases.
var register_3795 = function (id) {
  var module = dem(id);
  var fragments = id.split('.');
  var target = Function('return this;')();
  for (var i = 0; i < fragments.length - 1; ++i) {
    if (target[fragments[i]] === undefined)
      target[fragments[i]] = {};
    target = target[fragments[i]];
  }
  target[fragments[fragments.length - 1]] = module;
};

var instantiate = function (id) {
  var actual = defs[id];
  var dependencies = actual.deps;
  var definition = actual.defn;
  var len = dependencies.length;
  var instances = new Array(len);
  for (var i = 0; i < len; ++i)
    instances[i] = dem(dependencies[i]);
  var defResult = definition.apply(null, instances);
  if (defResult === undefined)
     throw 'module [' + id + '] returned undefined';
  actual.instance = defResult;
};

var def = function (id, dependencies, definition) {
  if (typeof id !== 'string')
    throw 'module id must be a string';
  else if (dependencies === undefined)
    throw 'no dependencies for ' + id;
  else if (definition === undefined)
    throw 'no definition function for ' + id;
  defs[id] = {
    deps: dependencies,
    defn: definition,
    instance: undefined
  };
};

var dem = function (id) {
  var actual = defs[id];
  if (actual === undefined)
    throw 'module [' + id + '] was undefined';
  else if (actual.instance === undefined)
    instantiate(id);
  return actual.instance;
};

var req = function (ids, callback) {
  var len = ids.length;
  var instances = new Array(len);
  for (var i = 0; i < len; ++i)
    instances.push(dem(ids[i]));
  callback.apply(null, callback);
};

var ephox = {};

ephox.bolt = {
  module: {
    api: {
      define: def,
      require: req,
      demand: dem
    }
  }
};

var define = def;
var require = req;
var demand = dem;
// this helps with minificiation when using a lot of global references
var defineGlobal = function (id, ref) {
  define(id, [], function () { return ref; });
};
/*jsc
["0","1","2","3","4","5","6","7"]
jsc*/
defineGlobal("7", tinymce.util.Tools.resolve);
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
  "1",
  [
    "7"
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
  "2",
  [
    "7"
  ],
  function (resolve) {
    return resolve('tinymce.dom.DOMUtils');
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
  "3",
  [
    "7"
  ],
  function (resolve) {
    return resolve('tinymce.util.Tools');
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
  "4",
  [
    "7"
  ],
  function (resolve) {
    return resolve('tinymce.EditorManager');
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
  "5",
  [
    "7"
  ],
  function (resolve) {
    return resolve('tinymce.util.Delay');
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
  "6",
  [
    "7"
  ],
  function (resolve) {
    return resolve('tinymce.Env');
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
 * This class contains all core logic for the code plugin.
 *
 * @class tinymce.tabfocus.Plugin
 * @private
 */
define(
  "0",
  [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6"
  ],
  function (PluginManager, DOMUtils, Tools, EditorManager, Delay, Env) {
    PluginManager.add('tabfocus', function (editor) {
      var DOM = DOMUtils.DOM;

      function tabCancel(e) {
        if (e.keyCode === 9 && !e.ctrlKey && !e.altKey && !e.metaKey) {
          e.preventDefault();
        }
      }

      function tabHandler(e) {
        var x, el, v, i;

        if (e.keyCode !== 9 || e.ctrlKey || e.altKey || e.metaKey || e.isDefaultPrevented()) {
          return;
        }

        function find(direction) {
          el = DOM.select(':input:enabled,*[tabindex]:not(iframe)');

          function canSelectRecursive(e) {
            return e.nodeName === "BODY" || (e.type != 'hidden' &&
              e.style.display != "none" &&
              e.style.visibility != "hidden" && canSelectRecursive(e.parentNode));
          }

          function canSelect(el) {
            return /INPUT|TEXTAREA|BUTTON/.test(el.tagName) && EditorManager.get(e.id) && el.tabIndex != -1 && canSelectRecursive(el);
          }

          Tools.each(el, function (e, i) {
            if (e.id == editor.id) {
              x = i;
              return false;
            }
          });
          if (direction > 0) {
            for (i = x + 1; i < el.length; i++) {
              if (canSelect(el[i])) {
                return el[i];
              }
            }
          } else {
            for (i = x - 1; i >= 0; i--) {
              if (canSelect(el[i])) {
                return el[i];
              }
            }
          }

          return null;
        }

        v = Tools.explode(editor.getParam('tab_focus', editor.getParam('tabfocus_elements', ':prev,:next')));

        if (v.length == 1) {
          v[1] = v[0];
          v[0] = ':prev';
        }

        // Find element to focus
        if (e.shiftKey) {
          if (v[0] == ':prev') {
            el = find(-1);
          } else {
            el = DOM.get(v[0]);
          }
        } else {
          if (v[1] == ':next') {
            el = find(1);
          } else {
            el = DOM.get(v[1]);
          }
        }

        if (el) {
          var focusEditor = EditorManager.get(el.id || el.name);

          if (el.id && focusEditor) {
            focusEditor.focus();
          } else {
            Delay.setTimeout(function () {
              if (!Env.webkit) {
                window.focus();
              }

              el.focus();
            }, 10);
          }

          e.preventDefault();
        }
      }

      editor.on('init', function () {
        if (editor.inline) {
          // Remove default tabIndex in inline mode
          DOM.setAttrib(editor.getBody(), 'tabIndex', null);
        }

        editor.on('keyup', tabCancel);

        if (Env.gecko) {
          editor.on('keypress keydown', tabHandler);
        } else {
          editor.on('keydown', tabHandler);
        }
      });
    });


    return function () { };
  }
);
dem("0")();
})();
