function fixUnload() {
        // Is there things still loading, then fake the unload event
        if (document.readyState == 'interactive') {
                function stop() {
                        // Prevent memory leak
                        document.detachEvent('onstop', stop);
                        // Call unload handler
                        unload();
                };
                // Fire unload when the currently loading page is stopped
                document.attachEvent('onstop', stop);
                // Remove onstop listener after a while to prevent the unload function
                // to execute if the user presses cancel in an onbeforeunload
                // confirm dialog and then presses the stop button in the browser
                window.setTimeout(function() {
                        document.detachEvent('onstop', stop);
                }, 0);
        } else {
            if(!window.onunload) window.onunload = unload;
        }
};
function unload() {
      $(document.body).empty();
};
if(Browser.Engine.trident && Browser.Engine.version < 7) window.onunload = unload;
if(Browser.Engine.trident && Browser.Engine.version < 7) window.onbeforeunload = fixUnload;