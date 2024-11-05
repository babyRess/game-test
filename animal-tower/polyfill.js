function attachMXNotifier () {
    var notifier = {
        notifierCallbacks: {},
        on: function (eventName, func, context) {
            this.notifierCallbacks[eventName] = context ? func.bind(context) : func
        },
        emit: function (eventName, args) {
            const func = this.notifierCallbacks[eventName]
            if (typeof func === "function") {
                func(args)
            }
        }
    }

    if (typeof window !== 'undefined') {
        if (typeof window.cc === 'undefined') {
            window.cc = {
                game: notifier
            }
        }
        window.MX_Notifier = notifier
    }
}

function attachIOSPolyfills () {
    if (!window.gameManager && window.config) {
        window.gameManager = {}
        window.gameManager.onGameStart = function () { 
            if (window.commProtocol === 'api') {
                setTimeout(function() {
                    postRequest('/game/game-start', null)
                }, 100)
            } else {
                window.webkit.messageHandlers.onGameStart.postMessage({})
            }
         }

        window.gameManager.onError = function (errStr) {
            if (window.commProtocol === 'api') {
                postRequest('/game/game-error', errStr)
            } else {
                window.webkit.messageHandlers.onError.postMessage({ errStr: errStr })
            }            
        }

        window.gameManager.onGameInit = function () {
            if (typeof window.config === 'string') {
                try {
                    const configObj = JSON.parse(window.config)
                    if (window.restartHighScore) {
                        configObj.highestScore = window.restartHighScore
                    }
                    return JSON.stringify(configObj)
                } catch(e) { return {} }
            } else if (typeof window.config === 'object') {
                if (window.restartHighScore) {
                    window.config.highestScore = window.restartHighScore
                }
                return JSON.stringify(window.config)
            }
            return '{}'
        }

        window.gameManager.onTrack = function (eventName, data) {
            if (window.commProtocol === 'api') {
                postRequest('/event/'+ eventName, data)
            } else {
                window.webkit.messageHandlers.onTrack.postMessage({ eventName: eventName, data: data })
            }
        }

        window.gameManager.onGameOver = function (data) {
            if (window.commProtocol === 'api') {
                setTimeout(function() {
                    postRequest('/game/game-over', data)
                }, 100)
            } else {
                window.webkit.messageHandlers.onGameOver.postMessage({ data: data })
            }
        }

        window.gameManager.onCheckRewardedVideoAds = function (notificationName, argObj) {
            if (window.commProtocol === 'api') {
                cc.game.emit(notificationName, { status: 1 })
            } else {
                window.webkit.messageHandlers.onCheckRewardedVideoAds.postMessage({ notificationName: notificationName, argObj: argObj })
            }
        }

        window.gameManager.onShowRewardedVideoAds = function (notificationName, argObj) {
            if (window.commProtocol === 'api') {
                cc.game.emit(notificationName, { status: 1 })
            } else {
                window.webkit.messageHandlers.onShowRewardedVideoAds.postMessage({ notificationName: notificationName, argObj: argObj })
            }
        }

        window.gameManager.getGameSettings = window.gameManager.onGameInit
        // if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.encryption && typeof window.webkit.messageHandlers.encryption.getInfo === 'function') {
        //     window.gameManager = window.gameManager || {}
        //     window.gameManager.encryption = {}
        //     window.gameManager.encryption.getInfo = function (n, n1, n2) {
        //         window.webkit.messageHandlers.encryption.getInfo.postMessage({n: n, n1: n1, n2: n2})
        //     }
        // } else {
            var scriptEl = document.createElement('script')
            scriptEl.onload = function (e) {
                console.log(e)
                window.gameManager = window.gameManager || {}
                window.gameManager.encryption = {}
                window._MX_ = window._MX_ || {}
                window.gameManager.encryption.getInfo = window._MX_.getInfo
            }
            scriptEl.src = '../scripts/encryption.js'
            document.getElementsByTagName('head')[0].appendChild(scriptEl)
        // }
    }
}

function INIT_MX () {}

INIT_MX.prototype.restartGame = function (highScore) {
    window.restartHighScore = highScore
    if (typeof window._MX_.restartGameCallback === 'function') {
        window._MX_.restartGameCallback()
        return true
    }
    return false
}
INIT_MX.prototype.calcInsetPadding = function () {
    var root = document.documentElement;
    // add CSS variables so we can read them back
    root.style.setProperty('--notch-top', 'env(safe-area-inset-top)');
    root.style.setProperty('--notch-right', 'env(safe-area-inset-right)');
    root.style.setProperty('--notch-bottom', 'env(safe-area-inset-bottom)');
    root.style.setProperty('--notch-left', 'env(safe-area-inset-left)');
    // get runtime styles
    var style = window.getComputedStyle(root);
    // read env values back and check if we have any values
    var insetPadArr = [
        parseInt(style.getPropertyValue('--notch-top').replace('px', '').trim() || '0', 10),
        parseInt(style.getPropertyValue('--notch-right').replace('px', '').trim() || '0', 10),
        parseInt(style.getPropertyValue('--notch-bottom').replace('px', '').trim() || '0', 10),
        parseInt(style.getPropertyValue('--notch-left').replace('px', '').trim() || '0', 10)
    ]
    return {
        top: insetPadArr[0],
        right: insetPadArr[1],
        bottom: insetPadArr[2],
        left: insetPadArr[3]
    }
}

function findCommunicationProtocol () {
    if (window.config) {
        const appVersion = window.config['app-version']
        if (appVersion) {
            const appVersionParts = appVersion.split('.')
            const majorPart = appVersionParts && appVersionParts[0] && parseInt(appVersionParts[0])
            const minorPart = appVersionParts && appVersionParts[1] && parseInt(appVersionParts[1])

            if (majorPart > 1 || minorPart >= 21) {
                window.commProtocol = 'api'
            } else {
                window.commProtocol = 'method'
            }
        }
    }
}

function onload () {
    findCommunicationProtocol()
    attachIOSPolyfills()
    attachMXNotifier()
    if (typeof window !== 'undefined') {
        window._MX_ = new INIT_MX()
    }
}

onload()


function postRequest (url, data) {
    if (data) {
        url = url + '?data=' + encodeURIComponent(data)
    }
    window.location.href = url
}