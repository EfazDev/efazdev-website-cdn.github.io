/* 

Efaz's Builder Font Remover
By: EfazDev
Page: https://www.efaz.dev/remove-builder-font

inject.js:
    - Inject the stored or remote stylesheets into the loading page depending on user's settings.

*/

var stored_css = ""
var stored_creator_dashboard_css = ""
var stored_devforum_css = ""

try {
    const storage = chrome.storage.sync;
    storage.get(["return_roblox_font_settings"], function (items) {
        var enabled = true;
        var remoteStyles = false;
        var overwriteCreateDashboard = true;
        var devForum = true;
        var otherSub = true;

        if (items["return_roblox_font_settings"]) {
            if (typeof (items["return_roblox_font_settings"]["enabled"]) == "boolean") { enabled = items["return_roblox_font_settings"]["enabled"] };
            if (typeof (items["return_roblox_font_settings"]["remoteStyles"]) == "boolean") { remoteStyles = items["return_roblox_font_settings"]["remoteStyles"] };
            if (typeof (items["return_roblox_font_settings"]["overwriteCreateDashboard"]) == "boolean") { overwriteCreateDashboard = items["return_roblox_font_settings"]["overwriteCreateDashboard"] };
            if (typeof (items["return_roblox_font_settings"]["overwriteDevForum"]) == "boolean") { devForum = items["return_roblox_font_settings"]["overwriteDevForum"] };
            if (typeof (items["return_roblox_font_settings"]["overwriteOtherSubdomains"]) == "boolean") { otherSub = items["return_roblox_font_settings"]["overwriteOtherSubdomains"] };
        }
        if (enabled == true) {
            var tab = window.location
            if (tab.href) {
                var urlObj = window.location
                if (urlObj.hostname == "www.roblox.com") {
                    if (remoteStyles == true) {
                        function injectCSS() {
                            if (document.getElementById("return-roblox-gotham") == null) {
                                const style = document.createElement("link")
                                style.id = "return-roblox-gotham";
                                style.rel = "stylesheet";
                                style.type = "text/css";
                                style.media = "all";
                                style.href = "https://cdn.efaz.dev/cdn/extensions/remove-builder-font/chromeExtension/change_font.css"
                                document.head.append(style)
                            }
                        }
                        injectCSS()
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
                            injectCSS(stored_css)
                        } else {
                            fetch(chrome.runtime.getURL("change_font.css")).then(res => { return res.text() }).then(fetched => {
                                stored_css = fetched
                                injectCSS(fetched)
                            })
                        }
                    }
                } else if (urlObj.hostname == "devforum.roblox.com") {
                    if (devForum == true) {
                        function injectCSS(css, tries) {
                            if (css) {
                                var new_tries = 0
                                if (tries) {
                                    new_tries = tries
                                }
                                if (document.querySelector("body > discourse-assets > discourse-assets-stylesheets > link:nth-child(30)")) {
                                    var selector = document.querySelector("body > discourse-assets > discourse-assets-stylesheets > link:nth-child(30)");
                                    if (selector.href.includes("devforum.roblox.com")) {
                                        selector.remove()
                                        if (css) {
                                            if (remoteStyles == true) {
                                                const style = document.createElement("link")
                                                style.id = "return-roblox-gotham";
                                                style.rel = "stylesheet";
                                                style.type = "text/css";
                                                style.media = "all";
                                                style.href = "https://cdn.efaz.dev/cdn/extensions/remove-builder-font/chromeExtension/devforum_font.css"
                                                document.head.append(style)
                                            } else {
                                                const style = document.createElement("style")
                                                style.id = "return-roblox-gotham";
                                                style.media = "all";
                                                style.innerHTML = css
                                                document.head.append(style)
                                            }
                                        }
                                    } else {
                                        setTimeout(() => { injectCSS(css, new_tries + 1) }, 100)
                                    }
                                } else {
                                    var observer = new MutationObserver(function (m) {
                                        if (document.querySelector("body > discourse-assets > discourse-assets-stylesheets > link:nth-child(30)")) {
                                            injectCSS(css, new_tries + 1)
                                        }
                                    });
                                    observer.observe(document.head, { childList: true });
                                }
                            }
                        }
                        if (stored_devforum_css) {
                            injectCSS(stored_devforum_css)
                        } else {
                            fetch(chrome.runtime.getURL("devforum_font.css")).then(res => { return res.text() }).then(fetched => {
                                stored_devforum_css = fetched
                                injectCSS(fetched)
                            })
                        }
                    }
                } else if (urlObj.hostname == "create.roblox.com") {
                    if (overwriteCreateDashboard == true) {
                        function injectCSS(css, tries) {
                            if (css) {
                                var new_tries = 0
                                if (tries) {
                                    new_tries = tries
                                }
                                if (document.querySelector("head > style:nth-child(1)")) {
                                    var selector = document.querySelector("head > style:nth-child(1)");
                                    if (selector.sheet.cssRules[7].cssText.includes("font-face")) {
                                        if (selector.innerHTML == "") {
                                            selector.innerHTML = css
                                        }
                                    } else {
                                        setTimeout(() => { injectCSS(css, new_tries + 1) }, 100)
                                    }
                                } else {
                                    var selectors = document.head.getElementsByTagName("style")
                                    var found = false
                                    for (q = 0; q < selectors.length; q++) {
                                        var selector = selectors[q]
                                        if (selector.getAttribute("data-emotion") == "web-blox-css-mui-global") {
                                            if (selector.innerHTML == "") {
                                                selector.innerHTML = css
                                                found = true
                                            }
                                        }
                                    }
                                    if (found == false) {
                                        setTimeout(() => { injectCSS(css, new_tries + 1) }, 100)
                                    }
                                }
                            }
                        }
                        if (stored_creator_dashboard_css) {
                            injectCSS(stored_creator_dashboard_css)
                        } else {
                            fetch(chrome.runtime.getURL("global_font.css")).then(res => { return res.text() }).then(fetched => {
                                stored_creator_dashboard_css = fetched
                                injectCSS(fetched)
                            })
                        }
                    }
                } else if (urlObj.hostname.includes(".roblox.com")) {
                    if (otherSub == true && !(urlObj.hostname.includes("create.roblox.com"))) {
                        function injectCSS(css, tries) {
                            if (css) {
                                var new_tries = 0
                                if (tries) {
                                    new_tries = tries
                                }
                                if (document.querySelector("head > style:nth-child(1)")) {
                                    var selector = document.querySelector("head > style:nth-child(1)");
                                    if (selector.sheet.cssRules[7].cssText.includes("font-face")) {
                                        if (selector.innerHTML == "") {
                                            selector.innerHTML = css
                                        }
                                    } else {
                                        setTimeout(() => { injectCSS(css, new_tries + 1) }, 100)
                                    }
                                } else {
                                    var selectors = document.head.getElementsByTagName("style")
                                    var found = false
                                    for (q = 0; q < selectors.length; q++) {
                                        var selector = selectors[q]
                                        if (selector.getAttribute("data-emotion") == "web-blox-css-mui-global") {
                                            if (selector.innerHTML == "") {
                                                selector.innerHTML = css
                                                found = true
                                            }
                                        }
                                    }
                                    if (found == false) {
                                        setTimeout(() => { injectCSS(css, new_tries + 1) }, 100)
                                    }
                                }
                            }
                        }
                        if (stored_creator_dashboard_css) {
                            injectCSS(stored_creator_dashboard_css)
                        } else {
                            fetch(chrome.runtime.getURL("global_font.css")).then(res => { return res.text() }).then(fetched => {
                                stored_creator_dashboard_css = fetched
                                injectCSS(fetched)
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