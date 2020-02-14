(window),function(s) {
    "use strict";
    var r = window.MegaMenu || {};
    function n(e, t, i, n) {
        var o = this;
        this.$element = e,
        this.menu = t,
        this.options = i,
        this.$container = n,
        Object.defineProperties(this, {
            itemClass: {
                get: function() {
                    return "mega-menu" === o.options.type ? o.options.classMap.hasMegaMenu : o.options.classMap.hasSubMenu
                }
            },
            activeItemClass: {
                get: function() {
                    return "mega-menu" === o.options.type ? o.options.classMap.hasMegaMenuActive : o.options.classMap.hasSubMenuActive
                }
            },
            menuClass: {
                get: function() {
                    return "mega-menu" === o.options.type ? o.options.classMap.megaMenu : o.options.classMap.subMenu
                }
            },
            isOpened: {
                get: function() {
                    return this.$element.hasClass(this.activeItemClass.slice(1))
                }
            }
        }),
        this.menu.addClass("animated").on("click.HSMegaMenu", function(e) {
            o._updateMenuBounds()
        }),
        this.$element.data("max-width") && this.menu.css("max-width", this.$element.data("max-width")),
        this.$element.data("position") && this.menu.addClass("hs-position-" + this.$element.data("position")),
        this.options.animationOut && this.menu.on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function(e) {
            o.menu.hasClass(o.options.animationOut) && (o.$element.removeClass(o.activeItemClass.slice(1)),
            o.options.afterClose.call(o, o.$element, o.menu)),
            o.menu.hasClass(o.options.animationIn) && o.options.afterOpen.call(o, o.$element, o.menu),
            e.stopPropagation(),
            e.preventDefault()
        })
    }
    function e() {
        return "ontouchstart"in window
    }
    (r = function e(t, i) {
        var n = this;
        this.$element = s(t),
        this.options = s.extend(!0, {}, e.defaults, i),
        this._items = s(),
        Object.defineProperties(this, {
            itemsSelector: {
                get: function() {
                    return n.options.classMap.hasSubMenu + "," + n.options.classMap.hasMegaMenu
                }
            },
            _tempChain: {
                value: null,
                writable: !0
            },
            state: {
                value: null,
                writable: !0
            }
        }),
        this.initialize()
    }
    ).defaults = {
        event: "hover",
        direction: "horizontal",
        breakpoint: 991,
        animationIn: !1,
        animationOut: !1,
        rtl: !1,
        hideTimeOut: 300,
        sideBarRatio: .25,
        pageContainer: s("body"),
        classMap: {
            initialized: ".hs-menu-initialized",
            mobileState: ".hs-mobile-state",
            subMenu: ".hs-sub-menu",
            hasSubMenu: ".hs-has-sub-menu",
            hasSubMenuActive: ".hs-sub-menu-opened",
            megaMenu: ".hs-mega-menu",
            hasMegaMenu: ".hs-has-mega-menu",
            hasMegaMenuActive: ".hs-mega-menu-opened"
        },
        mobileSpeed: 400,
        mobileEasing: "linear",
        isMenuOpened: !1,
        beforeOpen: function() {},
        beforeClose: function() {},
        afterOpen: function() {},
        afterClose: function() {}
    },
    r.prototype.initialize = function() {
        var i = this
          , e = s(window);
        return this.options.rtl && this.$element.addClass("hs-rtl"),
        this.$element.addClass(this.options.classMap.initialized.slice(1)).addClass("hs-menu-" + this.options.direction),
        e.on("resize.HSMegaMenu", function(e) {
            i.resizeTimeOutId && clearTimeout(i.resizeTimeOutId),
            i.resizeTimeOutId = setTimeout(function() {
                window.innerWidth <= i.options.breakpoint && "desktop" === i.state ? i.initMobileBehavior() : window.innerWidth > i.options.breakpoint && "mobile" === i.state && i.initDesktopBehavior(),
                i.refresh()
            }, 50)
        }),
        768 <= window.innerWidth && s(document).on("click.HSMegaMenu touchstart.HSMegaMenu", "body", function(e) {
            var t = s(e.target).parents(i.itemsSelector);
            i.closeAll(t.add(s(e.target)))
        }),
        e.on("keyup.HSMegaMenu", function(e) {
            e.keyCode && 27 === e.keyCode && (i.closeAll(),
            i.options.isMenuOpened = !1)
        }),
        window.innerWidth <= this.options.breakpoint ? this.initMobileBehavior() : window.innerWidth > this.options.breakpoint && this.initDesktopBehavior(),
        this.smartPositions(),
        this
    }
    ,
    r.prototype.smartPositions = function() {
        var i = this;
        this.$element.find(this.options.classMap.subMenu).each(function(e, t) {
            n.smartPosition(s(t), i.options)
        })
    }
    ,
    r.prototype.bindEvents = function() {
        var o = this;
        "hover" !== this.options.event || e() ? (this.$element.on("click.HSMegaMenu", e() ? this.options.classMap.hasMegaMenu + " > .u-header__nav-link-icon, " + this.options.classMap.hasSubMenu + " > .u-header__nav-link-icon" : this.options.classMap.hasMegaMenu + ':not([data-event="hover"]) > .u-header__nav-link-icon,' + this.options.classMap.hasSubMenu + ':not([data-event="hover"]) > .u-header__nav-link-icon', function(e) {
            var t, i = s(this).parent();
            i.parents(o.itemsSelector);
            i.data("HSMenuItem") || o.initMenuItem(i, o.getType(i)),
            o.closeAll(i.add(i.parents(o.itemsSelector))),
            (t = i.addClass("hs-event-prevented").data("HSMenuItem")).isOpened ? t.desktopHide() : t.desktopShow(),
            e.preventDefault(),
            e.stopPropagation()
        }),
        e() || this.$element.on("mouseenter.HSMegaMenu", this.options.classMap.hasMegaMenu + '[data-event="hover"],' + this.options.classMap.hasSubMenu + '[data-event="hover"]', function(e) {
            var t = s(this)
              , i = t.parents(o.itemsSelector);
            t.data("HSMenuItem") || o.initMenuItem(t, o.getType(t)),
            o.closeAll(t.add(i)),
            i.add(t).each(function(e, t) {
                var i = s(t).data("HSMenuItem");
                i.hideTimeOutId && clearTimeout(i.hideTimeOutId),
                i.desktopShow()
            }),
            e.preventDefault(),
            e.stopPropagation()
        }).on("mouseleave.HSMegaMenu", this.options.classMap.hasMegaMenu + '[data-event="hover"],' + this.options.classMap.hasSubMenu + '[data-event="hover"]', function(e) {
            s(this).data("HSMenuItem").hideTimeOutId = setTimeout(function() {
                o.closeAll(s(e.relatedTarget).parents(o.itemsSelector))
            }, o.options.hideTimeOut),
            e.preventDefault(),
            e.stopPropagation()
        })) : this.$element.on("mouseenter.HSMegaMenu", this.options.classMap.hasMegaMenu + ':not([data-event="click"]),' + this.options.classMap.hasSubMenu + ':not([data-event="click"])', function(e) {
            var t = s(this)
              , i = t.parents(o.itemsSelector);
            t.data("HSMenuItem") || o.initMenuItem(t, o.getType(t)),
            i = i.add(t),
            o.closeAll(i),
            i.each(function(e, t) {
                var i = s(t).data("HSMenuItem");
                i.hideTimeOutId && clearTimeout(i.hideTimeOutId),
                i.desktopShow()
            }),
            o._items = o._items.not(i),
            o._tempChain = i,
            e.preventDefault(),
            e.stopPropagation()
        }).on("mouseleave.HSMegaMenu", this.options.classMap.hasMegaMenu + ':not([data-event="click"]),' + this.options.classMap.hasSubMenu + ':not([data-event="click"])', function(e) {
            if (s(this).data("HSMenuItem")) {
                var t = s(this).data("HSMenuItem")
                  , i = s(e.relatedTarget).parents(o.itemsSelector);
                t.hideTimeOutId = setTimeout(function() {
                    o.closeAll(i)
                }, o.options.hideTimeOut),
                o._items = o._items.add(o._tempChain),
                o._tempChain = null,
                e.preventDefault(),
                e.stopPropagation()
            }
        }).on("click.HSMegaMenu touchstart.HSMegaMenu", this.options.classMap.hasMegaMenu + '[data-event="click"] > a, ' + this.options.classMap.hasSubMenu + '[data-event="click"] > a', function(e) {
            var t, i = s(this).parent('[data-event="click"]');
            i.data("HSMenuItem") || o.initMenuItem(i, o.getType(i)),
            o.closeAll(i.add(i.parents(o.itemsSelector))),
            (t = i.data("HSMenuItem")).isOpened ? t.desktopHide() : t.desktopShow(),
            e.preventDefault(),
            e.stopPropagation()
        }),
        this.$element.on("keydown.HSMegaMenu", this.options.classMap.hasMegaMenu + " > a," + this.options.classMap.hasSubMenu + " > a", function(e) {
            var t, i = s(this), n = i.parent();
            n.data("HSMenuItem") || o.initMenuItem(n, o.getType(n)),
            t = n.data("HSMenuItem"),
            i.is(":focus") && (e.keyCode && 40 === e.keyCode && (e.preventDefault(),
            t.desktopShow(),
            o.options.isMenuOpened = !0),
            e.keyCode && 13 === e.keyCode && (!0 === o.options.isMenuOpened ? (t.desktopHide(),
            o.options.isMenuOpened = !1) : (t.desktopShow(),
            o.options.isMenuOpened = !0))),
            i.on("focusout", function() {
                o.options.isMenuOpened = !1
            }),
            t.menu.find("a").on("focusout", function() {
                setTimeout(function() {
                    t.menu.find("a").is(":focus") || (t.desktopHide(),
                    o.options.isMenuOpened = !1)
                })
            })
        })
    }
    ,
    r.prototype.initMenuItem = function(e, t) {
        var i = new n(e,e.children(this.options.classMap["mega-menu" === t ? "megaMenu" : "subMenu"]),s.extend(!0, {
            type: t
        }, this.options, e.data()),this.$element);
        e.data("HSMenuItem", i),
        this._items = this._items.add(e)
    }
    ,
    r.prototype.initMobileBehavior = function() {
        var n = this;
        this.state = "mobile",
        this.$element.off(".HSMegaMenu").addClass(this.options.classMap.mobileState.slice(1)).on("click.HSMegaMenu", n.options.classMap.hasSubMenu + " > .u-header__nav-link-icon, " + n.options.classMap.hasMegaMenu + " > a", function(e) {
            var t, i = s(this).parent();
            i.data("HSMenuItem") || n.initMenuItem(i, n.getType(i)),
            n.closeAll(i.parents(n.itemsSelector).add(i)),
            (t = i.data("HSMenuItem")).isOpened ? t.mobileHide() : t.mobileShow(),
            e.preventDefault(),
            e.stopPropagation()
        }).find(this.itemsSelector).not(this.options.classMap.hasSubMenuActive + "," + this.options.classMap.hasMegaMenuActive).children(this.options.classMap.subMenu + "," + this.options.classMap.megaMenu).hide()
    }
    ,
    r.prototype.initDesktopBehavior = function() {
        this.state = "desktop",
        this.$element.removeClass(this.options.classMap.mobileState.slice(1)).off(".HSMegaMenu").find(this.itemsSelector).not(this.options.classMap.hasSubMenuActive + "," + this.options.classMap.hasMegaMenuActive).children(this.options.classMap.subMenu + "," + this.options.classMap.megaMenu).hide(),
        this.bindEvents()
    }
    ,
    r.prototype.closeAll = function(e) {
        var i = this;
        return this._items.not(e && e.length ? e : s()).each(function(e, t) {
            s(t).removeClass("hs-event-prevented").data("HSMenuItem")["mobile" === i.state ? "mobileHide" : "desktopHide"]()
        })
    }
    ,
    r.prototype.getType = function(e) {
        return e && e.length ? e.hasClass(this.options.classMap.hasSubMenu.slice(1)) ? "sub-menu" : e.hasClass(this.options.classMap.hasMegaMenu.slice(1)) ? "mega-menu" : null : null
    }
    ,
    r.prototype.getState = function() {
        return this.state
    }
    ,
    r.prototype.refresh = function() {
        return this._items.add(this._tempChain).each(function(e, t) {
            s(t).data("HSMenuItem")._updateMenuBounds()
        })
    }
    ,
    n.prototype.desktopShow = function() {
        return this.menu.length && (this.$element.addClass(this.activeItemClass.slice(1)),
        this._updateMenuBounds(),
        this.menu.show(),
        "horizontal" === this.options.direction && this.smartPosition(this.menu, this.options),
        this.options.animationOut ? this.menu.removeClass(this.options.animationOut) : this.options.afterOpen.call(this, this.$element, this.menu),
        this.options.animationIn && this.menu.addClass(this.options.animationIn)),
        this
    }
    ,
    n.prototype.desktopHide = function() {
        return this.menu.length && (this.$element.removeClass(this.activeItemClass.slice(1)),
        this.menu.hide(),
        this.options.animationIn && this.menu.removeClass(this.options.animationIn),
        this.options.animationOut ? this.menu.addClass(this.options.animationOut) : this.options.afterClose.call(this, this.$element, this.menu)),
        this
    }
    ,
    n.prototype.mobileShow = function() {
        var e = this;
        return this.menu.length && (this.menu.removeClass(this.options.animationIn).removeClass(this.options.animationOut).stop().slideDown({
            duration: e.options.mobileSpeed,
            easing: e.options.mobileEasing,
            complete: function() {
                e.options.afterOpen.call(e, e.$element, e.menu)
            }
        }),
        this.$element.addClass(this.activeItemClass.slice(1))),
        this
    }
    ,
    n.prototype.mobileHide = function() {
        var e = this;
        return this.menu.length && (this.menu.stop().slideUp({
            duration: e.options.mobileSpeed,
            easing: e.options.mobileEasing,
            complete: function() {
                e.options.afterClose.call(e, e.$element, e.menu)
            }
        }),
        this.$element.removeClass(this.activeItemClass.slice(1))),
        this
    }
    ,
    n.prototype.smartPosition = function(e, t) {
        n.smartPosition(e, t)
    }
    ,
    n.smartPosition = function(e, t) {
        if (e || e.length) {
            s(window);
            e.removeClass("hs-reversed"),
            t.rtl ? e.offset().left < 0 && e.addClass("hs-reversed") : e.offset().left + e.outerWidth() > window.innerWidth && e.addClass("hs-reversed")
        }
    }
    ,
    n.prototype._updateMenuBounds = function() {
        var e = "auto";
        if ("vertical" === this.options.direction && "mega-menu" === this.options.type) {
            if (e = this.$container && "desktop" === this.$container.data("HSMegaMenu").getState() ? (this.options.pageContainer.length || (this.options.pageContainer = s("body")),
            this.options.pageContainer.outerWidth() * (1 - this.options.sideBarRatio)) : "auto",
            this.menu.css({
                width: e,
                height: "auto"
            }),
            this.menu.outerHeight() > this.$container.outerHeight())
                return;
            this.menu.css("height", "100%")
        }
    }
    ,
    s.fn.HSMegaMenu = function() {
        var e, t, i = arguments[0], n = Array.prototype.slice.call(arguments, 1), o = this.length;
        for (e = 0; e < o; e++)
            if ("object" == typeof i || void 0 === i ? this[e].MegaMenu = new r(this[e],i) : t = this[e].MegaMenu[i].apply(this[e].MegaMenu, n),
            void 0 !== t)
                return t;
        return this
    }
}(jQuery),
function(d) {
    "use strict";
    d.HSCore = {
        init: function() {
            d(document).ready(function(e) {
                d('[data-toggle="tooltip"]').tooltip(),
                d('[data-toggle="popover"]').popover(),
                d.HSCore.helpers.detectIE(),
                d.HSCore.helpers.bootstrapNavOptions.init()
            })
        },
        components: {},
        helpers: {
            Math: {
                getRandomValueFromRange: function(e, t, i) {
                    var n = i || !1;
                    return Math.random(),
                    n ? Math.random() * (t - e) + e : Math.floor(Math.random() * (t - e + 1)) + e
                }
            },
            detectIE: function() {
                var e = window.navigator.userAgent;
                if (0 < e.indexOf("Trident/")) {
                    var t = e.indexOf("rv:");
                    parseInt(e.substring(t + 3, e.indexOf(".", t)), 10);
                    document.querySelector("body").className += " IE"
                }
                var i = e.indexOf("Edge/");
                if (0 < i) {
                    parseInt(e.substring(i + 5, e.indexOf(".", i)), 10);
                    document.querySelector("body").className += " IE"
                }
                return !1
            },
            bootstrapNavOptions: {
                init: function() {
                    this.mobileHideOnScroll()
                },
                mobileHideOnScroll: function() {
                    var t = d(".navbar");
                    if (t.length) {
                        var l = d(window)
                          , c = {
                            sm: 576,
                            md: 768,
                            lg: 992,
                            xl: 1200
                        };
                        d("body").on("click.HSMobileHideOnScroll", ".navbar-toggler", function(e) {
                            var t = d(this).closest(".navbar");
                            t.length && t.data("mobile-menu-scroll-position", l.scrollTop()),
                            e.preventDefault()
                        }),
                        l.on("scroll.HSMobileHideOnScroll", function(e) {
                            t.each(function(e, t) {
                                var i, n, o, s, r, a = d(t);
                                a.hasClass("navbar-expand-xl") ? r = c.xl : a.hasClass("navbar-expand-lg") ? r = c.lg : a.hasClass("navbar-expand-md") ? r = c.md : a.hasClass("navbar-expand-xs") && (r = c.xs),
                                l.width() > r || (i = a.find(".navbar-toggler"),
                                (n = a.find(".navbar-collapse")).data("mobile-scroll-hide") && n.length && (o = a.data("mobile-menu-scroll-position"),
                                40 < Math.abs(l.scrollTop() - o) && n.hasClass("show") && (i.trigger("click"),
                                (s = i.find(".is-active")).length && s.removeClass("is-active"))))
                            })
                        })
                    }
                }
            }
        },
        settings: {
            rtl: !1
        }
    },
    d.HSCore.init()
}(jQuery),
function(s) {
    "use strict";
    function e(e, t, i) {
        e && e.length && (this.element = e,
        this.config = t,
        this.observers = i && s.isPlainObject(i) ? i : {},
        this.viewport = "xs",
        this.checkViewport())
    }
    function i(e) {
        if (e && e.length)
            return this.element = e,
            this.defaultState = !0,
            this.reinit = function() {
                this.destroy().init().check()
            }
            ,
            !0
    }
    function t(e) {
        i.call(this, e) && this.init()
    }
    function n(e) {
        i.call(this, e) && this.init()
    }
    function o(e) {
        i.call(this, e) && this.init()
    }
    function r(e, t) {
        i.call(this, e) && (this.config = {
            fixPointSelf: !1
        },
        t && s.isPlainObject(t) && (this.config = s.extend(!0, {}, this.config, t)),
        this.init())
    }
    function a(e) {
        i.call(this, e) && this.init()
    }
    function l(e, t) {
        i.call(this, e) && (this.config = {
            fixPointSelf: !1
        },
        t && s.isPlainObject(t) && (this.config = s.extend(!0, {}, this.config, t)),
        this.init())
    }
    function c(e, t) {
        i.call(this, e) && (this.config = {
            animated: !0
        },
        t && s.isPlainObject(t) && (this.config = s.extend(!0, {}, this.config, t)),
        this.init())
    }
    function d(e, t) {
        i.call(this, e) && (this.config = t && s.isPlainObject(t) ? s.extend(!0, {}, this.config, t) : {},
        this.init())
    }
    function u(e) {
        i.call(this, e)
    }
    s.HSCore.components.HSHeader = {
        _baseConfig: {
            headerFixMoment: 0,
            headerFixEffect: "slide",
            breakpointsMap: {
                md: 768,
                sm: 576,
                lg: 992,
                xl: 1200
            }
        },
        init: function(t) {
            if (t && 1 === t.length && !t.data("HSHeader")) {
                var i = this;
                return this.element = t,
                this.config = s.extend(!0, {}, this._baseConfig, t.data()),
                this.observers = this._detectObservers(),
                this.fixMediaDifference(this.element),
                this.element.data("HSHeader", new e(this.element,this.config,this.observers)),
                s(window).on("scroll.uHeader", function(e) {
                    s(window).scrollTop() < s(t).data("header-fix-moment") - 100 && !0 === s(t).data("effect-compensation") ? s(t).css({
                        top: -s(window).scrollTop()
                    }).addClass(s(t).data("effect-compensation-start-class")).removeClass(s(t).data("effect-compensation-end-class")) : !0 === s(t).data("effect-compensation") && s(t).css({
                        top: 0
                    }).addClass(s(t).data("effect-compensation-end-class")).removeClass(s(t).data("effect-compensation-start-class")),
                    5 < s(window).scrollTop() && !s(t).hasClass(".u-scrolled") ? s(t).addClass("u-scrolled") : s(t).removeClass("u-scrolled"),
                    t.data("HSHeader").notify()
                }).on("resize.uHeader", function(e) {
                    i.resizeTimeOutId && clearTimeout(i.resizeTimeOutId),
                    i.resizeTimeOutId = setTimeout(function() {
                        t.data("HSHeader").checkViewport().update()
                    }, 100)
                }).trigger("scroll.uHeader"),
                this.element
            }
        },
        _detectObservers: function() {
            if (this.element && this.element.length) {
                var e = {
                    xs: [],
                    sm: [],
                    md: [],
                    lg: [],
                    xl: []
                };
                return this.element.hasClass("u-header--has-hidden-element") && e.xs.push(new c(this.element)),
                this.element.hasClass("u-header--sticky-top") && (this.element.hasClass("u-header--show-hide") ? e.xs.push(new n(this.element)) : this.element.hasClass("u-header--toggle-section") && e.xs.push(new a(this.element)),
                this.element.hasClass("u-header--change-logo") && e.xs.push(new r(this.element)),
                this.element.hasClass("u-header--change-appearance") && e.xs.push(new l(this.element))),
                this.element.hasClass("u-header--floating") && e.xs.push(new d(this.element)),
                this.element.hasClass("u-header--invulnerable") && e.xs.push(new u(this.element)),
                this.element.hasClass("u-header--sticky-bottom") && (this.element.hasClass("u-header--change-appearance") && e.xs.push(new l(this.element)),
                this.element.hasClass("u-header--change-logo") && e.xs.push(new r(this.element))),
                (this.element.hasClass("u-header--abs-top") || this.element.hasClass("u-header--static")) && (this.element.hasClass("u-header--show-hide") && e.xs.push(new o(this.element)),
                this.element.hasClass("u-header--change-logo") && e.xs.push(new r(this.element)),
                this.element.hasClass("u-header--change-appearance") && e.xs.push(new l(this.element))),
                (this.element.hasClass("u-header--abs-bottom") || this.element.hasClass("u-header--abs-top-2nd-screen")) && (e.xs.push(new t(this.element)),
                this.element.hasClass("u-header--change-appearance") && e.xs.push(new l(this.element,{
                    fixPointSelf: !0
                })),
                this.element.hasClass("u-header--change-logo") && e.xs.push(new r(this.element,{
                    fixPointSelf: !0
                }))),
                this.element.hasClass("u-header--has-hidden-element-sm") && e.sm.push(new c(this.element)),
                this.element.hasClass("u-header--sticky-top-sm") && (this.element.hasClass("u-header--show-hide-sm") ? e.sm.push(new n(this.element)) : this.element.hasClass("u-header--toggle-section-sm") && e.sm.push(new a(this.element)),
                this.element.hasClass("u-header--change-logo-sm") && e.sm.push(new r(this.element)),
                this.element.hasClass("u-header--change-appearance-sm") && e.sm.push(new l(this.element))),
                this.element.hasClass("u-header--floating-sm") && e.sm.push(new d(this.element)),
                this.element.hasClass("u-header--invulnerable-sm") && e.sm.push(new u(this.element)),
                this.element.hasClass("u-header--sticky-bottom-sm") && (this.element.hasClass("u-header--change-appearance-sm") && e.sm.push(new l(this.element)),
                this.element.hasClass("u-header--change-logo-sm") && e.sm.push(new r(this.element))),
                (this.element.hasClass("u-header--abs-top-sm") || this.element.hasClass("u-header--static-sm")) && (this.element.hasClass("u-header--show-hide-sm") && e.sm.push(new o(this.element)),
                this.element.hasClass("u-header--change-logo-sm") && e.sm.push(new r(this.element)),
                this.element.hasClass("u-header--change-appearance-sm") && e.sm.push(new l(this.element))),
                (this.element.hasClass("u-header--abs-bottom-sm") || this.element.hasClass("u-header--abs-top-2nd-screen-sm")) && (e.sm.push(new t(this.element)),
                this.element.hasClass("u-header--change-appearance-sm") && e.sm.push(new l(this.element,{
                    fixPointSelf: !0
                })),
                this.element.hasClass("u-header--change-logo-sm") && e.sm.push(new r(this.element,{
                    fixPointSelf: !0
                }))),
                this.element.hasClass("u-header--has-hidden-element-md") && e.md.push(new c(this.element)),
                this.element.hasClass("u-header--sticky-top-md") && (console.log(1),
                this.element.hasClass("u-header--show-hide-md") ? e.md.push(new n(this.element)) : this.element.hasClass("u-header--toggle-section-md") && e.md.push(new a(this.element)),
                this.element.hasClass("u-header--change-logo-md") && e.md.push(new r(this.element)),
                this.element.hasClass("u-header--change-appearance-md") && e.md.push(new l(this.element))),
                this.element.hasClass("u-header--floating-md") && e.md.push(new d(this.element)),
                this.element.hasClass("u-header--invulnerable-md") && e.md.push(new u(this.element)),
                this.element.hasClass("u-header--sticky-bottom-md") && (this.element.hasClass("u-header--change-appearance-md") && e.md.push(new l(this.element)),
                this.element.hasClass("u-header--change-logo-md") && e.md.push(new r(this.element))),
                (this.element.hasClass("u-header--abs-top-md") || this.element.hasClass("u-header--static-md")) && (this.element.hasClass("u-header--show-hide-md") && e.md.push(new o(this.element)),
                this.element.hasClass("u-header--change-logo-md") && e.md.push(new r(this.element)),
                this.element.hasClass("u-header--change-appearance-md") && e.md.push(new l(this.element))),
                (this.element.hasClass("u-header--abs-bottom-md") || this.element.hasClass("u-header--abs-top-2nd-screen-md")) && (e.md.push(new t(this.element)),
                this.element.hasClass("u-header--change-appearance-md") && e.md.push(new l(this.element,{
                    fixPointSelf: !0
                })),
                this.element.hasClass("u-header--change-logo-md") && e.md.push(new r(this.element,{
                    fixPointSelf: !0
                }))),
                this.element.hasClass("u-header--has-hidden-element-lg") && e.lg.push(new c(this.element)),
                this.element.hasClass("u-header--sticky-top-lg") && (this.element.hasClass("u-header--show-hide-lg") ? e.lg.push(new n(this.element)) : this.element.hasClass("u-header--toggle-section-lg") && e.lg.push(new a(this.element)),
                this.element.hasClass("u-header--change-logo-lg") && e.lg.push(new r(this.element)),
                this.element.hasClass("u-header--change-appearance-lg") && e.lg.push(new l(this.element))),
                this.element.hasClass("u-header--floating-lg") && e.lg.push(new d(this.element)),
                this.element.hasClass("u-header--invulnerable-lg") && e.lg.push(new u(this.element)),
                this.element.hasClass("u-header--sticky-bottom-lg") && (this.element.hasClass("u-header--change-appearance-lg") && e.lg.push(new l(this.element)),
                this.element.hasClass("u-header--change-logo-lg") && e.lg.push(new r(this.element))),
                (this.element.hasClass("u-header--abs-top-lg") || this.element.hasClass("u-header--static-lg")) && (this.element.hasClass("u-header--show-hide-lg") && e.lg.push(new o(this.element)),
                this.element.hasClass("u-header--change-logo-lg") && e.lg.push(new r(this.element)),
                this.element.hasClass("u-header--change-appearance-lg") && e.lg.push(new l(this.element))),
                (this.element.hasClass("u-header--abs-bottom-lg") || this.element.hasClass("u-header--abs-top-2nd-screen-lg")) && (e.lg.push(new t(this.element)),
                this.element.hasClass("u-header--change-appearance-lg") && e.lg.push(new l(this.element,{
                    fixPointSelf: !0
                })),
                this.element.hasClass("u-header--change-logo-lg") && e.lg.push(new r(this.element,{
                    fixPointSelf: !0
                }))),
                this.element.hasClass("u-header--has-hidden-element-xl") && e.xl.push(new c(this.element)),
                this.element.hasClass("u-header--sticky-top-xl") && (this.element.hasClass("u-header--show-hide-xl") ? e.xl.push(new n(this.element)) : this.element.hasClass("u-header--toggle-section-xl") && e.xl.push(new a(this.element)),
                this.element.hasClass("u-header--change-logo-xl") && e.xl.push(new r(this.element)),
                this.element.hasClass("u-header--change-appearance-xl") && e.xl.push(new l(this.element))),
                this.element.hasClass("u-header--floating-xl") && e.xl.push(new d(this.element)),
                this.element.hasClass("u-header--invulnerable-xl") && e.xl.push(new u(this.element)),
                this.element.hasClass("u-header--sticky-bottom-xl") && (this.element.hasClass("u-header--change-appearance-xl") && e.xl.push(new l(this.element)),
                this.element.hasClass("u-header--change-logo-xl") && e.xl.push(new r(this.element))),
                (this.element.hasClass("u-header--abs-top-xl") || this.element.hasClass("u-header--static-xl")) && (this.element.hasClass("u-header--show-hide-xl") && e.xl.push(new o(this.element)),
                this.element.hasClass("u-header--change-logo-xl") && e.xl.push(new r(this.element)),
                this.element.hasClass("u-header--change-appearance-xl") && e.xl.push(new l(this.element))),
                (this.element.hasClass("u-header--abs-bottom-xl") || this.element.hasClass("u-header--abs-top-2nd-screen-xl")) && (e.xl.push(new t(this.element)),
                this.element.hasClass("u-header--change-appearance-xl") && e.xl.push(new l(this.element,{
                    fixPointSelf: !0
                })),
                this.element.hasClass("u-header--change-logo-xl") && e.xl.push(new r(this.element,{
                    fixPointSelf: !0
                }))),
                e
            }
        },
        fixMediaDifference: function(e) {
            var t;
            e && e.length && e.filter('[class*="u-header--side"]').length && (e.hasClass("u-header--side-left-xl") || e.hasClass("u-header--side-right-xl") ? (t = e.find(".navbar-expand-xl")).length && t.removeClass("navbar-expand-xl").addClass("navbar-expand-lg") : e.hasClass("u-header--side-left-lg") || e.hasClass("u-header--side-right-lg") ? (t = e.find(".navbar-expand-lg")).length && t.removeClass("navbar-expand-lg").addClass("navbar-expand-md") : e.hasClass("u-header--side-left-md") || e.hasClass("u-header--side-right-md") ? (t = e.find(".navbar-expand-md")).length && t.removeClass("navbar-expand-md").addClass("navbar-expand-sm") : (e.hasClass("u-header--side-left-sm") || e.hasClass("u-header--side-right-sm")) && (t = e.find(".navbar-expand-sm")).length && t.removeClass("navbar-expand-sm").addClass("navbar-expand"))
        }
    },
    e.prototype.checkViewport = function() {
        var e = s(window);
        return e.width() > this.config.breakpointsMap.sm && this.observers.sm.length ? (this.prevViewport = this.viewport,
        this.viewport = "sm",
        this.element[0].dataset.headerFixMoment && e.scrollTop() > this.element[0].dataset.headerFixMoment && (void 0 === this.config.breakpointsMap.sm ? this.element.removeClass("js-header-fix-moment") : this.element.addClass("js-header-fix-moment"))) : e.width() > this.config.breakpointsMap.md && this.observers.md.length ? (this.prevViewport = this.viewport,
        this.viewport = "md",
        this.element[0].dataset.headerFixMoment && e.scrollTop() > this.element[0].dataset.headerFixMoment && (void 0 === this.config.breakpointsMap.md ? this.element.removeClass("js-header-fix-moment") : this.element.addClass("js-header-fix-moment"))) : e.width() > this.config.breakpointsMap.lg && this.observers.lg.length ? (this.prevViewport = this.viewport,
        this.viewport = "lg",
        this.element[0].dataset.headerFixMoment && e.scrollTop() > this.element[0].dataset.headerFixMoment && (void 0 === this.config.breakpointsMap.lg ? this.element.removeClass("js-header-fix-moment") : this.element.addClass("js-header-fix-moment"))) : e.width() > this.config.breakpointsMap.xl && this.observers.xl.length ? (this.prevViewport = this.viewport,
        this.viewport = "xl",
        this.element[0].dataset.headerFixMoment && e.scrollTop() > this.element[0].dataset.headerFixMoment && (void 0 === this.config.breakpointsMap.xl ? this.element.removeClass("js-header-fix-moment") : this.element.addClass("js-header-fix-moment"))) : (this.prevViewport && (this.prevViewport = this.viewport),
        this.element[0].dataset.headerFixMoment && e.scrollTop() > this.element[0].dataset.headerFixMoment && (void 0 === this.config.breakpointsMap.xs ? this.element.removeClass("js-header-fix-moment") : this.element.addClass("js-header-fix-moment")),
        this.viewport = "xs"),
        this
    }
    ,
    e.prototype.notify = function() {
        return this.prevViewport && (this.observers[this.prevViewport].forEach(function(e) {
            e.destroy()
        }),
        this.prevViewport = null),
        this.observers[this.viewport].forEach(function(e) {
            e.check()
        }),
        this
    }
    ,
    e.prototype.update = function() {
        for (var e in this.observers)
            this.observers[e].forEach(function(e) {
                e.destroy()
            });
        return this.prevViewport = null,
        this.observers[this.viewport].forEach(function(e) {
            e.reinit()
        }),
        this
    }
    ,
    t.prototype.init = function() {
        return this.defaultState = !0,
        this.offset = this.element.offset().top,
        this
    }
    ,
    t.prototype.destroy = function() {
        return this.toDefaultState(),
        this
    }
    ,
    t.prototype.check = function() {
        var e = s(window).scrollTop();
        return e > this.offset && this.defaultState ? this.changeState() : e < this.offset && !this.defaultState && this.toDefaultState(),
        this
    }
    ,
    t.prototype.changeState = function() {
        return this.element.addClass("js-header-fix-moment"),
        this.defaultState = !this.defaultState,
        this
    }
    ,
    t.prototype.toDefaultState = function() {
        return this.element.removeClass("js-header-fix-moment"),
        this.defaultState = !this.defaultState,
        this
    }
    ,
    n.prototype.init = function() {
        return this.direction = "down",
        this.delta = 0,
        this.defaultState = !0,
        this.offset = isFinite(this.element.data("header-fix-moment")) && 0 !== this.element.data("header-fix-moment") ? this.element.data("header-fix-moment") : 5,
        this.effect = this.element.data("header-fix-effect") ? this.element.data("header-fix-effect") : "show-hide",
        this
    }
    ,
    n.prototype.destroy = function() {
        return this.toDefaultState(),
        this
    }
    ,
    n.prototype.checkDirection = function() {
        return s(window).scrollTop() > this.delta ? this.direction = "down" : this.direction = "up",
        this.delta = s(window).scrollTop(),
        this
    }
    ,
    n.prototype.toDefaultState = function() {
        switch (this.effect) {
        case "slide":
            this.element.removeClass("u-header--moved-up");
            break;
        case "fade":
            this.element.removeClass("u-header--faded");
            break;
        default:
            this.element.removeClass("u-header--invisible")
        }
        return this.defaultState = !this.defaultState,
        this
    }
    ,
    n.prototype.changeState = function() {
        switch (this.effect) {
        case "slide":
            this.element.addClass("u-header--moved-up");
            break;
        case "fade":
            this.element.addClass("u-header--faded");
            break;
        default:
            this.element.addClass("u-header--invisible")
        }
        return this.defaultState = !this.defaultState,
        this
    }
    ,
    n.prototype.check = function() {
        var e = s(window).scrollTop();
        return this.checkDirection(),
        e >= this.offset && this.defaultState && "down" === this.direction ? this.changeState() : this.defaultState || "up" !== this.direction || this.toDefaultState(),
        this
    }
    ,
    o.prototype.init = function() {
        return !this.defaultState && s(window).scrollTop() > this.offset || (this.defaultState = !0,
        this.transitionDuration = 1e3 * parseFloat(getComputedStyle(this.element.get(0))["transition-duration"], 10),
        this.offset = isFinite(this.element.data("header-fix-moment")) && this.element.data("header-fix-moment") > this.element.outerHeight() ? this.element.data("header-fix-moment") : this.element.outerHeight() + 100,
        this.effect = this.element.data("header-fix-effect") ? this.element.data("header-fix-effect") : "show-hide"),
        this
    }
    ,
    o.prototype.destroy = function() {
        return !this.defaultState && s(window).scrollTop() > this.offset || (this.element.removeClass("u-header--untransitioned"),
        this._removeCap()),
        this
    }
    ,
    o.prototype._insertCap = function() {
        switch (this.element.addClass("js-header-fix-moment u-header--untransitioned"),
        this.element.hasClass("u-header--static") && s("html").css("padding-top", this.element.outerHeight()),
        this.effect) {
        case "fade":
            this.element.addClass("u-header--faded");
            break;
        case "slide":
            this.element.addClass("u-header--moved-up");
            break;
        default:
            this.element.addClass("u-header--invisible")
        }
        this.capInserted = !0
    }
    ,
    o.prototype._removeCap = function() {
        var e = this;
        this.element.removeClass("js-header-fix-moment"),
        this.element.hasClass("u-header--static") && s("html").css("padding-top", 0),
        this.removeCapTimeOutId && clearTimeout(this.removeCapTimeOutId),
        this.removeCapTimeOutId = setTimeout(function() {
            e.element.removeClass("u-header--moved-up u-header--faded u-header--invisible")
        }, 10),
        this.capInserted = !1
    }
    ,
    o.prototype.check = function() {
        var e = s(window);
        e.scrollTop() > this.element.outerHeight() && !this.capInserted ? this._insertCap() : e.scrollTop() <= this.element.outerHeight() && this.capInserted && this._removeCap(),
        e.scrollTop() > this.offset && this.defaultState ? this.changeState() : e.scrollTop() <= this.offset && !this.defaultState && this.toDefaultState()
    }
    ,
    o.prototype.changeState = function() {
        switch (this.element.removeClass("u-header--untransitioned"),
        this.animationTimeoutId && clearTimeout(this.animationTimeoutId),
        this.effect) {
        case "fade":
            this.element.removeClass("u-header--faded");
            break;
        case "slide":
            this.element.removeClass("u-header--moved-up");
            break;
        default:
            this.element.removeClass("u-header--invisible")
        }
        this.defaultState = !this.defaultState
    }
    ,
    o.prototype.toDefaultState = function() {
        var e = this;
        switch (this.animationTimeoutId = setTimeout(function() {
            e.element.addClass("u-header--untransitioned")
        }, this.transitionDuration),
        this.effect) {
        case "fade":
            this.element.addClass("u-header--faded");
            break;
        case "slide":
            this.element.addClass("u-header--moved-up");
            break;
        default:
            this.element.addClass("u-header--invisible")
        }
        this.defaultState = !this.defaultState
    }
    ,
    r.prototype.init = function() {
        return this.element.hasClass("js-header-fix-moment") && (this.hasFixedClass = !0,
        this.element.removeClass("js-header-fix-moment")),
        this.config.fixPointSelf ? this.offset = this.element.offset().top : this.offset = isFinite(this.element.data("header-fix-moment")) ? this.element.data("header-fix-moment") : 0,
        this.hasFixedClass && (this.hasFixedClass = !1,
        this.element.addClass("js-header-fix-moment")),
        this.imgs = this.element.find(".u-header__logo-img"),
        this.defaultState = !0,
        this.mainLogo = this.imgs.filter(".u-header__logo-img--main"),
        this.additionalLogo = this.imgs.not(".u-header__logo-img--main"),
        this.imgs.length,
        this
    }
    ,
    r.prototype.destroy = function() {
        return this.toDefaultState(),
        this
    }
    ,
    r.prototype.check = function() {
        var e = s(window);
        return this.imgs.length && (e.scrollTop() > this.offset && this.defaultState ? this.changeState() : e.scrollTop() <= this.offset && !this.defaultState && this.toDefaultState()),
        this
    }
    ,
    r.prototype.changeState = function() {
        return this.mainLogo.length && this.mainLogo.removeClass("u-header__logo-img--main"),
        this.additionalLogo.length && this.additionalLogo.addClass("u-header__logo-img--main"),
        this.defaultState = !this.defaultState,
        this
    }
    ,
    r.prototype.toDefaultState = function() {
        return this.mainLogo.length && this.mainLogo.addClass("u-header__logo-img--main"),
        this.additionalLogo.length && this.additionalLogo.removeClass("u-header__logo-img--main"),
        this.defaultState = !this.defaultState,
        this
    }
    ,
    a.prototype.init = function() {
        return this.offset = isFinite(this.element.data("header-fix-moment")) ? this.element.data("header-fix-moment") : 5,
        this.section = this.element.find(".u-header__section--hidden"),
        this.defaultState = !0,
        this.sectionHeight = this.section.length ? this.section.outerHeight() : 0,
        this
    }
    ,
    a.prototype.destroy = function() {
        return this.section.length && this.element.css({
            "margin-top": 0
        }),
        this
    }
    ,
    a.prototype.check = function() {
        if (!this.section.length)
            return this;
        var e = s(window).scrollTop();
        return e > this.offset && this.defaultState ? this.changeState() : e <= this.offset && !this.defaultState && this.toDefaultState(),
        this
    }
    ,
    a.prototype.changeState = function() {
        return this.element.stop().animate({
            "margin-top": -1 * this.sectionHeight - 1
        }),
        this.defaultState = !this.defaultState,
        this
    }
    ,
    a.prototype.toDefaultState = function() {
        return this.element.stop().animate({
            "margin-top": 0
        }),
        this.defaultState = !this.defaultState,
        this
    }
    ,
    l.prototype.init = function() {
        return this.element.hasClass("js-header-fix-moment") && (this.hasFixedClass = !0,
        this.element.removeClass("js-header-fix-moment")),
        this.config.fixPointSelf ? this.offset = this.element.offset().top : this.offset = isFinite(this.element.data("header-fix-moment")) ? this.element.data("header-fix-moment") : 5,
        this.hasFixedClass && (this.hasFixedClass = !1,
        this.element.addClass("js-header-fix-moment")),
        this.sections = this.element.find("[data-header-fix-moment-classes]"),
        this.defaultState = !0,
        this
    }
    ,
    l.prototype.destroy = function() {
        return this.toDefaultState(),
        this
    }
    ,
    l.prototype.check = function() {
        if (!this.sections.length)
            return this;
        var e = s(window).scrollTop();
        return e > this.offset && this.defaultState ? this.changeState() : e <= this.offset && !this.defaultState && this.toDefaultState(),
        this
    }
    ,
    l.prototype.changeState = function() {
        return this.sections.each(function(e, t) {
            var i = s(t)
              , n = i.data("header-fix-moment-classes")
              , o = i.data("header-fix-moment-exclude");
            (n || o) && (i.addClass(n + " js-header-change-moment"),
            i.removeClass(o))
        }),
        this.defaultState = !this.defaultState,
        this
    }
    ,
    l.prototype.toDefaultState = function() {
        return this.sections.each(function(e, t) {
            var i = s(t)
              , n = i.data("header-fix-moment-classes")
              , o = i.data("header-fix-moment-exclude");
            (n || o) && (i.removeClass(n + " js-header-change-moment"),
            i.addClass(o))
        }),
        this.defaultState = !this.defaultState,
        this
    }
    ,
    c.prototype.init = function() {
        return this.offset = isFinite(this.element.data("header-fix-moment")) ? this.element.data("header-fix-moment") : 5,
        this.elements = this.element.find(".u-header--hidden-element"),
        this.defaultState = !0,
        this
    }
    ,
    c.prototype.destroy = function() {
        return this.toDefaultState(),
        this
    }
    ,
    c.prototype.check = function() {
        if (!this.elements.length)
            return this;
        var e = s(window).scrollTop();
        return e > this.offset && this.defaultState ? this.changeState() : e <= this.offset && !this.defaultState && this.toDefaultState(),
        this
    }
    ,
    c.prototype.changeState = function() {
        return this.config.animated ? this.elements.stop().slideUp() : this.elements.hide(),
        this.defaultState = !this.defaultState,
        this
    }
    ,
    c.prototype.toDefaultState = function() {
        return this.config.animated ? this.elements.stop().slideDown() : this.elements.show(),
        this.defaultState = !this.defaultState,
        this
    }
    ,
    d.prototype.init = function() {
        return this.offset = this.element.offset().top,
        this.sections = this.element.find(".u-header__section"),
        this.defaultState = !0,
        this
    }
    ,
    d.prototype.destroy = function() {
        return this.toDefaultState(),
        this
    }
    ,
    d.prototype.check = function() {
        var e = s(window).scrollTop();
        return e > this.offset && this.defaultState ? this.changeState() : e <= this.offset && !this.defaultState && this.toDefaultState(),
        this
    }
    ,
    d.prototype.changeState = function() {
        return this.element.addClass("js-header-fix-moment").addClass(this.element.data("header-fix-moment-classes")).removeClass(this.element.data("header-fix-moment-exclude")),
        this.sections.length && this.sections.each(function(e, t) {
            var i = s(t);
            i.addClass(i.data("header-fix-moment-classes")).removeClass(i.data("header-fix-moment-exclude"))
        }),
        this.defaultState = !this.defaultState,
        this
    }
    ,
    d.prototype.toDefaultState = function() {
        return this.element.removeClass("js-header-fix-moment").removeClass(this.element.data("header-fix-moment-classes")).addClass(this.element.data("header-fix-moment-exclude")),
        this.sections.length && this.sections.each(function(e, t) {
            var i = s(t);
            i.removeClass(i.data("header-fix-moment-classes")).addClass(i.data("header-fix-moment-exclude"))
        }),
        this.defaultState = !this.defaultState,
        this
    }
    ,
    u.prototype.check = function() {
        return this
    }
    ,
    u.prototype.init = function() {
        return this
    }
    ,
    u.prototype.destroy = function() {
        return this
    }
    ,
    u.prototype.changeState = function() {
        return this
    }
    ,
    u.prototype.toDefaultState = function() {
        return this
    }
}(jQuery)