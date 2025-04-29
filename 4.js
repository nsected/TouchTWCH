(function() {
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        var newJQ = jQuery.noConflict(true);

        var oldJQ = window.jQuery;
        var old$ = window.$;
        window.jQuery = window.$ = newJQ;

        var swipeScript = document.createElement('script');
        swipeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.19/jquery.touchSwipe.min.js';
        swipeScript.onload = function() {
            window.jQuery = oldJQ;
            window.$ = old$;

            newJQ(function() {
                let activePanel = null; // null | "emotelist" | "useroptions"

                const observer = new MutationObserver((mutationsList, observer) => {
                    const emoteList = document.getElementById('emotelist');
                    const userOptions = document.getElementById('useroptions');

                    if (emoteList) {
                        $('#emotelistbtn').click();
                        emoteList.style.display = 'block';
                        emoteList.style.position = 'fixed';
                        emoteList.style.top = '100px';
                        emoteList.style.left = '0px';
                        emoteList.style.transform = 'translateX(-100%)';
                        emoteList.style.transition = 'transform 0.3s ease';
                        emoteList.style.touchAction = 'none';
                        emoteList.style.pointerEvents = 'auto';
                    }

                    if (userOptions) {
                        showUserOptions()
                        userOptions.style.display = 'block';
                        userOptions.style.position = 'fixed';
                        userOptions.style.top = '100px';
                        userOptions.style.right = '0px';
                        userOptions.style.transform = 'translateX(100%)';
                        userOptions.style.transition = 'transform 0.3s ease';
                        userOptions.style.touchAction = 'none';
                        userOptions.style.pointerEvents = 'auto';
                    }

                    if (emoteList || userOptions) {
                        newJQ(document).swipe({
                            swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                                if (direction === 'right') {
                                    if (activePanel === null) {
                                        console.log('Открыть emotelist');
                                        if (emoteList) emoteList.style.transform = 'translateX(0)';
                                        if (userOptions) userOptions.style.transform = 'translateX(100%)';
                                        activePanel = 'emotelist';
                                    } else if (activePanel === 'useroptions') {
                                        console.log('Закрыть useroptions');
                                        if (userOptions) userOptions.style.transform = 'translateX(100%)';
                                        activePanel = null;
                                    }
                                }
                                else if (direction === 'left') {
                                    if (activePanel === null) {
                                        console.log('Открыть useroptions');
                                        if (userOptions) userOptions.style.transform = 'translateX(0)';
                                        if (emoteList) emoteList.style.transform = 'translateX(-100%)';
                                        activePanel = 'useroptions';
                                    } else if (activePanel === 'emotelist') {
                                        console.log('Закрыть emotelist');
                                        if (emoteList) emoteList.style.transform = 'translateX(-100%)';
                                        activePanel = null;
                                    }
                                }
                            },
                            threshold: 20,
                            fingers: 'all'
                        });

                        observer.disconnect();
                    }
                });

                observer.observe(document.body, { childList: true, subtree: true });
            });
        };
        (document.head || document.body).appendChild(swipeScript);
    };
    (document.head || document.body).appendChild(script);
})();
