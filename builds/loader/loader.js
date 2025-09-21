const scripts = [
'/src/SBM/index.js', 
'/src/SBM/utils.js', 
'/src/SBM/collision.js', 
'/src/SBM/objects.js', 
'/src/SBM/entities.js', 
'/src/SBM/player.js', 
'/src/SBM/controls.js', 
'/src/SBM/init.js', 
'/src/SBM/main.js', 
];

scripts.forEach((script) => {
    const scriptElement = document.createElement("script");
    scriptElement.src = script;
    document.body.appendChild(scriptElement);
});

console.log("loaded");
