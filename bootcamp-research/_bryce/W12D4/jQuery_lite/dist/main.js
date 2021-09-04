/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(arr) {\n    this.arr = arr;\n  }\n\n  html(string){\n    if (!string) {\n      return this.arr[0].innerHTML;\n    } else {\n      this.arr.forEach(el => {\n        el.innerHTML = string;\n      });\n    }\n  }\n\n  empty() {\n    // this.arr.forEach(el => {\n    //   el.innerHTML = \"\";\n    // });\n    this.html(\" \");\n  }\n\n  append(arg) {\n    let args = [];\n\n    if (typeof arg === \"string\") {\n      args.push(document.createElement(arg));\n    } else if (arg instanceof HTMLElement) {\n      args.push(arg);\n    } else if (arg instanceof DOMNodeCollection) {\n      args = arg.arr;\n    }\n\n    this.arr.forEach(el => {\n      args.forEach(newEl => {\n        debugger\n        el.innerHTML = el.innerHTML + newEl.outerHTML;\n      });\n    });\n    debugger\n  }\n\n  attr(attrName, value) {\n    if (!value) {\n      debugger\n      return this.arr[0].attributes.attrName;\n    } else {\n      this.arr.forEach(el => {\n        el.attributes.attrName = value;\n      });\n    }\n  }\n\n  addClass(newClass) {\n    this.arr.forEach(el => {\n      const classes = el.className.concat(` ${newClass}`);\n      el.className = classes;\n    });\n  }\n\n  removeClass(deletedClass) {\n    if (!deletedClass) {\n      this.arr.forEach(el => {\n        el.className = \"\";\n      });\n    } else {\n      this.arr.forEach(el => {\n        const currentClasses = el.className;\n        let classArr = currentClass.split(' ');\n        let classIdx = classArr.indexOf(deletedClass);\n        classArr.splice(classIdx, 1);\n        el.className = classArr.join(' ');\n      });\n    }\n  }\n\n  children() {\n    const children = [];\n    this.arr.forEach(el => {\n      const HTMLArr = [].slice.call(el.children);\n      children.concat(HTMLArr);\n    });\n    return new DOMNodeCollection(children);\n  }\n\n  parent() {\n    const parents = [];\n    this.arr.forEach(el => {\n      const parentHTML = el.parentElement;\n      if (!parents.includes(parentHTML)) parent.push(parentHTML);\n    });\n    return new DOMNodeCollection(parents);\n  }\n\n  find(arg) {\n    const results = [];\n    this.arr.forEach(el => {\n      const argCollection = el.querySelectorAll(arg);\n      const found = [].slice.call(argCollection);\n      found.forEach(el => {\n        if (!results.includes(el)) results.push(el);\n      });\n    });\n    return new DOMNodeCollection(results);\n  }\n\n  remove() {\n    this.arr.forEach(el => {\n      el.parentNode.removeChild(el);\n    });\n  };\n\n  on(eventType, callback) {\n    this.arr.forEach(el => {\n      el.addEventListener(eventType, callback);\n      el.callbacks = { eventType: callback };\n    });\n  }\n\n  off(eventType) {\n    this.arr.forEach(el => {           \n      el.removeEventListener(eventType, el.callbacks.eventType);\n    });\n  }\n\n\n\n}\n\nmodule.exports = DOMNodeCollection;\n\n//iterate, for each node, grab it's parent, then on that parent\n//call remove children, invoked with the current node in iteration\n\n\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./src/dom_node_collection.js\");\n\nwindow.functions = [];\nlet loaded = false;\nwindow.addEventListener(\"load\", () => {\n  loaded = true;\n  window.functions.forEach(func => {\n    func();\n  });\n});\n\nwindow.$l = (arg) => {\n  let HTMLArr;\n  if (typeof arg === \"string\") {\n    const nodeList = document.querySelectorAll(arg);\n    HTMLArr = [].slice.call(nodeList);\n    const newNodes = new DOMNodeCollection(HTMLArr);\n    return newNodes;\n  } else if (arg instanceof HTMLElement) {\n    HTMLArr = [arg];\n    const newNodes = new DOMNodeCollection(HTMLArr);\n    return newNodes;\n  } else if (arg instanceof Function) {\n    if (loaded) {\n      arg();\n    } else {\n      window.functions.push(arg);\n    }\n  }\n};\n\n$l.extend = (...args) => {\n  for (let i = 1; i < args.length; i++) {\n   Object.keys(args[i]).forEach(key => {\n      args[0][`${key}`] = args[i][`${key}`];\n    });\n  }\n  return args[0];\n};\n\n$l.ajax = (options) => {\n  let defaults = {\n    success: () => {},\n    error: () => {},\n    url: \"\",\n    method: \"GET\",\n    data: {},\n    contentType: \"application/x-www-form-urlencoded; charset=UTF-8\"\n  };\n  this.extend(defaults, options);\n  const xhr = new XMLHttpRequest();\n\n  xhr.responseType = defaults.contentType;\n\n  xhr.open(defaults.method, defaults.url);\n  xhr.onload = function () {\n    if (xhr.status === 200) {\n      defaults.success(JSON.parse(xhr.response));\n    } else {\n      defaults.error(JSON.parse(xhr.response));\n    }\n  }\n\n  const optionalData = defaults.data;\n  xhr.send(optionalData);\n\n};\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });