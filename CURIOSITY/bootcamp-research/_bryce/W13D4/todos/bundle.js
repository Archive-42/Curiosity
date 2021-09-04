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
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/todo_redux.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/todo_redux.jsx":
/*!*********************************!*\
  !*** ./frontend/todo_redux.jsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// import React from 'react';\n// import ReactDOM from 'react-dom';\n// import configureStore from './store/store.js';\n// import { receiveTodos, receiveTodo } from './actions/todo_actions';\n// import Root from './components/root';\n// import allTodos from './reducers/selectors';\n// const store = configureStore();\nconsole.log(\"starting stuff\"); // document.addEventListener(\"DOMContentLoaded\", () => {\n\ndebugger;\nvar root = document.getElementById('content'); // window.store = store;\n// window.receiveTodos = receiveTodos;\n// window.receiveTodo = receiveTodo;\n// window.allTodos = allTodos;\n// ReactDOM.render(<Root store={store}/>, root);\n// });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC90b2RvX3JlZHV4LmpzeD8wNDg5Il0sIm5hbWVzIjpbImNvbnNvbGUiLCJsb2ciLCJyb290IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQVosRSxDQUNBOztBQUVFO0FBRUEsSUFBTUMsSUFBSSxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBYixDLENBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNGIiwiZmlsZSI6Ii4vZnJvbnRlbmQvdG9kb19yZWR1eC5qc3guanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuLy8gaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5cbi8vIGltcG9ydCBjb25maWd1cmVTdG9yZSBmcm9tICcuL3N0b3JlL3N0b3JlLmpzJztcbi8vIGltcG9ydCB7IHJlY2VpdmVUb2RvcywgcmVjZWl2ZVRvZG8gfSBmcm9tICcuL2FjdGlvbnMvdG9kb19hY3Rpb25zJztcbi8vIGltcG9ydCBSb290IGZyb20gJy4vY29tcG9uZW50cy9yb290Jztcbi8vIGltcG9ydCBhbGxUb2RvcyBmcm9tICcuL3JlZHVjZXJzL3NlbGVjdG9ycyc7XG5cblxuLy8gY29uc3Qgc3RvcmUgPSBjb25maWd1cmVTdG9yZSgpO1xuXG5jb25zb2xlLmxvZyhcInN0YXJ0aW5nIHN0dWZmXCIpO1xuLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBcbiAgZGVidWdnZXJcblxuICBjb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKTtcbiAgLy8gd2luZG93LnN0b3JlID0gc3RvcmU7XG4gIC8vIHdpbmRvdy5yZWNlaXZlVG9kb3MgPSByZWNlaXZlVG9kb3M7XG4gIC8vIHdpbmRvdy5yZWNlaXZlVG9kbyA9IHJlY2VpdmVUb2RvO1xuICAvLyB3aW5kb3cuYWxsVG9kb3MgPSBhbGxUb2RvcztcbiAgLy8gUmVhY3RET00ucmVuZGVyKDxSb290IHN0b3JlPXtzdG9yZX0vPiwgcm9vdCk7XG4vLyB9KTtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/todo_redux.jsx\n");

/***/ })

/******/ });