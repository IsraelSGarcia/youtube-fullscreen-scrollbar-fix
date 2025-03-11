# YouTube Fullscreen Scrollbar Fix (Combined Approach)

This is a Tampermonkey script designed to fix the horizontal scrollbar issue that appears when viewing YouTube videos in fullscreen mode. The script works by injecting custom CSS and applying JavaScript to manage the overflow of key elements during fullscreen playback, ensuring that no horizontal scrollbar appears, providing a cleaner and more immersive viewing experience.

## Table of Contents
- [Installation](#installation)
- [How It Works](#how-it-works)
- [Code Explanation](#code-explanation)
  - [Injected CSS](#injected-css)
  - [Enforcing the Overflow Style](#enforcing-the-overflow-style)
  - [Event Listeners](#event-listeners)
  - [Mutation Observer](#mutation-observer)
- [License](#license)
- [Changelog](#changelog)

## Installation

### Requirements:
- **Tampermonkey**: You must have Tampermonkey or a similar userscript manager installed in your browser.

#### Steps to Install:
1. **Install Tampermonkey** (if you haven’t already):
   - Go to [Tampermonkey's official website](https://www.tampermonkey.net/) and install it in your browser (available for Chrome, Firefox, Edge, Safari, and Opera).
   
2. **Install the Script**:
   - Go to the [Tampermonkey Scripts page](https://github.com/your-username/your-repository-name/raw/main/youtube-fullscreen-scrollbar-fix.user.js) (replace `your-username` and `your-repository-name` with your actual GitHub username and repository name).
   - Click the link, and Tampermonkey will prompt you to install the script.
   - Alternatively, you can copy and paste the code into a new script in Tampermonkey.

3. **Enjoy**:
   - The script will automatically run when you open YouTube. It will remove the horizontal scrollbar when you're in fullscreen mode.

## How It Works

When you enter fullscreen mode on YouTube, the video player can sometimes create an unwanted horizontal scrollbar, which disrupts the experience. This script addresses that by hiding the horizontal scrollbar using CSS and JavaScript to ensure that key elements are properly styled during fullscreen playback.

The script works in two primary ways:
1. **Injecting custom CSS**: This hides the horizontal overflow on the fullscreen elements.
2. **JavaScript enforcement**: It ensures that the overflow style is applied consistently when the fullscreen mode is activated or changed.

## Code Explanation

Here’s a breakdown of how the code works.

### Injected CSS

The first part of the code injects a block of custom CSS into the page that targets elements involved in fullscreen mode, such as the YouTube video player and the page's root elements. This ensures that the horizontal scrollbar is hidden.

```javascript
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
style.innerHTML = css;
document.head.appendChild(style);
```

- **Targeted Elements**:
  - `html:-webkit-full-screen` and `body:-webkit-full-screen`: These elements handle the full-screen mode on the page.
  - `*:fullscreen` and `*:webkit-full-screen`: These ensure compatibility across various browsers and fullscreen modes.
  - `#movie_player`: This targets YouTube’s main video player.
  - `ytd-app`: This targets YouTube’s root application element.
  
The `overflow-x: hidden !important` rule in the CSS effectively hides any horizontal scrollbar by preventing overflow along the x-axis.

### Enforcing the Overflow Style

This function ensures that the overflow style is correctly applied when the fullscreen mode is activated. It checks if the user has entered fullscreen mode and then enforces the appropriate style on the fullscreen element.

```javascript
function enforceStyle() {
    const fsElement = document.fullscreenElement ||
                      document.webkitFullscreenElement ||
                      document.mozFullScreenElement ||
                      document.msFullscreenElement;
    if (fsElement) {
        fsElement.style.overflowX = 'hidden';
    }
}
```

- **Full-screen detection**: The function uses several properties (`document.fullscreenElement`, `document.webkitFullscreenElement`, etc.) to detect which element is currently in fullscreen mode, ensuring compatibility across different browsers.
- **Enforcing `overflow-x: hidden`**: Once the fullscreen element is identified, the style is applied to ensure the horizontal scrollbar is hidden.

### Event Listeners

The script listens for changes in the fullscreen state to ensure the overflow style is consistently applied when transitioning in and out of fullscreen mode.

```javascript
document.addEventListener('fullscreenchange', enforceStyle);
document.addEventListener('webkitfullscreenchange', enforceStyle);
document.addEventListener('mozfullscreenchange', enforceStyle);
document.addEventListener('MSFullscreenChange', enforceStyle);
```

- **Event Types**: These events are fired when the fullscreen state changes in various browsers. The `enforceStyle` function is called whenever the fullscreen state changes, ensuring that the overflow style is reapplied.

### Mutation Observer

A **MutationObserver** is used to detect changes to the DOM and reapply the overflow style if necessary.

```javascript
const observer = new MutationObserver(() => {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        enforceStyle();
    }
});
observer.observe(document.documentElement, { attributes: true, subtree: true });
```

- **Purpose**: If any part of the DOM changes while the page is in fullscreen mode, the observer ensures that the correct styling is reapplied to prevent any horizontal scrollbar from appearing.
- **`observe` method**: This method watches for any changes to the page’s document (i.e., changes in attributes or subtree of the document), ensuring that the style is correctly applied throughout the browsing session.

## License

This project is licensed under the **GNU General Public License v3.0**. See the [LICENSE](LICENSE) file for more information.

## Changelog

### Version 1.2
- Initial release of the script that fixes the horizontal scrollbar issue in YouTube fullscreen mode.

---

Feel free to open an issue or pull request if you encounter any bugs or want to contribute to the project!