class DOMNodeCollection {
  constructor(arr) {
    this.arr = arr;
  }

  html(string){
    if (!string) {
      return this.arr[0].innerHTML;
    } else {
      this.arr.forEach(el => {
        el.innerHTML = string;
      });
    }
  }

  empty() {
    // this.arr.forEach(el => {
    //   el.innerHTML = "";
    // });
    this.html(" ");
  }

  append(arg) {
    let args = [];

    if (typeof arg === "string") {
      args.push(document.createElement(arg));
    } else if (arg instanceof HTMLElement) {
      args.push(arg);
    } else if (arg instanceof DOMNodeCollection) {
      args = arg.arr;
    }

    this.arr.forEach(el => {
      args.forEach(newEl => {
        debugger
        el.innerHTML = el.innerHTML + newEl.outerHTML;
      });
    });
    debugger
  }

  attr(attrName, value) {
    if (!value) {
      debugger
      return this.arr[0].attributes.attrName;
    } else {
      this.arr.forEach(el => {
        el.attributes.attrName = value;
      });
    }
  }

  addClass(newClass) {
    this.arr.forEach(el => {
      const classes = el.className.concat(` ${newClass}`);
      el.className = classes;
    });
  }

  removeClass(deletedClass) {
    if (!deletedClass) {
      this.arr.forEach(el => {
        el.className = "";
      });
    } else {
      this.arr.forEach(el => {
        const currentClasses = el.className;
        let classArr = currentClass.split(' ');
        let classIdx = classArr.indexOf(deletedClass);
        classArr.splice(classIdx, 1);
        el.className = classArr.join(' ');
      });
    }
  }

  children() {
    const children = [];
    this.arr.forEach(el => {
      const HTMLArr = [].slice.call(el.children);
      children.concat(HTMLArr);
    });
    return new DOMNodeCollection(children);
  }

  parent() {
    const parents = [];
    this.arr.forEach(el => {
      const parentHTML = el.parentElement;
      if (!parents.includes(parentHTML)) parent.push(parentHTML);
    });
    return new DOMNodeCollection(parents);
  }

  find(arg) {
    const results = [];
    this.arr.forEach(el => {
      const argCollection = el.querySelectorAll(arg);
      const found = [].slice.call(argCollection);
      found.forEach(el => {
        if (!results.includes(el)) results.push(el);
      });
    });
    return new DOMNodeCollection(results);
  }

  remove() {
    this.arr.forEach(el => {
      el.parentNode.removeChild(el);
    });
  };

  on(eventType, callback) {
    this.arr.forEach(el => {
      el.addEventListener(eventType, callback);
      el.callbacks = { eventType: callback };
    });
  }

  off(eventType) {
    this.arr.forEach(el => {           
      el.removeEventListener(eventType, el.callbacks.eventType);
    });
  }



}

module.exports = DOMNodeCollection;

//iterate, for each node, grab it's parent, then on that parent
//call remove children, invoked with the current node in iteration

