import platform
from colorama import Fore, Style
from rgbprint import gradient_print
import json
import sys
import os
count = 1
versionName = "step sis version 2"
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
        
def setVersion(versionname):
    global versionName
    versionName = versionname
         
def requestinput(string):
    print(string)
    return input(createColorText(">> "))

def printMainUI(args):
    if whichPythonCommand() == "python3":
        os.system("clear")
    else:
        os.system("cls")
    print("")

    username = args[0]
    onlineusers = args[1]
    numBought = args[2]
    item_name = args[3]
    latency1 = args[4]
    lastping = args[5]
    item_found = args[6]
    errors = args[7]
    latency2 = args[8]
    checks = args[9]
    runtime = args[10]
    watching = args[11]

    title = f"""    
                                                d8P  
                                                d888888P
            88bd8b,d88b  d8888b ?88   d8P  d8P  ?88'  
            88P'`?8P'?8b d8b_,dP d88  d8P' d8P'  88P   
            d88  d88  88P 88b     ?8b ,88b ,88'   88b   
            d88' d88'  88b `?888P' `?888P'888P'    `?8b 

                    discord.gg/mewt - v{versionName}                                                   
    """

    gradient_print(title, start_color=(0xFF6EA3), end_color=(0xF7B8CF))
    print(createColorText(""))
    print(f"> Current User: {createColorText(username)}")
    print(f"> Online Users: {createColorText(onlineusers)}")
    print(f"> Bought: " + createColorText(numBought))
    print(f"> Last Bought: {createColorText(item_name)}")
    print(f"")
    print(f">> Autosearch")
    print(f"> Connected: {createColorText('True')}")
    print(f"> Latency: {createColorText(latency1)}")
    print(f"> Last Ping: {createColorText(lastping)}")
    print(f"> Last Detected: {createColorText(item_found)}")
    print(f"")
    print(f">> Watcher")
    print(f"> Errors: {createColorText(errors)}")
    print(f"> Latency: {createColorText(latency2)}")
    print(f"> Checks: {createColorText(checks)}")
    print(f"")
    print(f"> Run Time: {createColorText(runtime)}")
    print(f"> Watching: {createColorText(watching)}")
    print("")
        
if whichPythonCommand() == "python3":
    os.system("clear")
else:
    os.system("cls")

print(createColorText("Welcome to Fake mewt Sniper UI Generator!"))
print(createColorText("Made by EfazDev#0220!"))
print(createColorText(f"Version Using: v{versionName}"))
def main():
    print("")
    jsonOrNot = requestinput(createColorText("Would you like to use a JSON? (y/n): "))
    if jsonOrNot.lower() == "y":
        inputJSON = requestinput("Enter JSON Contents: ")
        print("")
        try:
            main_json = json.loads(inputJSON)
            item_name = main_json["ItemBought"]
            if item_name == "":
                item_name = "None"
            item_found = main_json["ItemFound"]
            if item_found == "":
                item_found = "None"
            runtime = main_json["Runtime"]
            watching = main_json["Watching"]
            latency1 = main_json["AutosearchLatency"]
            checks = main_json["Checks"]
            errors = main_json["Errors"]
            lastping = main_json["LastPingAutosearch"]
            latency2 = main_json["WatcherLatency"]
            numBought = main_json["NumberBought"]
            username = main_json["Username"]
            onlineusers = main_json["OnlineUsers"]

            if main_json.get("Version"):
                setVersion(main_json["Version"])
        except Exception as e:
            print(createColorText("Error while formatting JSON (Please make sure the JSON is Valid): " + str(e)))
            print(createColorText("Continuing to UI Maker Assistant"))
            print("")
            item_name = requestinput("Item Bought? (ex: Star Wars): ")
            if item_name == "":
                item_name = "None"
            item_found = requestinput("Item Detected? (ex: Star Wars): ")
            if item_found == "":
                item_found = "None"
            runtime = requestinput("Custom Runtime? (0:06:14): ")
            watching = requestinput("Watching text? (ex: 1, 2): ")
            latency1 = requestinput("Autosearch Latency? (ex: 0.01): ")
            checks = requestinput("Watcher Checks? (ex: 10): ")
            errors = requestinput("# of Errors? (ex: 5): ")
            lastping = requestinput("Last Ping? (0:00:00): ")
            latency2 = requestinput("Watcher latency? (ex: 0.01): ")
            numBought = requestinput("# of bought? (ex: 5): ")
            username = requestinput("Roblox Username?: ")
            onlineusers = requestinput("# of Online Users? (ex: 935): ")
    else:
        item_name = requestinput("Item Bought? (ex: Star Wars): ")
        if item_name == "":
            item_name = "None"
        item_found = requestinput("Item Detected? (ex: Star Wars): ")
        if item_found == "":
            item_found = "None"
        runtime = requestinput("Custom Runtime? (0:06:14): ")
        watching = requestinput("Watching text? (ex: 1, 2): ")
        latency1 = requestinput("Autosearch Latency? (ex: 0.01): ")
        checks = requestinput("Watcher Checks? (ex: 10): ")
        errors = requestinput("# of Errors? (ex: 5): ")
        lastping = requestinput("Last Ping? (0:00:00): ")
        latency2 = requestinput("Watcher latency? (ex: 0.01): ")
        numBought = requestinput("# of bought? (ex: 5): ")
        username = requestinput("Roblox Username?: ")
        onlineusers = requestinput("# of Online Users? (ex: 935): ")
    print("")
    ready = requestinput(createColorText("Your UI is ready! Show now? (y/n): "))
    if ready.lower() == "y":
        printMainUI([
            username, onlineusers, numBought, item_name, latency1, lastping, item_found, errors, latency2, checks, runtime, watching
        ])
    print("")
    wantjson = requestinput(createColorText("Do you want a JSON? (y/n): "))
    if wantjson.lower() == "y":
        newJson = {
            "ItemBought": item_name,
            "ItemFound": item_found,
            "Runtime": runtime,
            "Watching": watching,
            "AutosearchLatency": latency1,
            "Checks": checks,
            "Errors": errors,
            "LastPingAutosearch": lastping,
            "WatcherLatency": latency2,
            "NumberBought": numBought,
            "Username": username,
            "OnlineUsers": onlineusers,
            "Version": versionName
        }
        print(createColorText("JSON Ready!"))
        print("")
        print(json.dumps(newJson))
        print("")
        def response():
            closeWindo = requestinput(createColorText("Close Now?"))
            if closeWindo.lower() == "y":
                exit()
            else:
                main()
        response()
    else:
        def response():
            closeWindo = requestinput(createColorText("Close Now?"))
            if closeWindo.lower() == "y":
                exit()
            else:
                main()
        response()

def argsResponder(args):
    mode = args[1]
    if mode == "-input":
        # required arguments
        username = args[2]
        onlineusers = args[3]
        numBought = args[4]
        item_name = args[5]
        latency1 = args[6]
        lastping = args[7]
        item_found = args[8]
        errors = args[9]
        latency2 = args[10]
        checks = args[11]
        runtime = args[12]
        watching = args[13]

        # optional arguments
        if len(args) > 14:
            version = args[14]
            if version:
                setVersion(version)

        print("")
        ready = requestinput(createColorText("Your UI is ready! Show now? (y/n): "))
        if ready.lower() == "y":
            printMainUI([
                username, onlineusers, numBought, item_name, latency1, lastping, item_found, errors, latency2, checks, runtime, watching
            ])
        print("")
        wantjson = requestinput(createColorText("Do you want a JSON? (y/n): "))
        if wantjson.lower() == "y":
            newJson = {
                "ItemBought": item_name,
                "ItemFound": item_found,
                "Runtime": runtime,
                "Watching": watching,
                "AutosearchLatency": latency1,
                "Checks": checks,
                "Errors": errors,
                "LastPingAutosearch": lastping,
                "WatcherLatency": latency2,
                "NumberBought": numBought,
                "Username": username,
                "OnlineUsers": onlineusers
            }
            print(createColorText("JSON Ready!"))
            print("")
            print(json.dumps(newJson))
            print("")
            def response():
                closeWindo = requestinput(createColorText("Close Now?"))
                if closeWindo.lower() == "y":
                    exit()
                else:
                    main()
            response()
        else:
            def response():
                closeWindo = requestinput(createColorText("Close Now?"))
                if closeWindo.lower() == "y":
                    exit()
                else:
                    main()
            response()
    elif mode == "-json":
        jsonToUse = args[2]
        try:
            main_json = json.loads(jsonToUse)
            item_name = main_json["ItemBought"]
            if item_name == "":
                item_name = "None"
            item_found = main_json["ItemFound"]
            if item_found == "":
                item_found = "None"
            runtime = main_json["Runtime"]
            watching = main_json["Watching"]
            latency1 = main_json["AutosearchLatency"]
            checks = main_json["Checks"]
            errors = main_json["Errors"]
            lastping = main_json["LastPingAutosearch"]
            latency2 = main_json["WatcherLatency"]
            numBought = main_json["NumberBought"]
            username = main_json["Username"]
            onlineusers = main_json["OnlineUsers"]

            if main_json.get("Version"):
                setVersion(main_json["Version"])
        except Exception as e:
            print(createColorText("Error while formatting JSON (Please make sure the JSON is Valid): " + str(e)))
            print(createColorText("Continuing to UI Maker Assistant"))
            print("")
            item_name = requestinput("Item Bought? (ex: Star Wars): ")
            if item_name == "":
                item_name = "None"
            item_found = requestinput("Item Detected? (ex: Star Wars): ")
            if item_found == "":
                item_found = "None"
            runtime = requestinput("Custom Runtime? (0:06:14): ")
            watching = requestinput("Watching text? (ex: 1, 2): ")
            latency1 = requestinput("Autosearch Latency? (ex: 0.01): ")
            checks = requestinput("Watcher Checks? (ex: 10): ")
            errors = requestinput("# of Errors? (ex: 5): ")
            lastping = requestinput("Last Ping? (0:00:00): ")
            latency2 = requestinput("Watcher latency? (ex: 0.01): ")
            numBought = requestinput("# of bought? (ex: 5): ")
            username = requestinput("Roblox Username?: ")
            onlineusers = requestinput("# of Online Users? (ex: 935): ")
        print("")
        ready = requestinput(createColorText("Your UI is ready! Show now? (y/n): "))
        if ready.lower() == "y":
            printMainUI([
                username, onlineusers, numBought, item_name, latency1, lastping, item_found, errors, latency2, checks, runtime, watching
            ])
        print("")
        wantjson = requestinput(createColorText("Do you want a JSON? (y/n): "))
        if wantjson.lower() == "y":
            newJson = {
                "ItemBought": item_name,
                "ItemFound": item_found,
                "Runtime": runtime,
                "Watching": watching,
                "AutosearchLatency": latency1,
                "Checks": checks,
                "Errors": errors,
                "LastPingAutosearch": lastping,
                "WatcherLatency": latency2,
                "NumberBought": numBought,
                "Username": username,
                "OnlineUsers": onlineusers,
                "Version": versionName
            }
            print(createColorText("JSON Ready!"))
            print("")
            print(json.dumps(newJson))
            print("")
            def response():
                closeWindo = requestinput(createColorText("Close Now?"))
                if closeWindo.lower() == "y":
                    exit()
                else:
                    main()
            response()
        else:
            def response():
                closeWindo = requestinput(createColorText("Close Now?"))
                if closeWindo.lower() == "y":
                    exit()
                else:
                    main()
            response()
    else:
        print("Error while loading arguments: System received a mode that doesn't exist")
        print("Returning to main script")
        main()
if len(sys.argv) > 1:
    argsResponder(sys.argv)
else:
    main()