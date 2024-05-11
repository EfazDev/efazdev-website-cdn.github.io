var stored_css = ""

chrome.tabs.onUpdated.addListener(function (tabId, details, tab) {
    try {
        const storage = chrome.storage.sync;
        storage.get(["efazRobloxTheme"], function (items) {
            var enabled = true;
            var remoteStyles = false;

            if (items["efazRobloxTheme"]) {
                if (typeof (items["efazRobloxTheme"]["enabled"]) == "boolean") { enabled = items["efazRobloxTheme"]["enabled"] };
                if (typeof (items["efazRobloxTheme"]["remoteStyles"]) == "boolean") { remoteStyles = items["efazRobloxTheme"]["remoteStyles"] };
            }
            if (enabled == true) {
                if (tab.url) {
                    if (tab.url.startsWith("https://www.roblox.com")) {
                        if (remoteStyles == true) {
                            function injectCSS() {
                                if (document.getElementById("efaz-roblox-theme") == null) {
                                    const style = document.createElement("link")
                                    style.id = "efaz-roblox-theme";
                                    style.rel = "stylesheet";
                                    style.type = "text/css";
                                    style.media = "all";
                                    style.href = "https://cdn.efaz.dev/cdn/extensions/efaz-roblox-theme/chromeExtension/theme.css"
                                    document.head.append(style)
                                }
                            }
                            chrome.scripting.executeScript({
                                target: { tabId: tabId, allFrames: true },
                                func: injectCSS
                            })
                        } else {
                            function injectCSS(css) {
                                if (document.getElementById("efaz-roblox-theme") == null) {
                                    if (css) {
                                        const style = document.createElement("style")
                                        style.id = "efaz-roblox-theme";
                                        style.media = "all";
                                        style.innerHTML = css
                                        document.head.append(style)
                                    }
                                }
                            }
                            if (stored_css) {
                                chrome.scripting.executeScript({
                                    target: { tabId: tabId, allFrames: true },
                                    func: injectCSS,
                                    args: [stored_css]
                                })
                            } else {
                                fetch("theme.css").then(res => { return res.text() }).then(fetched => {
                                    stored_css = fetched
                                    chrome.scripting.executeScript({
                                        target: { tabId: tabId, allFrames: true },
                                        func: injectCSS,
                                        args: [fetched]
                                    })
                                })
                            }
                        }
                    }
                }
            }
        });
    } catch (err) {
        console.log("Failed to add font settings to this tab.")
    }
});

chrome.runtime.onInstalled.addListener(() => {
    const storage = chrome.storage.sync;
    fetch("settings.json").then(setting_res => {
        return setting_res.json()
    }).then(settings => {
        var name = settings["name"]
        storage.get([name], async function (items) {
            if (items[name]) {
                if (items[name]["thanks"] == true) {
                    console.log("The extension might have updated!")
                    return
                } else {
                    items[name]["thanks"] = true
                    chrome.tabs.create({
                        url: chrome.runtime.getURL("thank_you.html")
                    })
                    await storage.set(items);
                }
            }
        });
    })
});