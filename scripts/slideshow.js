var Slideshow = function(options){
    var self = this;

    var container = null;
    var imageNodes = null;
    var previousControl = null;
    var nextControl = null;
    var settings = null;

    var defaults = {
        tag: "img",
        containerId: "images",
        previousControlId: "previous",
        nextControlId: "next",
        onSlideClick: null,
        onNext: null,
        onPrevious: null,          
    }

    var stepNext = function(silence){
        //Take the first image and move it to the end of the node
        container.appendChild(imageNodes[0]);

        if (!silence && settings.onNext) {
            settings.onNext();
        } 
    }

    var stepPrevious = function(silence){
        //Take the last image and move it to the beginning of the node
        container.insertBefore(imageNodes[imageNodes.length - 1], imageNodes[0]);

        if (!silence && settings.onPrevious) {
            settings.onPrevious();
        } 
    }
    
    var keyDown = function(e) {
        if (e.keyCode === 39) {
            stepNext();
        } else if (e.keyCode === 37) {
            stepPrevious();
        }
    }
    
    var slideClick = function(e, silence) {
        if (!e.target.nodeName === settings.tag.toUpperCase()) {
            return;
        }
        
        //Even if we move multiple times, only fire one onMove handler
        var fired = false;
            
        while(self.indexOf(e.target) !== 2) {
            if (self.indexOf(e.target) < 2) {
                stepPrevious(fired);
                fired = true;
            }
            else if (self.indexOf(e.target) > 2) {
                stepNext(fired);
                fired = true;
            }
        }

        if (!silence && settings.onSlideClick) {
            settings.onSlideClick(e);
        }             
    }

    self.indexOf = function(node) {
        for (var i = 0, j = imageNodes.length; i < j; i++) {
            if (imageNodes[i] === node) return i;
        }
        return null;
    }

    self.addNode = function(node, position) {
        if (position >= 0 && position < imageNodes.length) {
            container.insertBefore(node, imageNodes[position])
        } else {
            container.appendChild(node);                
        }
    }

    self.removeNode = function(node) {
        try {
            container.removeChild(node);  
        } catch (err) {
            return;
        }
    }

    self.next = function(steps) {
        var steps = (steps > 0) ? steps : 1;
        var fired = false;
        for (var i = 0; i < steps; i++) {
            stepNext(fired);
            fired = true;
        }
    }

    self.previous = function(steps) {
        var steps = (steps > 0) ? steps : 1;
        var fired = false;
        for (var i = 0; i < steps; i++) {
            stepPrevious(fired);
            fired = true;
        }        
    }

    self.remove = function(){
        Util.removeEvent(previousControl, "click", stepPrevious);
        Util.removeEvent(nextControl, "click" , stepNext);
        Util.removeEvent(document, "keydown", keyDown);
    }

    self.settings = function(options) {
        settings = Util.defaults(options || {}, settings);  
    }
            
    var init = (function(options){
        var options = Util.defaults(options || {}, settings || defaults);
        settings = options;

        container = document.getElementById(options.containerId);
        imageNodes = container.getElementsByTagName(options.tag);
        previousControl = document.getElementById(options.previousControlId);
        nextControl = document.getElementById(options.nextControlId);
        
        if (!imageNodes.length > 0) {
            throw "There are no images in the slideshow.";
        }
        
        Util.addEvent(previousControl, "click", function(e){stepPrevious();});
        Util.addEvent(nextControl, "click", function(e){stepNext();});
        Util.addEvent(container, "click", slideClick);
        Util.addEvent(document, "keydown", keyDown);
    })(options)

    return self;
};

// Utility function for clean events in IE 6/7/8. 
var Util = {
    addEvent: function(obj, type, callback) {
        if (!obj.addEventListener) {
            obj.attachEvent("on" + type, function(){ callback(window.event); });

        } else {
            obj.addEventListener(type, callback, false);
        }
    },

    removeEvent: function(obj, type, callback) {
        if (!obj.removeEventListener) {
            obj.detachEvent("on" + type, function(){ callback(window.event); });

        } else {
            obj.removeEventListener(type, callback, false);
        }
    },

    defaults: function(obj, defaults) {
        for (var prop in defaults) {
            if (obj[prop] == null) obj[prop] = defaults[prop];
        }
        return obj;
    }
}