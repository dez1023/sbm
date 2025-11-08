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
  const SBMbody = document.createElement("div");
  const loadUi = document.createElement("span");
  const scriptCount = scripts.length;
  loadUi.className = "SBMui outlineShadow";
  SBMbody.id = "SBMbody";
  loadUi.id = "loadUi";
  document.body.appendChild(loadUi);
  document.documentElement.appendChild(SBMbody);

function updateLoadUi() {
    const done = scripts.length == 0;
    loadUi.textContent = `${done ? "loaded" : "loading"} (${scriptCount - scripts.length} out of ${scriptCount}) scripts`;
    if (done) {
        const anim = loadUi.animate([{ transform: "none" }, { transform: "rotateY(270deg)" }],
            { duration: 500, fill: "forwards", delay: 1000, })

        anim.finished.then(() => {
            loadUi.remove();
        })
    }
}

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
    styleSheet.href = base + href;
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
            updateLoadUi();
            scriptChain();
        }
    });
}

scriptChain();
appendStyleSheet('css/style.css');
