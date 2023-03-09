! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = "undefined" != typeof globalThis ? globalThis : t || self).window = t.window || {})
}(this, (function(t) {
    "use strict";
    const e = t => "object" == typeof t && null !== t && t.constructor === Object && "[object Object]" === Object.prototype.toString.call(t),
        i = (t, ...n) => {
            const s = n.length;
            for (let o = 0; o < s; o++) {
                const s = n[o] || {};
                Object.entries(s).forEach((([n, s]) => {
                    const o = Array.isArray(s) ? [] : {};
                    t[n] || Object.assign(t, {
                        [n]: o
                    }), e(s) ? Object.assign(t[n], i(o, s)) : Array.isArray(s) ? Object.assign(t, {
                        [n]: [...s]
                    }) : Object.assign(t, {
                        [n]: s
                    })
                }))
            }
            return t
        },
        n = function(t) {
            return (new DOMParser).parseFromString(t, "text/html").body.firstChild
        },
        s = !("undefined" == typeof window || !window.document || !window.document.createElement);
    let o;
    const a = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden]):not(.fancybox-focus-guard)", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])'].join(","),
        r = '<div class="f-spinner"><svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="20"></circle><circle cx="25" cy="25" r="20"></circle></svg></div>',
        l = {
            PANUP: "Move up",
            PANDOWN: "Move down",
            PANLEFT: "Move left",
            PANRIGHT: "Move right",
            ZOOMIN: "Zoom in",
            ZOOMOUT: "Zoom out",
            TOGGLEZOOM: "Toggle zoom level",
            TOGGLE1TO1: "Toggle zoom level",
            ITERATEZOOM: "Toggle zoom level",
            ROTATECCW: "Rotate counterclockwise",
            ROTATECW: "Rotate clockwise",
            FLIPX: "Flip horizontally",
            FLIPY: "Flip vertically",
            FITX: "Fit horizontally",
            FITY: "Fit vertically",
            RESET: "Reset",
            TOGGLEFS: "Toggle fullscreen"
        },
        c = {
            dragToClose: !0,
            hideScrollbar: !0,
            Carousel: {
                classes: {
                    container: "fancybox__carousel",
                    viewport: "fancybox__viewport",
                    track: "fancybox__track",
                    slide: "fancybox__slide"
                }
            },
            contentClick: "toggleZoom",
            contentDblClick: !1,
            backdropClick: "close",
            animated: !0,
            idle: 3500,
            showClass: "f-zoomInUp",
            hideClass: "f-fadeOut",
            commonCaption: !1,
            parentEl: null,
            startIndex: 0,
            l10n: Object.assign(Object.assign({}, l), {
                CLOSE: "Close",
                NEXT: "Next",
                PREV: "Previous",
                MODAL: "You can close this modal content with the ESC key",
                ERROR: "Something Went Wrong, Please Try Again Later",
                IMAGE_ERROR: "Image Not Found",
                ELEMENT_NOT_FOUND: "HTML Element Not Found",
                AJAX_NOT_FOUND: "Error Loading AJAX : Not Found",
                AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden",
                IFRAME_ERROR: "Error Loading Page",
                TOGGLE_ZOOM: "Toggle zoom level",
                TOGGLE_THUMBS: "Toggle thumbnails",
                TOGGLE_SLIDESHOW: "Toggle slideshow",
                TOGGLE_FULLSCREEN: "Toggle full-screen mode",
                DOWNLOAD: "Download"
            }),
            tpl: {
                closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg></button>',
                main: '<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">\n    <div class="fancybox__backdrop"></div>\n    <div class="fancybox__carousel"></div>\n    <div class="fancybox__footer"></div>\n  </div>'
            },
            groupAll: !1,
            groupAttr: "data-fancybox",
            defaultType: "image",
            defaultDisplay: "block",
            autoFocus: !0,
            trapFocus: !0,
            placeFocusBack: !0,
            closeButton: "auto",
            keyboard: {
                Escape: "close",
                Delete: "close",
                Backspace: "close",
                PageUp: "next",
                PageDown: "prev",
                ArrowUp: "next",
                ArrowDown: "prev",
                ArrowRight: "next",
                ArrowLeft: "prev"
            },
            Fullscreen: {
                autoStart: !1
            },
            compact: () => window.matchMedia("(max-width: 578px), (max-height: 578px)").matches,
            wheel: "zoom"
        };
    var h, d;
    ! function(t) {
        t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Closing = 2] = "Closing", t[t.CustomClosing = 3] = "CustomClosing", t[t.Destroy = 4] = "Destroy"
    }(h || (h = {})),
    function(t) {
        t[t.Loading = 0] = "Loading", t[t.Opening = 1] = "Opening", t[t.Ready = 2] = "Ready", t[t.Closing = 3] = "Closing"
    }(d || (d = {}));
    const u = function(t, e) {
        return t.split(".").reduce(((t, e) => "object" == typeof t ? t[e] : void 0), e)
    };
    class p {
        constructor(t = {}) {
            Object.defineProperty(this, "options", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: t
            }), Object.defineProperty(this, "events", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: new Map
            }), this.setOptions(t);
            for (const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) t.startsWith("on") && "function" == typeof this[t] && (this[t] = this[t].bind(this))
        }
        setOptions(t) {
            this.options = t ? i({}, this.constructor.defaults, t) : {};
            for (const [t, e] of Object.entries(this.option("on") || {})) this.on(t, e)
        }
        option(t, ...e) {
            let i = u(t, this.options);
            return i && "function" == typeof i && (i = i.call(this, this, ...e)), i
        }
        optionFor(t, e, i, ...n) {
            let s = u(e, t);
            var o;
            "string" != typeof(o = s) || isNaN(o) || isNaN(parseFloat(o)) || (s = parseFloat(s)), "true" === s && (s = !0), "false" === s && (s = !1), s && "function" == typeof s && (s = s.call(this, this, t, ...n));
            let a = u(e, this.options);
            return a && "function" == typeof a ? s = a.call(this, this, t, ...n, s) : void 0 === s && (s = a), void 0 === s ? i : s
        }
        cn(t) {
            const e = this.options.classes;
            return e && e[t] || ""
        }
        localize(t, e = []) {
            t = String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g, ((t, e, i) => {
                let n = "";
                return i ? n = this.option(`${e[0]+e.toLowerCase().substring(1)}.l10n.${i}`) : e && (n = this.option(`l10n.${e}`)), n || (n = t), n
            }));
            for (let i = 0; i < e.length; i++) t = t.split(e[i][0]).join(e[i][1]);
            return t = t.replace(/\{\{(.*)\}\}/, ((t, e) => e))
        }
        on(t, e) {
            let i = [];
            "string" == typeof t ? i = t.split(" ") : Array.isArray(t) && (i = t), this.events || (this.events = new Map), i.forEach((t => {
                let i = this.events.get(t);
                i || (this.events.set(t, []), i = []), i.includes(e) || i.push(e), this.events.set(t, i)
            }))
        }
        off(t, e) {
            let i = [];
            "string" == typeof t ? i = t.split(" ") : Array.isArray(t) && (i = t), i.forEach((t => {
                const i = this.events.get(t);
                if (Array.isArray(i)) {
                    const t = i.indexOf(e);
                    t > -1 && i.splice(t, 1)
                }
            }))
        }
        emit(t, ...e) {
            [...this.events.get(t) || []].forEach((t => t(this, ...e))), "*" !== t && this.emit("*", t, ...e)
        }
    }
    Object.defineProperty(p, "version", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "5.0.6"
    }), Object.defineProperty(p, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {}
    });
    class m extends p {
        constructor(t = {}) {
            super(t), Object.defineProperty(this, "plugins", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {}
            })
        }
        attachPlugins(t = {}) {
            const e = new Map;
            for (const [i, n] of Object.entries(t)) {
                const t = this.option(i),
                    s = this.plugins[i];
                s || !1 === t ? s && !1 === t && (s.detach(), delete this.plugins[i]) : e.set(i, new n(this, t || {}))
            }
            for (const [t, i] of e) this.plugins[t] = i, i.attach();
            this.emit("attachPlugins")
        }
        detachPlugins() {
            for (const t of Object.values(this.plugins)) t.detach();
            return this.plugins = {}, this.emit("detachPlugins"), this
        }
    }
    class f extends p {
        constructor(t, e) {
            super(e), Object.defineProperty(this, "instance", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: t
            })
        }
        attach() {}
        detach() {}
    }
    const g = () => {
        queueMicrotask((() => {
            (() => {
                const {
                    slug: t,
                    index: e
                } = b.parseURL(), i = xt.getInstance();
                if (i && !1 !== i.option("Hash")) {
                    const n = i.carousel;
                    if (t && n) {
                        for (let e of n.slides)
                            if (e.slug && e.slug === t) return n.slideTo(e.index);
                        if (t === i.option("slug")) return n.slideTo(e - 1);
                        const s = i.getSlide(),
                            o = s && s.triggerEl && s.triggerEl.dataset;
                        if (o && o.fancybox === t) return n.slideTo(e - 1)
                    }
                    b.hasSilentClose = !0, i.close()
                }
                b.startFromUrl()
            })()
        }))
    };
    class b extends f {
        constructor() {
            super(...arguments), Object.defineProperty(this, "origHash", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: ""
            }), Object.defineProperty(this, "timer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            })
        }
        onChange() {
            const t = this.instance,
                e = t.carousel;
            this.timer && clearTimeout(this.timer);
            const i = t.getSlide();
            if (!e || !i) return;
            const n = t.isOpeningSlide(i),
                s = new URL(document.URL).hash;
            let o, a = i.slug || void 0;
            o = a || this.instance.option("slug"), !o && i.triggerEl && i.triggerEl.dataset && (o = i.triggerEl.dataset.fancybox);
            let r = "";
            o && "true" !== o && (r = "#" + o + (!a && e.slides.length > 1 ? "-" + (i.index + 1) : "")), n && (this.origHash = s !== r ? s : ""), r && s !== r && (this.timer = setTimeout((() => {
                try {
                    window.history[n ? "pushState" : "replaceState"]({}, document.title, window.location.pathname + window.location.search + r)
                } catch (t) {}
            }), 300))
        }
        onClose() {
            if (this.timer && clearTimeout(this.timer), !0 !== b.hasSilentClose) try {
                window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (this.origHash || ""))
            } catch (t) {}
        }
        attach() {
            this.instance.on("Carousel.ready", this.onChange), this.instance.on("Carousel.change", this.onChange), this.instance.on("close", this.onClose)
        }
        detach() {
            this.instance.off("Carousel.ready", this.onChange), this.instance.off("Carousel.change", this.onChange), this.instance.off("close", this.onClose)
        }
        static parseURL() {
            const t = window.location.hash.slice(1),
                e = t.split("-"),
                i = e[e.length - 1],
                n = i && /^\+?\d+$/.test(i) && parseInt(e.pop() || "1", 10) || 1;
            return {
                hash: t,
                slug: e.join("-"),
                index: n
            }
        }
        static startFromUrl() {
            if (b.hasSilentClose = !1, xt.getInstance() || !1 === xt.defaults.Hash) return;
            const {
                hash: t,
                slug: e,
                index: i
            } = b.parseURL();
            if (!e) return;
            let n = document.querySelector(`[data-slug="${t}"]`);
            if (n && n.dispatchEvent(new CustomEvent("click", {
                    bubbles: !0,
                    cancelable: !0
                })), xt.getInstance()) return;
            const s = document.querySelectorAll(`[data-fancybox="${e}"]`);
            s.length && (n = s[i - 1], n && n.dispatchEvent(new CustomEvent("click", {
                bubbles: !0,
                cancelable: !0
            })))
        }
        static destroy() {
            window.removeEventListener("hashchange", g, !1)
        }
    }

    function v() {
        window.addEventListener("hashchange", g, !1), setTimeout((() => {
            b.startFromUrl()
        }), 500)
    }
    Object.defineProperty(b, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {}
    }), Object.defineProperty(b, "hasSilentClose", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
    }), s && (/complete|interactive|loaded/.test(document.readyState) ? v() : document.addEventListener("DOMContentLoaded", v));
    const y = (t, e = 1e4) => (t = parseFloat(t + "") || 0, Math.round((t + Number.EPSILON) * e) / e),
        w = function(t, e) {
            return !(!t || t === document.body || e && t === e) && (function(t) {
                if (!(t && t instanceof Element && t.offsetParent)) return !1;
                const e = t.scrollHeight > t.clientHeight,
                    i = window.getComputedStyle(t).overflowY,
                    n = -1 !== i.indexOf("hidden"),
                    s = -1 !== i.indexOf("visible");
                return e && !n && !s
            }(t) ? t : w(t.parentElement, e))
        },
        x = t => `${t||""}`.split(" ").filter((t => !!t)),
        S = (t, e, i) => {
            x(e).forEach((e => {
                t && t.classList.toggle(e, i || !1)
            }))
        };
    class E {
        constructor(t) {
            Object.defineProperty(this, "pageX", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "pageY", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "clientX", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "clientY", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "id", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "time", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "nativePointer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), this.nativePointer = t, this.pageX = t.pageX, this.pageY = t.pageY, this.clientX = t.clientX, this.clientY = t.clientY, this.id = self.Touch && t instanceof Touch ? t.identifier : -1, this.time = Date.now()
        }
    }
    const P = {
        passive: !1
    };
    class C {
        constructor(t, {
            start: e = (() => !0),
            move: i = (() => {}),
            end: n = (() => {})
        }) {
            Object.defineProperty(this, "element", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "startCallback", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "moveCallback", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "endCallback", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "currentPointers", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), Object.defineProperty(this, "startPointers", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), this.element = t, this.startCallback = e, this.moveCallback = i, this.endCallback = n;
            for (const t of ["onPointerStart", "onTouchStart", "onMove", "onTouchEnd", "onPointerEnd", "onWindowBlur"]) this[t] = this[t].bind(this);
            this.element.addEventListener("touchstart", this.onTouchStart, P), this.element.addEventListener("touchmove", this.onMove, P), this.element.addEventListener("touchend", this.onTouchEnd), this.element.addEventListener("touchcancel", this.onTouchEnd), this.element.addEventListener("mousedown", this.onPointerStart, P)
        }
        onPointerStart(t) {
            if (!t.buttons || 0 !== t.button) return;
            const e = new E(t);
            this.currentPointers.some((t => t.id === e.id)) || this.triggerPointerStart(e, t) && (window.addEventListener("mousemove", this.onMove), window.addEventListener("mouseup", this.onPointerEnd), window.addEventListener("blur", this.onWindowBlur))
        }
        onTouchStart(t) {
            for (const e of Array.from(t.changedTouches)) this.triggerPointerStart(new E(e), t);
            window.addEventListener("blur", this.onWindowBlur)
        }
        onMove(t) {
            const e = this.currentPointers.slice(),
                i = "changedTouches" in t ? Array.from(t.changedTouches).map((t => new E(t))) : [new E(t)],
                n = [];
            for (const t of i) {
                const e = this.currentPointers.findIndex((e => e.id === t.id));
                e < 0 || (n.push(t), this.currentPointers[e] = t)
            }
            n.length && this.moveCallback(t, this.currentPointers.slice(), e)
        }
        onPointerEnd(t) {
            t.buttons > 0 && 0 !== t.button || (this.triggerPointerEnd(t, new E(t)), window.removeEventListener("mousemove", this.onMove), window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur))
        }
        onTouchEnd(t) {
            for (const e of Array.from(t.changedTouches)) this.triggerPointerEnd(t, new E(e))
        }
        triggerPointerStart(t, e) {
            return !!this.startCallback(e, t, this.currentPointers.slice()) && (this.currentPointers.push(t), this.startPointers.push(t), !0)
        }
        triggerPointerEnd(t, e) {
            const i = this.currentPointers.findIndex((t => t.id === e.id));
            i < 0 || (this.currentPointers.splice(i, 1), this.startPointers.splice(i, 1), this.endCallback(t, e, this.currentPointers.slice()))
        }
        onWindowBlur() {
            this.clear()
        }
        clear() {
            for (; this.currentPointers.length;) {
                const t = this.currentPointers[this.currentPointers.length - 1];
                this.currentPointers.splice(this.currentPointers.length - 1, 1), this.startPointers.splice(this.currentPointers.length - 1, 1), this.endCallback(new Event("touchend", {
                    bubbles: !0,
                    cancelable: !0,
                    clientX: t.clientX,
                    clientY: t.clientY
                }), t, this.currentPointers.slice())
            }
        }
        stop() {
            this.element.removeEventListener("mousedown", this.onPointerStart, P), this.element.removeEventListener("touchstart", this.onTouchStart, P), this.element.removeEventListener("touchmove", this.onMove, P), this.element.removeEventListener("touchend", this.onTouchEnd), this.element.removeEventListener("touchcancel", this.onTouchEnd), window.removeEventListener("mousemove", this.onMove), window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur)
        }
    }

    function M(t, e) {
        return e ? Math.sqrt(Math.pow(e.clientX - t.clientX, 2) + Math.pow(e.clientY - t.clientY, 2)) : 0
    }

    function T(t, e) {
        return e ? {
            clientX: (t.clientX + e.clientX) / 2,
            clientY: (t.clientY + e.clientY) / 2
        } : t
    }
    var O;
    ! function(t) {
        t[t.Init = 0] = "Init", t[t.Error = 1] = "Error", t[t.Ready = 2] = "Ready", t[t.Panning = 3] = "Panning", t[t.Mousemove = 4] = "Mousemove", t[t.Destroy = 5] = "Destroy"
    }(O || (O = {}));
    const A = ["a", "b", "c", "d", "e", "f"],
        L = {
            content: null,
            width: "auto",
            height: "auto",
            panMode: "drag",
            touch: !0,
            dragMinThreshold: 3,
            lockAxis: !1,
            mouseMoveFactor: 1,
            mouseMoveFriction: .12,
            zoom: !0,
            pinchToZoom: !0,
            panOnlyZoomed: "auto",
            minScale: 1,
            maxScale: 2,
            friction: .25,
            dragFriction: .35,
            decelFriction: .05,
            click: "toggleZoom",
            dblClick: !1,
            wheel: "zoom",
            wheelLimit: 7,
            spinner: !0,
            bounds: "auto",
            infinite: !1,
            rubberband: !0,
            bounce: !0,
            maxVelocity: 75,
            transformParent: !1,
            classes: {
                content: "f-panzoom__content",
                isLoading: "is-loading",
                canZoomIn: "can-zoom_in",
                canZoomOut: "can-zoom_out",
                isDraggable: "is-draggable",
                isDragging: "is-dragging",
                inFullscreen: "in-fullscreen",
                htmlHasFullscreen: "with-panzoom-in-fullscreen"
            },
            l10n: l
        },
        z = t => t && null !== t && t instanceof Element && "nodeType" in t,
        R = (t, e) => {
            x(e).forEach((e => {
                t && t.classList.remove(e)
            }))
        },
        k = (t, e) => {
            x(e).forEach((e => {
                t && t.classList.add(e)
            }))
        },
        I = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: 0,
            f: 0
        },
        D = 1e5,
        F = 1e3;
    let j = null,
        H = null;
    class B extends m {
        get isTouchDevice() {
            return null === H && (H = window.matchMedia("(hover: none)").matches), H
        }
        get isMobile() {
            return null === j && (j = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)), j
        }
        get panMode() {
            return "mousemove" !== this.options.panMode || this.isTouchDevice ? "drag" : "mousemove"
        }
        get panOnlyZoomed() {
            const t = this.options.panOnlyZoomed;
            return "auto" === t ? this.isTouchDevice : t
        }
        get isInfinite() {
            return this.option("infinite")
        }
        get angle() {
            return 180 * Math.atan2(this.current.b, this.current.a) / Math.PI || 0
        }
        get targetAngle() {
            return 180 * Math.atan2(this.target.b, this.target.a) / Math.PI || 0
        }
        get scale() {
            const {
                a: t,
                b: e
            } = this.current;
            return Math.sqrt(t * t + e * e) || 1
        }
        get targetScale() {
            const {
                a: t,
                b: e
            } = this.target;
            return Math.sqrt(t * t + e * e) || 1
        }
        get minScale() {
            return this.option("minScale") || 1
        }
        get fullScale() {
            const {
                contentRect: t
            } = this;
            return t.fullWidth / t.fitWidth || 1
        }
        get maxScale() {
            return this.fullScale * (this.option("maxScale") || 1) || 1
        }
        get coverScale() {
            const {
                containerRect: t,
                contentRect: e
            } = this, i = Math.max(t.height / e.fitHeight, t.width / e.fitWidth) || 1;
            return Math.min(this.fullScale, i)
        }
        get isScaling() {
            return Math.abs(this.targetScale - this.scale) > 1e-5 && !this.isResting
        }
        get isContentLoading() {
            const t = this.content;
            return !!(t && t instanceof HTMLImageElement) && !t.complete
        }
        get isResting() {
            if (this.isBouncingX || this.isBouncingY) return !1;
            for (const t of A) {
                const e = "e" == t || "f" === t ? .001 : 1e-5;
                if (Math.abs(this.target[t] - this.current[t]) > e) return !1
            }
            return !(!this.ignoreBounds && !this.checkBounds().inBounds)
        }
        constructor(t, e = {}, i = {}) {
            var s;
            if (super(e), Object.defineProperty(this, "pointerTracker", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "resizeObserver", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "updateTimer", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "clickTimer", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "rAF", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "isTicking", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), Object.defineProperty(this, "friction", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "ignoreBounds", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), Object.defineProperty(this, "isBouncingX", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), Object.defineProperty(this, "isBouncingY", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), Object.defineProperty(this, "clicks", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "trackingPoints", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: []
                }), Object.defineProperty(this, "wheelDelta", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "prevWheelDelta", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "prevWheelTime", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "prevMouseMoveEvent", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "state", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: O.Init
                }), Object.defineProperty(this, "isDragging", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), Object.defineProperty(this, "container", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "content", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "spinner", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "containerRect", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: {
                        width: 0,
                        height: 0,
                        innerWidth: 0,
                        innerHeight: 0
                    }
                }), Object.defineProperty(this, "contentRect", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        fullWidth: 0,
                        fullHeight: 0,
                        fitWidth: 0,
                        fitHeight: 0,
                        width: 0,
                        height: 0
                    }
                }), Object.defineProperty(this, "dragStart", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: {
                        x: 0,
                        y: 0,
                        top: 0,
                        left: 0,
                        time: 0
                    }
                }), Object.defineProperty(this, "dragOffset", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: {
                        x: 0,
                        y: 0,
                        time: 0
                    }
                }), Object.defineProperty(this, "current", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: Object.assign({}, I)
                }), Object.defineProperty(this, "target", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: Object.assign({}, I)
                }), Object.defineProperty(this, "velocity", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: {
                        a: 0,
                        b: 0,
                        c: 0,
                        d: 0,
                        e: 0,
                        f: 0
                    }
                }), Object.defineProperty(this, "lockedAxis", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: !1
                }), !t) throw new Error("No Element found");
            if (this.container = t, this.initContent(), this.attachPlugins(Object.assign(Object.assign({}, B.Plugins), i)), this.emit("init"), this.isContentLoading) {
                const e = this.content;
                if (this.option("spinner")) {
                    t.classList.add(this.cn("isLoading"));
                    const i = n(r);
                    t.contains(e) ? this.spinner = (null === (s = e.parentElement) || void 0 === s ? void 0 : s.insertBefore(i, e)) || null : this.spinner = t.appendChild(i)
                }
                this.emit("beforeLoad"), e.addEventListener("load", this.onLoad), e.addEventListener("error", this.onError)
            } else queueMicrotask((() => {
                this.enable()
            }))
        }
        initContent() {
            const {
                container: t
            } = this;
            let e = this.option("content") || t.querySelector(`.${this.cn("content")}`);
            if (e || (e = t.querySelector("img") || t.firstElementChild, e && e.classList.add(this.cn("content"))), !e) throw new Error("No content found");
            this.content = e
        }
        onLoad() {
            this.spinner && (this.spinner.remove(), this.spinner = null), this.option("spinner") && this.container.classList.remove(this.cn("isLoading")), this.emit("afterLoad"), this.state === O.Init && this.enable()
        }
        onError() {
            this.state !== O.Destroy && (this.spinner && (this.spinner.remove(), this.spinner = null), this.stop(), this.detachEvents(), this.state = O.Error, this.emit("error"))
        }
        attachObserver() {
            var t;
            let e = !1;
            this.resizeObserver || void 0 === window.ResizeObserver || (this.resizeObserver = new ResizeObserver((t => {
                if (e)
                    if (Math.abs(this.containerRect.width - t[0].contentRect.width) < .1 && Math.abs(this.containerRect.height - t[0].contentRect.height) < .1) this.updateTimer = null;
                    else {
                        if (this.updateTimer) return;
                        this.onResize(), this.isMobile && (this.updateTimer = setTimeout((() => {
                            this.onResize(), this.updateTimer = null
                        }), 300))
                    }
                else e = !0
            }))), null === (t = this.resizeObserver) || void 0 === t || t.observe(this.container)
        }
        detachObserver() {
            var t;
            null === (t = this.resizeObserver) || void 0 === t || t.disconnect()
        }
        attachEvents() {
            const {
                container: t
            } = this;
            t.addEventListener("click", this.onClick, {
                passive: !1,
                capture: !1
            }), t.addEventListener("wheel", this.onWheel, {
                passive: !1
            }), this.pointerTracker = new C(t, {
                start: this.onPointerDown,
                move: this.onPointerMove,
                end: this.onPointerUp
            }), document.addEventListener("mousemove", this.onMouseMove)
        }
        detachEvents() {
            var t;
            const {
                container: e
            } = this;
            e.removeEventListener("click", this.onClick, {
                passive: !1,
                capture: !1
            }), e.removeEventListener("wheel", this.onWheel, {
                passive: !1
            }), null === (t = this.pointerTracker) || void 0 === t || t.stop(), this.pointerTracker = null, document.removeEventListener("mousemove", this.onMouseMove), document.removeEventListener("keydown", this.onKeydown, !0), this.clickTimer && (clearTimeout(this.clickTimer), this.clickTimer = null), this.updateTimer && (clearTimeout(this.updateTimer), this.updateTimer = null)
        }
        animate() {
            this.setTargetForce();
            const t = this.option("maxVelocity");
            for (const e of A) this.friction ? (this.velocity[e] *= 1 - this.friction, t && !this.isScaling && (this.velocity[e] = Math.max(Math.min(this.velocity[e], t), -1 * t)), this.current[e] += this.velocity[e]) : this.current[e] = this.target[e];
            this.setTransform(), this.setEdgeForce(), !this.isResting || this.isDragging ? this.rAF = requestAnimationFrame((() => this.animate())) : this.stop("current")
        }
        setTargetForce() {
            for (const t of A) "e" === t && this.isBouncingX || "f" === t && this.isBouncingY || (this.velocity[t] = (1 / (1 - this.friction) - 1) * (this.target[t] - this.current[t]))
        }
        checkBounds(t = 0, e = 0) {
            const {
                current: i
            } = this, n = i.e + t, s = i.f + e, o = this.getBounds(), {
                x: a,
                y: r
            } = o, l = a.min, c = a.max, h = r.min, d = r.max;
            let u = 0,
                p = 0;
            return l !== 1 / 0 && n < l ? u = l - n : c !== 1 / 0 && n > c && (u = c - n), h !== 1 / 0 && s < h ? p = h - s : d !== 1 / 0 && s > d && (p = d - s), Math.abs(u) < .001 && (u = 0), Math.abs(p) < .001 && (p = 0), Object.assign(Object.assign({}, o), {
                xDiff: u,
                yDiff: p,
                inBounds: !u && !p
            })
        }
        clampTargetBounds() {
            const {
                target: t
            } = this, {
                x: e,
                y: i
            } = this.getBounds();
            e.min !== 1 / 0 && (t.e = Math.max(t.e, e.min)), e.max !== 1 / 0 && (t.e = Math.min(t.e, e.max)), i.min !== 1 / 0 && (t.f = Math.max(t.f, i.min)), i.max !== 1 / 0 && (t.f = Math.min(t.f, i.max))
        }
        calculateContentDim(t = this.current) {
            const {
                content: e,
                contentRect: i
            } = this, {
                fitWidth: n,
                fitHeight: s,
                fullWidth: o,
                fullHeight: a
            } = i;
            let r = o,
                l = a;
            if (this.option("zoom") || 0 !== this.angle) {
                const i = !(e instanceof HTMLImageElement) && ("none" === window.getComputedStyle(e).maxWidth || "none" === window.getComputedStyle(e).maxHeight),
                    c = i ? o : n,
                    h = i ? a : s,
                    d = this.getMatrix(t),
                    u = new DOMPoint(0, 0).matrixTransform(d),
                    p = new DOMPoint(0 + c, 0).matrixTransform(d),
                    m = new DOMPoint(0 + c, 0 + h).matrixTransform(d),
                    f = new DOMPoint(0, 0 + h).matrixTransform(d),
                    g = Math.abs(m.x - u.x),
                    b = Math.abs(m.y - u.y),
                    v = Math.abs(f.x - p.x),
                    y = Math.abs(f.y - p.y);
                r = Math.max(g, v), l = Math.max(b, y)
            }
            return {
                contentWidth: r,
                contentHeight: l
            }
        }
        setEdgeForce() {
            if (this.ignoreBounds || this.isDragging || "mousemove" === this.panMode || this.targetScale < this.scale) return this.isBouncingX = !1, void(this.isBouncingY = !1);
            const {
                target: t
            } = this, {
                x: e,
                y: i,
                xDiff: n,
                yDiff: s
            } = this.checkBounds();
            const o = this.option("maxVelocity");
            let a = this.velocity.e,
                r = this.velocity.f;
            0 !== n ? (this.isBouncingX = !0, n * a <= 0 ? a += .14 * n : (a = .14 * n, e.min !== 1 / 0 && (this.target.e = Math.max(t.e, e.min)), e.max !== 1 / 0 && (this.target.e = Math.min(t.e, e.max))), o && (a = Math.max(Math.min(a, o), -1 * o))) : this.isBouncingX = !1, 0 !== s ? (this.isBouncingY = !0, s * r <= 0 ? r += .14 * s : (r = .14 * s, i.min !== 1 / 0 && (this.target.f = Math.max(t.f, i.min)), i.max !== 1 / 0 && (this.target.f = Math.min(t.f, i.max))), o && (r = Math.max(Math.min(r, o), -1 * o))) : this.isBouncingY = !1, this.isBouncingX && (this.velocity.e = a), this.isBouncingY && (this.velocity.f = r)
        }
        enable() {
            const {
                content: t
            } = this, e = new DOMMatrixReadOnly(window.getComputedStyle(t).transform);
            for (const t of A) this.current[t] = this.target[t] = e[t];
            this.updateMetrics(), this.attachObserver(), this.attachEvents(), this.state = O.Ready, this.emit("ready")
        }
        onClick(t) {
            var e;
            this.isDragging && (null === (e = this.pointerTracker) || void 0 === e || e.clear(), this.trackingPoints = [], this.startDecelAnim());
            const i = t.target;
            if (!i || t.defaultPrevented) return;
            if (i && i.hasAttribute("disabled")) return t.preventDefault(), void t.stopPropagation();
            if ((() => {
                    const t = window.getSelection();
                    return t && "Range" === t.type
                })() && !i.closest("button")) return;
            const n = i.closest("[data-panzoom-action]"),
                s = i.closest("[data-panzoom-change]"),
                o = n || s,
                a = o && z(o) ? o.dataset : null;
            if (a) {
                const e = a.panzoomChange,
                    i = a.panzoomAction;
                if ((e || i) && t.preventDefault(), e) {
                    let t = {};
                    try {
                        t = JSON.parse(e)
                    } catch (t) {
                        console && console.warn("The given data was not valid JSON")
                    }
                    return void this.applyChange(t)
                }
                if (i) return void(this[i] && this[i]())
            }
            if (Math.abs(this.dragOffset.x) > 3 || Math.abs(this.dragOffset.y) > 3) return t.preventDefault(), void t.stopPropagation();
            const r = this.content.getBoundingClientRect();
            if (this.dragStart.time && !this.canZoomOut() && (Math.abs(r.x - this.dragStart.x) > 2 || Math.abs(r.y - this.dragStart.y) > 2)) return;
            this.dragStart.time = 0;
            const l = e => {
                    !this.option("zoom") || Math.abs(this.velocity.a) > .3 || e && "string" == typeof e && /(iterateZoom)|(toggle(Zoom|Full|Cover|Max)|(zoomTo(Fit|Cover|Max)))/.test(e) && "function" == typeof this[e] && (t.preventDefault(), this[e]({
                        event: t
                    }))
                },
                c = this.option("click", t),
                h = this.option("dblClick", t);
            h ? (this.clicks++, 1 == this.clicks && (this.clickTimer = setTimeout((() => {
                1 === this.clicks ? (this.emit("click", t), !t.defaultPrevented && c && l(c)) : (this.emit("dblClick", t), t.defaultPrevented || l(h)), this.clicks = 0, this.clickTimer = null
            }), 350))) : (this.emit("click", t), !t.defaultPrevented && c && l(c))
        }
        addTrackingPoint(t) {
            const e = this.trackingPoints.filter((t => t.time > Date.now() - 100));
            e.push(t), this.trackingPoints = e
        }
        onPointerDown(t, e, i) {
            var n;
            this.dragOffset = {
                x: 0,
                y: 0,
                time: 0
            }, this.trackingPoints = [];
            const s = this.content.getBoundingClientRect();
            if (this.dragStart = {
                    x: s.x,
                    y: s.y,
                    top: s.top,
                    left: s.left,
                    time: Date.now()
                }, !1 === this.option("touch", t)) return !1;
            if (this.clickTimer) return !1;
            if ("mousemove" === this.panMode && this.targetScale > 1) return t.preventDefault(), t.stopPropagation(), !1;
            if (!i.length) {
                const e = t.composedPath()[0];
                if (["A", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].includes(e.nodeName) || e.closest("[contenteditable]") || e.closest("[data-selectable]") || e.closest("[data-panzoom-change]") || e.closest("[data-panzoom-action]")) return !1;
                null === (n = window.getSelection()) || void 0 === n || n.removeAllRanges()
            }
            return "mousedown" === t.type && t.preventDefault(), y(this.targetScale, 1e3) === y(this.minScale, 1e3) ? (this.stop(), this.target.e = this.current.e, this.target.f = this.current.f) : this.stop("target"), this.isDragging = !0, this.addTrackingPoint(e), this.emit("touchStart", t), !0
        }
        onPointerMove(t, e, i) {
            if (!this.isDragging) return;
            if (e.length < 2 && this.panOnlyZoomed && y(this.targetScale) <= y(this.minScale)) return;
            if (this.emit("touchMove", t), t.defaultPrevented) return;
            this.addTrackingPoint(e[0]);
            const {
                content: n
            } = this, s = T(i[0], i[1]), o = T(e[0], e[1]);
            let a = 0,
                r = 0;
            if (e.length > 1) {
                const t = n.getBoundingClientRect();
                a = s.clientX - t.left - .5 * t.width, r = s.clientY - t.top - .5 * t.height
            }
            const l = M(i[0], i[1]),
                c = M(e[0], e[1]);
            let h = l ? c / l : 1,
                d = o.clientX - s.clientX,
                u = o.clientY - s.clientY;
            this.dragOffset.x += d, this.dragOffset.y += u, this.dragOffset.time = Date.now() - this.dragStart.time;
            let p = y(this.targetScale) === y(this.minScale) && this.option("lockAxis");
            if (p && !this.lockedAxis)
                if ("xy" === p || "y" === p || "touchmove" === t.type) {
                    if (Math.abs(this.dragOffset.x) < 6 && Math.abs(this.dragOffset.y) < 6) return void t.preventDefault();
                    const e = Math.abs(180 * Math.atan2(this.dragOffset.y, this.dragOffset.x) / Math.PI);
                    this.lockedAxis = e > 45 && e < 135 ? "y" : "x", this.dragOffset.x = 0, this.dragOffset.y = 0, d = 0, u = 0
                } else this.lockedAxis = p;
            if (w(t.target, this.content) && (p = "x", this.dragOffset.y = 0), p && "xy" !== p && this.lockedAxis !== p && y(this.targetScale) === y(this.minScale)) return;
            t.cancelable && t.preventDefault(), this.container.classList.add(this.cn("isDragging"));
            const m = this.checkBounds(d, u);
            this.option("rubberband") ? ("x" !== this.isInfinite && (m.xDiff > 0 && d < 0 || m.xDiff < 0 && d > 0) && (d *= Math.max(0, .5 - Math.abs(.75 / this.contentRect.fitWidth * m.xDiff))), "y" !== this.isInfinite && (m.yDiff > 0 && u < 0 || m.yDiff < 0 && u > 0) && (u *= Math.max(0, .5 - Math.abs(.75 / this.contentRect.fitHeight * m.yDiff)))) : (m.xDiff && (d = 0), m.yDiff && (u = 0));
            const f = this.targetScale,
                g = this.minScale,
                b = this.maxScale;
            f < .5 * g && (h = Math.max(h, g)), f > 1.5 * b && (h = Math.min(h, b)), "y" === this.lockedAxis && y(f) === y(g) && (d = 0), "x" === this.lockedAxis && y(f) === y(g) && (u = 0), this.applyChange({
                originX: a,
                originY: r,
                panX: d,
                panY: u,
                scale: h,
                friction: this.option("dragFriction"),
                ignoreBounds: !0
            })
        }
        onPointerUp(t, e, i) {
            if (i.length) return this.dragOffset.x = 0, this.dragOffset.y = 0, void(this.trackingPoints = []);
            this.container.classList.remove(this.cn("isDragging")), this.isDragging && (this.isDragging = !1, this.addTrackingPoint(e), this.panOnlyZoomed && this.contentRect.width - this.contentRect.fitWidth < 1 && this.contentRect.height - this.contentRect.fitHeight < 1 && (this.trackingPoints = []), w(t.target, this.content) && "y" === this.lockedAxis && (this.trackingPoints = []), this.emit("touchEnd", t), this.state !== O.Destroy && (t.defaultPrevented || this.startDecelAnim()))
        }
        startDecelAnim() {
            this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, this.isBouncingY = !1;
            for (const t of A) this.velocity[t] = 0, this.target[t] = this.current[t];
            R(this.container, "is-scaling"), R(this.container, "is-animating"), this.isTicking = !1;
            const {
                trackingPoints: t
            } = this, e = t[0], i = t[t.length - 1];
            let n = 0,
                s = 0,
                o = 0;
            i && e && (n = i.clientX - e.clientX, s = i.clientY - e.clientY, o = i.time - e.time);
            let a = 0,
                r = 0,
                l = 0,
                c = 0,
                h = this.option("decelFriction");
            const d = this.targetScale;
            if ((d < this.minScale - 1e-5 || d > this.maxScale + 1e-5) && (h = .35), o > 0) {
                l = Math.abs(n) > 3 ? n / (o / 30) : 0, c = Math.abs(s) > 3 ? s / (o / 30) : 0;
                const t = this.option("maxVelocity");
                t && (l = Math.max(Math.min(l, t), -1 * t), c = Math.max(Math.min(c, t), -1 * t))
            }
            l && (a = l / (1 / (1 - h) - 1)), c && (r = c / (1 / (1 - h) - 1)), ("y" === this.option("lockAxis") || "xy" === this.option("lockAxis") && "y" === this.lockedAxis && y(d) === this.minScale) && (a = l = 0), ("x" === this.option("lockAxis") || "xy" === this.option("lockAxis") && "x" === this.lockedAxis && y(d) === this.minScale) && (r = c = 0);
            const u = this.option("dragMinThreshold") || 0;
            Math.abs(this.dragOffset.x) < u && Math.abs(this.dragOffset.y) < u && (a = r = 0, l = c = 0), this.applyChange({
                panX: a,
                panY: r,
                friction: h
            }), this.emit("decel", l, c)
        }
        onWheel(t) {
            const e = Date.now(),
                i = Math.max(-1, Math.min(1, -t.deltaY || -t.deltaX || -t.detail));
            if (this.prevWheelTime && e - this.prevWheelTime < 200 && this.prevWheelDelta !== i) return void t.preventDefault();
            if (this.prevWheelDelta = i, this.prevWheelTime = e, this.emit("wheel", t, i), "mousemove" === this.panMode) return;
            if (t.defaultPrevented) return;
            const n = this.option("wheel");
            "pan" === n ? (t.preventDefault(), this.panOnlyZoomed && !this.canZoomOut() || this.applyChange({
                panY: 100 * i,
                bounce: !1
            })) : "zoom" === n && !1 !== this.option("zoom") && this.zoomWithWheel(t)
        }
        onMouseMove(t) {
            this.panWithMouse(t)
        }
        onKeydown(t) {
            "Escape" === t.key && this.toggleFS()
        }
        onResize() {
            this.updateMetrics(), this.checkBounds().inBounds || this.requestTick()
        }
        setTransform() {
            this.emit("beforeTransform");
            const {
                current: t,
                target: e,
                content: i,
                contentRect: n
            } = this, s = Object.assign({}, I);
            for (const i of A) {
                const n = "e" == i || "f" === i ? F : D;
                s[i] = y(t[i], n), Math.abs(e[i] - t[i]) < ("e" == i || "f" === i ? .51 : .001) && (this.current[i] = e[i])
            }
            const {
                a: o,
                b: a,
                c: r,
                d: l,
                e: c,
                f: h
            } = s, d = `matrix(${o}, ${a}, ${r}, ${l}, ${c}, ${h})`, u = (this.option("transformParent") ? i.parentElement : null) || i;
            if (u.style.transform === d) return;
            u.style.transform = d;
            const {
                contentWidth: p,
                contentHeight: m
            } = this.calculateContentDim();
            n.width = p, n.height = m, this.emit("afterTransform")
        }
        updateMetrics(t = !1) {
            if (!this || this.state === O.Destroy) return;
            const {
                container: e,
                containerRect: i,
                content: n
            } = this, s = i.innerWidth, o = i.innerHeight, a = e.getBoundingClientRect(), r = getComputedStyle(this.container), l = a.width, c = a.height, h = parseFloat(r.paddingTop) + parseFloat(r.paddingBottom), d = parseFloat(r.paddingLeft) + parseFloat(r.paddingRight);
            this.containerRect = {
                width: l,
                height: c,
                innerWidth: l - d,
                innerHeight: c - h
            };
            let u = this.option("width") || "auto",
                p = this.option("height") || "auto";
            "auto" === u && (u = parseFloat(n.dataset.width || "") || (t => {
                let e = 0;
                return e = t instanceof HTMLImageElement ? t.naturalWidth : t instanceof SVGElement ? t.width.baseVal.value : t.offsetWidth, Math.max(e, t.scrollWidth)
            })(n)), "auto" === p && (p = parseFloat(n.dataset.height || "") || (t => {
                let e = 0;
                return e = t instanceof HTMLImageElement ? t.naturalHeight : t instanceof SVGElement ? t.height.baseVal.value : t.offsetHeight, Math.max(e, t.scrollHeight)
            })(n));
            const m = (this.option("transformParent") ? n.parentElement : null) || n,
                f = m.getAttribute("style") || "";
            m.style.setProperty("transform", "none", "important"), m.style.setProperty("transition", "none", "important"), m.style.setProperty("animation", "none", "important"), n instanceof HTMLImageElement && (m.style.width = "", m.style.height = ""), m.offsetHeight;
            const g = n.getBoundingClientRect();
            let b = g.width,
                v = g.height,
                w = 0,
                x = 0;
            if (n instanceof HTMLImageElement && ({
                    width: b,
                    height: v,
                    top: w,
                    left: x
                } = ((t, e, i, n) => {
                    const s = i / n;
                    return s > t / e ? (i = t, n = t / s) : (i = e * s, n = e), {
                        width: i,
                        height: n,
                        top: .5 * (e - n),
                        left: .5 * (t - i)
                    }
                })(g.width, g.height, u, p)), this.contentRect = Object.assign(Object.assign({}, this.contentRect), {
                    top: g.top - a.top + w,
                    bottom: a.bottom - g.bottom + w,
                    left: g.left - a.left + x,
                    right: a.right - g.right + x,
                    fitWidth: b,
                    fitHeight: v,
                    width: b,
                    height: v,
                    fullWidth: u,
                    fullHeight: p
                }), m.style.cssText = f, n instanceof HTMLImageElement && (m.style.width = `${b}px`, m.style.height = `${v}px`), this.setTransform(), !0 !== t) {
                let t = "";
                Math.abs(l - s) > 1 && (t += "x"), Math.abs(c - o) > 1 && (t += "y"), t && this.emit("refresh", t)
            }
            this.ignoreBounds || (y(this.targetScale) < y(this.minScale) ? this.zoomTo(this.minScale, {
                friction: 0
            }) : this.targetScale > this.maxScale ? this.zoomTo(this.maxScale, {
                friction: 0
            }) : this.state === O.Init || this.checkBounds().inBounds || this.requestTick()), this.updateControls()
        }
        getBounds() {
            const t = this.option("bounds");
            if ("auto" !== t) return t;
            const {
                contentWidth: e,
                contentHeight: i
            } = this.calculateContentDim(this.target);
            let n = 0,
                s = 0,
                o = 0,
                a = 0;
            const r = this.option("infinite");
            if (!0 === r || this.lockedAxis && r === this.lockedAxis) n = -1 / 0, o = 1 / 0, s = -1 / 0, a = 1 / 0;
            else {
                let {
                    containerRect: t,
                    contentRect: r
                } = this, l = y(this.contentRect.fitWidth * this.targetScale, F), c = y(this.contentRect.fitHeight * this.targetScale, F), {
                    innerWidth: h,
                    innerHeight: d
                } = t;
                if (this.containerRect.width === l && (h = t.width), this.containerRect.width === c && (d = t.height), e > h) {
                    o = .5 * (e - h), n = -1 * o;
                    let t = .5 * (r.right - r.left);
                    n += t, o += t
                }
                if (this.contentRect.fitWidth > h && e < h && (n -= .5 * (this.contentRect.fitWidth - h), o -= .5 * (this.contentRect.fitWidth - h)), i > d) {
                    a = .5 * (i - d), s = -1 * a;
                    let t = .5 * (r.bottom - r.top);
                    s += t, a += t
                }
                this.contentRect.fitHeight > d && i < d && (n -= .5 * (this.contentRect.fitHeight - d), o -= .5 * (this.contentRect.fitHeight - d))
            }
            return {
                x: {
                    min: n,
                    max: o
                },
                y: {
                    min: s,
                    max: a
                }
            }
        }
        updateControls() {
            const t = this,
                e = t.container;
            let i = {
                    toggleMax: this.targetScale - this.minScale < .5 * (this.maxScale - this.minScale) ? this.maxScale : this.minScale,
                    toggleCover: this.targetScale - this.minScale < .5 * (this.coverScale - this.minScale) ? this.coverScale : this.minScale,
                    toggleZoom: this.targetScale - this.minScale < .5 * (this.fullScale - this.minScale) ? this.fullScale : this.minScale
                } [this.option("click") || ""] || this.minScale,
                n = t.canZoomIn(),
                s = t.canZoomOut(),
                o = "drag" === this.panMode,
                a = s && o;
            this.targetScale <= this.minScale && !this.panOnlyZoomed && (a = !0), (this.contentRect.width - this.contentRect.fitWidth > -1 || this.contentRect.height - this.contentRect.fitHeight > -1) && (a = !0), this.contentRect.width * this.targetScale < this.contentRect.fitWidth && (a = !1), "mousemove" === this.panMode && (a = !1);
            let r = n && y(i) > y(this.targetScale),
                l = !r && !a && s && y(i) < y(this.targetScale);
            S(e, this.cn("canZoomIn"), r), S(e, this.cn("canZoomOut"), l), S(e, this.cn("isDraggable"), a);
            for (const t of e.querySelectorAll('[data-panzoom-action="zoomIn"]')) n ? (t.removeAttribute("disabled"), t.removeAttribute("tabindex")) : (t.setAttribute("disabled", ""), t.setAttribute("tabindex", "-1"));
            for (const t of e.querySelectorAll('[data-panzoom-action="zoomOut"]')) s ? (t.removeAttribute("disabled"), t.removeAttribute("tabindex")) : (t.setAttribute("disabled", ""), t.setAttribute("tabindex", "-1"));
            for (const i of e.querySelectorAll('[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]')) {
                n = t.targetScale < t.fullScale - .1, n || s ? (i.removeAttribute("disabled"), i.removeAttribute("tabindex")) : (i.setAttribute("disabled", ""), i.setAttribute("tabindex", "-1"));
                const e = i.querySelector("g");
                e && (e.style.display = t.targetScale > .9 * t.fullScale ? "none" : "")
            }
        }
        panTo({
            x: t = this.target.e,
            y: e = this.target.f,
            scale: i = this.targetScale,
            friction: n = this.option("friction"),
            angle: s = 0,
            originX: o = 0,
            originY: a = 0,
            flipX: r = !1,
            flipY: l = !1,
            ignoreBounds: c = !1
        }) {
            this.state !== O.Destroy && this.applyChange({
                panX: t - this.target.e,
                panY: e - this.target.f,
                scale: i / this.targetScale,
                angle: s,
                originX: o,
                originY: a,
                friction: n,
                flipX: r,
                flipY: l,
                ignoreBounds: c
            })
        }
        applyChange({
            panX: t = 0,
            panY: e = 0,
            scale: i = 1,
            angle: n = 0,
            originX: s = -this.current.e,
            originY: o = -this.current.f,
            friction: a = this.option("friction"),
            flipX: r = !1,
            flipY: l = !1,
            ignoreBounds: c = !1,
            bounce: h = this.option("bounce")
        }) {
            const d = this.state;
            if (d === O.Init || d === O.Destroy) return;
            this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, this.isBouncingY = !1;
            for (const t of A) this.velocity[t] = 0;
            this.friction = a || 0, this.ignoreBounds = c;
            const {
                current: u
            } = this, p = u.e, m = u.f, f = this.getMatrix(this.target);
            let g = (new DOMMatrix).translate(p, m).translate(s, o).translate(t, e);
            if (this.option("zoom")) {
                if (!c) {
                    const t = this.targetScale,
                        e = this.minScale,
                        n = this.maxScale;
                    t * i < e && (i = e / t), t * i > n && (i = n / t)
                }
                g = g.scale(i)
            }
            g = g.translate(-s, -o).translate(-p, -m).multiply(f), n && (g = g.rotate(n)), r && (g = g.scale(-1, 1)), l && (g = g.scale(1, -1));
            for (const t of A) "a" != t && "d" != t || !(g[t] > this.minScale + 1e-5 || g[t] < this.minScale - 1e-5) ? this.target[t] = y(g[t], F) : this.target[t] = g[t];
            (this.targetScale < this.scale || Math.abs(i - 1) > .1 || "mousemove" === this.panMode || !1 === h) && !c && this.clampTargetBounds(), this.isResting || (this.state = O.Panning, this.requestTick())
        }
        stop(t = !1) {
            if (this.state !== O.Init && this.state !== O.Destroy) {
                this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, this.isBouncingY = !1;
                for (const e of A) this.velocity[e] = 0, "current" === t ? this.current[e] = this.target[e] : "target" === t && (this.target[e] = this.current[e]);
                this.setTransform(), this.isTicking && (this.emit("endAnimation"), this.updateControls()), R(this.container, "is-scaling"), R(this.container, "is-animating"), this.isTicking = !1, this.isDragging = !1, this.lockedAxis = !1, this.state = O.Ready
            }
        }
        requestTick() {
            this.isTicking || (this.emit("startAnimation"), this.updateControls(), k(this.container, "is-animating"), this.isScaling && k(this.container, "is-scaling")), this.isTicking = !0, this.rAF || (this.rAF = requestAnimationFrame((() => this.animate())))
        }
        panWithMouse(t, e = this.option("mouseMoveFriction")) {
            if (this.prevMouseMoveEvent = t, "mousemove" !== this.panMode || !t) return;
            if (y(this.targetScale) <= y(this.minScale)) return;
            this.emit("mouseMove", t);
            const {
                container: i,
                containerRect: n,
                contentRect: s
            } = this, o = n.width, a = n.height, r = i.getBoundingClientRect(), l = (t.clientX || 0) - r.left, c = (t.clientY || 0) - r.top;
            let {
                contentWidth: h,
                contentHeight: d
            } = this.calculateContentDim(this.target);
            const u = this.option("mouseMoveFactor");
            u > 1 && (h !== o && (h *= u), d !== a && (d *= u));
            let p = .5 * (h - o) - l / o * 100 / 100 * (h - o);
            p += .5 * (s.right - s.left);
            let m = .5 * (d - a) - c / a * 100 / 100 * (d - a);
            m += .5 * (s.bottom - s.top), this.applyChange({
                panX: p - this.target.e,
                panY: m - this.target.f,
                friction: e
            })
        }
        zoomWithWheel(t) {
            if (this.state === O.Destroy || this.state === O.Init) return;
            const e = Math.abs(t.deltaY) < 100 && Math.abs(t.deltaX) < 100 ? 25 : 50,
                i = Math.max(-1, Math.min(1, -t.deltaY || -t.deltaX || -t.detail)),
                n = this.targetScale,
                s = this.maxScale,
                o = this.minScale;
            let a = n * (100 + i * e) / 100;
            a < o && n <= o ? (this.wheelDelta += Math.abs(i), a = o) : a > s && n >= s ? (this.wheelDelta += Math.abs(i), a = s) : (this.wheelDelta = 0, a = Math.max(Math.min(a, s), o)), this.wheelDelta > this.option("wheelLimit") || (t.preventDefault(), a !== n && this.zoomTo(a, {
                event: t
            }))
        }
        canZoomIn() {
            return this.option("zoom") && (this.contentRect.width < this.contentRect.fitWidth || this.targetScale < this.maxScale - 1e-5)
        }
        canZoomOut() {
            return this.option("zoom") && this.targetScale > this.minScale + 1e-5
        }
        zoomIn(t = 1.25, e) {
            this.zoomTo(this.targetScale * t, e)
        }
        zoomOut(t = .8, e) {
            this.zoomTo(this.targetScale * t, e)
        }
        zoomToFit(t) {
            this.zoomTo("fit", t)
        }
        zoomToCover(t) {
            this.zoomTo("cover", t)
        }
        zoomToFull(t) {
            this.zoomTo("full", t)
        }
        zoomToMax(t) {
            this.zoomTo("max", t)
        }
        toggleZoom(t) {
            this.zoomTo(this.targetScale - this.minScale < .5 * (this.fullScale - this.minScale) ? "full" : "fit", t)
        }
        toggleMax(t) {
            this.zoomTo(this.targetScale - this.minScale < .5 * (this.maxScale - this.minScale) ? "max" : "fit", t)
        }
        toggleCover(t) {
            this.zoomTo(this.targetScale - this.minScale < .5 * (this.coverScale - this.minScale) ? "cover" : "fit", t)
        }
        iterateZoom(t) {
            this.zoomTo("next", t)
        }
        zoomTo(t = 1, {
            friction: e = "auto",
            originX: i = 0,
            originY: n = 0,
            event: s
        } = {}) {
            if (this.isContentLoading || this.state === O.Destroy) return;
            this.stop();
            const {
                targetScale: o
            } = this;
            let a = 1;
            if ("mousemove" === this.panMode && (s = this.prevMouseMoveEvent || s), s) {
                const t = this.content.getBoundingClientRect(),
                    e = s.clientX || 0,
                    o = s.clientY || 0;
                i = e - t.left - .5 * t.width, n = o - t.top - .5 * t.height
            }
            const r = this.fullScale,
                l = this.maxScale;
            let c = this.coverScale;
            "number" == typeof t ? a = t / o : ("next" === t && (r - c < .2 && (c = r), t = o < r - 1e-5 ? "full" : o < l - 1e-5 ? "max" : "fit"), a = "full" === t ? r / o || 1 : "cover" === t ? c / o || 1 : "max" === t ? l / o || 1 : 1 / o || 1), e = "auto" === e ? a > 1 ? .15 : .25 : e, this.applyChange({
                scale: a,
                originX: i,
                originY: n,
                friction: e
            }), s && "mousemove" === this.panMode && this.panWithMouse(s, e)
        }
        rotateCCW() {
            this.applyChange({
                angle: -90
            })
        }
        rotateCW() {
            this.applyChange({
                angle: 90
            })
        }
        flipX() {
            this.applyChange({
                flipX: !0
            })
        }
        flipY() {
            this.applyChange({
                flipY: !0
            })
        }
        fitX() {
            this.stop("target");
            const {
                containerRect: t,
                contentRect: e,
                target: i
            } = this;
            this.applyChange({
                panX: .5 * t.width - (e.left + .5 * e.fitWidth) - i.e,
                panY: .5 * t.height - (e.top + .5 * e.fitHeight) - i.f,
                scale: t.width / e.fitWidth / this.targetScale,
                originX: 0,
                originY: 0,
                ignoreBounds: !0
            })
        }
        fitY() {
            this.stop("target");
            const {
                containerRect: t,
                contentRect: e,
                target: i
            } = this;
            this.applyChange({
                panX: .5 * t.width - (e.left + .5 * e.fitWidth) - i.e,
                panY: .5 * t.height - (e.top + .5 * e.fitHeight) - i.f,
                scale: t.height / e.fitHeight / this.targetScale,
                originX: 0,
                originY: 0,
                ignoreBounds: !0
            })
        }
        toggleFS() {
            const {
                container: t
            } = this, e = this.cn("inFullscreen"), i = this.cn("htmlHasFullscreen");
            t.classList.toggle(e);
            const n = t.classList.contains(e);
            n ? (document.documentElement.classList.add(i), document.addEventListener("keydown", this.onKeydown, !0)) : (document.documentElement.classList.remove(i), document.removeEventListener("keydown", this.onKeydown, !0)), this.updateMetrics(), this.emit(n ? "enterFS" : "exitFS")
        }
        getMatrix(t = this.current) {
            const {
                a: e,
                b: i,
                c: n,
                d: s,
                e: o,
                f: a
            } = t;
            return new DOMMatrix([e, i, n, s, o, a])
        }
        reset(t) {
            if (this.state !== O.Init && this.state !== O.Destroy) {
                this.stop("current");
                for (const t of A) this.target[t] = I[t];
                this.target.a = this.minScale, this.target.d = this.minScale, this.isResting || (this.friction = void 0 === t ? this.option("friction") : t, this.state = O.Panning, this.requestTick())
            }
        }
        destroy() {
            this.stop(), this.state = O.Destroy, this.detachEvents(), this.detachObserver();
            const {
                container: t,
                content: e
            } = this, i = this.option("classes") || {};
            for (const e of Object.values(i)) t.classList.remove(e + "");
            e && (e.removeEventListener("load", this.onLoad), e.removeEventListener("error", this.onError)), this.detachPlugins()
        }
    }
    Object.defineProperty(B, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: L
    }), Object.defineProperty(B, "Plugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {}
    });
    const _ = t => new Promise(((e, i) => {
        const n = new Image;
        n.onload = e, n.onerror = i, n.src = t
    }));
    class N extends f {
        onCreateSlide(t, e, i) {
            const n = this.instance,
                s = n.optionFor(i, "src") || "",
                {
                    el: o,
                    type: a
                } = i;
            o && "image" === a && "string" == typeof s && this.setContent(i, s).then((t => {
                if (n.isClosing()) return;
                const e = i.contentEl,
                    s = i.imageEl,
                    o = i.thumbElSrc,
                    a = this.optionFor(i, "initialSize"),
                    r = this.optionFor(i, "zoom"),
                    l = {
                        event: n.prevMouseMoveEvent || n.options.event,
                        friction: r ? .12 : 0
                    };
                if (e && s && o && n.isOpeningSlide(i) && this.getZoomInfo(i)) {
                    let t = document.createElement("img");
                    k(t, "fancybox-ghost"), e.appendChild(t), t.src = o, setTimeout((() => {
                        n.animate(t, "f-fadeFastOut", (() => {
                            t && (t.remove(), t = null)
                        }))
                    }), 333), _(o).then((() => {
                        i.state = d.Opening, this.instance.emit("reveal", i), this.zoomIn(i).then((() => {
                            this.instance.done(i)
                        }), (() => {
                            n.hideLoading(i)
                        }))
                    }), (() => {
                        n.hideLoading(i), n.revealContent(i)
                    }))
                } else {
                    let e = n.optionFor(i, "showClass") || void 0,
                        s = !0;
                    n.isOpeningSlide(i) && ("full" === a ? t.zoomToFull(l) : "cover" === a ? t.zoomToCover(l) : "max" === a ? t.zoomToMax(l) : s = !1, t.stop("current")), s && e && (e = "f-fadeIn"), n.revealContent(i, e)
                }
            }), (() => {
                n.setError(i, "{{IMAGE_ERROR}}")
            }))
        }
        onRemoveSlide(t) {
            t.panzoom && t.panzoom.destroy(), t.panzoom = void 0, t.imageEl = void 0
        }
        onChange(t, e, i, n) {
            for (const t of e.slides) {
                const e = t.panzoom;
                e && t.index !== i && e.reset(0)
            }
        }
        onClose() {
            const t = this.instance,
                e = t.container,
                i = t.getSlide();
            if (!e || !e.parentElement || !i) return;
            const {
                el: n,
                contentEl: s,
                panzoom: o
            } = i, a = i.thumbElSrc;
            if (!n || !a || !s || !o || o.isContentLoading || o.state === O.Init || o.state === O.Destroy) return;
            o.updateMetrics();
            let r = this.getZoomInfo(i);
            if (!r) return;
            this.instance.state = h.CustomClosing, n.classList.remove("is-zooming-in"), n.classList.add("is-zooming-out"), s.style.backgroundImage = `url('${a}')`, _(a).then((() => {
                n.classList.add("hide-image")
            }), (() => {}));
            const l = e.getBoundingClientRect();
            Object.assign(e.style, {
                position: "absolute",
                top: `${window.pageYOffset}px`,
                left: `${window.pageXOffset}px`,
                bottom: "auto",
                right: "auto",
                width: `${l.width}px`,
                height: `${l.height}px`
            });
            const {
                x: c,
                y: d,
                scale: u,
                opacity: p
            } = r;
            if (p) {
                const t = ((t, e, i, n) => {
                    const s = e - t,
                        o = n - i;
                    return e => i + ((e - t) / s * o || 0)
                })(o.scale, u, 1, 0);
                o.on("afterTransform", (() => {
                    s.style.opacity = t(o.scale) + ""
                }))
            }
            o.on("endAnimation", (() => {
                t.destroy()
            })), o.target.a = u, o.target.b = 0, o.target.c = 0, o.target.d = u, o.panTo({
                x: c,
                y: d,
                scale: u,
                friction: p ? .2 : .33,
                ignoreBounds: !0
            }), o.isResting && t.destroy()
        }
        setContent(t, e) {
            return new Promise(((n, s) => {
                var o, a;
                const r = this.instance,
                    l = t.el;
                if (!l) return void s();
                r.showLoading(t);
                const c = document.createElement("img");
                if (c.classList.add("fancybox-image"), c.src = e || "", c.alt = (null === (o = t.caption) || void 0 === o ? void 0 : o.replace(/<[^>]+>/gi, "").substring(0, 1e3)) || `Image ${t.index+1} of ${null===(a=r.carousel)||void 0===a?void 0:a.pages.length}`, t.imageEl = c, r.setContent(t, c, !1), this.option("protected")) {
                    l.addEventListener("contextmenu", (t => {
                        t.preventDefault()
                    }));
                    const e = t.contentEl;
                    if (e) {
                        const t = document.createElement("div");
                        k(t, "fancybox-protected"), e.append(t)
                    }
                }
                t.panzoom = new B(l, i({}, this.option("Panzoom") || {}, {
                    content: c,
                    width: r.optionFor(t, "width", "auto"),
                    height: r.optionFor(t, "height", "auto"),
                    wheel: () => {
                        const t = r.option("wheel");
                        return ("zoom" === t || "pan" == t) && t
                    },
                    click: (e, i) => {
                        var n;
                        if (r.isCompact || r.isClosing()) return !1;
                        let s = !i || i.target && (null === (n = t.contentEl) || void 0 === n ? void 0 : n.contains(i.target));
                        return r.option(s ? "contentClick" : "backdropClick") || !1
                    },
                    dblClick: () => r.isCompact ? "toggleZoom" : r.option("contentDblClick") || !1,
                    spinner: !1,
                    panOnlyZoomed: !0,
                    wheelLimit: 1 / 0,
                    transformParent: !0,
                    on: {
                        ready: t => {
                            n(t)
                        },
                        error: () => {
                            s()
                        },
                        destroy: () => {
                            s()
                        }
                    }
                }))
            }))
        }
        zoomIn(t) {
            return new Promise(((e, i) => {
                const {
                    panzoom: n,
                    contentEl: s,
                    el: o
                } = t, a = this.getZoomInfo(t);
                if (!(a && o && s && n)) return void i();
                const {
                    x: r,
                    y: l,
                    scale: c,
                    opacity: h
                } = a, u = () => {
                    t.state !== d.Closing && (h && (s.style.opacity = Math.max(Math.min(1, 1 - (1 - n.scale) / (1 - c)), 0) + ""), n.scale >= 1 && n.scale > n.targetScale - .1 && e(n))
                }, p = t => {
                    t.scale < .99 || t.scale > 1.01 || (o.classList.remove("is-zooming-in"), t.off("endAnimation", p), t.off("touchStart", p), t.off("afterTransform", u), e(t))
                };
                n.on("endAnimation", p), n.on("touchStart", p), n.on("afterTransform", u), n.on(["error", "destroy"], (() => {
                    i()
                })), n.panTo({
                    x: r,
                    y: l,
                    scale: c,
                    friction: 0,
                    ignoreBounds: !0
                }), n.stop("current");
                const m = this.instance,
                    f = {
                        event: "mousemove" === n.panMode ? m.prevMouseMoveEvent || m.options.event : void 0
                    },
                    g = this.optionFor(t, "initialSize");
                k(o, "is-zooming-in"), m.hideLoading(t), "full" === g ? n.zoomToFull(f) : "cover" === g ? n.zoomToCover(f) : "max" === g ? n.zoomToMax(f) : n.reset(.165)
            }))
        }
        getZoomInfo(t) {
            const {
                el: e,
                imageEl: i,
                thumbEl: n,
                panzoom: s
            } = t;
            if (!e || !i || !n || !s || (t => {
                    const e = window.pageYOffset,
                        i = window.pageYOffset + window.innerHeight;
                    if (!z(t)) return 0;
                    const n = t.getBoundingClientRect(),
                        s = n.y + window.pageYOffset,
                        o = n.y + n.height + window.pageYOffset;
                    if (e > o || i < s) return 0;
                    if (e < s && i > o) return 100;
                    if (s < e && o > i) return 100;
                    let a = n.height;
                    s < e && (a -= window.pageYOffset - s), o > i && (a -= o - i);
                    const r = a / window.innerHeight * 100;
                    return Math.round(r)
                })(n) < 5 || !this.optionFor(t, "zoom") || this.instance.state === h.Destroy) return !1;
            const {
                top: o,
                left: a,
                width: r,
                height: l
            } = n.getBoundingClientRect();
            let {
                top: c,
                left: d,
                fitWidth: u,
                fitHeight: p
            } = s.contentRect;
            if (!(r && l && u && p)) return !1;
            const m = r / u,
                f = s.container.getBoundingClientRect();
            c += f.top, d += f.left;
            const g = -1 * (d + .5 * u - (a + .5 * r)),
                b = -1 * (c + .5 * p - (o + .5 * l));
            let v = this.option("zoomOpacity") || !1;
            return "auto" === v && (v = Math.abs(r / l - u / p) > .1), {
                x: g,
                y: b,
                scale: m,
                opacity: v
            }
        }
        attach() {
            this.instance.on("Carousel.change", this.onChange), this.instance.on("Carousel.createSlide", this.onCreateSlide), this.instance.on("Carousel.removeSlide", this.onRemoveSlide), this.instance.on("close", this.onClose)
        }
        detach() {
            this.instance.off("Carousel.change", this.onChange), this.instance.off("Carousel.createSlide", this.onCreateSlide), this.instance.off("Carousel.removeSlide", this.onRemoveSlide), this.instance.off("close", this.onClose)
        }
    }
    Object.defineProperty(N, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            initialSize: "fit",
            Panzoom: {
                maxScale: 1
            },
            protected: !1,
            zoom: !0,
            zoomOpacity: "auto"
        }
    });
    const W = (t, e = {}) => {
            const i = new URL(t),
                n = new URLSearchParams(i.search),
                s = new URLSearchParams;
            for (const [t, i] of [...n, ...Object.entries(e)]) {
                let e = i.toString();
                "t" === t ? s.set("start", parseInt(e).toString()) : s.set(t, e)
            }
            let o = s.toString(),
                a = t.match(/#t=((.*)?\d+s)/);
            return a && (o += `#t=${a[1]}`), o
        },
        $ = {
            ajax: null,
            autoSize: !0,
            preload: !0,
            videoAutoplay: !0,
            videoRatio: 16 / 9,
            videoTpl: '<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">\n  <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos.</video>',
            videoFormat: "",
            vimeo: {
                byline: 1,
                color: "00adef",
                controls: 1,
                dnt: 1,
                muted: 0
            },
            youtube: {
                controls: 1,
                enablejsapi: 1,
                rel: 0,
                fs: 1
            }
        },
        X = ["image", "html", "ajax", "inline", "clone", "iframe", "map", "pdf", "html5video", "youtube", "vimeo", "video"];
    class Y extends f {
        onInitSlide(t, e, i) {
            this.processType(i)
        }
        onCreateSlide(t, e, i) {
            this.setContent(i)
        }
        onRemoveSlide(t, e, i) {
            i.closeBtnEl && (i.closeBtnEl.remove(), i.closeBtnEl = void 0), i.xhr && (i.xhr.abort(), i.xhr = null), i.iframeEl && (i.iframeEl.onload = i.iframeEl.onerror = null, i.iframeEl.src = "//about:blank", i.iframeEl = null);
            const n = i.contentEl,
                s = i.placeholderEl;
            if ("inline" === i.type && n && s) n.classList.remove("fancybox__content"), "none" !== n.style.display && (n.style.display = "none"), s.parentNode && s.parentNode.insertBefore(n, s), s.remove(), i.placeholderEl = null;
            else
                for (; i.el && i.el.firstChild;) i.el.removeChild(i.el.firstChild)
        }
        onSelectSlide(t, e, i) {
            i.state === d.Ready && this.playVideo()
        }
        onUnselectSlide(t, e, i) {
            var n, s;
            if ("html5video" === i.type) {
                try {
                    null === (s = null === (n = i.el) || void 0 === n ? void 0 : n.querySelector("video")) || void 0 === s || s.pause()
                } catch (t) {}
                return
            }
            let o;
            "vimeo" === i.type ? o = {
                method: "pause",
                value: "true"
            } : "youtube" === i.type && (o = {
                event: "command",
                func: "pauseVideo"
            }), o && i.iframeEl && i.iframeEl.contentWindow && i.iframeEl.contentWindow.postMessage(JSON.stringify(o), "*"), i.poller && clearTimeout(i.poller)
        }
        onDone(t, e) {
            t.isCurrentSlide(e) && !t.isClosing() && this.playVideo()
        }
        onRefresh(t, e) {
            e.slides.forEach((t => {
                t.el && (this.setAspectRatio(t), this.resizeIframe(t))
            }))
        }
        onMessage(t) {
            try {
                let e = JSON.parse(t.data);
                if ("https://player.vimeo.com" === t.origin) {
                    if ("ready" === e.event)
                        for (let e of Array.from(document.getElementsByClassName("fancybox__iframe"))) e instanceof HTMLIFrameElement && e.contentWindow === t.source && (e.dataset.ready = "true")
                } else if ("https://www.youtube-nocookie.com" === t.origin && "onReady" === e.event) {
                    const t = document.getElementById(e.id);
                    t && (t.dataset.ready = "true")
                }
            } catch (t) {}
        }
        loadAjaxContent(t) {
            const e = this.instance.optionFor(t, "src") || "";
            this.instance.showLoading(t);
            const i = this.instance,
                n = new XMLHttpRequest;
            i.showLoading(t), n.onreadystatechange = function() {
                n.readyState === XMLHttpRequest.DONE && i.state === h.Ready && (i.hideLoading(t), 200 === n.status ? i.setContent(t, n.responseText) : i.setError(t, 404 === n.status ? "{{AJAX_NOT_FOUND}}" : "{{AJAX_FORBIDDEN}}"))
            };
            const s = t.ajax || null;
            n.open(s ? "POST" : "GET", e + ""), n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), n.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n.send(s), t.xhr = n
        }
        setInlineContent(t) {
            let e = null;
            if (z(t.src)) e = t.src;
            else if ("string" == typeof t.src) {
                const i = t.src.split("#", 2).pop();
                e = i ? document.getElementById(i) : null
            }
            if (e) {
                if ("clone" === t.type || e.dataset.placeholderId) {
                    e = e.cloneNode(!0);
                    const i = e.dataset.animationName;
                    i && (e.classList.remove(i), delete e.dataset.animationName), delete e.dataset.placeholderId;
                    let n = e.getAttribute("id");
                    n = n ? `${n}--clone` : `clone-${this.instance.id}-${t.index}`, e.setAttribute("id", n)
                } else if (e.parentNode) {
                    const i = document.createElement("div");
                    i.classList.add("fancybox-placeholder"), e.parentNode.insertBefore(i, e), t.placeholderEl = i
                }
                this.instance.setContent(t, e)
            } else this.instance.setError(t, "{{ELEMENT_NOT_FOUND}}")
        }
        setIframeContent(t) {
            const {
                src: e,
                el: i
            } = t;
            if (!e || "string" != typeof e || !i) return;
            const n = this.instance,
                s = document.createElement("iframe");
            s.className = "fancybox__iframe", s.setAttribute("id", `fancybox__iframe_${n.id}_${t.index}`), s.setAttribute("allow", "autoplay; fullscreen"), s.setAttribute("scrolling", "auto"), s.onerror = () => {
                n.setError(t, "{{IFRAME_ERROR}}")
            }, t.iframeEl = s;
            const o = this.optionFor(t, "preload");
            if (i.classList.add("is-loading"), "iframe" !== t.type || !1 === o) return s.setAttribute("src", t.src + ""), this.resizeIframe(t), void n.setContent(t, s);
            n.showLoading(t), s.onload = () => {
                if (!s.src.length) return;
                const e = "true" !== s.dataset.ready;
                s.dataset.ready = "true", this.resizeIframe(t), e ? n.revealContent(t) : n.hideLoading(t)
            }, s.setAttribute("src", e), n.setContent(t, s, !1)
        }
        resizeIframe(t) {
            const e = t.iframeEl,
                i = null == e ? void 0 : e.parentElement;
            if (!e || !i) return;
            let n = t.autoSize,
                s = t.width || 0,
                o = t.height || 0;
            s && o && (n = !1);
            const a = i && i.style;
            if (!1 !== t.preload && !1 !== n && a) try {
                const t = window.getComputedStyle(i),
                    n = parseFloat(t.paddingLeft) + parseFloat(t.paddingRight),
                    r = parseFloat(t.paddingTop) + parseFloat(t.paddingBottom),
                    l = e.contentWindow;
                if (l) {
                    const t = l.document,
                        e = t.getElementsByTagName("html")[0],
                        i = t.body;
                    a.width = "", i.style.overflow = "hidden", s = s || e.scrollWidth + n, a.width = `${s}px`, i.style.overflow = "", a.flex = "0 0 auto", a.height = `${i.scrollHeight}px`, o = e.scrollHeight + r
                }
            } catch (t) {}
            if (s || o) {
                const t = {
                    flex: "0 1 auto",
                    width: "",
                    height: ""
                };
                s && (t.width = `${s}px`), o && (t.height = `${o}px`), Object.assign(a, t)
            }
        }
        playVideo() {
            const t = this.instance.getSlide();
            if (!t) return;
            const {
                el: e
            } = t;
            if (!e || !e.offsetParent) return;
            if (!this.optionFor(t, "videoAutoplay")) return;
            if ("html5video" === t.type) try {
                const t = e.querySelector("video");
                if (t) {
                    const e = t.play();
                    void 0 !== e && e.then((() => {})).catch((e => {
                        t.muted = !0, t.play()
                    }))
                }
            } catch (t) {}
            if ("youtube" !== t.type && "vimeo" !== t.type) return;
            const i = () => {
                if (t.iframeEl && t.iframeEl.contentWindow) {
                    let e;
                    if ("true" === t.iframeEl.dataset.ready) return e = "youtube" === t.type ? {
                        event: "command",
                        func: "playVideo"
                    } : {
                        method: "play",
                        value: "true"
                    }, e && t.iframeEl.contentWindow.postMessage(JSON.stringify(e), "*"), void(t.poller = void 0);
                    "youtube" === t.type && (e = {
                        event: "listening",
                        id: t.iframeEl.getAttribute("id")
                    }, t.iframeEl.contentWindow.postMessage(JSON.stringify(e), "*"))
                }
                t.poller = setTimeout(i, 250)
            };
            i()
        }
        processType(t) {
            if (t.html) return t.type = "html", t.src = t.html, void(t.html = "");
            const e = this.instance.optionFor(t, "src", "");
            if (!e || "string" != typeof e) return;
            let i = t.type,
                n = null;
            if (n = e.match(/(?:youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i)) {
                const s = W(e, this.optionFor(t, "youtube")),
                    o = encodeURIComponent(n[1]);
                t.videoId = o, t.src = `https://www.youtube-nocookie.com/embed/${o}?${s}`, t.thumbSrc = t.thumbSrc || `https://i.ytimg.com/vi/${o}/mqdefault.jpg`, i = "youtube"
            } else if (n = e.match(/^.+vimeo.com\/(?:\/)?([\d]+)(.*)?/)) {
                const s = W(e, this.optionFor(t, "vimeo")),
                    o = encodeURIComponent(n[1]);
                t.videoId = o, t.src = `https://player.vimeo.com/video/${o}?${s}`, i = "vimeo"
            }
            if (!i && t.triggerEl) {
                const e = t.triggerEl.dataset.type;
                X.includes(e) && (i = e)
            }
            i || "string" == typeof e && ("#" === e.charAt(0) ? i = "inline" : (n = e.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (i = "html5video", t.videoFormat = t.videoFormat || "video/" + ("ogv" === n[1] ? "ogg" : n[1])) : e.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? i = "image" : e.match(/\.(pdf)((\?|#).*)?$/i) ? i = "pdf" : (n = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i)) ? (t.src = `https://maps.google.${n[1]}/?ll=${(n[2]?n[2]+"&z="+Math.floor(parseFloat(n[3]))+(n[4]?n[4].replace(/^\//,"&"):""):n[4]+"").replace(/\?/,"&")}&output=${n[4]&&n[4].indexOf("layer=c")>0?"svembed":"embed"}`, i = "map") : (n = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i)) && (t.src = `https://maps.google.${n[1]}/maps?q=${n[2].replace("query=","q=").replace("api=1","")}&output=embed`, i = "map")), t.type = i || this.instance.option("defaultType")
        }
        setContent(t) {
            const e = this.instance.optionFor(t, "src") || "";
            if (t && t.type && e) {
                switch (t.type) {
                    case "html":
                        this.instance.setContent(t, e);
                        break;
                    case "html5video":
                        const i = this.option("videoTpl");
                        i && this.instance.setContent(t, i.replace(/\{\{src\}\}/gi, e + "").replace(/\{\{format\}\}/gi, this.optionFor(t, "videoFormat") || "").replace(/\{\{poster\}\}/gi, t.poster || t.thumbSrc || ""));
                        break;
                    case "inline":
                    case "clone":
                        this.setInlineContent(t);
                        break;
                    case "ajax":
                        this.loadAjaxContent(t);
                        break;
                    case "pdf":
                    case "map":
                    case "youtube":
                    case "vimeo":
                        t.preload = !1;
                    case "iframe":
                        this.setIframeContent(t)
                }
                this.setAspectRatio(t)
            }
        }
        setAspectRatio(t) {
            var e;
            const i = t.contentEl,
                n = this.optionFor(t, "videoRatio"),
                s = null === (e = t.el) || void 0 === e ? void 0 : e.getBoundingClientRect();
            if (!(i && s && n && 1 !== n && t.type && ["video", "youtube", "vimeo", "html5video"].includes(t.type))) return;
            const o = s.width,
                a = s.height;
            i.style.aspectRatio = n + "", i.style.width = o / a > n ? "auto" : "", i.style.height = o / a > n ? "" : "auto"
        }
        attach() {
            this.instance.on("Carousel.initSlide", this.onInitSlide), this.instance.on("Carousel.createSlide", this.onCreateSlide), this.instance.on("Carousel.removeSlide", this.onRemoveSlide), this.instance.on("Carousel.selectSlide", this.onSelectSlide), this.instance.on("Carousel.unselectSlide", this.onUnselectSlide), this.instance.on("Carousel.Panzoom.refresh", this.onRefresh), this.instance.on("done", this.onDone), window.addEventListener("message", this.onMessage)
        }
        detach() {
            this.instance.off("Carousel.initSlide", this.onInitSlide), this.instance.off("Carousel.createSlide", this.onCreateSlide), this.instance.off("Carousel.removeSlide", this.onRemoveSlide), this.instance.off("Carousel.selectSlide", this.onSelectSlide), this.instance.off("Carousel.unselectSlide", this.onUnselectSlide), this.instance.off("Carousel.Panzoom.refresh", this.onRefresh), this.instance.off("done", this.onDone), window.removeEventListener("message", this.onMessage)
        }
    }
    Object.defineProperty(Y, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: $
    });
    class q extends f {
        constructor() {
            super(...arguments), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: "ready"
            }), Object.defineProperty(this, "inHover", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "timer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "progressBar", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            })
        }
        get isActive() {
            return "ready" !== this.state
        }
        onReady(t) {
            this.option("autoStart") && (t.isInfinite || t.page < t.pages.length - 1) && this.start()
        }
        onChange() {
            var t;
            (null === (t = this.instance.panzoom) || void 0 === t ? void 0 : t.isResting) || (this.removeProgressBar(), this.pause())
        }
        onSettle() {
            this.resume()
        }
        onVisibilityChange() {
            "visible" === document.visibilityState ? this.resume() : this.pause()
        }
        onMouseEnter() {
            this.inHover = !0, this.pause()
        }
        onMouseLeave() {
            var t;
            this.inHover = !1, (null === (t = this.instance.panzoom) || void 0 === t ? void 0 : t.isResting) && this.resume()
        }
        onTimerEnd() {
            "play" === this.state && (this.instance.isInfinite || this.instance.page !== this.instance.pages.length - 1 ? this.instance.slideNext() : this.instance.slideTo(0))
        }
        removeProgressBar() {
            this.progressBar && (this.progressBar.remove(), this.progressBar = null)
        }
        createProgressBar() {
            var t;
            if (!this.option("showProgress")) return null;
            this.removeProgressBar();
            const e = this.instance,
                i = (null === (t = e.pages[e.page]) || void 0 === t ? void 0 : t.slides) || [];
            let n = this.option("progressParentEl");
            if (n || (n = (1 === i.length ? i[0].el : null) || e.viewport), !n) return null;
            const s = document.createElement("div");
            return k(s, "f-progress"), n.prepend(s), this.progressBar = s, s.offsetHeight, s
        }
        set() {
            if (this.instance.pages.length < 2) return;
            if (this.progressBar) return;
            this.state = "play", k(this.instance.container, "has-autoplay");
            let t = this.createProgressBar();
            if (t) {
                const e = this.option("timeout");
                this.timer = setTimeout((() => {
                    this.timer = null, this.inHover || this.onTimerEnd()
                }), e), t.style.transitionDuration = `${e}ms`, t.style.transform = "scaleX(1)"
            }
            this.emit("set")
        }
        clear() {
            this.timer && (clearTimeout(this.timer), this.timer = null), this.removeProgressBar()
        }
        start() {
            if (this.set(), this.option("pauseOnHover")) {
                const t = this.instance.container;
                t.addEventListener("mouseenter", this.onMouseEnter, !1), t.addEventListener("mouseleave", this.onMouseLeave, !1)
            }
            document.addEventListener("visibilitychange", this.onVisibilityChange, !1)
        }
        stop() {
            const t = this.instance.container;
            this.clear(), this.state = "ready", t.removeEventListener("mouseenter", this.onMouseEnter, !1), t.removeEventListener("mouseleave", this.onMouseLeave, !1), document.removeEventListener("visibilitychange", this.onVisibilityChange, !1), R(t, "has-autoplay"), this.emit("stop")
        }
        pause() {
            "play" === this.state && (this.state = "pause", this.clear(), this.emit("pause"))
        }
        resume() {
            const t = this.instance;
            if (t.isInfinite || t.page !== t.pages.length - 1)
                if ("play" !== this.state) {
                    if ("pause" === this.state && !this.inHover) {
                        const t = new Event("resume", {
                            bubbles: !0,
                            cancelable: !0
                        });
                        this.emit("resume", event), t.defaultPrevented || this.set()
                    }
                } else this.set();
            else this.stop()
        }
        toggle() {
            "play" === this.state || "pause" === this.state ? this.stop() : this.set()
        }
        attach() {
            this.instance.on("ready", this.onReady), this.instance.on("Panzoom.startAnimation", this.onChange), this.instance.on("Panzoom.endAnimation", this.onSettle), this.instance.on("Panzoom.touchMove", this.onChange)
        }
        detach() {
            this.instance.off("ready", this.onReady), this.instance.off("Panzoom.startAnimation", this.onChange), this.instance.off("Panzoom.endAnimation", this.onSettle), this.instance.off("Panzoom.touchMove", this.onChange), this.stop()
        }
    }
    Object.defineProperty(q, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            autoStart: !0,
            pauseOnHover: !0,
            progressParentEl: null,
            showProgress: !0,
            timeout: 3e3
        }
    });
    class Z extends f {
        constructor() {
            super(...arguments), Object.defineProperty(this, "ref", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            })
        }
        onPrepare(t) {
            const e = t.carousel;
            if (!e) return;
            const n = t.container;
            n && (e.options.Autoplay = i(this.option("Autoplay") || {}, {
                pauseOnHover: !1,
                autoStart: !1,
                timeout: this.option("timeout"),
                progressParentEl: () => n.querySelector(".fancybox__toolbar [data-fancybox-toggle-slideshow]") || n,
                on: {
                    set: e => {
                        var i;
                        n.classList.add("has-slideshow"), (null === (i = t.getSlide()) || void 0 === i ? void 0 : i.state) !== d.Ready && e.pause()
                    },
                    stop: () => {
                        n.classList.remove("has-slideshow"), t.isCompact || t.endIdle()
                    },
                    resume: (e, i) => {
                        var n, s, o;
                        !i || !i.cancelable || (null === (n = t.getSlide()) || void 0 === n ? void 0 : n.state) === d.Ready && (null === (o = null === (s = t.carousel) || void 0 === s ? void 0 : s.panzoom) || void 0 === o ? void 0 : o.isResting) || i.preventDefault()
                    }
                }
            }), e.attachPlugins({
                Autoplay: q
            }), this.ref = e.plugins.Autoplay)
        }
        onReady(t) {
            const e = t.carousel,
                i = this.ref;
            e && i && this.option("playOnStart") && (e.isInfinite || e.page < e.pages.length - 1) && i.start()
        }
        onDone(t, e) {
            const i = this.ref;
            if (!i) return;
            const n = e.panzoom;
            n && n.on("startAnimation", (() => {
                t.isCurrentSlide(e) && i.stop()
            })), t.isCurrentSlide(e) && i.resume()
        }
        onKeydown(t, e) {
            var i;
            const n = this.ref;
            n && e === this.option("key") && "BUTTON" !== (null === (i = document.activeElement) || void 0 === i ? void 0 : i.nodeName) && n.toggle()
        }
        attach() {
            this.instance.on("Carousel.init", this.onPrepare), this.instance.on("Carousel.ready", this.onReady), this.instance.on("done", this.onDone), this.instance.on("keydown", this.onKeydown)
        }
        detach() {
            this.instance.off("Carousel.init", this.onPrepare), this.instance.off("Carousel.ready", this.onReady), this.instance.off("done", this.onDone), this.instance.off("keydown", this.onKeydown)
        }
    }
    Object.defineProperty(Z, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            key: " ",
            playOnStart: !1,
            timeout: 3e3
        }
    });
    const V = {
        classes: {
            container: "f-thumbs f-carousel__thumbs",
            viewport: "f-thumbs__viewport",
            track: "f-thumbs__track",
            slide: "f-thumbs__slide",
            isResting: "is-resting",
            isSelected: "is-selected",
            isLoading: "is-loading",
            hasThumbs: "has-thumbs"
        },
        minCount: 2,
        parentEl: null,
        thumbTpl: '<button class="f-thumbs__slide__button" tabindex="0" type="button" aria-label="{{GOTO}}" data-carousel-page="%i"><img class="f-thumbs__slide__img" data-lazy-src="{{%s}}" alt="" /></button>',
        type: "modern"
    };
    var G;
    ! function(t) {
        t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Hidden = 2] = "Hidden", t[t.Disabled = 3] = "Disabled"
    }(G || (G = {}));
    let U = class extends f {
        constructor() {
            super(...arguments), Object.defineProperty(this, "type", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: "modern"
            }), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "track", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "carousel", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "panzoom", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "thumbWidth", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "thumbClipWidth", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "thumbHeight", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "thumbGap", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "thumbExtraGap", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "shouldCenter", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !0
            }), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: G.Init
            })
        }
        formatThumb(t, e) {
            return this.instance.localize(e, [
                ["%i", t.index],
                ["%d", t.index + 1],
                ["%s", t.thumbSrc || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"]
            ])
        }
        getSlides() {
            const t = [],
                e = this.option("thumbTpl") || "";
            if (e)
                for (const i of this.instance.slides || []) {
                    let n = "";
                    i.type && (n = `for-${i.type}`, i.type && ["video", "youtube", "vimeo", "html5video"].includes(i.type) && (n += " for-video")), t.push({
                        html: this.formatThumb(i, e),
                        customClass: n
                    })
                }
            return t
        }
        getProgress(t) {
            const e = this.instance,
                i = e.panzoom,
                n = e.pages[t] || 0;
            if (!n || !i) return 0;
            let s = -1 * i.current.e,
                o = e.contentDim,
                a = (s - n.pos) / (1 * n.dim),
                r = (s + o - n.pos) / (1 * n.dim),
                l = (s - o - n.pos) / (1 * n.dim);
            return a = Math.max(0, Math.min(1, Math.abs(a))), r = Math.max(0, Math.min(1, Math.abs(r))), l = Math.max(0, Math.min(1, Math.abs(l))), a = Math.min(a, r, l), a
        }
        onInitSlide(t, e) {
            const i = e.el;
            i && (e.thumbSrc = i.dataset.thumbSrc || e.thumbSrc || "", e.thumbClipWidth = parseFloat(i.dataset.thumbClipWidth || "") || e.thumbClipWidth || 0, e.thumbHeight = parseFloat(i.dataset.thumbHeight || "") || e.thumbHeight || 0)
        }
        onInitSlides() {
            this.state === G.Init && this.build()
        }
        onRefreshM() {
            this.refreshModern()
        }
        onChangeM() {
            "modern" === this.type && (this.shouldCenter = !0, this.centerModern())
        }
        onClickModern(t) {
            t.preventDefault(), t.stopPropagation();
            const e = this.instance,
                i = e.page,
                n = t => {
                    if (t) {
                        const e = t.closest("[data-carousel-page]");
                        if (e) return parseInt(e.dataset.carouselPage || "", 10) || 0
                    }
                    return -1
                },
                s = (t, e) => {
                    const i = document.elementFromPoint(t, e);
                    return i ? n(i) : -1
                };
            let o = n(t.target);
            o < 0 && (o = s(t.clientX + this.thumbGap, t.clientY), o === i && (o = i - 1)), o < 0 && (o = s(t.clientX - this.thumbGap, t.clientY), o === i && (o = i + 1)), o < 0 && (o = (e => {
                let n = s(t.clientX - e, t.clientY),
                    a = s(t.clientX + e, t.clientY);
                return o < 0 && n === i && (o = i + 1), o < 0 && a === i && (o = i - 1), o
            })(this.thumbExtraGap)), o === i ? this.centerModern() : o > -1 && o < e.pages.length && e.slideTo(o)
        }
        onTransformM() {
            if ("modern" !== this.type) return;
            const {
                instance: t,
                container: e,
                track: i
            } = this, n = t.panzoom;
            if (!(e && i && n && this.panzoom)) return;
            S(e, this.cn("isResting"), n.state !== O.Init && n.isResting);
            let s = 0,
                o = 0,
                a = 0;
            for (const e of t.slides) {
                let t = e.index,
                    i = e.thumbSlideEl;
                if (!i) continue;
                o = 0, S(i, this.cn("isSelected"), t === this.instance.page), o = 1 - this.getProgress(t), i.style.setProperty("--progress", o ? o + "" : "");
                const n = .5 * ((e.thumbWidth || 0) - this.thumbClipWidth);
                s += n, o && (s -= o * (n + this.thumbExtraGap)), i.style.setProperty("--shift", s + ""), s += n, o && (s -= o * (n + this.thumbExtraGap)), s -= this.thumbGap, 0 === t && (a = this.thumbExtraGap * o)
            }
            i && (i.style.setProperty("--left", a + ""), i.style.setProperty("--width", s + a + this.thumbGap + this.thumbExtraGap * o + "")), this.shouldCenter && this.centerModern()
        }
        buildClassic() {
            const {
                container: t,
                track: e
            } = this, n = this.getSlides();
            if (!t || !e || !n) return;
            const s = new this.instance.constructor(t, i({
                track: e,
                infinite: !1,
                center: !0,
                fill: !0,
                dragFree: !0,
                slidesPerPage: 1,
                transition: !1,
                Dots: !1,
                Navigation: !1,
                Sync: {},
                classes: {
                    container: "f-thumbs",
                    viewport: "f-thumbs__viewport",
                    track: "f-thumbs__track",
                    slide: "f-thumbs__slide"
                }
            }, this.option("Carousel") || {}, {
                Sync: {
                    target: this.instance
                },
                slides: n
            }));
            this.carousel = s, this.track = e, s.on("ready", (() => {
                this.emit("ready")
            }))
        }
        buildModern() {
            if ("modern" !== this.type) return;
            const {
                container: t,
                track: e,
                instance: i
            } = this, s = this.option("thumbTpl") || "";
            if (!t || !e || !s) return;
            k(t, "is-horizontal"), this.updateModern();
            for (const t of i.slides || []) {
                const i = document.createElement("div");
                if (k(i, this.cn("slide")), t.type) {
                    let e = `for-${t.type}`;
                    ["video", "youtube", "vimeo", "html5video"].includes(t.type) && (e += " for-video"), k(i, e)
                }
                i.appendChild(n(this.formatThumb(t, s))), t.thumbSlideEl = i, e.appendChild(i), this.resizeModernSlide(t)
            }
            const o = new i.constructor.Panzoom(t, {
                content: e,
                lockAxis: "x",
                zoom: !1,
                panOnlyZoomed: !1,
                bounds: () => {
                    let t = 0,
                        e = 0,
                        n = i.slides[0],
                        s = i.slides[i.slides.length - 1],
                        o = i.slides[i.page];
                    return n && s && o && (e = -1 * this.getModernThumbPos(0), 0 !== i.page && (e += .5 * (n.thumbWidth || 0)), t = -1 * this.getModernThumbPos(i.slides.length - 1), i.page !== i.slides.length - 1 && (t += (s.thumbWidth || 0) - (o.thumbWidth || 0) - .5 * (s.thumbWidth || 0))), {
                        x: {
                            min: t,
                            max: e
                        },
                        y: {
                            min: 0,
                            max: 0
                        }
                    }
                }
            });
            o.on("touchStart", (() => {
                this.shouldCenter = !1
            })), o.on("click", ((t, e) => this.onClickModern(e))), o.on("ready", (() => {
                this.centerModern(), this.emit("ready")
            })), o.on(["afterTransform", "refresh"], (t => {
                this.lazyLoadModern()
            })), this.panzoom = o, this.refreshModern()
        }
        updateModern() {
            if ("modern" !== this.type) return;
            const {
                container: t
            } = this;
            t && (this.thumbGap = parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-gap")) || 0, this.thumbExtraGap = parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-extra-gap")) || 0, this.thumbWidth = parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-width")) || 40, this.thumbClipWidth = parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-clip-width")) || 40, this.thumbHeight = parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-height")) || 40)
        }
        refreshModern() {
            var t;
            if ("modern" === this.type) {
                this.updateModern();
                for (const t of this.instance.slides || []) this.resizeModernSlide(t);
                this.onTransformM(), null === (t = this.panzoom) || void 0 === t || t.updateMetrics(!0), this.centerModern(0)
            }
        }
        centerModern(t) {
            const e = this.instance,
                {
                    container: i,
                    panzoom: n
                } = this;
            if (!i || !n || n.state === O.Init) return;
            const s = e.page;
            let o = this.getModernThumbPos(s),
                a = o;
            for (let t = e.page - 3; t < e.page + 3; t++) {
                if (t < 0 || t > e.pages.length - 1 || t === e.page) continue;
                const i = 1 - this.getProgress(t);
                i > 0 && i < 1 && (a += i * (this.getModernThumbPos(t) - o))
            }
            let r = 100;
            void 0 === t && (t = .2, e.inTransition.size > 0 && (t = .12), Math.abs(-1 * n.current.e - a) > n.containerRect.width && (t = .5, r = 0)), n.options.maxVelocity = r, n.applyChange({
                panX: y(-1 * a - n.target.e, 1e3),
                friction: null === e.prevPage ? 0 : t
            })
        }
        lazyLoadModern() {
            const {
                instance: t,
                panzoom: e
            } = this;
            if (!e) return;
            const i = -1 * e.current.e || 0;
            let s = this.getModernThumbPos(t.page);
            if (e.state !== O.Init || 0 === s)
                for (const s of t.slides || []) {
                    const t = s.thumbSlideEl;
                    if (!t) continue;
                    const o = t.querySelector("img[data-lazy-src]"),
                        a = s.index,
                        l = this.getModernThumbPos(a),
                        c = i - .5 * e.containerRect.innerWidth,
                        h = c + e.containerRect.innerWidth;
                    if (!o || l < c || l > h) continue;
                    let d = o.dataset.lazySrc;
                    if (!d || !d.length) continue;
                    if (delete o.dataset.lazySrc, o.src = d, o.complete) continue;
                    k(t, this.cn("isLoading"));
                    const u = n(r);
                    t.appendChild(u), o.addEventListener("load", (() => {
                        t.offsetParent && (t.classList.remove(this.cn("isLoading")), u.remove())
                    }), !1)
                }
        }
        resizeModernSlide(t) {
            if ("modern" !== this.type) return;
            if (!t.thumbSlideEl) return;
            const e = t.thumbClipWidth && t.thumbHeight ? Math.round(this.thumbHeight * (t.thumbClipWidth / t.thumbHeight)) : this.thumbWidth;
            t.thumbWidth = e
        }
        getModernThumbPos(t) {
            const e = this.instance.slides[t],
                i = this.panzoom;
            if (!i || !i.contentRect.fitWidth) return 0;
            let n = i.containerRect.innerWidth,
                s = i.contentRect.width;
            2 === this.instance.slides.length && (t -= 1, s = 2 * this.thumbClipWidth);
            let o = t * (this.thumbClipWidth + this.thumbGap) + this.thumbExtraGap + .5 * (e.thumbWidth || 0);
            return o -= s > n ? .5 * n : .5 * s, y(o || 0, 1)
        }
        build() {
            const t = this.instance,
                e = t.container,
                i = this.option("minCount") || 0;
            if (i) {
                let e = 0;
                for (const i of t.slides || []) i.thumbSrc && e++;
                if (e < i) return this.cleanup(), void(this.state = G.Disabled)
            }
            const n = this.option("type");
            if (["modern", "classic"].indexOf(n) < 0) return void(this.state = G.Disabled);
            this.type = n;
            const s = document.createElement("div");
            k(s, this.cn("container")), k(s, `is-${n}`);
            const o = this.option("parentEl");
            o ? o.appendChild(s) : e.after(s), this.container = s, k(e, this.cn("hasThumbs"));
            const a = document.createElement("div");
            k(a, this.cn("track")), s.appendChild(a), this.track = a, "classic" === n ? this.buildClassic() : this.buildModern(), this.state = G.Ready
        }
        cleanup() {
            this.carousel && this.carousel.destroy(), this.carousel = null, this.panzoom && this.panzoom.destroy(), this.panzoom = null, this.container && this.container.remove(), this.container = null, this.track = null, this.state = G.Init, R(this.instance.container, this.cn("hasThumbs"))
        }
        attach() {
            this.instance.on("initSlide", this.onInitSlide), this.instance.on("initSlides", this.onInitSlides), this.instance.on("Panzoom.afterTransform", this.onTransformM), this.instance.on("Panzoom.refresh", this.onRefreshM), this.instance.on("change", this.onChangeM)
        }
        detach() {
            this.instance.off("initSlide", this.onInitSlide), this.instance.off("initSlides", this.onInitSlides), this.instance.off("Panzoom.afterTransform", this.onTransformM), this.instance.off("Panzoom.refresh", this.onRefreshM), this.instance.off("change", this.onChangeM), this.cleanup()
        }
    };
    Object.defineProperty(U, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: V
    });
    const K = Object.assign(Object.assign({}, V), {
        key: "t",
        showOnStart: !0,
        parentEl: null
    });
    class J extends f {
        constructor() {
            super(...arguments), Object.defineProperty(this, "ref", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "hidden", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            })
        }
        get isEnabled() {
            const t = this.ref;
            return t && t.state !== G.Disabled
        }
        get isHidden() {
            return this.hidden
        }
        onInit() {
            const t = this.instance,
                e = t.carousel;
            if (!e) return;
            const n = this.option("parentEl") || t.footer || t.container;
            n && (e.options.Thumbs = i({}, this.options, {
                parentEl: n,
                classes: {
                    container: "f-thumbs fancybox__thumbs"
                },
                Carousel: {
                    Sync: {
                        friction: t.option("Carousel.friction")
                    },
                    on: {
                        click: (t, e) => {
                            e.stopPropagation()
                        }
                    }
                },
                on: {
                    ready: t => {
                        const e = t.container;
                        e && this.hidden && (this.refresh(), e.style.transition = "none", this.hide(), e.offsetHeight, queueMicrotask((() => {
                            e.style.transition = "", this.show()
                        })))
                    }
                }
            }), e.attachPlugins({
                Thumbs: U
            }), this.ref = e.plugins.Thumbs, this.option("showOnStart") || (this.ref.state = G.Hidden, this.hidden = !0))
        }
        onResize() {
            var t;
            const e = null === (t = this.ref) || void 0 === t ? void 0 : t.container;
            e && (e.style.maxHeight = "")
        }
        onKeydown(t, e) {
            const i = this.option("key");
            i && i === e && this.toggle()
        }
        toggle() {
            const t = this.ref;
            t && t.state !== G.Disabled && (t.state !== G.Hidden ? this.hidden ? this.show() : this.hide() : t.build())
        }
        show() {
            const t = this.ref,
                e = t && t.state !== G.Disabled && t.container;
            e && (this.refresh(), e.offsetHeight, e.removeAttribute("aria-hidden"), e.classList.remove("is-hidden"), this.hidden = !1)
        }
        hide() {
            const t = this.ref,
                e = t && t.container;
            e && (this.refresh(), e.offsetHeight, e.classList.add("is-hidden"), e.setAttribute("aria-hidden", "true")), this.hidden = !0
        }
        refresh() {
            const t = this.ref;
            if (!t || t.state === G.Disabled) return;
            const e = t.container,
                i = (null == e ? void 0 : e.firstChild) || null;
            e && i && i.childNodes.length && (e.style.maxHeight = `${i.getBoundingClientRect().height}px`)
        }
        attach() {
            this.instance.on("Carousel.init", this.onInit), this.instance.on("resize", this.onResize), this.instance.on("keydown", this.onKeydown)
        }
        detach() {
            this.instance.off("Carousel.init", this.onInit), this.instance.off("resize", this.onResize), this.instance.off("keydown", this.onKeydown)
        }
    }
    Object.defineProperty(J, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: K
    });
    const Q = {
        panLeft: {
            icon: '<svg><path d="M5 12h14M5 12l6 6M5 12l6-6"/></svg>',
            change: {
                panX: -100
            }
        },
        panRight: {
            icon: '<svg><path d="M5 12h14M13 18l6-6M13 6l6 6"/></svg>',
            change: {
                panX: 100
            }
        },
        panUp: {
            icon: '<svg><path d="M12 5v14M18 11l-6-6M6 11l6-6"/></svg>',
            change: {
                panY: -100
            }
        },
        panDown: {
            icon: '<svg><path d="M12 5v14M18 13l-6 6M6 13l6 6"/></svg>',
            change: {
                panY: 100
            }
        },
        zoomIn: {
            icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>',
            action: "zoomIn"
        },
        zoomOut: {
            icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
            action: "zoomOut"
        },
        toggle1to1: {
            icon: '<svg><path d="M3.51 3.07c5.74.02 11.48-.02 17.22.02 1.37.1 2.34 1.64 2.18 3.13 0 4.08.02 8.16 0 12.23-.1 1.54-1.47 2.64-2.79 2.46-5.61-.01-11.24.02-16.86-.01-1.36-.12-2.33-1.65-2.17-3.14 0-4.07-.02-8.16 0-12.23.1-1.36 1.22-2.48 2.42-2.46Z"/><path d="M5.65 8.54h1.49v6.92m8.94-6.92h1.49v6.92M11.5 9.4v.02m0 5.18v0"/></svg>',
            action: "toggleZoom"
        },
        toggleZoom: {
            icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
            action: "toggleZoom"
        },
        iterateZoom: {
            icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
            action: "iterateZoom"
        },
        rotateCCW: {
            icon: '<svg><path d="M15 4.55a8 8 0 0 0-6 14.9M9 15v5H4M18.37 7.16v.01M13 19.94v.01M16.84 18.37v.01M19.37 15.1v.01M19.94 11v.01"/></svg>',
            action: "rotateCCW"
        },
        rotateCW: {
            icon: '<svg><path d="M9 4.55a8 8 0 0 1 6 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01M4.63 15.1v.01M7.16 18.37v.01M11 19.94v.01"/></svg>',
            action: "rotateCW"
        },
        flipX: {
            icon: '<svg style="stroke-width: 1.3"><path d="M12 3v18M16 7v10h5L16 7M8 7v10H3L8 7"/></svg>',
            action: "flipX"
        },
        flipY: {
            icon: '<svg style="stroke-width: 1.3"><path d="M3 12h18M7 16h10L7 21v-5M7 8h10L7 3v5"/></svg>',
            action: "flipY"
        },
        fitX: {
            icon: '<svg><path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M10 18H3M21 18h-7M6 15l-3 3 3 3M18 15l3 3-3 3"/></svg>',
            action: "fitX"
        },
        fitY: {
            icon: '<svg><path d="M12 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6M18 14v7M18 3v7M15 18l3 3 3-3M15 6l3-3 3 3"/></svg>',
            action: "fitY"
        },
        reset: {
            icon: '<svg><path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>',
            action: "reset"
        },
        toggleFS: {
            icon: '<svg><g><path d="M14.5 9.5 21 3m0 0h-6m6 0v6M3 21l6.5-6.5M3 21v-6m0 6h6"/></g><g><path d="m14 10 7-7m-7 7h6m-6 0V4M3 21l7-7m0 0v6m0-6H4"/></g></svg>',
            action: "toggleFS"
        }
    };
    var tt;
    ! function(t) {
        t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Disabled = 2] = "Disabled"
    }(tt || (tt = {}));
    const et = {
            absolute: "auto",
            display: {
                left: ["infobar"],
                middle: [],
                right: ["iterateZoom", "slideshow", "fullscreen", "thumbs", "close"]
            },
            enabled: "auto",
            items: {
                infobar: {
                    tpl: '<div class="fancybox__infobar" tabindex="-1"><span data-fancybox-current-index></span>/<span data-fancybox-count></span></div>'
                },
                download: {
                    tpl: '<a class="f-button" title="{{DOWNLOAD}}" data-fancybox-download href="javasript:;"><svg><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"/></svg></a>'
                },
                prev: {
                    tpl: '<button class="f-button" title="{{PREV}}" data-fancybox-prev><svg><path d="m15 6-6 6 6 6"/></svg></button>'
                },
                next: {
                    tpl: '<button class="f-button" title="{{NEXT}}" data-fancybox-next><svg><path d="m9 6 6 6-6 6"/></svg></button>'
                },
                slideshow: {
                    tpl: '<button class="f-button" title="{{TOGGLE_SLIDESHOW}}" data-fancybox-toggle-slideshow><svg><g><path d="M8 4v16l13 -8z"></path></g><g><path d="M8 4v15M17 4v15"/></g></svg></button>'
                },
                fullscreen: {
                    tpl: '<button class="f-button" title="{{TOGGLE_FULLSCREEN}}" data-fancybox-toggle-fullscreen><svg><g><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2-2v-2"/></g><g><path d="M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5"/></g></svg></button>'
                },
                thumbs: {
                    tpl: '<button class="f-button" title="{{TOGGLE_THUMBS}}" data-fancybox-toggle-thumbs><svg><circle cx="5.5" cy="5.5" r="1"/><circle cx="12" cy="5.5" r="1"/><circle cx="18.5" cy="5.5" r="1"/><circle cx="5.5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18.5" cy="12" r="1"/><circle cx="5.5" cy="18.5" r="1"/><circle cx="12" cy="18.5" r="1"/><circle cx="18.5" cy="18.5" r="1"/></svg></button>'
                },
                close: {
                    tpl: '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg><path d="m19.5 4.5-15 15M4.5 4.5l15 15"/></svg></button>'
                }
            },
            parentEl: null
        },
        it = {
            tabindex: "-1",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg"
        };
    class nt extends f {
        constructor() {
            super(...arguments), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: tt.Init
            }), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            })
        }
        onReady(t) {
            var e;
            if (!t.carousel) return;
            let i = this.option("display"),
                n = this.option("absolute"),
                s = this.option("enabled");
            if ("auto" === s) {
                const t = this.instance.carousel;
                let e = 0;
                if (t)
                    for (const i of t.slides)(i.panzoom || "image" === i.type) && e++;
                e || (s = !1)
            }
            s || (i = void 0);
            let o = 0;
            const a = {
                left: [],
                middle: [],
                right: []
            };
            if (i)
                for (const t of ["left", "middle", "right"])
                    for (const n of i[t]) {
                        const i = this.createEl(n);
                        i && (null === (e = a[t]) || void 0 === e || e.push(i), o++)
                    }
            let r = null;
            if (o && (r = this.createContainer()), r) {
                for (const [t, e] of Object.entries(a)) {
                    const i = document.createElement("div");
                    k(i, "fancybox__toolbar__column is-" + t);
                    for (const t of e) i.appendChild(t);
                    "auto" !== n || "middle" !== t || e.length || (n = !0), r.appendChild(i)
                }!0 === n && k(r, "is-absolute"), this.state = tt.Ready, this.onRefresh()
            } else this.state = tt.Disabled
        }
        onClick(t) {
            var e, i;
            const n = this.instance,
                s = n.getSlide(),
                o = null == s ? void 0 : s.panzoom,
                a = t.target,
                r = a && z(a) ? a.dataset : null;
            if (!r) return;
            if (void 0 !== r.fancyboxToggleThumbs) return t.preventDefault(), t.stopPropagation(), void(null === (e = n.plugins.Thumbs) || void 0 === e || e.toggle());
            if (void 0 !== r.fancyboxToggleFullscreen) return t.preventDefault(), t.stopPropagation(), void this.instance.toggleFullscreen();
            if (void 0 !== r.fancyboxToggleSlideshow) {
                t.preventDefault(), t.stopPropagation();
                const e = null === (i = n.carousel) || void 0 === i ? void 0 : i.plugins.Autoplay;
                let s = e.isActive;
                return o && "mousemove" === o.panMode && !s && o.reset(), void(s ? e.stop() : e.start())
            }
            const l = r.panzoomAction,
                c = r.panzoomChange;
            if ((c || l) && (t.preventDefault(), t.stopPropagation()), c) {
                let t = {};
                try {
                    t = JSON.parse(c)
                } catch (t) {}
                o && o.applyChange(t)
            } else l && o && o[l] && o[l]()
        }
        onChange() {
            this.onRefresh()
        }
        onRefresh() {
            if (this.instance.isClosing()) return;
            const t = this.container;
            if (!t) return;
            const e = this.instance.getSlide();
            if (!e || e.state !== d.Ready) return;
            const i = e && !e.error && e.panzoom;
            for (const e of t.querySelectorAll("[data-panzoom-action]")) i ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
            let n = i && i.canZoomIn(),
                s = i && i.canZoomOut();
            for (const e of t.querySelectorAll('[data-panzoom-action="zoomIn"]')) n ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
            for (const e of t.querySelectorAll('[data-panzoom-action="zoomOut"]')) s ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
            for (const e of t.querySelectorAll('[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]')) {
                s || n ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
                const t = e.querySelector("g");
                t && (t.style.display = n ? "" : "none")
            }
        }
        onDone(t, e) {
            var i;
            null === (i = e.panzoom) || void 0 === i || i.on("afterTransform", (() => {
                this.instance.isCurrentSlide(e) && this.onRefresh()
            })), this.instance.isCurrentSlide(e) && this.onRefresh()
        }
        createContainer() {
            const t = this.instance.container;
            if (!t) return null;
            const e = this.option("parentEl") || t,
                i = document.createElement("div");
            return k(i, "fancybox__toolbar"), e.prepend(i), i.addEventListener("click", this.onClick, {
                passive: !1,
                capture: !0
            }), t && k(t, "has-toolbar"), this.container = i, i
        }
        createEl(t) {
            var e;
            const i = this.instance.carousel;
            if (!i) return null;
            if ("toggleFS" === t) return null;
            if ("fullscreen" === t && !this.instance.fsAPI) return null;
            let s = null;
            const o = i.slides.length || 0;
            let a = 0,
                r = 0;
            for (const t of i.slides)(t.panzoom || "image" === t.type) && a++, ("image" === t.type || t.downloadSrc) && r++;
            if (o < 2 && ["infobar", "prev", "next"].includes(t)) return s;
            if (void 0 !== Q[t] && !a) return null;
            if ("download" === t && !r) return null;
            if ("thumbs" === t) {
                const t = this.instance.plugins.Thumbs;
                if (!t || !t.isEnabled) return null
            }
            if ("slideshow" === t) {
                if (!(null === (e = this.instance.carousel) || void 0 === e ? void 0 : e.plugins.Autoplay) || o < 2) return null
            }
            if (void 0 !== Q[t]) {
                const e = Q[t];
                s = document.createElement("button"), s.setAttribute("title", this.instance.localize(`{{${t.toUpperCase()}}}`)), k(s, "f-button"), e.action && (s.dataset.panzoomAction = e.action), e.change && (s.dataset.panzoomChange = JSON.stringify(e.change)), s.appendChild(n(this.instance.localize(e.icon)))
            } else {
                const e = (this.option("items") || [])[t];
                e && (s = n(this.instance.localize(e.tpl)), e.click && s.addEventListener("click", (t => {
                    t.preventDefault(), t.stopPropagation(), "function" == typeof e.click && e.click(t)
                })))
            }
            const l = null == s ? void 0 : s.querySelector("svg");
            if (l)
                for (const [t, e] of Object.entries(it)) l.getAttribute(t) || l.setAttribute(t, String(e));
            return s
        }
        removeContainer() {
            var t;
            const e = this.container;
            e && e.removeEventListener("click", this.onClick, {
                passive: !1,
                capture: !0
            }), null === (t = this.container) || void 0 === t || t.remove(), this.container = null, this.state = tt.Disabled;
            const i = this.instance.container;
            i && R(i, "has-toolbar")
        }
        attach() {
            this.instance.on("Carousel.initSlides", this.onReady), this.instance.on("done", this.onDone), this.instance.on("reveal", this.onChange), this.instance.on("Carousel.change", this.onChange), this.onReady(this.instance)
        }
        detach() {
            this.instance.off("Carousel.initSlides", this.onReady), this.instance.off("done", this.onDone), this.instance.off("reveal", this.onChange), this.instance.off("Carousel.change", this.onChange), this.removeContainer()
        }
    }
    Object.defineProperty(nt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: et
    });
    const st = {
            Hash: b,
            Html: Y,
            Images: N,
            Slideshow: Z,
            Thumbs: J,
            Toolbar: nt
        },
        ot = function(t, e) {
            let i = !0;
            return (...n) => {
                i && (i = !1, t(...n), setTimeout((() => {
                    i = !0
                }), e))
            }
        },
        at = (t, e) => {
            let i = [];
            return t.childNodes.forEach((t => {
                t.nodeType !== Node.ELEMENT_NODE || e && !t.matches(e) || i.push(t)
            })), i
        },
        rt = {
            viewport: null,
            track: null,
            enabled: !0,
            slides: [],
            axis: "x",
            transition: "fade",
            preload: 1,
            slidesPerPage: "auto",
            initialPage: 0,
            friction: .12,
            center: !0,
            infinite: !0,
            fill: !0,
            dragFree: !1,
            adaptiveHeight: !1,
            direction: "ltr",
            classes: {
                container: "f-carousel",
                viewport: "f-carousel__viewport",
                track: "f-carousel__track",
                slide: "f-carousel__slide",
                isLTR: "is-ltr",
                isRTL: "is-rtl",
                isHorizontal: "is-horizontal",
                isVertical: "is-vertical",
                inTransition: "in-transition",
                isSelected: "is-selected"
            },
            l10n: {
                NEXT: "Next slide",
                PREV: "Previous slide",
                GOTO: "Go to slide #%d"
            }
        };
    var lt;
    ! function(t) {
        t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Destroy = 2] = "Destroy"
    }(lt || (lt = {}));
    const ct = t => {
            if ("string" == typeof t && (t = {
                    html: t
                }), !(t instanceof String || t instanceof HTMLElement)) {
                const e = t.thumb;
                void 0 !== e && ("string" == typeof e && (t.thumbSrc = e), e instanceof HTMLImageElement && (t.thumbEl = e, t.thumbElSrc = e.src, t.thumbSrc = e.src), delete t.thumb)
            }
            return Object.assign({
                html: "",
                el: null,
                isDom: !1,
                class: "",
                index: -1,
                dim: 0,
                gap: 0,
                pos: 0,
                transition: !1
            }, t)
        },
        ht = (t = {}) => Object.assign({
            index: -1,
            slides: [],
            dim: 0,
            pos: -1
        }, t),
        dt = {
            classes: {
                list: "f-carousel__dots",
                isDynamic: "is-dynamic",
                hasDots: "has-dots",
                dot: "f-carousel__dot",
                isBeforePrev: "is-before-prev",
                isPrev: "is-prev",
                isCurrent: "is-current",
                isNext: "is-next",
                isAfterNext: "is-after-next"
            },
            dotTpl: '<button type="button" data-carousel-page="%i" aria-label="{{GOTO}}"><span class="f-carousel__dot" aria-hidden="true"></span></button>',
            dynamicFrom: 11,
            maxCount: 1 / 0,
            minCount: 2
        };
    class ut extends f {
        constructor() {
            super(...arguments), Object.defineProperty(this, "isDynamic", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "list", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            })
        }
        onRefresh() {
            this.refresh()
        }
        build() {
            let t = this.list;
            return t || (t = document.createElement("ul"), k(t, this.cn("list")), t.setAttribute("role", "tablist"), this.instance.container.appendChild(t), k(this.instance.container, this.cn("hasDots")), this.list = t), t
        }
        refresh() {
            var t;
            const e = this.instance.pages.length,
                i = Math.min(2, this.option("minCount")),
                n = Math.max(2e3, this.option("maxCount")),
                s = this.option("dynamicFrom");
            if (e < i || e > n) return void this.cleanup();
            const o = "number" == typeof s && e > 5 && e >= s,
                a = !this.list || this.isDynamic !== o || this.list.children.length !== e;
            a && this.cleanup();
            const r = this.build();
            if (S(r, this.cn("isDynamic"), !!o), a)
                for (let t = 0; t < e; t++) r.append(this.createItem(t));
            let l, c = 0;
            for (const e of [...r.children]) {
                const i = c === this.instance.page;
                i && (l = e), S(e, this.cn("isCurrent"), i), null === (t = e.children[0]) || void 0 === t || t.setAttribute("aria-selected", i ? "true" : "false");
                for (const t of ["isBeforePrev", "isPrev", "isNext", "isAfterNext"]) R(e, this.cn(t));
                c++
            }
            if (l = l || r.firstChild, o && l) {
                const t = l.previousElementSibling,
                    e = t && t.previousElementSibling;
                k(t, this.cn("isPrev")), k(e, this.cn("isBeforePrev"));
                const i = l.nextElementSibling,
                    n = i && i.nextElementSibling;
                k(i, this.cn("isNext")), k(n, this.cn("isAfterNext"))
            }
            this.isDynamic = o
        }
        createItem(t = 0) {
            var e;
            const i = document.createElement("li");
            i.setAttribute("role", "presentation");
            const s = n(this.instance.localize(this.option("dotTpl"), [
                ["%d", t + 1]
            ]).replace(/\%i/g, t + ""));
            return i.appendChild(s), null === (e = i.children[0]) || void 0 === e || e.setAttribute("role", "tab"), i
        }
        cleanup() {
            this.list && (this.list.remove(), this.list = null), this.isDynamic = !1, R(this.instance.container, this.cn("hasDots"))
        }
        attach() {
            this.instance.on(["refresh", "change"], this.onRefresh)
        }
        detach() {
            this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup()
        }
    }
    Object.defineProperty(ut, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: dt
    });
    class pt extends f {
        constructor() {
            super(...arguments), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "prev", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "next", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            })
        }
        onRefresh() {
            const t = this.instance,
                e = t.pages.length,
                i = t.page;
            if (e < 2) return void this.cleanup();
            this.build();
            let n = this.prev,
                s = this.next;
            n && s && (n.removeAttribute("disabled"), s.removeAttribute("disabled"), t.isInfinite || (i <= 0 && n.setAttribute("disabled", ""), i >= e - 1 && s.setAttribute("disabled", "")))
        }
        createButton(t) {
            const e = this.instance,
                i = document.createElement("button");
            i.setAttribute("tabindex", "0"), i.setAttribute("title", e.localize(`{{${t.toUpperCase()}}}`)), k(i, this.cn("button") + " " + this.cn("next" === t ? "isNext" : "isPrev"));
            const n = e.isRTL ? "next" === t ? "prev" : "next" : t;
            var s;
            return i.innerHTML = e.localize(this.option(`${n}Tpl`)), i.dataset[`carousel${s=t,s?s.match("^[a-z]")?s.charAt(0).toUpperCase()+s.substring(1):s:""}`] = "true", i
        }
        build() {
            let t = this.container;
            t || (this.container = t = document.createElement("div"), k(t, this.cn("container")), this.instance.container.appendChild(t)), this.next || (this.next = t.appendChild(this.createButton("next"))), this.prev || (this.prev = t.appendChild(this.createButton("prev")))
        }
        cleanup() {
            this.prev && this.prev.remove(), this.next && this.next.remove(), this.container && this.container.remove(), this.prev = null, this.next = null, this.container = null
        }
        attach() {
            this.instance.on(["refresh", "change"], this.onRefresh)
        }
        detach() {
            this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup()
        }
    }
    Object.defineProperty(pt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            classes: {
                container: "f-carousel__nav",
                button: "f-button",
                isNext: "is-next",
                isPrev: "is-prev"
            },
            nextTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',
            prevTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>'
        }
    });
    class mt extends f {
        constructor() {
            super(...arguments), Object.defineProperty(this, "selectedIndex", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "target", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "nav", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            })
        }
        addAsTargetFor(t) {
            this.target = this.instance, this.nav = t, this.attachEvents()
        }
        addAsNavFor(t) {
            this.nav = this.instance, this.target = t, this.attachEvents()
        }
        attachEvents() {
            this.nav && this.target && (this.nav.options.initialSlide = this.target.options.initialPage, this.nav.on("ready", this.onNavReady), this.nav.state === lt.Ready && this.onNavReady(this.nav), this.target.on("ready", this.onTargetReady), this.target.state === lt.Ready && this.onTargetReady(this.target))
        }
        onNavReady(t) {
            t.on("createSlide", this.onNavCreateSlide), t.on("Panzoom.click", this.onNavClick), this.onTargetChange()
        }
        onTargetReady(t) {
            t.on("change", this.onTargetChange), t.on("Panzoom.refresh", this.onTargetChange), this.onTargetChange()
        }
        onNavClick(t, e, i) {
            var n, s;
            const o = i.target,
                {
                    nav: a,
                    target: r
                } = this;
            if (!a || !r || !o) return;
            const l = o.closest("[data-index]");
            if (!l) return;
            i.stopPropagation(), i.preventDefault();
            const c = parseInt(l.dataset.index || "", 10) || 0,
                h = r.getPageForSlide(c),
                d = a.getPageForSlide(c);
            r.page !== h && r.slideTo(h, {
                friction: null === (s = null === (n = this.nav) || void 0 === n ? void 0 : n.plugins) || void 0 === s ? void 0 : s.Sync.option("friction")
            }), this.markSelectedSlide(c), a.page !== d && a.slideTo(d)
        }
        onNavCreateSlide(t, e) {
            e.index === this.selectedIndex && this.markSelectedSlide(e.index)
        }
        onTargetChange() {
            const {
                target: t,
                nav: e
            } = this;
            if (!t || !e) return;
            if (e.state !== lt.Ready || t.state !== lt.Ready) return;
            const i = t.pages[t.page].slides[0].index,
                n = e.getPageForSlide(i);
            this.markSelectedSlide(i), e.slideTo(n)
        }
        markSelectedSlide(t) {
            const {
                nav: e
            } = this;
            if (!e || e.state !== lt.Ready) return;
            this.selectedIndex = t, [...e.slides].filter((t => t.el && t.el.classList.remove("is-nav-selected")));
            const i = e.slides[t];
            i && i.el && i.el.classList.add("is-nav-selected")
        }
        attach() {
            let t = this.options.target,
                e = this.options.nav;
            t ? this.addAsNavFor(t) : e && this.addAsTargetFor(e)
        }
        detach() {
            this.nav && (this.nav.off("ready", this.onNavReady), this.nav.off("Panzoom.click", this.onNavClick), this.nav.off("createSlide", this.onNavCreateSlide)), this.nav = null, this.target && (this.target.off("ready", this.onTargetReady), this.target.off("refresh", this.onTargetChange), this.target.off("change", this.onTargetChange)), this.target = null
        }
    }
    Object.defineProperty(mt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
            friction: .35
        }
    });
    const ft = {
        Navigation: pt,
        Dots: ut,
        Sync: mt
    };
    class gt extends m {
        get axis() {
            return this.isHorizontal ? "e" : "f"
        }
        get isEnabled() {
            return this.state === lt.Ready
        }
        get isInfinite() {
            let t = !1;
            const e = this.contentDim,
                i = this.viewportDim;
            return this.pages.length >= 2 && e > 1.5 * i && (t = this.option("infinite")), t
        }
        get isRTL() {
            return "rtl" === this.option("direction")
        }
        get isHorizontal() {
            return "x" === this.option("axis")
        }
        constructor(t, e = {}, i = {}) {
            if (super(), Object.defineProperty(this, "userOptions", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: {}
                }), Object.defineProperty(this, "userPlugins", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: {}
                }), Object.defineProperty(this, "bp", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: ""
                }), Object.defineProperty(this, "state", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: lt.Init
                }), Object.defineProperty(this, "page", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "prevPage", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "container", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }), Object.defineProperty(this, "viewport", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "track", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "slides", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: []
                }), Object.defineProperty(this, "pages", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: []
                }), Object.defineProperty(this, "panzoom", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }), Object.defineProperty(this, "inTransition", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: new Set
                }), Object.defineProperty(this, "contentDim", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), Object.defineProperty(this, "viewportDim", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }), "string" == typeof t && (t = document.querySelector(t)), !t || !z(t)) throw new Error("No Element found");
            this.container = t, this.slideNext = ot(this.slideNext.bind(this), 175), this.slidePrev = ot(this.slidePrev.bind(this), 175), this.userOptions = e, this.userPlugins = i, queueMicrotask((() => {
                this.processOptions()
            }))
        }
        processOptions() {
            const t = i({}, gt.defaults, this.userOptions);
            let n = "";
            const s = t.breakpoints;
            if (s && e(s))
                for (const [o, a] of Object.entries(s)) window.matchMedia(o).matches && e(a) && (n += o, i(t, a));
            n === this.bp && this.state !== lt.Init || (this.bp = n, this.state === lt.Ready && (t.initialSlide = this.pages[this.page].slides[0].index), this.state !== lt.Init && this.destroy(), super.setOptions(t), !1 === this.option("enabled") ? this.attachEvents() : setTimeout((() => {
                this.init()
            }), 0))
        }
        init() {
            this.state = lt.Init, this.emit("init"), this.attachPlugins(Object.assign(Object.assign({}, gt.Plugins), this.userPlugins)), this.initLayout(), this.initSlides(), this.updateMetrics(), this.setInitialPosition(), this.initPanzoom(), this.attachEvents(), this.state = lt.Ready, this.emit("ready")
        }
        initLayout() {
            const {
                container: t
            } = this, e = this.option("classes");
            k(t, this.cn("container")), S(t, e.isLTR, !this.isRTL), S(t, e.isRTL, this.isRTL), S(t, e.isVertical, !this.isHorizontal), S(t, e.isHorizontal, this.isHorizontal);
            let i = this.option("viewport") || t.querySelector(`.${e.viewport}`);
            i || (i = document.createElement("div"), k(i, e.viewport), i.append(...at(t, `.${e.slide}`)), t.prepend(i));
            let n = this.option("track") || t.querySelector(`.${e.track}`);
            n || (n = document.createElement("div"), k(n, e.track), n.append(...Array.from(i.childNodes))), n.setAttribute("aria-live", "polite"), i.contains(n) || i.prepend(n), this.viewport = i, this.track = n, this.emit("initLayout")
        }
        initSlides() {
            const {
                track: t
            } = this;
            if (t) {
                this.slides = [], [...at(t, `.${this.cn("slide")}`)].forEach((t => {
                    if (z(t)) {
                        const e = ct({
                            el: t,
                            isDom: !0,
                            index: this.slides.length
                        });
                        this.slides.push(e), this.emit("initSlide", e, this.slides.length)
                    }
                }));
                for (let t of this.option("slides", [])) {
                    const e = ct(t);
                    e.index = this.slides.length, this.slides.push(e), this.emit("initSlide", e, this.slides.length)
                }
                this.emit("initSlides")
            }
        }
        setInitialPage() {
            let t = 0;
            const e = this.option("initialSlide");
            t = "number" == typeof e ? this.getPageForSlide(e) : parseInt(this.option("initialPage", 0) + "", 10) || 0, this.page = t
        }
        setInitialPosition() {
            if (!this.track || !this.pages.length) return;
            let t = this.page;
            this.pages[t] || (this.page = t = 0);
            const e = this.pages[t].pos * (this.isRTL && this.isHorizontal ? 1 : -1),
                i = this.isHorizontal ? `${e}px` : "0",
                n = this.isHorizontal ? "0" : `${e}px`;
            this.track.style.transform = `translate3d(${i}, ${n}, 0) scale(1)`, this.option("adaptiveHeight") && this.setViewportHeight()
        }
        initPanzoom() {
            this.panzoom && (this.panzoom.destroy(), this.panzoom = null);
            const t = this.option("Panzoom") || {};
            this.panzoom = new B(this.viewport, i({}, {
                content: this.track,
                zoom: !1,
                panOnlyZoomed: !1,
                lockAxis: this.isHorizontal ? "x" : "y",
                infinite: this.isInfinite,
                decelFriction: .12,
                click: !1,
                dblClick: !1,
                touch: t => !(this.pages.length < 2 && !t.options.infinite),
                bounds: () => this.getBounds(),
                maxVelocity: t => Math.abs(t.target[this.axis] - t.current[this.axis]) < 2 * this.viewportDim ? 100 : 0
            }, t)), this.panzoom.on("*", ((t, e, ...i) => {
                this.emit(`Panzoom.${e}`, t, ...i)
            })), this.panzoom.on("decel", this.onDecel), this.panzoom.on("refresh", this.onRefresh), this.panzoom.on("beforeTransform", this.onBeforeTransform), this.panzoom.on("endAnimation", this.onEndAnimation), this.panzoom.on("touchStart", ((t, e) => {
                this.inTransition.size && e.preventDefault()
            }))
        }
        attachEvents() {
            const t = this.container;
            t && (t.addEventListener("click", this.onClick, {
                passive: !1,
                capture: !1
            }), t.addEventListener("slideTo", this.onSlideTo)), window.addEventListener("resize", this.onResize)
        }
        createPages() {
            let t = [];
            const {
                contentDim: e,
                viewportDim: i
            } = this, n = this.option("slidesPerPage");
            if ("number" == typeof n && e > i) {
                for (let e = 0; e < this.slides.length; e += n) t.push(ht({
                    index: e,
                    slides: this.slides.slice(e, e + n)
                }));
                return t
            }
            let s = 0,
                o = 0;
            for (const e of this.slides)(!t.length || o + e.dim > i) && (t.push(ht()), s = t.length - 1, o = 0), o += e.dim + e.gap, t[s].slides.push(e);
            return t
        }
        processPages() {
            const t = this.pages,
                {
                    contentDim: e,
                    viewportDim: i
                } = this,
                n = this.option("center"),
                s = this.option("fill");
            if (t.forEach(((t, e) => {
                    t.index = e, t.pos = t.slides[0].pos, t.dim = 0;
                    for (const [e, i] of t.slides.entries()) t.dim += i.dim, e < t.slides.length - 1 && (t.dim += i.gap);
                    n && (t.pos += -.5 * (i - t.dim))
                })), t.forEach(((t, n) => {
                    s && !this.isInfinite && e > i && (t.pos = Math.max(t.pos, 0), t.pos = Math.min(t.pos, e - i)), t.pos = y(t.pos, 1e3), t.dim = y(t.dim, 1e3)
                })), this.isInfinite) return t;
            const o = [];
            let a;
            return t.forEach((t => {
                const e = Object.assign({}, t);
                a && e.pos === a.pos ? (a.dim += e.dim, a.slides = [...a.slides, ...e.slides]) : (e.index = o.length, a = e, o.push(e))
            })), o
        }
        getPageFromIndex(t = 0) {
            const e = this.pages.length;
            let i;
            return t = parseInt((t || 0).toString()) || 0, i = this.isInfinite ? (t % e + e) % e : Math.max(Math.min(t, this.pages.length - 1), 0), i
        }
        getSlideMetrics(t) {
            const e = this.isHorizontal ? "width" : "height";
            let i = 0,
                n = 0,
                s = t.el;
            s ? i = parseFloat(s.dataset[e] || "") || 0 : (s = document.createElement("div"), s.style.visibility = "hidden", k(s, this.cn("slide") + " " + t.class), (this.track || document.body).prepend(s)), i ? (s.style[e] = `${i}px`, s.style["width" === e ? "height" : "width"] = "") : i = s.getBoundingClientRect()[e];
            const o = getComputedStyle(s);
            return "content-box" === o.boxSizing && (this.isHorizontal ? (i += parseFloat(o.paddingLeft) || 0, i += parseFloat(o.paddingRight) || 0) : (i += parseFloat(o.paddingTop) || 0, i += parseFloat(o.paddingBottom) || 0)), n = parseFloat(o[this.isHorizontal ? "marginRight" : "marginBottom"]) || 0, this.isHorizontal, t.el || s.remove(), {
                dim: i,
                gap: n
            }
        }
        getBounds() {
            let t = {
                min: 0,
                max: 0
            };
            if (this.isInfinite) t = {
                min: -1 / 0,
                max: 1 / 0
            };
            else if (this.pages.length) {
                const e = this.pages[0].pos,
                    i = this.pages[this.pages.length - 1].pos;
                t = this.isRTL && this.isHorizontal ? {
                    min: e,
                    max: i
                } : {
                    min: -1 * i,
                    max: -1 * e
                }
            }
            return {
                x: this.isHorizontal ? t : {
                    min: 0,
                    max: 0
                },
                y: this.isHorizontal ? {
                    min: 0,
                    max: 0
                } : t
            }
        }
        repositionSlides() {
            const {
                viewportDim: t,
                contentDim: e,
                page: i,
                pages: n
            } = this;
            let s, o = 0,
                a = 0,
                r = 0,
                l = 0;
            this.panzoom ? l = -1 * this.panzoom.current[this.isHorizontal ? "e" : "f"] : n[i] && (l = n[i].pos || 0), s = this.isHorizontal ? this.isRTL ? "right" : "left" : "top", this.isRTL && this.isHorizontal && (l *= -1);
            for (const t of this.slides) t.el ? ("top" === s ? (t.el.style.right = "", t.el.style.left = "") : t.el.style.top = "", t.index !== o ? t.el.style[s] = 0 === a ? "" : `${a}px` : t.el.style[s] = "", r += t.dim + t.gap, o++) : a += t.dim + t.gap;
            if (this.isInfinite && r)
                for (const i of this.slides) i.el && (y(i.pos) < y(t) && y(i.pos + i.dim + i.gap) < y(l) && y(l) > y(e - t) && (i.el.style[s] = `${a+r}px`), y(i.pos + i.gap) >= y(e - t) && y(i.pos) > y(l + t) && y(l) < y(t) && (i.el.style[s] = `-${r}px`));
            let c, h, d = [...this.inTransition];
            if (d.length > 1 && (c = this.pages[d[0]], h = this.pages[d[1]]), c && h) {
                let t = 0;
                for (const e of this.slides) e.el ? this.inTransition.has(e.index) && c.slides.indexOf(e) < 0 && (e.el.style[s] = `${t+(c.pos-h.pos)}px`) : t += e.dim + e.gap
            }
        }
        createSlideEl(t) {
            if (!this.track || !t) return;
            if (t.el) return;
            const e = document.createElement("div");
            k(e, this.cn("slide")), k(e, t.class), k(e, t.customClass), t.html && (e.innerHTML = t.html);
            const i = [];
            this.slides.forEach(((t, e) => {
                t.el && i.push(e)
            }));
            const n = t.index;
            let s = null;
            if (i.length) {
                let t = i.reduce(((t, e) => Math.abs(e - n) < Math.abs(t - n) ? e : t));
                s = this.slides[t]
            }
            const o = s && s.el ? s.index < t.index ? s.el.nextSibling : s.el : null;
            this.track.insertBefore(e, this.track.contains(o) ? o : null), t.el = e, this.emit("createSlide", t)
        }
        removeSlideEl(t, e = !1) {
            const i = t.el;
            if (!i) return;
            if (R(i, this.cn("isSelected")), t.isDom && !e) return void(i.style.left = "");
            this.emit("removeSlide", t);
            const n = new CustomEvent("animationend");
            i.dispatchEvent(n), t.el && t.el.remove(), t.el = null
        }
        transitionTo(t = 0, e = this.option("transition")) {
            if (!e) return !1;
            const {
                pages: i,
                panzoom: n
            } = this;
            t = parseInt((t || 0).toString()) || 0;
            const s = this.getPageFromIndex(t);
            if (!n || !i[s] || i.length < 2 || i[this.page].slides[0].dim < this.viewportDim) return !1;
            const o = t > this.page ? 1 : -1,
                a = this.pages[s].pos * (this.isRTL ? 1 : -1);
            if (this.page === s && a === n.target[this.axis]) return !1;
            this.clearTransitions();
            const r = n.isResting;
            k(this.container, this.cn("inTransition"));
            const l = this.pages[this.page].slides[0],
                c = this.pages[s].slides[0];
            this.inTransition.add(c.index), this.createSlideEl(c);
            let h = l.el,
                d = c.el;
            r || "slide" === e || (e = "fadeFast", h = null);
            const u = this.isRTL ? "next" : "prev",
                p = this.isRTL ? "prev" : "next";
            return h && (this.inTransition.add(l.index), l.transition = e, h.addEventListener("animationend", this.onAnimationEnd), h.classList.add(`f-${e}Out`, `to-${o>0?p:u}`)), d && (c.transition = e, d.addEventListener("animationend", this.onAnimationEnd), d.classList.add(`f-${e}In`, `from-${o>0?u:p}`)), n.panTo({
                x: this.isHorizontal ? a : 0,
                y: this.isHorizontal ? 0 : a,
                friction: 0
            }), this.onChange(s), !0
        }
        manageSlideVisiblity() {
            const t = new Set,
                e = new Set,
                i = this.getVisibleSlides(parseFloat(this.option("preload", 0) + "") || 0);
            for (const n of this.slides) i.has(n) ? t.add(n) : e.add(n);
            for (const e of this.inTransition) t.add(this.slides[e]);
            for (const e of t) this.createSlideEl(e), this.lazyLoadSlide(e);
            for (const i of e) t.has(i) || this.removeSlideEl(i);
            this.markSelectedSlides(), this.repositionSlides()
        }
        markSelectedSlides() {
            if (!this.pages[this.page] || !this.pages[this.page].slides) return;
            const t = "aria-hidden";
            let e = this.cn("isSelected");
            if (e)
                for (const i of this.slides) i.el && (i.el.dataset.index = `${i.index}`, this.pages[this.page].slides.includes(i) ? (i.el.classList.contains(e) || (k(i.el, e), this.emit("selectSlide", i)), i.el.removeAttribute(t)) : (i.el.classList.contains(e) && (R(i.el, e), this.emit("unselectSlide", i)), i.el.setAttribute(t, "true")))
        }
        flipInfiniteTrack() {
            const t = this.panzoom;
            if (!t || !this.isInfinite) return;
            const e = "x" === this.option("axis") ? "e" : "f",
                {
                    viewportDim: i,
                    contentDim: n
                } = this;
            let s = t.current[e],
                o = t.target[e] - s,
                a = 0,
                r = .5 * i,
                l = n;
            this.isRTL && this.isHorizontal ? (s < -r && (a = -1, s += l), s > l - r && (a = 1, s -= l)) : (s > r && (a = 1, s -= l), s < -l + r && (a = -1, s += l)), a && (t.current[e] = s, t.target[e] = s + o)
        }
        lazyLoadSlide(t) {
            const e = this,
                i = t && t.el;
            if (!i) return;
            const s = new Set;
            i.querySelectorAll("[data-lazy-srcset]").forEach((t => {
                t instanceof HTMLImageElement && s.add(t)
            })), i.querySelectorAll("[data-lazy-src]").forEach((t => {
                t instanceof HTMLImageElement ? s.add(t) : z(t) && (t.style.backgroundImage = `url('${t.dataset.lazySrc||""}')`)
            }));
            const o = (t, i, n) => {
                n && (n.remove(), n = null), i.complete && (i.style.display = ""), this.option("adaptiveHeight") && t.el && this.pages[this.page].slides.indexOf(t) > -1 && e.setViewportHeight()
            };
            for (const e of s) {
                let i = null;
                e.src = e.dataset.lazySrcset || e.dataset.lazySrc || "", delete e.dataset.lazySrc, delete e.dataset.lazySrcset, e.style.display = "none", e.addEventListener("error", (() => {
                    o(t, e, i)
                })), e.addEventListener("load", (() => {
                    o(t, e, i)
                })), setTimeout((() => {
                    e.parentNode && t.el && (e.complete ? o(t, e, i) : (i = n(r), e.parentNode.insertBefore(i, e)))
                }), 300)
            }
            let a = i.dataset.lazySrc;
            a && a.length && (i.style.backgroundImage = `url('${a}')`)
        }
        clearTransitions() {
            this.inTransition.clear(), R(this.container, this.cn("inTransition"));
            const t = ["to-prev", "to-next", "from-prev", "from-next"];
            for (const e of this.slides) {
                const i = e.el;
                if (i) {
                    i.removeEventListener("animationend", this.onAnimationEnd), i.classList.remove(...t);
                    const n = e.transition;
                    n && i.classList.remove(`f-${n}Out`, `f-${n}In`)
                }
            }
            this.manageSlideVisiblity()
        }
        onAnimationEnd(t) {
            const e = t.target,
                i = e ? parseInt(e.dataset.index || "", 10) || 0 : -1,
                n = this.slides[i],
                s = t.animationName;
            if (!e || !n || !s) return;
            const o = !!this.inTransition.has(i) && n.transition;
            o && s.substring(0, o.length + 2) === `f-${o}` && this.inTransition.delete(i), this.inTransition.size || this.clearTransitions(), i === this.page && this.emit("settle")
        }
        onDecel(t, e = 0, i = 0) {
            const n = this.isInfinite,
                s = this.isHorizontal ? e : i,
                o = this.pages.length;
            if (!o) return;
            const a = this.option("dragFree");
            let r = this.page,
                l = 0;
            const c = this.axis;
            !n && (t.target[c], this.viewportDim);
            const h = t.current[c] * (this.isRTL && this.isHorizontal ? 1 : -1);
            let {
                pageIndex: d
            } = this.getPageFromPosition(h);
            if (a || Math.abs(s) < 10) {
                const e = t.target[c] * (this.isRTL && this.isHorizontal ? 1 : -1),
                    {
                        pageIndex: i
                    } = this.getPageFromPosition(e);
                r = i
            } else r = this.isRTL && this.isHorizontal ? s < 0 ? d - 1 : d + 1 : s < 0 ? d + 1 : d - 1, n || (r = Math.max(0, Math.min(r, this.pages.length - 1)));
            if (n && (l = Math.floor(r / o) || 0), r = (r % o + o) % o, a && t.dragOffset["e" === c ? "x" : "y"]);
            else {
                const e = this.contentDim;
                let i = (this.pages[r].pos + l * e) * (this.isRTL && this.isHorizontal ? 1 : -1);
                if (Math.abs(t.target[c] - i) < .1 && t.lockedAxis === ("e" == c ? "y" : "x")) return;
                if (t.target[c] === i) return;
                t.applyChange({
                    panX: this.isHorizontal ? i - t.target.e : 0,
                    panY: this.isHorizontal ? 0 : i - t.target.f,
                    friction: t.option("decelFriction")
                })
            }
            r !== this.page && this.onChange(r)
        }
        onClick(t) {
            const e = t.target,
                i = e && z(e) ? e.dataset : null;
            let n;
            i && (void 0 !== i.carouselPage ? n = "slideTo" : void 0 !== i.carouselNext ? n = "slideNext" : void 0 !== i.carouselPrev && (n = "slidePrev")), n ? (t.preventDefault(), t.stopPropagation(), e && !e.hasAttribute("disabled") && this[n](i && "slideTo" === n ? i.carouselPage : void 0)) : this.emit("click", t)
        }
        onSlideTo(t) {
            const e = t.detail || 0;
            this.slideTo(this.getPageForSlide(e), {
                friction: 0
            })
        }
        onChange(t, e = 0) {
            const i = this.page;
            this.prevPage = i, this.page = t, this.option("adaptiveHeight") && this.setViewportHeight(), this.emit("change", t, i, e)
        }
        onRefresh(t, e = "") {
            let i = this.contentDim,
                n = this.viewportDim;
            this.updateMetrics(), this.contentDim === i && this.viewportDim === n || this.slideTo(this.page, {
                friction: 0,
                transition: !1
            })
        }
        onResize() {
            this.option("breakpoints") && this.processOptions()
        }
        onBeforeTransform() {
            this.flipInfiniteTrack(), this.manageSlideVisiblity()
        }
        onEndAnimation() {
            this.emit("settle")
        }
        reInit(t = null, e = null) {
            this.destroy(), this.state = lt.Init, this.userOptions = t || this.userOptions, this.userPlugins = e || this.userPlugins, this.processOptions()
        }
        slideTo(t = 0, {
            friction: e = this.option("friction"),
            transition: i = this.option("transition")
        } = {}) {
            if (this.state === lt.Destroy) return;
            const n = this.panzoom,
                s = this.pages.length;
            if (!n || !s) return;
            if (this.transitionTo(t, i)) return;
            const o = this.axis,
                a = this.getPageFromIndex(t);
            let r = this.pages[a].pos,
                l = 0;
            if (this.isInfinite) {
                const t = n.current[o] * (this.isRTL && this.isHorizontal ? 1 : -1),
                    e = this.contentDim,
                    i = r + e,
                    s = r - e;
                Math.abs(t - i) < Math.abs(t - r) && (r = i, l = 1), Math.abs(t - s) < Math.abs(t - r) && (r = s, l = -1)
            }
            r *= this.isRTL && this.isHorizontal ? 1 : -1, Math.abs(n.target[o] - r) < .1 || (n.applyChange({
                panX: this.isHorizontal ? r - n.target.e : 0,
                panY: this.isHorizontal ? 0 : r - n.target.f,
                friction: e
            }), this.onChange(a, l))
        }
        slideToClosest(t) {
            if (this.panzoom) {
                const {
                    pageIndex: e
                } = this.getPageFromPosition(this.panzoom.current.e);
                this.slideTo(e, t)
            }
        }
        slideNext() {
            this.slideTo(this.page + 1)
        }
        slidePrev() {
            this.slideTo(this.page - 1)
        }
        prependSlide(t) {
            var e, i;
            let n = Array.isArray(t) ? t : [t];
            for (const t of n.reverse()) this.slides.unshift(ct(t));
            for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
            const s = (null === (e = this.pages[this.page]) || void 0 === e ? void 0 : e.pos) || 0;
            this.page += n.length, this.updateMetrics();
            const o = (null === (i = this.pages[this.page]) || void 0 === i ? void 0 : i.pos) || 0;
            if (this.panzoom) {
                const t = this.isRTL ? s - o : o - s;
                this.panzoom.target.e -= t, this.panzoom.current.e -= t, this.panzoom.requestTick()
            }
        }
        appendSlide(t) {
            let e = Array.isArray(t) ? t : [t];
            for (const t of e) {
                const e = ct(t);
                e.index = this.slides.length, this.slides.push(e), this.emit("initSlide", t, this.slides.length)
            }
            this.updateMetrics()
        }
        removeSlide(t) {
            const e = this.slides.length;
            t = (t % e + e) % e, this.removeSlideEl(this.slides[t], !0), this.slides.splice(t, 1);
            for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
            this.updateMetrics(), this.slideTo(this.page, {
                friction: 0,
                transition: !1
            })
        }
        updateMetrics() {
            if (!this.track) return;
            const t = "e" === this.axis ? "width" : "height";
            let e, i = 0;
            for (const [t, n] of this.slides.entries()) {
                let s = 0,
                    o = 0;
                !n.el && e ? (s = e.dim, o = e.gap) : (({
                    dim: s,
                    gap: o
                } = this.getSlideMetrics(n)), e = n), n.dim = y(s, 1e3), n.gap = y(o, 1e3), n.pos = y(i, 1e3), i += s, (this.isInfinite || t < this.slides.length - 1) && (i += o)
            }
            this.viewport && (this.viewportDim = y(this.viewport.getBoundingClientRect()[t], 1e3)), this.contentDim = y(i, 1e3), this.panzoom && (this.panzoom.contentRect[t] = this.contentDim, this.panzoom.contentRect["e" === this.axis ? "fullWidth" : "fullHeight"] = this.contentDim), this.pages = this.createPages(), this.pages = this.processPages(), this.state === lt.Init && this.setInitialPage(), this.page = Math.max(0, Math.min(this.page, this.pages.length - 1)), this.manageSlideVisiblity(), this.emit("refresh")
        }
        setViewportHeight() {
            const {
                page: t,
                pages: e,
                viewport: i,
                isHorizontal: n
            } = this;
            if (!i || !e[t]) return;
            let s = 0;
            n && this.track && (this.track.style.height = "auto", e[t].slides.forEach((t => {
                t.el && (s = Math.max(s, t.el.offsetHeight))
            }))), i.style.height = s ? `${s}px` : ""
        }
        getPageForSlide(t) {
            for (const e of this.pages)
                for (const i of e.slides)
                    if (i.index === t) return e.index;
            return -1
        }
        getVisibleSlides(t = 0) {
            var e;
            const i = new Set;
            let {
                contentDim: n,
                viewportDim: s,
                pages: o,
                page: a
            } = this;
            n = n + (null === (e = this.slides[this.slides.length - 1]) || void 0 === e ? void 0 : e.gap) || 0;
            let r = 0;
            r = this.panzoom ? -1 * this.panzoom.current[this.axis] : o[a] && o[a].pos || 0, this.isInfinite && (r -= Math.floor(r / n) * n), this.isRTL && this.isHorizontal && (r *= -1), r = y(r, 1e3);
            const l = y(r - s * t, 1e3),
                c = y(r + s * (t + 1), 1e3),
                h = this.isInfinite ? [-1, 0, 1] : [0];
            for (const t of this.slides)
                for (const e of h) {
                    const s = t.pos + e * n,
                        o = t.pos + t.dim + t.gap + e * n;
                    s < c && o > l && i.add(t)
                }
            return i
        }
        getPageFromPosition(t) {
            const {
                viewportDim: e,
                contentDim: i
            } = this, n = this.pages.length;
            let s = 0,
                o = 0;
            const a = this.option("center");
            a && (t += .5 * e), this.isInfinite || (t = Math.max(this.slides[0].pos, Math.min(t, this.slides[this.slides.length - 1].pos)));
            const r = i + this.slides[this.slides.length - 1].gap,
                l = Math.floor(t / r) || 0;
            t -= l * r;
            let c = this.slides[this.slides.length - 1],
                h = this.slides.find((e => {
                    const i = t + (c && !a ? .5 * c.dim : 0);
                    return c = e, e.pos <= i && e.pos + e.dim + e.gap > i
                }));
            return h || (h = this.slides[this.slides.length - 1]), o = this.getPageForSlide(h.index), s = o + l * n, {
                page: s,
                pageIndex: o
            }
        }
        destroy() {
            if ([lt.Destroy].includes(this.state)) return;
            this.state = lt.Destroy;
            const {
                container: t,
                viewport: e,
                track: i,
                slides: n,
                panzoom: s
            } = this, o = this.option("classes");
            t.removeEventListener("click", this.onClick, {
                passive: !1,
                capture: !1
            }), t.removeEventListener("slideTo", this.onSlideTo), window.removeEventListener("resize", this.onResize), s && (s.destroy(), this.panzoom = null), n && n.forEach((t => {
                this.removeSlideEl(t)
            })), this.detachPlugins(), this.track = null, this.viewport = null, this.page = 0, e && i && e.replaceWith(...i.childNodes);
            for (const [e, i] of Object.entries(o)) "container" !== e && i && t.classList.remove(i);
            this.slides = [];
            const a = this.events.get("ready");
            this.events = new Map, a && this.events.set("ready", a)
        }
    }
    Object.defineProperty(gt, "Panzoom", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: B
    }), Object.defineProperty(gt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: rt
    }), Object.defineProperty(gt, "Plugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: ft
    });
    let bt = null,
        vt = null;
    const yt = new Map;
    let wt = 0;
    class xt extends m {
        get isIdle() {
            return this.idle
        }
        get isCompact() {
            return this.option("compact")
        }
        constructor(t = [], e = {}, i = {}) {
            super(e), Object.defineProperty(this, "userSlides", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: []
            }), Object.defineProperty(this, "userPlugins", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: {}
            }), Object.defineProperty(this, "idle", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "idleTimer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "clickTimer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "prevWheelTime", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "ignoreFocusChange", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: !1
            }), Object.defineProperty(this, "state", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: h.Init
            }), Object.defineProperty(this, "id", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "container", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "footer", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "caption", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "carousel", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "lastFocus", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: null
            }), Object.defineProperty(this, "prevMouseMoveEvent", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "fsAPI", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), this.fsAPI = (() => {
                let t, e = "",
                    i = "",
                    n = "";
                return document.fullscreenEnabled ? (e = "requestFullscreen", i = "exitFullscreen", n = "fullscreenElement") : document.webkitFullscreenEnabled && (e = "webkitRequestFullscreen", i = "webkitExitFullscreen", n = "webkitFullscreenElement"), e && (t = {
                    request: function(t) {
                        return "webkitRequestFullscreen" === e ? t[e](Element.ALLOW_KEYBOARD_INPUT) : t[e]()
                    },
                    exit: function() {
                        return document[n] && document[i]()
                    },
                    isFullscreen: function() {
                        return document[n]
                    }
                }), t
            })(), this.id = e.id || ++wt, yt.set(this.id, this), this.userSlides = t, this.userPlugins = i, queueMicrotask((() => {
                this.init()
            }))
        }
        init() {
            this.state = h.Init, this.attachPlugins(Object.assign(Object.assign({}, xt.Plugins), this.userPlugins)), this.emit("init"), !0 === this.option("hideScrollbar") && (() => {
                if (!s) return;
                if (document.body.classList.contains("compensate-for-scrollbar")) return;
                const t = window.innerWidth - document.documentElement.getBoundingClientRect().width;
                document.documentElement.style.setProperty("--fancybox-scrollbar-compensate", `${t}px`), t && document.body.classList.add("compensate-for-scrollbar")
            })(), this.initLayout();
            const t = () => {
                this.initCarousel(this.userSlides), this.state = h.Ready, this.attachEvents(), this.emit("ready"), setTimeout((() => {
                    this.container && this.container.setAttribute("aria-hidden", "false")
                }), 16)
            };
            this.option("Fullscreen.autoStart") && this.fsAPI && !this.fsAPI.isFullscreen() ? this.fsAPI.request(this.container).then((() => t())).catch((() => t())) : t()
        }
        initLayout() {
            const t = this.option("parentEl") || document.body,
                e = n(this.localize(this.option("tpl.main") || ""));
            e && (e.setAttribute("id", `fancybox-${this.id}`), e.setAttribute("aria-label", this.localize("{{MODAL}}")), e.classList.toggle("is-compact", this.isCompact), this.container = e, this.footer = e.querySelector(".fancybox__footer"), t.appendChild(e), document.documentElement.classList.add("with-fancybox"), bt && vt || (bt = document.createElement("button"), bt.classList.add("fancybox-focus-guard"), bt.setAttribute("aria-hidden", "true"), bt.setAttribute("aria-label", "Focus guard"), bt.setAttribute("type", "button"), vt = bt.cloneNode(), document.body.prepend(bt), document.body.append(vt)), this.option("animated") && (e.classList.add("is-animated"), setTimeout((() => {
                this.isClosing() || e.classList.remove("is-animated")
            }), 350)), this.emit("initLayout"))
        }
        initCarousel(t) {
            const e = this.container;
            if (!e) return;
            const n = e.querySelector(".fancybox__carousel");
            if (!n) return;
            const s = this.carousel = new gt(n, i({}, {
                slides: t,
                transition: "fade",
                Panzoom: {
                    lockAxis: this.option("dragToClose") ? "xy" : "x",
                    infinite: !!this.option("dragToClose") && "y"
                },
                Dots: !1,
                Navigation: {
                    classes: {
                        container: "fancybox__nav",
                        button: "f-button",
                        isNext: "is-next",
                        isPrev: "is-prev"
                    }
                },
                initialPage: this.option("startIndex"),
                l10n: this.option("l10n")
            }, this.option("Carousel") || {}));
            s.on("*", ((t, e, ...i) => {
                this.emit(`Carousel.${e}`, t, ...i)
            })), s.on(["ready", "change"], (() => {
                this.manageCaption(this.getSlide())
            })), s.on("removeSlide", ((t, e) => {
                e.closeBtnEl && e.closeBtnEl.remove(), e.closeBtnEl = void 0, e.captionEl && e.captionEl.remove(), e.captionEl = void 0, e.spinnerEl && e.spinnerEl.remove(), e.spinnerEl = void 0, e.state = void 0
            })), s.on("Panzoom.touchStart", (() => {
                this.isCompact || this.endIdle()
            })), s.on("settle", (() => {
                this.idleTimer || this.isCompact || !this.option("idle") || this.setIdle(), this.option("autoFocus") && this.checkFocus()
            })), this.option("dragToClose") && (s.on("Panzoom.afterTransform", ((t, e) => {
                const i = this.container;
                if (i) {
                    const t = Math.abs(e.current.f),
                        n = t < 1 ? "" : Math.max(.5, Math.min(1, 1 - t / e.contentRect.fitHeight * 1.5));
                    i.style.setProperty("--fancybox-ts", n ? "0s" : ""), i.style.setProperty("--fancybox-opacity", n + "")
                }
            })), s.on("Panzoom.touchEnd", ((t, e, i) => {
                const n = Math.abs(e.dragOffset.y);
                "y" === e.lockedAxis && (n >= 200 || n >= 50 && e.dragOffset.time < 300) && (i && i.cancelable && i.preventDefault(), this.close(i, "f-throwOut" + (e.current.f < 0 ? "Up" : "Down")))
            }))), s.on(["change"], (t => {
                var e;
                let i = null === (e = this.getSlide()) || void 0 === e ? void 0 : e.triggerEl;
                if (i) {
                    const e = new CustomEvent("slideTo", {
                        bubbles: !0,
                        cancelable: !0,
                        detail: t.page
                    });
                    i.dispatchEvent(e)
                }
            })), s.on(["refresh", "change"], (t => {
                const e = this.container;
                if (!e) return;
                for (const i of e.querySelectorAll("[data-fancybox-current-index]")) i.innerHTML = t.page + 1;
                for (const i of e.querySelectorAll("[data-fancybox-count]")) i.innerHTML = t.pages.length;
                if (!t.isInfinite) {
                    for (const i of e.querySelectorAll("[data-fancybox-next]")) t.page < t.pages.length - 1 ? (i.removeAttribute("disabled"), i.removeAttribute("tabindex")) : (i.setAttribute("disabled", ""), i.setAttribute("tabindex", "-1"));
                    for (const i of e.querySelectorAll("[data-fancybox-prev]")) t.page > 0 ? (i.removeAttribute("disabled"), i.removeAttribute("tabindex")) : (i.setAttribute("disabled", ""), i.setAttribute("tabindex", "-1"))
                }
                const i = this.getSlide();
                let n = (null == i ? void 0 : i.downloadSrc) || "";
                n || !i || "image" !== i.type || i.error || "string" != typeof i.src || (n = i.src);
                for (const t of e.querySelectorAll("[data-fancybox-download]")) n ? (t.removeAttribute("disabled"), t.removeAttribute("tabindex"), t.setAttribute("href", n), t.setAttribute("download", n), t.setAttribute("target", "_blank")) : (t.setAttribute("disabled", ""), t.setAttribute("tabindex", "-1"), t.removeAttribute("href"), t.removeAttribute("download"))
            })), this.emit("initCarousel")
        }
        attachEvents() {
            const t = this.container;
            t && (document.addEventListener("keydown", this.onKeydown, {
                passive: !1,
                capture: !0
            }), t.addEventListener("wheel", this.onWheel, {
                passive: !1,
                capture: !1
            }), t.addEventListener("click", this.onClick, {
                passive: !1,
                capture: !1
            }), document.addEventListener("mousemove", this.onMousemove), window.addEventListener("resize", this.onResize), this.option("trapFocus") && document.addEventListener("focus", this.onFocus, !0), document.addEventListener("visibilitychange", this.onVisibilityChange, !1))
        }
        detachEvents() {
            const t = this.container;
            t && (document.removeEventListener("keydown", this.onKeydown, {
                passive: !1,
                capture: !0
            }), t.removeEventListener("wheel", this.onWheel, {
                passive: !1,
                capture: !1
            }), t.removeEventListener("click", this.onClick, {
                passive: !1,
                capture: !1
            }), document.removeEventListener("mousemove", this.onMousemove), window.removeEventListener("resize", this.onResize), document.removeEventListener("visibilitychange", this.onVisibilityChange, !1), document.removeEventListener("focus", this.onFocus, !0))
        }
        onClick(t) {
            var e, i;
            if (this.isClosing()) return;
            !this.isCompact && this.option("idle") && this.resetIdle();
            const n = t.composedPath()[0];
            if (n === (null === (e = this.carousel) || void 0 === e ? void 0 : e.container)) return;
            if (n.closest(".f-spinner") || n.closest("[data-fancybox-close]")) return t.preventDefault(), void this.close(t);
            if (n.closest("[data-fancybox-prev]")) return t.preventDefault(), void this.prev();
            if (n.closest("[data-fancybox-next]")) return t.preventDefault(), void this.next();
            if (this.isCompact && "image" === (null === (i = this.getSlide()) || void 0 === i ? void 0 : i.type)) return void(this.clickTimer ? (clearTimeout(this.clickTimer), this.clickTimer = null) : this.clickTimer = setTimeout((() => {
                this.toggleIdle(), this.clickTimer = null
            }), 350));
            if (this.emit("click", t), t.defaultPrevented) return;
            let s = !1;
            const o = document.activeElement;
            if (n.closest(".fancybox__content")) {
                if (o) {
                    if (o.closest("[contenteditable]")) return;
                    n.matches(a) || o.blur()
                }
                if ((r = window.getSelection()) && "Range" === r.type) return;
                s = this.option("contentClick")
            } else n.closest(".fancybox__carousel") && !n.matches(a) && (s = this.option("backdropClick"));
            var r;
            "close" === s ? (t.preventDefault(), this.close(t)) : "next" === s ? (t.preventDefault(), this.next()) : "prev" === s && (t.preventDefault(), this.prev())
        }
        onWheel(t) {
            const e = t.wheelDeltaY ? t.wheelDeltaY === -3 * t.deltaY : 0 === t.deltaMode,
                i = Date.now();
            if (this.prevWheelTime && i - this.prevWheelTime < (e ? 600 : 300)) return void t.preventDefault();
            if (this.prevWheelTime = i, this.emit("wheel", t), t.defaultPrevented) return;
            const n = this.option("wheel", t);
            if ("close" === n) t.preventDefault(), this.close(t);
            else if ("slide" === n) {
                t.preventDefault();
                this[Math.max(-1, Math.min(1, -t.deltaY || -t.deltaX || -t.detail)) > 0 ? "prev" : "next"]()
            }
        }
        onKeydown(t) {
            if (!this.isTopmost()) return;
            this.isCompact || !this.option("idle") || this.isClosing() || this.resetIdle();
            const e = t.key,
                i = this.option("keyboard");
            if (!i || t.ctrlKey || t.altKey || t.shiftKey) return;
            const n = t.composedPath()[0],
                s = document.activeElement && document.activeElement.classList,
                o = s && s.contains("f-button") || n.dataset.carouselPage;
            if ("Escape" !== e && !o && z(n)) {
                if (n.isContentEditable || -1 !== ["BUTTON", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].indexOf(n.nodeName)) return
            }
            this.emit("keydown", e, t);
            const a = i[e];
            "function" == typeof this[a] && this[a]()
        }
        onResize() {
            const t = this.container;
            if (!t) return;
            const e = this.isCompact;
            t.classList.toggle("is-compact", e), this.manageCaption(this.getSlide()), this.isCompact ? this.clearIdle() : this.endIdle(), this.emit("resize")
        }
        onFocus(t) {
            this.isTopmost() && this.focus(t)
        }
        onMousemove(t) {
            this.prevMouseMoveEvent = t, !this.isCompact && this.option("idle") && this.resetIdle()
        }
        onVisibilityChange() {
            "visible" === document.visibilityState ? this.checkFocus() : this.endIdle()
        }
        manageCloseBtn(t) {
            const e = this.optionFor(t, "closeButton") || !1;
            if ("auto" === e) {
                const t = this.plugins.Toolbar;
                if (t && t.state === tt.Ready) return
            }
            if (!e) return;
            if (!t.contentEl || t.closeBtnEl) return;
            const i = n(this.localize(this.option("tpl.closeButton")));
            t.closeBtnEl = t.contentEl.appendChild(i), t.el && k(t.el, "has-close-btn")
        }
        manageCaption(t) {
            var e, i, n;
            const s = this.container;
            if (!s) return;
            const o = this.isCompact || this.option("commonCaption"),
                a = !o;
            if (this.caption && this.stop(this.caption), a && this.caption && (this.caption.remove(), this.caption = null), o && !this.caption)
                for (const t of (null === (e = this.carousel) || void 0 === e ? void 0 : e.slides) || []) t.captionEl && (t.captionEl.remove(), t.captionEl = void 0, null === (i = t.el) || void 0 === i || i.classList.remove("has-caption"), null === (n = t.el) || void 0 === n || n.removeAttribute("aria-labelledby"));
            if (t || (t = this.getSlide()), !t || o && !this.isCurrentSlide(t)) return;
            const r = t.el;
            let l = this.optionFor(t, "caption", "");
            if ("string" != typeof l || !l.length) return void(o && this.caption && this.animate(this.caption, "f-fadeOut", (() => {
                var t;
                null === (t = this.caption) || void 0 === t || t.remove(), this.caption = null
            })));
            let c = null;
            if (a) {
                if (c = t.captionEl || null, r && !c) {
                    const e = `fancybox__caption_${this.id}_${t.index}`;
                    c = document.createElement("div"), c.className = "fancybox__caption", c.setAttribute("id", e), t.captionEl = r.appendChild(c), r.classList.add("has-caption"), r.setAttribute("aria-labelledby", e)
                }
            } else {
                if (c = this.caption, c || (c = s.querySelector(".fancybox__caption")), !c) {
                    c = document.createElement("div"), c.dataset.fancyboxCaption = "", c.className = "fancybox__caption", c.innerHTML = l;
                    (this.footer || s).prepend(c)
                }
                s.classList.add("has-caption"), this.caption = c
            }
            c && (c.innerHTML = l)
        }
        checkFocus() {
            var t;
            const e = document.activeElement || null;
            e && (null === (t = this.container) || void 0 === t ? void 0 : t.contains(e)) || this.focus()
        }
        focus(t) {
            var e;
            if (this.ignoreFocusChange) return;
            const i = document.activeElement || null,
                n = (null == t ? void 0 : t.target) || null,
                r = this.container,
                l = this.getSlide();
            if (!r || !(null === (e = this.carousel) || void 0 === e ? void 0 : e.viewport)) return;
            const c = l && l.state === d.Ready ? l.el : null;
            if (!c || c.contains(i)) return;
            t && t.cancelable && t.preventDefault(), this.ignoreFocusChange = !0;
            const h = Array.from(r.querySelectorAll(a));
            let u, p = [r];
            for (let t of h) {
                const e = t.offsetParent && !t.closest('[aria-hidden="true"]'),
                    i = c && c.contains(t),
                    n = !this.carousel.viewport.contains(t);
                e && (i || n) ? (p.push(t), void 0 !== t.dataset.origTabindex && (t.tabIndex = parseFloat(t.dataset.origTabindex)), t.removeAttribute("data-orig-tabindex"), (t.hasAttribute("autoFocus") || !u && i) && (u = t)) : (t.dataset.origTabindex = void 0 === t.dataset.origTabindex ? t.getAttribute("tabindex") || void 0 : t.dataset.origTabindex, t.tabIndex = -1)
            }
            let m = null;
            t ? (!n || p.indexOf(n) < 0) && (m = r, p.length && (i === vt ? m = p[0] : this.lastFocus !== r && i !== bt || (m = p[p.length - 1]))) : this.option("autoFocus") && u ? m = u : i && p.indexOf(i) < 0 && (m = r), m && (t => {
                if (t && s) {
                    void 0 === o && document.createElement("div").focus({
                        get preventScroll() {
                            return o = !0, !1
                        }
                    });
                    try {
                        if (o) t.focus({
                            preventScroll: !0
                        });
                        else {
                            const e = window.pageXOffset || document.body.scrollTop,
                                i = window.pageYOffset || document.body.scrollLeft;
                            t.focus(), document.body.scrollTo({
                                top: e,
                                left: i,
                                behavior: "auto"
                            })
                        }
                    } catch (t) {}
                }
            })(m), this.lastFocus = document.activeElement, this.ignoreFocusChange = !1
        }
        next() {
            const t = this.carousel;
            t && t.pages.length > 1 && t.slideNext()
        }
        prev() {
            const t = this.carousel;
            t && t.pages.length > 1 && t.slidePrev()
        }
        jumpTo(...t) {
            this.carousel && this.carousel.slideTo(...t)
        }
        isTopmost() {
            var t;
            return (null === (t = xt.getInstance()) || void 0 === t ? void 0 : t.id) == this.id
        }
        animate(t = null, e = "", i) {
            if (!t || !e) return void(i && i());
            this.stop(t);
            const n = s => {
                s.target === t && t.dataset.animationName && (t.removeEventListener("animationend", n), delete t.dataset.animationName, i && i(), t.classList.remove(e))
            };
            t.dataset.animationName = e, t.addEventListener("animationend", n), t.classList.add(e)
        }
        stop(t) {
            t && t.dispatchEvent(new CustomEvent("animationend", {
                bubbles: !1,
                cancelable: !0,
                currentTarget: t
            }))
        }
        setContent(t, e = "", i = !0) {
            if (this.isClosing()) return;
            const n = t.el;
            if (!n) return;
            let s = null;
            if (z(e))["img", "iframe", "video", "audio"].includes(e.nodeName.toLowerCase()) ? (s = document.createElement("div"), s.appendChild(e)) : s = e;
            else {
                const t = document.createRange().createContextualFragment(e);
                s = document.createElement("div"), s.appendChild(t)
            }
            s instanceof Element && t.filter && !t.error && (s = s.querySelector(t.filter)), s instanceof Element ? (s.classList.add("fancybox__content"), t.id && s.setAttribute("id", t.id), "none" !== s.style.display && "none" !== getComputedStyle(s).getPropertyValue("display") || (s.style.display = t.display || this.option("defaultDisplay") || "flex"), n.classList.add(`has-${t.error?"error":t.type||"unknown"}`), n.prepend(s), t.contentEl = s, i && this.revealContent(t), this.manageCloseBtn(t), this.manageCaption(t)) : this.setError(t, "{{ELEMENT_NOT_FOUND}}")
        }
        revealContent(t, e) {
            const i = t.el,
                n = t.contentEl;
            i && n && (this.emit("reveal", t), this.hideLoading(t), t.state = d.Opening, (e = this.isOpeningSlide(t) ? void 0 === e ? this.optionFor(t, "showClass") : e : "f-fadeIn") ? this.animate(n, e, (() => {
                this.done(t)
            })) : this.done(t))
        }
        done(t) {
            var e;
            this.isClosing() || (t.state = d.Ready, this.emit("done", t), null === (e = t.el) || void 0 === e || e.classList.add("is-done"), this.isCurrentSlide(t) && this.option("autoFocus") && queueMicrotask((() => {
                var t;
                if (this.option("autoFocus")) {
                    const e = document.activeElement || null;
                    e && (null === (t = this.container) || void 0 === t ? void 0 : t.contains(e)) || this.focus()
                }
            })), this.isOpeningSlide(t) && !this.isCompact && this.option("idle") && this.setIdle())
        }
        isCurrentSlide(t) {
            const e = this.getSlide();
            return !(!t || !e) && e.index === t.index
        }
        isOpeningSlide(t) {
            var e, i;
            return null === (null === (e = this.carousel) || void 0 === e ? void 0 : e.prevPage) && t.index === (null === (i = this.getSlide()) || void 0 === i ? void 0 : i.index)
        }
        showLoading(t) {
            t.state = d.Loading;
            const e = t.el;
            if (!e) return;
            e.classList.add("is-loading"), this.emit("loading", t), t.spinnerEl || setTimeout((() => {
                if (!this.isClosing() && !t.spinnerEl && t.state === d.Loading) {
                    let i = n(r);
                    t.spinnerEl = i, e.prepend(i), this.animate(i, "f-fadeIn")
                }
            }), 250)
        }
        hideLoading(t) {
            const e = t.el;
            if (!e) return;
            const i = t.spinnerEl;
            this.isClosing() ? null == i || i.remove() : (e.classList.remove("is-loading"), i && this.animate(i, "f-fadeOut", (() => {
                i.remove()
            })), t.state === d.Loading && (this.emit("loaded", t), t.state = d.Ready))
        }
        setError(t, e) {
            if (this.isClosing()) return;
            this.emit("error"), t.error = e, this.hideLoading(t), this.clearContent(t);
            const i = document.createElement("div");
            i.classList.add("fancybox-error"), i.innerHTML = this.localize(e || "<p>{{ERROR}}</p>"), this.setContent(t, i)
        }
        clearContent(t) {
            var e;
            null === (e = this.carousel) || void 0 === e || e.emit("removeSlide", t), t.contentEl && (t.contentEl.remove(), t.contentEl = void 0), t.closeBtnEl && (t.closeBtnEl.remove(), t.closeBtnEl = void 0);
            const i = t.el;
            i && (R(i, "is-loading"), R(i, "has-error"), R(i, "has-unknown"), R(i, `has-${t.type||"unknown"}`))
        }
        getSlide() {
            var t;
            const e = this.carousel;
            return (null === (t = null == e ? void 0 : e.pages[null == e ? void 0 : e.page]) || void 0 === t ? void 0 : t.slides[0]) || void 0
        }
        close(t, e) {
            if (this.isClosing()) return;
            const i = new Event("shouldClose", {
                bubbles: !0,
                cancelable: !0
            });
            if (this.emit("shouldClose", i, t), i.defaultPrevented) return;
            t && t.cancelable && (t.preventDefault(), t.stopPropagation());
            const n = this.fsAPI,
                s = () => {
                    this.proceedClose(t, e)
                };
            n && n.isFullscreen() ? Promise.resolve(n.exit()).then((() => s())) : s()
        }
        clearIdle() {
            this.idleTimer && clearTimeout(this.idleTimer), this.idleTimer = null
        }
        setIdle(t = !1) {
            const e = () => {
                var t;
                this.clearIdle(), this.idle = !0, null === (t = this.container) || void 0 === t || t.classList.add("is-idle"), this.emit("setIdle")
            };
            if (this.clearIdle(), !this.isClosing())
                if (t) e();
                else {
                    const t = this.option("idle");
                    t && (this.idleTimer = setTimeout(e, t))
                }
        }
        endIdle() {
            var t;
            this.clearIdle(), this.idle && !this.isClosing() && (this.idle = !1, null === (t = this.container) || void 0 === t || t.classList.remove("is-idle"), this.emit("endIdle"))
        }
        resetIdle() {
            this.endIdle(), this.setIdle()
        }
        toggleIdle() {
            this.idle ? this.endIdle() : this.setIdle(!0)
        }
        toggleFullscreen() {
            const t = this.fsAPI;
            t && (t.isFullscreen() ? t.exit() : this.container && t.request(this.container))
        }
        isClosing() {
            return [h.Closing, h.CustomClosing, h.Destroy].includes(this.state)
        }
        proceedClose(t, e) {
            var i, n;
            this.state = h.Closing, this.clearIdle(), this.detachEvents();
            const s = this.container,
                o = this.carousel,
                a = this.getSlide();
            if (a) {
                const t = this.option("placeFocusBack") ? (null === (i = this.getSlide()) || void 0 === i ? void 0 : i.triggerEl) || this.option("trigger") : null;
                t && t.focus()
            }
            if (s && (k(s, "is-closing"), s.setAttribute("aria-hidden", "true"), this.option("animated") && k(s, "is-animated"), s.style.pointerEvents = "none"), o) {
                o.clearTransitions(), null === (n = o.panzoom) || void 0 === n || n.destroy();
                for (const t of o.slides) {
                    t.state = d.Closing, this.hideLoading(t);
                    const e = t.contentEl;
                    e && this.stop(e);
                    const i = null == t ? void 0 : t.panzoom;
                    i && (i.stop(), i.detachEvents(), i.detachObserver()), this.isCurrentSlide(t) || o.emit("removeSlide", t)
                }
            }
            this.emit("close", t), this.state !== h.CustomClosing ? (void 0 === e && a && (e = this.optionFor(a, "hideClass")), e && a ? (this.animate(a.contentEl, e, (() => {
                o && o.emit("removeSlide", a)
            })), setTimeout((() => {
                this.destroy()
            }), 350)) : this.destroy()) : setTimeout((() => {
                this.destroy()
            }), 350)
        }
        destroy() {
            var t;
            if (this.state === h.Destroy) return;
            this.state = h.Destroy, null === (t = this.carousel) || void 0 === t || t.destroy();
            const e = this.container;
            e && e.remove(), yt.delete(this.id);
            const i = xt.getInstance();
            i ? i.focus() : (bt && (bt.remove(), bt = null), vt && (vt.remove(), vt = null), document.documentElement.classList.remove("with-fancybox"), s && (document.documentElement.style.setProperty("--fancybox-scrollbar-compensate", ""), document.body.classList.remove("compensate-for-scrollbar")))
        }
        static bind(t, e, i) {
            if (!s) return;
            let n, o = "",
                a = {};
            if ("string" == typeof t ? (n = document.body, o = t, "object" == typeof e && (a = e || {})) : (n = t, "string" == typeof e && (o = e), "object" == typeof i && (a = i || {})), !n) return;
            o = o || "[data-fancybox]";
            const r = xt.openers.get(n) || new Map;
            r.set(o, a), xt.openers.set(n, r), 1 === r.size && n.addEventListener("click", xt.fromEvent)
        }
        static unbind(t, e) {
            let i, n = "";
            if ("string" == typeof t ? (i = document.body, n = t) : (i = t, "string" == typeof e && (n = e)), !i) return;
            const s = xt.openers.get(i);
            s && n && s.delete(n), n && s || (xt.openers.delete(i), i.removeEventListener("click", xt.fromEvent))
        }
        static destroy() {
            let t;
            for (; t = xt.getInstance();) t.destroy();
            for (const t of xt.openers.keys()) t.removeEventListener("click", xt.fromEvent);
            xt.openers = new Map
        }
        static fromEvent(t) {
            if (t.defaultPrevented) return;
            if (t.button && 0 !== t.button) return;
            if (t.ctrlKey || t.metaKey || t.shiftKey) return;
            let e = t.composedPath()[0];
            const n = e.closest("[data-fancybox-trigger]");
            if (n) {
                const t = n.dataset.fancyboxTrigger || "",
                    i = document.querySelectorAll(`[data-fancybox="${t}"]`),
                    s = parseInt(n.dataset.fancyboxIndex || "", 10) || 0;
                e = i[s] || e
            }
            if (!(e && e instanceof Element)) return;
            let s, o, a, r;
            if ([...xt.openers].reverse().find((([t, i]) => !(!t.contains(e) || ![...i].reverse().find((([i, n]) => {
                    let l = e.closest(i);
                    return !!l && (s = t, o = i, a = l, r = n, !0)
                }))))), !s || !o || !a) return;
            r = r || {}, t.preventDefault(), e = a;
            let l = [],
                h = i({}, c, r);
            h.event = t, h.trigger = e, h.delegate = n;
            const d = h.groupAll,
                u = h.groupAttr,
                p = u && e ? e.getAttribute(`${u}`) : "";
            if ((!e || p || d) && (l = [].slice.call(s.querySelectorAll(o))), e && !d && (l = p ? l.filter((t => t.getAttribute(`${u}`) === p)) : [e]), !l.length) return;
            const m = xt.getInstance();
            return m && m.options.trigger && l.indexOf(m.options.trigger) > -1 ? void 0 : (e && (h.startIndex = l.indexOf(e)), xt.fromNodes(l, h))
        }
        static fromNodes(t, e) {
            e = i({}, c, e);
            const n = [];
            for (const i of t) {
                const t = i.dataset || {},
                    s = t.src || i.getAttribute("href") || i.getAttribute("currentSrc") || i.getAttribute("src") || void 0;
                let o;
                const a = e.delegate;
                let r;
                a && n.length === e.startIndex && (o = a instanceof HTMLImageElement ? a : a.querySelector("img:not([aria-hidden])")), o || (o = i instanceof HTMLImageElement ? i : i.querySelector("img:not([aria-hidden])")), o && (r = o.currentSrc || o.src || void 0, !r && o.dataset && (r = o.dataset.lazySrc || o.dataset.src || void 0));
                const l = {
                    src: s,
                    triggerEl: i,
                    thumbEl: o,
                    thumbElSrc: r,
                    thumbSrc: r
                };
                for (const e in t) "fancybox" !== e && (l[e] = t[e] + "");
                n.push(l)
            }
            return new xt(n, e)
        }
        static getInstance(t) {
            if (t) return yt.get(t);
            return Array.from(yt.values()).reverse().find((t => !t.isClosing() && t)) || null
        }
        static getSlide() {
            var t;
            return (null === (t = xt.getInstance()) || void 0 === t ? void 0 : t.getSlide()) || null
        }
        static show(t = [], e = {}) {
            return new xt(t, e)
        }
        static next() {
            const t = xt.getInstance();
            t && t.next()
        }
        static prev() {
            const t = xt.getInstance();
            t && t.prev()
        }
        static close(t = !0, ...e) {
            if (t)
                for (const t of yt.values()) t.close(...e);
            else {
                const t = xt.getInstance();
                t && t.close(...e)
            }
        }
    }
    Object.defineProperty(xt, "version", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "5.0.6"
    }), Object.defineProperty(xt, "defaults", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: c
    }), Object.defineProperty(xt, "Plugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: st
    }), Object.defineProperty(xt, "openers", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Map
    }), t.Fancybox = xt
}));

$(document).ready(function() {
  $('[data-fancybox="gallery"]').fancybox({
    closeClickOutside: true, // 배경 클릭으로 갤러리 닫히도록 설정
    touch: {
      vertical: false, // 수직 방향 스와이프 금지
    },
    loop: true,
    thumbs: {
      autoStart: true,
    },
  });
});
