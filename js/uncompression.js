function removeHtmlTag(strx, chop) {
    if (strx.indexOf("<") != -1) {
        var s = strx.split("<");
        for (var i = 0; i < s.length; i++) {
            if (s[i].indexOf(">") != -1) {
                s[i] = s[i].substring(s[i].indexOf(">") + 1, s[i].length)
            }
        }
        strx = s.join("")
    }
    chop = (chop < strx.length - 1) ? chop : strx.length - 2;
    while (strx.charAt(chop - 1) != ' ' && strx.indexOf(' ', chop) != -1) chop++;
    strx = strx.substring(0, chop - 1);
    return strx + '...'
}

function masSummaryAndThumb(mas1, mas2) {
    var div = document.getElementById(mas1);
    var imgtag = "";
    var img = div.getElementsByTagName("img");
    var summ = 400;
    if (img.length >= 1) {
        imgtag = '<a href="' + mas2 + '"><span style="float:left; padding:0px 0px 5px 0px;"><span class="play-button"></span><img src="' + img[0].src + '"/></span></a>';
        summ = 400
    }
    var summary = imgtag + '<div class="entry">' + removeHtmlTag(div.innerHTML, summ) + '</div>';
    div.innerHTML = summary
}









//http://yourjavascript.com/013120251122/tabview.js

(function(d) {
    d.tools = d.tools || {};
    d.tools.tabs = {
        version: "1.0.4",
        conf: {
            tabs: "a",
            current: "current",
            onBeforeClick: null,
            onClick: null,
            effect: "default",
            initialIndex: 0,
            event: "click",
            api: false,
            rotate: false
        },
        addEffect: function(e, f) {
            c[e] = f
        }
    };
    var c = {
        "default": function(f, e) {
            this.getPanes().hide().eq(f).show();
            e.call()
        },
        fade: function(g, e) {
            var f = this.getConf(),
                j = f.fadeOutSpeed,
                h = this.getPanes();
            if (j) {
                h.fadeOut(j)
            } else {
                h.hide()
            }
            h.eq(g).fadeIn(f.fadeInSpeed, e)
        },
        slide: function(f, e) {
            this.getPanes().slideUp(200);
            this.getPanes().eq(f).slideDown(400, e)
        },
        ajax: function(f, e) {
            this.getPanes().eq(0).load(this.getTabs().eq(f).attr("href"), e)
        }
    };
    var b;
    d.tools.tabs.addEffect("horizontal", function(f, e) {
        if (!b) {
            b = this.getPanes().eq(0).width()
        }
        this.getCurrentPane().animate({
            width: 0
        }, function() {
            d(this).hide()
        });
        this.getPanes().eq(f).animate({
            width: b
        }, function() {
            d(this).show();
            e.call()
        })
    });

    function a(g, h, f) {
        var e = this,
            j = d(this),
            i;
        d.each(f, function(k, l) {
            if (d.isFunction(l)) {
                j.bind(k, l)
            }
        });
        d.extend(this, {
            click: function(k, n) {
                var o = e.getCurrentPane();
                var l = g.eq(k);
                if (typeof k == "string" && k.replace("#", "")) {
                    l = g.filter("[href*=" + k.replace("#", "") + "]");
                    k = Math.max(g.index(l), 0)
                }
                if (f.rotate) {
                    var m = g.length - 1;
                    if (k < 0) {
                        return e.click(m, n)
                    }
                    if (k > m) {
                        return e.click(0, n)
                    }
                }
                if (!l.length) {
                    if (i >= 0) {
                        return e
                    }
                    k = f.initialIndex;
                    l = g.eq(k)
                }
                if (k === i) {
                    return e
                }
                n = n || d.Event();
                n.type = "onBeforeClick";
                j.trigger(n, [k]);
                if (n.isDefaultPrevented()) {
                    return
                }
                c[f.effect].call(e, k, function() {
                    n.type = "onClick";
                    j.trigger(n, [k])
                });
                n.type = "onStart";
                j.trigger(n, [k]);
                if (n.isDefaultPrevented()) {
                    return
                }
                i = k;
                g.removeClass(f.current);
                l.addClass(f.current);
                return e
            },
            getConf: function() {
                return f
            },
            getTabs: function() {
                return g
            },
            getPanes: function() {
                return h
            },
            getCurrentPane: function() {
                return h.eq(i)
            },
            getCurrentTab: function() {
                return g.eq(i)
            },
            getIndex: function() {
                return i
            },
            next: function() {
                return e.click(i + 1)
            },
            prev: function() {
                return e.click(i - 1)
            },
            bind: function(k, l) {
                j.bind(k, l);
                return e
            },
            onBeforeClick: function(k) {
                return this.bind("onBeforeClick", k)
            },
            onClick: function(k) {
                return this.bind("onClick", k)
            },
            unbind: function(k) {
                j.unbind(k);
                return e
            }
        });
        g.each(function(k) {
            d(this).bind(f.event, function(l) {
                e.click(k, l);
                return false
            })
        });
        if (location.hash) {
            e.click(location.hash)
        } else {
            if (f.initialIndex === 0 || f.initialIndex > 0) {
                e.click(f.initialIndex)
            }
        }
        h.find("a[href^=#]").click(function(k) {
            e.click(d(this).attr("href"), k)
        })
    }
    d.fn.tabs = function(i, f) {
        var g = this.eq(typeof f == "number" ? f : 0).data("tabs");
        if (g) {
            return g
        }
        if (d.isFunction(f)) {
            f = {
                onBeforeClick: f
            }
        }
        var h = d.extend({}, d.tools.tabs.conf),
            e = this.length;
        f = d.extend(h, f);
        this.each(function(l) {
            var j = d(this);
            var k = j.find(f.tabs);
            if (!k.length) {
                k = j.children()
            }
            var m = i.jquery ? i : j.children(i);
            if (!m.length) {
                m = e == 1 ? d(i) : j.parent().find(i)
            }
            g = new a(k, m, f);
            j.data("tabs", g)
        });
        return f.api ? g : this
    }
})(jQuery);

(function(b) {
    var a = b.tools.tabs;
    a.plugins = a.plugins || {};
    a.plugins.slideshow = {
        version: "1.0.2",
        conf: {
            next: ".forward",
            prev: ".backward",
            disabledClass: "disabled",
            autoplay: false,
            autopause: true,
            interval: 3000,
            clickable: true,
            api: false
        }
    };
    b.prototype.slideshow = function(e) {
        var f = b.extend({}, a.plugins.slideshow.conf),
            c = this.length,
            d;
        e = b.extend(f, e);
        this.each(function() {
            var p = b(this),
                m = p.tabs(),
                i = b(m),
                o = m;
            b.each(e, function(t, u) {
                if (b.isFunction(u)) {
                    m.bind(t, u)
                }
            });

            function n(t) {
                return c == 1 ? b(t) : p.parent().find(t)
            }
            var s = n(e.next).click(function() {
                m.next()
            });
            var q = n(e.prev).click(function() {
                m.prev()
            });
            var h, j, l, g = false;
            b.extend(m, {
                play: function() {
                    if (h) {
                        return
                    }
                    var t = b.Event("onBeforePlay");
                    i.trigger(t);
                    if (t.isDefaultPrevented()) {
                        return m
                    }
                    g = false;
                    h = setInterval(m.next, e.interval);
                    i.trigger("onPlay");
                    m.next()
                },
                pause: function() {
                    if (!h) {
                        return m
                    }
                    var t = b.Event("onBeforePause");
                    i.trigger(t);
                    if (t.isDefaultPrevented()) {
                        return m
                    }
                    h = clearInterval(h);
                    l = clearInterval(l);
                    i.trigger("onPause")
                },
                stop: function() {
                    m.pause();
                    g = true
                },
                onBeforePlay: function(t) {
                    return m.bind("onBeforePlay", t)
                },
                onPlay: function(t) {
                    return m.bind("onPlay", t)
                },
                onBeforePause: function(t) {
                    return m.bind("onBeforePause", t)
                },
                onPause: function(t) {
                    return m.bind("onPause", t)
                }
            });
            if (e.autopause) {
                var k = m.getTabs().add(s).add(q).add(m.getPanes());
                k.hover(function() {
                    m.pause();
                    j = clearInterval(j)
                }, function() {
                    if (!g) {
                        j = setTimeout(m.play, e.interval)
                    }
                })
            }
            if (e.autoplay) {
                l = setTimeout(m.play, e.interval)
            } else {
                m.stop()
            }
            if (e.clickable) {
                m.getPanes().click(function() {
                    m.next()
                })
            }
            if (!m.getConf().rotate) {
                var r = e.disabledClass;
                if (!m.getIndex()) {
                    q.addClass(r)
                }
                m.onBeforeClick(function(u, t) {
                    if (!t) {
                        q.addClass(r)
                    } else {
                        q.removeClass(r);
                        if (t == m.getTabs().length - 1) {
                            s.addClass(r)
                        } else {
                            s.removeClass(r)
                        }
                    }
                })
            }
        });
        return e.api ? d : this
    }
})(jQuery);

(function(c) {
    var d = [];
    c.tools = c.tools || {};
    c.tools.tooltip = {
        version: "1.1.2",
        conf: {
            effect: "toggle",
            fadeOutSpeed: "fast",
            tip: null,
            predelay: 0,
            delay: 30,
            opacity: 1,
            lazy: undefined,
            position: ["top", "center"],
            offset: [0, 0],
            cancelDefault: true,
            relative: false,
            oneInstance: true,
            events: {
                def: "mouseover,mouseout",
                input: "focus,blur",
                widget: "focus mouseover,blur mouseout",
                tooltip: "mouseover,mouseout"
            },
            api: false
        },
        addEffect: function(e, g, f) {
            b[e] = [g, f]
        }
    };
    var b = {
        toggle: [function(e) {
            var f = this.getConf(),
                g = this.getTip(),
                h = f.opacity;
            if (h < 1) {
                g.css({
                    opacity: h
                })
            }
            g.show();
            e.call()
        }, function(e) {
            this.getTip().hide();
            e.call()
        }],
        fade: [function(e) {
            this.getTip().fadeIn(this.getConf().fadeInSpeed, e)
        }, function(e) {
            this.getTip().fadeOut(this.getConf().fadeOutSpeed, e)
        }]
    };

    function a(f, g) {
        var p = this,
            k = c(this);
        f.data("tooltip", p);
        var l = f.next();
        if (g.tip) {
            l = c(g.tip);
            if (l.length > 1) {
                l = f.nextAll(g.tip).eq(0);
                if (!l.length) {
                    l = f.parent().nextAll(g.tip).eq(0)
                }
            }
        }

        function o(u) {
            var t = g.relative ? f.position().top : f.offset().top,
                s = g.relative ? f.position().left : f.offset().left,
                v = g.position[0];
            t -= l.outerHeight() - g.offset[0];
            s += f.outerWidth() + g.offset[1];
            var q = l.outerHeight() + f.outerHeight();
            if (v == "center") {
                t += q / 2
            }
            if (v == "bottom") {
                t += q
            }
            v = g.position[1];
            var r = l.outerWidth() + f.outerWidth();
            if (v == "center") {
                s -= r / 2
            }
            if (v == "left") {
                s -= r
            }
            return {
                top: t,
                left: s
            }
        }
        var i = f.is(":input"),
            e = i && f.is(":checkbox, :radio, select, :button"),
            h = f.attr("type"),
            n = g.events[h] || g.events[i ? (e ? "widget" : "input") : "def"];
        n = n.split(/,\s*/);
        if (n.length != 2) {
            throw "Tooltip: bad events configuration for " + h
        }
        f.bind(n[0], function(r) {
            if (g.oneInstance) {
                c.each(d, function() {
                    this.hide()
                })
            }
            var q = l.data("trigger");
            if (q && q[0] != this) {
                l.hide().stop(true, true)
            }
            r.target = this;
            p.show(r);
            n = g.events.tooltip.split(/,\s*/);
            l.bind(n[0], function() {
                p.show(r)
            });
            if (n[1]) {
                l.bind(n[1], function() {
                    p.hide(r)
                })
            }
        });
        f.bind(n[1], function(q) {
            p.hide(q)
        });
        if (!c.browser.msie && !i && !g.predelay) {
            f.mousemove(function() {
                if (!p.isShown()) {
                    f.triggerHandler("mouseover")
                }
            })
        }
        if (g.opacity < 1) {
            l.css("opacity", g.opacity)
        }
        var m = 0,
            j = f.attr("title");
        if (j && g.cancelDefault) {
            f.removeAttr("title");
            f.data("title", j)
        }
        c.extend(p, {
            show: function(r) {
                if (r) {
                    f = c(r.target)
                }
                clearTimeout(l.data("timer"));
                if (l.is(":animated") || l.is(":visible")) {
                    return p
                }

                function q() {
                    l.data("trigger", f);
                    var t = o(r);
                    if (g.tip && j) {
                        l.html(f.data("title"))
                    }
                    r = r || c.Event();
                    r.type = "onBeforeShow";
                    k.trigger(r, [t]);
                    if (r.isDefaultPrevented()) {
                        return p
                    }
                    t = o(r);
                    l.css({
                        position: "absolute",
                        top: t.top,
                        left: t.left
                    });
                    var s = b[g.effect];
                    if (!s) {
                        throw 'Nonexistent effect "' + g.effect + '"'
                    }
                    s[0].call(p, function() {
                        r.type = "onShow";
                        k.trigger(r)
                    })
                }
                if (g.predelay) {
                    clearTimeout(m);
                    m = setTimeout(q, g.predelay)
                } else {
                    q()
                }
                return p
            },
            hide: function(r) {
                clearTimeout(l.data("timer"));
                clearTimeout(m);
                if (!l.is(":visible")) {
                    return
                }

                function q() {
                    r = r || c.Event();
                    r.type = "onBeforeHide";
                    k.trigger(r);
                    if (r.isDefaultPrevented()) {
                        return
                    }
                    b[g.effect][1].call(p, function() {
                        r.type = "onHide";
                        k.trigger(r)
                    })
                }
                if (g.delay && r) {
                    l.data("timer", setTimeout(q, g.delay))
                } else {
                    q()
                }
                return p
            },
            isShown: function() {
                return l.is(":visible, :animated")
            },
            getConf: function() {
                return g
            },
            getTip: function() {
                return l
            },
            getTrigger: function() {
                return f
            },
            bind: function(q, r) {
                k.bind(q, r);
                return p
            },
            onHide: function(q) {
                return this.bind("onHide", q)
            },
            onBeforeShow: function(q) {
                return this.bind("onBeforeShow", q)
            },
            onShow: function(q) {
                return this.bind("onShow", q)
            },
            onBeforeHide: function(q) {
                return this.bind("onBeforeHide", q)
            },
            unbind: function(q) {
                k.unbind(q);
                return p
            }
        });
        c.each(g, function(q, r) {
            if (c.isFunction(r)) {
                p.bind(q, r)
            }
        })
    }
    c.prototype.tooltip = function(e) {
        var f = this.eq(typeof e == "number" ? e : 0).data("tooltip");
        if (f) {
            return f
        }
        var g = c.extend(true, {}, c.tools.tooltip.conf);
        if (c.isFunction(e)) {
            e = {
                onBeforeShow: e
            }
        } else {
            if (typeof e == "string") {
                e = {
                    tip: e
                }
            }
        }
        e = c.extend(true, g, e);
        if (typeof e.position == "string") {
            e.position = e.position.split(/,?\s/)
        }
        if (e.lazy !== false && (e.lazy === true || this.length > 20)) {
            this.one("mouseover", function(h) {
                f = new a(c(this), e);
                f.show(h);
                d.push(f)
            })
        } else {
            this.each(function() {
                f = new a(c(this), e);
                d.push(f)
            })
        }
        return e.api ? f : this
    }
})(jQuery);

(function(b) {
    var a = b.tools.tooltip;
    a.effects = a.effects || {};
    a.effects.slide = {
        version: "1.0.0"
    };
    b.extend(a.conf, {
        direction: "up",
        bounce: false,
        slideOffset: 10,
        slideInSpeed: 200,
        slideOutSpeed: 200,
        slideFade: !b.browser.msie
    });
    var c = {
        up: ["-", "top"],
        down: ["+", "top"],
        left: ["-", "left"],
        right: ["+", "left"]
    };
    b.tools.tooltip.addEffect("slide", function(d) {
        var f = this.getConf(),
            g = this.getTip(),
            h = f.slideFade ? {
                opacity: f.opacity
            } : {},
            e = c[f.direction] || c.up;
        h[e[1]] = e[0] + "=" + f.slideOffset;
        if (f.slideFade) {
            g.css({
                opacity: 0
            })
        }
        g.show().animate(h, f.slideInSpeed, d)
    }, function(e) {
        var g = this.getConf(),
            i = g.slideOffset,
            h = g.slideFade ? {
                opacity: 0
            } : {},
            f = c[g.direction] || c.up;
        var d = "" + f[0];
        if (g.bounce) {
            d = d == "+" ? "-" : "+"
        }
        h[f[1]] = d + "=" + i;
        this.getTip().animate(h, g.slideOutSpeed, function() {
            b(this).hide();
            e.call()
        })
    })
})(jQuery);

(function(d) {
    var c = d.tools.tooltip;
    c.plugins = c.plugins || {};
    c.plugins.dynamic = {
        version: "1.0.1",
        conf: {
            api: false,
            classNames: "top right bottom left"
        }
    };

    function b(h) {
        var e = d(window);
        var g = e.width() + e.scrollLeft();
        var f = e.height() + e.scrollTop();
        return [h.offset().top <= e.scrollTop(), g <= h.offset().left + h.width(), f <= h.offset().top + h.height(), e.scrollLeft() >= h.offset().left]
    }

    function a(f) {
        var e = f.length;
        while (e--) {
            if (f[e]) {
                return false
            }
        }
        return true
    }
    d.fn.dynamic = function(g) {
        var h = d.extend({}, c.plugins.dynamic.conf),
            f;
        if (typeof g == "number") {
            g = {
                speed: g
            }
        }
        g = d.extend(h, g);
        var e = g.classNames.split(/\s/),
            i;
        this.each(function() {
            if (d(this).tooltip().jquery) {
                throw "Lazy feature not supported by dynamic plugin. set lazy: false for tooltip"
            }
            var j = d(this).tooltip().onBeforeShow(function(n, o) {
                var m = this.getTip(),
                    l = this.getConf();
                if (!i) {
                    i = [l.position[0], l.position[1], l.offset[0], l.offset[1], d.extend({}, l)]
                }
                d.extend(l, i[4]);
                l.position = [i[0], i[1]];
                l.offset = [i[2], i[3]];
                m.css({
                    visibility: "hidden",
                    position: "absolute",
                    top: o.top,
                    left: o.left
                }).show();
                var k = b(m);
                if (!a(k)) {
                    if (k[2]) {
                        d.extend(l, g.top);
                        l.position[0] = "top";
                        m.addClass(e[0])
                    }
                    if (k[3]) {
                        d.extend(l, g.right);
                        l.position[1] = "right";
                        m.addClass(e[1])
                    }
                    if (k[0]) {
                        d.extend(l, g.bottom);
                        l.position[0] = "bottom";
                        m.addClass(e[2])
                    }
                    if (k[1]) {
                        d.extend(l, g.left);
                        l.position[1] = "left";
                        m.addClass(e[3])
                    }
                    if (k[0] || k[2]) {
                        l.offset[0] *= -1
                    }
                    if (k[1] || k[3]) {
                        l.offset[1] *= -1
                    }
                }
                m.css({
                    visibility: "visible"
                }).hide()
            });
            j.onShow(function() {
                var l = this.getConf(),
                    k = this.getTip();
                l.position = [i[0], i[1]];
                l.offset = [i[2], i[3]]
            });
            j.onHide(function() {
                var k = this.getTip();
                k.removeClass(g.classNames)
            });
            f = j
        });
        return g.api ? f : this
    }
})(jQuery);

(function(b) {
    b.tools = b.tools || {};
    b.tools.scrollable = {
        version: "1.1.2",
        conf: {
            size: 5,
            vertical: false,
            speed: 400,
            keyboard: true,
            keyboardSteps: null,
            disabledClass: "disabled",
            hoverClass: null,
            clickable: true,
            activeClass: "active",
            easing: "swing",
            loop: false,
            items: ".items",
            item: null,
            prev: ".prev",
            next: ".next",
            prevPage: ".prevPage",
            nextPage: ".nextPage",
            api: false
        }
    };
    var c;

    function a(o, m) {
        var r = this,
            p = b(this),
            d = !m.vertical,
            e = o.children(),
            k = 0,
            i;
        if (!c) {
            c = r
        }
        b.each(m, function(s, t) {
            if (b.isFunction(t)) {
                p.bind(s, t)
            }
        });
        if (e.length > 1) {
            e = b(m.items, o)
        }

        function l(t) {
            var s = b(t);
            return m.globalNav ? s : o.parent().find(t)
        }
        o.data("finder", l);
        var f = l(m.prev),
            h = l(m.next),
            g = l(m.prevPage),
            n = l(m.nextPage);
        b.extend(r, {
            getIndex: function() {
                return k
            },
            getClickIndex: function() {
                var s = r.getItems();
                return s.index(s.filter("." + m.activeClass))
            },
            getConf: function() {
                return m
            },
            getSize: function() {
                return r.getItems().size()
            },
            getPageAmount: function() {
                return Math.ceil(this.getSize() / m.size)
            },
            getPageIndex: function() {
                return Math.ceil(k / m.size)
            },
            getNaviButtons: function() {
                return f.add(h).add(g).add(n)
            },
            getRoot: function() {
                return o
            },
            getItemWrap: function() {
                return e
            },
            getItems: function() {
                return e.children(m.item)
            },
            getVisibleItems: function() {
                return r.getItems().slice(k, k + m.size)
            },
            seekTo: function(s, w, t) {
                if (s < 0) {
                    s = 0
                }
                if (k === s) {
                    return r
                }
                if (b.isFunction(w)) {
                    t = w
                }
                if (s > r.getSize() - m.size) {
                    return m.loop ? r.begin() : this.end()
                }
                var u = r.getItems().eq(s);
                if (!u.length) {
                    return r
                }
                var v = b.Event("onBeforeSeek");
                p.trigger(v, [s]);
                if (v.isDefaultPrevented()) {
                    return r
                }
                if (w === undefined || b.isFunction(w)) {
                    w = m.speed
                }

                function x() {
                    if (t) {
                        t.call(r, s)
                    }
                    p.trigger("onSeek", [s])
                }
                if (d) {
                    e.animate({
                        left: -u.position().left
                    }, w, m.easing, x)
                } else {
                    e.animate({
                        top: -u.position().top
                    }, w, m.easing, x)
                }
                c = r;
                k = s;
                v = b.Event("onStart");
                p.trigger(v, [s]);
                if (v.isDefaultPrevented()) {
                    return r
                }
                f.add(g).toggleClass(m.disabledClass, s === 0);
                h.add(n).toggleClass(m.disabledClass, s >= r.getSize() - m.size);
                return r
            },
            move: function(u, t, s) {
                i = u > 0;
                return this.seekTo(k + u, t, s)
            },
            next: function(t, s) {
                return this.move(1, t, s)
            },
            prev: function(t, s) {
                return this.move(-1, t, s)
            },
            movePage: function(w, v, u) {
                i = w > 0;
                var s = m.size * w;
                var t = k % m.size;
                if (t > 0) {
                    s += (w > 0 ? -t : m.size - t)
                }
                return this.move(s, v, u)
            },
            prevPage: function(t, s) {
                return this.movePage(-1, t, s)
            },
            nextPage: function(t, s) {
                return this.movePage(1, t, s)
            },
            setPage: function(t, u, s) {
                return this.seekTo(t * m.size, u, s)
            },
            begin: function(t, s) {
                i = false;
                return this.seekTo(0, t, s)
            },
            end: function(t, s) {
                i = true;
                var u = this.getSize() - m.size;
                return u > 0 ? this.seekTo(u, t, s) : r
            },
            reload: function() {
                p.trigger("onReload");
                return r
            },
            focus: function() {
                c = r;
                return r
            },
            click: function(u) {
                var v = r.getItems().eq(u),
                    s = m.activeClass,
                    t = m.size;
                if (u < 0 || u >= r.getSize()) {
                    return r
                }
                if (t == 1) {
                    if (m.loop) {
                        return r.next()
                    }
                    if (u === 0 || u == r.getSize() - 1) {
                        i = (i === undefined) ? true : !i
                    }
                    return i === false ? r.prev() : r.next()
                }
                if (t == 2) {
                    if (u == k) {
                        u--
                    }
                    r.getItems().removeClass(s);
                    v.addClass(s);
                    return r.seekTo(u, time, fn)
                }
                if (!v.hasClass(s)) {
                    r.getItems().removeClass(s);
                    v.addClass(s);
                    var x = Math.floor(t / 2);
                    var w = u - x;
                    if (w > r.getSize() - t) {
                        w = r.getSize() - t
                    }
                    if (w !== u) {
                        return r.seekTo(w)
                    }
                }
                return r
            },
            bind: function(s, t) {
                p.bind(s, t);
                return r
            },
            unbind: function(s) {
                p.unbind(s);
                return r
            }
        });
        b.each("onBeforeSeek,onStart,onSeek,onReload".split(","), function(s, t) {
            r[t] = function(u) {
                return r.bind(t, u)
            }
        });
        f.addClass(m.disabledClass).click(function() {
            r.prev()
        });
        h.click(function() {
            r.next()
        });
        n.click(function() {
            r.nextPage()
        });
        if (r.getSize() < m.size) {
            h.add(n).addClass(m.disabledClass)
        }
        g.addClass(m.disabledClass).click(function() {
            r.prevPage()
        });
        var j = m.hoverClass,
            q = "keydown." + Math.random().toString().substring(10);
        r.onReload(function() {
            if (j) {
                r.getItems().hover(function() {
                    b(this).addClass(j)
                }, function() {
                    b(this).removeClass(j)
                })
            }
            if (m.clickable) {
                r.getItems().each(function(s) {
                    b(this).unbind("click.scrollable").bind("click.scrollable", function(t) {
                        if (b(t.target).is("a")) {
                            return
                        }
                        return r.click(s)
                    })
                })
            }
            if (m.keyboard) {
                b(document).unbind(q).bind(q, function(t) {
                    if (t.altKey || t.ctrlKey) {
                        return
                    }
                    if (m.keyboard != "static" && c != r) {
                        return
                    }
                    var u = m.keyboardSteps;
                    if (d && (t.keyCode == 37 || t.keyCode == 39)) {
                        r.move(t.keyCode == 37 ? -u : u);
                        return t.preventDefault()
                    }
                    if (!d && (t.keyCode == 38 || t.keyCode == 40)) {
                        r.move(t.keyCode == 38 ? -u : u);
                        return t.preventDefault()
                    }
                    return true
                })
            } else {
                b(document).unbind(q)
            }
        });
        r.reload()
    }
    b.fn.scrollable = function(d) {
        var e = this.eq(typeof d == "number" ? d : 0).data("scrollable");
        if (e) {
            return e
        }
        var f = b.extend({}, b.tools.scrollable.conf);
        d = b.extend(f, d);
        d.keyboardSteps = d.keyboardSteps || d.size;
        this.each(function() {
            e = new a(b(this), d);
            b(this).data("scrollable", e)
        });
        return d.api ? e : this
    }
})(jQuery);


// http://yourjavascript.com/265232511102/carousellite.js
(function($) {
    $.fn.jCarouselLite = function(o) {
        o = $.extend({
            btnPrev: null,
            btnNext: null,
            btnGo: null,
            mouseWheel: false,
            auto: null,
            speed: 200,
            easing: null,
            vertical: false,
            circular: true,
            visible: 3,
            start: 0,
            scroll: 1,
            beforeStart: null,
            afterEnd: null
        }, o || {});
        return this.each(function() {
            var running = false,
                animCss = o.vertical ? "top" : "left",
                sizeCss = o.vertical ? "height" : "width";
            var div = $(this),
                ul = $("ul:first", div),
                tLi = $(".car", ul),
                tl = tLi.size(),
                v = o.visible;
            if (o.circular) {
                ul.prepend(tLi.slice(tl - v - 1 + 1).clone()).append(tLi.slice(0, v).clone());
                o.start += v;
            }
            var li = $(".car", ul),
                itemLength = li.size(),
                curr = o.start;
            div.css("visibility", "visible");
            li.css({
                overflow: "hidden",
                float: o.vertical ? "none" : "left"
            });
            ul.css({
                padding: "0",
                position: "relative",
                "list-style-type": "none",
                "z-index": "1"
            });
            div.css({
                overflow: "hidden",
                "z-index": "2"
            });
            var liSize = o.vertical ? height(li) : width(li);
            var ulSize = liSize * itemLength;
            var divSize = liSize * v;
            li.css({
                width: li.width()
            });
            ul.css(sizeCss, ulSize + "px").css(animCss, -(curr * liSize));
            div.css(sizeCss, divSize + "px");
            if (o.btnPrev)
                $(o.btnPrev).click(function() {
                    return go(curr - o.scroll);
                });
            if (o.btnNext)
                $(o.btnNext).click(function() {
                    return go(curr + o.scroll);
                });
            if (o.btnGo)
                $.each(o.btnGo, function(i, val) {
                    $(val).click(function() {
                        return go(o.circular ? o.visible + i : i);
                    });
                });
            if (o.mouseWheel && div.mousewheel)
                div.mousewheel(function(e, d) {
                    return d > 0 ? go(curr - o.scroll) : go(curr + o.scroll);
                });
            if (o.auto)
                setInterval(function() {
                    go(curr + o.scroll);
                }, o.auto + o.speed);

            function vis() {
                return li.slice(curr).slice(0, v);
            };

            function go(to) {
                if (!running) {
                    if (o.beforeStart)
                        o.beforeStart.call(this, vis());
                    if (o.circular) {
                        if (to <= o.start - v - 1) {
                            ul.css(animCss, -((itemLength - (v * 2)) * liSize) + "px");
                            curr = to == o.start - v - 1 ? itemLength - (v * 2) - 1 : itemLength - (v * 2) - o.scroll;
                        } else if (to >= itemLength - v + 1) {
                            ul.css(animCss, -((v) * liSize) + "px");
                            curr = to == itemLength - v + 1 ? v + 1 : v + o.scroll;
                        } else curr = to;
                    } else {
                        if (to < 0 || to > itemLength - v) return;
                        else curr = to;
                    }
                    running = true;
                    ul.animate(animCss == "left" ? {
                        left: -(curr * liSize)
                    } : {
                        top: -(curr * liSize)
                    }, o.speed, o.easing, function() {
                        if (o.afterEnd)
                            o.afterEnd.call(this, vis());
                        running = false;
                    });
                    if (!o.circular) {
                        $(o.btnPrev + "," + o.btnNext).removeClass("disabled");
                        $((curr - o.scroll < 0 && o.btnPrev) || (curr + o.scroll > itemLength - v && o.btnNext) || []).addClass("disabled");
                    }
                }
                return false;
            };
        });
    };

    function css(el, prop) {
        return parseInt($.css(el[0], prop)) || 0;
    };

    function width(el) {
        return el[0].offsetWidth + css(el, 'marginLeft') + css(el, 'marginRight');
    };

    function height(el) {
        return el[0].offsetHeight + css(el, 'marginTop') + css(el, 'marginBottom');
    };
})(jQuery);



 
//<![CDATA[ 
imgr = new Array();
imgr[0] = "http://1.bp.blogspot.com/-QjSndGbF0No/T-Nt3HgKsDI/AAAAAAAAG9o/cN6_Oy306rc/s1600/no-video.gif";
showRandomImg = true;
aBold = true;
summaryPost = 100;
summaryPost1 = 200;
numposts = 6;
numposts1 = 10;
numposts2 = 8;
numposts6 = 3;
Title1 = "Animation";
Title2 = "Action";
Title3 = "Movies";
Title4 = "Comedy";
Title5 = "Real Life";
Title6 = "Sport Game";



function removeHtmlTag(strx,chop){var s=strx.split("<");for(var i=0;i<s.length;i++){if(s[i].indexOf(">")!=-1){s[i]=s[i].substring(s[i].indexOf(">")+1,s[i].length)}}s=s.join("");s=s.substring(0,chop-1);return s}
function showrecentposts0(json){j=(showRandomImg)?Math.floor((imgr.length+1)*Math.random()):0;img=new Array();for(var i=0;i<numposts;i++){var entry=json.feed.entry[i];var posttitle=entry.title.$t;var pcm;var posturl;if(i==json.feed.entry.length)break;for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='alternate'){posturl=entry.link[k].href;break}}for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='replies'&&entry.link[k].type=='text/html'){pcm=entry.link[k].title.split(" ")[0];break}}if("content"in entry){var postcontent=entry.content.$t}else if("summary"in entry){var postcontent=entry.summary.$t}else var postcontent="";postdate=entry.published.$t;if(j>imgr.length-1)j=0;img[i]=imgr[j];s=postcontent;a=s.indexOf("<img");b=s.indexOf("src=\"",a);c=s.indexOf("\"",b+5);d=s.substr(b+5,c-b-5);if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!=""))img[i]=d;var month=[1,2,3,4,5,6,7,8,9,10,11,12];var month2=["January","February","March","April","May","June","July","August","September","October","November","December"];var day=postdate.split("-")[2].substring(0,2);var m=postdate.split("-")[1];var y=postdate.split("-")[0];for(var u2=0;u2<month.length;u2++){if(parseInt(m)==month[u2]){m=month2[u2];break}}var daystr=m+' '+day+' '+y;var trtd='<div class="crott"><a href="'+posturl+'">'+posttitle+'</a><p>'+removeHtmlTag(postcontent,summaryPost1)+'... </p></div>';document.write(trtd);j++}}function showrecentposts(json){j=(showRandomImg)?Math.floor((imgr.length+1)*Math.random()):0;img=new Array();for(var i=0;i<numposts;i++){var entry=json.feed.entry[i];var posttitle=entry.title.$t;var pcm;var posturl;if(i==json.feed.entry.length)break;for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='alternate'){posturl=entry.link[k].href;break}}for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='replies'&&entry.link[k].type=='text/html'){pcm=entry.link[k].title.split(" ")[0];break}}if("content"in entry){var postcontent=entry.content.$t}else if("summary"in entry){var postcontent=entry.summary.$t}else var postcontent="";postdate=entry.published.$t;if(j>imgr.length-1)j=0;img[i]=imgr[j];s=postcontent;a=s.indexOf("<img");b=s.indexOf("src=\"",a);c=s.indexOf("\"",b+5);d=s.substr(b+5,c-b-5);if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!=""))img[i]=d;var month=[1,2,3,4,5,6,7,8,9,10,11,12];var month2=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];var day=postdate.split("-")[2].substring(0,2);var m=postdate.split("-")[1];var y=postdate.split("-")[0];for(var u2=0;u2<month.length;u2++){if(parseInt(m)==month[u2]){m=month2[u2];break}}var daystr=day+' '+m+' '+y;var trtd='<a href="'+posturl+'"><img src="'+img[i]+'"/></a>';document.write(trtd);j++}}
function showrecentposts2(json){j=(showRandomImg)?Math.floor((imgr.length+1)*Math.random()):0;img=new Array();for(var i=0;i<numposts1;i++){var entry=json.feed.entry[i];var posttitle=entry.title.$t;var pcm;var posturl;if(i==json.feed.entry.length)break;for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='alternate'){posturl=entry.link[k].href;break}}for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='replies'&&entry.link[k].type=='text/html'){pcm=entry.link[k].title.split(" ")[0];break}}if("content"in entry){var postcontent=entry.content.$t}else if("summary"in entry){var postcontent=entry.summary.$t}else var postcontent="";postdate=entry.published.$t;if(j>imgr.length-1)j=0;img[i]=imgr[j];s=postcontent;a=s.indexOf("<img");b=s.indexOf("src=\"",a);c=s.indexOf("\"",b+5);d=s.substr(b+5,c-b-5);if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!=""))img[i]=d;var month=[1,2,3,4,5,6,7,8,9,10,11,12];var month2=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];var day=postdate.split("-")[2].substring(0,2);var m=postdate.split("-")[1];var y=postdate.split("-")[0];for(var u2=0;u2<month.length;u2++){if(parseInt(m)==month[u2]){m=month2[u2];break}}var daystr=day+' '+m+' '+y;var trtd='<li class="car"><div class="thumb"><a href="'+posturl+'"><span class="play-dong"></span><img width="265" height="172" src="'+img[i]+'"/></a></div><a class="slider_title" href="'+posturl+'">'+posttitle+'</a></li>';document.write(trtd);j++}}
function showrecentposts1(json){j=(showRandomImg)?Math.floor((imgr.length+1)*Math.random()):0;img=new Array();for(var i=0;i<numposts2;i++){var entry=json.feed.entry[i];var posttitle=entry.title.$t;var pcm;var posturl;if(i==json.feed.entry.length)break;for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='alternate'){posturl=entry.link[k].href;break}}for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='replies'&&entry.link[k].type=='text/html'){pcm=entry.link[k].title.split(" ")[0];break}}if("content"in entry){var postcontent=entry.content.$t}else if("summary"in entry){var postcontent=entry.summary.$t}else var postcontent="";postdate=entry.published.$t;if(j>imgr.length-1)j=0;img[i]=imgr[j];s=postcontent;a=s.indexOf("<img");b=s.indexOf("src=\"",a);c=s.indexOf("\"",b+5);d=s.substr(b+5,c-b-5);if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!=""))img[i]=d;var month=[1,2,3,4,5,6,7,8,9,10,11,12];var month2=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];var day=postdate.split("-")[2].substring(0,2);var m=postdate.split("-")[1];var y=postdate.split("-")[0];for(var u2=0;u2<month.length;u2++){if(parseInt(m)==month[u2]){m=month2[u2];break}}var daystr=day+' '+m+' '+y;var trtd='<div class="column"><a href="'+posturl+'"><span class="play-button"></span><img class="column_img" src="'+img[i]+'"/></a><h2><a href="'+posturl+'">'+posttitle+'</a></h2></div>';document.write(trtd);j++}}
function showrecentposts6(json){j=(showRandomImg)?Math.floor((imgr.length+1)*Math.random()):0;img=new Array();document.write('<ul>');for(var i=0;i<numposts6;i++){var entry=json.feed.entry[i];var posttitle=entry.title.$t;var pcm;var posturl;if(i==json.feed.entry.length)break;for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='alternate'){posturl=entry.link[k].href;break}}for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='replies'&&entry.link[k].type=='text/html'){pcm=entry.link[k].title.split(" ")[0];break}}if("content"in entry){var postcontent=entry.content.$t}else if("summary"in entry){var postcontent=entry.summary.$t}else var postcontent="";postdate=entry.published.$t;if(j>imgr.length-1)j=0;img[i]=imgr[j];s=postcontent;a=s.indexOf("<img");b=s.indexOf("src=\"",a);c=s.indexOf("\"",b+5);d=s.substr(b+5,c-b-5);if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!=""))img[i]=d;var month=[1,2,3,4,5,6,7,8,9,10,11,12];var month2=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];var day=postdate.split("-")[2].substring(0,2);var m=postdate.split("-")[1];var y=postdate.split("-")[0];for(var u2=0;u2<month.length;u2++){if(parseInt(m)==month[u2]){m=month2[u2];break}}var daystr=day+' '+m+' '+y;var trtd=' <li class="featuredPost2"><a href="'+posturl+'"><img width="160" height="110" class="alignleft" src="'+img[i]+'"/></a><div class="entry-title"><a href="'+posturl+'">'+posttitle+'</a></div>'+removeHtmlTag(postcontent,summaryPost)+'...</li>';document.write(trtd);j++}document.write('</ul>')}

var relatedTitles=new Array();var relatedTitlesNum=0;var relatedUrls=new Array();var thumburl=new Array();function related_results_labels_thumbs(json){for(var i=0;i<json.feed.entry.length;i++){var entry=json.feed.entry[i];relatedTitles[relatedTitlesNum]=entry.title.$t;try{thumburl[relatedTitlesNum]=entry.gform_foot.url}catch(error){s=entry.content.$t;a=s.indexOf("<img");b=s.indexOf("src=\"",a);c=s.indexOf("\"",b+5);d=s.substr(b+5,c-b-5);if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!="")){thumburl[relatedTitlesNum]=d}else thumburl[relatedTitlesNum]='http://1.bp.blogspot.com/-QjSndGbF0No/T-Nt3HgKsDI/AAAAAAAAG9o/cN6_Oy306rc/s1600/no-video.gif'}if(relatedTitles[relatedTitlesNum].length>35)relatedTitles[relatedTitlesNum]=relatedTitles[relatedTitlesNum].substring(0,35)+"...";for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='alternate'){relatedUrls[relatedTitlesNum]=entry.link[k].href;relatedTitlesNum++}}}}function removeRelatedDuplicates_thumbs(){var tmp=new Array(0);var tmp2=new Array(0);var tmp3=new Array(0);for(var i=0;i<relatedUrls.length;i++){if(!contains_thumbs(tmp,relatedUrls[i])){tmp.length+=1;tmp[tmp.length-1]=relatedUrls[i];tmp2.length+=1;tmp3.length+=1;tmp2[tmp2.length-1]=relatedTitles[i];tmp3[tmp3.length-1]=thumburl[i]}}relatedTitles=tmp2;relatedUrls=tmp;thumburl=tmp3}function contains_thumbs(a,e){for(var j=0;j<a.length;j++)if(a[j]==e)return true;return false}function printRelatedLabels_thumbs(){for(var i=0;i<relatedUrls.length;i++){if((relatedUrls[i]==currentposturl)||(!(relatedTitles[i]))){relatedUrls.splice(i,1);relatedTitles.splice(i,1);thumburl.splice(i,1);i--}}var r=Math.floor((relatedTitles.length-1)*Math.random());var i=0;if(relatedTitles.length>0)document.write('<h2>'+relatedpoststitle+'</h2>');document.write('<div style="clear: both;"/>');while(i<relatedTitles.length&&i<20&&i<maxresults){document.write('<a style="text-decoration:none;margin:0 5px 10px 4px;float:left;;border:1px solid #ccc;box-shadow:0 0 4px #bbb;-moz-box-shadow:0 0 4px #bbb;-webkit-box-shadow:0 0 4px #bbb;');if(i!=0)document.write('"');else document.write('"');document.write(' href="'+relatedUrls[r]+'"><div class="play-button"><img class="maskolis_img" src="'+thumburl[r]+'"/><br/></div><div style="width:185px;padding:0 5px;color:#222;height:35px;text-align:center;margin:0px 0px; font:bold 12px Arial; line-height:14px;">'+relatedTitles[r]+'</div></a>');if(r<relatedTitles.length-1){r++}else{r=0}i++}document.write('</div>');relatedUrls.splice(0,relatedUrls.length);thumburl.splice(0,thumburl.length);relatedTitles.splice(0,relatedTitles.length)}
///////=================================

window.selectnav=function(){return function(p,q){var a,h=function(b){var c;b||(b=window.event);b.target?c=b.target:b.srcElement&&(c=b.srcElement);3===c.nodeType&&(c=c.parentNode);c.value&&(window.location.href=c.value)},k=function(b){b=b.nodeName.toLowerCase();return"ul"===b||"ol"===b},l=function(b){for(var c=1;document.getElementById("selectnav"+c);c++){}return b?"selectnav"+c:"selectnav"+(c-1)},n=function(b){g++;var c=b.children.length,a="",d="",f=g-1;if(c){if(f){for(;f--;){d+=r}d+=" "}for(f=0;f<c;f++){var e=b.children[f].children[0];if("undefined"!==typeof e){var h=e.innerText||e.textContent,i="";j&&(i=-1!==e.className.search(j)||-1!==e.parentElement.className.search(j)?m:"");s&&!i&&(i=e.href===document.URL?m:"");a+='<option value="'+e.href+'" '+i+">"+d+h+"</option>";t&&(e=b.children[f].children[1])&&k(e)&&(a+=n(e))}}1===g&&o&&(a='<option value="">'+o+"</option>"+a);1===g&&(a='<select class="selectnav" id="'+l(!0)+'">'+a+"</select>");g--;return a}};if((a=document.getElementById(p))&&k(a)){document.documentElement.className+=" js";var d=q||{},j=d.activeclass||"active1",s="boolean"===typeof d.autoselect?d.autoselect:!0,t="boolean"===typeof d.nested?d.nested:!0,r=d.indent||"\u2192",o=d.label||"- Navigation -",g=0,m=" selected ";a.insertAdjacentHTML("afterend",n(a));a=document.getElementById(l());a.addEventListener&&a.addEventListener("change",h);a.attachEvent&&a.attachEvent("onchange",h)}}}();(jQuery);


/* jQuery cookie */

<![CDATA[
	jQuery.cookie = function (key, value, options) {
	    
	    // key and at least value given, set cookie...
	    if (arguments.length > 1 && String(value) !== "[object Object]") {
	        options = jQuery.extend({}, options);

	        if (value === null || value === undefined) {
	            options.expires = -1;
	        }

	        if (typeof options.expires === 'number') {
	            var days = options.expires, t = options.expires = new Date();
	            t.setDate(t.getDate() + days);
	        }
	        
	        value = String(value);
	        
	        return (document.cookie = [
	            encodeURIComponent(key), '=',
	            options.raw ? value : encodeURIComponent(value),
	            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
	            options.path ? '; path=' + options.path : '',
	            options.domain ? '; domain=' + options.domain : '',
	            options.secure ? '; secure' : ''
	        ].join(''));
	    }

	    // key and possibly options given, get cookie...
	    options = value || {};
	    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
	    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
	};
]]>


jQuery(document).ready(function(){var $box=jQuery('.post'),$bar=jQuery('a.bar_view');$dat=jQuery('a.dat_view');$dat.click(function(){$box.removeClass("bar");jQuery(this).addClass('active');$bar.removeClass('active');jQuery.cookie('dat_style',0);return false});$bar.click(function(){$box.addClass("bar");jQuery(this).addClass('active');$dat.removeClass('active');jQuery.cookie('dat_style',1);return false});if(jQuery.cookie('dat_style')==0){$box.removeClass("bar");$dat.addClass('active')}else{$box.addClass("bar");$bar.addClass('active')}});

