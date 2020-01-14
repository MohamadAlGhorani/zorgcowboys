// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./assets/fonts/zillaslab-regular-webfont.woff2":[["zillaslab-regular-webfont.17a5fcad.woff2","assets/fonts/zillaslab-regular-webfont.woff2"],"assets/fonts/zillaslab-regular-webfont.woff2"],"./assets/fonts/zillaslab-regular-webfont.woff":[["zillaslab-regular-webfont.84864494.woff","assets/fonts/zillaslab-regular-webfont.woff"],"assets/fonts/zillaslab-regular-webfont.woff"],"./assets/fonts/zillaslab-Regular.ttf":[["zillaslab-Regular.4ff9fe40.ttf","assets/fonts/zillaslab-Regular.ttf"],"assets/fonts/zillaslab-Regular.ttf"],"./assets/fonts/zillaslab-semibold-webfont.woff2":[["zillaslab-semibold-webfont.4eb684b2.woff2","assets/fonts/zillaslab-semibold-webfont.woff2"],"assets/fonts/zillaslab-semibold-webfont.woff2"],"./assets/fonts/zillaslab-semibold-webfont.woff":[["zillaslab-semibold-webfont.e8ef6c4e.woff","assets/fonts/zillaslab-semibold-webfont.woff"],"assets/fonts/zillaslab-semibold-webfont.woff"],"./assets/fonts/zillaslab-SemiBold.ttf":[["zillaslab-SemiBold.1ec55956.ttf","assets/fonts/zillaslab-SemiBold.ttf"],"assets/fonts/zillaslab-SemiBold.ttf"],"./assets/fonts/zillaslab-light-webfont.woff2":[["zillaslab-light-webfont.67cb1603.woff2","assets/fonts/zillaslab-light-webfont.woff2"],"assets/fonts/zillaslab-light-webfont.woff2"],"./assets/fonts/zillaslab-light-webfont.woff":[["zillaslab-light-webfont.cf06009e.woff","assets/fonts/zillaslab-light-webfont.woff"],"assets/fonts/zillaslab-light-webfont.woff"],"./assets/fonts/zillaslab-Light.ttf":[["zillaslab-Light.df6ea68e.ttf","assets/fonts/zillaslab-Light.ttf"],"assets/fonts/zillaslab-Light.ttf"],"./assets/fonts/zillaslab-semibolditalic-webfont.woff2":[["zillaslab-semibolditalic-webfont.e3e3f2df.woff2","assets/fonts/zillaslab-semibolditalic-webfont.woff2"],"assets/fonts/zillaslab-semibolditalic-webfont.woff2"],"./assets/fonts/zillaslab-semibolditalic-webfont.woff":[["zillaslab-semibolditalic-webfont.28ec0ba3.woff","assets/fonts/zillaslab-semibolditalic-webfont.woff"],"assets/fonts/zillaslab-semibolditalic-webfont.woff"],"./assets/fonts/zillaslab-SemiBoldItalic.ttf":[["zillaslab-SemiBoldItalic.c6613613.ttf","assets/fonts/zillaslab-SemiBoldItalic.ttf"],"assets/fonts/zillaslab-SemiBoldItalic.ttf"],"./assets/fonts/tensobold-webfont.woff2":[["tensobold-webfont.e65ac1aa.woff2","assets/fonts/tensobold-webfont.woff2"],"assets/fonts/tensobold-webfont.woff2"],"./assets/fonts/tensobold-webfont.woff":[["tensobold-webfont.ea18d59d.woff","assets/fonts/tensobold-webfont.woff"],"assets/fonts/tensobold-webfont.woff"],"./assets/fonts/tensobold.ttf":[["tensobold.fdf42075.ttf","assets/fonts/tensobold.ttf"],"assets/fonts/tensobold.ttf"],"./assets/fonts/tensoreg-webfont.woff2":[["tensoreg-webfont.cc3668da.woff2","assets/fonts/tensoreg-webfont.woff2"],"assets/fonts/tensoreg-webfont.woff2"],"./assets/fonts/tensoreg-webfont.woff":[["tensoreg-webfont.ee94d523.woff","assets/fonts/tensoreg-webfont.woff"],"assets/fonts/tensoreg-webfont.woff"],"./assets/fonts/tensoreg.ttf":[["tensoreg.27d293a8.ttf","assets/fonts/tensoreg.ttf"],"assets/fonts/tensoreg.ttf"],"./assets/fonts/zillaslab-bold-webfont.woff2":[["zillaslab-bold-webfont.2fe7df7c.woff2","assets/fonts/zillaslab-bold-webfont.woff2"],"assets/fonts/zillaslab-bold-webfont.woff2"],"./assets/fonts/zillaslab-bold-webfont.woff":[["zillaslab-bold-webfont.bc11ea0f.woff","assets/fonts/zillaslab-bold-webfont.woff"],"assets/fonts/zillaslab-bold-webfont.woff"],"./assets/fonts/zillaslab-Bold.ttf":[["zillaslab-Bold.e3667107.ttf","assets/fonts/zillaslab-Bold.ttf"],"assets/fonts/zillaslab-Bold.ttf"],"./assets/fonts/zillaslab-bolditalic-webfont.woff2":[["zillaslab-bolditalic-webfont.e6632c00.woff2","assets/fonts/zillaslab-bolditalic-webfont.woff2"],"assets/fonts/zillaslab-bolditalic-webfont.woff2"],"./assets/fonts/zillaslab-bolditalic-webfont.woff":[["zillaslab-bolditalic-webfont.3456f767.woff","assets/fonts/zillaslab-bolditalic-webfont.woff"],"assets/fonts/zillaslab-bolditalic-webfont.woff"],"./assets/fonts/zillaslab-BoldItalic.ttf":[["zillaslab-BoldItalic.43046ad9.ttf","assets/fonts/zillaslab-BoldItalic.ttf"],"assets/fonts/zillaslab-BoldItalic.ttf"],"./assets/fonts/zillaslab-italic-webfont.woff2":[["zillaslab-italic-webfont.9368b99e.woff2","assets/fonts/zillaslab-italic-webfont.woff2"],"assets/fonts/zillaslab-italic-webfont.woff2"],"./assets/fonts/zillaslab-italic-webfont.woff":[["zillaslab-italic-webfont.6f0a14b6.woff","assets/fonts/zillaslab-italic-webfont.woff"],"assets/fonts/zillaslab-italic-webfont.woff"],"./assets/fonts/zillaslab-Italic.ttf":[["zillaslab-Italic.85c91b8c.ttf","assets/fonts/zillaslab-Italic.ttf"],"assets/fonts/zillaslab-Italic.ttf"],"./assets/fonts/zillaslab-lightitalic-webfont.woff2":[["zillaslab-lightitalic-webfont.cf2c1323.woff2","assets/fonts/zillaslab-lightitalic-webfont.woff2"],"assets/fonts/zillaslab-lightitalic-webfont.woff2"],"./assets/fonts/zillaslab-lightitalic-webfont.woff":[["zillaslab-lightitalic-webfont.d5a7bbee.woff","assets/fonts/zillaslab-lightitalic-webfont.woff"],"assets/fonts/zillaslab-lightitalic-webfont.woff"],"./assets/fonts/zillaslab-LightItalic.ttf":[["zillaslab-LightItalic.7fc11ba7.ttf","assets/fonts/zillaslab-LightItalic.ttf"],"assets/fonts/zillaslab-LightItalic.ttf"],"./assets/fonts/zillaslab-medium-webfont.woff2":[["zillaslab-medium-webfont.201bf133.woff2","assets/fonts/zillaslab-medium-webfont.woff2"],"assets/fonts/zillaslab-medium-webfont.woff2"],"./assets/fonts/zillaslab-medium-webfont.woff":[["zillaslab-medium-webfont.f822432d.woff","assets/fonts/zillaslab-medium-webfont.woff"],"assets/fonts/zillaslab-medium-webfont.woff"],"./assets/fonts/zillaslab-Medium.ttf":[["zillaslab-Medium.dcea0514.ttf","assets/fonts/zillaslab-Medium.ttf"],"assets/fonts/zillaslab-Medium.ttf"],"./assets/fonts/zillaslab-mediumitalic-webfont.woff2":[["zillaslab-mediumitalic-webfont.4b3cbf3b.woff2","assets/fonts/zillaslab-mediumitalic-webfont.woff2"],"assets/fonts/zillaslab-mediumitalic-webfont.woff2"],"./assets/fonts/zillaslab-mediumitalic-webfont.woff":[["zillaslab-mediumitalic-webfont.c05c2dd0.woff","assets/fonts/zillaslab-mediumitalic-webfont.woff"],"assets/fonts/zillaslab-mediumitalic-webfont.woff"],"./assets/fonts/zillaslab-MediumItalic.ttf":[["zillaslab-MediumItalic.876bad5f.ttf","assets/fonts/zillaslab-MediumItalic.ttf"],"assets/fonts/zillaslab-MediumItalic.ttf"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62049" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/styles.164d45a1.js.map