
scripts.forEach((script) => {
    const scriptElement = document.createElement("script");
    scriptElement.src = script;
    document.body.appendChild(scriptElement);
});

console.log("loaded");