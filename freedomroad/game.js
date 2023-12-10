/*! game-api - v0.33.7 - 2016-07-20 */
!(function (a) {
  'use strict';
  function b(a) {
    (a = a || {}), (this.advertisement = a.advertisement);
  }
  function c() {
    this.adSlots = {};
  }
  function d(a) {
    if (((a = a || {}), (this.IS_MASTER = a.isMaster || !1), !this.IS_MASTER)) throw new Error('The DataStore can only be instantiated by the Master');
    this.dataStore = {};
  }
  function e(a, b) {
    (a = a || {}), (this.IS_MASTER = a.isMaster), (this.IS_SLAVE = !this.IS_MASTER), (this.IS_STANDALONE = a.isStandalone), (this.messenger = a.messenger), (this.moduleReady = b || !1), (this.appTimer = null), (this.appDelayMin = 1e4), (this.appDelayMax = 24e4), (this.appError = !1), (this.appTimerDelay = this.appDelayMax), (this.appToken = null), (this.token = null);
  }
  function f(a, b) {
    (a = a || {}),
      (this.IS_MASTER = a.isMaster),
      (this.IS_SLAVE = !this.IS_MASTER),
      (this.IS_STANDALONE = a.isStandalone),
      (this.messenger = a.messenger),
      (this.eventTracking = a.eventTracking),
      (this.appToken = a.appToken),
      (this.moduleReady = b || !1),
      (this.isGamestate = !1),
      (this.endpoint = null),
      (this.spilStorageId = null),
      (this.flushTimer = null),
      (this.flushDelayMin = 500),
      (this.flushDelayMax = 3e4),
      (this.flushTimerDelay = this.flushDelayMin),
      (this.gameState = { started: !1, userId: null, appId: null, dirtyKeys: [] });
  }
  function g(a, b) {
    if (((this.IS_MASTER = a && a.isMaster ? a.isMaster : !1), (this.IS_SLAVE = !this.IS_MASTER), (this.messenger = null), (this.subscribers = {}), (this.moduleReady = b ? b : !1), (this.data = a.data || null), (this.gameState = 'resume'), !a || !a.messenger)) throw new Error('No messenger passed to the Game module instance');
    (this.messenger = a.messenger), window.addEventListener ? window.addEventListener('message', this._performAction.bind(this), !1) : window.attachEvent && window.attachEvent('onmessage', this._performAction.bind(this)), this.IS_MASTER && this.messenger.subscribe('gameapi.game.adjustHeight', this.adjustHeight, this);
  }
  function h(a, b) {
    (a = a || {}), (this.isMaster = a.isMaster), (this.isStandalone = a.isStandalone), (this.messenger = a.messenger), (this.moduleReady = b ? b : !1), (this.activeLanguage = 'en');
  }
  function i(a, b) {
    (a = a || {}), (this.IS_MASTER = a.isMaster), (this.IS_STANDALONE = a.isStandalone), (this.messenger = a.messenger), (this.eventTracking = a.eventTracking), (this.moduleReady = b ? b : !1), (this.isAvailable = !1), (this.locale = ''), (this.loggedIn = !1);
  }
  function j(a, b) {
    (a = a || {}), (this.IS_MASTER = a.isMaster), (this.IS_STANDALONE = a.isStandalone), (this.messenger = a.messenger), (this.eventTracking = a.eventTracking), (this.moduleReady = b ? b : !1), (this.isAvailable = !1);
  }
  function k(a, b) {
    (a = a || {}), (this.IS_MASTER = a.isMaster), (this.IS_SLAVE = !this.IS_MASTER), (this.moduleReady = b ? b : !1), (this.messenger = a.messenger), (this.data = a.data || null), (this.eventTracking = a.eventTracking), (this.initialHeight = a.initialHeight), (this.appToken = a.appToken), (this.state = { userId: null }), this._setupMasterEvent();
  }
  function l(a, b) {
    (a = a || {}), (this.IS_MASTER = a.isMaster), (this.IS_SLAVE = !this.IS_MASTER), (this.moduleReady = b ? b : !1), (this.messenger = a.messenger), (this.data = a.data || null), (this.eventTracking = a.eventTracking), (this.initialHeight = a.initialHeight), (this.appToken = a.appToken), this._setupMasterEvent(), (this.appToken = a.appToken), (this.state = { userId: null });
  }
  function m(a, b) {
    (a = a || {}), (this.IS_MASTER = a.isMaster), (this.IS_SLAVE = !this.IS_MASTER), (this.moduleReady = b ? b : !1), (this.messenger = a.messenger), (this.data = a.data || { mapping: {} }), (this.eventTracking = a.eventTracking), this._setupMasterEvent();
  }
  function n(a, b) {
    (a = a || {}), (this.isMaster = a.isMaster), (this.isStandalone = a.isStandalone), (this.messenger = a.messenger), (this.eventTracking = a.eventTracking), (this.moduleReady = b ? b : !1), (this.timeoutAfter = 500), (this.timeout = !1), (this.adRequested = !1), (this.adAvailable = !1), (this.gamebreakType = 'unkown'), (this._callbacks = { pause: !1, resume: !1 });
  }
  function o(a, b) {
    (a = a || {}), (this.IS_MASTER = a.isMaster), (this.isStandalone = a.isStandalone), (this.messenger = a.messenger), (this.eventTracking = a.eventTracking), (this.moduleReady = b ? b : !1), (this.events = { GAME_START: 'GAME_START', GAME_END: 'GAME_END', GAME_PAUSE: 'GAME_PAUSE', GAME_CONTINUE: 'GAME_CONTINUE', GAME_MUTE: 'GAME_MUTE', LEVEL_FAIL: 'LEVEL_FAIL', LEVEL_COMPLETE: 'LEVEL_COMPLETE' }), this._setupEvents();
  }
  function p(a, b) {
    (a = a || {}), (this.IS_MASTER = a.isMaster), (this.IS_SLAVE = !this.IS_MASTER), (this.IS_STANDALONE = a.isStandalone), (this.data = a.data), (this.messenger = a.messenger), (this.moduleReady = b ? b : !1), (this.gamePlayTracking = { started: !1, appid: null, host: null, timestamp: null }), (this.timeInGameTracking = { started: !1, appid: null, timestamp: null }), (this.isGamestate = !1);
  }
  function q(a, b) {
    (a = a || {}), (this.IS_MASTER = a.isMaster), (this.IS_SLAVE = !this.IS_MASTER), (this.IS_STANDALONE = a.isStandalone), (this.eventTracking = a.eventTracking), (this.moduleReady = b ? b : !1), (this.messenger = a.messenger), (this.components = a.components), (this.data = a.data || null);
  }
  function r(a) {
    var b = 'string' == typeof a ? s(a) : a;
    b && ((this.type = b.type), (this.callbackId = b.callbackId), (this.data = b.data));
  }
  function s(a) {
    var b,
      c,
      d,
      e = !1,
      f = [];
    if ('string' == typeof a && ((f = a.split('|')), 'gameapi' === f[0])) {
      f.shift(), (b = f.shift()), (d = parseInt(f.shift(), 10)), (c = f.join('|'));
      try {
        e = { type: b, callbackId: d, data: '' !== c ? JSON.parse(c) : '' };
      } catch (g) {}
    }
    return e;
  }
  function t(a) {
    (a = a || {}), (this.IS_MASTER = 'boolean' == typeof a.isMaster ? a.isMaster : !1), (this.IS_SLAVE = !this.IS_MASTER), (this.api = a.api ? a.api : {}), (this._targets = a.targets ? a.targets : []), (this._callbacks = []), (this._channels = []), this.IS_MASTER && a.dataStore && (this.dataStore = a.dataStore), this._setupEventListener();
  }
  function u(a, d, n, p, q) {
    window.outerHeight - window.innerHeight;
    (this.version = '0.33.7'), (this.isReady = !1), this._setRole(), (this.__ = {}), (this.__.dataStore = this.IS_MASTER ? new a({ isMaster: !0 }) : null), (this.__.messenger = new d({ isMaster: this.IS_MASTER, api: this, targets: this._getTargets(), dataStore: this.__.dataStore })), (this.Advertisement = new c()), (this.__.components = new b({ advertisement: this.Advertisement }));
    var r = this._addBasic({});
    this.__.EventTracking = new p(r, !1);
    var s = this._addComponents(r),
      t = this._addEventTracking(s),
      u = this._addInitialHeight(t);
    (this.AppToken = new e(t, !1)), (this.GameState = new f(this._addAppToken(t), !1)), (this.Branding = new n(t, !1)), (this.GameBreak = new q(t, !1)), (this.Game = new g(r, !1)), (this.Award = new l(this._addAppToken(u), !1)), (this.Secondscreen = new m(u, !1)), (this.User = new i(t, !1)), (this.Score = new k(this._addAppToken(u), !1)), (this.Friends = new j(t, !1)), (this.GameEvent = new o(t, !1)), (this.Localization = new h(t, !1));
  }
  'bind' in Function.prototype ||
    (Function.prototype.bind = function (a) {
      var b = this;
      if (arguments.length <= 1)
        return function () {
          return b.apply(a, arguments);
        };
      var c = Array.prototype.slice.call(arguments, 1);
      return function () {
        return b.apply(a, 0 === arguments.length ? c : c.concat(Array.prototype.slice.call(arguments)));
      };
    }),
    'trim' in String.prototype ||
      (String.prototype.trim = function () {
        return this.replace(/^\s+/, '').replace(/\s+$/, '');
      }),
    'indexOf' in Array.prototype ||
      (Array.prototype.indexOf = function (a, b) {
        void 0 === b && (b = 0), 0 > b && (b += this.length), 0 > b && (b = 0);
        for (var c = this.length; c > b; b++) if (b in this && this[b] === a) return b;
        return -1;
      }),
    'lastIndexOf' in Array.prototype ||
      (Array.prototype.lastIndexOf = function (a, b) {
        for (void 0 === b && (b = this.length - 1), 0 > b && (b += this.length), b > this.length - 1 && (b = this.length - 1), b++; b-- > 0; ) if (b in this && this[b] === a) return b;
        return -1;
      }),
    'forEach' in Array.prototype ||
      (Array.prototype.forEach = function (a, b) {
        for (var c = 0, d = this.length; d > c; c++) c in this && a.call(b, this[c], c, this);
      }),
    'map' in Array.prototype ||
      (Array.prototype.map = function (a, b) {
        for (var c = new Array(this.length), d = 0, e = this.length; e > d; d++) d in this && (c[d] = a.call(b, this[d], d, this));
        return c;
      }),
    'filter' in Array.prototype ||
      (Array.prototype.filter = function (a, b) {
        for (var c, d = [], e = 0, f = this.length; f > e; e++) e in this && a.call(b, (c = this[e]), e, this) && d.push(c);
        return d;
      }),
    'every' in Array.prototype ||
      (Array.prototype.every = function (a, b) {
        for (var c = 0, d = this.length; d > c; c++) if (c in this && !a.call(b, this[c], c, this)) return !1;
        return !0;
      }),
    'some' in Array.prototype ||
      (Array.prototype.some = function (a, b) {
        for (var c = 0, d = this.length; d > c; c++) if (c in this && a.call(b, this[c], c, this)) return !0;
        return !1;
      });
  var v = { timeout: 3e3 };
  (v.getGameConfig = function (a) {
    var b = !1,
      c = setTimeout(function () {
        (b = !0), a();
      }, this.timeout);
    SpilGames({ waiton: 'game.info.loaded' }, ['JSLib'], function (d) {
      if (!b) {
        clearTimeout(c);
        var e = d.get('current.game.integration.info');
        a(e);
      }
    });
  }),
    (v.getBrandingConfig = function (a, b) {
      var c = !1;
      a = a || { portal: {}, game: {} };
      var d = setTimeout(function () {
          (c = !0), (a.isError = 'no data from configar'), b(a);
        }, this.timeout),
        e = 'modeapi',
        f = a.portal.siteId,
        g = a.portal.channelId,
        h = a.portal.applicationId + '.json',
        i = 'en-EN',
        j = [e, h].join('/');
      navigator && 'undefined' != typeof navigator && ('undefined' != typeof navigator.languages && 'undefined' != typeof navigator.languages[0] ? (i = navigator.languages[0]) : 'undefined' != typeof navigator.userLanguage && (i = navigator.userLanguage)),
        (j = j + '?locale=' + i),
        SpilGames(['Net', 'JSLib'], function (e, f) {
          e.send({ url: j, type: 'GET', dataType: 'JSON' }, function (e) {
            if (!c) {
              var g = function (a, b) {
                return a.branding && (b.branding = a.branding), a.localization && (b.localization = a.localization), b;
              };
              if (e && e.configar) clearTimeout(d), window.postMessage(new r({ type: 'success', callbackId: null, data: 'log.configar.getBranding.success' }), '*'), b(g(e.configar, a));
              else {
                clearTimeout(d);
                var h = {};
                try {
                  h = f.get('configar.data.cached') || h;
                } catch (i) {}
                b(g(h, a));
              }
            }
          });
        });
    });
  var w = {};
  (w.argsToArray = function (a) {
    return a ? Array.prototype.slice.apply(a) : [];
  }),
    (w.isA10 = function () {
      return /a10.com/.test(window.location.host);
    }),
    (w.disableKeys = function (a) {
      var b = a.keyCode;
      (8 === b || 9 === b || (b >= 32 && 40 >= b) || 46 === b) && a.preventDefault();
    }),
    (w.trackGA = function () {
      try {
        if ('www8.agame.com' === window.location.host) {
          var a = function (a, b, c, d, e, f, g) {
            (a.GoogleAnalyticsObject = e),
              (a[e] =
                a[e] ||
                function () {
                  (a[e].q = a[e].q || []).push(arguments);
                }),
              (a[e].l = 1 * new Date()),
              (f = b.createElement(c)),
              (g = b.getElementsByTagName(c)[0]),
              (f.async = 1),
              (f.src = d),
              g.parentNode.insertBefore(f, g);
          };
          a(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga'), ga('create', 'UA-55956198-1', 'auto'), ga('send', 'pageview');
        }
      } catch (b) {}
    }),
    (w.getRole = function (a) {
      var b = 'function' == typeof a.SpilGames,
        c = a.self !== a.top,
        d = null;
      if (w.isA10()) return (a.onkeydown = this.disableKeys), { IS_MASTER: !0, IS_SLAVE: !0, IS_STANDALONE: !0 };
      if (b) {
        var e = document.getElementById('#iframegame');
        switch (e) {
          case 'null':
            d = { IS_MASTER: !0, IS_SLAVE: !0, IS_STANDALONE: !1 };
            break;
          default:
            d = { IS_MASTER: !0, IS_SLAVE: !1, IS_STANDALONE: !1 };
        }
      } else c ? ((a.onkeydown = this.disableKeys), this.trackGA(), (d = { IS_MASTER: !1, IS_SLAVE: !0, IS_STANDALONE: !1 })) : ((a.onkeydown = this.disableKeys), this.trackGA(), (d = { IS_MASTER: !0, IS_SLAVE: !0, IS_STANDALONE: !0 }));
      return d;
    }),
    (w.callConfigar = function (a, b) {
      var c,
        d,
        e = a.site || 500,
        f = a.channel || 100,
        g = a.id || null;
      window.XDomainRequest
        ? ((c = new XDomainRequest()),
          (c.onload = function () {
            b(200, c.responseText);
          }),
          (c.onerror = function () {
            b(404, null);
          }),
          (c.onprogress = function () {}))
        : window.XMLHttpRequest
        ? ((c = new XMLHttpRequest()),
          (c.onreadystatechange = function (a) {
            4 === c.readyState && b(c.status, c.responseText);
          }))
        : window.ActiveXObject &&
          ((c = new ActiveXObject('Microsoft.XMLHTTP')),
          (c.onreadystatechange = function (a) {
            4 === c.readyState && b(c.status, c.responseText);
          })),
        g &&
          ((d = ['modeapi', g + '.json'].join('/')),
          c.open('GET', d, !0),
          (c.timeout = 3e3),
          (c.ontimeout = function () {
            b(404, null);
          }),
          c.send());
    }),
    (w.submitData = function (a, b, c) {
      var d,
        e = a || '',
        f = b || {},
        g = c || function () {};
      window.XDomainRequest
        ? ((d = new XDomainRequest()),
          (d.onload = function () {
            g(200, d.responseText);
          }),
          (d.onerror = function () {
            g(404, null);
          }),
          (d.onprogress = function () {}),
          d.open('POST', e, !0))
        : window.XMLHttpRequest
        ? (navigator.userAgent.match(/Trident\/7.0;.* rv:11/)
            ? (d = this.getJSONP())
            : ((d = new XMLHttpRequest()),
              (d.onreadystatechange = function (a) {
                4 === d.readyState && g(d.status, d.responseText);
              })),
          d.open('POST', e, !0),
          d.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'))
        : window.ActiveXObject &&
          ((d = new ActiveXObject('Microsoft.XMLHTTP')),
          (d.onreadystatechange = function (a) {
            4 === d.readyState && g(d.status, d.responseText);
          }),
          d.open('POST', e, !0)),
        (d.timeout = 3e3),
        (d.ontimeout = function () {
          g(404, null);
        }),
        d.send(JSON.stringify(f));
    }),
    (w.getJSONP = function () {
      var a = '',
        b = 'jsonpspilgames' + +new Date(),
        c = {
          open: function (b, c) {
            (b = null), (a = c);
          },
          onreadystatechange: function () {},
          setRequestHeader: function () {},
          set: function (a, b) {
            c.set[a] = b;
          },
          send: function (d) {
            var e = c.set.callback || 0,
              f = c.set.data || 0;
            (d || e || f) && ((a += /\?/.test(a) ? '&' : '?'), d && ((a += f ? f + '=' + encodeURIComponent(d) : d), e && (a += '&')), e && (a += e + '=' + b));
            var g = document.createElement('script');
            (g.src = a), document.getElementsByTagName('head')[0].appendChild(g);
          },
        };
      return (
        (window[b] = function () {
          c.onreadystatechange.apply(this, arguments);
        }),
        c
      );
    }),
    (w.xdr = function (a, b) {
      var c,
        d,
        e = a.url || '',
        f = (a.type || 'GET').toUpperCase(),
        g = void 0 !== a.data ? a.data : {},
        h = a.headers || {},
        i = function () {
          b({ isError: !0 });
        },
        j = void 0 !== a.async ? a.async : !0;
      if (XMLHttpRequest) {
        if (((c = new XMLHttpRequest()), 'withCredentials' in c)) {
          c.open(f, e, j),
            (c.onerror = i),
            (c.onreadystatechange = function () {
              4 === c.readyState && b(c.status >= 200 && c.status < 400 ? { data: c.responseText, status: c.status } : { isError: !0, status: c.status });
            });
          for (d in h) h.hasOwnProperty(d) && c.setRequestHeader(d, h[d]);
          c.send(g);
        }
      } else if (XDomainRequest) {
        (c = new XDomainRequest()),
          c.open(f, e),
          (c.onerror = i),
          (c.onload = function () {
            b(c.responseText);
          });
        for (d in h) h.hasOwnProperty(d) && c.setRequestHeader(d, h[d]);
        c.send(g);
      } else b({ isError: !0, message: 'CORS not supported' });
    }),
    (w.log = function () {
      if (window.console && window.console.log) {
        var a = Array.prototype.slice.call(arguments);
        console.log.apply(console, a);
      }
    }),
    (w.addToken = function (a, b) {
      return a && (b.auth = { token: a }), b;
    }),
    (w.getServiceEndpoint = function (a) {
      return 'stg' === a ? 'https://api-stg.spilgames.com' : 'https://api.spilgames.com';
    }),
    (w.isWrapped = function () {
      return void 0 !== (window.PhoneGap || window.cordova || window.Cordova);
    }),
    (w.isArray =
      Array.isArray ||
      function (a) {
        return '[object Array]' === Object.prototype.toString.call(a);
      }),
    (w._getQueryString = function () {
      return window.location.search;
    }),
    (w._getPortalHost = function () {
      var a;
      return (a = parent !== window ? this._getDomainFromReferrer() : this._getDomainFromLocation());
    }),
    (w._getDomainFromLocation = function () {
      return window && window.location && window.location.hostname ? window.location.hostname : 'unknown';
    }),
    (w._getDomainFromReferrer = function () {
      var a = document.referrer;
      return (a = this.extractDomain(a));
    }),
    (w.extractDomain = function (a) {
      var b;
      return (b = a.indexOf('://') > -1 ? a.split('/')[2] : a.split('/')[0]), (b = b.split(':')[0]);
    }),
    (w.validateSchema = function (a, b) {
      for (var c in b)
        if (b.hasOwnProperty(c)) {
          if (!a.hasOwnProperty(c)) return { error: 'Wrong argument passed: ' + c };
          if (a.hasOwnProperty(c)) {
            var d = 'object' == typeof a[c] ? a[c].type : a[c];
            if (b[c].constructor.name !== d) return { error: 'Wrong value type for ' + c + ': expected ' + a[c] + ', got ' + b[c].constructor.name };
            var e = (a[c] && a[c].values) || [];
            if (-1 === e.indexOf(b[c])) return { error: 'Wrong value for ' + c + ': expected ' + e.join(' or ') + ', got ' + b[c] };
          }
        }
      return { error: !1 };
    });
  var x = {};
  (x.__ = {}),
    (x.__.user = (function () {
      var a = 'gui';
      return {
        getUserId: function (b) {
          var c;
          if (localStorage) return (c = localStorage.getItem(a)), c || (c = 'op_' + String(Math.floor(999999999 * Math.random()))), this.setUserId(c), c;
        },
        setUserId: function (b) {
          return localStorage ? (localStorage.setItem(a, b), !0) : !1;
        },
      };
    })()),
    (x.getGameConfig = function (a) {
      var b = this;
      v.getGameConfig(function (c) {
        a(c ? c : b.getLocalConfig());
      });
    }),
    (x.getBrandingConfig = function (a, b) {
      v.getBrandingConfig(a, b);
    }),
    (x.getLocalConfig = function (a) {
      var b = this;
      a = a && Object.keys(a).length ? a : { portal: {}, game: {}, branding: {}, user: {}, localization: {} };
      var c = b.__.user.getUserId(a),
        d = {
          isLocal: a.isLocal || !1,
          game: { applicationId: a.portal.applicationId || '0', contentarId: a.portal.contentarId || '0', info: a.game.info || {}, settings: a.game.objectSettings || {}, properties: a.game.properties || {}, features: { achievements: a.game.achievements || !1, gameSidePanel: a.game.gameSidePanel || !1, highscores: a.game.highscores || !1, recommendedGames: a.game.recommendedGames || !1 } },
          user: { authenticated: a.user.authenticated || !1, username: a.user.username || '', appToken: a.user.appToken || '', userId: c || '', token: a.user.token || '' },
          portal: { host: w._getPortalHost(), siteId: a.portal.siteId || 0, channelId: a.portal.channelId || 0, applicationId: a.portal.applicationId || '0', gamestate: a.portal.gamestate || !1, env: 'stg' === a.portal.env ? 'stg' : 'prd', spilStorageId: a.portal.spilStorageId || '' },
          branding: a.branding || {},
          localization: a.localization || {},
        };
      return (d.branding.logo = d.branding.logo || {}), (d.branding.logo.url = d.branding.logo.url || !1), (d.branding.logo.image = d.branding.logo.image || !1), d;
    }),
    (x.configFromData = function (a) {
      var b = { game: { applicationId: a.id }, user: { userId: a.userid ? a.userid : void 0, appToken: a.appToken ? a.appToken : void 0 }, portal: { applicationId: a.id, siteId: a.site ? a.site : -1, channelId: a.channel ? a.channel : 100, gamestate: a.gamestate ? a.gamestate : !1, env: 'stg' === a.env ? 'stg' : 'prd', spilStorageId: a.spilStorageId } };
      return b;
    }),
    (x.setupStandaloneMode = function (a, b) {
      var c = {},
        d = {
          configar: {
            // branding: {
            //   main: { label: 'main', image: 'logo.png', url: 'mobile.taiminh.com', style: '', width: '202', height: '50', mime: 'image/png', type: 'png', handler: 'newTab', blacklisted: !0 },
            //   logo: { label: 'logo', image: 'logo.png', url: 'mobile.taiminh.com', style: '', width: '202', height: '50', mime: 'image/png', type: 'png', handler: 'newTab', blacklisted: !1 },
            //   more_games: { label: 'more_games', image: null, url: 'mobile.taiminh.com', style: '', width: null, height: null, mime: null, type: null, handler: 'newTab', blacklisted: !1 },
            //   splash_screen: { label: 'splash_screen', image: 'place_holder_string', url: 'http://mobile.taiminh.com', style: '', width: '0', height: '0', mime: 'image/png', type: 'png', handler: 'newTab', blacklisted: !1 },
            // },
          },
        };
      (c.JSLib = {
        memory: {},
        _channels: {},
        get: function (a) {
          return this.memory[a] ? this.memory[a] : !1;
        },
        set: function (a, b) {
          return (this.memory[a] = b), b;
        },
        publish: function (a, b) {
          this._channels[a] &&
            this._channels[a].forEach(function (a) {
              try {
                a.fn.call(this, b);
              } catch (c) {}
            });
        },
        subscribe: function (a, b) {
          if ('function' != typeof b) throw new Error('Callback has to be a function');
          if ('string' != typeof a) throw new Error('Channel name has to be a string');
          this._channels[a] || (this._channels[a] = []), this._channels[a].push({ fn: b });
        },
      }),
        (c.Net = {
          send: function (a, b) {
            b.call(this, {});
          },
        }),
        (window.SpilGamesBootstrap = []),
        (window.SpilGames = function () {
          var a = arguments;
          if (a[0] && 'string' == typeof a[0]) c.JSLib.publish(a[0], a[1] || null);
          else if (a[0] && a[0] instanceof Array) {
            var b,
              d,
              e = [];
            for (b = 0, d = a[0].length; d > b; b++) e.push(c[a[0][b]]);
            a[1].apply(this, e);
          }
        }),
        a && a.id
          ? w.callConfigar(a, function (c, e) {
              if (200 === c && 'string' == typeof e && JSON.parse(e)) {
                var f = JSON.parse(e),
                  g = x.configFromData(a);
                (g.branding = f.configar && f.configar.branding ? f.configar.branding : d.configar.branding), b.call(this, g);
              } else b.call(this, { isLocal: !0, branding: d.configar.branding });
            })
          : b.call(this, { isLocal: !0, branding: d.configar.branding });
    }),
    (x.getCachedConfig = function () {}),
    (b.prototype.newTab = function (a) {
      var b = '_blank',
        c = a.url,
        d = window.open(c, b);
      return d && d.focus(), d;
    }),
    (b.prototype.moreGames = function (a) {
      var b = a.brandName || 'a10';
      a.isStandalone ? this.newTab(a) : a.messenger && a.messenger.post && a.messenger.post('game.moregames', { branding: b });
    }),
    (b.prototype.displayOnTop = function (a) {
      if ('undefined' == typeof a || 'undefined' == typeof a.url || 'string' != typeof a.url || 'undefined' == typeof a.action || 'function' != typeof a.action) return 'undefined' != typeof a.callback || 'function' == typeof a.callback ? void a.callback() : void 0;
      var b = document.createElement('div'),
        c = a.url,
        d = a.action,
        e = a.callback;
      b.setAttribute('id', 'spilgames-splash-screen-sample'), document.body.appendChild(b);
      var f = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        g = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      return (
        (b.style.left = '0'),
        (b.style.top = '0'),
        (b.style.width = f + 'px'),
        (b.style.height = g + 'px'),
        (b.style.position = 'absolute'),
        (b.style.zIndex = '10000'),
        (b.onclick = d),
        c && (b.style.background = "url('" + c + "') center center no-repeat #FFF"),
        window.setTimeout(function () {
          var a = document.getElementById('spilgames-splash-screen-sample');
          a.parentNode.removeChild(a), e && e();
        }, 2e3),
        b
      );
    }),
    (b.prototype.displayBanner = function (a, b, c) {
      var d = this,
        e = a.eventTracking;
      (d.closeTimeOut = null), e.trackGameAPIEvent('bannerShow', {});
      var f = document.createElement('style');
      (f.type = 'text/css'),
        (f.innerHTML = d.getDisplayBannerCss()),
        (d.spilgames_crosspromotion_banner_container = document.createElement('div')),
        d.spilgames_crosspromotion_banner_container.appendChild(f),
        (d.spilgames_crosspromotion_banner_container.id = 'spilgames_crosspromotion_banner'),
        d.spilgames_crosspromotion_banner_container.setAttribute('style', this.getDisplayBannerCss().spilgames_crosspromotion_banner),
        (d.spilgames_crosspromotion_banner_container.innerHTML = d.getDisplayBannerHTML()),
        document.body.insertBefore(d.spilgames_crosspromotion_banner_container, document.body.childNodes[0]);
      var g = d.spilgames_crosspromotion_banner_container.querySelector('#banner-content');
      g.innerHTML = b;
      var h = document.getElementById('closebanner');
      (d.closeBanner = function () {
        (d.spilgames_crosspromotion_banner_container.style.opacity = 0),
          setTimeout(function () {
            d.advertisement.removeAd('div-gpt-ad-1461916237597-0'), document.body.removeChild(d.spilgames_crosspromotion_banner_container);
          }, 500),
          window.clearTimeout(d.closeTimeOut);
      }),
        h.addEventListener('touchend', function (a) {
          a.preventDefault(), a.target.click();
        }),
        h.addEventListener('click', function () {
          e.trackGameAPIEvent('bannerClose', {}), d.closeBanner();
        }),
        c.call(this);
    }),
    (b.prototype.displayDFPBanner = function (a) {
      function b() {
        var a = this,
          b = 'div-gpt-ad-1461916237597-0';
        this.advertisement.createDFP({ adUnitPath: '/' + this.advertisement.defaultAdUnitId + '/offportal', size: [300, 250], opt_div: b }),
          googletag.cmd.push(function () {
            googletag.pubads().addEventListener('slotRenderEnded', function (c) {
              c &&
                c.slot &&
                !c.isEmpty &&
                c.slot.getSlotElementId() === b &&
                ((a.spilgames_crosspromotion_banner_container.style.display = 'block'),
                setTimeout(function () {
                  a.spilgames_crosspromotion_banner_container.style.opacity = 1;
                }, 0),
                (a.closeTimeOut = setTimeout(a.closeBanner, 1e4)));
            });
          });
      }
      this.displayBanner(a, '<div id="div-gpt-ad-1461916237597-0"></div>', b);
    }),
    (b.prototype.getDisplayBannerCss = function () {
      var a = { spil_crosspromotion_closebtn: 'position:absolute;right:0;top:0px;', gptContainer: 'width:300px;height:250px;margin:25px auto;position:relative;box-shadow:0 0 4px 2px rgba(0,0,0,0.5);background:#000;', spilgames_crosspromotion_banner: 'width:100%;height:100%;overflow:hidden;position:absolute;opacity:0;display:none;z-index:99999;transition:opacity .5s;background:rgba(0, 0, 0, 1);' };
      return a;
    }),
    (b.prototype.getDisplayBannerHTML = function () {
      var a = '<div id="gptContainer" style="' + this.getDisplayBannerCss().gptContainer + '"><div id="banner-content"></div><img id="closebanner" class="spil_crosspromotion_closebtn" style="' + this.getDisplayBannerCss().spil_crosspromotion_closebtn + '" src="http://files.cdn.spilcloud.com/gameapitest/1448551529_close.png"/></div>';
      return a;
    }),
    (c.prototype.init = function (a) {
      (a = a || {}), (this.data = a.data || this.data), (this.onportal = a.data.portal.siteId > 0), (this.defaultAdUnitId = '59392726'), (this.defaultAdUnitPath = 'Offportal');
    }),
    (c.prototype.getDefaultAdUnitPath = function () {
      return '/' + this.defaultAdUnitId + '/' + this.defaultAdUnitPath;
    }),
    (c.prototype.getOptSize = function (a) {
      var b = ['320x50', '320x100', '300x250', '468x60', '728x90', '336x280', '728x90', '160x600'],
        c = a.getAttribute('data-size'),
        d = !0;
      return b.indexOf(c) > -1 && ((c = '300x250'), (d = !1)), (c = c.split('x')), (c[0] = +c[0]), (c[1] = +c[1]), { isValid: d, size: c };
    }),
    (c.prototype.createDFP = function (a) {
      var b = this;
      if (((a.adUnitPath = a.adUnitPath || this.getDefaultAdUnitPath()), console.log(a.adUnitPath), void 0 === window.googletag)) {
        (window.googletag = window.googletag || {}), (googletag.cmd = googletag.cmd || []);
        var c = document.createElement('script');
        (c.src = 'http://www.googletagservices.com/tag/js/gpt.js'), document.body.insertBefore(c, document.body.childNodes[0]);
      }
      void 0 !== b.adSlots[a.opt_div]
        ? b.refreshAdSlot(a.opt_div)
        : googletag.cmd.push(function () {
            (b.adSlots[a.opt_div] = googletag.defineSlot(a.adUnitPath, a.size, a.opt_div).addService(googletag.pubads()).setTargeting('GameID', b.data.game.applicationId).setTargeting('HostName', b.data.portal.host)), googletag.enableServices(), googletag.display(a.opt_div);
          });
    }),
    (c.prototype.refreshAdSlot = function (a) {
      googletag.pubads().refresh([this.adSlots[a]]);
    }),
    (c.prototype.addAdToElement = function (a) {
      var b = document.getElementById(a);
      if (null === b || !b instanceof HTMLElement) return void console.log('There is no element with id: ' + a);
      var c = this.getOptSize(b);
      c.isValid || console.log('AD Size for ' + a + ' is not valid, switching to default size: ' + c.size), this.createDFP({ opt_div: a, size: c.size });
    }),
    (c.prototype.parseDOMForAds = function () {
      for (
        var a = document.querySelectorAll('[data-spil-games-ph]'),
          b = this,
          c = function (c) {
            window.setTimeout(function () {
              var d = a[c].getAttribute('id');
              void 0 === b.adSlots[d] && b.addAdToElement(d);
            }, 100 * c);
          },
          d = 0,
          e = a.length;
        e > d;
        d++
      )
        c(d);
    }),
    (c.prototype.refreshAds = function () {
      var a = this,
        b = 0,
        c = function (c) {
          window.setTimeout(function () {
            console.log(c), a.refreshAdSlot(c);
          }, 100 * ++b);
        };
      for (var d in this.adSlots) c(d);
    }),
    (c.prototype.removeAd = function (a) {
      googletag.destroySlots([this.adSlots[a]]), delete this.adSlots[a];
    }),
    (d.prototype.get = function (a) {
      for (var b = this.dataStore, c = a.split('.'), d = c.length, e = 0; d - 1 > e; e++) {
        if (!b[c[e]]) return null;
        b = b[c[e]];
      }
      return b[c[d - 1]] || null;
    }),
    (d.prototype.put = function (a, b) {
      for (var c = this.dataStore, d = a.split('.'), e = d.length, f = 0; e - 1 > f; f++) {
        var g = d[f];
        c[g] || (c[g] = {}), (c = c[g]);
      }
      c[d[e - 1]] = b;
    }),
    (d.prototype.set = function (a, b) {
      this.put(a, b);
      var c = Date.parse(new Date());
      return this.notify({ type: 'new', key: a, current: b, previous: null, timestamp: c }), b;
    }),
    (d.prototype.update = function (a, b) {
      var c,
        d,
        e = null;
      return this.get(a) ? ((c = 'update'), (e = this.get(a))) : (c = 'new'), this.put(a, b), (d = Date.parse(new Date())), this.notify({ type: c, key: a, current: b, previous: e, timestamp: d }), b;
    }),
    (d.prototype.remove = function (a) {
      if (this.get(a)) {
        var b,
          c = this.get(a);
        return this.put(a, null), (b = Date.parse(new Date())), this.notify({ type: 'remove', key: a, current: null, previous: c, timestamp: b }), !0;
      }
      return !1;
    }),
    (d.prototype._setCache = function (a) {
      this.dataStore = a;
    }),
    (d.prototype._getCache = function () {
      return this.dataStore;
    }),
    (d.prototype.notify = function (a) {
      if (this.IS_MASTER) {
        var b = new r({ type: 'datachange', callbackId: null, data: a }).encode();
        return window.postMessage(b, '*'), b;
      }
    }),
    (e.prototype.init = function (a) {
      (a = a || {}), (this.data = a.data || this.data), this.data && this.data.game && this.data.user && ((this.appId = this.data.game.applicationId || null), (this.appToken = this.data.user.appToken || null), (this.token = this.data.user.token || null)), this._setupEvents(), this.appToken || this._getAppToken(), (this.IS_SLAVE || this.IS_STANDALONE || w.isWrapped()) && this._scheduleRefresh();
    }),
    (e.prototype.getAppToken = function () {
      return this.appToken;
    }),
    (e.prototype._setupEvents = function () {
      this.IS_MASTER ? this.messenger.subscribe('gameapi.apptoken.getAppToken', this._getAppToken, this) : this.messenger.subscribe('gameapi.apptoken.getAppTokenResponse', this._getAppTokenResponse, this);
    }),
    (e.prototype._retryAppToken = function (a) {
      (a || this.appTimerDelay !== this.appDelayMax) && (a && !this.appError && ((this.appTimerDelay = this.appDelayMin), (this.appError = !0)), this._unschedule(), a ? this._increaseDelay() : this._resetDelay(), this._scheduleRefresh());
    }),
    (e.prototype._scheduleRefresh = function () {
      var a = this;
      null === this.appTimer &&
        (this.appTimer = setInterval(function () {
          a._getAppToken();
        }, this.appTimerDelay));
    }),
    (e.prototype._unschedule = function () {
      this.appTimer && clearTimeout(this.appTimer), (this.appTimer = null);
    }),
    (e.prototype._increaseDelay = function () {
      this.appTimerDelay = Math.min(2 * this.appTimerDelay, this.appDelayMax);
    }),
    (e.prototype._resetDelay = function () {
      this.appTimerDelay = this.appDelayMax;
    }),
    (e.prototype._getAppToken = function () {
      var a = this.messenger,
        b = this;
      if (!this.moduleReady) throw new Error('This method cannot be called before the API is loaded');
      this.IS_MASTER || this.messenger._postMessage({}, void 0, 'gameapi.apptoken.getAppToken'),
        this.IS_MASTER &&
          ('function' == typeof SpilGames
            ? SpilGames('api.account.getApplicationToken', w.addToken(this.token, { cache: !1, applicationId: this.appId }), function (c) {
                c.error || !c.appAuth.token ? a._postMessage({}, void 0, 'gameapi.apptoken.getAppTokenResponse') : ((b.appToken = c.appAuth.token), a._postMessage({ appToken: c.appAuth.token, level: c.level }, void 0, 'gameapi.apptoken.getAppTokenResponse'));
              })
            : a._postMessage({}, void 0, 'gameapi.apptoken.getAppTokenResponse'));
    }),
    (e.prototype._getAppTokenResponse = function (a) {
      a.appToken ? ((this.appToken = a.appToken), this._retryAppToken(!1)) : this._retryAppToken(!0);
    }),
    (f.prototype.init = function (a) {
      (a = a || {}),
        (this.data = a.data || this.data),
        this.data && this.data.game && this.data.user && this.data.portal && ((this.gameState.appId = this.data.game.applicationId || null), (this.gameState.userId = this.data.user.userId || null), (this.isGamestate = this.data.portal.gamestate || !1), (this.endpoint = w.getServiceEndpoint(this.data.portal.env)), (this.spilStorageId = this.data.portal.spilStorageId)),
        this.isGamestate && (this.IS_SLAVE || this.IS_STANDALONE || w.isWrapped()) && (this.listenStorageEvents(), this.preloadGameState());
    }),
    (f.prototype.listenStorageEvents = function () {
      var a = function (a) {
        this.onStorageEvent(a);
      }.bind(this);
      window.addEventListener('storage', a, !1);
    }),
    (f.prototype.flagDirtyKey = function (a) {
      -1 === this.gameState.dirtyKeys.indexOf(a) && (this.gameState.dirtyKeys.push(a), this.scheduleSyncState());
    }),
    (f.prototype.unschedule = function () {
      this.flushTimer && clearTimeout(this.flushTimer), (this.flushTimer = null);
    }),
    (f.prototype.scheduleSyncState = function () {
      var a = this;
      null === this.flushTimer &&
        (this.flushTimer = setInterval(function () {
          a.syncState();
        }, this.flushTimerDelay));
    }),
    (f.prototype.increaseDelaySyncState = function () {
      this.flushTimerDelay = Math.min(2 * this.flushTimerDelay, this.flushDelayMax);
    }),
    (f.prototype.resetDelaySyncState = function () {
      this.flushTimerDelay = this.flushDelayMin;
    }),
    (f.prototype.onStorageEvent = function (a) {
      a && a.url && a.url.indexOf('spilStorageId=' + this.spilStorageId) > 0 && this.flagDirtyKey(a.key);
    }),
    (f.prototype.preloadGameState = function () {
      var a = { url: this.endpoint + '/v1/gamestate/' + this.gameState.userId + '/' + this.gameState.appId, type: 'GET', dataType: 'JSON', headers: { 'x-auth-token': this.appToken.getAppToken() } };
      w.xdr(a, function (a) {
        if (a.isError) w.log('GameAPIGameState failed preloading: ' + a.status);
        else {
          var b = JSON.parse(a.data);
          if (b && b.gamestate) {
            var c = b.gamestate,
              d = 0,
              e = null;
            for (e in c) c.hasOwnProperty(e) && ((window.localStorage[e] = c[e]), d++);
            w.log('GameAPIGameState preloaded: ' + d + ' keys');
          }
        }
      });
    }),
    (f.prototype.retrySyncState = function (a) {
      w.log(a), this.increaseDelaySyncState(), this.scheduleSyncState();
    }),
    (f.prototype.syncState = function () {
      if ((this.unschedule(), !this.gameState.appId)) return this.retrySyncState('GameAPIGameState.prototype.syncStat no appId');
      if (!this.gameState.userId) return this.retrySyncState('GameAPIGameState.prototype.syncState no userId');
      for (var a, b = this.gameState.appId, c = this.gameState.userId, d = this.gameState.dirtyKeys, e = { set: {}, remove: [] }, f = 0, g = this, h = 0; h < d.length; h++) (a = window.localStorage[d[h]]), void 0 === a ? e.remove.push(d[h]) : ((e.set[d[h]] = a), (f = Math.max(a.length, f)));
      if (d.length > 0) {
        var i = { url: this.endpoint + '/v1/gamestate/' + c + '/' + b, type: 'POST', data: JSON.stringify(e), async: !0, headers: { 'x-auth-token': this.appToken.getAppToken() } };
        w.xdr(i, function (a) {
          a.isError ? g.retrySyncState('GameAPIGameState error syncing state') : (w.log('GameAPIGameState synced ' + d.length + ' keys'), g.resetDelaySyncState(), (g.gameState.dirtyKeys = []));
        });
        var j = { numkeys: d.length, maxdatalength: f, userid: c };
        this.eventTracking.trackGameAPIEvent('gameState', j);
      }
      return !0;
    }),
    (g.prototype.init = function (a) {
      this.data = a.data || null;
    }),
    (g.prototype._performAction = function (a) {
      var b = new r(a.data || {}),
        c = this.messenger,
        d = this.subscribers || {};
      if (b && b.type && b.data)
        switch (b.type) {
          case 'gameEvent':
            b.data[0] && d[b.data[0]] && d[b.data[0]].length > 0
              ? d[b.data[0]].forEach(function (a) {
                  a.call(this), c._postMessage([b.data[0], { origin: 'slave' }, null], null, 'gameState');
                })
              : b.data[0] && b.data[1] && 'slave' === b.data[1].origin && 'function' == typeof SWFtoJS && SWFtoJS({ call: b.data[0], params: {} });
            break;
          case 'gameState':
            b.data[0] && b.data[1] && 'slave' === b.data[1].origin && (this.gameState = b.data[0]);
        }
    }),
    (g.prototype.on = function (a, b) {
      this.IS_SLAVE && (this.subscribers[a] || (this.subscribers[a] = []), this.subscribers[a].push(b));
    }),
    (g.prototype.emit = function (a) {
      if (!this.IS_MASTER) throw new Error('Only the master environment can emit game events');
      if (!this.moduleReady) throw new Error('This method cannot be called before the API is loaded');
      if (a === this.gameState) throw new Error('The game is already in state: `' + a + '`');
      this.messenger._postMessage([a, { origin: 'master' }, null], null, 'gameEvent');
    }),
    (g.prototype.isSiteLock = function () {
      var a = !0;
      if (!this.moduleReady) throw new Error('This method cannot be called before the API is loaded');
      return this.data && this.data.portal && this.data.portal.siteId && this.data.portal.siteId > 0 && this.data.portal.siteId < 500 && (a = !1), a;
    }),
    (g.prototype.adjustHeight = function (a) {
      if (!this.moduleReady) throw new Error('This method cannot be called before the API is loaded');
      this.IS_MASTER ? 'function' == typeof SpilGames && 'undefined' != typeof SpilGames.Events && 'function' == typeof SpilGames.Events.publish && SpilGames.Events.publish('portal.adjustheight', { height: a, onsuccess: function () {} }) : (this.messenger._postMessage(a, void 0, 'gameapi.game.adjustHeight'), this.messenger._postMessage(['log.gameapi.game.adjustHeight', { origin: 'slave', height: a }, null], null, 'log'));
    }),
    (h.prototype.init = function (a) {
      (a = a || {}), (this.data = a.data || this.data), this._setupEvents();
    }),
    (h.prototype._setupEvents = function () {
      this.isMaster || this.messenger.subscribe('gameapi.locale.change', this._localeChange, this);
    }),
    (h.prototype._localeChange = function (a) {
      this.activeLanguage = a;
    }),
    (h.prototype.changeLocale = function (a) {
      this.isMaster && this.messenger._postMessage(a, void 0, 'gameapi.locale.change');
    }),
    (h.prototype.getLocalizedText = function (a, b) {
      if (!this.moduleReady) throw new Error('This method cannot be called before the API is loaded');
      var c = a;
      return this.data && this.data.localization[this.activeLanguage] && this.data.localization[this.activeLanguage][a] && this.data.localization[this.activeLanguage][a].id && this.data.localization[this.activeLanguage][a].id === b && (c = this.data.localization[this.activeLanguage][a].text), c;
    }),
    (i.prototype.init = function (a) {
      this._setLocale(a), this._setupEvents(), a && a.data && a.data.portal && a.data.portal.siteId && a.data.portal.siteId < 500 && '0' !== a.data.portal.siteId && (this.isAvailable = !0);
    }),
    (i.prototype._setupEvents = function () {
      this.IS_MASTER ? (this.messenger.subscribe('gameapi.user.forceAuthentication', this.forceAuthentication, this), this.messenger.subscribe('gameapi.user.getUser', this.getUser, this), this.messenger.subscribe('gameapi.user.login', this.login, this)) : (this.messenger.subscribe('gameapi.user.loginResponse', this._loginResponse, this), this.messenger.subscribe('gameapi.user.getUserResponse', this._getUserResponse, this));
    }),
    (i.prototype.login = function (a, b) {
      var c = this.messenger;
      if (((a = a || {}), (this.logincallback = b), this.IS_MASTER))
        SpilGames('api.auth.getToken', { context: { channelid: 100, siteid: 2 } }, function (b) {
          SpilGames('api.auth.login', { auth: { token: b.auth.token }, login: a.username, password: a.password }, function (a) {
            c._postMessage(a, void 0, 'gameapi.user.loginResponse');
          });
        });
      else {
        var d = {};
        (d.username = a.username || ''), (d.password = a.password || ''), c._postMessage(d, void 0, 'gameapi.user.login');
      }
    }),
    (i.prototype._loginResponse = function (a) {
      var b = {};
      (b.success = !1), a.auth && a.auth.token && ((this.loggedIn = !0), (this.token = a.auth.token), (b.success = !0)), this.logincallback(b), (this.logincallback = function () {});
    }),
    (i.prototype.forceAuthentication = function () {
      if (!this.moduleReady) throw new Error('This method cannot be called before the API is loaded');
      this.IS_MASTER ? 'function' == typeof SpilGames && 'undefined' != typeof SpilGames.Portal && 'function' == typeof SpilGames.Portal.forceAuthentication && SpilGames.Portal.forceAuthentication({ onsuccess: function () {} }) : (this.messenger._postMessage({}, void 0, 'gameapi.user.forceAuthentication'), this.messenger._postMessage(['log.gameapi.user.forceAuthentication', { origin: 'slave' }, null], null, 'log'));
    }),
    (i.prototype.getUser = function (a) {
      var b = this.messenger;
      if (!this.moduleReady) throw new Error('This method cannot be called before the API is loaded');
      if (this.IS_MASTER)
        'function' == typeof SpilGames
          ? this.isAvailable
            ? SpilGames(['JSLib'], function (a) {
                a && 'function' == typeof a
                  ? a('api.user.getExtended', function (a) {
                      b._postMessage(a, void 0, 'gameapi.user.getUserResponse');
                    })
                  : b._postMessage({ userInfoExtended: {} }, void 0, 'gameapi.user.getUserResponse');
              })
            : this.loggedIn
            ? SpilGames('api.user.getExtended', { auth: { token: this.token }, context: { channelid: 100, siteid: 2 } }, function (a) {
                b._postMessage(a, void 0, 'gameapi.user.getUserResponse');
              })
            : b._postMessage({ userInfoExtended: {} }, void 0, 'gameapi.user.getUserResponse')
          : b._postMessage({ userInfoExtended: {} }, void 0, 'gameapi.user.getUserResponse');
      else {
        if ('function' != typeof a) throw new Error('The argument passed to the GameAPI.User.getUser method should be a function');
        (this.usercallback = a), b._postMessage({}, void 0, 'gameapi.user.getUser'), b._postMessage(['log.gameapi.user.getUser', { origin: 'slave', argumentType: typeof a }, null], null, 'log');
      }
    }),
    (i.prototype._getUserResponse = function (a) {
      var b = a.userInfoExtended || {},
        c = this._validateData(b),
        d = !1;
      '' === b.guid && (d = !0), this.eventTracking.trackGameAPIEvent('userGet', { guid: c.guid || '', fail: d }), this.usercallback(c);
    }),
    (i.prototype._validateData = function (a) {
      var b = { uid: a.uid || '', guid: a.guid || '', displayName: a.name || '', pic_square: a.avatarUrl || '', pic_square_large: a.avatarLargeUrl || '', gender: a.gender || '', age: a.age || '', birthday: a.birthdate || '', level: a.level || '', locale: this.locale || '' };
      return b;
    }),
    (i.prototype._setLocale = function (a) {
      a && a.data && a.data.portal && a.data.portal.siteId && (this.locale = this._getLang(a.data.portal.siteId));
    }),
    (i.prototype._getLang = function (a) {
      for (
        var b = [
            { siteid: 1, lang: 'nl-NL' },
            { siteid: 2, lang: 'en-US' },
            { siteid: 5, lang: 'de-DE' },
            { siteid: 11, lang: 'fr-FR' },
            { siteid: 12, lang: 'fr-FR' },
            { siteid: 15, lang: 'it-IT' },
            { siteid: 16, lang: 'pl-PL' },
            { siteid: 24, lang: 'en-US' },
            { siteid: 25, lang: 'nl-NL' },
            { siteid: 26, lang: 'de-DE' },
            { siteid: 44, lang: 'sv-SE' },
            { siteid: 50, lang: 'pt-BR' },
            { siteid: 55, lang: 'en-ID' },
            { siteid: 79, lang: 'en-US' },
            { siteid: 86, lang: 'es-ES' },
            { siteid: 87, lang: 'pt-BR' },
            { siteid: 88, lang: 'en-US' },
            { siteid: 90, lang: 'en-US' },
            { siteid: 91, lang: 'pt-BR' },
            { siteid: 92, lang: 'en-GB' },
            { siteid: 93, lang: 'nl-NL' },
            { siteid: 94, lang: 'de-DE' },
            { siteid: 95, lang: 'fr-FR' },
            { siteid: 96, lang: 'es-ES' },
            { siteid: 97, lang: 'es-ES' },
            { siteid: 98, lang: 'pl-PL' },
            { siteid: 99, lang: 'it-IT' },
            { siteid: 100, lang: 'sv-SE' },
            { siteid: 101, lang: 'pt-BR' },
            { siteid: 102, lang: 'en-GB' },
            { siteid: 103, lang: 'ru-RU' },
            { siteid: 104, lang: 'ru-RU' },
            { siteid: 105, lang: 'ru-RU' },
            { siteid: 106, lang: 'it-IT' },
            { siteid: 107, lang: 'en-GB' },
            { siteid: 108, lang: 'sv-SE' },
            { siteid: 109, lang: 'pl-PL' },
            { siteid: 115, lang: 'en-GB' },
            { siteid: 116, lang: 'tr-TR' },
            { siteid: 118, lang: 'ms-MY' },
            { siteid: 119, lang: 'en-GB' },
            { siteid: 120, lang: 'jp-JP' },
            { siteid: 121, lang: 'en-US' },
            { siteid: 122, lang: 'es-ES' },
            { siteid: 123, lang: 'en-US' },
            { siteid: 124, lang: 'en-US' },
            { siteid: 125, lang: 'AR' },
            { siteid: 126, lang: 'en-US' },
            { siteid: 127, lang: 'en-US' },
            { siteid: 128, lang: 'nl-NL' },
            { siteid: 129, lang: 'es-AR' },
            { siteid: 130, lang: 'es-MX' },
            { siteid: 131, lang: 'de-DE' },
            { siteid: 132, lang: 'en-EN' },
            { siteid: 133, lang: 'en-EN' },
            { siteid: 134, lang: 'en-ID' },
            { siteid: 135, lang: 'de-DE' },
            { siteid: 136, lang: 'pl-PL' },
            { siteid: 137, lang: 'en-EN' },
            { siteid: 138, lang: 'it-IT' },
            { siteid: 139, lang: 'uk-UA' },
            { siteid: 140, lang: 'en-ID' },
            { siteid: 141, lang: 'uk-UA' },
            { siteid: 142, lang: 'ja-JP' },
            { siteid: 143, lang: 'nl-NL' },
            { siteid: 144, lang: 'en-US' },
            { siteid: 145, lang: 'en-US' },
            { siteid: 146, lang: 'en-US' },
            { siteid: 147, lang: 'en-US' },
            { siteid: 148, lang: 'en-US' },
            { siteid: 149, lang: 'en-IN' },
            { siteid: 150, lang: 'tr-TR' },
            { siteid: 151, lang: 'de-DE' },
            { siteid: 152, lang: 'ru-RU' },
            { siteid: 153, lang: 'ru-RU' },
            { siteid: 154, lang: 'ru-RU' },
            { siteid: 155, lang: 'en-US' },
            { siteid: 156, lang: 'tr-TR' },
            { siteid: 157, lang: 'tr-TR' },
            { siteid: 158, lang: 'tr-TR' },
            { siteid: 159, lang: 'en-US' },
            { siteid: 160, lang: 'en-US' },
            { siteid: 161, lang: 'en-US' },
            { siteid: 162, lang: 'en-US' },
            { siteid: 163, lang: 'en-US' },
            { siteid: 164, lang: 'en-US' },
            { siteid: 165, lang: 'en-US' },
            { siteid: 166, lang: 'en-US' },
            { siteid: 167, lang: 'en-US' },
            { siteid: 168, lang: 'en-US' },
            { siteid: 169, lang: 'en-US' },
            { siteid: 170, lang: 'en-US' },
            { siteid: 171, lang: 'en-US' },
            { siteid: 172, lang: 'en-US' },
            { siteid: 173, lang: 'en-US' },
            { siteid: 174, lang: 'en-US' },
            { siteid: 175, lang: 'en-US' },
            { siteid: 176, lang: 'en-US' },
            { siteid: 177, lang: 'en-US' },
            { siteid: 178, lang: 'en-US' },
            { siteid: 179, lang: 'en-US' },
            { siteid: 180, lang: 'en-UK' },
            { siteid: 181, lang: 'nl-NL' },
            { siteid: 182, lang: 'fr-FR' },
            { siteid: 183, lang: 'de-DE' },
            { siteid: 184, lang: 'en-US' },
            { siteid: 185, lang: 'en-US' },
            { siteid: 186, lang: 'en-EN' },
            { siteid: 187, lang: 'en-EN' },
            { siteid: 188, lang: 'en-EN' },
            { siteid: 189, lang: 'en-EN' },
            { siteid: 190, lang: 'en-EN' },
            { siteid: 191, lang: 'en-US' },
            { siteid: 192, lang: 'pt-BR' },
            { siteid: 193, lang: 'en-US' },
            { siteid: 450, lang: 'en-US' },
            { siteid: 451, lang: 'nl-NL' },
            { siteid: 452, lang: 'de-DE' },
            { siteid: 453, lang: 'fr-FR' },
            { siteid: 454, lang: 'es-ES' },
            { siteid: 455, lang: 'it-IT' },
            { siteid: 456, lang: 'en-GB' },
            { siteid: 457, lang: 'en-ID' },
            { siteid: 458, lang: 'es-AR' },
            { siteid: 459, lang: 'es-LA' },
            { siteid: 460, lang: 'es-MX' },
            { siteid: 461, lang: 'jp-JP' },
            { siteid: 462, lang: 'ms-MY' },
            { siteid: 463, lang: 'pl-PL' },
            { siteid: 464, lang: 'pt-BR' },
            { siteid: 465, lang: 'pt-PT' },
            { siteid: 466, lang: 'ru-RU' },
            { siteid: 467, lang: 'sv-SE' },
            { siteid: 468, lang: 'tr-TR' },
          ],
          c = 0;
        c < b.length;
        c++
      )
        if (b[c].siteid === a) return b[c].lang;
      return '';
    }),
    (j.prototype.init = function (a) {
      this._setupEvents(), a && a.data && a.data.portal && a.data.portal.siteId && a.data.portal.siteId < 500 && '0' !== a.data.portal.siteId && (this.isAvailable = !0);
    }),
    (j.prototype._setupEvents = function () {
      this.IS_MASTER ? (this.messenger.subscribe('gameapi.friends.showInvite', this.showInvite, this), this.messenger.subscribe('gameapi.friends.getFriends', this.getFriends, this)) : this.messenger.subscribe('gameapi.friends.getFriendsResponse', this._getFriendsResponse, this);
    }),
    (j.prototype.showInvite = function (a) {
      if (!this.moduleReady) throw new Error('This method cannot be called before the API is loaded');
      this.IS_MASTER ? 'function' == typeof SpilGames && 'undefined' != typeof SpilGames.Events && 'function' == typeof SpilGames.Events.publish && SpilGames.Events.publish('invitefriends.request') : (this.messenger._postMessage({}, void 0, 'gameapi.friends.showInvite'), this.messenger._postMessage(['log.gameapi.friends.showInvite', { origin: 'slave' }, null], null, 'log'), this.eventTracking.trackGameAPIEvent('friendsInvite', { guid: this.guid || '' }));
    }),
    (j.prototype.getFriends = function (a) {
      var b = this.messenger;
      if (!this.moduleReady) throw new Error('This method cannot be called before the API is loaded');
      if (this.IS_MASTER) {
        if ('function' == typeof SpilGames) {
          var c = this;
          SpilGames(['JSLib'], function (a) {
            a && 'function' == typeof a
              ? a('api.user.getExtended', function (a) {
                  a.userInfoExtended && 'guest' !== a.userInfoExtended.name && a.userInfoExtended.guid ? ((this.userGuid = a.userInfoExtended.guid), c._getFriendsFromPortal([], 1)) : b._postMessage({ friendList: {} }, void 0, 'gameapi.friends.getFriendsResponse');
                })
              : b._postMessage({ friendList: {} }, void 0, 'gameapi.friends.getFriendsResponse');
          });
        }
      } else 'function' == typeof a && (this.friendscallback = a), b._postMessage({}, void 0, 'gameapi.friends.getFriends'), b._postMessage(['log.gameapi.friends.getFriends', { origin: 'slave' }, null], null, 'log');
    }),
    (j.prototype._getFriendsFromPortal = function (a, b) {
      var c = this.messenger,
        d = a;
      if ('function' == typeof SpilGames) {
        var e = this;
        SpilGames('api.friend.list', { guid: this.userGuid, pageControl: { page: b, pageSize: 500 } }, function (a) {
          a.error ? c._postMessage(d, void 0, 'gameapi.friends.getFriendsResponse') : ((d = d.concat(a.friendList)), a.pageControl && a.pageControl.totalPages > b ? e._getFriendsFromPortal(d, b + 1) : c._postMessage({ friendList: d }, void 0, 'gameapi.friends.getFriendsResponse'));
        });
      } else c._postMessage({ friendList: a }, void 0, 'gameapi.friends.getFriendsResponse');
    }),
    (j.prototype._getFriendsResponse = function (a) {
      var b = this._validateData(a.friendList),
        c = !1;
      0 === b.length && (c = !0), this.eventTracking.trackGameAPIEvent('friendsGet', { guid: this.guid || '', fail: c }), this.friendscallback(b);
    }),
    (j.prototype._validateData = function (a) {
      for (var b = [], c = 0; c < a.length; c++) {
        var d = { uid: a[c].uid || '', guid: a[c].guid || '', displayName: a[c].name || '', pic_square: a[c].avatarUrl || '', pic_square_large: a[c].avatarLargeUrl || '', gender: a[c].gender || '', age: a[c].age || '' };
        b.push(d);
      }
      return b;
    }),
    (k.prototype.init = function (a) {
      (a = a || {}), (this.data = a.data || this.data), this.data && this.data.user && (this.state.userId = this.data.user.userId || null);
    }),
    (k.prototype._setupMasterEvent = function () {
      this.IS_MASTER && this.messenger.subscribe('gameapi.score', this.submit, this);
    }),
    (k.prototype._obfuscateScore = function (a) {
      var b = 2166136261,
        c = a.length,
        d = 0;
      if (!c) return b;
      for (; c > d; ++d) (b ^= a.charCodeAt(d)), (b += (b << 1) + (b << 4) + (b << 7) + (b << 8) + (b << 24));
      return b >>> 0;
    }),
    (k.prototype.submit = function (a) {
      if (!this.moduleReady) throw new Error('This method cannot be called before the API is loaded');
      if (this.IS_MASTER) {
        if (this.data && this.data.portal && this.data.portal.siteId && this.data.portal.siteId < 500 && this.data.portal.siteId > 0) {
          var b = !1,
            c = window.outerHeight - window.innerHeight,
            d = '';
          this.appToken && (d = this.appToken.getAppToken()), c === this.initialHeight && (b = !0), this.eventTracking.trackGameAPIEvent('scoreSubmit', { score: a, initialheight: this.initialHeight, submitheight: c, equals: b, os: this._obfuscateScore('' + a), guid: this.state.userId, apptoken: d }), 'function' == typeof SWFtoJS && SWFtoJS({ call: 'UPDATE_HIGHSCORE', params: { score: a } });
        }
      } else this.messenger._postMessage(a, void 0, 'gameapi.score'), this.messenger._postMessage(['log.gameapi.score.submit', { origin: 'slave', score: a }, null], null, 'log');
      return { success: !0, value: a };
    }),
    (l.prototype.init = function (a) {
      (a = a || {}), (this.data = a.data || this.data), this.data && this.data.user && (this.state.userId = this.data.user.userId || null);
    }),
    (l.prototype._setupMasterEvent = function () {
      this.IS_MASTER && this.messenger.subscribe('gameapi.award', this.submit, this);
    }),
    (l.prototype.submit = function (a) {
      var b = a.award || '';
      if (!this.moduleReady) throw new Error('This method cannot be called before the API is loaded');
      if (this.IS_MASTER) {
        if (this.data && this.data.portal && this.data.portal.siteId && this.data.portal.siteId < 500 && this.data.portal.siteId > 0) {
          var c = !1,
            d = '';
          this.appToken && (d = this.appToken.getAppToken()), window.outerHeight - window.innerHeight === this.initialHeight && (c = !0), this.eventTracking.trackGameAPIEvent('awardSubmit', { award: b, initialheight: this.initialHeight, submitheight: window.outerHeight - window.innerHeight, equals: c, guid: this.state.userId, apptoken: d });
        }
      } else this.messenger._postMessage(a, void 0, 'gameapi.award'), this.messenger._postMessage(['log.gameapi.award.submit', { origin: 'slave', award: b }, null], null, 'log');
      return { success: !0, value: a.award };
    }),
    (m.prototype.init = function (a) {
      (a = a || {}), (this.data = a.data || this.data);
    }),
    (m.prototype._setupMasterEvent = function () {
      var a = this.IS_MASTER ? this._masterHandler : this._slaveHandler;
      this.messenger.subscribe('gameapi.secondscreen', a, this);
    }),
    (m.prototype._masterHandler = function (a) {
      window.SpilGames &&
        SpilGames(['SWPEvent'], function (b) {
          b.emit('system.game.secondscreen', a);
        });
    }),
    (m.prototype._slaveHandler = function (a) {
      a.event && this._handleClientEvent(a.event);
    }),
    (m.prototype._dispatchEvent = function (a) {
      var b = document.createEvent('Event');
      b.initEvent(a.name, !0, !0);
      for (var c in a.properties) a.properties.hasOwnProperty(c) && (b[c] = a.properties[c]);
      document.body.dispatchEvent(b);
    }),
    (m.prototype._handleClientEvent = function (a) {
      var b = this.data.mapping;
      if (b[a.id] && b[a.id][a.type]) {
        var c = b[a.id][a.type];
        c.properties || (c.properties = {}), c['function'] && (c = c['function'](c)), c && c.name && this._dispatchEvent(c);
      }
    }),
    (m.prototype.relayClientEvents = function (a) {
      this.IS_MASTER && this.messenger._postMessage({ event: a }, void 0, 'gameapi.secondscreen');
    }),
    (m.prototype.updateControls = function (a, b) {
      this.IS_MASTER || ((this.data.mapping = b || {}), this.messenger._postMessage({ controls: a }, void 0, 'gameapi.secondscreen'));
    }),
    (n.prototype.init = function (a) {
      (a = a || {}), (this.data = a.data || this.data), this._setupEvents(), this.messenger._postMessage(!0, void 0, 'gameapi.gamebreak.checkavailable');
    }),
    (n.prototype._setupEvents = function () {
      if (this.isMaster) {
        var a = this;
        SpilGames(['JSLib'], function (b) {
          a._setupJSLibGameBreakFlow(b, 'midroll', 'ad.request.accepted', 'game.ad.accepted'),
            a._setupJSLibGameBreakFlow(b, 'reward', 'adreward.request.accepted', 'game.adreward.accepted'),
            b.subscribe('ad.complete', function (b) {
              a.messenger._postMessage(b, void 0, 'ad.complete');
            });
        }),
          this.messenger.subscribe('gameapi.ad.request', this._setupAd, this),
          this.messenger.subscribe('game.ad.request', this._triggerAd, this),
          this.messenger.subscribe('gameapi.adreward.request', this._setupAd, this),
          this.messenger.subscribe('gameapi.adreward.request', this._triggerAdreward, this),
          this.messenger.subscribe('game.force.break', this._forceGamebreak, this),
          this.messenger.subscribe('gameapi.gamebreak.checkavailable', this._checkAvailable, this);
      } else this.messenger.subscribe('ad.request.accepted', this._onAdAccepted, this), this.messenger.subscribe('adreward.request.accepted', this._onRewardAccepted, this), this.messenger.subscribe('ad.complete', this._onAdCompleted, this), this.messenger.subscribe('gameapi.gamebreak.checkavailableresponse', this._checkAvailableResponse, this);
    }),
    (n.prototype._setupJSLibGameBreakFlow = function (a, b, c, d) {
      var e = this;
      a.subscribe(c, function (a) {
        e.eventTracking.trackGameAPIEvent('gamebreakAccepted', { gamebreakType: b, response: a }), !0 === a && e.adRequested && ((e.adRequested = !1), SpilGames(d, !0), e.messenger._postMessage(!0, void 0, c));
      });
    }),
    (n.prototype._setupAd = function () {
      this.adRequested = !0;
    }),
    (n.prototype._checkAvailable = function () {
      this.isMaster && document.getElementById('sgAdOgGp300x250') ? this.messenger._postMessage(!0, void 0, 'gameapi.gamebreak.checkavailableresponse') : this.messenger._postMessage(!1, void 0, 'gameapi.gamebreak.checkavailableresponse');
    }),
    (n.prototype._checkAvailableResponse = function (a) {
      this.isMaster || this.isStandalone || (this.adAvailable = a);
    }),
    (n.prototype._triggerAd = function () {
      SpilGames('game.ad.request');
    }),
    (n.prototype._triggerAdreward = function () {
      SpilGames('game.adreward.request');
    }),
    (n.prototype._forceGamebreak = function () {
      SpilGames('game.ad.accepted', !0);
    }),
    (n.prototype._runCallback = function (a, b) {
      this._callbacks[a] && (this._callbacks[a](b), (this._callbacks[a] = !1));
    }),
    (n.prototype.isAvailable = function () {
      var a = !1;
      return this.adAvailable && this.data && this.data.portal && this.data.portal.siteId && this.data.portal.siteId < 500 && (a = !0), a;
    }),
    (n.prototype.reward = function (a, b) {
      var c = this;
      if ('function' != typeof a) throw new Error('pauseGame argument should be a function');
      if ('function' != typeof b) throw new Error('resumeGame argument should be a function');
      if (!c.moduleReady) throw new Error('This method cannot be called before the API is loaded');
      return (
        (c._callbacks.pause = a),
        (c._callbacks.resume = b),
        (this.gamebreakType = 'reward'),
        this.isMaster
          ? void c._runCallback('resume', { completed: !1 })
          : (c.messenger._postMessage(void 0, void 0, 'gameapi.adreward.request'),
            c.messenger._postMessage(['log.gameapi.adreward.requested', { origin: 'slave' }, null], null, 'log'),
            this.eventTracking.trackGameAPIEvent('gamebreakRequest', { gamebreakType: 'reward' }),
            this.messenger._postMessage(void 0, void 0, 'game.ad.request'),
            void (this.timeout = setTimeout(function () {
              c._requestTimeout(), c.eventTracking.trackGameAPIEvent('gamebreakTimeout', { gamebreakType: 'reward' });
            }, this.timeoutAfter)))
      );
    }),
    (n.prototype.request = function (a, b) {
      var c = this;
      if ('function' != typeof a) throw new Error('pauseGame argument should be a function');
      if ('function' != typeof b) throw new Error('resumeGame argument should be a function');
      if (!this.moduleReady) throw new Error('This method cannot be called before the API is loaded');
      (this._callbacks.pause = a),
        (this._callbacks.resume = b),
        (this.gamebreakType = 'midroll'),
        this.isMaster || (this.messenger._postMessage(void 0, void 0, 'gameapi.ad.request'), this.messenger._postMessage(['log.gameapi.ad.requested', { origin: 'slave' }, null], null, 'log'), this.eventTracking.trackGameAPIEvent('gamebreakRequest', { gamebreakType: 'midroll' })),
        this.messenger._postMessage(void 0, void 0, 'game.ad.request'),
        (this.timeout = setTimeout(function () {
          c._requestTimeout(), c.eventTracking.trackGameAPIEvent('gamebreakTimeout', { gamebreakType: 'midroll' });
        }, this.timeoutAfter));
    }),
    (n.prototype._onAdAccepted = function (a) {
      var b = this.messenger;
      this.timeout && clearTimeout(this.timeout), !this.isMaster && a && (b._postMessage(['log.gameapi.ad.start', { origin: 'slave' }, null], null, 'log'), this._runCallback('pause'));
    }),
    (n.prototype._onRewardAccepted = function (a) {
      var b = this.messenger;
      this.timeout && clearTimeout(this.timeout), !this.isMaster && a && (b._postMessage(['log.gameapi.adreward.start', { origin: 'slave' }, null], null, 'log'), this._runCallback('pause'));
    }),
    (n.prototype._onAdCompleted = function (a) {
      var b = this.messenger,
        c = a && a.completed ? a.completed : !1;
      this.isMaster || b._postMessage(['log.gameapi.ad.complete', { origin: 'slave', completed: c }, null], null, 'log'), this.eventTracking.trackGameAPIEvent('gamebreakComplete', { gamebreakType: this.gamebreakType }), (this.gamebreakType = 'unknown'), this._runCallback('resume', { completed: c });
    }),
    (n.prototype._requestTimeout = function (a) {
      this._onAdCompleted({ completed: !1 });
    }),
    (o.prototype._setupEvents = function () {
      this.IS_MASTER && this.messenger.subscribe('gameapi.gameevent', this.emit, this);
    }),
    (o.prototype._validateEvent = function (a) {
      var b = !1;
      return this.events[a] && 'undefined' != typeof this.events[a] && (b = !0), b;
    }),
    (o.prototype.emit = function (a, b) {
      if (!this.moduleReady) throw new Error('This method cannot be called before the API is loaded');
      this._validateEvent(a) ? (this.IS_MASTER ? 'function' == typeof SWFtoJS && SWFtoJS({ call: a }) : (this.messenger._postMessage(a, void 0, 'gameapi.gameevent'), this.messenger._postMessage(['log.gameapi.gameevent.emit', { origin: 'slave', evt: a }, null], null, 'log'))) : this.IS_MASTER || this.messenger._postMessage(['log.gameapi.gameevent.emit', { origin: 'slave' }, null], null, 'log');
    }),
    (p.prototype.init = function (a) {
      (a = a || {}), (this.data = a.data || this.data);
      var b = this.data && this.data.game && this.data.game.applicationId ? this.data.game.applicationId : null,
        c = new Date(),
        d = window.location.hostname;
      this.data && this.data.portal ? ((this.isGamestate = this.data.portal.gamestate || !1), this.data.portal.siteId ? (this.siteId = this.data.portal.siteId) : (this.siteId = null), this.data.portal.channelId ? (this.channelId = this.data.portal.channelId) : (this.channelId = null)) : ((this.siteId = null), (this.channelId = null)),
        this.data && this.data.user && this.data.user.userId ? (this.userId = this.data.user.userId) : (this.userId = null),
        (this.sessionId = Math.floor(999999 * Math.random())),
        this.configureInternalTracking(b, c, d),
        this.isGamestate || ((this.IS_SLAVE || this.IS_STANDALONE || w.isWrapped()) && this.startInternalTracking());
    }),
    (p.prototype._createEventObject = function (a, b, c) {
      return { eventCategory: a, eventAction: b, properties: c };
    }),
    (p.prototype._sendSETEvent = function (a, b, c) {
      if (this.IS_STANDALONE) {
        var d = { eventList: [b] };
      } else this.messenger && this.messenger.post('tracker.event.' + a, b, c);
      return b;
    }),
    (p.prototype.trackGamePlay = function (a) {
      if (!this.gamePlayTracking.started) return !1;
      var b = this.gamePlayTracking.appid,
        c = this.gamePlayTracking.timestamp,
        d = this.gamePlayTracking.host,
        e = this._createEventObject('game', 'gameplay', { applicationId: b, apiuid: String(this.userId), apisid: String(this.sessionId), start: c, host: d }),
        f = this.data.isLocal,
        g = !0,
        h = 0,
        i = 0;
      this.siteId && (h = parseInt(this.siteId, 10)), this.channelId && (i = parseInt(this.channelId, 10)), this.data && this.data.branding && this.data.branding.logo && this.data.branding.logo.image && (g = !1);
      var j = this._createEventObject('gameapi', 'load', { siteid: h, appid: b, channelid: i, apiuid: String(this.userId), apisid: String(this.sessionId), domainname: d, isstandalone: this.IS_STANDALONE, isfallbackconfig: f, iswhitelisted: g });
      return this._sendSETEvent('express', e, a), this._sendSETEvent('express', j, function () {}), e;
    }),
    (p.prototype.trackTimeInGame = function (a) {
      if (!this.timeInGameTracking.started) return !1;
      var b = this.timeInGameTracking.appid,
        c = this.timeInGameTracking.timestamp,
        d = this._createEventObject('game', 'heartbeat', { applicationId: b, apiuid: String(this.userId), apisid: String(this.sessionId), start: c });
      return this._sendSETEvent('express', d, a), d;
    }),
    (p.prototype.trackGameAPIEvent = function (a, b) {
      (b = b || {}), (b.appid = this.gamePlayTracking.appid), (b.domainname = this.gamePlayTracking.host), (b.siteid = parseInt(this.siteId, 10)), (b.channelid = parseInt(this.channelId, 10));
      var c = this._createEventObject('gameapi', a, b);
      this._sendSETEvent('express', c, function () {});
    }),
    (p.prototype.configureInternalTracking = function (a, b, c) {
      return a ? ((this.gamePlayTracking.appid = a), (this.gamePlayTracking.timestamp = Date.parse(b)), (this.gamePlayTracking.host = c), (this.timeInGameTracking.appid = a), void (this.timeInGameTracking.timestamp = Date.parse(b))) : { error: 'No application ID defined for this game' };
    }),
    (p.prototype.startInternalTracking = function () {
      var a = this,
        b = 6e4,
        c = function (a) {
          if (!a) throw 'Could not save the time in game';
        };
      return this.moduleReady
        ? this.gamePlayTracking.appid
          ? ((this.gamePlayTracking.started = !0),
            (this.timeInGameTracking.started = !0),
            this.trackGamePlay(function (a) {
              if (!a) throw 'Could not save the game play';
            }),
            this.trackTimeInGame(c),
            setInterval(function () {
              a.trackTimeInGame(c);
            }, b),
            this.gamePlayTracking.started && this.timeInGameTracking.started)
          : { error: 'No application ID defined for this game' }
        : { error: 'This method cannot be called before the API is loaded' };
    }),
    (q.prototype.init = function (a) {
      var b;
      (a = a || {}),
        (this.data = a.data || this.data),
        this.data && this.data.portal && this.data.portal.siteId && 187 !== this.data.portal.siteId && ((b = this.data.portal.siteId), b && this.data.branding && this.data.branding.more_games && this.data.branding.more_games.handler && 'moreGames' !== this.data.branding.more_games.handler && (this.data.branding.more_games.handler = 'moreGames')),
        this.IS_SLAVE && !this.IS_STANDALONE ? (this.data && this.data.portal && this.data.portal.siteId && this.data.portal.siteId < 500 && this.data.portal.siteId > 0 ? this._displaySpilBanner({ onportal: !0 }) : this._displaySpilBanner({ onportal: !1 })) : this.IS_STANDALONE && this._displaySpilBanner({ onportal: !1 });
    }),
    (q.prototype.getLogo = function (a) {
      if (!this.moduleReady) return { error: 'This method cannot be called before the API is loaded' };
      var b = this.IS_MASTER ? 'master' : 'slave';
      this.messenger._postMessage(['log.branding.getlogo', { origin: b }, null], null, 'log');
      var c,
        d,
        e = { type: { type: 'String', values: ['png'] }, width: 'Number', height: 'Number' };
      return (c = this._getLink('logo')), a && 'object' == typeof a && ((d = w.validateSchema(e, a)), d.error && (c.error = d.error)), c;
    }),
    (q.prototype.getLink = function (a) {
      if (!a) return { error: 'No link identifier provided' };
      var b = this.listLinks();
      if (-1 !== b.indexOf(a)) {
        var c = this.IS_MASTER ? 'master' : 'slave';
        return this.messenger._postMessage(['log.branding.getlink', { origin: c, linkName: a }, null], null, 'log'), this._getLink(a);
      }
      return { error: "Invalid option: '" + a + "'", action: function () {} };
    }),
    (q.prototype._getLink = function (a) {
      if (!a) return { error: 'No link identifier provided' };
      var b = this.data && this.data.branding ? this.data.branding : {};
      return b && b[a] ? { linkName: a, image: b[a].image || !1, action: this._executeHandler.bind(this, a) } : { error: "Invalid option: '" + a + "'", action: function () {} };
    }),
    (q.prototype._getGMLink = function (a) {
      var b = null;
      if (!a) return { error: 'No link identifier provided' };
      var c = this.data && this.data.branding ? this.data.branding : {};
      return c && c[a] ? ((b = this._tagUrl(c[a].url, a)), { linkName: a, url: b }) : { error: "Invalid option: '" + a + "'", url: null };
    }),
    (q.prototype.getLinks = function () {
      var a = {},
        b = this.listLinks();
      if (0 === b.length) a = { more_games: { action: function () {} } };
      else
        for (var c = 0; c < b.length; c++) {
          var d = b[c];
          a[d] = this._getLink(d);
        }
      return a;
    }),
    (q.prototype._executeHandler = function (a) {
      var b = this.data && this.data.branding ? this.data.branding : {},
        c = b[a],
        d = c.handler,
        e = this._tagUrl(c.url, a),
        f = this._getBrandName(b);
      if (c.url && c.url.length > 0 && d && this.components[d]) {
        var g = this.IS_MASTER ? 'master' : 'slave';
        return this.messenger._postMessage(['log.branding.linkAction', { origin: g, linkName: a }, null], null, 'log'), this.components[d]({ url: e, messenger: this.messenger, isStandalone: this.IS_STANDALONE, brandName: f });
      }
      return function () {};
    }),
    (q.prototype._getBrandName = function (a) {
      var b = 'a10';
      if (a && a.more_games && a.more_games.url) {
        var c = a.more_games.url;
        b = c.replace(/(.*)www./, '').replace(/\..*/, '');
      }
      return b;
    }),
    (q.prototype.listLinks = function () {
      var a = [],
        b = this.data && this.data.branding ? this.data.branding : {},
        c = Object.keys(b);
      return (a = c.filter(function (a) {
        return !b[a].blacklisted;
      }));
    }),
    (q.prototype.getSplashScreen = function () {
      var a,
        b = this.IS_MASTER ? 'master' : 'slave';
      if (this.data && this.data.branding && this.data.branding.splash_screen) {
        var c = !0;
        this.data.branding.splash_screen.image || this.data.branding.splash_screen.url || (c = !1), (a = { show: c, action: this._getLink('splash_screen').action || function () {} });
      } else a = { show: !0, action: function () {} };
      return this.messenger._postMessage(['log.branding.splashScreen', { origin: b }, null], null, 'log'), a;
    }),
    (q.prototype.displaySplashScreen = function (a) {
      if ('function' != typeof a) throw new Error('argument  passed to displaySplashScreen method should be a function');
      var b = this.IS_MASTER ? 'master' : 'slave',
        c = this._getLink('logo').image;
      c && this.getSplashScreen().show ? ('master' !== b && this.messenger._postMessage(['log.branding.displaySplashScreen', { origin: b }, null], null, 'log'), this.components.displayOnTop({ url: c, action: this.getSplashScreen().action, callback: a })) : a();
    }),
    (q.prototype._displaySpilBanner = function (a) {
      a = a || {};
      var b = a.onportal || !1;
      b || this.components.displayDFPBanner({ eventTracking: this.eventTracking });
    }),
    (q.prototype._tagUrl = function (a, b) {
      var c,
        d,
        e,
        f = this.data && this.data.portal ? this.data.portal : {},
        g = this.data && this.data.game ? this.data.game : {},
        h = parseInt(f.siteId, 10);
      if ('string' != typeof a) throw new Error('No url specified');
      return (c = 'string' == typeof b ? b : 'logo'), (d = 'brandedgames_' + (h > 0 && 500 > h ? 'internal' : 'external')), (e = ['utm_medium=' + d, 'utm_campaign=' + g.applicationId, 'utm_source=' + f.host, 'utm_content=' + c].join('&')), (a += a.indexOf('?') > -1 ? '&' : '?'), a + e;
    }),
    (r.prototype.encode = function () {
      var a = ['gameapi', this.type, this.callbackId, this.data ? JSON.stringify(this.data) : ''].join('|');
      return a;
    }),
    (t.prototype._postMessage = function (a, b, c) {
      var d, e;
      (d = w.isArray(a) && 'function' == typeof a[a.length - 1] ? this._callbacks.push(a.pop()) - 1 : b), (e = new r({ type: c || 'jslib', callbackId: d, data: a }).encode());
      for (var f = 0; f < this._targets.length; f++) this._targets[f].postMessage(e, '*');
    }),
    (t.prototype._callJSLib = function () {
      SpilGames.apply(SpilGames, w.argsToArray(arguments));
    }),
    (t.prototype._setupEventListener = function () {
      window.addEventListener ? window.addEventListener('message', this._handleMessage.bind(this), !1) : window.attachEvent && window.attachEvent('onmessage', this._handleMessage.bind(this));
    }),
    (t.prototype._handleMessage = function (a) {
      var b,
        c,
        d,
        e,
        f = this,
        g = new r(a.data);
      if (g)
        if (((b = g.type), (c = g.callbackId), (d = g.data), (e = this._callbacks[c] || !1), this.IS_MASTER))
          switch (b) {
            case 'jslib':
              'Array' === d.constructor.name &&
                d.push(function (a) {
                  f._postMessage(a, c);
                }),
                this._callJSLib.apply(this, d);
              break;
            case 'ugapi':
              this._handleUGARequest(a);
              break;
            case 'datachange':
              this._postMessage(d, null, 'datachange');
              break;
            default:
              this.publish(b, d);
          }
        else this.IS_SLAVE && ('function' == typeof e ? (delete this._callbacks[c], e(d)) : 'datachange' === b || ('jslib' !== b && this.publish(b, d)));
      return !1;
    }),
    (t.prototype._handleUGARequest = function (a) {
      var b,
        c,
        d,
        e = this,
        f = new r(a.data);
      if (f)
        switch (((b = f.data[0]), (c = f.callbackId), (d = f.data[1] ? f.data[1] : null), b)) {
          case 'GameAPI.data':
            e._postMessage(this.dataStore._getCache(), c, 'ugapi');
            break;
          case 'GameAPI.isReady':
            e._postMessage({ isready: this.api.isReady }, c, 'ugapi');
        }
    }),
    (t.prototype.post = function () {
      var a = w.argsToArray(arguments);
      return this.IS_SLAVE ? this._postMessage(a) : this._callJSLib.apply(this, a), this;
    }),
    (t.prototype.publish = function (a, b) {
      return (
        this._channels[a] &&
          this._channels[a].forEach(function (a) {
            try {
              a.fn.call(a.ctx, b);
            } catch (c) {}
          }),
        this
      );
    }),
    (t.prototype.subscribe = function (a, b, c) {
      if ('function' != typeof b) throw new Error('Callback has to be a function');
      if ('string' != typeof a) throw new Error('Channel name has to be a string');
      return this._channels[a] || (this._channels[a] = []), this._channels[a].push({ fn: b, ctx: c }), this;
    }),
    (t.prototype.unsubscribe = function (a, b) {
      return (
        this._channels[a] &&
          'function' == typeof b &&
          (this._channels[a] = this._channels[a].filter(function (a) {
            return a.fn !== b;
          })),
        this
      );
    }),
    (t.prototype.subscribeOnce = function (a, b, c) {
      function d(c) {
        e.unsubscribe(a, d), b.call(this, c);
      }
      var e = this;
      return this.subscribe(a, d, c);
    }),
    (t.prototype.requestFromParent = function (a, b, c) {
      if (!this.IS_SLAVE) throw 'You are the parent, stop talking to yourself';
      (b = b || {}), this._postMessage([a, b, c], null, 'ugapi');
    }),
    (u.prototype._addBasic = function (a, b) {
      var c = b || {};
      return (c.isMaster = this.IS_MASTER), (c.isStandalone = this.IS_STANDALONE), (c.messenger = this.__.messenger), (c.data = null), c;
    }),
    (u.prototype._addEventTracking = function (a) {
      var b = a || {};
      return (b.eventTracking = this.__.EventTracking), b;
    }),
    (u.prototype._addComponents = function (a) {
      var b = a || {};
      return (b.components = this.__.components), b;
    }),
    (u.prototype._addInitialHeight = function (a) {
      var b = a || {};
      return (b.initialHeight = window.outerHeight - window.innerHeight), b;
    }),
    (u.prototype._addAppToken = function (a) {
      var b = a || {};
      return (b.appToken = this.AppToken), b;
    }),
    (u.prototype._setRole = function () {
      var a = w.getRole(window);
      (this.IS_MASTER = a.IS_MASTER), (this.IS_SLAVE = a.IS_SLAVE), (this.IS_STANDALONE = a.IS_STANDALONE);
    }),
    (u.prototype._getTargets = function () {
      if (this.IS_STANDALONE) return [window];
      if (this.IS_MASTER) {
        for (var a = ['iframegame', 'iframeGameState'], b = null, c = [], d = 0; d < a.length; d++) (b = document.getElementById(a[d])), b && b.contentWindow && c.push(b.contentWindow);
        return c;
      }
      return [window.parent];
    }),
    (u.prototype.loadAPI = function (a, b) {
      function c(b) {
        l.IS_MASTER ? (b = e(b)) : b && b.user && b.user.userId && x.__.user.setUserId(b.user.userId);
        var c = (b.portal && b.portal.gamestate) || !1,
          d = (b.game && b.game.properties && b.game.properties.highscore) || !1,
          f = (b.game && b.game.properties && b.game.properties.award) || !1;
        return (
          (l.isReady = !0),
          (l.Branding.moduleReady = !0),
          (l.__.EventTracking.moduleReady = !0),
          (l.GameState.moduleReady = !0),
          (l.GameBreak.moduleReady = !0),
          (l.Game.moduleReady = !0),
          (l.Score.moduleReady = !0),
          (l.Award.moduleReady = !0),
          (l.Secondscreen.moduleReady = !0),
          (l.User.moduleReady = !0),
          (l.Friends.moduleReady = !0),
          (l.GameEvent.moduleReady = !0),
          (l.Localization.moduleReady = !0),
          (l.AppToken.moduleReady = !0),
          (c || d || f) && l.AppToken.init({ data: b }),
          l.__.EventTracking.init({ data: b }),
          l.Advertisement.init({ data: b, isMaster: l.IS_MASTER, isSlave: l.IS_SLAVE, isStandAlone: l.IS_STANDALONE }),
          c && l.GameState.init({ data: b }),
          c || (l.Branding.init({ data: b }), l.Game.init({ data: b }), l.Score.init({ data: b }), l.Award.init({ data: b }), l.GameBreak.init({ data: b }), l.Friends.init({ data: b }), l.User.init({ data: b }), l.Localization.init({ data: b })),
          l.__.messenger._postMessage(['log.gameapi.loadapi.finish', { origin: m, version: l.version }, null], null, 'log'),
          a(l)
        );
      }
      function e(a) {
        var b = a.game || {},
          c = a.user || {},
          d = a.portal || {},
          e = a.branding || {},
          f = a.localization || {};
        return x.getLocalConfig({ game: b, user: c, portal: d, branding: e, localization: f });
      }
      function f() {
        l.__.messenger.requestFromParent('GameAPI.data', {}, function (a) {
          c(a);
        });
      }
      function g() {
        (l.IS_STANDALONE = !0),
          (l.IS_MASTER = !0),
          (l.IS_SLAVE = !0),
          (l.__.dataStore = new d({ isMaster: !0 })),
          (b = b || null),
          x.setupStandaloneMode(b, function (a) {
            l.__.dataStore._setCache(e(a)), c(a);
          });
      }
      function h() {
        l.__.messenger.requestFromParent('GameAPI.isReady', {}, function (a) {
          k && clearTimeout(k), a.isready ? f() : 5 > n ? (n++, setTimeout(h, 500)) : (w.log('GameAPI:checkMasterReady not ready but reached max wait'), f());
        });
      }
      function i(a) {
        a && !a.isError ? l.__.dataStore._setCache(e(a)) : w.log('GameAPI gameConfig error: ', a.isError), c(a);
      }
      function j(a) {
        x.getBrandingConfig(a, i);
      }
      var k,
        l = this,
        m = this.IS_MASTER ? 'master' : 'slave',
        n = 0;
      if (('undefined' != typeof b && 'undefined' != typeof b.id && '576742227280293562' === b.id && (window.onkeydown = null), 'function' != typeof a)) throw new Error('argument passed to loadAPI method should be a function');
      return !0 === this.isReady ? (w.log('WARNING: Detected multiple executions of GameAPI.loadAPI(). This method should only be executed once per page load!'), a(l)) : (this.__.messenger._postMessage(['log.gameapi.loadapi.start', { origin: m, version: l.version, spildata: b }, null], null, 'log'), void (this.IS_STANDALONE ? g() : this.IS_MASTER ? x.getGameConfig(j) : b && b.gamestate ? c(x.configFromData(b)) : ((k = setTimeout(g, 600)), h())));
    });
  var y = new u(d, t, q, p, n);
  'function' == typeof define && define.amd && define('GameAPI', y), (a.GameAPI = y);
})(window),
  (function () {
    'use strict';
    function a(a) {
      a && (a.setTargetValueAtTime || (a.setTargetValueAtTime = a.setTargetAtTime));
    }
    window.hasOwnProperty &&
      window.hasOwnProperty('AudioContext') &&
      ((window.webkitAudioContext = AudioContext),
      AudioContext.prototype.hasOwnProperty('internal_createGain') ||
        ((AudioContext.prototype.internal_createGain = AudioContext.prototype.createGain),
        (AudioContext.prototype.createGain = function () {
          var b = this.internal_createGain();
          return a(b.gain), b;
        })),
      AudioContext.prototype.hasOwnProperty('internal_createDelay') ||
        ((AudioContext.prototype.internal_createDelay = AudioContext.prototype.createDelay),
        (AudioContext.prototype.createDelay = function () {
          var b = this.internal_createDelay();
          return a(b.delayTime), b;
        })),
      AudioContext.prototype.hasOwnProperty('internal_createBufferSource') ||
        ((AudioContext.prototype.internal_createBufferSource = AudioContext.prototype.createBufferSource),
        (AudioContext.prototype.createBufferSource = function () {
          var b = this.internal_createBufferSource();
          return b.noteOn || (b.noteOn = b.start), b.noteGrainOn || (b.noteGrainOn = b.start), b.noteOff || (b.noteOff = b.stop), a(b.playbackRate), b;
        })),
      AudioContext.prototype.hasOwnProperty('internal_createDynamicsCompressor') ||
        ((AudioContext.prototype.internal_createDynamicsCompressor = AudioContext.prototype.createDynamicsCompressor),
        (AudioContext.prototype.createDynamicsCompressor = function () {
          var b = this.internal_createDynamicsCompressor();
          return a(b.threshold), a(b.knee), a(b.ratio), a(b.reduction), a(b.attack), a(b.release), b;
        })),
      AudioContext.prototype.hasOwnProperty('internal_createBiquadFilter') ||
        ((AudioContext.prototype.internal_createBiquadFilter = AudioContext.prototype.createBiquadFilter),
        (AudioContext.prototype.createBiquadFilter = function () {
          var b = this.internal_createBiquadFilter();
          a(b.frequency), a(b.detune), a(b.Q), a(b.gain);
          for (var c = ['LOWPASS', 'HIGHPASS', 'BANDPASS', 'LOWSHELF', 'HIGHSHELF', 'PEAKING', 'NOTCH', 'ALLPASS'], d = 0; d < c.length; ++d) {
            var e = c[d],
              f = e.toLowerCase();
            b.hasOwnProperty(e) || (b[e] = f);
          }
          return b;
        })),
      AudioContext.prototype.hasOwnProperty('internal_createOscillator') ||
        (AudioContext.prototype.hasOwnProperty('createOscillator') &&
          ((AudioContext.prototype.internal_createOscillator = AudioContext.prototype.createOscillator),
          (AudioContext.prototype.createOscillator = function () {
            var b = this.internal_createOscillator();
            b.noteOn || (b.noteOn = b.start), b.noteOff || (b.noteOff = b.stop), a(b.frequency), a(b.detune);
            for (var c = ['SINE', 'SQUARE', 'SAWTOOTH', 'TRIANGLE', 'CUSTOM'], d = 0; d < c.length; ++d) {
              var e = c[d],
                f = e.toLowerCase();
              b.hasOwnProperty(e) || (b[e] = f);
            }
            return b.hasOwnProperty('setWaveTable') || (b.setWaveTable = b.setPeriodicTable), b;
          }))),
      AudioContext.prototype.hasOwnProperty('internal_createPanner') ||
        ((AudioContext.prototype.internal_createPanner = AudioContext.prototype.createPanner),
        (AudioContext.prototype.createPanner = function () {
          var a = this.internal_createPanner(),
            b = { EQUALPOWER: 'equalpower', HRTF: 'HRTF', LINEAR_DISTANCE: 'linear', INVERSE_DISTANCE: 'inverse', EXPONENTIAL_DISTANCE: 'exponential' };
          for (var c in b) {
            var d = b[c];
            a.hasOwnProperty(c) || (a[c] = d);
          }
          return a;
        })),
      AudioContext.prototype.hasOwnProperty('createGainNode') || (AudioContext.prototype.createGainNode = AudioContext.prototype.createGain),
      AudioContext.prototype.hasOwnProperty('createDelayNode') || (AudioContext.prototype.createDelayNode = AudioContext.prototype.createDelay),
      AudioContext.prototype.hasOwnProperty('createJavaScriptNode') || (AudioContext.prototype.createJavaScriptNode = AudioContext.prototype.createScriptProcessor),
      AudioContext.prototype.hasOwnProperty('createWaveTable') || (AudioContext.prototype.createWaveTable = AudioContext.prototype.createPeriodicWave));
  })();
