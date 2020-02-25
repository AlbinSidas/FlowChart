

function html(str) {
    var range = document.createRange();
    console.log(tagString)
    range.selectNode(document.getElementById("context"));
    var documentFragment = range.createContextualFragment(tagString);
    return documentFragment.childNodes[0];
}


/*
  viewState
    child_views
    element
*/

const ViewState = (elementString, width, height) => {
  
  return {
        element : html(elementString),
        width,
        height,
        childViews : []  
  }
}


const externEventHandler = (viewState) => ({
    setOnClick: (func) => {
      viewState.element.onclick     = func;
    },
    setOnKeyDown: (func) => {
      viewState.element.onkeydown   = func;
    },
    setOnMouseDown: (func) => {
      viewState.element.onmousedown = func;
    }
})

const domHandler = (viewState) => ({
      attach: (child) => {
        viewState.child_views.push(child)
        viewState.element.appendChild(child.render())
      }, 
      addClass: (classname) => {
        viewState.element.classList.add(classname)
      },
      style: (styleStr) => 
      {
        viewState.element.setAttribute('style', styleStr)
      }
});

const coordinated = (viewState) => {
  
  if (!viewState.element) {
    console.error("Trying to manipulate an unexisting element");  
    throw new Error("No Element exception")
  }
  
  return {
    getPosY: ()  => {
      return parseInt(window.getComputedStyle(viewState.element).getPropertyValue('top'))
    },

    getPosYFromBottom: () => {
      return parseInt(window.getComputedStyle(viewState.element).getPropertyValue('bottom'))
    },

    getPosX: () => {
      return parseInt(window.getComputedStyle(viewState.element).getPropertyValue('left'))
    },

    getWidth: () => {
      return viewState.element.offsetWidth
    },

    getHeight: () => {
      return viewState.element.offsetHeight
    },

    setHeight: (height) =>  {
        viewState.height = height;
        viewState.element.style.height = `${height}px`;
    },

    setWidth: (width) => {
        viewState.width = width;
        viewState.element.style.width = `${width}px`
    }
  }
}

export default {coordinated, html, ViewState, domHandler, externEventHandler};
