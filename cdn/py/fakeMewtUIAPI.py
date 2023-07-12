import platform
from colorama import Fore, Style
from rgbprint import gradient_print
import json
import sys
import os

count = 0

"""

                                    d8P  
                                    d888888P
88bd8b,d88b  d8888b ?88   d8P  d8P  ?88'  
88P'`?8P'?8b d8b_,dP d88  d8P' d8P'  88P   
d88  d88  88P 88b     ?8b ,88b ,88'   88b   
d88' d88'  88b `?888P' `?888P'888P'    `?8b                                               

Mewt Fake UI API
Make a fake UI of mewt using python!

API by efazdev (efaz.dev)
mewt sniper is by .frames. and shall not be abused

Use the API using:
import fakeMewtUIAPI

(THIS SCRIPT HAS TO BE IN THE SAME FOLDER OR DIRECTORY WITH THE SCRIPT YOUR USING THIS WITH)

JSON Example:

request = fakeMewtUIAPI.MewtUI(fakeMewtUIAPI.JSONMewtUIMode(), {"ItemBought": "Skybox Shrimp", "ItemFound": "Skybox Shrimp", "Runtime": "12:12:12", "Watching": "123, 456", "AutosearchLatency": "0.04", "Checks": "1234", "Errors": "4", "LastPingAutosearch": "00:00:03", "WatcherLatency": "0.03", "NumberBought": "2", "Username": "EfazDev_a", "OnlineUsers": "562"})
request.printFinalUI()
print(json.dumps(request.generateJSON()))

Inputs Example:

request = fakeMewtUIAPI.MewtUI(fakeMewtUIAPI.InputMewtUIMode(), {"EfazDev_a", "562", "2", "Skybox Shrimp", "0.04", "00:00:03", "Skybox Shrimp", "4", "0.03", "1234", "12:12:12", "123, 456"})
request.printFinalUI()
print(json.dumps(request.generateJSON()))

Blank Example:

request = fakeMewtUIAPI.MewtUI(fakeMewtUIAPI.BlankMewtUIMode(), {})
request.printFinalUI()
print(json.dumps(request.generateJSON()))

Editted Example:

request = fakeMewtUIAPI.MewtUI(fakeMewtUIAPI.BlankMewtUIMode(), {})

request.username = "Bob"
request.item_found = "Textbooks"

request.printFinalUI()
print(json.dumps(request.generateJSON()))

"""

def createColorText(string):
    global count
    count = count+1
    main_theme = f"\x1b[38;2;247;184;207m"
    return f"{main_theme}{Style.BRIGHT}{string}{Fore.WHITE}{Style.BRIGHT} "

def whichPythonCommand():
        LocalMachineOS = platform.system()
        if (
            LocalMachineOS == "win32"
            or LocalMachineOS == "win64"
            or LocalMachineOS == "Windows"
        ):
            return "python"
        else:
            return "python3"

class JSONMewtUIMode:
     value = "JSON"

class InputMewtUIMode:
     value = "Input"

class BlankMewtUIMode:
     value = "Blank"

class PrintSystem:
    mes = ""
    def __init__(self, message):
        self.mes = message

    def setMessage(self, message):
        self.mes = message

    def printMainMessage(self):
        print(f"\x1b[38;2;255;255;255m{self.mes}\033[38;5;231m")

    def printErrorMessage(self):
        print(f"\x1b[38;2;255;0;0m{self.mes}\033[38;5;231m")

    def printSuccessMessage(self):
        print(f"\x1b[38;2;0;255;0m{self.mes}\033[38;5;231m")

    def printWarnMessage(self):
        print(f"\x1b[38;2;255;75;0m{self.mes}\033[38;5;231m")

MainPrintSystem = PrintSystem("")

class MewtUI:
    username = ""
    onlineusers = ""
    numBought = ""
    item_name = ""
    latency1 = ""
    lastping = ""
    item_found = ""
    errors = ""
    latency2 = ""
    checks = ""
    runtime = ""
    watching = ""
    versionName = ""

    def __init__(self, mode, args):
        if mode.value == "JSON":
            try:
                main_json = args
                item_name = main_json["ItemBought"]
                if item_name == "":
                    item_name = "None"
                item_found = main_json["ItemFound"]
                if item_found == "":
                    item_found = "None"

                self.runtime = main_json["Runtime"]
                self.watching = main_json["Watching"]
                self.latency1 = main_json["AutosearchLatency"]
                self.checks = main_json["Checks"]
                self.errors = main_json["Errors"]
                self.lastping = main_json["LastPingAutosearch"]
                self.latency2 = main_json["WatcherLatency"]
                self.numBought = main_json["NumberBought"]
                self.username = main_json["Username"]
                self.onlineusers = main_json["OnlineUsers"]

                if main_json.get("Version"):
                    self.versionName = main_json["Version"]
            except Exception as e:
                MainPrintSystem.setMessage("Given JSON is not valid: " + str(e))
                MainPrintSystem.printErrorMessage()
        elif mode.value == "Input":
            self.username = args[0]
            self.onlineusers = args[1]
            self.numBought = args[2]
            self.item_name = args[3]
            self.latency1 = args[4]
            self.lastping = args[5]
            self.item_found = args[6]
            self.errors = args[7]
            self.latency2 = args[8]
            self.checks = args[9]
            self.runtime = args[10]
            self.watching = args[11]

            if len(args) > 12:
                self.versionName = args[12]
        else:
            self.username = ""
            self.onlineusers = ""
            self.numBought = ""
            self.item_name = ""
            self.latency1 = ""
            self.lastping = ""
            self.item_found = ""
            self.errors = ""
            self.latency2 = ""
            self.checks = ""
            self.runtime = ""
            self.watching = ""
            self.versionName = ""

    def generateJSON(self):
        newJson = {
            "ItemBought": self.item_name,
            "ItemFound": self.item_found,
            "Runtime": self.runtime,
            "Watching": self.watching,
            "AutosearchLatency": self.latency1,
            "Checks": self.checks,
            "Errors": self.errors,
            "LastPingAutosearch": self.lastping,
            "WatcherLatency": self.latency2,
            "NumberBought": self.numBought,
            "Username": self.username,
            "OnlineUsers": self.onlineusers,
            "Version": self.versionName
        }
        return newJson
    
    def generateJSONString(self):
        newJson = {
            "ItemBought": self.item_name,
            "ItemFound": self.item_found,
            "Runtime": self.runtime,
            "Watching": self.watching,
            "AutosearchLatency": self.latency1,
            "Checks": self.checks,
            "Errors": self.errors,
            "LastPingAutosearch": self.lastping,
            "WatcherLatency": self.latency2,
            "NumberBought": self.numBought,
            "Username": self.username,
            "OnlineUsers": self.onlineusers,
            "Version": self.versionName
        }
        return json.dumps(newJson)
        
    def printFinalUI(self):
        if whichPythonCommand() == "python3":
            os.system("clear")
        else:
            os.system("cls")
        print("")

        title = f"""    
                                                    d8P  
                                                    d888888P
                88bd8b,d88b  d8888b ?88   d8P  d8P  ?88'  
                88P'`?8P'?8b d8b_,dP d88  d8P' d8P'  88P   
                d88  d88  88P 88b     ?8b ,88b ,88'   88b   
                d88' d88'  88b `?888P' `?888P'888P'    `?8b 

                        discord.gg/mewt - v{self.versionName}                                                   
        """

        gradient_print(title, start_color=(0xFF6EA3), end_color=(0xF7B8CF))
        print(createColorText(""))
        print(f"> Current User: {createColorText(self.username)}")
        print(f"> Online Users: {createColorText(self.onlineusers)}")
        print(f"> Bought: " + createColorText(self.numBought))
        print(f"> Last Bought: {createColorText(self.item_name)}")
        print(f"")
        print(f">> Autosearch")
        print(f"> Connected: {createColorText('True')}")
        print(f"> Latency: {createColorText(self.latency1)}")
        print(f"> Last Ping: {createColorText(self.lastping)}")
        print(f"> Last Detected: {createColorText(self.item_found)}")
        print(f"")
        print(f">> Watcher")
        print(f"> Errors: {createColorText(self.errors)}")
        print(f"> Latency: {createColorText(self.latency2)}")
        print(f"> Checks: {createColorText(self.checks)}")
        print(f"")
        print(f"> Run Time: {createColorText(self.runtime)}")
        print(f"> Watching: {createColorText(self.watching)}")
        print("")

    def printFinalUINoClear(self):
        print("")

        title = f"""    
                                                    d8P  
                                                    d888888P
                88bd8b,d88b  d8888b ?88   d8P  d8P  ?88'  
                88P'`?8P'?8b d8b_,dP d88  d8P' d8P'  88P   
                d88  d88  88P 88b     ?8b ,88b ,88'   88b   
                d88' d88'  88b `?888P' `?888P'888P'    `?8b 

                        discord.gg/mewt - v{self.versionName}                                                   
        """

        gradient_print(title, start_color=(0xFF6EA3), end_color=(0xF7B8CF))
        print(createColorText(""))
        print(f"> Current User: {createColorText(self.username)}")
        print(f"> Online Users: {createColorText(self.onlineusers)}")
        print(f"> Bought: " + createColorText(self.numBought))
        print(f"> Last Bought: {createColorText(self.item_name)}")
        print(f"")
        print(f">> Autosearch")
        print(f"> Connected: {createColorText('True')}")
        print(f"> Latency: {createColorText(self.latency1)}")
        print(f"> Last Ping: {createColorText(self.lastping)}")
        print(f"> Last Detected: {createColorText(self.item_found)}")
        print(f"")
        print(f">> Watcher")
        print(f"> Errors: {createColorText(self.errors)}")
        print(f"> Latency: {createColorText(self.latency2)}")
        print(f"> Checks: {createColorText(self.checks)}")
        print(f"")
        print(f"> Run Time: {createColorText(self.runtime)}")
        print(f"> Watching: {createColorText(self.watching)}")
        print("")

    def resetUIData(self):
        self.username = ""
        self.onlineusers = ""
        self.numBought = ""
        self.item_name = ""
        self.latency1 = ""
        self.lastping = ""
        self.item_found = ""
        self.errors = ""
        self.latency2 = ""
        self.checks = ""
        self.runtime = ""
        self.watching = ""
        self.versionName = ""