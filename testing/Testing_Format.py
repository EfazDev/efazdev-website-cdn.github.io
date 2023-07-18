import LoggerDetector

# Get Console Logs
logs = LoggerDetector.getConsoleLogs()
# {"Welcome to Efaz's Logger Detector!"}

# Check If File Authorized
fileAuth = LoggerDetector.checkFileAuthorized("/Users/EfazDev/main.py")
# False

# Get Logger Detector Details
details = LoggerDetector.logger_detector_info()
# {"version": "v1.1.5", "backgroundConsoleHidden": true}