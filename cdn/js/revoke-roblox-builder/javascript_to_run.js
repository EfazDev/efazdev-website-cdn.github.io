(function () {
    var enabled = true;
    if (enabled) {
        if (document.getElementById("revoke-roblox-builder")) {
        } else {
            const style = document.createElement("link")
            style.id   = "revoke-roblox-builder";
            style.rel  = "stylesheet";
            style.type = "text/css";
            style.media = "all";
            style.href = "https://cdn.efaz.dev/cdn/other/reset_roblox_font.css"
            document.head.append(style)
        }
    }
})()