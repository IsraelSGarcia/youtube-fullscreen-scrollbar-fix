// ==UserScript==
// @name         YouTube Fullscreen Scrollbar Fix
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Remove the horizontal scrollbar in YouTube fullscreen mode by injecting CSS and enforcing hidden overflow on key elements.
// @author       ChatGPT
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Inject CSS to hide horizontal overflow for fullscreen elements and the main video player.
    const css = `
        html:-webkit-full-screen,
        body:-webkit-full-screen,
        *:fullscreen,
        *:-webkit-full-screen,
        #movie_player,
        ytd-app {
            overflow-x: hidden !important;
        }
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = css;
    document.head.appendChild(style);

    // Function to enforce the overflow style on the element currently in fullscreen.
    function enforceStyle() {
        const fsElement = document.fullscreenElement ||
                          document.webkitFullscreenElement ||
                          document.mozFullScreenElement ||
                          document.msFullscreenElement;
        if (fsElement) {
            fsElement.style.overflowX = 'hidden';
        }
    }

    // Listen for fullscreen change events.
    document.addEventListener('fullscreenchange', enforceStyle);
    document.addEventListener('webkitfullscreenchange', enforceStyle);
    document.addEventListener('mozfullscreenchange', enforceStyle);
    document.addEventListener('MSFullscreenChange', enforceStyle);

    // Use a MutationObserver to reapply the style if the DOM changes while in fullscreen.
    const observer = new MutationObserver(() => {
        if (document.fullscreenElement || document.webkitFullscreenElement) {
            enforceStyle();
        }
    });
    observer.observe(document.documentElement, { attributes: true, subtree: true });
})();
