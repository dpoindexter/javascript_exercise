var Slideshow = (function(){
    var self = this;

    self.container = null;
    self.images = [];
    self.previous = null;
    self.next = null;

    self.stepNext = function(){
        //Take the first image and move it to the end of the node
        self.container.appendChild(self.images[0]);
    }

    self.stepPrevious = function(){
        //Take the last image and move it to the beginning of the node
        self.container.insertBefore(self.images[self.images.length - 1], self.images[0]);
    }

    self.init = function(){
        self.container = document.getElementById("images");
        self.images = container.getElementsByTagName("img");
        self.previous = document.getElementById("previous");
        self.next = document.getElementById("next");
        
        if (!self.images.length > 0) {
            throw "There are no images in the slideshow";
        }
        
        addEvent(self.previous, "click", self.stepPrevious);
        addEvent(self.next, "click" , self.stepNext);
    }

    //Make sure the DOM is ready before collecting all our nodes.
    //Not necessary if the script is loaded at the end of the body tag, but we can't count on that
    addEvent(window, "load", self.init);

    return self;
})();

// Utility function allows us to add events in IE 8- and modern browsers. 
// Naive implementation which doesn't normalize for the event object or standardize a RemoveEventListener API

function addEvent (obj, type, callback) {
    if (!obj.addEventListener) {
        obj.attachEvent("on" + type, callback);

    } else {
        obj.addEventListener(type, callback, false);
    }
}