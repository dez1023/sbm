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