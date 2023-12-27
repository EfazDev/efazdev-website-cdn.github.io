var latest_code = ""
var ready = true

chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
    try {
        const tabId = details.tabId;
        if (details.url.includes("https://www.roblox.com")) {
            const storage = chrome.storage.sync;
            storage.get(["verified_checkmark_settings"], function (items) {
                var enabled = true
                var custom_color = "#0066FF"
                var group_included = false
                var allowed_alerts = true
                if (items["verified_checkmark_settings"]) {
                    if (typeof(items["verified_checkmark_settings"]["enabled"]) == "boolean") { enabled = items["verified_checkmark_settings"]["enabled"] };
                    if (typeof(items["verified_checkmark_settings"]["color"]) == "string" && /^#[0-9A-F]{6}$/i.test(items["verified_checkmark_settings"]["color"])) { custom_color = items["verified_checkmark_settings"]["color"] };
                    if (typeof(items["verified_checkmark_settings"]["groupsIncluded"]) == "boolean") { group_included = items["verified_checkmark_settings"]["groupsIncluded"] };
                    if (typeof(items["verified_checkmark_settings"]["allowedAlerts"]) == "boolean") { allowed_alerts = items["verified_checkmark_settings"]["allowedAlerts"] };
                }
                if (enabled == true) {
                    function setVerifiedSettings(data) {
                        window.verifiedCheckmarkSettings = data
                    }
                    chrome.scripting.executeScript({
                        target: { tabId: tabId, allFrames: true },
                        func: setVerifiedSettings,
                        args : [ {"enabled": enabled, "color": custom_color, "groupsIncluded": group_included, "allowedAlerts": allowed_alerts} ]
                    });

                    if (ready == true) {
                        fetch("javascript_to_run.js").then(res => {
                            return res.text()
                        }).then(code => {
                            ready = false
                            chrome.scripting.executeScript({
                                target: { tabId: tabId, allFrames: true },
                                files: ["javascript_to_run.js"],
                            });
                        }).catch(err => {
                            ready = true
                            console.error(`Error while getting code from system! ${err.message}`)
                        })
                    } else {
                        chrome.scripting.executeScript({
                            target: { tabId: tabId, allFrames: true },
                            files: ["javascript_to_run.js"],
                        });
                    }
                }
            });
        }
    } catch (err) {
        console.log("Failed to add verified badge to this tab.")
    }
});