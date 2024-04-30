/* 

Efaz's Roblox Theme
By: EfazDev
Page: https://www.efaz.dev/

popup.js:
    - Save Settings such as if the extension is enabled.
    
*/

const storage = chrome.storage.sync

async function saveData() {
    const formData = { 
        "enabled": document.getElementById("enableExtension").checked,
        "remoteStyles": document.getElementById("remoteStyles").checked,
        "overwriteCreateDashboard": document.getElementById("creatorDashboard").checked,
        "overwriteDevForum": document.getElementById("devForum").checked,
        "overwriteOtherSubdomains": document.getElementById("otherSub").checked,
    }
    await storage.set({ "return_roblox_font_settings": formData }, () => {
        alert("Saved data!")
    });
}

async function loadChanges() {
    storage.get(["return_roblox_font_settings"], function (items) {
        var enabled = true;
        var remoteStyles = false;
        var creatorDashboard = true;
        var devForum = true;
        var otherSub = true;
        if (items["return_roblox_font_settings"]) {
            var settings = items["return_roblox_font_settings"];
            if (typeof(settings["enabled"]) == "boolean") { enabled = settings["enabled"] };
            if (typeof(settings["remoteStyles"]) == "boolean") { remoteStyles = settings["remoteStyles"] };
            if (typeof(settings["overwriteCreateDashboard"]) == "boolean") { creatorDashboard = settings["overwriteCreateDashboard"] };
            if (typeof(settings["overwriteDevForum"]) == "boolean") { devForum = settings["overwriteDevForum"] };
            if (typeof(settings["overwriteOtherSubdomains"]) == "boolean") { otherSub = settings["overwriteOtherSubdomains"] };
        }
        document.getElementById("enableExtension").checked = enabled;
        document.getElementById("remoteStyles").checked = remoteStyles;
        document.getElementById("creatorDashboard").checked = creatorDashboard;
        document.getElementById("devForum").checked = devForum;
        document.getElementById("otherSub").checked = otherSub;
    });
    const submitButton = document.getElementById("submitbutton");
    submitButton.addEventListener("click", saveData);

    fetch("manifest.json").then(man_res => {
        return man_res.json()
    }).then(man_json => {
        var extension_name = man_json["name"]
        var extension_version = man_json["version"]
        var extension_icon = man_json["icons"]["128"]

        document.getElementById("extens_name").innerHTML = `Extension Name: ${extension_name} ${`<img src="${extension_icon}" height="16" width="16" style="vertical-align: middle;">`}`
        document.getElementById("extens_vers").innerHTML = `v${extension_version}`
    })
}

window.onload = loadChanges