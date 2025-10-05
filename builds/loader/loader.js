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
    scriptElement.async = false;
    scriptElement.src = base + src;
    scriptElement.onload = onload;
    scriptElement.setAttribute("defer", "");
    document.head.appendChild(scriptElement);
}

function scriptChain() {
    const script = scripts.shift();
    /*if (script == editing || !script) {
        console.log("[editing]: " + script)
        return;
    }*/
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
