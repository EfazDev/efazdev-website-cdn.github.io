/* 

Efaz's Builder™️ Font Remover
By: EfazDev
Page: https://www.efaz.dev/remove-builder-font

main.js:
    - Watch for new tabs from https://www.roblox.com
    - Get if the user has enabled the extension
    - Inject the insert_css.js file into the loading page.
    - Launches a Thank You page if first time use: [https://www.efaz.dev/thanks]

*/

var stored_css = ""

chrome.webNavigation.onCommitted.addListener(function (details) {
    try {
        const tabId = details.tabId;
        if (details.url.includes("https://www.roblox.com")) {
            const storage = chrome.storage.sync;
            storage.get(["return_roblox_font_settings"], function (items) {
                var enabled = true;
                var remoteStyles = false;
                if (items["return_roblox_font_settings"]) {
                    if (typeof (items["return_roblox_font_settings"]["enabled"]) == "boolean") { enabled = items["return_roblox_font_settings"]["enabled"] };
                    if (typeof (items["return_roblox_font_settings"]["remoteStyles"]) == "boolean") { remoteStyles = items["return_roblox_font_settings"]["remoteStyles"] };
                }
                if (enabled == true) {
                    if (remoteStyles == true) {
                        function injectCSS() {
                            if (document.getElementById("return-roblox-gotham") == null) {
                                const style = document.createElement("link")
                                style.id = "return-roblox-gotham";
                                style.rel = "stylesheet";
                                style.type = "text/css";
                                style.media = "all";
                                style.href = "https://cdn.efaz.dev/cdn/other/reset_roblox_font.css"
                                document.head.append(style)
                            }
                        }
                        chrome.scripting.executeScript({
                            target: { tabId: tabId, allFrames: true },
                            func: injectCSS
                        })
                    } else {
                        function injectCSS(css) {
                            if (document.getElementById("return-roblox-gotham") == null) {
                                if (css) {
                                    const style = document.createElement("style")
                                    style.id = "return-roblox-gotham";
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
                            fetch("change_font.css").then(res => { return res.text() }).then(fetched => {
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
            });
        }
    } catch (err) {
        console.log("Failed to add font settings to this tab.")
    }
});

chrome.runtime.onInstalled.addListener(() => {
    const storage = chrome.storage.sync;
    storage.get(["roblox_font_thanks"], async function (items) {
        if (items["roblox_font_thanks"]) {
            if (items["roblox_font_thanks"]["thanks"] == true) {
                console.log("System might have updated!")
                return
            }
        }
        chrome.tabs.create({
            url: "https://www.efaz.dev/thanks"
        })
        await storage.set({ "roblox_font_thanks": {"thanks": true}});
    });
});