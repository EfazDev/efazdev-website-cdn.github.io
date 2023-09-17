if (!(typeof system_json !== 'undefined')) {
    system_json = {}
}

var questions = system_json["questions"]
var modes = system_json["modes"]
var selected_mode = system_json["defaultMode"]

async function get_values() {
    var new_table = {}
    for (let a = 0; a < questions.length; a++) {
        var valueInfo = questions[a]
        var new_obj = document.getElementById(valueInfo["jsonName"] + "_input")
        new_table[valueInfo["jsonName"]] = new_obj.value
    }
    return new_table
}

async function getModeInfo(mode_name) {
    var new_table = { "success": false }
    for (let a = 0; a < modes.length; a++) {
        var newMode = modes[a]
        if (newMode["name"] == mode_name) {
            return { "success": true, "response": newMode }
        }
    }
    return new_table
}

function refreshVariables() {
    questions = system_json["questions"]
    modes = system_json["modes"]
    selected_mode = system_json["defaultMode"]
}

function view_main_menu() {
    var obj1 = document.getElementById("main_menu")
    var obj2 = document.getElementById("success")
    var obj3 = document.getElementById("failed")

    obj1.style = "display: block;"
    obj2.style = "display: none;"
    obj3.style = "display: none;"
}

function returnFromMessageAndClear() {
    for (let a = 0; a < questions.length; a++) {
        var new_obj = document.getElementById(questions[a]["jsonName"] + "_input")
        new_obj.value = ""
    }
    view_main_menu()
}

function view_success_menu(mode) {
    var obj1 = document.getElementById("main_menu")
    var obj2 = document.getElementById("success")
    var obj3 = document.getElementById("failed")

    obj1.style = "display: none;"
    obj2.style = "display: block;"
    obj3.style = "display: none;"

    var obj4 = document.getElementById("message2")
    getModeInfo(mode).then(response => {
        if (response["success"] == true) {
            if (response["response"]["thanksMessage"]) {
                obj4.innerHTML = response["response"]["thanksMessage"]
            } else {
                obj4.innerHTML = "Thanks for submitting your form!"
            }
        } else {
            obj4.innerHTML = "Thanks for submitting your form!"
        }
    })
}

function view_error_menu(text) {
    var obj1 = document.getElementById("main_menu")
    var obj2 = document.getElementById("success")
    var obj3 = document.getElementById("failed")

    obj1.style = "display: none;"
    obj2.style = "display: none;"
    obj3.style = "display: block;"

    var obj4 = document.getElementById("message1")
    obj4.innerHTML = text
}

function set_mode(mode) {
    getModeInfo(mode).then(response => {
        if (response["success"] == true) {
            selected_mode = mode

            if (system_json["showCurrentMode"] && document.getElementById("current_mode")) {
                var obj1 = document.getElementById("current_mode")
                var obj2 = document.getElementById("sendButton")
                obj1.innerHTML = `Current Mode: ${mode}`
                obj2.innerHTML = `Send ${mode}!`
            } else {
                var obj2 = document.getElementById("sendButton")
                obj2.innerHTML = `Send Form!`
            }
        }
    })
}

function on_success_form(args) { }
async function get_xcsrf(args) {
    return null
}

function send_response() {
    get_values().then(values => {
        get_xcsrf(values).then(x_csrf_token => {
            getModeInfo(selected_mode).then(mode_response => {
                if (mode_response["success"] == true) {
                    mode_response = mode_response["response"]
                    var new_formated_values = {}
                    var new_api_url = mode_response["api_url"]
                    var listOfKeysProvided = Object.keys(values);
                    var appliedAtSymbol = false

                    for (let c = 0; c < listOfKeysProvided.length; c++) {
                        var key = listOfKeysProvided[c]
                        var main_val = values[key]
                        for (let d = 0; d < mode_response["formatted"].length; d++) {
                            var main_val2 = mode_response["formatted"][d]
                            if (main_val2["jsonName"] == key) {
                                if (main_val2["in"] == "Body") {
                                    new_formated_values[key] = main_val
                                } else if (main_val2["in"] == "URL") {
                                    if (appliedAtSymbol == false) {
                                        new_api_url = new_api_url + `?${main_val2["jsonName"]}=${main_val}`
                                        appliedAtSymbol = true
                                    } else {
                                        new_api_url = new_api_url + `&${main_val2["jsonName"]}=${main_val}`
                                    }
                                }
                            }
                        }
                    }

                    var converted_json_string = JSON.stringify(new_formated_values)
                    fetch(new_api_url, {
                        "headers": {
                            "accept": "application/json",
                            "accept-language": "en-US,en;q=0.9",
                            "content-type": "application/json",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "x-csrf-token": x_csrf_token
                        },
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": converted_json_string,
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "omit"
                    }).then(res => {
                        if (res.ok) {
                            view_success_menu(selected_mode)
                            on_success_form(values)
                        } else {
                            res.json().then(json => {
                                view_error_menu(json["message"])
                            })
                        }
                    })
                }
            })
        })
    })
}

function start_system() {
    refreshVariables()
    var disabled_system = false
    var title = "Error while loading Form JSON. If you're an visitor, please contact the site owner to manage the JSON correctly."
    if (system_json["title"] == null) {
        disabled_system = true
    } else {
        title = system_json["title"]
    }
    document.body.innerHTML = `
    <div id="main_menu">
        <h1 id="title1">${title}</h1>
    </div>
    <div id="failed" style="display: none;">
        <h1 id="title2">Oops!</h1>
        <p id="message1">{error}</p>
        <br>
        <button type="button" id="returnButton" class="center" onclick="view_main_menu()">Try again!</button>
    </div>
    <div id="success" style="display: none;">
        <h1 id="title3">Success!</h1>
        <p id="message2">Thanks for submitting your form!</p>
        <br>
        <button type="button" id="reloadButton" class="center" onclick="returnFromMessageAndClear()">Do another!</button>
    </div>
    ` /* Clear all objects inside the body and resets to default usable HTML. */

    if (disabled_system == false) {
        try {
            var main_menu = document.getElementById("main_menu")
            for (let a = 0; a < questions.length; a++) {
                var newQuestion = questions[a]
                if (newQuestion["type"] == "Short Response" || newQuestion["type"] == "SR") {
                    var new_html = `<p>${newQuestion["name"]}: <input placeholder="${newQuestion["placeholder"]}" type="text" class="${newQuestion["custom_class"]}" id="${newQuestion["jsonName"]}_input"`
                    if (newQuestion["required"] == true) {
                        new_html = new_html + ` required></input></p>`
                    } else {
                        new_html = new_html + `></input></p>`
                    }
                    main_menu.innerHTML = main_menu.innerHTML + new_html
                } else if (newQuestion["type"] == "Detailed Message" || newQuestion["type"] == "DM") {
                    var new_html = `<p>${newQuestion["name"]}: </p><textarea placeholder="${newQuestion["placeholder"]}" type="text" class="${newQuestion["custom_class"]}" id="${newQuestion["jsonName"]}_input" cols="40" rows="10"`
                    if (newQuestion["required"] == true) {
                        new_html = new_html + ` required></textarea>`
                    } else {
                        new_html = new_html + `></textarea>`
                    }
                    main_menu.innerHTML = main_menu.innerHTML + new_html
                } else if (newQuestion["type"] == "Integer" || newQuestion["type"] == "INT") {
                    var new_html = `<p>${newQuestion["name"]}: <input placeholder="${newQuestion["placeholder"]}" type="number" class="${newQuestion["custom_class"]}" id="${newQuestion["jsonName"]}_input"`
                    if (newQuestion["required"] == true) {
                        new_html = new_html + ` required></input></p>`
                    } else {
                        new_html = new_html + `></input></p>`
                    }
                    main_menu.innerHTML = main_menu.innerHTML + new_html
                } else if (newQuestion["type"] == "Email" || newQuestion["type"] == "EMAIL") {
                    var new_html = `<p>${newQuestion["name"]}: <input placeholder="${newQuestion["placeholder"]}" type="email" class="${newQuestion["custom_class"]}" id="${newQuestion["jsonName"]}_input"`
                    if (newQuestion["required"] == true) {
                        new_html = new_html + ` required></input></p>`
                    } else {
                        new_html = new_html + `></input></p>`
                    }
                    main_menu.innerHTML = main_menu.innerHTML + new_html
                } else if (newQuestion["type"] == "Password" || newQuestion["type"] == "PW") {
                    var new_html = `<p>${newQuestion["name"]}: <input placeholder="${newQuestion["placeholder"]}" type="password" class="${newQuestion["custom_class"]}" id="${newQuestion["jsonName"]}_input"`
                    if (newQuestion["required"] == true) {
                        new_html = new_html + ` required></input></p>`
                    } else {
                        new_html = new_html + `></input></p>`
                    }
                    main_menu.innerHTML = main_menu.innerHTML + new_html
                } else if (newQuestion["type"] == "Time" || newQuestion["type"] == "TIME") {
                    var new_html = `<p>${newQuestion["name"]}: <input placeholder="${newQuestion["placeholder"]}" type="time" class="${newQuestion["custom_class"]}" id="${newQuestion["jsonName"]}_input"`
                    if (newQuestion["required"] == true) {
                        new_html = new_html + ` required></input></p>`
                    } else {
                        new_html = new_html + `></input></p>`
                    }
                    main_menu.innerHTML = main_menu.innerHTML + new_html
                } else if (newQuestion["type"] == "Datetime Local" || newQuestion["type"] == "DTLocal") {
                    var new_html = `<p>${newQuestion["name"]}: <input placeholder="${newQuestion["placeholder"]}" type="datetime-local" class="${newQuestion["custom_class"]}" id="${newQuestion["jsonName"]}_input"`
                    if (newQuestion["required"] == true) {
                        new_html = new_html + ` required></input></p>`
                    } else {
                        new_html = new_html + `></input></p>`
                    }
                    main_menu.innerHTML = main_menu.innerHTML + new_html
                } else if (newQuestion["type"] == "Date" || newQuestion["type"] == "DATE") {
                    var new_html = `<p>${newQuestion["name"]}: <input placeholder="${newQuestion["placeholder"]}" type="date" class="${newQuestion["custom_class"]}" id="${newQuestion["jsonName"]}_input"`
                    if (newQuestion["required"] == true) {
                        new_html = new_html + ` required></input></p>`
                    } else {
                        new_html = new_html + `></input></p>`
                    }
                    main_menu.innerHTML = main_menu.innerHTML + new_html
                } else {
                    var new_html = `<p>${newQuestion["name"]}: Failed to create question. Please ask the owner of this form to correct the question type.</p>"`
                    main_menu.innerHTML = main_menu.innerHTML + new_html
                }
            }
            if (system_json["hideModeSelection"] == false) {
                var new_html = `<p>Modes: `
                for (let b = 0; b < modes.length; b++) {
                    var new_mode = modes[b]
                    new_html = new_html + `<button type="button" id="modeButton" onclick="set_mode('${new_mode["name"]}')">${new_mode["name"]}</button> `
                }
                main_menu.innerHTML = main_menu.innerHTML + new_html
            }
            if (system_json["showCurrentMode"] == true) {
                var new_html = `<p id="current_mode">Current Mode: ${selected_mode}</p><button type="button" id="sendButton" class="center" onclick="send_response()">Send ${selected_mode}!</button>`
                main_menu.innerHTML = main_menu.innerHTML + new_html
            } else {
                var new_html = `<button type="button" id="sendButton" class="center" onclick="send_response()">Send Form!</button>`
                main_menu.innerHTML = main_menu.innerHTML + new_html
            }
            console.log("Successfully created form!")
        } catch (err) {
            console.log("System was disabled due to an error, please check if the json is valid: " + err.message)
        }
    } else {
        console.log("System was disabled due to a JSON error, please check if the json is valid: " + JSON.stringify(system_json))
    }
}

function loadFormJSONfromURL(url) {
    system_json = {}
    fetch(url).then(res => {
        res.json().then(json => {
            system_json = json
            questions = system_json["questions"]
            modes = system_json["modes"]
            selected_mode = system_json["defaultMode"]
            start_system()
        })
    })
}

function loadFormJSON(json) {
    system_json = json
    questions = system_json["questions"]
    modes = system_json["modes"]
    selected_mode = system_json["defaultMode"]
    start_system()
}