Slideshow Plugin
================

Initialization
--------------

The easiest way to start a slideshow is to call the `Slideshow` function with the `new` keyword. This will return a `Slideshow` instance with the default settings.

    var slide = new Slideshow();

`Slideshow` expects your markup to have elements for "Next" and "Previous" controls, and an element containing one or more images (or other nodes). You can pass the IDs of these three elements to `Slideshow` in an (optional) object literal argument:

    var slide = new Slideshow({
        containerId: "foo",
        nextControlId: "bar",
        previousControlId: "baz"
    });

By convention, these default to "images", "previous", and "next", respectively. You can also change the type of node within the container element -- for example, if your images are wrapped in anchors -- by including a tag name in the object literal:

    var slide = new Slideshow({
        tag: "a"
    });

The tag setting defaults to "img".


Methods
-------

### Slideshow.next(steps)

Advances the slideshow one or more slides. An optional argument (integer) is a  number of slides to advance at once. Moving multiple steps will trigger the onMoveNext callback only once.

    slide.next(6); //advances the slideshow by six slides

### Slideshow.previous(steps)

Move the slideshow back by one or more slides. An optional argument (integer) is a number of slides to move back at once. Moving multiple steps will trigger the onMovePrevious callback only once.

    slide.previous(2); //moves the slideshow back by two slides

### Slideshow.addNode(node)

Adds the passed node to the slideshow. If the node is already attached to the DOM somewhere else, this method will detach it from its current location, making it a child node of the slideshow container element.

    var newImg = document.getElementById("other");
    slide.addNode(newImg);

### Slideshow.removeNode(node)

Removes the passed node from the slideshow container element, if it is found.

    var oldImg = container.getElementsByTagName("img")[3];
    slide.removeNode(oldImg);

### Slideshow.indexOf(node)

When passed a node, returns the node's current position in the slideshow container. The first image in the container element will return `0`.

    function onSlideClick(e) {
        console.log(slide.indexOf(e.target));
    }

### Slideshow.remove()

Removes all event listeners attached during the creation of that instance of `Slideshow`, effectively removing that instance.

    slide.remove();

### Slideshow.settings(options)

Takes an object literal of options and sets them on the instance. Any settings not passed will keep their previous values, so your object literal only needs to include the options you wish to set. See "Settings" for a list of options.

    slide.settings({
        onNext: function() {
            console.log("Just moved to the next slide!");
        }
    })

Settings
--------

Settings can be set by passing an object literal of options as an argument when creating a new `Slideshow` instance, or by passing an object literal of options to the `settings` method of an existing `Slideshow` instance.

    new Slideshow({
        tag: "img",
        containerId: "imgContainer",
        previousControlId: "prevButton",
        nextControlId: "nextButton",
        onSlideClick: function(e){
            console.log(e.target);
        },
        onNext: function(){
            console.log("Next");
        },
        onPrevious: function(){
            console.log("Previous");
        }
    })

    //or

    slide.settings({
        tag: "img",
        containerId: "imgContainer",
        previousControlId: "prevButton",
        nextControlId: "nextButton",
        onSlideClick: function(e){
            console.log(e.target);
        },
        onNext: function(){
            console.log("Next");
        },
        onPrevious: function(){
            console.log("Previous");
        }
    })

### tag (string)

Defines the tag name of the slides within the container element. Defaults to "img".

### containerId (string)

Defines the ID of the element containing the slides. Defaults to "images".

### previousControlId (string)

Defines the ID of the "Previous" control button. When clicked, the element will cause the slideshow to move back one slide. Defaults to "previous".

### nextControlId (string)

Defines the ID of the "Next" control button. When clicked, the element will cause the slideshow to advance one slide. Defaults to "next".

### onSlideClick (function)

Calls the passed function when one of the slide nodes is clicked. Passes the `event` object as the callback's first argument. There is no default set.

    slide.settings({
        onSlideClick: function(e) {
            console.log(e.target) //logs the node that was clicked
        }
    })

### onNext (function)

Calls the passed function when the slideshow advances. Even if the slideshow advances multiple slides at once, the callback fires a single time. There are no passed arguments. There is no default set.

    slide.settings({
        onNext: function() {
            console.log("Just moved to the next slide!");
        }
    })

### onPrevious (function)

Calls the passed function when the slideshow moves back. Even if the slideshow moves back multiple slides at once, the callback fires a single time. There are no passed arguments. There is no default set.

    slide.settings({
        onPrevious: function() {
            console.log("Just moved to the previous slide!");
        }
    })

Navigation
----------

There are a couple of default ways to change slides. There are two control elements -- a forward and backwards arrow -- that will advance and move the slideshow back, respectively. The left and right keyboard arrows will also advance the slideshow in the direction pressed. Finally, clicking an image will cause that image to center: it will move either left or right until it is in the middle of the visible slides.

The above methods can also be used to move the slideshow programatically.
