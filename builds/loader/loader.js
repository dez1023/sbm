const base = "/src/SBM/";
const scripts = [
'scripts/index.js', 
'scripts/utils.js', 
'scripts/collision.js', 
'scripts/objects.js', 
'scripts/entities.js', 
'scripts/player.js', 
'scripts/camera.js', 
'scripts/controls.js', 
'scripts/init.js', 
'scripts/main.js', 
];
function appendScript(src, onload) {
    const scriptElement = document.createElement("script");
    scriptElement.src = base + src;
    scriptElement.onload = onload;
    document.head.appendChild(scriptElement);
}

function appendStyleSheet(href) {
    const styleSheet = document.createElement("link");
    console.log(href);
    styleSheet.rel = "stylesheet";
    styleSheet.href = base+href;
    document.head.prepend(styleSheet);
}

function scriptChain() {
    const script = scripts.shift();
    if (!script) {
        return;
    }
    console.log(script);
    let loaded = false;
    appendScript(script, function () {
        if (!loaded) {
            loaded = true;
            scriptChain();
        }
    });
}

scriptChain();
appendStyleSheet('css/style.css');
