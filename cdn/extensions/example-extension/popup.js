const storage = chrome.storage.sync
var system_settings = {}

async function loopThroughArrayAsync(array, callback) {
    var generated_keys = Object.keys(array);
    for (a = 0; a < generated_keys.length; a++) {
        var key = generated_keys[a]
        var value = array[key]
        await callback(key, value)
    }
}

function loopThroughArray(array, callback) {
    var generated_keys = Object.keys(array);
    for (a = 0; a < generated_keys.length; a++) {
        var key = generated_keys[a]
        var value = array[key]
        callback(key, value)
    }
}

async function saveData() {
    storage.get([system_settings["name"]], async function (items) {
        if (!(items[system_settings["name"]])) {
            items[system_settings["name"]] = {}
        }
        await loopThroughArrayAsync(system_settings["settings"], async (key, val) => {
            if (val["type"] == "checkbox") {
                items[system_settings["name"]][key] = document.getElementById(key).checked
            } else {
                items[system_settings["name"]][key] = document.getElementById(key).value
            }
        });
        await storage.set(items, () => {
            alert("Saved data!")
        });
    });
}

async function loadChanges() {
    fetch("settings.json").then(setting_res => {
        return setting_res.json()
    }).then(settings => {
        system_settings = settings
        storage.get([system_settings["name"]], function (items) {
            if (Object.keys(system_settings["settings"]).length == 1) {
                document.getElementById("extensionSettings").remove()
            } else {
                loopThroughArray(system_settings["settings"], (key, val) => {
                    if (document.getElementById(key) == null) {
                        var generated_html_element = `<label for="${key}">${val["text"]}: <input type="${val["type"]}" id="${key}" name="${key}"></label>`
                        var beforeElement = document.getElementById("reviewDetails")
                        if (val["reset"] == true) {
                            generated_html_element = `${generated_html_element} <button id="reset_${key}">Reset!</button>`
                        }
                        generated_html_element = `${generated_html_element}<br>`
                        beforeElement.outerHTML = `${generated_html_element}${document.getElementById("reviewDetails").outerHTML}`
                    }
                    var selected = val["default"]
                    if (items[system_settings["name"]]) {
                        if (!(typeof(items[system_settings["name"]][key]) == "undefined")) {
                            selected = items[system_settings["name"]][key]
                        }
                    }
                    if (!(typeof (selected) == "undefined")) {
                        if (document.getElementById(key)) {
                            var main_selection = document.getElementById(key)
                            if (val["type"] == "checkbox") {
                                main_selection.checked = selected
                            } else {
                                main_selection.value = selected
                            }
                        }
                    }
                    if (val["reset"] == true) {
                        if (document.getElementById(`reset_${key}`)) {
                            var button = document.getElementById(`reset_${key}`)
                            button.addEventListener("click", () => {
                                var main_selection = document.getElementById(key)
                                if (val["type"] == "checkbox") {
                                    main_selection.checked = val["default"]
                                } else {
                                    main_selection.value = val["default"]
                                }
                            })
                        }
                    }
                })
            }
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
            if (window.location.href.includes("resize=true")) {
                document.getElementById("css").innerHTML = `
                p, label, em {
                    font-size: medium;
                    text-align: center;
                    display: block;
                }
                h1 {
                    font-size: xx-large;
                }
                li {
                    display: inline-block;
                    height: 24px;
                    width: 24px;
                    padding: 10px;
                }
                .resize-img {
                    height: 24px;
                    width: 24px;
                }
                ul {
                    padding-left: 0;
                    display: flex !important;
                    justify-content: center;
                }
        
                button {
                    border: 1px solid white;
                    border-radius: 8px;
                    background-color: #00b1ff;
                    color: rgb(255, 255, 255);
                    font-family: arialrounded;
                }
        
                input {
                    border: 1px solid white;
                    border-collapse: collapse;
                    text-align: center;
                    margin-left: auto;
                    border-radius: 8px;
                    background-color: #00b1ff;
                    color: rgb(255, 255, 255);
                    vertical-align: middle;
                    justify-content: center;
                    font-family: arialrounded;
                    margin-right: auto;
                }
        
                a {
                    color: #4295f5;
                }
                `
                const style = document.createElement("link")
                style.id = "resize-to-full-screen";
                style.rel = "stylesheet";
                style.type = "text/css";
                style.media = "all";
                style.href = "https://cdn.efaz.dev/cdn/other/htmlUI.css"
                document.head.append(style)
            }
        })
    })
}

window.onload = loadChanges