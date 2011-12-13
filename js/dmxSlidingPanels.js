/*
 Sliding Panels
 Version: 1.0.6
 (c) 2011 DMXzone.com
 @build 06-09-2011 15:40:21
*/
(function (b) {
    var V = {
        fast: 0.9,
        normal: 0.95,
        slow: 0.97
    },
        W = {
            fast: 200,
            normal: 400,
            slow: 600
        };
    b.fn.dmxSlidingPanels = function (h) {
        return this.each(function () {
            h = h || {};
            if (h.deceleration != null) h.friction = h.deceleration;
            if (h.scrollSpeed != null) h.transitionDuration = h.scrollSpeed;
            b.extend(this, new b.dmxSlidingPanels(this, h))
        })
    };
    b.dmxSlidingPanels = function (h, X) {
        function L() {
            p = e.width();
            g = e.height();
            d.autoHeight && (g = e.parent().innerHeight(), e.siblings().each(function () {
                g -= b(this).outerHeight(!0)
            }), g -= e.outerHeight(!0) - e.height(), e.height(g));
            i.each(function (a) {
                var d = parseInt(b(this).css("padding-left"), 10) || 0;
                d += parseInt(b(this).css("padding-right"), 10) || 0;
                var c = parseInt(b(this).css("padding-top"), 10) || 0;
                c += parseInt(b(this).css("padding-bottom"), 10) || 0;
                b(this).css({
                    left: a * p,
                    width: p - d,
                    minHeight: g - c
                })
            })
        }
        function Y() {
            b(window).bind("resize", M);
            b(window).bind("orientationchange", M);
            e.bind(Z, $);
            d.mousewheel && e.mousewheel && e.mousewheel(aa);
            b(d.prevPage).click(function (a) {
                a.preventDefault();
                k.prevPage(!0)
            });
            b(d.nextPage).click(function (a) {
                a.preventDefault();
                k.nextPage(!0)
            });
            v.each(function () {
                b("a", this).each(function (a) {
                    b(this).bind("click", {
                        page: a
                    }, function (a) {
                        a.preventDefault();
                        k.moveToPage(a.data.page, !0)
                    })
                })
            })
        }
        function $(a) {
            if (!(b.inArray(a.target.tagName.toLowerCase(), d.ignoreDragOn) > -1)) a.preventDefault(), document.addEventListener && e[0].addEventListener("click", N, !0), O = a.target, D(), A = P(a), j = [], j.push({
                timeStamp: a.timeStamp,
                position: A
            }), t = !1, b(document).bind(Q, R), b(document).bind(S, E), b(document).bind("touchcancelled", T)
        }
        function R(a) {
            a.preventDefault();
            var b = P(a),
                c = {
                    x: b.x - j[j.length - 1].position.x,
                    y: b.y - j[j.length - 1].position.y
                };
            if (!t && (Math.abs(c.x) > d.minTrackForDrag || Math.abs(c.y) > d.minTrackForDrag)) F = t = !0;
            if (t) if (a.stopPropagation(), F) F = !1, x = !! (r > 1 && Math.abs(c.x) > Math.abs(c.y)), A = b, x ? (y(!1), m.fadeOut(d.scrollbarFadeDuration)) : m.fadeIn(d.scrollbarFadeDuration);
            else {
                A = b;
                if (x) {
                    var f = (r - 1) * p * -1,
                        e = s(n).left;
                    B(n, Math.min(Math.max(e + c.x, f), 0), 0, !1)
                } else {
                    e = i.eq(l);
                    f = s(e).top;
                    e = g - e.outerHeight();
                    f += c.y;
                    if (d.bounce) {
                        if (f < e || f > 0) f -= c.y / 2
                    } else f = Math.min(Math.max(f, e), 0);
                    k.scrollTo(-f, !1)
                }
                j.push({
                    timeStamp: a.timeStamp,
                    position: b
                })
            }
        }
        function E(a) {
            b(document).unbind(Q, R);
            b(document).unbind(S, E);
            b(document).unbind("touchcancelled", T);
            if (document.addEventListener && !t) {
                var q = O;
                for (e[0].removeEventListener("click", N, !0); q.nodeType != 1;) q = q.parentNode;
                b(q).trigger("focus");
                if (u) {
                    var c = a.originalEvent,
                        f = document.createEvent("MouseEvents");
                    f.initMouseEvent("click", !0, !0, c.view, 1, c.changedTouches ? c.changedTouches[0].screenX : c.screenX, c.changedTouches ? c.changedTouches[0].screenY : c.screenY, c.changedTouches ? c.changedTouches[0].clientX : c.clientX, c.changedTouches ? c.changedTouches[0].clientY : c.clientY, c.ctrlKey, c.altKey, c.shiftKey, c.metaKey, 0, null);
                    q.dispatchEvent(f)
                }
            }
            if (t) {
                a.stopPropagation();
                for (t = !1; j.length > 0;) {
                    if (a.timeStamp - j[0].timeStamp <= d.maxTimeTrackingData) break;
                    j.shift()
                }
                j.length > 1 && (a = j[0], q = j[j.length - 1], o = (x ? q.position.x - a.position.x : q.position.y - a.position.y) / (q.timeStamp - a.timeStamp), o *= d.animFrameRate, x ? Math.abs(o) > d.minVelocityForPaging && (w = !0, o > 0 ? k.prevPage(!0) : k.nextPage(!0)) : d.decelerate && Math.abs(o) > d.minVelocityForDeceleration && (w = !0, U = setInterval(ba, d.animFrameRate)))
            }
            w || (y(!0), m.fadeOut(d.scrollbarFadeDuration))
        }
        function N(a) {
            a.preventDefault();
            a.stopPropagation()
        }
        function T(a) {
            E(a)
        }
        function M() {
            p = e.width();
            g = e.height();
            i.css({
                minHeight: g
            });
            L();
            y(!0)
        }
        function aa(a, d) {
            a.preventDefault();
            var c = i.eq(l),
                b = parseInt(c.css("line-height"), 10) * 3 || 50;
            d < 0 && (b *= -1);
            D();
            var e = s(c);
            B(c, e.left + 0, e.top + b, !1);
            y(!1)
        }
        function G() {
            w = !1;
            m.fadeOut(d.scrollbarFadeDuration)
        }

        function ba() {
            if (w) {
                var a = i.eq(l),
                    b = s(a).top;
                b += o;
                if (!d.bounce && (b < g - a.outerHeight() || b > 0)) b = Math.min(Math.max(b, g - a.outerHeight()), 0), o = 0;
                k.scrollTo(-b, !1);
                o *= d.friction;
                if (Math.abs(o) < d.minVelocity) m.fadeOut(d.scrollbarFadeDuration), o = 0, D(), y(!0);
                else if (d.bounce && (b < g - a.outerHeight() || b > 0)) o *= 0.5
            }
        }
        function D() {
            clearInterval(U);
            w = !1;
            u ? (n.css({
                webkitTransitionDuration: 0
            }), i.css({
                webkitTransitionDuration: 0
            })) : (n.stop(), i.stop())
        }
        function y(a) {
            var b = s(n).left;
            k.moveToPage(Math.round(b / p) * -1, a);
            var c = i.eq(l),
                b = s(c).top,
                c = Math.min(Math.max(b, g - c.outerHeight()), 0);
            b != c ? (c *= -1, m.hide(), k.scrollTo(c, a)) : m.fadeOut(d.scrollbarFadeDuration)
        }
        function P(a) {
            a = a.originalEvent.touches && a.originalEvent.touches.length > 0 ? a.originalEvent.touches[0] : a;
            return {
                x: a.pageX,
                y: a.pageY
            }
        }
        function B(a, b, c, e) {
            var g = s(a);
            g.left == b && g.top == c || (u ? a.css({
                webkitTransitionDuration: e ? d.transitionDuration : "0",
                webkitTransform: "translate3d(" + b + "px," + c + "px,0px)"
            }) : (a.stop(), e ? a.animate({
                left: b,
                top: c
            }, d.transitionDuration, "swing", G) : a.css({
                left: b,
                top: c
            })))
        }
        function s(a) {
            return u ? (a = new WebKitCSSMatrix(window.getComputedStyle(b(a)[0]).webkitTransform), {
                left: a.e,
                top: a.f
            }) : b(a).position()
        }
        function H(a) {
            typeof a == "string" && a.length > 0 ? (a = a.replace("##index##", l), eval(a)) : b.isFunction(a) && a.call(i.eq(l), l)
        }
        var k = this,
            e = b(h),
            n = null,
            i = null,
            v = null,
            I = null,
            C = null,
            m = null,
            p = 0,
            g = 0,
            r = 0,
            l = 0,
            J = !! ("ontouchstart" in window),
            u = !! (navigator.platform == "iPhone" || navigator.platform == "iPad" || navigator.platform == "iPod"),
            x = !1,
            t = !1,
            F = !1,
            w = !1,
            U = 0,
            o = 0,
            j = [],
            A = {
                x: 0,
                y: 0
            },
            z = 0,
            K = !1,
            O = null,
            Z = J ? "touchstart" : "mousedown",
            Q = J ? "touchmove" : "mousemove",
            S = J ? "touchend" : "mouseup",
            d = b.extend({}, b.dmxSlidePanelDefaults, X);
        b.extend(k, {
            version: "1.0.6",
            currentPage: function () {
                return l
            },
            totalPages: function () {
                return r
            },
            prevPage: function (a) {
                k.moveToPage(l - 1, a)
            },
            nextPage: function (a) {
                k.moveToPage(l + 1, a)
            },
            moveToPage: function (a, e) {
                if (typeof a == "string") for (var a = a.replace("#", ""), c = 0; c < i.length; ++c) if (i.eq(c).attr("id") == a) {
                    a = c;
                    break
                }
                isNaN(a) || (a = Math.min(Math.max(a, 0), r - 1), l != a && (H(d.onPageHide), l = a, H(d.onPageShow)), b(d.currentPageText).text(l + 1), v.each(function () {
                    b("a", this).removeClass("selected").eq(l).addClass("selected")
                }), C.removeClass("disabled"), I.removeClass("disabled"), a == 0 ? C.addClass("disabled") : a == r - 1 && I.addClass("disabled"), a *= -1, B(n, a * p, 0, e))
            },
            scrollTo: function (a, e) {
                var c = i.eq(l);
                if (typeof a == "string") for (var a = a.replace("#", ""), f = b("a", n), j = 0; j < f.length; ++j) {
                    var h = f.eq(j);
                    if (h.attr("name") == a) {
                        c = h.closest("." + d.pageClass);
                        f = c.outerHeight() - g;
                        k.moveToPage(i.index(c), e);
                        a = Math.min(Math.max(h.position().top, 0), f);
                        break
                    }
                }
                if (!isNaN(a)) f = g / c.outerHeight(), h = f * a, f *= g - 10, a < 0 ? (f = Math.max(5, f + h), h = 5) : a > c.outerHeight() - g && (f = Math.max(5, g - h - 5)), m.css({
                    top: h,
                    height: f
                }), h = s(c).left, a *= -1, B(c, u ? 0 : h, a, e)
            },
            play: function () {
                z == 0 && (z = setInterval(function () {
                    l == r - 1 ? K = !0 : l == 0 && (K = !1);
                    K ? k.prevPage(!0) : k.nextPage(!0)
                }, d.autoPlayInterval))
            },
            stop: function () {
                z != 0 && (clearInterval(z), z = 0)
            }
        });
        (function () {
            if (typeof d.friction == "string") d.friction = V[d.friction];
            if (typeof d.transitionDuration == "string") d.transitionDuration = W[d.transitionDuration];
            d.friction = Math.min(Math.max(d.friction, 0), 1);
            d.transitionDuration += u ? "ms" : "";
            n = e.wrapInner("<div></div>").find("> div");
            i = n.children().addClass(d.pageClass);
            m = b('<div class="' + d.scrollbarClass + '"></div>').appendTo(e);
            r = i.length;
            b(d.totalPagesText).text(r);
            v = e.parent().find(d.pageNavigation);
            C = b(d.prevPage + " a");
            I = b(d.nextPage + " a");
            v.length == 0 && (v = b(d.pageNavigation));
            v.each(function () {
                b("a", this).eq(0).addClass("selected")
            });
            C.addClass("disabled");
            b.each(["padding-top", "padding-right", "padding-bottom", "padding-left"], function (a, c) {
                var d = parseInt(e.css(c), 10) || 0;
                d > 0 && i.each(function () {
                    pageValue = parseInt(b(this).css(c), 10) || 0;
                    b(this).css(c, pageValue + d)
                })
            });
            p = e.width();
            g = e.height();
            e.css({
                position: e.css("position") == "static" ? "relative" : e.css("position"),
                overflow: "hidden",
                padding: 0
            });
            n.css({
                position: "absolute",
                left: 0,
                top: 0,
                margin: 0,
                padding: 0
            });
            i.css({
                position: "absolute",
                overflow: "hidden",
                left: 0,
                top: 0,
                width: p,
                height: "auto",
                minHeight: g
            });
            m.css({
                position: "absolute",
                right: 5,
                top: 5,
                width: 5,
                height: 150,
                padding: 0,
                margin: 0
            }).hide();
            if (u) {
                var a = {
                    webkitTransitionProperty: "-webkit-transform",
                    webkitTransitionDuration: 0,
                    webkitTransform: "translate3d(0px,0px,0px)"
                };
                n.css(a).bind("webkitTransitionEnd", G);
                i.css(a).bind("webkitTransitionEnd", G);
                m.css({
                    webkitTransitionProperty: "opacity",
                    webkitTransitionDuration: 200
                })
            }
            L();
            Y();
            window.location.hash && k.moveToPage(window.location.hash, !1);
            d.autoPlay && k.play();
            H(d.onPageShow)
        })()
    };
    b.dmxSlidePanelDefaults = {
        autoHeight: !0,
        autoPlay: !1,
        autoPlayInterval: 5E3,
        bounce: !0,
        decelerate: !0,
        friction: 0.95,
        maxTimeTrackingData: 100,
        animFrameRate: 1E3 / 60,
        minVelocity: 0.05,
        minVelocityForDeceleration: 1,
        minVelocityForPaging: 5,
        minTrackForDrag: 5,
        transitionDuration: 250,
        mousewheel: !0,
        ignoreDragOn: ["input", "select", "textarea", "button"],
        pageClass: "dmxSlidingPanelsPage",
        pageNavigation: ".dmxSlidingPanelsNav",
        currentPageText: ".dmxSlidingPanelsCurrentPage",
        totalPagesText: ".dmxSlidingPanelsTotalPages",
        prevPage: ".dmxSlidingPanelsPrev",
        nextPage: ".dmxSlidingPanelsNext",
        scrollbarClass: "dmxSlidingPanelsScrollbar",
        scrollbarFadeDuration: 200,
        onPageShow: null,
        onPageHide: null
    }
})(jQuery);