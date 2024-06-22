/* 

Efaz's Builder Font Remover
By: EfazDev
Page: https://www.efaz.dev/remove-builder-font

inject.js:
    - Content script that injects a stylesheet to remove the builder font

*/

var stored_css = ""
var stored_creator_dashboard_css = ""
var stored_devforum_css = ""

function overwriteResourcesUrl(css, trusted, ismain) {
    css = css.replaceAll("https://cdn2.efaz.dev/cdn/remove-builder-font/", trusted)
    return css
}

try {
    const storage = chrome.storage.sync;
    storage.get(["removeBuilderFont"], function (items) {
        var enabled = true;
        var remoteStyles = false;
        var overwriteCreateDashboard = true;
        var devForum = true;
        var otherSub = true;
        var trusted_source = "https://cdn2.efaz.dev/cdn/remove-builder-font/"; /* This is customizable by the user, but they would have to find a fitting url and make sure it's trusted. */

        if (items["removeBuilderFont"]) {
            if (typeof (items["removeBuilderFont"]["enabled"]) == "boolean") { enabled = items["removeBuilderFont"]["enabled"] };
            if (typeof (items["removeBuilderFont"]["remoteStyles"]) == "boolean") { remoteStyles = items["removeBuilderFont"]["remoteStyles"] };
            if (typeof (items["removeBuilderFont"]["overwriteCreateDashboard"]) == "boolean") { overwriteCreateDashboard = items["removeBuilderFont"]["overwriteCreateDashboard"] };
            if (typeof (items["removeBuilderFont"]["overwriteDevForum"]) == "boolean") { devForum = items["removeBuilderFont"]["overwriteDevForum"] };
            if (typeof (items["removeBuilderFont"]["overwriteOtherSubdomains"]) == "boolean") { otherSub = items["removeBuilderFont"]["overwriteOtherSubdomains"] };
            if (typeof (items["removeBuilderFont"]["resourcesUrl"]) == "string") { if (items["removeBuilderFont"]["resourcesUrl"] == "https://cdn.efaz.dev/cdn/extensions/remove-builder-font/resources/") { items["removeBuilderFont"]["resourcesUrl"] = trusted_source; storage.set(items); } trusted_source = items["removeBuilderFont"]["resourcesUrl"] };
        }
        if (enabled == true) {
            var tab = window.location
            if (tab.href) {
                var urlObj = window.location
                if (urlObj.hostname == "www.roblox.com") {
                    if (remoteStyles == true) {
                        function injectCSS() {
                            if (document.getElementById("remove-builder-font") == null) {
                                const style = document.createElement("link")
                                style.id = "remove-builder-font";
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
                            if (document.getElementById("remove-builder-font") == null) {
                                if (css) {
                                    if (!(trusted_source == "https://cdn2.efaz.dev/cdn/remove-builder-font/")) { css = css.replaceAll("https://cdn2.efaz.dev/cdn/remove-builder-font/", trusted_source); }
                                    const style = document.createElement("style")
                                    style.id = "remove-builder-font";
                                    style.media = "all";
                                    style.innerHTML = css
                                    document.head.append(style)
                                }
                            }
                        }
                        if (stored_css) {
                            injectCSS(overwriteResourcesUrl(stored_css, trusted_source, true))
                        } else {
                            fetch(chrome.runtime.getURL("change_font.css")).then(res => { return res.text() }).then(fetched => {
                                stored_css = fetched
                                injectCSS(overwriteResourcesUrl(fetched, trusted_source, true))
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
                                            if (!(trusted_source == "https://cdn2.efaz.dev/cdn/remove-builder-font/")) { css = css.replaceAll("https://cdn2.efaz.dev/cdn/remove-builder-font/", trusted_source); }
                                            if (remoteStyles == true) {
                                                const style = document.createElement("link")
                                                style.id = "remove-builder-font";
                                                style.rel = "stylesheet";
                                                style.type = "text/css";
                                                style.media = "all";
                                                style.href = "https://cdn.efaz.dev/cdn/extensions/remove-builder-font/chromeExtension/devforum_font.css"
                                                document.head.append(style)
                                            } else {
                                                const style = document.createElement("style")
                                                style.id = "remove-builder-font";
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
                            injectCSS(overwriteResourcesUrl(stored_devforum_css, trusted_source))
                        } else {
                            fetch(chrome.runtime.getURL("devforum_font.css")).then(res => { return res.text() }).then(fetched => {
                                stored_devforum_css = fetched
                                injectCSS(overwriteResourcesUrl(fetched, trusted_source))
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
                                if (!(trusted_source == "https://cdn2.efaz.dev/cdn/remove-builder-font/")) { css = css.replaceAll("https://cdn2.efaz.dev/cdn/remove-builder-font/", trusted_source); }
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
                            injectCSS(overwriteResourcesUrl(stored_creator_dashboard_css, trusted_source))
                        } else {
                            fetch(chrome.runtime.getURL("global_font.css")).then(res => { return res.text() }).then(fetched => {
                                stored_creator_dashboard_css = fetched
                                injectCSS(overwriteResourcesUrl(fetched, trusted_source))
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
                                if (!(trusted_source == "https://cdn2.efaz.dev/cdn/remove-builder-font/")) { css = css.replaceAll("https://cdn2.efaz.dev/cdn/remove-builder-font/", trusted_source); }
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
                            injectCSS(overwriteResourcesUrl(stored_creator_dashboard_css, trusted_source))
                        } else {
                            fetch(chrome.runtime.getURL("global_font.css")).then(res => { return res.text() }).then(fetched => {
                                stored_creator_dashboard_css = fetched
                                injectCSS(overwriteResourcesUrl(fetched, trusted_source))
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