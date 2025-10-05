function appendScript(src, onload) {
    const scriptElement = document.createElement("script");
    scriptElement.src = base + src;
    scriptElement.onload = onload;
    document.head.appendChild(scriptElement);
}

function appendStyleSheet(href) {
    const styleSheet = document.createElement("style");
    styleSheet.href = href;
    document.head.appendChild(styleSheet);
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