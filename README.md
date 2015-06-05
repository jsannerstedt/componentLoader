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
    
## custom components
The customComponents module is another small piece of extension for knockout. When using custom tags

    <cstm-my-awesome-component></my-awesome-component>

it looks for a pre defined prefix and then replaces the "-" part with "/". Together with the component loader, we can now use custom tags that points to a path of an existing component. We can set the base path and the prefix by passing an options object to the function.
    define(["knockout", "customComponents"], function(ko, customComponents) {
        customComponents(ko, {
            componentDir = "customComponents",
            componentPrefix = "awesome"
        });
    });
    
    
## handle hash change
This simple function takes a callback that will be invoked with the path part of a "hash url" and a parameters object.

www.myawesomesite.com#customer/edit?id=123 will result in the callback being called with "customer/edit", {id:123}.
  
Now if we tie this together with the componentLoader, we can have a basic spa app with several pages, required by just switching the hash part of the url.
