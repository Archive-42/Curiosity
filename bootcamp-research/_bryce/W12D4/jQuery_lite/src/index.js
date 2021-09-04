const DOMNodeCollection = require("./dom_node_collection");

window.functions = [];
let loaded = false;
window.addEventListener("load", () => {
  loaded = true;
  window.functions.forEach(func => {
    func();
  });
});

window.$l = (arg) => {
  let HTMLArr;
  if (typeof arg === "string") {
    const nodeList = document.querySelectorAll(arg);
    HTMLArr = [].slice.call(nodeList);
    const newNodes = new DOMNodeCollection(HTMLArr);
    return newNodes;
  } else if (arg instanceof HTMLElement) {
    HTMLArr = [arg];
    const newNodes = new DOMNodeCollection(HTMLArr);
    return newNodes;
  } else if (arg instanceof Function) {
    if (loaded) {
      arg();
    } else {
      window.functions.push(arg);
    }
  }
};

$l.extend = (...args) => {
  for (let i = 1; i < args.length; i++) {
   Object.keys(args[i]).forEach(key => {
      args[0][`${key}`] = args[i][`${key}`];
    });
  }
  return args[0];
};

$l.ajax = (options) => {
  let defaults = {
    success: () => {},
    error: () => {},
    url: "",
    method: "GET",
    data: {},
    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
  };
  this.extend(defaults, options);
  const xhr = new XMLHttpRequest();

  xhr.responseType = defaults.contentType;

  xhr.open(defaults.method, defaults.url);
  xhr.onload = function () {
    if (xhr.status === 200) {
      defaults.success(JSON.parse(xhr.response));
    } else {
      defaults.error(JSON.parse(xhr.response));
    }
  }

  const optionalData = defaults.data;
  xhr.send(optionalData);

};




