# componentLoader
This custom component loader for knockoutjs removes the need to preregister components. Instead it loads them by naming convention using requirejs. The template part is loaded by using the text plugin for requirejs. Like so...

    <div data-bind='component: "pages/stuff/edit"'></div>

Naturally there need to exist an .html file and a .js file at the given path. The viewmodel part, can be a function or an object. If it is a function, any provided parameters will be given as an argument. If an object, the component loader will look for a function called initialize. If it exists, it will be called with the parameters as arguments.

    <div data-bind='component: {name: "pages/stuff/edit", params: {title: "make it so"}}'></div>
    
This approach is especially handy when writing a SPA, with several viewmodel/template pairs, that should be loaded onto the same area.

    <body>
        <div class="main" data-bind="component: main"></div>
    </body
    
In this case the main value would be an observable that changes depending on for instance menu selections. We wouldn't have to register new pages as we create them, only make sure the observable is updated with the path to where they are located.

To use this module, just require it, and run the returned function with knockout as parameter.

    define(["knockout", "componentLoader"], function(ko, loader) {
        loader(ko);
    });