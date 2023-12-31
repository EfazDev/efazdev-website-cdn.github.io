const storage = chrome.storage.sync

async function saveData() {
    const formData = { 
        "enabled": document.getElementById("enableExtension").checked, 
        "color": document.getElementById("customColor").value, 
        "groupsIncluded": document.getElementById("includeGroups").checked, 
        "allowedAlerts": document.getElementById("allowAlertMessages").checked,
        "verifiedPrompt": document.getElementById("verifiedPrompt").checked,
        "defaultPrompt": document.getElementById("defaultPrompt").checked
    }
    await storage.set({ "verified_checkmark_settings": formData }, () => {
        alert("Saved data!")
    });
}

async function resetColorInput1() {
    document.getElementById("customColor").value = "#0066FF";
}

async function loadChanges(event) {
    storage.get(["verified_checkmark_settings"], function (items) {
        var enabled = true
        var custom_color = "#0066FF"
        var group_included = false
        var allowed_alerts = true
        var verified_prompt = true
        var default_prompt = false
        if (items["verified_checkmark_settings"]) {
            var settings = items["verified_checkmark_settings"];
            if (typeof(settings["enabled"]) == "boolean") { enabled = settings["enabled"] };
            if (typeof(settings["color"]) == "string" && /^#[0-9A-F]{6}$/i.test(settings["color"])) { custom_color = settings["color"] };
            if (typeof(settings["groupsIncluded"]) == "boolean") { group_included = settings["groupsIncluded"] };
            if (typeof(settings["allowedAlerts"]) == "boolean") { allowed_alerts = settings["allowedAlerts"] };
            if (typeof(settings["verifiedPrompt"]) == "boolean") { verified_prompt = settings["verifiedPrompt"] };
            if (typeof(settings["defaultPrompt"]) == "boolean") { default_prompt = settings["defaultPrompt"] };
        }
        document.getElementById("enableExtension").checked = enabled;
        document.getElementById("customColor").value = custom_color;
        document.getElementById("includeGroups").checked = group_included;
        document.getElementById("allowAlertMessages").checked = allowed_alerts;
        document.getElementById("verifiedPrompt").checked = verified_prompt;
        document.getElementById("defaultPrompt").checked = default_prompt;
    });
    const submitButton = document.getElementById("submitbutton");
    submitButton.addEventListener("click", saveData);

    const resetColorButton = document.getElementById("resetcolorbutton");
    resetColorButton.addEventListener("click", resetColorInput1);

    fetch("manifest.json").then(man_res => {
        return man_res.json()
    }).then(man_json => {
        var extension_name = man_json["name"]
        var extension_version = man_json["version"]
        var extension_icon = man_json["icons"]["128"]

        document.getElementById("extens_name").innerHTML = `Extension Name: ${extension_name} ${`<img src="${extension_icon}" height="10" width="10">`}`
        document.getElementById("extens_vers").innerHTML = `v${extension_version}`
    })
}

window.onload = function () {
    loadChanges()
}