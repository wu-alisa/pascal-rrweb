var rrweb = (function (ee) {
  "use strict";
  var I;
  (function (t) {
    (t[(t.Document = 0)] = "Document"),
      (t[(t.DocumentType = 1)] = "DocumentType"),
      (t[(t.Element = 2)] = "Element"),
      (t[(t.Text = 3)] = "Text"),
      (t[(t.CDATA = 4)] = "CDATA"),
      (t[(t.Comment = 5)] = "Comment");
  })(I || (I = {}));
  function Pt(t) {
    return t.nodeType === t.ELEMENT_NODE;
  }
  function Fe(t) {
    var e = t?.host;
    return Boolean(e?.shadowRoot === t);
  }
  function Pe(t) {
    return Object.prototype.toString.call(t) === "[object ShadowRoot]";
  }
  function cr(t) {
    return (
      t.includes(" background-clip: text;") &&
        !t.includes(" -webkit-background-clip: text;") &&
        (t = t.replace(
          " background-clip: text;",
          " -webkit-background-clip: text; background-clip: text;"
        )),
      t
    );
  }
  function st(t) {
    try {
      var e = t.rules || t.cssRules;
      return e ? cr(Array.from(e).map(Wt).join("")) : null;
    } catch {
      return null;
    }
  }
  function Wt(t) {
    var e = t.cssText;
    if (ur(t))
      try {
        e = st(t.styleSheet) || e;
      } catch {}
    return e;
  }
  function ur(t) {
    return "styleSheet" in t;
  }
  var it = (function () {
    function t() {
      (this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap());
    }
    return (
      (t.prototype.getId = function (e) {
        var n;
        if (!e) return -1;
        var r = (n = this.getMeta(e)) === null || n === void 0 ? void 0 : n.id;
        return r ?? -1;
      }),
      (t.prototype.getNode = function (e) {
        return this.idNodeMap.get(e) || null;
      }),
      (t.prototype.getIds = function () {
        return Array.from(this.idNodeMap.keys());
      }),
      (t.prototype.getMeta = function (e) {
        return this.nodeMetaMap.get(e) || null;
      }),
      (t.prototype.removeNodeFromMap = function (e) {
        var n = this,
          r = this.getId(e);
        this.idNodeMap.delete(r),
          e.childNodes &&
            e.childNodes.forEach(function (o) {
              return n.removeNodeFromMap(o);
            });
      }),
      (t.prototype.has = function (e) {
        return this.idNodeMap.has(e);
      }),
      (t.prototype.hasNode = function (e) {
        return this.nodeMetaMap.has(e);
      }),
      (t.prototype.add = function (e, n) {
        var r = n.id;
        this.idNodeMap.set(r, e), this.nodeMetaMap.set(e, n);
      }),
      (t.prototype.replace = function (e, n) {
        var r = this.getNode(e);
        if (r) {
          var o = this.nodeMetaMap.get(r);
          o && this.nodeMetaMap.set(n, o);
        }
        this.idNodeMap.set(e, n);
      }),
      (t.prototype.reset = function () {
        (this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap());
      }),
      t
    );
  })();
  function $t() {
    return new it();
  }
  function at(t) {
    var e = t.maskInputOptions,
      n = t.tagName,
      r = t.type,
      o = t.value,
      a = t.maskInputFn,
      i = o || "",
      s = r && r.toLowerCase();
    return (
      (e[n.toLowerCase()] || (s && e[s])) &&
        (a ? (i = a(i)) : (i = "*".repeat(i.length))),
      i
    );
  }
  var Ut = "__rrweb_original__";
  function dr(t) {
    var e = t.getContext("2d");
    if (!e) return !0;
    for (var n = 50, r = 0; r < t.width; r += n)
      for (var o = 0; o < t.height; o += n) {
        var a = e.getImageData,
          i = Ut in a ? a[Ut] : a,
          s = new Uint32Array(
            i.call(
              e,
              r,
              o,
              Math.min(n, t.width - r),
              Math.min(n, t.height - o)
            ).data.buffer
          );
        if (
          s.some(function (l) {
            return l !== 0;
          })
        )
          return !1;
      }
    return !0;
  }
  function hr(t, e) {
    return !t || !e || t.type !== e.type
      ? !1
      : t.type === I.Document
      ? t.compatMode === e.compatMode
      : t.type === I.DocumentType
      ? t.name === e.name &&
        t.publicId === e.publicId &&
        t.systemId === e.systemId
      : t.type === I.Comment || t.type === I.Text || t.type === I.CDATA
      ? t.textContent === e.textContent
      : t.type === I.Element
      ? t.tagName === e.tagName &&
        JSON.stringify(t.attributes) === JSON.stringify(e.attributes) &&
        t.isSVG === e.isSVG &&
        t.needBlock === e.needBlock
      : !1;
  }
  function lt(t) {
    var e = t.type;
    return t.hasAttribute("data-rr-is-password")
      ? "password"
      : e
      ? e.toLowerCase()
      : null;
  }
  var pr = 1,
    mr = new RegExp("[^a-z0-9-_:]"),
    We = -2;
  function Vt() {
    return pr++;
  }
  function fr(t) {
    if (t instanceof HTMLFormElement) return "form";
    var e = t.tagName.toLowerCase().trim();
    return mr.test(e) ? "div" : e;
  }
  function yr(t) {
    return t.cssRules
      ? Array.from(t.cssRules)
          .map(function (e) {
            return e.cssText || "";
          })
          .join("")
      : "";
  }
  function gr(t) {
    var e = "";
    return (
      t.indexOf("//") > -1
        ? (e = t.split("/").slice(0, 3).join("/"))
        : (e = t.split("/")[0]),
      (e = e.split("?")[0]),
      e
    );
  }
  var Ee,
    Bt,
    vr = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm,
    Sr = /^(?:[a-z+]+:)?\/\//i,
    br = /^www\..*/i,
    wr = /^(data:)([^,]*),(.*)/i;
  function ze(t, e) {
    return (t || "").replace(vr, function (n, r, o, a, i, s) {
      var l = o || i || s,
        c = r || a || "";
      if (!l) return n;
      if (Sr.test(l) || br.test(l) || wr.test(l))
        return "url(".concat(c).concat(l).concat(c, ")");
      if (l[0] === "/")
        return "url("
          .concat(c)
          .concat(gr(e) + l)
          .concat(c, ")");
      var u = e.split("/"),
        d = l.split("/");
      u.pop();
      for (var h = 0, f = d; h < f.length; h++) {
        var m = f[h];
        m !== "." && (m === ".." ? u.pop() : u.push(m));
      }
      return "url(".concat(c).concat(u.join("/")).concat(c, ")");
    });
  }
  var Cr = /^[^ \t\n\r\u000c]+/,
    Er = /^[, \t\n\r\u000c]+/;
  function Nr(t, e) {
    if (e.trim() === "") return e;
    var n = 0;
    function r(c) {
      var u,
        d = c.exec(e.substring(n));
      return d ? ((u = d[0]), (n += u.length), u) : "";
    }
    for (var o = []; r(Er), !(n >= e.length); ) {
      var a = r(Cr);
      if (a.slice(-1) === ",")
        (a = He(t, a.substring(0, a.length - 1))), o.push(a);
      else {
        var i = "";
        a = He(t, a);
        for (var s = !1; ; ) {
          var l = e.charAt(n);
          if (l === "") {
            o.push((a + i).trim());
            break;
          } else if (s) l === ")" && (s = !1);
          else if (l === ",") {
            (n += 1), o.push((a + i).trim());
            break;
          } else l === "(" && (s = !0);
          (i += l), (n += 1);
        }
      }
    }
    return o.join(", ");
  }
  function He(t, e) {
    if (!e || e.trim() === "") return e;
    var n = t.createElement("a");
    return (n.href = e), n.href;
  }
  function Tr(t) {
    return Boolean(t.tagName === "svg" || t.ownerSVGElement);
  }
  function ct() {
    var t = document.createElement("a");
    return (t.href = ""), t.href;
  }
  function jt(t, e, n, r) {
    return (
      r &&
      (n === "src" ||
      (n === "href" && !(e === "use" && r[0] === "#")) ||
      (n === "xlink:href" && r[0] !== "#") ||
      (n === "background" && (e === "table" || e === "td" || e === "th"))
        ? He(t, r)
        : n === "srcset"
        ? Nr(t, r)
        : n === "style"
        ? ze(r, ct())
        : e === "object" && n === "data"
        ? He(t, r)
        : r)
    );
  }
  function Gt(t, e, n) {
    return (t === "video" || t === "audio") && e === "autoplay";
  }
  function Ir(t, e, n) {
    try {
      if (typeof e == "string") {
        if (t.classList.contains(e)) return !0;
      } else
        for (var r = t.classList.length; r--; ) {
          var o = t.classList[r];
          if (e.test(o)) return !0;
        }
      if (n) return t.matches(n);
    } catch {}
    return !1;
  }
  function Ye(t, e, n) {
    if (!t) return !1;
    if (t.nodeType !== t.ELEMENT_NODE) return n ? Ye(t.parentNode, e, n) : !1;
    for (var r = t.classList.length; r--; ) {
      var o = t.classList[r];
      if (e.test(o)) return !0;
    }
    return n ? Ye(t.parentNode, e, n) : !1;
  }
  function zt(t, e, n) {
    try {
      var r = t.nodeType === t.ELEMENT_NODE ? t : t.parentElement;
      if (r === null) return !1;
      if (typeof e == "string") {
        if (r.classList.contains(e) || r.closest(".".concat(e))) return !0;
      } else if (Ye(r, e, !0)) return !0;
      if (n && (r.matches(n) || r.closest(n))) return !0;
    } catch {}
    return !1;
  }
  function Mr(t, e, n) {
    var r = t.contentWindow;
    if (r) {
      var o = !1,
        a;
      try {
        a = r.document.readyState;
      } catch {
        return;
      }
      if (a !== "complete") {
        var i = setTimeout(function () {
          o || (e(), (o = !0));
        }, n);
        t.addEventListener("load", function () {
          clearTimeout(i), (o = !0), e();
        });
        return;
      }
      var s = "about:blank";
      if (r.location.href !== s || t.src === s || t.src === "")
        return setTimeout(e, 0), t.addEventListener("load", e);
      t.addEventListener("load", e);
    }
  }
  function Dr(t, e, n) {
    var r = !1,
      o;
    try {
      o = t.sheet;
    } catch {
      return;
    }
    if (!o) {
      var a = setTimeout(function () {
        r || (e(), (r = !0));
      }, n);
      t.addEventListener("load", function () {
        clearTimeout(a), (r = !0), e();
      });
    }
  }
  function kr(t, e) {
    var n = e.doc,
      r = e.mirror,
      o = e.blockClass,
      a = e.blockSelector,
      i = e.maskTextClass,
      s = e.maskTextSelector,
      l = e.inlineStylesheet,
      c = e.maskInputOptions,
      u = c === void 0 ? {} : c,
      d = e.maskTextFn,
      h = e.maskInputFn,
      f = e.dataURLOptions,
      m = f === void 0 ? {} : f,
      y = e.inlineImages,
      g = e.recordCanvas,
      p = e.keepIframeSrcFn,
      S = e.newlyAddedElement,
      v = S === void 0 ? !1 : S,
      E = Rr(n, r);
    switch (t.nodeType) {
      case t.DOCUMENT_NODE:
        return t.compatMode !== "CSS1Compat"
          ? { type: I.Document, childNodes: [], compatMode: t.compatMode }
          : { type: I.Document, childNodes: [] };
      case t.DOCUMENT_TYPE_NODE:
        return {
          type: I.DocumentType,
          name: t.name,
          publicId: t.publicId,
          systemId: t.systemId,
          rootId: E,
        };
      case t.ELEMENT_NODE:
        return xr(t, {
          doc: n,
          blockClass: o,
          blockSelector: a,
          inlineStylesheet: l,
          maskInputOptions: u,
          maskInputFn: h,
          dataURLOptions: m,
          inlineImages: y,
          recordCanvas: g,
          keepIframeSrcFn: p,
          newlyAddedElement: v,
          rootId: E,
        });
      case t.TEXT_NODE:
        return Or(t, {
          maskTextClass: i,
          maskTextSelector: s,
          maskTextFn: d,
          rootId: E,
        });
      case t.CDATA_SECTION_NODE:
        return { type: I.CDATA, textContent: "", rootId: E };
      case t.COMMENT_NODE:
        return { type: I.Comment, textContent: t.textContent || "", rootId: E };
      default:
        return !1;
    }
  }
  function Rr(t, e) {
    if (e.hasNode(t)) {
      var n = e.getId(t);
      return n === 1 ? void 0 : n;
    }
  }
  function Or(t, e) {
    var n,
      r = e.maskTextClass,
      o = e.maskTextSelector,
      a = e.maskTextFn,
      i = e.rootId,
      s = t.parentNode && t.parentNode.tagName,
      l = t.textContent,
      c = s === "STYLE" ? !0 : void 0,
      u = s === "SCRIPT" ? !0 : void 0;
    if (c && l) {
      try {
        t.nextSibling ||
          t.previousSibling ||
          (!((n = t.parentNode.sheet) === null || n === void 0) &&
            n.cssRules &&
            (l = yr(t.parentNode.sheet)));
      } catch (d) {
        console.warn(
          "Cannot get CSS styles from text's parentNode. Error: ".concat(d),
          t
        );
      }
      l = ze(l, ct());
    }
    return (
      u && (l = "SCRIPT_PLACEHOLDER"),
      !c && !u && l && zt(t, r, o) && (l = a ? a(l) : l.replace(/[\S]/g, "*")),
      { type: I.Text, textContent: l || "", isStyle: c, rootId: i }
    );
  }
  function xr(t, e) {
    for (
      var n = e.doc,
        r = e.blockClass,
        o = e.blockSelector,
        a = e.inlineStylesheet,
        i = e.maskInputOptions,
        s = i === void 0 ? {} : i,
        l = e.maskInputFn,
        c = e.dataURLOptions,
        u = c === void 0 ? {} : c,
        d = e.inlineImages,
        h = e.recordCanvas,
        f = e.keepIframeSrcFn,
        m = e.newlyAddedElement,
        y = m === void 0 ? !1 : m,
        g = e.rootId,
        p = Ir(t, r, o),
        S = fr(t),
        v = {},
        E = t.attributes.length,
        D = 0;
      D < E;
      D++
    ) {
      var R = t.attributes[D];
      Gt(S, R.name, R.value) || (v[R.name] = jt(n, S, R.name, R.value));
    }
    if (S === "link" && a) {
      var W = Array.from(n.styleSheets).find(function (M) {
          return M.href === t.href;
        }),
        A = null;
      W && (A = st(W)),
        A && (delete v.rel, delete v.href, (v._cssText = ze(A, W.href)));
    }
    if (
      S === "style" &&
      t.sheet &&
      !(t.innerText || t.textContent || "").trim().length
    ) {
      var A = st(t.sheet);
      A && (v._cssText = ze(A, ct()));
    }
    if (S === "input" || S === "textarea" || S === "select") {
      var te = t.value,
        X = t.checked;
      if (
        v.type !== "radio" &&
        v.type !== "checkbox" &&
        v.type !== "submit" &&
        v.type !== "button" &&
        te
      ) {
        var Z = lt(t);
        v.value = at({
          type: Z,
          tagName: S,
          value: te,
          maskInputOptions: s,
          maskInputFn: l,
        });
      } else X && (v.checked = X);
    }
    if (
      (S === "option" &&
        (t.selected && !s.select ? (v.selected = !0) : delete v.selected),
      S === "canvas" && h)
    ) {
      if (t.__context === "2d")
        dr(t) || (v.rr_dataURL = t.toDataURL(u.type, u.quality));
      else if (!("__context" in t)) {
        var ne = t.toDataURL(u.type, u.quality),
          K = document.createElement("canvas");
        (K.width = t.width), (K.height = t.height);
        var oe = K.toDataURL(u.type, u.quality);
        ne !== oe && (v.rr_dataURL = ne);
      }
    }
    if (S === "img" && d) {
      Ee || ((Ee = n.createElement("canvas")), (Bt = Ee.getContext("2d")));
      var F = t,
        H = F.crossOrigin;
      F.crossOrigin = "anonymous";
      var _ = function () {
        F.removeEventListener("load", _);
        try {
          (Ee.width = F.naturalWidth),
            (Ee.height = F.naturalHeight),
            Bt.drawImage(F, 0, 0),
            (v.rr_dataURL = Ee.toDataURL(u.type, u.quality));
        } catch (M) {
          console.warn(
            "Cannot inline img src=".concat(F.currentSrc, "! Error: ").concat(M)
          );
        }
        H ? (v.crossOrigin = H) : F.removeAttribute("crossorigin");
      };
      F.complete && F.naturalWidth !== 0 ? _() : F.addEventListener("load", _);
    }
    if (
      ((S === "audio" || S === "video") &&
        ((v.rr_mediaState = t.paused ? "paused" : "played"),
        (v.rr_mediaCurrentTime = t.currentTime)),
      y ||
        (t.scrollLeft && (v.rr_scrollLeft = t.scrollLeft),
        t.scrollTop && (v.rr_scrollTop = t.scrollTop)),
      p)
    ) {
      var q = t.getBoundingClientRect(),
        w = q.width,
        b = q.height;
      v = {
        class: v.class,
        rr_width: "".concat(w, "px"),
        rr_height: "".concat(b, "px"),
      };
    }
    return (
      S === "iframe" &&
        !f(v.src) &&
        (t.contentDocument || (v.rr_src = v.src), delete v.src),
      {
        type: I.Element,
        tagName: S,
        attributes: v,
        childNodes: [],
        isSVG: Tr(t) || void 0,
        needBlock: p,
        rootId: g,
      }
    );
  }
  function P(t) {
    return t == null ? "" : t.toLowerCase();
  }
  function Lr(t, e) {
    return !!(
      (e.comment && t.type === I.Comment) ||
      (t.type === I.Element &&
        ((e.script &&
          (t.tagName === "script" ||
            (t.tagName === "link" &&
              (t.attributes.rel === "preload" ||
                t.attributes.rel === "modulepreload") &&
              t.attributes.as === "script") ||
            (t.tagName === "link" &&
              t.attributes.rel === "prefetch" &&
              typeof t.attributes.href == "string" &&
              t.attributes.href.endsWith(".js")))) ||
          (e.headFavicon &&
            ((t.tagName === "link" && t.attributes.rel === "shortcut icon") ||
              (t.tagName === "meta" &&
                (P(t.attributes.name).match(
                  /^msapplication-tile(image|color)$/
                ) ||
                  P(t.attributes.name) === "application-name" ||
                  P(t.attributes.rel) === "icon" ||
                  P(t.attributes.rel) === "apple-touch-icon" ||
                  P(t.attributes.rel) === "shortcut icon")))) ||
          (t.tagName === "meta" &&
            ((e.headMetaDescKeywords &&
              P(t.attributes.name).match(/^description|keywords$/)) ||
              (e.headMetaSocial &&
                (P(t.attributes.property).match(/^(og|twitter|fb):/) ||
                  P(t.attributes.name).match(/^(og|twitter):/) ||
                  P(t.attributes.name) === "pinterest")) ||
              (e.headMetaRobots &&
                (P(t.attributes.name) === "robots" ||
                  P(t.attributes.name) === "googlebot" ||
                  P(t.attributes.name) === "bingbot")) ||
              (e.headMetaHttpEquiv && t.attributes["http-equiv"] !== void 0) ||
              (e.headMetaAuthorship &&
                (P(t.attributes.name) === "author" ||
                  P(t.attributes.name) === "generator" ||
                  P(t.attributes.name) === "framework" ||
                  P(t.attributes.name) === "publisher" ||
                  P(t.attributes.name) === "progid" ||
                  P(t.attributes.property).match(/^article:/) ||
                  P(t.attributes.property).match(/^product:/))) ||
              (e.headMetaVerification &&
                (P(t.attributes.name) === "google-site-verification" ||
                  P(t.attributes.name) === "yandex-verification" ||
                  P(t.attributes.name) === "csrf-token" ||
                  P(t.attributes.name) === "p:domain_verify" ||
                  P(t.attributes.name) === "verify-v1" ||
                  P(t.attributes.name) === "verification" ||
                  P(t.attributes.name) === "shopify-checkout-api-token"))))))
    );
  }
  function Ne(t, e) {
    var n = e.doc,
      r = e.mirror,
      o = e.blockClass,
      a = e.blockSelector,
      i = e.maskTextClass,
      s = e.maskTextSelector,
      l = e.skipChild,
      c = l === void 0 ? !1 : l,
      u = e.inlineStylesheet,
      d = u === void 0 ? !0 : u,
      h = e.maskInputOptions,
      f = h === void 0 ? {} : h,
      m = e.maskTextFn,
      y = e.maskInputFn,
      g = e.slimDOMOptions,
      p = e.dataURLOptions,
      S = p === void 0 ? {} : p,
      v = e.inlineImages,
      E = v === void 0 ? !1 : v,
      D = e.recordCanvas,
      R = D === void 0 ? !1 : D,
      W = e.onSerialize,
      A = e.onIframeLoad,
      te = e.iframeLoadTimeout,
      X = te === void 0 ? 5e3 : te,
      Z = e.onStylesheetLoad,
      ne = e.stylesheetLoadTimeout,
      K = ne === void 0 ? 5e3 : ne,
      oe = e.keepIframeSrcFn,
      F =
        oe === void 0
          ? function () {
              return !1;
            }
          : oe,
      H = e.newlyAddedElement,
      _ = H === void 0 ? !1 : H,
      q = e.preserveWhiteSpace,
      w = q === void 0 ? !0 : q,
      b = kr(t, {
        doc: n,
        mirror: r,
        blockClass: o,
        blockSelector: a,
        maskTextClass: i,
        maskTextSelector: s,
        inlineStylesheet: d,
        maskInputOptions: f,
        maskTextFn: m,
        maskInputFn: y,
        dataURLOptions: S,
        inlineImages: E,
        recordCanvas: R,
        keepIframeSrcFn: F,
        newlyAddedElement: _,
      });
    if (!b) return console.warn(t, "not serialized"), null;
    var M;
    r.hasNode(t)
      ? (M = r.getId(t))
      : Lr(b, g) ||
        (!w &&
          b.type === I.Text &&
          !b.isStyle &&
          !b.textContent.replace(/^\s+|\s+$/gm, "").length)
      ? (M = We)
      : (M = Vt());
    var k = Object.assign(b, { id: M });
    if ((r.add(t, k), M === We)) return null;
    W && W(t);
    var Y = !c;
    if (k.type === I.Element) {
      (Y = Y && !k.needBlock), delete k.needBlock;
      var fe = t.shadowRoot;
      fe && Pe(fe) && (k.isShadowHost = !0);
    }
    if ((k.type === I.Document || k.type === I.Element) && Y) {
      g.headWhitespace &&
        k.type === I.Element &&
        k.tagName === "head" &&
        (w = !1);
      for (
        var de = {
            doc: n,
            mirror: r,
            blockClass: o,
            blockSelector: a,
            maskTextClass: i,
            maskTextSelector: s,
            skipChild: c,
            inlineStylesheet: d,
            maskInputOptions: f,
            maskTextFn: m,
            maskInputFn: y,
            slimDOMOptions: g,
            dataURLOptions: S,
            inlineImages: E,
            recordCanvas: R,
            preserveWhiteSpace: w,
            onSerialize: W,
            onIframeLoad: A,
            iframeLoadTimeout: X,
            onStylesheetLoad: Z,
            stylesheetLoadTimeout: K,
            keepIframeSrcFn: F,
          },
          le = 0,
          _e = Array.from(t.childNodes);
        le < _e.length;
        le++
      ) {
        var be = _e[le],
          T = Ne(be, de);
        T && k.childNodes.push(T);
      }
      if (Pt(t) && t.shadowRoot)
        for (
          var re = 0, $ = Array.from(t.shadowRoot.childNodes);
          re < $.length;
          re++
        ) {
          var be = $[re],
            T = Ne(be, de);
          T && (Pe(t.shadowRoot) && (T.isShadow = !0), k.childNodes.push(T));
        }
    }
    return (
      t.parentNode && Fe(t.parentNode) && Pe(t.parentNode) && (k.isShadow = !0),
      k.type === I.Element &&
        k.tagName === "iframe" &&
        Mr(
          t,
          function () {
            var j = t.contentDocument;
            if (j && A) {
              var ye = Ne(j, {
                doc: j,
                mirror: r,
                blockClass: o,
                blockSelector: a,
                maskTextClass: i,
                maskTextSelector: s,
                skipChild: !1,
                inlineStylesheet: d,
                maskInputOptions: f,
                maskTextFn: m,
                maskInputFn: y,
                slimDOMOptions: g,
                dataURLOptions: S,
                inlineImages: E,
                recordCanvas: R,
                preserveWhiteSpace: w,
                onSerialize: W,
                onIframeLoad: A,
                iframeLoadTimeout: X,
                onStylesheetLoad: Z,
                stylesheetLoadTimeout: K,
                keepIframeSrcFn: F,
              });
              ye && A(t, ye);
            }
          },
          X
        ),
      k.type === I.Element &&
        k.tagName === "link" &&
        k.attributes.rel === "stylesheet" &&
        Dr(
          t,
          function () {
            if (Z) {
              var j = Ne(t, {
                doc: n,
                mirror: r,
                blockClass: o,
                blockSelector: a,
                maskTextClass: i,
                maskTextSelector: s,
                skipChild: !1,
                inlineStylesheet: d,
                maskInputOptions: f,
                maskTextFn: m,
                maskInputFn: y,
                slimDOMOptions: g,
                dataURLOptions: S,
                inlineImages: E,
                recordCanvas: R,
                preserveWhiteSpace: w,
                onSerialize: W,
                onIframeLoad: A,
                iframeLoadTimeout: X,
                onStylesheetLoad: Z,
                stylesheetLoadTimeout: K,
                keepIframeSrcFn: F,
              });
              j && Z(t, j);
            }
          },
          K
        ),
      k
    );
  }
  function Ar(t, e) {
    var n = e || {},
      r = n.mirror,
      o = r === void 0 ? new it() : r,
      a = n.blockClass,
      i = a === void 0 ? "rr-block" : a,
      s = n.blockSelector,
      l = s === void 0 ? null : s,
      c = n.maskTextClass,
      u = c === void 0 ? "rr-mask" : c,
      d = n.maskTextSelector,
      h = d === void 0 ? null : d,
      f = n.inlineStylesheet,
      m = f === void 0 ? !0 : f,
      y = n.inlineImages,
      g = y === void 0 ? !1 : y,
      p = n.recordCanvas,
      S = p === void 0 ? !1 : p,
      v = n.maskAllInputs,
      E = v === void 0 ? !1 : v,
      D = n.maskTextFn,
      R = n.maskInputFn,
      W = n.slimDOM,
      A = W === void 0 ? !1 : W,
      te = n.dataURLOptions,
      X = n.preserveWhiteSpace,
      Z = n.onSerialize,
      ne = n.onIframeLoad,
      K = n.iframeLoadTimeout,
      oe = n.onStylesheetLoad,
      F = n.stylesheetLoadTimeout,
      H = n.keepIframeSrcFn,
      _ =
        H === void 0
          ? function () {
              return !1;
            }
          : H,
      q =
        E === !0
          ? {
              color: !0,
              date: !0,
              "datetime-local": !0,
              email: !0,
              month: !0,
              number: !0,
              range: !0,
              search: !0,
              tel: !0,
              text: !0,
              time: !0,
              url: !0,
              week: !0,
              textarea: !0,
              select: !0,
              password: !0,
            }
          : E === !1
          ? { password: !0 }
          : E,
      w =
        A === !0 || A === "all"
          ? {
              script: !0,
              comment: !0,
              headFavicon: !0,
              headWhitespace: !0,
              headMetaDescKeywords: A === "all",
              headMetaSocial: !0,
              headMetaRobots: !0,
              headMetaHttpEquiv: !0,
              headMetaAuthorship: !0,
              headMetaVerification: !0,
            }
          : A === !1
          ? {}
          : A;
    return Ne(t, {
      doc: t,
      mirror: o,
      blockClass: i,
      blockSelector: l,
      maskTextClass: u,
      maskTextSelector: h,
      skipChild: !1,
      inlineStylesheet: m,
      maskInputOptions: q,
      maskTextFn: D,
      maskInputFn: R,
      slimDOMOptions: w,
      dataURLOptions: te,
      inlineImages: g,
      recordCanvas: S,
      preserveWhiteSpace: X,
      onSerialize: Z,
      onIframeLoad: ne,
      iframeLoadTimeout: K,
      onStylesheetLoad: oe,
      stylesheetLoadTimeout: F,
      keepIframeSrcFn: _,
      newlyAddedElement: !1,
    });
  }
  var Ht = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
  function _r(t, e) {
    e === void 0 && (e = {});
    var n = 1,
      r = 1;
    function o(w) {
      var b = w.match(/\n/g);
      b && (n += b.length);
      var M = w.lastIndexOf(`
  `);
      r = M === -1 ? r + w.length : w.length - M;
    }
    function a() {
      var w = { line: n, column: r };
      return function (b) {
        return (b.position = new i(w)), m(), b;
      };
    }
    var i = (function () {
      function w(b) {
        (this.start = b),
          (this.end = { line: n, column: r }),
          (this.source = e.source);
      }
      return w;
    })();
    i.prototype.content = t;
    var s = [];
    function l(w) {
      var b = new Error(
        ""
          .concat(e.source || "", ":")
          .concat(n, ":")
          .concat(r, ": ")
          .concat(w)
      );
      if (
        ((b.reason = w),
        (b.filename = e.source),
        (b.line = n),
        (b.column = r),
        (b.source = t),
        e.silent)
      )
        s.push(b);
      else throw b;
    }
    function c() {
      var w = h();
      return {
        type: "stylesheet",
        stylesheet: { source: e.source, rules: w, parsingErrors: s },
      };
    }
    function u() {
      return f(/^{\s*/);
    }
    function d() {
      return f(/^}/);
    }
    function h() {
      var w,
        b = [];
      for (m(), y(b); t.length && t.charAt(0) !== "}" && (w = _() || q()); )
        w !== !1 && (b.push(w), y(b));
      return b;
    }
    function f(w) {
      var b = w.exec(t);
      if (b) {
        var M = b[0];
        return o(M), (t = t.slice(M.length)), b;
      }
    }
    function m() {
      f(/^\s*/);
    }
    function y(w) {
      w === void 0 && (w = []);
      for (var b; (b = g()); ) b !== !1 && w.push(b), (b = g());
      return w;
    }
    function g() {
      var w = a();
      if (!(t.charAt(0) !== "/" || t.charAt(1) !== "*")) {
        for (
          var b = 2;
          t.charAt(b) !== "" &&
          (t.charAt(b) !== "*" || t.charAt(b + 1) !== "/");

        )
          ++b;
        if (((b += 2), t.charAt(b - 1) === ""))
          return l("End of comment missing");
        var M = t.slice(2, b - 2);
        return (
          (r += 2),
          o(M),
          (t = t.slice(b)),
          (r += 2),
          w({ type: "comment", comment: M })
        );
      }
    }
    function p() {
      var w = f(/^([^{]+)/);
      if (w)
        return he(w[0])
          .replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, "")
          .replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function (b) {
            return b.replace(/,/g, "\u200C");
          })
          .split(/\s*(?![^(]*\)),\s*/)
          .map(function (b) {
            return b.replace(/\u200C/g, ",");
          });
    }
    function S() {
      var w = a(),
        b = f(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
      if (b) {
        var M = he(b[0]);
        if (!f(/^:\s*/)) return l("property missing ':'");
        var k = f(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/),
          Y = w({
            type: "declaration",
            property: M.replace(Ht, ""),
            value: k ? he(k[0]).replace(Ht, "") : "",
          });
        return f(/^[;\s]*/), Y;
      }
    }
    function v() {
      var w = [];
      if (!u()) return l("missing '{'");
      y(w);
      for (var b; (b = S()); ) b !== !1 && (w.push(b), y(w)), (b = S());
      return d() ? w : l("missing '}'");
    }
    function E() {
      for (
        var w, b = [], M = a();
        (w = f(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/));

      )
        b.push(w[1]), f(/^,\s*/);
      if (b.length)
        return M({ type: "keyframe", values: b, declarations: v() });
    }
    function D() {
      var w = a(),
        b = f(/^@([-\w]+)?keyframes\s*/);
      if (b) {
        var M = b[1];
        if (((b = f(/^([-\w]+)\s*/)), !b)) return l("@keyframes missing name");
        var k = b[1];
        if (!u()) return l("@keyframes missing '{'");
        for (var Y, fe = y(); (Y = E()); ) fe.push(Y), (fe = fe.concat(y()));
        return d()
          ? w({ type: "keyframes", name: k, vendor: M, keyframes: fe })
          : l("@keyframes missing '}'");
      }
    }
    function R() {
      var w = a(),
        b = f(/^@supports *([^{]+)/);
      if (b) {
        var M = he(b[1]);
        if (!u()) return l("@supports missing '{'");
        var k = y().concat(h());
        return d()
          ? w({ type: "supports", supports: M, rules: k })
          : l("@supports missing '}'");
      }
    }
    function W() {
      var w = a(),
        b = f(/^@host\s*/);
      if (b) {
        if (!u()) return l("@host missing '{'");
        var M = y().concat(h());
        return d() ? w({ type: "host", rules: M }) : l("@host missing '}'");
      }
    }
    function A() {
      var w = a(),
        b = f(/^@media *([^{]+)/);
      if (b) {
        var M = he(b[1]);
        if (!u()) return l("@media missing '{'");
        var k = y().concat(h());
        return d()
          ? w({ type: "media", media: M, rules: k })
          : l("@media missing '}'");
      }
    }
    function te() {
      var w = a(),
        b = f(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
      if (b)
        return w({ type: "custom-media", name: he(b[1]), media: he(b[2]) });
    }
    function X() {
      var w = a(),
        b = f(/^@page */);
      if (b) {
        var M = p() || [];
        if (!u()) return l("@page missing '{'");
        for (var k = y(), Y; (Y = S()); ) k.push(Y), (k = k.concat(y()));
        return d()
          ? w({ type: "page", selectors: M, declarations: k })
          : l("@page missing '}'");
      }
    }
    function Z() {
      var w = a(),
        b = f(/^@([-\w]+)?document *([^{]+)/);
      if (b) {
        var M = he(b[1]),
          k = he(b[2]);
        if (!u()) return l("@document missing '{'");
        var Y = y().concat(h());
        return d()
          ? w({ type: "document", document: k, vendor: M, rules: Y })
          : l("@document missing '}'");
      }
    }
    function ne() {
      var w = a(),
        b = f(/^@font-face\s*/);
      if (b) {
        if (!u()) return l("@font-face missing '{'");
        for (var M = y(), k; (k = S()); ) M.push(k), (M = M.concat(y()));
        return d()
          ? w({ type: "font-face", declarations: M })
          : l("@font-face missing '}'");
      }
    }
    var K = H("import"),
      oe = H("charset"),
      F = H("namespace");
    function H(w) {
      var b = new RegExp("^@" + w + "\\s*([^;]+);");
      return function () {
        var M = a(),
          k = f(b);
        if (k) {
          var Y = { type: w };
          return (Y[w] = k[1].trim()), M(Y);
        }
      };
    }
    function _() {
      if (t[0] === "@")
        return (
          D() ||
          A() ||
          te() ||
          R() ||
          K() ||
          oe() ||
          F() ||
          Z() ||
          X() ||
          W() ||
          ne()
        );
    }
    function q() {
      var w = a(),
        b = p();
      return b
        ? (y(), w({ type: "rule", selectors: b, declarations: v() }))
        : l("selector missing");
    }
    return ut(c());
  }
  function he(t) {
    return t ? t.replace(/^\s+|\s+$/g, "") : "";
  }
  function ut(t, e) {
    for (
      var n = t && typeof t.type == "string",
        r = n ? t : e,
        o = 0,
        a = Object.keys(t);
      o < a.length;
      o++
    ) {
      var i = a[o],
        s = t[i];
      Array.isArray(s)
        ? s.forEach(function (l) {
            ut(l, r);
          })
        : s && typeof s == "object" && ut(s, r);
    }
    return (
      n &&
        Object.defineProperty(t, "parent", {
          configurable: !0,
          writable: !0,
          enumerable: !1,
          value: e || null,
        }),
      t
    );
  }
  var Yt = {
    script: "noscript",
    altglyph: "altGlyph",
    altglyphdef: "altGlyphDef",
    altglyphitem: "altGlyphItem",
    animatecolor: "animateColor",
    animatemotion: "animateMotion",
    animatetransform: "animateTransform",
    clippath: "clipPath",
    feblend: "feBlend",
    fecolormatrix: "feColorMatrix",
    fecomponenttransfer: "feComponentTransfer",
    fecomposite: "feComposite",
    feconvolvematrix: "feConvolveMatrix",
    fediffuselighting: "feDiffuseLighting",
    fedisplacementmap: "feDisplacementMap",
    fedistantlight: "feDistantLight",
    fedropshadow: "feDropShadow",
    feflood: "feFlood",
    fefunca: "feFuncA",
    fefuncb: "feFuncB",
    fefuncg: "feFuncG",
    fefuncr: "feFuncR",
    fegaussianblur: "feGaussianBlur",
    feimage: "feImage",
    femerge: "feMerge",
    femergenode: "feMergeNode",
    femorphology: "feMorphology",
    feoffset: "feOffset",
    fepointlight: "fePointLight",
    fespecularlighting: "feSpecularLighting",
    fespotlight: "feSpotLight",
    fetile: "feTile",
    feturbulence: "feTurbulence",
    foreignobject: "foreignObject",
    glyphref: "glyphRef",
    lineargradient: "linearGradient",
    radialgradient: "radialGradient",
  };
  function Fr(t) {
    var e = Yt[t.tagName] ? Yt[t.tagName] : t.tagName;
    return e === "link" && t.attributes._cssText && (e = "style"), e;
  }
  function Pr(t) {
    return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  var Xt = /([^\\]):hover/,
    Wr = new RegExp(Xt.source, "g");
  function Zt(t, e) {
    var n = e?.stylesWithHoverClass.get(t);
    if (n) return n;
    var r = _r(t, { silent: !0 });
    if (!r.stylesheet) return t;
    var o = [];
    if (
      (r.stylesheet.rules.forEach(function (s) {
        "selectors" in s &&
          (s.selectors || []).forEach(function (l) {
            Xt.test(l) && o.push(l);
          });
      }),
      o.length === 0)
    )
      return t;
    var a = new RegExp(
        o
          .filter(function (s, l) {
            return o.indexOf(s) === l;
          })
          .sort(function (s, l) {
            return l.length - s.length;
          })
          .map(function (s) {
            return Pr(s);
          })
          .join("|"),
        "g"
      ),
      i = t.replace(a, function (s) {
        var l = s.replace(Wr, "$1.\\:hover");
        return "".concat(s, ", ").concat(l);
      });
    return e?.stylesWithHoverClass.set(t, i), i;
  }
  function Kt() {
    var t = new Map();
    return { stylesWithHoverClass: t };
  }
  function $r(t, e) {
    var n = e.doc,
      r = e.hackCss,
      o = e.cache;
    switch (t.type) {
      case I.Document:
        return n.implementation.createDocument(null, "", null);
      case I.DocumentType:
        return n.implementation.createDocumentType(
          t.name || "html",
          t.publicId,
          t.systemId
        );
      case I.Element: {
        var a = Fr(t),
          i;
        t.isSVG
          ? (i = n.createElementNS("http://www.w3.org/2000/svg", a))
          : (i = n.createElement(a));
        var s = {};
        for (var l in t.attributes)
          if (Object.prototype.hasOwnProperty.call(t.attributes, l)) {
            var c = t.attributes[l];
            if (
              !(a === "option" && l === "selected" && c === !1) &&
              c !== null
            ) {
              if ((c === !0 && (c = ""), l.startsWith("rr_"))) {
                s[l] = c;
                continue;
              }
              var u = a === "textarea" && l === "value",
                d = a === "style" && l === "_cssText";
              if (
                (d && r && typeof c == "string" && (c = Zt(c, o)),
                (u || d) && typeof c == "string")
              ) {
                for (
                  var h = n.createTextNode(c),
                    f = 0,
                    m = Array.from(i.childNodes);
                  f < m.length;
                  f++
                ) {
                  var y = m[f];
                  y.nodeType === i.TEXT_NODE && i.removeChild(y);
                }
                i.appendChild(h);
                continue;
              }
              try {
                if (t.isSVG && l === "xlink:href")
                  i.setAttributeNS(
                    "http://www.w3.org/1999/xlink",
                    l,
                    c.toString()
                  );
                else if (
                  l === "onload" ||
                  l === "onclick" ||
                  l.substring(0, 7) === "onmouse"
                )
                  i.setAttribute("_" + l, c.toString());
                else if (
                  a === "meta" &&
                  t.attributes["http-equiv"] === "Content-Security-Policy" &&
                  l === "content"
                ) {
                  i.setAttribute("csp-content", c.toString());
                  continue;
                } else
                  (a === "link" &&
                    (t.attributes.rel === "preload" ||
                      t.attributes.rel === "modulepreload") &&
                    t.attributes.as === "script") ||
                    (a === "link" &&
                      t.attributes.rel === "prefetch" &&
                      typeof t.attributes.href == "string" &&
                      t.attributes.href.endsWith(".js")) ||
                    (a === "img" &&
                    t.attributes.srcset &&
                    t.attributes.rr_dataURL
                      ? i.setAttribute(
                          "rrweb-original-srcset",
                          t.attributes.srcset
                        )
                      : i.setAttribute(l, c.toString()));
              } catch {}
            }
          }
        var g = function (S) {
          var v = s[S];
          if (a === "canvas" && S === "rr_dataURL") {
            var E = document.createElement("img");
            (E.onload = function () {
              var R = i.getContext("2d");
              R && R.drawImage(E, 0, 0, E.width, E.height);
            }),
              (E.src = v.toString()),
              i.RRNodeType && (i.rr_dataURL = v.toString());
          } else if (a === "img" && S === "rr_dataURL") {
            var D = i;
            D.currentSrc.startsWith("data:") ||
              (D.setAttribute("rrweb-original-src", t.attributes.src),
              (D.src = v.toString()));
          }
          if (S === "rr_width") i.style.width = v.toString();
          else if (S === "rr_height") i.style.height = v.toString();
          else if (S === "rr_mediaCurrentTime" && typeof v == "number")
            i.currentTime = v;
          else if (S === "rr_mediaState")
            switch (v) {
              case "played":
                i.play().catch(function (R) {
                  return console.warn("media playback error", R);
                });
                break;
              case "paused":
                i.pause();
                break;
            }
        };
        for (var p in s) g(p);
        if (t.isShadowHost)
          if (!i.shadowRoot) i.attachShadow({ mode: "open" });
          else
            for (; i.shadowRoot.firstChild; )
              i.shadowRoot.removeChild(i.shadowRoot.firstChild);
        return i;
      }
      case I.Text:
        return n.createTextNode(
          t.isStyle && r ? Zt(t.textContent, o) : t.textContent
        );
      case I.CDATA:
        return n.createCDATASection(t.textContent);
      case I.Comment:
        return n.createComment(t.textContent);
      default:
        return null;
    }
  }
  function $e(t, e) {
    var n = e.doc,
      r = e.mirror,
      o = e.skipChild,
      a = o === void 0 ? !1 : o,
      i = e.hackCss,
      s = i === void 0 ? !0 : i,
      l = e.afterAppend,
      c = e.cache;
    if (r.has(t.id)) {
      var u = r.getNode(t.id),
        d = r.getMeta(u);
      if (hr(d, t)) return r.getNode(t.id);
    }
    var h = $r(t, { doc: n, hackCss: s, cache: c });
    if (!h) return null;
    if (
      (t.rootId && r.getNode(t.rootId) !== n && r.replace(t.rootId, n),
      t.type === I.Document &&
        (n.close(),
        n.open(),
        t.compatMode === "BackCompat" &&
          t.childNodes &&
          t.childNodes[0].type !== I.DocumentType &&
          (t.childNodes[0].type === I.Element &&
          "xmlns" in t.childNodes[0].attributes &&
          t.childNodes[0].attributes.xmlns === "http://www.w3.org/1999/xhtml"
            ? n.write(
                '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "">'
              )
            : n.write(
                '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "">'
              )),
        (h = n)),
      r.add(h, t),
      (t.type === I.Document || t.type === I.Element) && !a)
    )
      for (
        var f = function (p) {
            var S = $e(p, {
              doc: n,
              mirror: r,
              skipChild: !1,
              hackCss: s,
              afterAppend: l,
              cache: c,
            });
            if (!S) return console.warn("Failed to rebuild", p), "continue";
            if (p.isShadow && Pt(h) && h.shadowRoot)
              h.shadowRoot.appendChild(S);
            else if (t.type === I.Document && p.type == I.Element) {
              var v = S,
                E = null;
              v.childNodes.forEach(function (D) {
                D.nodeName === "BODY" && (E = D);
              }),
                E
                  ? (v.removeChild(E), h.appendChild(S), v.appendChild(E))
                  : h.appendChild(S);
            } else h.appendChild(S);
            l && l(S, p.id);
          },
          m = 0,
          y = t.childNodes;
        m < y.length;
        m++
      ) {
        var g = y[m];
        f(g);
      }
    return h;
  }
  function Ur(t, e) {
    function n(i) {
      e(i);
    }
    for (var r = 0, o = t.getIds(); r < o.length; r++) {
      var a = o[r];
      t.has(a) && n(t.getNode(a));
    }
  }
  function Vr(t, e) {
    var n = e.getMeta(t);
    if (n?.type === I.Element) {
      var r = t;
      for (var o in n.attributes)
        if (
          Object.prototype.hasOwnProperty.call(n.attributes, o) &&
          o.startsWith("rr_")
        ) {
          var a = n.attributes[o];
          o === "rr_scrollLeft" && (r.scrollLeft = a),
            o === "rr_scrollTop" && (r.scrollTop = a);
        }
    }
  }
  function Br(t, e) {
    var n = e.doc,
      r = e.onVisit,
      o = e.hackCss,
      a = o === void 0 ? !0 : o,
      i = e.afterAppend,
      s = e.cache,
      l = e.mirror,
      c = l === void 0 ? new it() : l,
      u = $e(t, {
        doc: n,
        mirror: c,
        skipChild: !1,
        hackCss: a,
        afterAppend: i,
        cache: s,
      });
    return (
      Ur(c, function (d) {
        r && r(d), Vr(d, c);
      }),
      u
    );
  }
  function J(t, e, n = document) {
    const r = { capture: !0, passive: !0 };
    return n.addEventListener(t, e, r), () => n.removeEventListener(t, e, r);
  }
  const Te = `Please stop import mirror directly. Instead of that,\r
  now you can use replayer.getMirror() to access the mirror instance of a replayer,\r
  or you can use record.mirror to access the mirror instance during recording.`;
  (ee.mirror = {
    map: {},
    getId() {
      return console.error(Te), -1;
    },
    getNode() {
      return console.error(Te), null;
    },
    removeNodeFromMap() {
      console.error(Te);
    },
    has() {
      return console.error(Te), !1;
    },
    reset() {
      console.error(Te);
    },
  }),
    typeof window < "u" &&
      window.Proxy &&
      window.Reflect &&
      (ee.mirror = new Proxy(ee.mirror, {
        get(t, e, n) {
          return e === "map" && console.error(Te), Reflect.get(t, e, n);
        },
      }));
  function Ie(t, e, n = {}) {
    let r = null,
      o = 0;
    return function (...a) {
      const i = Date.now();
      !o && n.leading === !1 && (o = i);
      const s = e - (i - o),
        l = this;
      s <= 0 || s > e
        ? (r && (clearTimeout(r), (r = null)), (o = i), t.apply(l, a))
        : !r &&
          n.trailing !== !1 &&
          (r = setTimeout(() => {
            (o = n.leading === !1 ? 0 : Date.now()), (r = null), t.apply(l, a);
          }, s));
    };
  }
  function Ue(t, e, n, r, o = window) {
    const a = o.Object.getOwnPropertyDescriptor(t, e);
    return (
      o.Object.defineProperty(
        t,
        e,
        r
          ? n
          : {
              set(i) {
                setTimeout(() => {
                  n.set.call(this, i);
                }, 0),
                  a && a.set && a.set.call(this, i);
              },
            }
      ),
      () => Ue(t, e, a || {}, !0)
    );
  }
  function Me(t, e, n) {
    try {
      if (!(e in t)) return () => {};
      const r = t[e],
        o = n(r);
      return (
        typeof o == "function" &&
          ((o.prototype = o.prototype || {}),
          Object.defineProperties(o, {
            __rrweb_original__: { enumerable: !1, value: r },
          })),
        (t[e] = o),
        () => {
          t[e] = r;
        }
      );
    } catch {
      return () => {};
    }
  }
  function dt(t) {
    var e, n, r, o, a, i;
    const s = t.document;
    return {
      left: s.scrollingElement
        ? s.scrollingElement.scrollLeft
        : t.pageXOffset !== void 0
        ? t.pageXOffset
        : s?.documentElement.scrollLeft ||
          ((n = (e = s?.body) == null ? void 0 : e.parentElement) == null
            ? void 0
            : n.scrollLeft) ||
          ((r = s?.body) == null ? void 0 : r.scrollLeft) ||
          0,
      top: s.scrollingElement
        ? s.scrollingElement.scrollTop
        : t.pageYOffset !== void 0
        ? t.pageYOffset
        : s?.documentElement.scrollTop ||
          ((a = (o = s?.body) == null ? void 0 : o.parentElement) == null
            ? void 0
            : a.scrollTop) ||
          ((i = s?.body) == null ? void 0 : i.scrollTop) ||
          0,
    };
  }
  function ht() {
    return (
      window.innerHeight ||
      (document.documentElement && document.documentElement.clientHeight) ||
      (document.body && document.body.clientHeight)
    );
  }
  function pt() {
    return (
      window.innerWidth ||
      (document.documentElement && document.documentElement.clientWidth) ||
      (document.body && document.body.clientWidth)
    );
  }
  function Q(t, e, n, r) {
    if (!t) return !1;
    const o = t.nodeType === t.ELEMENT_NODE ? t : t.parentElement;
    if (!o) return !1;
    try {
      if (typeof e == "string") {
        if (o.classList.contains(e) || (r && o.closest("." + e) !== null))
          return !0;
      } else if (Ye(o, e, r)) return !0;
    } catch {}
    return !!(n && (o.matches(n) || (r && o.closest(n) !== null)));
  }
  function Jt(t, e) {
    return e.getId(t) !== -1;
  }
  function Xe(t, e) {
    return e.getId(t) === We;
  }
  function mt(t, e) {
    if (Fe(t)) return !1;
    const n = e.getId(t);
    return e.has(n)
      ? t.parentNode && t.parentNode.nodeType === t.DOCUMENT_NODE
        ? !1
        : t.parentNode
        ? mt(t.parentNode, e)
        : !0
      : !0;
  }
  function ft(t) {
    return Boolean(t.changedTouches);
  }
  function yt(t = window) {
    "NodeList" in t &&
      !t.NodeList.prototype.forEach &&
      (t.NodeList.prototype.forEach = Array.prototype.forEach),
      "DOMTokenList" in t &&
        !t.DOMTokenList.prototype.forEach &&
        (t.DOMTokenList.prototype.forEach = Array.prototype.forEach),
      Node.prototype.contains ||
        (Node.prototype.contains = (...e) => {
          let n = e[0];
          if (!(0 in e)) throw new TypeError("1 argument is required");
          do if (this === n) return !0;
          while ((n = n && n.parentNode));
          return !1;
        });
  }
  function Qt(t) {
    const e = {},
      n = (o, a) => {
        const i = { value: o, parent: a, children: [] };
        return (e[o.node.id] = i), i;
      },
      r = [];
    for (const o of t) {
      const { nextId: a, parentId: i } = o;
      if (a && a in e) {
        const s = e[a];
        if (s.parent) {
          const l = s.parent.children.indexOf(s);
          s.parent.children.splice(l, 0, n(o, s.parent));
        } else {
          const l = r.indexOf(s);
          r.splice(l, 0, n(o, null));
        }
        continue;
      }
      if (i in e) {
        const s = e[i];
        s.children.push(n(o, s));
        continue;
      }
      r.push(n(o, null));
    }
    return r;
  }
  function gt(t, e) {
    e(t.value);
    for (let n = t.children.length - 1; n >= 0; n--) gt(t.children[n], e);
  }
  function De(t, e) {
    return Boolean(t.nodeName === "IFRAME" && e.getMeta(t));
  }
  function vt(t, e) {
    return Boolean(
      t.nodeName === "LINK" &&
        t.nodeType === t.ELEMENT_NODE &&
        t.getAttribute &&
        t.getAttribute("rel") === "stylesheet" &&
        e.getMeta(t)
    );
  }
  function St(t, e) {
    var n, r;
    const o =
      (r = (n = t.ownerDocument) == null ? void 0 : n.defaultView) == null
        ? void 0
        : r.frameElement;
    if (!o || o === e)
      return { x: 0, y: 0, relativeScale: 1, absoluteScale: 1 };
    const a = o.getBoundingClientRect(),
      i = St(o, e),
      s = a.height / o.clientHeight;
    return {
      x: a.x * i.relativeScale + i.x,
      y: a.y * i.relativeScale + i.y,
      relativeScale: s,
      absoluteScale: i.absoluteScale * s,
    };
  }
  function ge(t) {
    return Boolean(t?.shadowRoot);
  }
  function ke(t, e) {
    const n = t[e[0]];
    return e.length === 1 ? n : ke(n.cssRules[e[1]].cssRules, e.slice(2));
  }
  function bt(t) {
    const e = [...t],
      n = e.pop();
    return { positions: e, index: n };
  }
  function qt(t) {
    const e = new Set(),
      n = [];
    for (let r = t.length; r--; ) {
      const o = t[r];
      e.has(o.id) || (n.push(o), e.add(o.id));
    }
    return n;
  }
  class wt {
    constructor() {
      (this.id = 1),
        (this.styleIDMap = new WeakMap()),
        (this.idStyleMap = new Map());
    }
    getId(e) {
      var n;
      return (n = this.styleIDMap.get(e)) != null ? n : -1;
    }
    has(e) {
      return this.styleIDMap.has(e);
    }
    add(e, n) {
      if (this.has(e)) return this.getId(e);
      let r;
      return (
        n === void 0 ? (r = this.id++) : (r = n),
        this.styleIDMap.set(e, r),
        this.idStyleMap.set(r, e),
        r
      );
    }
    getStyle(e) {
      return this.idStyleMap.get(e) || null;
    }
    reset() {
      (this.styleIDMap = new WeakMap()),
        (this.idStyleMap = new Map()),
        (this.id = 1);
    }
    generateId() {
      return this.id++;
    }
  }
  function Ct(t) {
    var e, n;
    let r = null;
    return (
      ((n = (e = t.getRootNode) == null ? void 0 : e.call(t)) == null
        ? void 0
        : n.nodeType) === Node.DOCUMENT_FRAGMENT_NODE &&
        t.getRootNode().host &&
        (r = t.getRootNode().host),
      r
    );
  }
  function en(t) {
    let e = t,
      n;
    for (; (n = Ct(e)); ) e = n;
    return e;
  }
  function tn(t) {
    const e = t.ownerDocument;
    if (!e) return !1;
    const n = en(t);
    return e.contains(n);
  }
  function Et(t) {
    const e = t.ownerDocument;
    return e ? e.contains(t) || tn(t) : !1;
  }
  var jr = Object.freeze({
      __proto__: null,
      on: J,
      get _mirror() {
        return ee.mirror;
      },
      throttle: Ie,
      hookSetter: Ue,
      patch: Me,
      getWindowScroll: dt,
      getWindowHeight: ht,
      getWindowWidth: pt,
      isBlocked: Q,
      isSerialized: Jt,
      isIgnored: Xe,
      isAncestorRemoved: mt,
      isTouchEvent: ft,
      polyfill: yt,
      queueToResolveTrees: Qt,
      iterateResolveTree: gt,
      isSerializedIframe: De,
      isSerializedStylesheet: vt,
      getBaseDimension: St,
      hasShadowRoot: ge,
      getNestedRule: ke,
      getPositionsAndIndex: bt,
      uniqueTextMutations: qt,
      StyleSheetMirror: wt,
      getShadowHost: Ct,
      getRootShadowHost: en,
      shadowHostInDom: tn,
      inDom: Et,
    }),
    N = ((t) => (
      (t[(t.DomContentLoaded = 0)] = "DomContentLoaded"),
      (t[(t.Load = 1)] = "Load"),
      (t[(t.FullSnapshot = 2)] = "FullSnapshot"),
      (t[(t.IncrementalSnapshot = 3)] = "IncrementalSnapshot"),
      (t[(t.Meta = 4)] = "Meta"),
      (t[(t.Custom = 5)] = "Custom"),
      (t[(t.Plugin = 6)] = "Plugin"),
      t
    ))(N || {}),
    C = ((t) => (
      (t[(t.Mutation = 0)] = "Mutation"),
      (t[(t.MouseMove = 1)] = "MouseMove"),
      (t[(t.MouseInteraction = 2)] = "MouseInteraction"),
      (t[(t.Scroll = 3)] = "Scroll"),
      (t[(t.ViewportResize = 4)] = "ViewportResize"),
      (t[(t.Input = 5)] = "Input"),
      (t[(t.TouchMove = 6)] = "TouchMove"),
      (t[(t.MediaInteraction = 7)] = "MediaInteraction"),
      (t[(t.StyleSheetRule = 8)] = "StyleSheetRule"),
      (t[(t.CanvasMutation = 9)] = "CanvasMutation"),
      (t[(t.Font = 10)] = "Font"),
      (t[(t.Log = 11)] = "Log"),
      (t[(t.Drag = 12)] = "Drag"),
      (t[(t.StyleDeclaration = 13)] = "StyleDeclaration"),
      (t[(t.Selection = 14)] = "Selection"),
      (t[(t.AdoptedStyleSheet = 15)] = "AdoptedStyleSheet"),
      t
    ))(C || {}),
    V = ((t) => (
      (t[(t.MouseUp = 0)] = "MouseUp"),
      (t[(t.MouseDown = 1)] = "MouseDown"),
      (t[(t.Click = 2)] = "Click"),
      (t[(t.ContextMenu = 3)] = "ContextMenu"),
      (t[(t.DblClick = 4)] = "DblClick"),
      (t[(t.Focus = 5)] = "Focus"),
      (t[(t.Blur = 6)] = "Blur"),
      (t[(t.TouchStart = 7)] = "TouchStart"),
      (t[(t.TouchMove_Departed = 8)] = "TouchMove_Departed"),
      (t[(t.TouchEnd = 9)] = "TouchEnd"),
      (t[(t.TouchCancel = 10)] = "TouchCancel"),
      t
    ))(V || {}),
    pe = ((t) => (
      (t[(t["2D"] = 0)] = "2D"),
      (t[(t.WebGL = 1)] = "WebGL"),
      (t[(t.WebGL2 = 2)] = "WebGL2"),
      t
    ))(pe || {}),
    me = ((t) => (
      (t[(t.Play = 0)] = "Play"),
      (t[(t.Pause = 1)] = "Pause"),
      (t[(t.Seeked = 2)] = "Seeked"),
      (t[(t.VolumeChange = 3)] = "VolumeChange"),
      (t[(t.RateChange = 4)] = "RateChange"),
      t
    ))(me || {}),
    L = ((t) => (
      (t.Start = "start"),
      (t.Pause = "pause"),
      (t.Resume = "resume"),
      (t.Resize = "resize"),
      (t.Finish = "finish"),
      (t.FullsnapshotRebuilded = "fullsnapshot-rebuilded"),
      (t.LoadStylesheetStart = "load-stylesheet-start"),
      (t.LoadStylesheetEnd = "load-stylesheet-end"),
      (t.SkipStart = "skip-start"),
      (t.SkipEnd = "skip-end"),
      (t.MouseInteraction = "mouse-interaction"),
      (t.EventCast = "event-cast"),
      (t.CustomEvent = "custom-event"),
      (t.Flush = "flush"),
      (t.StateChange = "state-change"),
      (t.PlayBack = "play-back"),
      (t.Destroy = "destroy"),
      t
    ))(L || {});
  function nn(t) {
    return "__ln" in t;
  }
  class Gr {
    constructor() {
      (this.length = 0), (this.head = null);
    }
    get(e) {
      if (e >= this.length) throw new Error("Position outside of list range");
      let n = this.head;
      for (let r = 0; r < e; r++) n = n?.next || null;
      return n;
    }
    addNode(e) {
      const n = { value: e, previous: null, next: null };
      if (((e.__ln = n), e.previousSibling && nn(e.previousSibling))) {
        const r = e.previousSibling.__ln.next;
        (n.next = r),
          (n.previous = e.previousSibling.__ln),
          (e.previousSibling.__ln.next = n),
          r && (r.previous = n);
      } else if (
        e.nextSibling &&
        nn(e.nextSibling) &&
        e.nextSibling.__ln.previous
      ) {
        const r = e.nextSibling.__ln.previous;
        (n.previous = r),
          (n.next = e.nextSibling.__ln),
          (e.nextSibling.__ln.previous = n),
          r && (r.next = n);
      } else
        this.head && (this.head.previous = n),
          (n.next = this.head),
          (this.head = n);
      this.length++;
    }
    removeNode(e) {
      const n = e.__ln;
      !this.head ||
        (n.previous
          ? ((n.previous.next = n.next),
            n.next && (n.next.previous = n.previous))
          : ((this.head = n.next), this.head && (this.head.previous = null)),
        e.__ln && delete e.__ln,
        this.length--);
    }
  }
  const rn = (t, e) => `${t}@${e}`;
  class zr {
    constructor() {
      (this.frozen = !1),
        (this.locked = !1),
        (this.texts = []),
        (this.attributes = []),
        (this.removes = []),
        (this.mapRemoves = []),
        (this.movedMap = {}),
        (this.addedSet = new Set()),
        (this.movedSet = new Set()),
        (this.droppedSet = new Set()),
        (this.processMutations = (e) => {
          e.forEach(this.processMutation), this.emit();
        }),
        (this.emit = () => {
          if (this.frozen || this.locked) return;
          const e = [],
            n = new Gr(),
            r = (s) => {
              let l = s,
                c = We;
              for (; c === We; )
                (l = l && l.nextSibling), (c = l && this.mirror.getId(l));
              return c;
            },
            o = (s) => {
              if (!s.parentNode || !Et(s)) return;
              const l = Fe(s.parentNode)
                  ? this.mirror.getId(Ct(s))
                  : this.mirror.getId(s.parentNode),
                c = r(s);
              if (l === -1 || c === -1) return n.addNode(s);
              const u = Ne(s, {
                doc: this.doc,
                mirror: this.mirror,
                blockClass: this.blockClass,
                blockSelector: this.blockSelector,
                maskTextClass: this.maskTextClass,
                maskTextSelector: this.maskTextSelector,
                skipChild: !0,
                newlyAddedElement: !0,
                inlineStylesheet: this.inlineStylesheet,
                maskInputOptions: this.maskInputOptions,
                maskTextFn: this.maskTextFn,
                maskInputFn: this.maskInputFn,
                slimDOMOptions: this.slimDOMOptions,
                dataURLOptions: this.dataURLOptions,
                recordCanvas: this.recordCanvas,
                inlineImages: this.inlineImages,
                onSerialize: (d) => {
                  De(d, this.mirror) && this.iframeManager.addIframe(d),
                    vt(d, this.mirror) &&
                      this.stylesheetManager.trackLinkElement(d),
                    ge(s) &&
                      this.shadowDomManager.addShadowRoot(
                        s.shadowRoot,
                        this.doc
                      );
                },
                onIframeLoad: (d, h) => {
                  this.iframeManager.attachIframe(d, h),
                    this.shadowDomManager.observeAttachShadow(d);
                },
                onStylesheetLoad: (d, h) => {
                  this.stylesheetManager.attachLinkElement(d, h);
                },
              });
              u && e.push({ parentId: l, nextId: c, node: u });
            };
          for (; this.mapRemoves.length; )
            this.mirror.removeNodeFromMap(this.mapRemoves.shift());
          for (const s of this.movedSet)
            (on(this.removes, s, this.mirror) &&
              !this.movedSet.has(s.parentNode)) ||
              o(s);
          for (const s of this.addedSet)
            (!an(this.droppedSet, s) && !on(this.removes, s, this.mirror)) ||
            an(this.movedSet, s)
              ? o(s)
              : this.droppedSet.add(s);
          let a = null;
          for (; n.length; ) {
            let s = null;
            if (a) {
              const l = this.mirror.getId(a.value.parentNode),
                c = r(a.value);
              l !== -1 && c !== -1 && (s = a);
            }
            if (!s)
              for (let l = n.length - 1; l >= 0; l--) {
                const c = n.get(l);
                if (c) {
                  const u = this.mirror.getId(c.value.parentNode);
                  if (r(c.value) === -1) continue;
                  if (u !== -1) {
                    s = c;
                    break;
                  } else {
                    const d = c.value;
                    if (
                      d.parentNode &&
                      d.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE
                    ) {
                      const h = d.parentNode.host;
                      if (this.mirror.getId(h) !== -1) {
                        s = c;
                        break;
                      }
                    }
                  }
                }
              }
            if (!s) {
              for (; n.head; ) n.removeNode(n.head.value);
              break;
            }
            (a = s.previous), n.removeNode(s.value), o(s.value);
          }
          const i = {
            texts: this.texts
              .map((s) => ({ id: this.mirror.getId(s.node), value: s.value }))
              .filter((s) => this.mirror.has(s.id)),
            attributes: this.attributes
              .map((s) => ({
                id: this.mirror.getId(s.node),
                attributes: s.attributes,
              }))
              .filter((s) => this.mirror.has(s.id)),
            removes: this.removes,
            adds: e,
          };
          (!i.texts.length &&
            !i.attributes.length &&
            !i.removes.length &&
            !i.adds.length) ||
            ((this.texts = []),
            (this.attributes = []),
            (this.removes = []),
            (this.addedSet = new Set()),
            (this.movedSet = new Set()),
            (this.droppedSet = new Set()),
            (this.movedMap = {}),
            this.mutationCb(i));
        }),
        (this.processMutation = (e) => {
          if (!Xe(e.target, this.mirror))
            switch (e.type) {
              case "characterData": {
                const n = e.target.textContent;
                !Q(e.target, this.blockClass, this.blockSelector, !1) &&
                  n !== e.oldValue &&
                  this.texts.push({
                    value:
                      zt(e.target, this.maskTextClass, this.maskTextSelector) &&
                      n
                        ? this.maskTextFn
                          ? this.maskTextFn(n)
                          : n.replace(/[\S]/g, "*")
                        : n,
                    node: e.target,
                  });
                break;
              }
              case "attributes": {
                const n = e.target;
                let r = e.attributeName,
                  o = e.target.getAttribute(r);
                if (r === "value") {
                  const i = lt(n);
                  o = at({
                    maskInputOptions: this.maskInputOptions,
                    tagName: n.tagName,
                    type: i,
                    value: o,
                    maskInputFn: this.maskInputFn,
                  });
                }
                if (
                  Q(e.target, this.blockClass, this.blockSelector, !1) ||
                  o === e.oldValue
                )
                  return;
                let a = this.attributes.find((i) => i.node === e.target);
                if (
                  n.tagName === "IFRAME" &&
                  r === "src" &&
                  !this.keepIframeSrcFn(o)
                )
                  if (!n.contentDocument) r = "rr_src";
                  else return;
                if (
                  (a ||
                    ((a = { node: e.target, attributes: {} }),
                    this.attributes.push(a)),
                  r === "type" &&
                    n.tagName === "INPUT" &&
                    (e.oldValue || "").toLowerCase() === "password" &&
                    n.setAttribute("data-rr-is-password", "true"),
                  r === "style")
                ) {
                  const i = this.doc.createElement("span");
                  e.oldValue && i.setAttribute("style", e.oldValue),
                    (a.attributes.style === void 0 ||
                      a.attributes.style === null) &&
                      (a.attributes.style = {});
                  const s = a.attributes.style;
                  for (const l of Array.from(n.style)) {
                    const c = n.style.getPropertyValue(l),
                      u = n.style.getPropertyPriority(l);
                    (c !== i.style.getPropertyValue(l) ||
                      u !== i.style.getPropertyPriority(l)) &&
                      (u === "" ? (s[l] = c) : (s[l] = [c, u]));
                  }
                  for (const l of Array.from(i.style))
                    n.style.getPropertyValue(l) === "" && (s[l] = !1);
                } else
                  Gt(n.tagName, r) ||
                    (a.attributes[r] = jt(this.doc, n.tagName, r, o));
                break;
              }
              case "childList": {
                if (Q(e.target, this.blockClass, this.blockSelector, !0))
                  return;
                e.addedNodes.forEach((n) => this.genAdds(n, e.target)),
                  e.removedNodes.forEach((n) => {
                    const r = this.mirror.getId(n),
                      o = Fe(e.target)
                        ? this.mirror.getId(e.target.host)
                        : this.mirror.getId(e.target);
                    Q(e.target, this.blockClass, this.blockSelector, !1) ||
                      Xe(n, this.mirror) ||
                      !Jt(n, this.mirror) ||
                      (this.addedSet.has(n)
                        ? (Nt(this.addedSet, n), this.droppedSet.add(n))
                        : (this.addedSet.has(e.target) && r === -1) ||
                          mt(e.target, this.mirror) ||
                          (this.movedSet.has(n) && this.movedMap[rn(r, o)]
                            ? Nt(this.movedSet, n)
                            : this.removes.push({
                                parentId: o,
                                id: r,
                                isShadow:
                                  Fe(e.target) && Pe(e.target) ? !0 : void 0,
                              })),
                      this.mapRemoves.push(n));
                  });
                break;
              }
            }
        }),
        (this.genAdds = (e, n) => {
          if (!this.processedNodeManager.inOtherBuffer(e, this)) {
            if (this.mirror.hasNode(e)) {
              if (Xe(e, this.mirror)) return;
              this.movedSet.add(e);
              let r = null;
              n && this.mirror.hasNode(n) && (r = this.mirror.getId(n)),
                r &&
                  r !== -1 &&
                  (this.movedMap[rn(this.mirror.getId(e), r)] = !0);
            } else this.addedSet.add(e), this.droppedSet.delete(e);
            Q(e, this.blockClass, this.blockSelector, !1) ||
              (e.childNodes.forEach((r) => this.genAdds(r)),
              ge(e) &&
                e.shadowRoot.childNodes.forEach((r) => {
                  this.processedNodeManager.add(r, this), this.genAdds(r, e);
                }));
          }
        });
    }
    init(e) {
      [
        "mutationCb",
        "blockClass",
        "blockSelector",
        "maskTextClass",
        "maskTextSelector",
        "inlineStylesheet",
        "maskInputOptions",
        "maskTextFn",
        "maskInputFn",
        "keepIframeSrcFn",
        "recordCanvas",
        "inlineImages",
        "slimDOMOptions",
        "dataURLOptions",
        "doc",
        "mirror",
        "iframeManager",
        "stylesheetManager",
        "shadowDomManager",
        "canvasManager",
        "processedNodeManager",
      ].forEach((n) => {
        this[n] = e[n];
      });
    }
    freeze() {
      (this.frozen = !0), this.canvasManager.freeze();
    }
    unfreeze() {
      (this.frozen = !1), this.canvasManager.unfreeze(), this.emit();
    }
    isFrozen() {
      return this.frozen;
    }
    lock() {
      (this.locked = !0), this.canvasManager.lock();
    }
    unlock() {
      (this.locked = !1), this.canvasManager.unlock(), this.emit();
    }
    reset() {
      this.shadowDomManager.reset(), this.canvasManager.reset();
    }
  }
  function Nt(t, e) {
    t.delete(e), e.childNodes.forEach((n) => Nt(t, n));
  }
  function on(t, e, n) {
    return t.length === 0 ? !1 : sn(t, e, n);
  }
  function sn(t, e, n) {
    const { parentNode: r } = e;
    if (!r) return !1;
    const o = n.getId(r);
    return t.some((a) => a.id === o) ? !0 : sn(t, r, n);
  }
  function an(t, e) {
    return t.size === 0 ? !1 : ln(t, e);
  }
  function ln(t, e) {
    const { parentNode: n } = e;
    return n ? (t.has(n) ? !0 : ln(t, n)) : !1;
  }
  let Ve;
  function Hr(t) {
    Ve = t;
  }
  function Yr() {
    Ve = void 0;
  }
  const O = (t) =>
    Ve
      ? (...e) => {
          try {
            return t(...e);
          } catch (n) {
            if (Ve && Ve(n) === !0) return;
            throw n;
          }
        }
      : t;
  var Xr = Object.defineProperty,
    Zr = Object.defineProperties,
    Kr = Object.getOwnPropertyDescriptors,
    cn = Object.getOwnPropertySymbols,
    Jr = Object.prototype.hasOwnProperty,
    Qr = Object.prototype.propertyIsEnumerable,
    un = (t, e, n) =>
      e in t
        ? Xr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n })
        : (t[e] = n),
    dn = (t, e) => {
      for (var n in e || (e = {})) Jr.call(e, n) && un(t, n, e[n]);
      if (cn) for (var n of cn(e)) Qr.call(e, n) && un(t, n, e[n]);
      return t;
    },
    qr = (t, e) => Zr(t, Kr(e));
  const we = [];
  function Be(t) {
    try {
      if ("composedPath" in t) {
        const e = t.composedPath();
        if (e.length) return e[0];
      } else if ("path" in t && t.path.length) return t.path[0];
      return t.target;
    } catch {
      return t.target;
    }
  }
  function hn(t, e) {
    var n, r;
    const o = new zr();
    we.push(o), o.init(t);
    let a = window.MutationObserver || window.__rrMutationObserver;
    const i =
      (r = (n = window?.Zone) == null ? void 0 : n.__symbol__) == null
        ? void 0
        : r.call(n, "MutationObserver");
    i && window[i] && (a = window[i]);
    const s = new a(O(o.processMutations.bind(o)));
    return (
      s.observe(e, {
        attributes: !0,
        attributeOldValue: !0,
        characterData: !0,
        characterDataOldValue: !0,
        childList: !0,
        subtree: !0,
      }),
      s
    );
  }
  function eo({ mousemoveCb: t, sampling: e, doc: n, mirror: r }) {
    if (e.mousemove === !1) return () => {};
    const o = typeof e.mousemove == "number" ? e.mousemove : 50,
      a = typeof e.mousemoveCallback == "number" ? e.mousemoveCallback : 500;
    let i = [],
      s;
    const l = Ie(
        O((d) => {
          const h = Date.now() - s;
          t(
            i.map((f) => ((f.timeOffset -= h), f)),
            d
          ),
            (i = []),
            (s = null);
        }),
        a
      ),
      c = O(
        Ie(
          O((d) => {
            const h = Be(d),
              { clientX: f, clientY: m } = ft(d) ? d.changedTouches[0] : d;
            s || (s = Date.now()),
              i.push({
                x: f,
                y: m,
                id: r.getId(h),
                timeOffset: Date.now() - s,
              }),
              l(
                typeof DragEvent < "u" && d instanceof DragEvent
                  ? C.Drag
                  : d instanceof MouseEvent
                  ? C.MouseMove
                  : C.TouchMove
              );
          }),
          o,
          { trailing: !1 }
        )
      ),
      u = [J("mousemove", c, n), J("touchmove", c, n), J("drag", c, n)];
    return O(() => {
      u.forEach((d) => d());
    });
  }
  function to({
    mouseInteractionCb: t,
    doc: e,
    mirror: n,
    blockClass: r,
    blockSelector: o,
    sampling: a,
  }) {
    if (a.mouseInteraction === !1) return () => {};
    const i =
        a.mouseInteraction === !0 || a.mouseInteraction === void 0
          ? {}
          : a.mouseInteraction,
      s = [],
      l = (c) => (u) => {
        const d = Be(u);
        if (Q(d, r, o, !0)) return;
        const h = ft(u) ? u.changedTouches[0] : u;
        if (!h) return;
        const f = n.getId(d),
          { clientX: m, clientY: y } = h;
        O(t)({ type: V[c], id: f, x: m, y });
      };
    return (
      Object.keys(V)
        .filter(
          (c) =>
            Number.isNaN(Number(c)) && !c.endsWith("_Departed") && i[c] !== !1
        )
        .forEach((c) => {
          const u = c.toLowerCase(),
            d = l(c);
          s.push(J(u, d, e));
        }),
      O(() => {
        s.forEach((c) => c());
      })
    );
  }
  function pn({
    scrollCb: t,
    doc: e,
    mirror: n,
    blockClass: r,
    blockSelector: o,
    sampling: a,
  }) {
    const i = O(
      Ie(
        O((s) => {
          const l = Be(s);
          if (!l || Q(l, r, o, !0)) return;
          const c = n.getId(l);
          if (l === e && e.defaultView) {
            const u = dt(e.defaultView);
            t({ id: c, x: u.left, y: u.top });
          } else t({ id: c, x: l.scrollLeft, y: l.scrollTop });
        }),
        a.scroll || 100
      )
    );
    return J("scroll", i, e);
  }
  function no({ viewportResizeCb: t }) {
    let e = -1,
      n = -1;
    const r = O(
      Ie(
        O(() => {
          const o = ht(),
            a = pt();
          (e !== o || n !== a) &&
            (t({ width: Number(a), height: Number(o) }), (e = o), (n = a));
        }),
        200
      )
    );
    return J("resize", r, window);
  }
  function mn(t, e) {
    const n = dn({}, t);
    return e || delete n.userTriggered, n;
  }
  const ro = ["INPUT", "TEXTAREA", "SELECT"],
    fn = new WeakMap();
  function oo({
    inputCb: t,
    doc: e,
    mirror: n,
    blockClass: r,
    blockSelector: o,
    ignoreClass: a,
    maskInputOptions: i,
    maskInputFn: s,
    sampling: l,
    userTriggeredOnInput: c,
  }) {
    function u(g) {
      let p = Be(g);
      const S = g.isTrusted,
        v = p && p.tagName;
      if (
        (p && v === "OPTION" && (p = p.parentElement),
        !p ||
          !v ||
          ro.indexOf(v) < 0 ||
          Q(p, r, o, !0) ||
          p.classList.contains(a))
      )
        return;
      let E = p.value,
        D = !1;
      const R = lt(p) || "";
      R === "radio" || R === "checkbox"
        ? (D = p.checked)
        : (i[v.toLowerCase()] || i[R]) &&
          (E = at({
            maskInputOptions: i,
            tagName: v,
            type: R,
            value: E,
            maskInputFn: s,
          })),
        d(p, O(mn)({ text: E, isChecked: D, userTriggered: S }, c));
      const W = p.name;
      R === "radio" &&
        W &&
        D &&
        e.querySelectorAll(`input[type="radio"][name="${W}"]`).forEach((A) => {
          A !== p &&
            d(A, O(mn)({ text: A.value, isChecked: !D, userTriggered: !1 }, c));
        });
    }
    function d(g, p) {
      const S = fn.get(g);
      if (!S || S.text !== p.text || S.isChecked !== p.isChecked) {
        fn.set(g, p);
        const v = n.getId(g);
        O(t)(qr(dn({}, p), { id: v }));
      }
    }
    const h = (l.input === "last" ? ["change"] : ["input", "change"]).map((g) =>
        J(g, O(u), e)
      ),
      f = e.defaultView;
    if (!f)
      return () => {
        h.forEach((g) => g());
      };
    const m = f.Object.getOwnPropertyDescriptor(
        f.HTMLInputElement.prototype,
        "value"
      ),
      y = [
        [f.HTMLInputElement.prototype, "value"],
        [f.HTMLInputElement.prototype, "checked"],
        [f.HTMLSelectElement.prototype, "value"],
        [f.HTMLTextAreaElement.prototype, "value"],
        [f.HTMLSelectElement.prototype, "selectedIndex"],
        [f.HTMLOptionElement.prototype, "selected"],
      ];
    return (
      m &&
        m.set &&
        h.push(
          ...y.map((g) =>
            Ue(
              g[0],
              g[1],
              {
                set() {
                  O(u)({ target: this, isTrusted: !1 });
                },
              },
              !1,
              f
            )
          )
        ),
      O(() => {
        h.forEach((g) => g());
      })
    );
  }
  function Ze(t) {
    const e = [];
    function n(r, o) {
      if (
        (Ke("CSSGroupingRule") && r.parentRule instanceof CSSGroupingRule) ||
        (Ke("CSSMediaRule") && r.parentRule instanceof CSSMediaRule) ||
        (Ke("CSSSupportsRule") && r.parentRule instanceof CSSSupportsRule) ||
        (Ke("CSSConditionRule") && r.parentRule instanceof CSSConditionRule)
      ) {
        const a = Array.from(r.parentRule.cssRules).indexOf(r);
        o.unshift(a);
      } else if (r.parentStyleSheet) {
        const a = Array.from(r.parentStyleSheet.cssRules).indexOf(r);
        o.unshift(a);
      }
      return o;
    }
    return n(t, e);
  }
  function ve(t, e, n) {
    let r, o;
    return t
      ? (t.ownerNode ? (r = e.getId(t.ownerNode)) : (o = n.getId(t)),
        { styleId: o, id: r })
      : {};
  }
  function so(
    { styleSheetRuleCb: t, mirror: e, stylesheetManager: n },
    { win: r }
  ) {
    if (!r.CSSStyleSheet || !r.CSSStyleSheet.prototype) return () => {};
    const o = r.CSSStyleSheet.prototype.insertRule;
    r.CSSStyleSheet.prototype.insertRule = new Proxy(o, {
      apply: O((u, d, h) => {
        const [f, m] = h,
          { id: y, styleId: g } = ve(d, e, n.styleMirror);
        return (
          ((y && y !== -1) || (g && g !== -1)) &&
            t({ id: y, styleId: g, adds: [{ rule: f, index: m }] }),
          u.apply(d, h)
        );
      }),
    });
    const a = r.CSSStyleSheet.prototype.deleteRule;
    r.CSSStyleSheet.prototype.deleteRule = new Proxy(a, {
      apply: O((u, d, h) => {
        const [f] = h,
          { id: m, styleId: y } = ve(d, e, n.styleMirror);
        return (
          ((m && m !== -1) || (y && y !== -1)) &&
            t({ id: m, styleId: y, removes: [{ index: f }] }),
          u.apply(d, h)
        );
      }),
    });
    let i;
    r.CSSStyleSheet.prototype.replace &&
      ((i = r.CSSStyleSheet.prototype.replace),
      (r.CSSStyleSheet.prototype.replace = new Proxy(i, {
        apply: O((u, d, h) => {
          const [f] = h,
            { id: m, styleId: y } = ve(d, e, n.styleMirror);
          return (
            ((m && m !== -1) || (y && y !== -1)) &&
              t({ id: m, styleId: y, replace: f }),
            u.apply(d, h)
          );
        }),
      })));
    let s;
    r.CSSStyleSheet.prototype.replaceSync &&
      ((s = r.CSSStyleSheet.prototype.replaceSync),
      (r.CSSStyleSheet.prototype.replaceSync = new Proxy(s, {
        apply: O((u, d, h) => {
          const [f] = h,
            { id: m, styleId: y } = ve(d, e, n.styleMirror);
          return (
            ((m && m !== -1) || (y && y !== -1)) &&
              t({ id: m, styleId: y, replaceSync: f }),
            u.apply(d, h)
          );
        }),
      })));
    const l = {};
    Je("CSSGroupingRule")
      ? (l.CSSGroupingRule = r.CSSGroupingRule)
      : (Je("CSSMediaRule") && (l.CSSMediaRule = r.CSSMediaRule),
        Je("CSSConditionRule") && (l.CSSConditionRule = r.CSSConditionRule),
        Je("CSSSupportsRule") && (l.CSSSupportsRule = r.CSSSupportsRule));
    const c = {};
    return (
      Object.entries(l).forEach(([u, d]) => {
        (c[u] = {
          insertRule: d.prototype.insertRule,
          deleteRule: d.prototype.deleteRule,
        }),
          (d.prototype.insertRule = new Proxy(c[u].insertRule, {
            apply: O((h, f, m) => {
              const [y, g] = m,
                { id: p, styleId: S } = ve(
                  f.parentStyleSheet,
                  e,
                  n.styleMirror
                );
              return (
                ((p && p !== -1) || (S && S !== -1)) &&
                  t({
                    id: p,
                    styleId: S,
                    adds: [{ rule: y, index: [...Ze(f), g || 0] }],
                  }),
                h.apply(f, m)
              );
            }),
          })),
          (d.prototype.deleteRule = new Proxy(c[u].deleteRule, {
            apply: O((h, f, m) => {
              const [y] = m,
                { id: g, styleId: p } = ve(
                  f.parentStyleSheet,
                  e,
                  n.styleMirror
                );
              return (
                ((g && g !== -1) || (p && p !== -1)) &&
                  t({ id: g, styleId: p, removes: [{ index: [...Ze(f), y] }] }),
                h.apply(f, m)
              );
            }),
          }));
      }),
      O(() => {
        (r.CSSStyleSheet.prototype.insertRule = o),
          (r.CSSStyleSheet.prototype.deleteRule = a),
          i && (r.CSSStyleSheet.prototype.replace = i),
          s && (r.CSSStyleSheet.prototype.replaceSync = s),
          Object.entries(l).forEach(([u, d]) => {
            (d.prototype.insertRule = c[u].insertRule),
              (d.prototype.deleteRule = c[u].deleteRule);
          });
      })
    );
  }
  function yn({ mirror: t, stylesheetManager: e }, n) {
    var r, o, a;
    let i = null;
    n.nodeName === "#document" ? (i = t.getId(n)) : (i = t.getId(n.host));
    const s =
        n.nodeName === "#document"
          ? (r = n.defaultView) == null
            ? void 0
            : r.Document
          : (a = (o = n.ownerDocument) == null ? void 0 : o.defaultView) == null
          ? void 0
          : a.ShadowRoot,
      l = Object.getOwnPropertyDescriptor(s?.prototype, "adoptedStyleSheets");
    return i === null || i === -1 || !s || !l
      ? () => {}
      : (Object.defineProperty(n, "adoptedStyleSheets", {
          configurable: l.configurable,
          enumerable: l.enumerable,
          get() {
            var c;
            return (c = l.get) == null ? void 0 : c.call(this);
          },
          set(c) {
            var u;
            const d = (u = l.set) == null ? void 0 : u.call(this, c);
            if (i !== null && i !== -1)
              try {
                e.adoptStyleSheets(c, i);
              } catch {}
            return d;
          },
        }),
        O(() => {
          Object.defineProperty(n, "adoptedStyleSheets", {
            configurable: l.configurable,
            enumerable: l.enumerable,
            get: l.get,
            set: l.set,
          });
        }));
  }
  function io(
    {
      styleDeclarationCb: t,
      mirror: e,
      ignoreCSSAttributes: n,
      stylesheetManager: r,
    },
    { win: o }
  ) {
    const a = o.CSSStyleDeclaration.prototype.setProperty;
    o.CSSStyleDeclaration.prototype.setProperty = new Proxy(a, {
      apply: O((s, l, c) => {
        var u;
        const [d, h, f] = c;
        if (n.has(d)) return a.apply(l, [d, h, f]);
        const { id: m, styleId: y } = ve(
          (u = l.parentRule) == null ? void 0 : u.parentStyleSheet,
          e,
          r.styleMirror
        );
        return (
          ((m && m !== -1) || (y && y !== -1)) &&
            t({
              id: m,
              styleId: y,
              set: { property: d, value: h, priority: f },
              index: Ze(l.parentRule),
            }),
          s.apply(l, c)
        );
      }),
    });
    const i = o.CSSStyleDeclaration.prototype.removeProperty;
    return (
      (o.CSSStyleDeclaration.prototype.removeProperty = new Proxy(i, {
        apply: O((s, l, c) => {
          var u;
          const [d] = c;
          if (n.has(d)) return i.apply(l, [d]);
          const { id: h, styleId: f } = ve(
            (u = l.parentRule) == null ? void 0 : u.parentStyleSheet,
            e,
            r.styleMirror
          );
          return (
            ((h && h !== -1) || (f && f !== -1)) &&
              t({
                id: h,
                styleId: f,
                remove: { property: d },
                index: Ze(l.parentRule),
              }),
            s.apply(l, c)
          );
        }),
      })),
      O(() => {
        (o.CSSStyleDeclaration.prototype.setProperty = a),
          (o.CSSStyleDeclaration.prototype.removeProperty = i);
      })
    );
  }
  function ao({
    mediaInteractionCb: t,
    blockClass: e,
    blockSelector: n,
    mirror: r,
    sampling: o,
  }) {
    const a = O((s) =>
        Ie(
          O((l) => {
            const c = Be(l);
            if (!c || Q(c, e, n, !0)) return;
            const { currentTime: u, volume: d, muted: h, playbackRate: f } = c;
            t({
              type: s,
              id: r.getId(c),
              currentTime: u,
              volume: d,
              muted: h,
              playbackRate: f,
            });
          }),
          o.media || 500
        )
      ),
      i = [
        J("play", a(me.Play)),
        J("pause", a(me.Pause)),
        J("seeked", a(me.Seeked)),
        J("volumechange", a(me.VolumeChange)),
        J("ratechange", a(me.RateChange)),
      ];
    return O(() => {
      i.forEach((s) => s());
    });
  }
  function lo({ fontCb: t, doc: e }) {
    const n = e.defaultView;
    if (!n) return () => {};
    const r = [],
      o = new WeakMap(),
      a = n.FontFace;
    n.FontFace = function (s, l, c) {
      const u = new a(s, l, c);
      return (
        o.set(u, {
          family: s,
          buffer: typeof l != "string",
          descriptors: c,
          fontSource:
            typeof l == "string"
              ? l
              : JSON.stringify(Array.from(new Uint8Array(l))),
        }),
        u
      );
    };
    const i = Me(e.fonts, "add", function (s) {
      return function (l) {
        return (
          setTimeout(
            O(() => {
              const c = o.get(l);
              c && (t(c), o.delete(l));
            }),
            0
          ),
          s.apply(this, [l])
        );
      };
    });
    return (
      r.push(() => {
        n.FontFace = a;
      }),
      r.push(i),
      O(() => {
        r.forEach((s) => s());
      })
    );
  }
  function co(t) {
    const {
      doc: e,
      mirror: n,
      blockClass: r,
      blockSelector: o,
      selectionCb: a,
    } = t;
    let i = !0;
    const s = O(() => {
      const l = e.getSelection();
      if (!l || (i && l?.isCollapsed)) return;
      i = l.isCollapsed || !1;
      const c = [],
        u = l.rangeCount || 0;
      for (let d = 0; d < u; d++) {
        const h = l.getRangeAt(d),
          {
            startContainer: f,
            startOffset: m,
            endContainer: y,
            endOffset: g,
          } = h;
        Q(f, r, o, !0) ||
          Q(y, r, o, !0) ||
          c.push({
            start: n.getId(f),
            startOffset: m,
            end: n.getId(y),
            endOffset: g,
          });
      }
      a({ ranges: c });
    });
    return s(), J("selectionchange", s);
  }
  function uo(t, e) {
    const {
      mutationCb: n,
      mousemoveCb: r,
      mouseInteractionCb: o,
      scrollCb: a,
      viewportResizeCb: i,
      inputCb: s,
      mediaInteractionCb: l,
      styleSheetRuleCb: c,
      styleDeclarationCb: u,
      canvasMutationCb: d,
      fontCb: h,
      selectionCb: f,
    } = t;
    (t.mutationCb = (...m) => {
      e.mutation && e.mutation(...m), n(...m);
    }),
      (t.mousemoveCb = (...m) => {
        e.mousemove && e.mousemove(...m), r(...m);
      }),
      (t.mouseInteractionCb = (...m) => {
        e.mouseInteraction && e.mouseInteraction(...m), o(...m);
      }),
      (t.scrollCb = (...m) => {
        e.scroll && e.scroll(...m), a(...m);
      }),
      (t.viewportResizeCb = (...m) => {
        e.viewportResize && e.viewportResize(...m), i(...m);
      }),
      (t.inputCb = (...m) => {
        e.input && e.input(...m), s(...m);
      }),
      (t.mediaInteractionCb = (...m) => {
        e.mediaInteaction && e.mediaInteaction(...m), l(...m);
      }),
      (t.styleSheetRuleCb = (...m) => {
        e.styleSheetRule && e.styleSheetRule(...m), c(...m);
      }),
      (t.styleDeclarationCb = (...m) => {
        e.styleDeclaration && e.styleDeclaration(...m), u(...m);
      }),
      (t.canvasMutationCb = (...m) => {
        e.canvasMutation && e.canvasMutation(...m), d(...m);
      }),
      (t.fontCb = (...m) => {
        e.font && e.font(...m), h(...m);
      }),
      (t.selectionCb = (...m) => {
        e.selection && e.selection(...m), f(...m);
      });
  }
  function ho(t, e = {}) {
    const n = t.doc.defaultView;
    if (!n) return () => {};
    uo(t, e);
    const r = hn(t, t.doc),
      o = eo(t),
      a = to(t),
      i = pn(t),
      s = no(t),
      l = oo(t),
      c = ao(t),
      u = so(t, { win: n }),
      d = yn(t, t.doc),
      h = io(t, { win: n }),
      f = t.collectFonts ? lo(t) : () => {},
      m = co(t),
      y = [];
    for (const g of t.plugins) y.push(g.observer(g.callback, n, g.options));
    return O(() => {
      we.forEach((g) => g.reset()),
        r.disconnect(),
        o(),
        a(),
        i(),
        s(),
        l(),
        c(),
        u(),
        d(),
        h(),
        f(),
        m(),
        y.forEach((g) => g());
    });
  }
  function Ke(t) {
    return typeof window[t] < "u";
  }
  function Je(t) {
    return Boolean(
      typeof window[t] < "u" &&
        window[t].prototype &&
        "insertRule" in window[t].prototype &&
        "deleteRule" in window[t].prototype
    );
  }
  class gn {
    constructor(e) {
      (this.generateIdFn = e),
        (this.iframeIdToRemoteIdMap = new WeakMap()),
        (this.iframeRemoteIdToIdMap = new WeakMap());
    }
    getId(e, n, r, o) {
      const a = r || this.getIdToRemoteIdMap(e),
        i = o || this.getRemoteIdToIdMap(e);
      let s = a.get(n);
      return s || ((s = this.generateIdFn()), a.set(n, s), i.set(s, n)), s;
    }
    getIds(e, n) {
      const r = this.getIdToRemoteIdMap(e),
        o = this.getRemoteIdToIdMap(e);
      return n.map((a) => this.getId(e, a, r, o));
    }
    getRemoteId(e, n, r) {
      const o = r || this.getRemoteIdToIdMap(e);
      return typeof n != "number" ? n : o.get(n) || -1;
    }
    getRemoteIds(e, n) {
      const r = this.getRemoteIdToIdMap(e);
      return n.map((o) => this.getRemoteId(e, o, r));
    }
    reset(e) {
      if (!e) {
        (this.iframeIdToRemoteIdMap = new WeakMap()),
          (this.iframeRemoteIdToIdMap = new WeakMap());
        return;
      }
      this.iframeIdToRemoteIdMap.delete(e),
        this.iframeRemoteIdToIdMap.delete(e);
    }
    getIdToRemoteIdMap(e) {
      let n = this.iframeIdToRemoteIdMap.get(e);
      return n || ((n = new Map()), this.iframeIdToRemoteIdMap.set(e, n)), n;
    }
    getRemoteIdToIdMap(e) {
      let n = this.iframeRemoteIdToIdMap.get(e);
      return n || ((n = new Map()), this.iframeRemoteIdToIdMap.set(e, n)), n;
    }
  }
  class po {
    constructor(e) {
      (this.iframes = new WeakMap()),
        (this.crossOriginIframeMap = new WeakMap()),
        (this.crossOriginIframeMirror = new gn(Vt)),
        (this.crossOriginIframeRootIdMap = new WeakMap()),
        (this.mutationCb = e.mutationCb),
        (this.wrappedEmit = e.wrappedEmit),
        (this.stylesheetManager = e.stylesheetManager),
        (this.recordCrossOriginIframes = e.recordCrossOriginIframes),
        (this.crossOriginIframeStyleMirror = new gn(
          this.stylesheetManager.styleMirror.generateId.bind(
            this.stylesheetManager.styleMirror
          )
        )),
        (this.mirror = e.mirror),
        this.recordCrossOriginIframes &&
          window.addEventListener("message", this.handleMessage.bind(this));
    }
    addIframe(e) {
      this.iframes.set(e, !0),
        e.contentWindow && this.crossOriginIframeMap.set(e.contentWindow, e);
    }
    addLoadListener(e) {
      this.loadListener = e;
    }
    attachIframe(e, n) {
      var r;
      this.mutationCb({
        adds: [{ parentId: this.mirror.getId(e), nextId: null, node: n }],
        removes: [],
        texts: [],
        attributes: [],
        isAttachIframe: !0,
      }),
        (r = this.loadListener) == null || r.call(this, e),
        e.contentDocument &&
          e.contentDocument.adoptedStyleSheets &&
          e.contentDocument.adoptedStyleSheets.length > 0 &&
          this.stylesheetManager.adoptStyleSheets(
            e.contentDocument.adoptedStyleSheets,
            this.mirror.getId(e.contentDocument)
          );
    }
    handleMessage(e) {
      const n = e;
      if (n.data.type !== "rrweb" || n.origin !== n.data.origin || !e.source)
        return;
      const r = this.crossOriginIframeMap.get(e.source);
      if (!r) return;
      const o = this.transformCrossOriginEvent(r, n.data.event);
      o && this.wrappedEmit(o, n.data.isCheckout);
    }
    transformCrossOriginEvent(e, n) {
      var r;
      switch (n.type) {
        case N.FullSnapshot: {
          this.crossOriginIframeMirror.reset(e),
            this.crossOriginIframeStyleMirror.reset(e),
            this.replaceIdOnNode(n.data.node, e);
          const o = n.data.node.id;
          return (
            this.crossOriginIframeRootIdMap.set(e, o),
            this.patchRootIdOnNode(n.data.node, o),
            {
              timestamp: n.timestamp,
              type: N.IncrementalSnapshot,
              data: {
                source: C.Mutation,
                adds: [
                  {
                    parentId: this.mirror.getId(e),
                    nextId: null,
                    node: n.data.node,
                  },
                ],
                removes: [],
                texts: [],
                attributes: [],
                isAttachIframe: !0,
              },
            }
          );
        }
        case N.Meta:
        case N.Load:
        case N.DomContentLoaded:
          return !1;
        case N.Plugin:
          return n;
        case N.Custom:
          return (
            this.replaceIds(n.data.payload, e, [
              "id",
              "parentId",
              "previousId",
              "nextId",
            ]),
            n
          );
        case N.IncrementalSnapshot:
          switch (n.data.source) {
            case C.Mutation:
              return (
                n.data.adds.forEach((o) => {
                  this.replaceIds(o, e, ["parentId", "nextId", "previousId"]),
                    this.replaceIdOnNode(o.node, e);
                  const a = this.crossOriginIframeRootIdMap.get(e);
                  a && this.patchRootIdOnNode(o.node, a);
                }),
                n.data.removes.forEach((o) => {
                  this.replaceIds(o, e, ["parentId", "id"]);
                }),
                n.data.attributes.forEach((o) => {
                  this.replaceIds(o, e, ["id"]);
                }),
                n.data.texts.forEach((o) => {
                  this.replaceIds(o, e, ["id"]);
                }),
                n
              );
            case C.Drag:
            case C.TouchMove:
            case C.MouseMove:
              return (
                n.data.positions.forEach((o) => {
                  this.replaceIds(o, e, ["id"]);
                }),
                n
              );
            case C.ViewportResize:
              return !1;
            case C.MediaInteraction:
            case C.MouseInteraction:
            case C.Scroll:
            case C.CanvasMutation:
            case C.Input:
              return this.replaceIds(n.data, e, ["id"]), n;
            case C.StyleSheetRule:
            case C.StyleDeclaration:
              return (
                this.replaceIds(n.data, e, ["id"]),
                this.replaceStyleIds(n.data, e, ["styleId"]),
                n
              );
            case C.Font:
              return n;
            case C.Selection:
              return (
                n.data.ranges.forEach((o) => {
                  this.replaceIds(o, e, ["start", "end"]);
                }),
                n
              );
            case C.AdoptedStyleSheet:
              return (
                this.replaceIds(n.data, e, ["id"]),
                this.replaceStyleIds(n.data, e, ["styleIds"]),
                (r = n.data.styles) == null ||
                  r.forEach((o) => {
                    this.replaceStyleIds(o, e, ["styleId"]);
                  }),
                n
              );
          }
      }
    }
    replace(e, n, r, o) {
      for (const a of o)
        (!Array.isArray(n[a]) && typeof n[a] != "number") ||
          (Array.isArray(n[a])
            ? (n[a] = e.getIds(r, n[a]))
            : (n[a] = e.getId(r, n[a])));
      return n;
    }
    replaceIds(e, n, r) {
      return this.replace(this.crossOriginIframeMirror, e, n, r);
    }
    replaceStyleIds(e, n, r) {
      return this.replace(this.crossOriginIframeStyleMirror, e, n, r);
    }
    replaceIdOnNode(e, n) {
      this.replaceIds(e, n, ["id", "rootId"]),
        "childNodes" in e &&
          e.childNodes.forEach((r) => {
            this.replaceIdOnNode(r, n);
          });
    }
    patchRootIdOnNode(e, n) {
      e.type !== I.Document && !e.rootId && (e.rootId = n),
        "childNodes" in e &&
          e.childNodes.forEach((r) => {
            this.patchRootIdOnNode(r, n);
          });
    }
  }
  var mo = Object.defineProperty,
    fo = Object.defineProperties,
    yo = Object.getOwnPropertyDescriptors,
    vn = Object.getOwnPropertySymbols,
    go = Object.prototype.hasOwnProperty,
    vo = Object.prototype.propertyIsEnumerable,
    Sn = (t, e, n) =>
      e in t
        ? mo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n })
        : (t[e] = n),
    bn = (t, e) => {
      for (var n in e || (e = {})) go.call(e, n) && Sn(t, n, e[n]);
      if (vn) for (var n of vn(e)) vo.call(e, n) && Sn(t, n, e[n]);
      return t;
    },
    wn = (t, e) => fo(t, yo(e));
  class So {
    constructor(e) {
      (this.shadowDoms = new WeakSet()),
        (this.restoreHandlers = []),
        (this.mutationCb = e.mutationCb),
        (this.scrollCb = e.scrollCb),
        (this.bypassOptions = e.bypassOptions),
        (this.mirror = e.mirror),
        this.init();
    }
    init() {
      this.reset(), this.patchAttachShadow(Element, document);
    }
    addShadowRoot(e, n) {
      if (!Pe(e) || this.shadowDoms.has(e)) return;
      this.shadowDoms.add(e);
      const r = hn(
        wn(bn({}, this.bypassOptions), {
          doc: n,
          mutationCb: this.mutationCb,
          mirror: this.mirror,
          shadowDomManager: this,
        }),
        e
      );
      this.restoreHandlers.push(() => r.disconnect()),
        this.restoreHandlers.push(
          pn(
            wn(bn({}, this.bypassOptions), {
              scrollCb: this.scrollCb,
              doc: e,
              mirror: this.mirror,
            })
          )
        ),
        setTimeout(() => {
          e.adoptedStyleSheets &&
            e.adoptedStyleSheets.length > 0 &&
            this.bypassOptions.stylesheetManager.adoptStyleSheets(
              e.adoptedStyleSheets,
              this.mirror.getId(e.host)
            ),
            this.restoreHandlers.push(
              yn(
                {
                  mirror: this.mirror,
                  stylesheetManager: this.bypassOptions.stylesheetManager,
                },
                e
              )
            );
        }, 0);
    }
    observeAttachShadow(e) {
      !e.contentWindow ||
        !e.contentDocument ||
        this.patchAttachShadow(e.contentWindow.Element, e.contentDocument);
    }
    patchAttachShadow(e, n) {
      const r = this;
      this.restoreHandlers.push(
        Me(e.prototype, "attachShadow", function (o) {
          return function (a) {
            const i = o.call(this, a);
            return (
              this.shadowRoot &&
                Et(this) &&
                r.addShadowRoot(this.shadowRoot, n),
              i
            );
          };
        })
      );
    }
    reset() {
      this.restoreHandlers.forEach((e) => {
        try {
          e();
        } catch {}
      }),
        (this.restoreHandlers = []),
        (this.shadowDoms = new WeakSet());
    }
  }
  for (
    var Re = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      je = typeof Uint8Array > "u" ? [] : new Uint8Array(256),
      Qe = 0;
    Qe < Re.length;
    Qe++
  )
    je[Re.charCodeAt(Qe)] = Qe;
  var bo = function (t) {
      var e = new Uint8Array(t),
        n,
        r = e.length,
        o = "";
      for (n = 0; n < r; n += 3)
        (o += Re[e[n] >> 2]),
          (o += Re[((e[n] & 3) << 4) | (e[n + 1] >> 4)]),
          (o += Re[((e[n + 1] & 15) << 2) | (e[n + 2] >> 6)]),
          (o += Re[e[n + 2] & 63]);
      return (
        r % 3 === 2
          ? (o = o.substring(0, o.length - 1) + "=")
          : r % 3 === 1 && (o = o.substring(0, o.length - 2) + "=="),
        o
      );
    },
    wo = function (t) {
      var e = t.length * 0.75,
        n = t.length,
        r,
        o = 0,
        a,
        i,
        s,
        l;
      t[t.length - 1] === "=" && (e--, t[t.length - 2] === "=" && e--);
      var c = new ArrayBuffer(e),
        u = new Uint8Array(c);
      for (r = 0; r < n; r += 4)
        (a = je[t.charCodeAt(r)]),
          (i = je[t.charCodeAt(r + 1)]),
          (s = je[t.charCodeAt(r + 2)]),
          (l = je[t.charCodeAt(r + 3)]),
          (u[o++] = (a << 2) | (i >> 4)),
          (u[o++] = ((i & 15) << 4) | (s >> 2)),
          (u[o++] = ((s & 3) << 6) | (l & 63));
      return c;
    };
  const Cn = new Map();
  function Co(t, e) {
    let n = Cn.get(t);
    return (
      n || ((n = new Map()), Cn.set(t, n)), n.has(e) || n.set(e, []), n.get(e)
    );
  }
  const En = (t, e, n) => {
    if (!t || !(Tn(t, e) || typeof t == "object")) return;
    const r = t.constructor.name,
      o = Co(n, r);
    let a = o.indexOf(t);
    return a === -1 && ((a = o.length), o.push(t)), a;
  };
  function qe(t, e, n) {
    if (t instanceof Array) return t.map((r) => qe(r, e, n));
    if (t === null) return t;
    if (
      t instanceof Float32Array ||
      t instanceof Float64Array ||
      t instanceof Int32Array ||
      t instanceof Uint32Array ||
      t instanceof Uint8Array ||
      t instanceof Uint16Array ||
      t instanceof Int16Array ||
      t instanceof Int8Array ||
      t instanceof Uint8ClampedArray
    )
      return { rr_type: t.constructor.name, args: [Object.values(t)] };
    if (t instanceof ArrayBuffer) {
      const r = t.constructor.name,
        o = bo(t);
      return { rr_type: r, base64: o };
    } else {
      if (t instanceof DataView)
        return {
          rr_type: t.constructor.name,
          args: [qe(t.buffer, e, n), t.byteOffset, t.byteLength],
        };
      if (t instanceof HTMLImageElement) {
        const r = t.constructor.name,
          { src: o } = t;
        return { rr_type: r, src: o };
      } else if (t instanceof HTMLCanvasElement) {
        const r = "HTMLImageElement",
          o = t.toDataURL();
        return { rr_type: r, src: o };
      } else {
        if (t instanceof ImageData)
          return {
            rr_type: t.constructor.name,
            args: [qe(t.data, e, n), t.width, t.height],
          };
        if (Tn(t, e) || typeof t == "object") {
          const r = t.constructor.name,
            o = En(t, e, n);
          return { rr_type: r, index: o };
        }
      }
    }
    return t;
  }
  const Nn = (t, e, n) => [...t].map((r) => qe(r, e, n)),
    Tn = (t, e) => {
      const n = [
        "WebGLActiveInfo",
        "WebGLBuffer",
        "WebGLFramebuffer",
        "WebGLProgram",
        "WebGLRenderbuffer",
        "WebGLShader",
        "WebGLShaderPrecisionFormat",
        "WebGLTexture",
        "WebGLUniformLocation",
        "WebGLVertexArrayObject",
        "WebGLVertexArrayObjectOES",
      ].filter((r) => typeof e[r] == "function");
      return Boolean(n.find((r) => t instanceof e[r]));
    };
  function Eo(t, e, n, r) {
    const o = [],
      a = Object.getOwnPropertyNames(e.CanvasRenderingContext2D.prototype);
    for (const i of a)
      try {
        if (typeof e.CanvasRenderingContext2D.prototype[i] != "function")
          continue;
        const s = Me(e.CanvasRenderingContext2D.prototype, i, function (l) {
          return function (...c) {
            return (
              Q(this.canvas, n, r, !0) ||
                setTimeout(() => {
                  const u = Nn([...c], e, this);
                  t(this.canvas, { type: pe["2D"], property: i, args: u });
                }, 0),
              l.apply(this, c)
            );
          };
        });
        o.push(s);
      } catch {
        const l = Ue(e.CanvasRenderingContext2D.prototype, i, {
          set(c) {
            t(this.canvas, {
              type: pe["2D"],
              property: i,
              args: [c],
              setter: !0,
            });
          },
        });
        o.push(l);
      }
    return () => {
      o.forEach((i) => i());
    };
  }
  function In(t, e, n) {
    const r = [];
    try {
      const o = Me(t.HTMLCanvasElement.prototype, "getContext", function (a) {
        return function (i, ...s) {
          return (
            Q(this, e, n, !0) || "__context" in this || (this.__context = i),
            a.apply(this, [i, ...s])
          );
        };
      });
      r.push(o);
    } catch {
      console.error("failed to patch HTMLCanvasElement.prototype.getContext");
    }
    return () => {
      r.forEach((o) => o());
    };
  }
  function Mn(t, e, n, r, o, a, i) {
    const s = [],
      l = Object.getOwnPropertyNames(t);
    for (const c of l)
      if (
        ![
          "isContextLost",
          "canvas",
          "drawingBufferWidth",
          "drawingBufferHeight",
        ].includes(c)
      )
        try {
          if (typeof t[c] != "function") continue;
          const u = Me(t, c, function (d) {
            return function (...h) {
              const f = d.apply(this, h);
              if ((En(f, i, this), !Q(this.canvas, r, o, !0))) {
                const m = Nn([...h], i, this),
                  y = { type: e, property: c, args: m };
                n(this.canvas, y);
              }
              return f;
            };
          });
          s.push(u);
        } catch {
          const d = Ue(t, c, {
            set(h) {
              n(this.canvas, { type: e, property: c, args: [h], setter: !0 });
            },
          });
          s.push(d);
        }
    return s;
  }
  function No(t, e, n, r, o) {
    const a = [];
    return (
      a.push(...Mn(e.WebGLRenderingContext.prototype, pe.WebGL, t, n, r, o, e)),
      typeof e.WebGL2RenderingContext < "u" &&
        a.push(
          ...Mn(e.WebGL2RenderingContext.prototype, pe.WebGL2, t, n, r, o, e)
        ),
      () => {
        a.forEach((i) => i());
      }
    );
  }
  function To(t, e) {
    var n = atob(t);
    if (e) {
      for (var r = new Uint8Array(n.length), o = 0, a = n.length; o < a; ++o)
        r[o] = n.charCodeAt(o);
      return String.fromCharCode.apply(null, new Uint16Array(r.buffer));
    }
    return n;
  }
  function Io(t, e, n) {
    var r = e === void 0 ? null : e,
      o = n === void 0 ? !1 : n,
      a = To(t, o),
      i =
        a.indexOf(
          `
  `,
          10
        ) + 1,
      s = a.substring(i) + (r ? "//# sourceMappingURL=" + r : ""),
      l = new Blob([s], { type: "application/javascript" });
    return URL.createObjectURL(l);
  }
  function Mo(t, e, n) {
    var r;
    return function (a) {
      return (r = r || Io(t, e, n)), new Worker(r, a);
    };
  }
  var Do = Mo(
      "Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24oKXsidXNlIHN0cmljdCI7Zm9yKHZhciByPSJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvIixwPXR5cGVvZiBVaW50OEFycmF5PiJ1Ij9bXTpuZXcgVWludDhBcnJheSgyNTYpLGY9MDtmPHIubGVuZ3RoO2YrKylwW3IuY2hhckNvZGVBdChmKV09Zjt2YXIgdT1mdW5jdGlvbihzKXt2YXIgZT1uZXcgVWludDhBcnJheShzKSxuLGE9ZS5sZW5ndGgsdD0iIjtmb3Iobj0wO248YTtuKz0zKXQrPXJbZVtuXT4+Ml0sdCs9clsoZVtuXSYzKTw8NHxlW24rMV0+PjRdLHQrPXJbKGVbbisxXSYxNSk8PDJ8ZVtuKzJdPj42XSx0Kz1yW2VbbisyXSY2M107cmV0dXJuIGElMz09PTI/dD10LnN1YnN0cmluZygwLHQubGVuZ3RoLTEpKyI9IjphJTM9PT0xJiYodD10LnN1YnN0cmluZygwLHQubGVuZ3RoLTIpKyI9PSIpLHR9O2NvbnN0IGM9bmV3IE1hcCxsPW5ldyBNYXA7YXN5bmMgZnVuY3Rpb24gdihzLGUsbil7Y29uc3QgYT1gJHtzfS0ke2V9YDtpZigiT2Zmc2NyZWVuQ2FudmFzImluIGdsb2JhbFRoaXMpe2lmKGwuaGFzKGEpKXJldHVybiBsLmdldChhKTtjb25zdCB0PW5ldyBPZmZzY3JlZW5DYW52YXMocyxlKTt0LmdldENvbnRleHQoIjJkIik7Y29uc3QgZz1hd2FpdChhd2FpdCB0LmNvbnZlcnRUb0Jsb2IobikpLmFycmF5QnVmZmVyKCksZD11KGcpO3JldHVybiBsLnNldChhLGQpLGR9ZWxzZSByZXR1cm4iIn1jb25zdCBpPXNlbGY7aS5vbm1lc3NhZ2U9YXN5bmMgZnVuY3Rpb24ocyl7aWYoIk9mZnNjcmVlbkNhbnZhcyJpbiBnbG9iYWxUaGlzKXtjb25zdHtpZDplLGJpdG1hcDpuLHdpZHRoOmEsaGVpZ2h0OnQsZGF0YVVSTE9wdGlvbnM6Z309cy5kYXRhLGQ9dihhLHQsZyksaD1uZXcgT2Zmc2NyZWVuQ2FudmFzKGEsdCk7aC5nZXRDb250ZXh0KCIyZCIpLmRyYXdJbWFnZShuLDAsMCksbi5jbG9zZSgpO2NvbnN0IHc9YXdhaXQgaC5jb252ZXJ0VG9CbG9iKGcpLHk9dy50eXBlLGI9YXdhaXQgdy5hcnJheUJ1ZmZlcigpLG89dShiKTtpZighYy5oYXMoZSkmJmF3YWl0IGQ9PT1vKXJldHVybiBjLnNldChlLG8pLGkucG9zdE1lc3NhZ2Uoe2lkOmV9KTtpZihjLmdldChlKT09PW8pcmV0dXJuIGkucG9zdE1lc3NhZ2Uoe2lkOmV9KTtpLnBvc3RNZXNzYWdlKHtpZDplLHR5cGU6eSxiYXNlNjQ6byx3aWR0aDphLGhlaWdodDp0fSksYy5zZXQoZSxvKX1lbHNlIHJldHVybiBpLnBvc3RNZXNzYWdlKHtpZDpzLmRhdGEuaWR9KX19KSgpOwoK",
      null,
      !1
    ),
    Dn = Object.getOwnPropertySymbols,
    ko = Object.prototype.hasOwnProperty,
    Ro = Object.prototype.propertyIsEnumerable,
    Oo = (t, e) => {
      var n = {};
      for (var r in t) ko.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
      if (t != null && Dn)
        for (var r of Dn(t)) e.indexOf(r) < 0 && Ro.call(t, r) && (n[r] = t[r]);
      return n;
    },
    xo = (t, e, n) =>
      new Promise((r, o) => {
        var a = (l) => {
            try {
              s(n.next(l));
            } catch (c) {
              o(c);
            }
          },
          i = (l) => {
            try {
              s(n.throw(l));
            } catch (c) {
              o(c);
            }
          },
          s = (l) =>
            l.done ? r(l.value) : Promise.resolve(l.value).then(a, i);
        s((n = n.apply(t, e)).next());
      });
  class Lo {
    constructor(e) {
      (this.pendingCanvasMutations = new Map()),
        (this.rafStamps = { latestId: 0, invokeId: null }),
        (this.frozen = !1),
        (this.locked = !1),
        (this.processMutation = (l, c) => {
          ((this.rafStamps.invokeId &&
            this.rafStamps.latestId !== this.rafStamps.invokeId) ||
            !this.rafStamps.invokeId) &&
            (this.rafStamps.invokeId = this.rafStamps.latestId),
            this.pendingCanvasMutations.has(l) ||
              this.pendingCanvasMutations.set(l, []),
            this.pendingCanvasMutations.get(l).push(c);
        });
      const {
        sampling: n = "all",
        win: r,
        blockClass: o,
        blockSelector: a,
        recordCanvas: i,
        dataURLOptions: s,
      } = e;
      (this.mutationCb = e.mutationCb),
        (this.mirror = e.mirror),
        i && n === "all" && this.initCanvasMutationObserver(r, o, a),
        i &&
          typeof n == "number" &&
          this.initCanvasFPSObserver(n, r, o, a, { dataURLOptions: s });
    }
    reset() {
      this.pendingCanvasMutations.clear(),
        this.resetObservers && this.resetObservers();
    }
    freeze() {
      this.frozen = !0;
    }
    unfreeze() {
      this.frozen = !1;
    }
    lock() {
      this.locked = !0;
    }
    unlock() {
      this.locked = !1;
    }
    initCanvasFPSObserver(e, n, r, o, a) {
      const i = In(n, r, o),
        s = new Map(),
        l = new Do();
      l.onmessage = (m) => {
        const { id: y } = m.data;
        if ((s.set(y, !1), !("base64" in m.data))) return;
        const { base64: g, type: p, width: S, height: v } = m.data;
        this.mutationCb({
          id: y,
          type: pe["2D"],
          commands: [
            { property: "clearRect", args: [0, 0, S, v] },
            {
              property: "drawImage",
              args: [
                {
                  rr_type: "ImageBitmap",
                  args: [
                    {
                      rr_type: "Blob",
                      data: [{ rr_type: "ArrayBuffer", base64: g }],
                      type: p,
                    },
                  ],
                },
                0,
                0,
              ],
            },
          ],
        });
      };
      const c = 1e3 / e;
      let u = 0,
        d;
      const h = () => {
          const m = [];
          return (
            n.document.querySelectorAll("canvas").forEach((y) => {
              Q(y, r, o, !0) || m.push(y);
            }),
            m
          );
        },
        f = (m) => {
          if (u && m - u < c) {
            d = requestAnimationFrame(f);
            return;
          }
          (u = m),
            h().forEach((y) =>
              xo(this, null, function* () {
                var g;
                const p = this.mirror.getId(y);
                if (s.get(p)) return;
                if ((s.set(p, !0), ["webgl", "webgl2"].includes(y.__context))) {
                  const v = y.getContext(y.__context);
                  ((g = v?.getContextAttributes()) == null
                    ? void 0
                    : g.preserveDrawingBuffer) === !1 &&
                    v?.clear(v.COLOR_BUFFER_BIT);
                }
                const S = yield createImageBitmap(y);
                l.postMessage(
                  {
                    id: p,
                    bitmap: S,
                    width: y.width,
                    height: y.height,
                    dataURLOptions: a.dataURLOptions,
                  },
                  [S]
                );
              })
            ),
            (d = requestAnimationFrame(f));
        };
      (d = requestAnimationFrame(f)),
        (this.resetObservers = () => {
          i(), cancelAnimationFrame(d);
        });
    }
    initCanvasMutationObserver(e, n, r) {
      this.startRAFTimestamping(), this.startPendingCanvasMutationFlusher();
      const o = In(e, n, r),
        a = Eo(this.processMutation.bind(this), e, n, r),
        i = No(this.processMutation.bind(this), e, n, r, this.mirror);
      this.resetObservers = () => {
        o(), a(), i();
      };
    }
    startPendingCanvasMutationFlusher() {
      requestAnimationFrame(() => this.flushPendingCanvasMutations());
    }
    startRAFTimestamping() {
      const e = (n) => {
        (this.rafStamps.latestId = n), requestAnimationFrame(e);
      };
      requestAnimationFrame(e);
    }
    flushPendingCanvasMutations() {
      this.pendingCanvasMutations.forEach((e, n) => {
        const r = this.mirror.getId(n);
        this.flushPendingCanvasMutationFor(n, r);
      }),
        requestAnimationFrame(() => this.flushPendingCanvasMutations());
    }
    flushPendingCanvasMutationFor(e, n) {
      if (this.frozen || this.locked) return;
      const r = this.pendingCanvasMutations.get(e);
      if (!r || n === -1) return;
      const o = r.map((i) => Oo(i, ["type"])),
        { type: a } = r[0];
      this.mutationCb({ id: n, type: a, commands: o }),
        this.pendingCanvasMutations.delete(e);
    }
  }
  class Ao {
    constructor(e) {
      (this.trackedLinkElements = new WeakSet()),
        (this.styleMirror = new wt()),
        (this.mutationCb = e.mutationCb),
        (this.adoptedStyleSheetCb = e.adoptedStyleSheetCb);
    }
    attachLinkElement(e, n) {
      "_cssText" in n.attributes &&
        this.mutationCb({
          adds: [],
          removes: [],
          texts: [],
          attributes: [{ id: n.id, attributes: n.attributes }],
        }),
        this.trackLinkElement(e);
    }
    trackLinkElement(e) {
      this.trackedLinkElements.has(e) ||
        (this.trackedLinkElements.add(e), this.trackStylesheetInLinkElement(e));
    }
    adoptStyleSheets(e, n) {
      if (e.length === 0) return;
      const r = { id: n, styleIds: [] },
        o = [];
      for (const a of e) {
        let i;
        if (this.styleMirror.has(a)) i = this.styleMirror.getId(a);
        else {
          i = this.styleMirror.add(a);
          const s = Array.from(a.rules || CSSRule);
          o.push({
            styleId: i,
            rules: s.map((l, c) => ({ rule: Wt(l), index: c })),
          });
        }
        r.styleIds.push(i);
      }
      o.length > 0 && (r.styles = o), this.adoptedStyleSheetCb(r);
    }
    reset() {
      this.styleMirror.reset(), (this.trackedLinkElements = new WeakSet());
    }
    trackStylesheetInLinkElement(e) {}
  }
  class _o {
    constructor() {
      (this.nodeMap = new WeakMap()),
        (this.loop = !0),
        this.periodicallyClear();
    }
    periodicallyClear() {
      requestAnimationFrame(() => {
        this.clear(), this.loop && this.periodicallyClear();
      });
    }
    inOtherBuffer(e, n) {
      const r = this.nodeMap.get(e);
      return r && Array.from(r).some((o) => o !== n);
    }
    add(e, n) {
      this.nodeMap.set(e, (this.nodeMap.get(e) || new Set()).add(n));
    }
    clear() {
      this.nodeMap = new WeakMap();
    }
    destroy() {
      this.loop = !1;
    }
  }
  var Fo = Object.defineProperty,
    Po = Object.defineProperties,
    Wo = Object.getOwnPropertyDescriptors,
    kn = Object.getOwnPropertySymbols,
    $o = Object.prototype.hasOwnProperty,
    Uo = Object.prototype.propertyIsEnumerable,
    Rn = (t, e, n) =>
      e in t
        ? Fo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n })
        : (t[e] = n),
    se = (t, e) => {
      for (var n in e || (e = {})) $o.call(e, n) && Rn(t, n, e[n]);
      if (kn) for (var n of kn(e)) Uo.call(e, n) && Rn(t, n, e[n]);
      return t;
    },
    Vo = (t, e) => Po(t, Wo(e));
  function z(t) {
    return Vo(se({}, t), { timestamp: Date.now() });
  }
  let G,
    et,
    Tt,
    tt = !1;
  const ae = $t();
  function Ce(t = {}) {
    const {
      emit: e,
      checkoutEveryNms: n,
      checkoutEveryNth: r,
      blockClass: o = "rr-block",
      blockSelector: a = null,
      ignoreClass: i = "rr-ignore",
      maskTextClass: s = "rr-mask",
      maskTextSelector: l = null,
      inlineStylesheet: c = !0,
      maskAllInputs: u,
      maskInputOptions: d,
      slimDOMOptions: h,
      maskInputFn: f,
      maskTextFn: m,
      hooks: y,
      packFn: g,
      sampling: p = {},
      dataURLOptions: S = {},
      mousemoveWait: v,
      recordCanvas: E = !1,
      recordCrossOriginIframes: D = !1,
      recordAfter: R = t.recordAfter === "DOMContentLoaded"
        ? t.recordAfter
        : "load",
      userTriggeredOnInput: W = !1,
      collectFonts: A = !1,
      inlineImages: te = !1,
      plugins: X,
      keepIframeSrcFn: Z = () => !1,
      ignoreCSSAttributes: ne = new Set([]),
      errorHandler: K,
    } = t;
    Hr(K);
    const oe = D ? window.parent === window : !0;
    let F = !1;
    if (!oe)
      try {
        window.parent.document && (F = !1);
      } catch {
        F = !0;
      }
    if (oe && !e) throw new Error("emit function is required");
    v !== void 0 && p.mousemove === void 0 && (p.mousemove = v), ae.reset();
    const H =
        u === !0
          ? {
              color: !0,
              date: !0,
              "datetime-local": !0,
              email: !0,
              month: !0,
              number: !0,
              range: !0,
              search: !0,
              tel: !0,
              text: !0,
              time: !0,
              url: !0,
              week: !0,
              textarea: !0,
              select: !0,
              password: !0,
            }
          : d !== void 0
          ? d
          : { password: !0 },
      _ =
        h === !0 || h === "all"
          ? {
              script: !0,
              comment: !0,
              headFavicon: !0,
              headWhitespace: !0,
              headMetaSocial: !0,
              headMetaRobots: !0,
              headMetaHttpEquiv: !0,
              headMetaVerification: !0,
              headMetaAuthorship: h === "all",
              headMetaDescKeywords: h === "all",
            }
          : h || {};
    yt();
    let q,
      w = 0;
    const b = (T) => {
      for (const re of X || []) re.eventProcessor && (T = re.eventProcessor(T));
      return g && !F && (T = g(T)), T;
    };
    G = (T, re) => {
      var $;
      if (
        ((($ = we[0]) == null ? void 0 : $.isFrozen()) &&
          T.type !== N.FullSnapshot &&
          !(T.type === N.IncrementalSnapshot && T.data.source === C.Mutation) &&
          we.forEach((j) => j.unfreeze()),
        oe)
      )
        e?.(b(T), re);
      else if (F) {
        const j = {
          type: "rrweb",
          event: b(T),
          origin: window.location.origin,
          isCheckout: re,
        };
        window.parent.postMessage(j, "*");
      }
      if (T.type === N.FullSnapshot) (q = T), (w = 0);
      else if (T.type === N.IncrementalSnapshot) {
        if (T.data.source === C.Mutation && T.data.isAttachIframe) return;
        w++;
        const j = r && w >= r,
          ye = n && T.timestamp - q.timestamp > n;
        (j || ye) && et(!0);
      }
    };
    const M = (T) => {
        G(
          z({
            type: N.IncrementalSnapshot,
            data: se({ source: C.Mutation }, T),
          })
        );
      },
      k = (T) =>
        G(
          z({ type: N.IncrementalSnapshot, data: se({ source: C.Scroll }, T) })
        ),
      Y = (T) =>
        G(
          z({
            type: N.IncrementalSnapshot,
            data: se({ source: C.CanvasMutation }, T),
          })
        ),
      fe = (T) =>
        G(
          z({
            type: N.IncrementalSnapshot,
            data: se({ source: C.AdoptedStyleSheet }, T),
          })
        ),
      de = new Ao({ mutationCb: M, adoptedStyleSheetCb: fe }),
      le = new po({
        mirror: ae,
        mutationCb: M,
        stylesheetManager: de,
        recordCrossOriginIframes: D,
        wrappedEmit: G,
      });
    for (const T of X || [])
      T.getMirror &&
        T.getMirror({
          nodeMirror: ae,
          crossOriginIframeMirror: le.crossOriginIframeMirror,
          crossOriginIframeStyleMirror: le.crossOriginIframeStyleMirror,
        });
    const _e = new _o();
    Tt = new Lo({
      recordCanvas: E,
      mutationCb: Y,
      win: window,
      blockClass: o,
      blockSelector: a,
      mirror: ae,
      sampling: p.canvas,
      dataURLOptions: S,
    });
    const be = new So({
      mutationCb: M,
      scrollCb: k,
      bypassOptions: {
        blockClass: o,
        blockSelector: a,
        maskTextClass: s,
        maskTextSelector: l,
        inlineStylesheet: c,
        maskInputOptions: H,
        dataURLOptions: S,
        maskTextFn: m,
        maskInputFn: f,
        recordCanvas: E,
        inlineImages: te,
        sampling: p,
        slimDOMOptions: _,
        iframeManager: le,
        stylesheetManager: de,
        canvasManager: Tt,
        keepIframeSrcFn: Z,
        processedNodeManager: _e,
      },
      mirror: ae,
    });
    et = (T = !1) => {
      G(
        z({
          type: N.Meta,
          data: { href: window.location.href, width: pt(), height: ht() },
        }),
        T
      ),
        de.reset(),
        be.init(),
        we.forEach(($) => $.lock());
      const re = Ar(document, {
        mirror: ae,
        blockClass: o,
        blockSelector: a,
        maskTextClass: s,
        maskTextSelector: l,
        inlineStylesheet: c,
        maskAllInputs: H,
        maskTextFn: m,
        slimDOM: _,
        dataURLOptions: S,
        recordCanvas: E,
        inlineImages: te,
        onSerialize: ($) => {
          De($, ae) && le.addIframe($),
            vt($, ae) && de.trackLinkElement($),
            ge($) && be.addShadowRoot($.shadowRoot, document);
        },
        onIframeLoad: ($, j) => {
          le.attachIframe($, j), be.observeAttachShadow($);
        },
        onStylesheetLoad: ($, j) => {
          de.attachLinkElement($, j);
        },
        keepIframeSrcFn: Z,
      });
      if (!re) return console.warn("Failed to snapshot the document");
      G(
        z({
          type: N.FullSnapshot,
          data: { node: re, initialOffset: dt(window) },
        }),
        T
      ),
        we.forEach(($) => $.unlock()),
        document.adoptedStyleSheets &&
          document.adoptedStyleSheets.length > 0 &&
          de.adoptStyleSheets(document.adoptedStyleSheets, ae.getId(document));
    };
    try {
      const T = [],
        re = (j) => {
          var ye;
          return O(ho)(
            {
              mutationCb: M,
              mousemoveCb: (U, Ft) =>
                G(
                  z({
                    type: N.IncrementalSnapshot,
                    data: { source: Ft, positions: U },
                  })
                ),
              mouseInteractionCb: (U) =>
                G(
                  z({
                    type: N.IncrementalSnapshot,
                    data: se({ source: C.MouseInteraction }, U),
                  })
                ),
              scrollCb: k,
              viewportResizeCb: (U) =>
                G(
                  z({
                    type: N.IncrementalSnapshot,
                    data: se({ source: C.ViewportResize }, U),
                  })
                ),
              inputCb: (U) =>
                G(
                  z({
                    type: N.IncrementalSnapshot,
                    data: se({ source: C.Input }, U),
                  })
                ),
              mediaInteractionCb: (U) =>
                G(
                  z({
                    type: N.IncrementalSnapshot,
                    data: se({ source: C.MediaInteraction }, U),
                  })
                ),
              styleSheetRuleCb: (U) =>
                G(
                  z({
                    type: N.IncrementalSnapshot,
                    data: se({ source: C.StyleSheetRule }, U),
                  })
                ),
              styleDeclarationCb: (U) =>
                G(
                  z({
                    type: N.IncrementalSnapshot,
                    data: se({ source: C.StyleDeclaration }, U),
                  })
                ),
              canvasMutationCb: Y,
              fontCb: (U) =>
                G(
                  z({
                    type: N.IncrementalSnapshot,
                    data: se({ source: C.Font }, U),
                  })
                ),
              selectionCb: (U) => {
                G(
                  z({
                    type: N.IncrementalSnapshot,
                    data: se({ source: C.Selection }, U),
                  })
                );
              },
              blockClass: o,
              ignoreClass: i,
              maskTextClass: s,
              maskTextSelector: l,
              maskInputOptions: H,
              inlineStylesheet: c,
              sampling: p,
              recordCanvas: E,
              inlineImages: te,
              userTriggeredOnInput: W,
              collectFonts: A,
              doc: j,
              maskInputFn: f,
              maskTextFn: m,
              keepIframeSrcFn: Z,
              blockSelector: a,
              slimDOMOptions: _,
              dataURLOptions: S,
              mirror: ae,
              iframeManager: le,
              stylesheetManager: de,
              shadowDomManager: be,
              processedNodeManager: _e,
              canvasManager: Tt,
              ignoreCSSAttributes: ne,
              plugins:
                ((ye = X?.filter((U) => U.observer)) == null
                  ? void 0
                  : ye.map((U) => ({
                      observer: U.observer,
                      options: U.options,
                      callback: (Ft) =>
                        G(
                          z({
                            type: N.Plugin,
                            data: { plugin: U.name, payload: Ft },
                          })
                        ),
                    }))) || [],
            },
            y
          );
        };
      le.addLoadListener((j) => {
        try {
          T.push(re(j.contentDocument));
        } catch (ye) {
          console.warn(ye);
        }
      });
      const $ = () => {
        et(), T.push(re(document)), (tt = !0);
      };
      return (
        document.readyState === "interactive" ||
        document.readyState === "complete"
          ? $()
          : (T.push(
              J("DOMContentLoaded", () => {
                G(z({ type: N.DomContentLoaded, data: {} })),
                  R === "DOMContentLoaded" && $();
              })
            ),
            T.push(
              J(
                "load",
                () => {
                  G(z({ type: N.Load, data: {} })), R === "load" && $();
                },
                window
              )
            )),
        () => {
          T.forEach((j) => j()), _e.destroy(), (tt = !1), Yr();
        }
      );
    } catch (T) {
      console.warn(T);
    }
  }
  (Ce.addCustomEvent = (t, e) => {
    if (!tt) throw new Error("please add custom event after start recording");
    G(z({ type: N.Custom, data: { tag: t, payload: e } }));
  }),
    (Ce.freezePage = () => {
      we.forEach((t) => t.freeze());
    }),
    (Ce.takeFullSnapshot = (t) => {
      if (!tt)
        throw new Error("please take full snapshot after start recording");
      et(t);
    }),
    (Ce.mirror = ae);
  var x;
  (function (t) {
    (t[(t.Document = 0)] = "Document"),
      (t[(t.DocumentType = 1)] = "DocumentType"),
      (t[(t.Element = 2)] = "Element"),
      (t[(t.Text = 3)] = "Text"),
      (t[(t.CDATA = 4)] = "CDATA"),
      (t[(t.Comment = 5)] = "Comment");
  })(x || (x = {}));
  var Bo = (function () {
    function t() {
      (this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap());
    }
    return (
      (t.prototype.getId = function (e) {
        var n;
        if (!e) return -1;
        var r = (n = this.getMeta(e)) === null || n === void 0 ? void 0 : n.id;
        return r ?? -1;
      }),
      (t.prototype.getNode = function (e) {
        return this.idNodeMap.get(e) || null;
      }),
      (t.prototype.getIds = function () {
        return Array.from(this.idNodeMap.keys());
      }),
      (t.prototype.getMeta = function (e) {
        return this.nodeMetaMap.get(e) || null;
      }),
      (t.prototype.removeNodeFromMap = function (e) {
        var n = this,
          r = this.getId(e);
        this.idNodeMap.delete(r),
          e.childNodes &&
            e.childNodes.forEach(function (o) {
              return n.removeNodeFromMap(o);
            });
      }),
      (t.prototype.has = function (e) {
        return this.idNodeMap.has(e);
      }),
      (t.prototype.hasNode = function (e) {
        return this.nodeMetaMap.has(e);
      }),
      (t.prototype.add = function (e, n) {
        var r = n.id;
        this.idNodeMap.set(r, e), this.nodeMetaMap.set(e, n);
      }),
      (t.prototype.replace = function (e, n) {
        var r = this.getNode(e);
        if (r) {
          var o = this.nodeMetaMap.get(r);
          o && this.nodeMetaMap.set(n, o);
        }
        this.idNodeMap.set(e, n);
      }),
      (t.prototype.reset = function () {
        (this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap());
      }),
      t
    );
  })();
  function jo() {
    return new Bo();
  }
  function Go(t) {
    const e = {},
      n = /;(?![^(]*\))/g,
      r = /:(.+)/,
      o = /\/\*.*?\*\//g;
    return (
      t
        .replace(o, "")
        .split(n)
        .forEach(function (a) {
          if (a) {
            const i = a.split(r);
            i.length > 1 && (e[It(i[0].trim())] = i[1].trim());
          }
        }),
      e
    );
  }
  function On(t) {
    const e = [];
    for (const n in t) {
      const r = t[n];
      if (typeof r != "string") continue;
      const o = Xo(n);
      e.push(`${o}: ${r};`);
    }
    return e.join(" ");
  }
  const zo = /-([a-z])/g,
    Ho = /^--[a-zA-Z0-9-]+$/,
    It = (t) =>
      Ho.test(t) ? t : t.replace(zo, (e, n) => (n ? n.toUpperCase() : "")),
    Yo = /\B([A-Z])/g,
    Xo = (t) => t.replace(Yo, "-$1").toLowerCase();
  class ie {
    constructor(...e) {
      (this.parentElement = null),
        (this.parentNode = null),
        (this.firstChild = null),
        (this.lastChild = null),
        (this.previousSibling = null),
        (this.nextSibling = null),
        (this.ELEMENT_NODE = B.ELEMENT_NODE),
        (this.TEXT_NODE = B.TEXT_NODE);
    }
    get childNodes() {
      const e = [];
      let n = this.firstChild;
      for (; n; ) e.push(n), (n = n.nextSibling);
      return e;
    }
    contains(e) {
      if (e instanceof ie) {
        if (e.ownerDocument !== this.ownerDocument) return !1;
        if (e === this) return !0;
      } else return !1;
      for (; e.parentNode; ) {
        if (e.parentNode === this) return !0;
        e = e.parentNode;
      }
      return !1;
    }
    appendChild(e) {
      throw new Error(
        "RRDomException: Failed to execute 'appendChild' on 'RRNode': This RRNode type does not support this method."
      );
    }
    insertBefore(e, n) {
      throw new Error(
        "RRDomException: Failed to execute 'insertBefore' on 'RRNode': This RRNode type does not support this method."
      );
    }
    removeChild(e) {
      throw new Error(
        "RRDomException: Failed to execute 'removeChild' on 'RRNode': This RRNode type does not support this method."
      );
    }
    toString() {
      return "RRNode";
    }
  }
  function Zo(t) {
    return class lr extends t {
      constructor(...n) {
        super(n),
          (this.nodeType = B.DOCUMENT_NODE),
          (this.nodeName = "#document"),
          (this.compatMode = "CSS1Compat"),
          (this.RRNodeType = x.Document),
          (this.textContent = null),
          (this.ownerDocument = this);
      }
      get documentElement() {
        return (
          this.childNodes.find(
            (n) => n.RRNodeType === x.Element && n.tagName === "HTML"
          ) || null
        );
      }
      get body() {
        var n;
        return (
          ((n = this.documentElement) === null || n === void 0
            ? void 0
            : n.childNodes.find(
                (r) => r.RRNodeType === x.Element && r.tagName === "BODY"
              )) || null
        );
      }
      get head() {
        var n;
        return (
          ((n = this.documentElement) === null || n === void 0
            ? void 0
            : n.childNodes.find(
                (r) => r.RRNodeType === x.Element && r.tagName === "HEAD"
              )) || null
        );
      }
      get implementation() {
        return this;
      }
      get firstElementChild() {
        return this.documentElement;
      }
      appendChild(n) {
        const r = n.RRNodeType;
        if (
          (r === x.Element || r === x.DocumentType) &&
          this.childNodes.some((a) => a.RRNodeType === r)
        )
          throw new Error(
            `RRDomException: Failed to execute 'appendChild' on 'RRNode': Only one ${
              r === x.Element ? "RRElement" : "RRDoctype"
            } on RRDocument allowed.`
          );
        const o = Mt(this, n);
        return (o.parentElement = null), o;
      }
      insertBefore(n, r) {
        const o = n.RRNodeType;
        if (
          (o === x.Element || o === x.DocumentType) &&
          this.childNodes.some((i) => i.RRNodeType === o)
        )
          throw new Error(
            `RRDomException: Failed to execute 'insertBefore' on 'RRNode': Only one ${
              o === x.Element ? "RRElement" : "RRDoctype"
            } on RRDocument allowed.`
          );
        const a = Pn(this, n, r);
        return (a.parentElement = null), a;
      }
      removeChild(n) {
        return Wn(this, n);
      }
      open() {
        (this.firstChild = null), (this.lastChild = null);
      }
      close() {}
      write(n) {
        let r;
        if (
          (n ===
          '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "">'
            ? (r = "-//W3C//DTD XHTML 1.0 Transitional//EN")
            : n ===
                '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "">' &&
              (r = "-//W3C//DTD HTML 4.0 Transitional//EN"),
          r)
        ) {
          const o = this.createDocumentType("html", r, "");
          this.open(), this.appendChild(o);
        }
      }
      createDocument(n, r, o) {
        return new lr();
      }
      createDocumentType(n, r, o) {
        const a = new (xn(ie))(n, r, o);
        return (a.ownerDocument = this), a;
      }
      createElement(n) {
        const r = new (Ln(ie))(n);
        return (r.ownerDocument = this), r;
      }
      createElementNS(n, r) {
        return this.createElement(r);
      }
      createTextNode(n) {
        const r = new (An(ie))(n);
        return (r.ownerDocument = this), r;
      }
      createComment(n) {
        const r = new (_n(ie))(n);
        return (r.ownerDocument = this), r;
      }
      createCDATASection(n) {
        const r = new (Fn(ie))(n);
        return (r.ownerDocument = this), r;
      }
      toString() {
        return "RRDocument";
      }
    };
  }
  function xn(t) {
    return class extends t {
      constructor(e, n, r) {
        super(),
          (this.nodeType = B.DOCUMENT_TYPE_NODE),
          (this.RRNodeType = x.DocumentType),
          (this.name = e),
          (this.publicId = n),
          (this.systemId = r),
          (this.nodeName = e),
          (this.textContent = null);
      }
      toString() {
        return "RRDocumentType";
      }
    };
  }
  function Ln(t) {
    return class extends t {
      constructor(e) {
        super(),
          (this.nodeType = B.ELEMENT_NODE),
          (this.RRNodeType = x.Element),
          (this.attributes = {}),
          (this.shadowRoot = null),
          (this.tagName = e.toUpperCase()),
          (this.nodeName = e.toUpperCase());
      }
      get textContent() {
        let e = "";
        return this.childNodes.forEach((n) => (e += n.textContent)), e;
      }
      set textContent(e) {
        (this.firstChild = null),
          (this.lastChild = null),
          this.appendChild(this.ownerDocument.createTextNode(e));
      }
      get classList() {
        return new Jo(this.attributes.class, (e) => {
          this.attributes.class = e;
        });
      }
      get id() {
        return this.attributes.id || "";
      }
      get className() {
        return this.attributes.class || "";
      }
      get style() {
        const e = this.attributes.style ? Go(this.attributes.style) : {},
          n = /\B([A-Z])/g;
        return (
          (e.setProperty = (r, o, a) => {
            if (n.test(r)) return;
            const i = It(r);
            o ? (e[i] = o) : delete e[i],
              a === "important" && (e[i] += " !important"),
              (this.attributes.style = On(e));
          }),
          (e.removeProperty = (r) => {
            if (n.test(r)) return "";
            const o = It(r),
              a = e[o] || "";
            return delete e[o], (this.attributes.style = On(e)), a;
          }),
          e
        );
      }
      getAttribute(e) {
        return this.attributes[e] || null;
      }
      setAttribute(e, n) {
        this.attributes[e] = n;
      }
      setAttributeNS(e, n, r) {
        this.setAttribute(n, r);
      }
      removeAttribute(e) {
        delete this.attributes[e];
      }
      appendChild(e) {
        return Mt(this, e);
      }
      insertBefore(e, n) {
        return Pn(this, e, n);
      }
      removeChild(e) {
        return Wn(this, e);
      }
      attachShadow(e) {
        const n = this.ownerDocument.createElement("SHADOWROOT");
        return (this.shadowRoot = n), n;
      }
      dispatchEvent(e) {
        return !0;
      }
      toString() {
        let e = "";
        for (const n in this.attributes) e += `${n}="${this.attributes[n]}" `;
        return `${this.tagName} ${e}`;
      }
    };
  }
  function Ko(t) {
    return class extends t {
      attachShadow(e) {
        throw new Error(
          "RRDomException: Failed to execute 'attachShadow' on 'RRElement': This RRElement does not support attachShadow"
        );
      }
      play() {
        this.paused = !1;
      }
      pause() {
        this.paused = !0;
      }
    };
  }
  function An(t) {
    return class extends t {
      constructor(e) {
        super(),
          (this.nodeType = B.TEXT_NODE),
          (this.nodeName = "#text"),
          (this.RRNodeType = x.Text),
          (this.data = e);
      }
      get textContent() {
        return this.data;
      }
      set textContent(e) {
        this.data = e;
      }
      toString() {
        return `RRText text=${JSON.stringify(this.data)}`;
      }
    };
  }
  function _n(t) {
    return class extends t {
      constructor(e) {
        super(),
          (this.nodeType = B.COMMENT_NODE),
          (this.nodeName = "#comment"),
          (this.RRNodeType = x.Comment),
          (this.data = e);
      }
      get textContent() {
        return this.data;
      }
      set textContent(e) {
        this.data = e;
      }
      toString() {
        return `RRComment text=${JSON.stringify(this.data)}`;
      }
    };
  }
  function Fn(t) {
    return class extends t {
      constructor(e) {
        super(),
          (this.nodeName = "#cdata-section"),
          (this.nodeType = B.CDATA_SECTION_NODE),
          (this.RRNodeType = x.CDATA),
          (this.data = e);
      }
      get textContent() {
        return this.data;
      }
      set textContent(e) {
        this.data = e;
      }
      toString() {
        return `RRCDATASection data=${JSON.stringify(this.data)}`;
      }
    };
  }
  class Jo {
    constructor(e, n) {
      if (
        ((this.classes = []),
        (this.add = (...r) => {
          for (const o of r) {
            const a = String(o);
            this.classes.indexOf(a) >= 0 || this.classes.push(a);
          }
          this.onChange && this.onChange(this.classes.join(" "));
        }),
        (this.remove = (...r) => {
          (this.classes = this.classes.filter((o) => r.indexOf(o) === -1)),
            this.onChange && this.onChange(this.classes.join(" "));
        }),
        e)
      ) {
        const r = e.trim().split(/\s+/);
        this.classes.push(...r);
      }
      this.onChange = n;
    }
  }
  function Mt(t, e) {
    return (
      e.parentNode && e.parentNode.removeChild(e),
      t.lastChild
        ? ((t.lastChild.nextSibling = e), (e.previousSibling = t.lastChild))
        : ((t.firstChild = e), (e.previousSibling = null)),
      (t.lastChild = e),
      (e.nextSibling = null),
      (e.parentNode = t),
      (e.parentElement = t),
      (e.ownerDocument = t.ownerDocument),
      e
    );
  }
  function Pn(t, e, n) {
    if (!n) return Mt(t, e);
    if (n.parentNode !== t)
      throw new Error(
        "Failed to execute 'insertBefore' on 'RRNode': The RRNode before which the new node is to be inserted is not a child of this RRNode."
      );
    return (
      e === n ||
        (e.parentNode && e.parentNode.removeChild(e),
        (e.previousSibling = n.previousSibling),
        (n.previousSibling = e),
        (e.nextSibling = n),
        e.previousSibling
          ? (e.previousSibling.nextSibling = e)
          : (t.firstChild = e),
        (e.parentElement = t),
        (e.parentNode = t),
        (e.ownerDocument = t.ownerDocument)),
      e
    );
  }
  function Wn(t, e) {
    if (e.parentNode !== t)
      throw new Error(
        "Failed to execute 'removeChild' on 'RRNode': The RRNode to be removed is not a child of this RRNode."
      );
    return (
      e.previousSibling
        ? (e.previousSibling.nextSibling = e.nextSibling)
        : (t.firstChild = e.nextSibling),
      e.nextSibling
        ? (e.nextSibling.previousSibling = e.previousSibling)
        : (t.lastChild = e.previousSibling),
      (e.previousSibling = null),
      (e.nextSibling = null),
      (e.parentElement = null),
      (e.parentNode = null),
      e
    );
  }
  var B;
  (function (t) {
    (t[(t.PLACEHOLDER = 0)] = "PLACEHOLDER"),
      (t[(t.ELEMENT_NODE = 1)] = "ELEMENT_NODE"),
      (t[(t.ATTRIBUTE_NODE = 2)] = "ATTRIBUTE_NODE"),
      (t[(t.TEXT_NODE = 3)] = "TEXT_NODE"),
      (t[(t.CDATA_SECTION_NODE = 4)] = "CDATA_SECTION_NODE"),
      (t[(t.ENTITY_REFERENCE_NODE = 5)] = "ENTITY_REFERENCE_NODE"),
      (t[(t.ENTITY_NODE = 6)] = "ENTITY_NODE"),
      (t[(t.PROCESSING_INSTRUCTION_NODE = 7)] = "PROCESSING_INSTRUCTION_NODE"),
      (t[(t.COMMENT_NODE = 8)] = "COMMENT_NODE"),
      (t[(t.DOCUMENT_NODE = 9)] = "DOCUMENT_NODE"),
      (t[(t.DOCUMENT_TYPE_NODE = 10)] = "DOCUMENT_TYPE_NODE"),
      (t[(t.DOCUMENT_FRAGMENT_NODE = 11)] = "DOCUMENT_FRAGMENT_NODE");
  })(B || (B = {}));
  const Dt = {
      svg: "http://www.w3.org/2000/svg",
      "xlink:href": "http://www.w3.org/1999/xlink",
      xmlns: "http://www.w3.org/2000/xmlns/",
    },
    Qo = {
      altglyph: "altGlyph",
      altglyphdef: "altGlyphDef",
      altglyphitem: "altGlyphItem",
      animatecolor: "animateColor",
      animatemotion: "animateMotion",
      animatetransform: "animateTransform",
      clippath: "clipPath",
      feblend: "feBlend",
      fecolormatrix: "feColorMatrix",
      fecomponenttransfer: "feComponentTransfer",
      fecomposite: "feComposite",
      feconvolvematrix: "feConvolveMatrix",
      fediffuselighting: "feDiffuseLighting",
      fedisplacementmap: "feDisplacementMap",
      fedistantlight: "feDistantLight",
      fedropshadow: "feDropShadow",
      feflood: "feFlood",
      fefunca: "feFuncA",
      fefuncb: "feFuncB",
      fefuncg: "feFuncG",
      fefuncr: "feFuncR",
      fegaussianblur: "feGaussianBlur",
      feimage: "feImage",
      femerge: "feMerge",
      femergenode: "feMergeNode",
      femorphology: "feMorphology",
      feoffset: "feOffset",
      fepointlight: "fePointLight",
      fespecularlighting: "feSpecularLighting",
      fespotlight: "feSpotLight",
      fetile: "feTile",
      feturbulence: "feTurbulence",
      foreignobject: "foreignObject",
      glyphref: "glyphRef",
      lineargradient: "linearGradient",
      radialgradient: "radialGradient",
    };
  let ce = null;
  function ue(t, e, n, r = e.mirror || e.ownerDocument.mirror) {
    t = qo(t, e, n, r);
    const o = t.childNodes,
      a = e.childNodes;
    (o.length > 0 || a.length > 0) && $n(Array.from(o), a, t, n, r),
      es(t, e, n, r);
  }
  function qo(t, e, n, r) {
    var o;
    if (
      (n.afterAppend &&
        !ce &&
        ((ce = new WeakSet()),
        setTimeout(() => {
          ce = null;
        }, 0)),
      !kt(t, e))
    ) {
      const a = nt(e, n.mirror, r);
      (o = t.parentNode) === null || o === void 0 || o.replaceChild(a, t),
        (t = a);
    }
    switch (e.RRNodeType) {
      case x.Document: {
        if (!Oe(t, e, n.mirror, r)) {
          const a = r.getMeta(e);
          a &&
            (n.mirror.removeNodeFromMap(t),
            t.close(),
            t.open(),
            n.mirror.add(t, a),
            ce?.add(t));
        }
        break;
      }
      case x.Element: {
        const a = t,
          i = e;
        switch (i.tagName) {
          case "IFRAME": {
            const s = t.contentDocument;
            if (!s) break;
            ue(s, e.contentDocument, n, r);
            break;
          }
        }
        if (i.shadowRoot) {
          a.shadowRoot || a.attachShadow({ mode: "open" });
          const s = a.shadowRoot.childNodes,
            l = i.shadowRoot.childNodes;
          (s.length > 0 || l.length > 0) &&
            $n(Array.from(s), l, a.shadowRoot, n, r);
        }
        break;
      }
    }
    return t;
  }
  function es(t, e, n, r) {
    var o;
    switch (e.RRNodeType) {
      case x.Document: {
        const a = e.scrollData;
        a && n.applyScroll(a, !0);
        break;
      }
      case x.Element: {
        const a = t,
          i = e;
        switch (
          (ts(a, i, r),
          i.scrollData && n.applyScroll(i.scrollData, !0),
          i.inputData && n.applyInput(i.inputData),
          i.tagName)
        ) {
          case "AUDIO":
          case "VIDEO": {
            const s = t,
              l = i;
            l.paused !== void 0 && (l.paused ? s.pause() : s.play()),
              l.muted !== void 0 && (s.muted = l.muted),
              l.volume !== void 0 && (s.volume = l.volume),
              l.currentTime !== void 0 && (s.currentTime = l.currentTime),
              l.playbackRate !== void 0 && (s.playbackRate = l.playbackRate);
            break;
          }
          case "CANVAS": {
            const s = e;
            if (s.rr_dataURL !== null) {
              const l = document.createElement("img");
              (l.onload = () => {
                const c = a.getContext("2d");
                c && c.drawImage(l, 0, 0, l.width, l.height);
              }),
                (l.src = s.rr_dataURL);
            }
            s.canvasMutations.forEach((l) =>
              n.applyCanvas(l.event, l.mutation, t)
            );
            break;
          }
          case "STYLE": {
            const s = a.sheet;
            s && e.rules.forEach((l) => n.applyStyleSheetMutation(l, s));
            break;
          }
        }
        break;
      }
      case x.Text:
      case x.Comment:
      case x.CDATA: {
        t.textContent !== e.data && (t.textContent = e.data);
        break;
      }
    }
    ce != null &&
      ce.has(t) &&
      (ce.delete(t),
      (o = n.afterAppend) === null ||
        o === void 0 ||
        o.call(n, t, n.mirror.getId(t)));
  }
  function ts(t, e, n) {
    const r = t.attributes,
      o = e.attributes;
    for (const a in o) {
      const i = o[a],
        s = n.getMeta(e);
      if (s?.isSVG && Dt[a]) t.setAttributeNS(Dt[a], a, i);
      else if (e.tagName === "CANVAS" && a === "rr_dataURL") {
        const l = document.createElement("img");
        (l.src = i),
          (l.onload = () => {
            const c = t.getContext("2d");
            c && c.drawImage(l, 0, 0, l.width, l.height);
          });
      } else t.setAttribute(a, i);
    }
    for (const { name: a } of Array.from(r)) a in o || t.removeAttribute(a);
    e.scrollLeft && (t.scrollLeft = e.scrollLeft),
      e.scrollTop && (t.scrollTop = e.scrollTop);
  }
  function $n(t, e, n, r, o) {
    let a = 0,
      i = t.length - 1,
      s = 0,
      l = e.length - 1,
      c = t[a],
      u = t[i],
      d = e[s],
      h = e[l],
      f,
      m;
    for (; a <= i && s <= l; )
      if (c === void 0) c = t[++a];
      else if (u === void 0) u = t[--i];
      else if (Oe(c, d, r.mirror, o))
        ue(c, d, r, o), (c = t[++a]), (d = e[++s]);
      else if (Oe(u, h, r.mirror, o))
        ue(u, h, r, o), (u = t[--i]), (h = e[--l]);
      else if (Oe(c, h, r.mirror, o)) {
        try {
          n.insertBefore(c, u.nextSibling);
        } catch (y) {
          console.warn(y);
        }
        ue(c, h, r, o), (c = t[++a]), (h = e[--l]);
      } else if (Oe(u, d, r.mirror, o)) {
        try {
          n.insertBefore(u, c);
        } catch (y) {
          console.warn(y);
        }
        ue(u, d, r, o), (u = t[--i]), (d = e[++s]);
      } else {
        if (!f) {
          f = {};
          for (let g = a; g <= i; g++) {
            const p = t[g];
            p && r.mirror.hasNode(p) && (f[r.mirror.getId(p)] = g);
          }
        }
        m = f[o.getId(d)];
        const y = t[m];
        if (m !== void 0 && y && Oe(y, d, r.mirror, o)) {
          try {
            n.insertBefore(y, c);
          } catch (g) {
            console.warn(g);
          }
          ue(y, d, r, o), (t[m] = void 0);
        } else {
          const g = nt(d, r.mirror, o);
          n.nodeName === "#document" &&
            c &&
            ((g.nodeType === g.DOCUMENT_TYPE_NODE &&
              c.nodeType === c.DOCUMENT_TYPE_NODE) ||
              (g.nodeType === g.ELEMENT_NODE &&
                c.nodeType === c.ELEMENT_NODE)) &&
            (n.removeChild(c), r.mirror.removeNodeFromMap(c), (c = t[++a]));
          try {
            n.insertBefore(g, c || null), ue(g, d, r, o);
          } catch (p) {
            console.warn(p);
          }
        }
        d = e[++s];
      }
    if (a > i) {
      const y = e[l + 1];
      let g = null;
      for (y && (g = r.mirror.getNode(o.getId(y))); s <= l; ++s) {
        const p = nt(e[s], r.mirror, o);
        try {
          n.insertBefore(p, g), ue(p, e[s], r, o);
        } catch (S) {
          console.warn(S);
        }
      }
    } else if (s > l)
      for (; a <= i; a++) {
        const y = t[a];
        if (!(!y || y.parentNode !== n))
          try {
            n.removeChild(y), r.mirror.removeNodeFromMap(y);
          } catch (g) {
            console.warn(g);
          }
      }
  }
  function nt(t, e, n) {
    const r = n.getId(t),
      o = n.getMeta(t);
    let a = null;
    if ((r > -1 && (a = e.getNode(r)), a !== null && kt(a, t))) return a;
    switch (t.RRNodeType) {
      case x.Document:
        a = new Document();
        break;
      case x.DocumentType:
        a = document.implementation.createDocumentType(
          t.name,
          t.publicId,
          t.systemId
        );
        break;
      case x.Element: {
        let i = t.tagName.toLowerCase();
        (i = Qo[i] || i),
          o && "isSVG" in o && o?.isSVG
            ? (a = document.createElementNS(Dt.svg, i))
            : (a = document.createElement(t.tagName));
        break;
      }
      case x.Text:
        a = document.createTextNode(t.data);
        break;
      case x.Comment:
        a = document.createComment(t.data);
        break;
      case x.CDATA:
        a = document.createCDATASection(t.data);
        break;
    }
    o && e.add(a, Object.assign({}, o));
    try {
      ce?.add(a);
    } catch {}
    return a;
  }
  function kt(t, e) {
    return t.nodeType !== e.nodeType
      ? !1
      : t.nodeType !== t.ELEMENT_NODE || t.tagName.toUpperCase() === e.tagName;
  }
  function Oe(t, e, n, r) {
    const o = n.getId(t),
      a = r.getId(e);
    return o === -1 || o !== a ? !1 : kt(t, e);
  }
  class xe extends Zo(ie) {
    constructor(e) {
      super(),
        (this.UNSERIALIZED_STARTING_ID = -2),
        (this._unserializedId = this.UNSERIALIZED_STARTING_ID),
        (this.mirror = hs()),
        (this.scrollData = null),
        e && (this.mirror = e);
    }
    get unserializedId() {
      return this._unserializedId--;
    }
    createDocument(e, n, r) {
      return new xe();
    }
    createDocumentType(e, n, r) {
      const o = new ns(e, n, r);
      return (o.ownerDocument = this), o;
    }
    createElement(e) {
      const n = e.toUpperCase();
      let r;
      switch (n) {
        case "AUDIO":
        case "VIDEO":
          r = new rs(n);
          break;
        case "IFRAME":
          r = new is(n, this.mirror);
          break;
        case "CANVAS":
          r = new os(n);
          break;
        case "STYLE":
          r = new ss(n);
          break;
        default:
          r = new Ge(n);
          break;
      }
      return (r.ownerDocument = this), r;
    }
    createComment(e) {
      const n = new ls(e);
      return (n.ownerDocument = this), n;
    }
    createCDATASection(e) {
      const n = new cs(e);
      return (n.ownerDocument = this), n;
    }
    createTextNode(e) {
      const n = new as(e);
      return (n.ownerDocument = this), n;
    }
    destroyTree() {
      (this.firstChild = null), (this.lastChild = null), this.mirror.reset();
    }
    open() {
      super.open(), (this._unserializedId = this.UNSERIALIZED_STARTING_ID);
    }
  }
  const ns = xn(ie);
  class Ge extends Ln(ie) {
    constructor() {
      super(...arguments), (this.inputData = null), (this.scrollData = null);
    }
  }
  class rs extends Ko(Ge) {}
  class os extends Ge {
    constructor() {
      super(...arguments),
        (this.rr_dataURL = null),
        (this.canvasMutations = []);
    }
    getContext() {
      return null;
    }
  }
  class ss extends Ge {
    constructor() {
      super(...arguments), (this.rules = []);
    }
  }
  class is extends Ge {
    constructor(e, n) {
      super(e),
        (this.contentDocument = new xe()),
        (this.contentDocument.mirror = n);
    }
  }
  const as = An(ie),
    ls = _n(ie),
    cs = Fn(ie);
  function us(t) {
    return t instanceof HTMLFormElement ? "FORM" : t.tagName.toUpperCase();
  }
  function Un(t, e, n, r) {
    let o;
    switch (t.nodeType) {
      case B.DOCUMENT_NODE:
        r && r.nodeName === "IFRAME"
          ? (o = r.contentDocument)
          : ((o = e), (o.compatMode = t.compatMode));
        break;
      case B.DOCUMENT_TYPE_NODE: {
        const i = t;
        o = e.createDocumentType(i.name, i.publicId, i.systemId);
        break;
      }
      case B.ELEMENT_NODE: {
        const i = t,
          s = us(i);
        o = e.createElement(s);
        const l = o;
        for (const { name: c, value: u } of Array.from(i.attributes))
          l.attributes[c] = u;
        i.scrollLeft && (l.scrollLeft = i.scrollLeft),
          i.scrollTop && (l.scrollTop = i.scrollTop);
        break;
      }
      case B.TEXT_NODE:
        o = e.createTextNode(t.textContent || "");
        break;
      case B.CDATA_SECTION_NODE:
        o = e.createCDATASection(t.data);
        break;
      case B.COMMENT_NODE:
        o = e.createComment(t.textContent || "");
        break;
      case B.DOCUMENT_FRAGMENT_NODE:
        o = r.attachShadow({ mode: "open" });
        break;
      default:
        return null;
    }
    let a = n.getMeta(t);
    return (
      e instanceof xe &&
        (a || ((a = Vn(o, e.unserializedId)), n.add(t, a)),
        e.mirror.add(o, Object.assign({}, a))),
      o
    );
  }
  function ds(t, e = jo(), n = new xe()) {
    function r(o, a) {
      const i = Un(o, n, e, a);
      if (i !== null)
        if (
          (a?.nodeName !== "IFRAME" &&
            o.nodeType !== B.DOCUMENT_FRAGMENT_NODE &&
            (a?.appendChild(i), (i.parentNode = a), (i.parentElement = a)),
          o.nodeName === "IFRAME")
        ) {
          const s = o.contentDocument;
          s && r(s, i);
        } else
          (o.nodeType === B.DOCUMENT_NODE ||
            o.nodeType === B.ELEMENT_NODE ||
            o.nodeType === B.DOCUMENT_FRAGMENT_NODE) &&
            (o.nodeType === B.ELEMENT_NODE &&
              o.shadowRoot &&
              r(o.shadowRoot, i),
            o.childNodes.forEach((s) => r(s, i)));
    }
    return r(t, null), n;
  }
  function hs() {
    return new ps();
  }
  class ps {
    constructor() {
      (this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap());
    }
    getId(e) {
      var n;
      if (!e) return -1;
      const r = (n = this.getMeta(e)) === null || n === void 0 ? void 0 : n.id;
      return r ?? -1;
    }
    getNode(e) {
      return this.idNodeMap.get(e) || null;
    }
    getIds() {
      return Array.from(this.idNodeMap.keys());
    }
    getMeta(e) {
      return this.nodeMetaMap.get(e) || null;
    }
    removeNodeFromMap(e) {
      const n = this.getId(e);
      this.idNodeMap.delete(n),
        e.childNodes && e.childNodes.forEach((r) => this.removeNodeFromMap(r));
    }
    has(e) {
      return this.idNodeMap.has(e);
    }
    hasNode(e) {
      return this.nodeMetaMap.has(e);
    }
    add(e, n) {
      const r = n.id;
      this.idNodeMap.set(r, e), this.nodeMetaMap.set(e, n);
    }
    replace(e, n) {
      const r = this.getNode(e);
      if (r) {
        const o = this.nodeMetaMap.get(r);
        o && this.nodeMetaMap.set(n, o);
      }
      this.idNodeMap.set(e, n);
    }
    reset() {
      (this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap());
    }
  }
  function Vn(t, e) {
    switch (t.RRNodeType) {
      case x.Document:
        return { id: e, type: t.RRNodeType, childNodes: [] };
      case x.DocumentType: {
        const n = t;
        return {
          id: e,
          type: t.RRNodeType,
          name: n.name,
          publicId: n.publicId,
          systemId: n.systemId,
        };
      }
      case x.Element:
        return {
          id: e,
          type: t.RRNodeType,
          tagName: t.tagName.toLowerCase(),
          attributes: {},
          childNodes: [],
        };
      case x.Text:
        return { id: e, type: t.RRNodeType, textContent: t.textContent || "" };
      case x.Comment:
        return { id: e, type: t.RRNodeType, textContent: t.textContent || "" };
      case x.CDATA:
        return { id: e, type: t.RRNodeType, textContent: "" };
    }
  }
  function Bn(t) {
    return {
      all: (t = t || new Map()),
      on: function (e, n) {
        var r = t.get(e);
        r ? r.push(n) : t.set(e, [n]);
      },
      off: function (e, n) {
        var r = t.get(e);
        r && (n ? r.splice(r.indexOf(n) >>> 0, 1) : t.set(e, []));
      },
      emit: function (e, n) {
        var r = t.get(e);
        r &&
          r.slice().map(function (o) {
            o(n);
          }),
          (r = t.get("*")) &&
            r.slice().map(function (o) {
              o(e, n);
            });
      },
    };
  }
  var ms = Object.freeze({ __proto__: null, default: Bn });
  function fs(t = window, e = document) {
    if (
      "scrollBehavior" in e.documentElement.style &&
      t.__forceSmoothScrollPolyfill__ !== !0
    )
      return;
    const n = t.HTMLElement || t.Element,
      r = 468,
      o = {
        scroll: t.scroll || t.scrollTo,
        scrollBy: t.scrollBy,
        elementScroll: n.prototype.scroll || l,
        scrollIntoView: n.prototype.scrollIntoView,
      },
      a =
        t.performance && t.performance.now
          ? t.performance.now.bind(t.performance)
          : Date.now;
    function i(p) {
      const S = ["MSIE ", "Trident/", "Edge/"];
      return new RegExp(S.join("|")).test(p);
    }
    const s = i(t.navigator.userAgent) ? 1 : 0;
    function l(p, S) {
      (this.scrollLeft = p), (this.scrollTop = S);
    }
    function c(p) {
      return 0.5 * (1 - Math.cos(Math.PI * p));
    }
    function u(p) {
      if (
        p === null ||
        typeof p != "object" ||
        p.behavior === void 0 ||
        p.behavior === "auto" ||
        p.behavior === "instant"
      )
        return !0;
      if (typeof p == "object" && p.behavior === "smooth") return !1;
      throw new TypeError(
        "behavior member of ScrollOptions " +
          p.behavior +
          " is not a valid value for enumeration ScrollBehavior."
      );
    }
    function d(p, S) {
      if (S === "Y") return p.clientHeight + s < p.scrollHeight;
      if (S === "X") return p.clientWidth + s < p.scrollWidth;
    }
    function h(p, S) {
      const v = t.getComputedStyle(p, null)["overflow" + S];
      return v === "auto" || v === "scroll";
    }
    function f(p) {
      const S = d(p, "Y") && h(p, "Y"),
        v = d(p, "X") && h(p, "X");
      return S || v;
    }
    function m(p) {
      for (; p !== e.body && f(p) === !1; ) p = p.parentNode || p.host;
      return p;
    }
    function y(p) {
      const S = a();
      let v,
        E,
        D,
        R = (S - p.startTime) / r;
      (R = R > 1 ? 1 : R),
        (v = c(R)),
        (E = p.startX + (p.x - p.startX) * v),
        (D = p.startY + (p.y - p.startY) * v),
        p.method.call(p.scrollable, E, D),
        (E !== p.x || D !== p.y) && t.requestAnimationFrame(y.bind(t, p));
    }
    function g(p, S, v) {
      let E, D, R, W;
      const A = a();
      p === e.body
        ? ((E = t),
          (D = t.scrollX || t.pageXOffset),
          (R = t.scrollY || t.pageYOffset),
          (W = o.scroll))
        : ((E = p), (D = p.scrollLeft), (R = p.scrollTop), (W = l)),
        y({
          scrollable: E,
          method: W,
          startTime: A,
          startX: D,
          startY: R,
          x: S,
          y: v,
        });
    }
    (t.scroll = t.scrollTo =
      function () {
        if (arguments[0] !== void 0) {
          if (u(arguments[0]) === !0) {
            o.scroll.call(
              t,
              arguments[0].left !== void 0
                ? arguments[0].left
                : typeof arguments[0] != "object"
                ? arguments[0]
                : t.scrollX || t.pageXOffset,
              arguments[0].top !== void 0
                ? arguments[0].top
                : arguments[1] !== void 0
                ? arguments[1]
                : t.scrollY || t.pageYOffset
            );
            return;
          }
          g.call(
            t,
            e.body,
            arguments[0].left !== void 0
              ? ~~arguments[0].left
              : t.scrollX || t.pageXOffset,
            arguments[0].top !== void 0
              ? ~~arguments[0].top
              : t.scrollY || t.pageYOffset
          );
        }
      }),
      (t.scrollBy = function () {
        if (arguments[0] !== void 0) {
          if (u(arguments[0])) {
            o.scrollBy.call(
              t,
              arguments[0].left !== void 0
                ? arguments[0].left
                : typeof arguments[0] != "object"
                ? arguments[0]
                : 0,
              arguments[0].top !== void 0
                ? arguments[0].top
                : arguments[1] !== void 0
                ? arguments[1]
                : 0
            );
            return;
          }
          g.call(
            t,
            e.body,
            ~~arguments[0].left + (t.scrollX || t.pageXOffset),
            ~~arguments[0].top + (t.scrollY || t.pageYOffset)
          );
        }
      }),
      (n.prototype.scroll = n.prototype.scrollTo =
        function () {
          if (arguments[0] === void 0) return;
          if (u(arguments[0]) === !0) {
            if (typeof arguments[0] == "number" && arguments[1] === void 0)
              throw new SyntaxError("Value could not be converted");
            o.elementScroll.call(
              this,
              arguments[0].left !== void 0
                ? ~~arguments[0].left
                : typeof arguments[0] != "object"
                ? ~~arguments[0]
                : this.scrollLeft,
              arguments[0].top !== void 0
                ? ~~arguments[0].top
                : arguments[1] !== void 0
                ? ~~arguments[1]
                : this.scrollTop
            );
            return;
          }
          const p = arguments[0].left,
            S = arguments[0].top;
          g.call(
            this,
            this,
            typeof p > "u" ? this.scrollLeft : ~~p,
            typeof S > "u" ? this.scrollTop : ~~S
          );
        }),
      (n.prototype.scrollBy = function () {
        if (arguments[0] !== void 0) {
          if (u(arguments[0]) === !0) {
            o.elementScroll.call(
              this,
              arguments[0].left !== void 0
                ? ~~arguments[0].left + this.scrollLeft
                : ~~arguments[0] + this.scrollLeft,
              arguments[0].top !== void 0
                ? ~~arguments[0].top + this.scrollTop
                : ~~arguments[1] + this.scrollTop
            );
            return;
          }
          this.scroll({
            left: ~~arguments[0].left + this.scrollLeft,
            top: ~~arguments[0].top + this.scrollTop,
            behavior: arguments[0].behavior,
          });
        }
      }),
      (n.prototype.scrollIntoView = function () {
        if (u(arguments[0]) === !0) {
          o.scrollIntoView.call(
            this,
            arguments[0] === void 0 ? !0 : arguments[0]
          );
          return;
        }
        const p = m(this),
          S = p.getBoundingClientRect(),
          v = this.getBoundingClientRect();
        p !== e.body
          ? (g.call(
              this,
              p,
              p.scrollLeft + v.left - S.left,
              p.scrollTop + v.top - S.top
            ),
            t.getComputedStyle(p).position !== "fixed" &&
              t.scrollBy({ left: S.left, top: S.top, behavior: "smooth" }))
          : t.scrollBy({ left: v.left, top: v.top, behavior: "smooth" });
      });
  }
  class ys {
    constructor(e = [], n) {
      (this.timeOffset = 0),
        (this.raf = null),
        (this.actions = e),
        (this.speed = n.speed);
    }
    addAction(e) {
      const n = this.raf === !0;
      if (
        !this.actions.length ||
        this.actions[this.actions.length - 1].delay <= e.delay
      )
        this.actions.push(e);
      else {
        const r = this.findActionIndex(e);
        this.actions.splice(r, 0, e);
      }
      n && (this.raf = requestAnimationFrame(this.rafCheck.bind(this)));
    }
    start() {
      (this.timeOffset = 0),
        (this.lastTimestamp = performance.now()),
        (this.raf = requestAnimationFrame(this.rafCheck.bind(this)));
    }
    rafCheck() {
      const e = performance.now();
      for (
        this.timeOffset += (e - this.lastTimestamp) * this.speed,
          this.lastTimestamp = e;
        this.actions.length;

      ) {
        const n = this.actions[0];
        if (this.timeOffset >= n.delay) this.actions.shift(), n.doAction();
        else break;
      }
      this.actions.length > 0
        ? (this.raf = requestAnimationFrame(this.rafCheck.bind(this)))
        : (this.raf = !0);
    }
    clear() {
      this.raf &&
        (this.raf !== !0 && cancelAnimationFrame(this.raf), (this.raf = null)),
        (this.actions.length = 0);
    }
    setSpeed(e) {
      this.speed = e;
    }
    isActive() {
      return this.raf !== null;
    }
    findActionIndex(e) {
      let n = 0,
        r = this.actions.length - 1;
      for (; n <= r; ) {
        const o = Math.floor((n + r) / 2);
        if (this.actions[o].delay < e.delay) n = o + 1;
        else if (this.actions[o].delay > e.delay) r = o - 1;
        else return o + 1;
      }
      return n;
    }
  }
  function jn(t, e) {
    if (
      t.type === N.IncrementalSnapshot &&
      t.data.source === C.MouseMove &&
      t.data.positions &&
      t.data.positions.length
    ) {
      const n = t.data.positions[0].timeOffset,
        r = t.timestamp + n;
      return (t.delay = r - e), r - e;
    }
    return (t.delay = t.timestamp - e), t.delay;
  }
  /*! *****************************************************************************
      Copyright (c) Microsoft Corporation.
  
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.
  
      THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      PERFORMANCE OF THIS SOFTWARE.
      ***************************************************************************** */ function Gn(
    t,
    e
  ) {
    var n = typeof Symbol == "function" && t[Symbol.iterator];
    if (!n) return t;
    var r,
      o,
      a = n.call(t),
      i = [];
    try {
      for (; (e === void 0 || e-- > 0) && !(r = a.next()).done; )
        i.push(r.value);
    } catch (s) {
      o = { error: s };
    } finally {
      try {
        r && !r.done && (n = a.return) && n.call(a);
      } finally {
        if (o) throw o.error;
      }
    }
    return i;
  }
  var Le;
  (function (t) {
    (t[(t.NotStarted = 0)] = "NotStarted"),
      (t[(t.Running = 1)] = "Running"),
      (t[(t.Stopped = 2)] = "Stopped");
  })(Le || (Le = {}));
  var zn = { type: "xstate.init" };
  function Rt(t) {
    return t === void 0 ? [] : [].concat(t);
  }
  function Ae(t) {
    return { type: "xstate.assign", assignment: t };
  }
  function Hn(t, e) {
    return typeof (t = typeof t == "string" && e && e[t] ? e[t] : t) == "string"
      ? { type: t }
      : typeof t == "function"
      ? { type: t.name, exec: t }
      : t;
  }
  function rt(t) {
    return function (e) {
      return t === e;
    };
  }
  function Yn(t) {
    return typeof t == "string" ? { type: t } : t;
  }
  function Xn(t, e) {
    return { value: t, context: e, actions: [], changed: !1, matches: rt(t) };
  }
  function Zn(t, e, n) {
    var r = e,
      o = !1;
    return [
      t.filter(function (a) {
        if (a.type === "xstate.assign") {
          o = !0;
          var i = Object.assign({}, r);
          return (
            typeof a.assignment == "function"
              ? (i = a.assignment(r, n))
              : Object.keys(a.assignment).forEach(function (s) {
                  i[s] =
                    typeof a.assignment[s] == "function"
                      ? a.assignment[s](r, n)
                      : a.assignment[s];
                }),
            (r = i),
            !1
          );
        }
        return !0;
      }),
      r,
      o,
    ];
  }
  function Kn(t, e) {
    e === void 0 && (e = {});
    var n = Gn(
        Zn(
          Rt(t.states[t.initial].entry).map(function (i) {
            return Hn(i, e.actions);
          }),
          t.context,
          zn
        ),
        2
      ),
      r = n[0],
      o = n[1],
      a = {
        config: t,
        _options: e,
        initialState: {
          value: t.initial,
          actions: r,
          context: o,
          matches: rt(t.initial),
        },
        transition: function (i, s) {
          var l,
            c,
            u = typeof i == "string" ? { value: i, context: t.context } : i,
            d = u.value,
            h = u.context,
            f = Yn(s),
            m = t.states[d];
          if (m.on) {
            var y = Rt(m.on[f.type]);
            try {
              for (
                var g = (function (_) {
                    var q = typeof Symbol == "function" && Symbol.iterator,
                      w = q && _[q],
                      b = 0;
                    if (w) return w.call(_);
                    if (_ && typeof _.length == "number")
                      return {
                        next: function () {
                          return (
                            _ && b >= _.length && (_ = void 0),
                            { value: _ && _[b++], done: !_ }
                          );
                        },
                      };
                    throw new TypeError(
                      q
                        ? "Object is not iterable."
                        : "Symbol.iterator is not defined."
                    );
                  })(y),
                  p = g.next();
                !p.done;
                p = g.next()
              ) {
                var S = p.value;
                if (S === void 0) return Xn(d, h);
                var v = typeof S == "string" ? { target: S } : S,
                  E = v.target,
                  D = v.actions,
                  R = D === void 0 ? [] : D,
                  W = v.cond,
                  A =
                    W === void 0
                      ? function () {
                          return !0;
                        }
                      : W,
                  te = E === void 0,
                  X = E ?? d,
                  Z = t.states[X];
                if (A(h, f)) {
                  var ne = Gn(
                      Zn(
                        (te
                          ? Rt(R)
                          : [].concat(m.exit, R, Z.entry).filter(function (_) {
                              return _;
                            })
                        ).map(function (_) {
                          return Hn(_, a._options.actions);
                        }),
                        h,
                        f
                      ),
                      3
                    ),
                    K = ne[0],
                    oe = ne[1],
                    F = ne[2],
                    H = E ?? d;
                  return {
                    value: H,
                    context: oe,
                    actions: K,
                    changed: E !== d || K.length > 0 || F,
                    matches: rt(H),
                  };
                }
              }
            } catch (_) {
              l = { error: _ };
            } finally {
              try {
                p && !p.done && (c = g.return) && c.call(g);
              } finally {
                if (l) throw l.error;
              }
            }
          }
          return Xn(d, h);
        },
      };
    return a;
  }
  var Jn = function (t, e) {
    return t.actions.forEach(function (n) {
      var r = n.exec;
      return r && r(t.context, e);
    });
  };
  function Qn(t) {
    var e = t.initialState,
      n = Le.NotStarted,
      r = new Set(),
      o = {
        _machine: t,
        send: function (a) {
          n === Le.Running &&
            ((e = t.transition(e, a)),
            Jn(e, Yn(a)),
            r.forEach(function (i) {
              return i(e);
            }));
        },
        subscribe: function (a) {
          return (
            r.add(a),
            a(e),
            {
              unsubscribe: function () {
                return r.delete(a);
              },
            }
          );
        },
        start: function (a) {
          if (a) {
            var i =
              typeof a == "object"
                ? a
                : { context: t.config.context, value: a };
            e = {
              value: i.value,
              actions: [],
              context: i.context,
              matches: rt(i.value),
            };
          }
          return (n = Le.Running), Jn(e, zn), o;
        },
        stop: function () {
          return (n = Le.Stopped), r.clear(), o;
        },
        get state() {
          return e;
        },
        get status() {
          return n;
        },
      };
    return o;
  }
  var gs = Object.defineProperty,
    vs = Object.defineProperties,
    Ss = Object.getOwnPropertyDescriptors,
    qn = Object.getOwnPropertySymbols,
    bs = Object.prototype.hasOwnProperty,
    ws = Object.prototype.propertyIsEnumerable,
    er = (t, e, n) =>
      e in t
        ? gs(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n })
        : (t[e] = n),
    Ot = (t, e) => {
      for (var n in e || (e = {})) bs.call(e, n) && er(t, n, e[n]);
      if (qn) for (var n of qn(e)) ws.call(e, n) && er(t, n, e[n]);
      return t;
    },
    xt = (t, e) => vs(t, Ss(e));
  function Cs(t, e) {
    for (let n = t.length - 1; n >= 0; n--) {
      const r = t[n];
      if (r.type === N.Meta && r.timestamp <= e) return t.slice(n);
    }
    return t;
  }
  function Es(t, { getCastFn: e, applyEventsSynchronously: n, emitter: r }) {
    const o = Kn(
      {
        id: "player",
        context: t,
        initial: "paused",
        states: {
          playing: {
            on: {
              PAUSE: { target: "paused", actions: ["pause"] },
              CAST_EVENT: { target: "playing", actions: "castEvent" },
              END: {
                target: "paused",
                actions: ["resetLastPlayedEvent", "pause"],
              },
              ADD_EVENT: { target: "playing", actions: ["addEvent"] },
            },
          },
          paused: {
            on: {
              PLAY: {
                target: "playing",
                actions: ["recordTimeOffset", "play"],
              },
              CAST_EVENT: { target: "paused", actions: "castEvent" },
              TO_LIVE: { target: "live", actions: ["startLive"] },
              ADD_EVENT: { target: "paused", actions: ["addEvent"] },
            },
          },
          live: {
            on: {
              ADD_EVENT: { target: "live", actions: ["addEvent"] },
              CAST_EVENT: { target: "live", actions: ["castEvent"] },
            },
          },
        },
      },
      {
        actions: {
          castEvent: Ae({
            lastPlayedEvent: (a, i) =>
              i.type === "CAST_EVENT" ? i.payload.event : a.lastPlayedEvent,
          }),
          recordTimeOffset: Ae((a, i) => {
            let s = a.timeOffset;
            return (
              "payload" in i &&
                "timeOffset" in i.payload &&
                (s = i.payload.timeOffset),
              xt(Ot({}, a), {
                timeOffset: s,
                baselineTime: a.events[0].timestamp + s,
              })
            );
          }),
          play(a) {
            var i;
            const {
              timer: s,
              events: l,
              baselineTime: c,
              lastPlayedEvent: u,
            } = a;
            s.clear();
            for (const m of l) jn(m, c);
            const d = Cs(l, c);
            let h = u?.timestamp;
            u?.type === N.IncrementalSnapshot &&
              u.data.source === C.MouseMove &&
              (h =
                u.timestamp +
                ((i = u.data.positions[0]) == null ? void 0 : i.timeOffset)),
              c < (h || 0) && r.emit(L.PlayBack);
            const f = new Array();
            for (const m of d)
              if (!(h && h < c && (m.timestamp <= h || m === u)))
                if (m.timestamp < c) f.push(m);
                else {
                  const y = e(m, !1);
                  s.addAction({
                    doAction: () => {
                      y();
                    },
                    delay: m.delay,
                  });
                }
            n(f), r.emit(L.Flush), s.start();
          },
          pause(a) {
            a.timer.clear();
          },
          resetLastPlayedEvent: Ae((a) =>
            xt(Ot({}, a), { lastPlayedEvent: null })
          ),
          startLive: Ae({
            baselineTime: (a, i) => (
              a.timer.start(),
              i.type === "TO_LIVE" && i.payload.baselineTime
                ? i.payload.baselineTime
                : Date.now()
            ),
          }),
          addEvent: Ae((a, i) => {
            const { baselineTime: s, timer: l, events: c } = a;
            if (i.type === "ADD_EVENT") {
              const { event: u } = i.payload;
              jn(u, s);
              let d = c.length - 1;
              if (!c[d] || c[d].timestamp <= u.timestamp) c.push(u);
              else {
                let m = -1,
                  y = 0;
                for (; y <= d; ) {
                  const g = Math.floor((y + d) / 2);
                  c[g].timestamp <= u.timestamp ? (y = g + 1) : (d = g - 1);
                }
                m === -1 && (m = y), c.splice(m, 0, u);
              }
              const h = u.timestamp < s,
                f = e(u, h);
              h
                ? f()
                : l.isActive() &&
                  l.addAction({
                    doAction: () => {
                      f();
                    },
                    delay: u.delay,
                  });
            }
            return xt(Ot({}, a), { events: c });
          }),
        },
      }
    );
    return Qn(o);
  }
  function Ns(t) {
    const e = Kn(
      {
        id: "speed",
        context: t,
        initial: "normal",
        states: {
          normal: {
            on: {
              FAST_FORWARD: {
                target: "skipping",
                actions: ["recordSpeed", "setSpeed"],
              },
              SET_SPEED: { target: "normal", actions: ["setSpeed"] },
            },
          },
          skipping: {
            on: {
              BACK_TO_NORMAL: { target: "normal", actions: ["restoreSpeed"] },
              SET_SPEED: { target: "normal", actions: ["setSpeed"] },
            },
          },
        },
      },
      {
        actions: {
          setSpeed: (n, r) => {
            "payload" in r && n.timer.setSpeed(r.payload.speed);
          },
          recordSpeed: Ae({ normalSpeed: (n) => n.timer.speed }),
          restoreSpeed: (n) => {
            n.timer.setSpeed(n.normalSpeed);
          },
        },
      }
    );
    return Qn(e);
  }
  const Ts = (t) => [
    `.${t} { background: currentColor }`,
    "noscript { display: none !important; }",
  ];
  var Is = (t, e, n) =>
    new Promise((r, o) => {
      var a = (l) => {
          try {
            s(n.next(l));
          } catch (c) {
            o(c);
          }
        },
        i = (l) => {
          try {
            s(n.throw(l));
          } catch (c) {
            o(c);
          }
        },
        s = (l) => (l.done ? r(l.value) : Promise.resolve(l.value).then(a, i));
      s((n = n.apply(t, e)).next());
    });
  const tr = new Map();
  function nr(t, e) {
    let n = tr.get(t);
    return (
      n || ((n = new Map()), tr.set(t, n)), n.has(e) || n.set(e, []), n.get(e)
    );
  }
  function Se(t, e, n) {
    return (r) =>
      Is(this, null, function* () {
        if (r && typeof r == "object" && "rr_type" in r)
          if (
            (n && (n.isUnchanged = !1),
            r.rr_type === "ImageBitmap" && "args" in r)
          ) {
            const o = yield Se(t, e, n)(r.args);
            return yield createImageBitmap.apply(null, o);
          } else if ("index" in r) {
            if (n || e === null) return r;
            const { rr_type: o, index: a } = r;
            return nr(e, o)[a];
          } else if ("args" in r) {
            const { rr_type: o, args: a } = r,
              i = window[o];
            return new i(...(yield Promise.all(a.map(Se(t, e, n)))));
          } else {
            if ("base64" in r) return wo(r.base64);
            if ("src" in r) {
              const o = t.get(r.src);
              if (o) return o;
              {
                const a = new Image();
                return (a.src = r.src), t.set(r.src, a), a;
              }
            } else if ("data" in r && r.rr_type === "Blob") {
              const o = yield Promise.all(r.data.map(Se(t, e, n)));
              return new Blob(o, { type: r.type });
            }
          }
        else if (Array.isArray(r)) return yield Promise.all(r.map(Se(t, e, n)));
        return r;
      });
  }
  var Ms = (t, e, n) =>
    new Promise((r, o) => {
      var a = (l) => {
          try {
            s(n.next(l));
          } catch (c) {
            o(c);
          }
        },
        i = (l) => {
          try {
            s(n.throw(l));
          } catch (c) {
            o(c);
          }
        },
        s = (l) => (l.done ? r(l.value) : Promise.resolve(l.value).then(a, i));
      s((n = n.apply(t, e)).next());
    });
  function Ds(t, e) {
    try {
      return e === pe.WebGL
        ? t.getContext("webgl") || t.getContext("experimental-webgl")
        : t.getContext("webgl2");
    } catch {
      return null;
    }
  }
  const ks = [
    "WebGLActiveInfo",
    "WebGLBuffer",
    "WebGLFramebuffer",
    "WebGLProgram",
    "WebGLRenderbuffer",
    "WebGLShader",
    "WebGLShaderPrecisionFormat",
    "WebGLTexture",
    "WebGLUniformLocation",
    "WebGLVertexArrayObject",
  ];
  function Rs(t, e) {
    if (!(e != null && e.constructor)) return;
    const { name: n } = e.constructor;
    if (!ks.includes(n)) return;
    const r = nr(t, n);
    r.includes(e) || r.push(e);
  }
  function Os(t) {
    return Ms(
      this,
      arguments,
      function* ({
        mutation: e,
        target: n,
        type: r,
        imageMap: o,
        errorHandler: a,
      }) {
        try {
          const i = Ds(n, r);
          if (!i) return;
          if (e.setter) {
            i[e.property] = e.args[0];
            return;
          }
          const s = i[e.property],
            l = yield Promise.all(e.args.map(Se(o, i))),
            c = s.apply(i, l);
          Rs(i, c);
        } catch (i) {
          a(e, i);
        }
      }
    );
  }
  var xs = (t, e, n) =>
    new Promise((r, o) => {
      var a = (l) => {
          try {
            s(n.next(l));
          } catch (c) {
            o(c);
          }
        },
        i = (l) => {
          try {
            s(n.throw(l));
          } catch (c) {
            o(c);
          }
        },
        s = (l) => (l.done ? r(l.value) : Promise.resolve(l.value).then(a, i));
      s((n = n.apply(t, e)).next());
    });
  function Ls(t) {
    return xs(
      this,
      arguments,
      function* ({
        event: e,
        mutation: n,
        target: r,
        imageMap: o,
        errorHandler: a,
      }) {
        try {
          const i = r.getContext("2d");
          if (n.setter) {
            i[n.property] = n.args[0];
            return;
          }
          const s = i[n.property];
          if (n.property === "drawImage" && typeof n.args[0] == "string")
            o.get(e), s.apply(i, n.args);
          else {
            const l = yield Promise.all(n.args.map(Se(o, i)));
            s.apply(i, l);
          }
        } catch (i) {
          a(n, i);
        }
      }
    );
  }
  var As = (t, e, n) =>
    new Promise((r, o) => {
      var a = (l) => {
          try {
            s(n.next(l));
          } catch (c) {
            o(c);
          }
        },
        i = (l) => {
          try {
            s(n.throw(l));
          } catch (c) {
            o(c);
          }
        },
        s = (l) => (l.done ? r(l.value) : Promise.resolve(l.value).then(a, i));
      s((n = n.apply(t, e)).next());
    });
  function rr(t) {
    return As(
      this,
      arguments,
      function* ({
        event: e,
        mutation: n,
        target: r,
        imageMap: o,
        canvasEventMap: a,
        errorHandler: i,
      }) {
        try {
          const s = a.get(e) || n,
            l = "commands" in s ? s.commands : [s];
          if ([pe.WebGL, pe.WebGL2].includes(n.type)) {
            for (let c = 0; c < l.length; c++) {
              const u = l[c];
              yield Os({
                mutation: u,
                type: n.type,
                target: r,
                imageMap: o,
                errorHandler: i,
              });
            }
            return;
          }
          for (let c = 0; c < l.length; c++) {
            const u = l[c];
            yield Ls({
              event: e,
              mutation: u,
              target: r,
              imageMap: o,
              errorHandler: i,
            });
          }
        } catch (s) {
          i(n, s);
        }
      }
    );
  }
  var _s = Object.defineProperty,
    Fs = Object.defineProperties,
    Ps = Object.getOwnPropertyDescriptors,
    or = Object.getOwnPropertySymbols,
    Ws = Object.prototype.hasOwnProperty,
    $s = Object.prototype.propertyIsEnumerable,
    sr = (t, e, n) =>
      e in t
        ? _s(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n })
        : (t[e] = n),
    ot = (t, e) => {
      for (var n in e || (e = {})) Ws.call(e, n) && sr(t, n, e[n]);
      if (or) for (var n of or(e)) $s.call(e, n) && sr(t, n, e[n]);
      return t;
    },
    Lt = (t, e) => Fs(t, Ps(e)),
    At = (t, e, n) =>
      new Promise((r, o) => {
        var a = (l) => {
            try {
              s(n.next(l));
            } catch (c) {
              o(c);
            }
          },
          i = (l) => {
            try {
              s(n.throw(l));
            } catch (c) {
              o(c);
            }
          },
          s = (l) =>
            l.done ? r(l.value) : Promise.resolve(l.value).then(a, i);
        s((n = n.apply(t, e)).next());
      });
  const Us = 10 * 1e3,
    Vs = 5 * 1e3,
    Bs = Bn || ms,
    ir = "[replayer]",
    _t = { duration: 500, lineCap: "round", lineWidth: 3, strokeStyle: "red" };
  function ar(t) {
    return (
      t.type == N.IncrementalSnapshot &&
      (t.data.source == C.TouchMove ||
        (t.data.source == C.MouseInteraction && t.data.type == V.TouchStart))
    );
  }
  class js {
    constructor(e, n) {
      if (
        ((this.usingVirtualDom = !1),
        (this.virtualDom = new xe()),
        (this.mouseTail = null),
        (this.tailPositions = []),
        (this.emitter = Bs()),
        (this.legacy_missingNodeRetryMap = {}),
        (this.cache = Kt()),
        (this.imageMap = new Map()),
        (this.canvasEventMap = new Map()),
        (this.mirror = $t()),
        (this.styleMirror = new wt()),
        (this.firstFullSnapshot = null),
        (this.newDocumentQueue = []),
        (this.mousePos = null),
        (this.touchActive = null),
        (this.lastMouseDownEvent = null),
        (this.lastSelectionData = null),
        (this.constructedStyleMutations = []),
        (this.adoptedStyleSheets = []),
        (this.handleResize = (s) => {
          this.iframe.style.display = "inherit";
          for (const l of [this.mouseTail, this.iframe])
            !l ||
              (l.setAttribute("width", String(s.width)),
              l.setAttribute("height", String(s.height)));
        }),
        (this.applyEventsSynchronously = (s) => {
          for (const l of s) {
            switch (l.type) {
              case N.DomContentLoaded:
              case N.Load:
              case N.Custom:
                continue;
              case N.FullSnapshot:
              case N.Meta:
              case N.Plugin:
              case N.IncrementalSnapshot:
                break;
            }
            this.getCastFn(l, !0)();
          }
        }),
        (this.getCastFn = (s, l = !1) => {
          let c;
          switch (s.type) {
            case N.DomContentLoaded:
            case N.Load:
              break;
            case N.Custom:
              c = () => {
                this.emitter.emit(L.CustomEvent, s);
              };
              break;
            case N.Meta:
              c = () =>
                this.emitter.emit(L.Resize, {
                  width: s.data.width,
                  height: s.data.height,
                });
              break;
            case N.FullSnapshot:
              c = () => {
                var u;
                if (this.firstFullSnapshot) {
                  if (this.firstFullSnapshot === s) {
                    this.firstFullSnapshot = !0;
                    return;
                  }
                } else this.firstFullSnapshot = !0;
                this.rebuildFullSnapshot(s, l),
                  (u = this.iframe.contentWindow) == null ||
                    u.scrollTo(s.data.initialOffset),
                  this.styleMirror.reset();
              };
              break;
            case N.IncrementalSnapshot:
              c = () => {
                if (
                  (this.applyIncremental(s, l),
                  !l &&
                    (s === this.nextUserInteractionEvent &&
                      ((this.nextUserInteractionEvent = null),
                      this.backToNormal()),
                    this.config.skipInactive && !this.nextUserInteractionEvent))
                ) {
                  for (const u of this.service.state.context.events)
                    if (
                      !(u.timestamp <= s.timestamp) &&
                      this.isUserInteraction(u)
                    ) {
                      u.delay - s.delay >
                        Us * this.speedService.state.context.timer.speed &&
                        (this.nextUserInteractionEvent = u);
                      break;
                    }
                  if (this.nextUserInteractionEvent) {
                    const u = this.nextUserInteractionEvent.delay - s.delay,
                      d = {
                        speed: Math.min(
                          Math.round(u / Vs),
                          this.config.maxSpeed
                        ),
                      };
                    this.speedService.send({
                      type: "FAST_FORWARD",
                      payload: d,
                    }),
                      this.emitter.emit(L.SkipStart, d);
                  }
                }
              };
              break;
          }
          return () => {
            c && c();
            for (const d of this.config.plugins || [])
              d.handler && d.handler(s, l, { replayer: this });
            this.service.send({ type: "CAST_EVENT", payload: { event: s } });
            const u = this.service.state.context.events.length - 1;
            if (
              !this.config.liveMode &&
              s === this.service.state.context.events[u]
            ) {
              const d = () => {
                u < this.service.state.context.events.length - 1 ||
                  (this.backToNormal(),
                  this.service.send("END"),
                  this.emitter.emit(L.Finish));
              };
              let h = 50;
              s.type === N.IncrementalSnapshot &&
                s.data.source === C.MouseMove &&
                s.data.positions.length &&
                (h += Math.max(0, -s.data.positions[0].timeOffset)),
                setTimeout(d, h);
            }
            this.emitter.emit(L.EventCast, s);
          };
        }),
        !(n != null && n.liveMode) && e.length < 2)
      )
        throw new Error("Replayer need at least 2 events.");
      const r = {
        speed: 1,
        maxSpeed: 360,
        root: document.body,
        loadTimeout: 0,
        skipInactive: !1,
        showWarning: !0,
        showDebug: !1,
        blockClass: "rr-block",
        liveMode: !1,
        insertStyleRules: [],
        triggerFocus: !0,
        UNSAFE_replayCanvas: !1,
        pauseAnimation: !0,
        mouseTail: _t,
        useVirtualDom: !0,
        logger: console,
      };
      (this.config = Object.assign({}, r, n)),
        (this.handleResize = this.handleResize.bind(this)),
        (this.getCastFn = this.getCastFn.bind(this)),
        (this.applyEventsSynchronously =
          this.applyEventsSynchronously.bind(this)),
        this.emitter.on(L.Resize, this.handleResize),
        this.setupDom();
      for (const s of this.config.plugins || [])
        s.getMirror && s.getMirror({ nodeMirror: this.mirror });
      this.emitter.on(L.Flush, () => {
        if (this.usingVirtualDom) {
          const s = {
            mirror: this.mirror,
            applyCanvas: (l, c, u) => {
              rr({
                event: l,
                mutation: c,
                target: u,
                imageMap: this.imageMap,
                canvasEventMap: this.canvasEventMap,
                errorHandler: this.warnCanvasMutationFailed.bind(this),
              });
            },
            applyInput: this.applyInput.bind(this),
            applyScroll: this.applyScroll.bind(this),
            applyStyleSheetMutation: (l, c) => {
              l.source === C.StyleSheetRule
                ? this.applyStyleSheetRule(l, c)
                : l.source === C.StyleDeclaration &&
                  this.applyStyleDeclaration(l, c);
            },
            afterAppend: (l, c) => {
              for (const u of this.config.plugins || [])
                u.onBuild && u.onBuild(l, { id: c, replayer: this });
            },
          };
          if (this.iframe.contentDocument)
            try {
              ue(
                this.iframe.contentDocument,
                this.virtualDom,
                s,
                this.virtualDom.mirror
              );
            } catch (l) {
              console.warn(l);
            }
          if (
            (this.virtualDom.destroyTree(),
            (this.usingVirtualDom = !1),
            Object.keys(this.legacy_missingNodeRetryMap).length)
          )
            for (const l in this.legacy_missingNodeRetryMap)
              try {
                const c = this.legacy_missingNodeRetryMap[l],
                  u = nt(c.node, this.mirror, this.virtualDom.mirror);
                ue(u, c.node, s, this.virtualDom.mirror), (c.node = u);
              } catch (c) {
                this.warn(c);
              }
          this.constructedStyleMutations.forEach((l) => {
            this.applyStyleSheetMutation(l);
          }),
            (this.constructedStyleMutations = []),
            this.adoptedStyleSheets.forEach((l) => {
              this.applyAdoptedStyleSheet(l);
            }),
            (this.adoptedStyleSheets = []);
        }
        if (
          (this.mousePos &&
            (this.moveAndHover(
              this.mousePos.x,
              this.mousePos.y,
              this.mousePos.id,
              !0,
              this.mousePos.debugData
            ),
            (this.mousePos = null)),
          this.touchActive === !0
            ? this.mouse.classList.add("touch-active")
            : this.touchActive === !1 &&
              this.mouse.classList.remove("touch-active"),
          (this.touchActive = null),
          this.lastMouseDownEvent)
        ) {
          const [s, l] = this.lastMouseDownEvent;
          s.dispatchEvent(l);
        }
        (this.lastMouseDownEvent = null),
          this.lastSelectionData &&
            (this.applySelection(this.lastSelectionData),
            (this.lastSelectionData = null));
      }),
        this.emitter.on(L.PlayBack, () => {
          (this.firstFullSnapshot = null),
            this.mirror.reset(),
            this.styleMirror.reset();
        });
      const o = new ys([], { speed: this.config.speed });
      (this.service = Es(
        {
          events: e
            .map((s) => (n && n.unpackFn ? n.unpackFn(s) : s))
            .sort((s, l) => s.timestamp - l.timestamp),
          timer: o,
          timeOffset: 0,
          baselineTime: 0,
          lastPlayedEvent: null,
        },
        {
          getCastFn: this.getCastFn,
          applyEventsSynchronously: this.applyEventsSynchronously,
          emitter: this.emitter,
        }
      )),
        this.service.start(),
        this.service.subscribe((s) => {
          this.emitter.emit(L.StateChange, { player: s });
        }),
        (this.speedService = Ns({ normalSpeed: -1, timer: o })),
        this.speedService.start(),
        this.speedService.subscribe((s) => {
          this.emitter.emit(L.StateChange, { speed: s });
        });
      const a = this.service.state.context.events.find(
          (s) => s.type === N.Meta
        ),
        i = this.service.state.context.events.find(
          (s) => s.type === N.FullSnapshot
        );
      if (a) {
        const { width: s, height: l } = a.data;
        setTimeout(() => {
          this.emitter.emit(L.Resize, { width: s, height: l });
        }, 0);
      }
      i &&
        setTimeout(() => {
          var s;
          this.firstFullSnapshot ||
            ((this.firstFullSnapshot = i),
            this.rebuildFullSnapshot(i),
            (s = this.iframe.contentWindow) == null ||
              s.scrollTo(i.data.initialOffset));
        }, 1),
        this.service.state.context.events.find(ar) &&
          this.mouse.classList.add("touch-device");
    }
    get timer() {
      return this.service.state.context.timer;
    }
    on(e, n) {
      return this.emitter.on(e, n), this;
    }
    off(e, n) {
      return this.emitter.off(e, n), this;
    }
    setConfig(e) {
      Object.keys(e).forEach((n) => {
        e[n], (this.config[n] = e[n]);
      }),
        this.config.skipInactive || this.backToNormal(),
        typeof e.speed < "u" &&
          this.speedService.send({
            type: "SET_SPEED",
            payload: { speed: e.speed },
          }),
        typeof e.mouseTail < "u" &&
          (e.mouseTail === !1
            ? this.mouseTail && (this.mouseTail.style.display = "none")
            : (this.mouseTail ||
                ((this.mouseTail = document.createElement("canvas")),
                (this.mouseTail.width = Number.parseFloat(this.iframe.width)),
                (this.mouseTail.height = Number.parseFloat(this.iframe.height)),
                this.mouseTail.classList.add("replayer-mouse-tail"),
                this.wrapper.insertBefore(this.mouseTail, this.iframe)),
              (this.mouseTail.style.display = "inherit")));
    }
    getMetaData() {
      const e = this.service.state.context.events[0],
        n =
          this.service.state.context.events[
            this.service.state.context.events.length - 1
          ];
      return {
        startTime: e.timestamp,
        endTime: n.timestamp,
        totalTime: n.timestamp - e.timestamp,
      };
    }
    getCurrentTime() {
      return this.timer.timeOffset + this.getTimeOffset();
    }
    getTimeOffset() {
      const { baselineTime: e, events: n } = this.service.state.context;
      return e - n[0].timestamp;
    }
    getMirror() {
      return this.mirror;
    }
    play(e = 0) {
      var n, r;
      this.service.state.matches("paused")
        ? this.service.send({ type: "PLAY", payload: { timeOffset: e } })
        : (this.service.send({ type: "PAUSE" }),
          this.service.send({ type: "PLAY", payload: { timeOffset: e } })),
        (r =
          (n = this.iframe.contentDocument) == null
            ? void 0
            : n.getElementsByTagName("html")[0]) == null ||
          r.classList.remove("rrweb-paused"),
        this.emitter.emit(L.Start);
    }
    pause(e) {
      var n, r;
      e === void 0 &&
        this.service.state.matches("playing") &&
        this.service.send({ type: "PAUSE" }),
        typeof e == "number" &&
          (this.play(e), this.service.send({ type: "PAUSE" })),
        (r =
          (n = this.iframe.contentDocument) == null
            ? void 0
            : n.getElementsByTagName("html")[0]) == null ||
          r.classList.add("rrweb-paused"),
        this.emitter.emit(L.Pause);
    }
    resume(e = 0) {
      this.warn(
        "The 'resume' was deprecated in 1.0. Please use 'play' method which has the same interface."
      ),
        this.play(e),
        this.emitter.emit(L.Resume);
    }
    destroy() {
      this.pause(),
        this.config.root.removeChild(this.wrapper),
        this.emitter.emit(L.Destroy);
    }
    startLive(e) {
      this.service.send({ type: "TO_LIVE", payload: { baselineTime: e } });
    }
    addEvent(e) {
      const n = this.config.unpackFn ? this.config.unpackFn(e) : e;
      ar(n) && this.mouse.classList.add("touch-device"),
        Promise.resolve().then(() =>
          this.service.send({ type: "ADD_EVENT", payload: { event: n } })
        );
    }
    enableInteract() {
      this.iframe.setAttribute("scrolling", "auto"),
        (this.iframe.style.pointerEvents = "auto");
    }
    disableInteract() {
      this.iframe.setAttribute("scrolling", "no"),
        (this.iframe.style.pointerEvents = "none");
    }
    resetCache() {
      this.cache = Kt();
    }
    setupDom() {
      (this.wrapper = document.createElement("div")),
        this.wrapper.classList.add("replayer-wrapper"),
        this.config.root.appendChild(this.wrapper),
        (this.mouse = document.createElement("div")),
        this.mouse.classList.add("replayer-mouse"),
        this.wrapper.appendChild(this.mouse),
        this.config.mouseTail !== !1 &&
          ((this.mouseTail = document.createElement("canvas")),
          this.mouseTail.classList.add("replayer-mouse-tail"),
          (this.mouseTail.style.display = "inherit"),
          this.wrapper.appendChild(this.mouseTail)),
        (this.iframe = document.createElement("iframe"));
      const e = ["allow-same-origin"];
      this.config.UNSAFE_replayCanvas && e.push("allow-scripts"),
        (this.iframe.style.display = "none"),
        this.iframe.setAttribute("sandbox", e.join(" ")),
        this.disableInteract(),
        this.wrapper.appendChild(this.iframe),
        this.iframe.contentWindow &&
          this.iframe.contentDocument &&
          (fs(this.iframe.contentWindow, this.iframe.contentDocument),
          yt(this.iframe.contentWindow));
    }
    rebuildFullSnapshot(e, n = !1) {
      if (!this.iframe.contentDocument)
        return this.warn("Looks like your replayer has been destroyed.");
      Object.keys(this.legacy_missingNodeRetryMap).length &&
        this.warn(
          "Found unresolved missing node map",
          this.legacy_missingNodeRetryMap
        ),
        (this.legacy_missingNodeRetryMap = {});
      const r = [],
        o = (s, l) => {
          this.collectIframeAndAttachDocument(r, s);
          for (const c of this.config.plugins || [])
            c.onBuild && c.onBuild(s, { id: l, replayer: this });
        };
      this.usingVirtualDom &&
        (this.virtualDom.destroyTree(), (this.usingVirtualDom = !1)),
        this.mirror.reset(),
        Br(e.data.node, {
          doc: this.iframe.contentDocument,
          afterAppend: o,
          cache: this.cache,
          mirror: this.mirror,
        }),
        o(this.iframe.contentDocument, e.data.node.id);
      for (const { mutationInQueue: s, builtNode: l } of r)
        this.attachDocumentToIframe(s, l),
          (this.newDocumentQueue = this.newDocumentQueue.filter(
            (c) => c !== s
          ));
      const { documentElement: a, head: i } = this.iframe.contentDocument;
      this.insertStyleRules(a, i),
        this.service.state.matches("playing") ||
          this.iframe.contentDocument
            .getElementsByTagName("html")[0]
            .classList.add("rrweb-paused"),
        this.emitter.emit(L.FullsnapshotRebuilded, e),
        n || this.waitForStylesheetLoad(),
        this.config.UNSAFE_replayCanvas && this.preloadAllImages();
    }
    insertStyleRules(e, n) {
      var r;
      const o = Ts(this.config.blockClass).concat(this.config.insertStyleRules);
      if (
        (this.config.pauseAnimation &&
          o.push(
            "html.rrweb-paused *, html.rrweb-paused *:before, html.rrweb-paused *:after { animation-play-state: paused !important; }"
          ),
        this.usingVirtualDom)
      ) {
        const a = this.virtualDom.createElement("style");
        this.virtualDom.mirror.add(a, Vn(a, this.virtualDom.unserializedId)),
          e.insertBefore(a, n),
          a.rules.push({
            source: C.StyleSheetRule,
            adds: o.map((i, s) => ({ rule: i, index: s })),
          });
      } else {
        const a = document.createElement("style");
        e.insertBefore(a, n);
        for (let i = 0; i < o.length; i++)
          (r = a.sheet) == null || r.insertRule(o[i], i);
      }
    }
    attachDocumentToIframe(e, n) {
      const r = this.usingVirtualDom ? this.virtualDom.mirror : this.mirror,
        o = [],
        a = (i, s) => {
          this.collectIframeAndAttachDocument(o, i);
          const l = r.getMeta(i);
          if (l?.type === I.Element && l?.tagName.toUpperCase() === "HTML") {
            const { documentElement: c, head: u } = n.contentDocument;
            this.insertStyleRules(c, u);
          }
          if (!this.usingVirtualDom)
            for (const c of this.config.plugins || [])
              c.onBuild && c.onBuild(i, { id: s, replayer: this });
        };
      $e(e.node, {
        doc: n.contentDocument,
        mirror: r,
        hackCss: !0,
        skipChild: !1,
        afterAppend: a,
        cache: this.cache,
      }),
        a(n.contentDocument, e.node.id);
      for (const { mutationInQueue: i, builtNode: s } of o)
        this.attachDocumentToIframe(i, s),
          (this.newDocumentQueue = this.newDocumentQueue.filter(
            (l) => l !== i
          ));
    }
    collectIframeAndAttachDocument(e, n) {
      if (De(n, this.mirror)) {
        const r = this.newDocumentQueue.find(
          (o) => o.parentId === this.mirror.getId(n)
        );
        r && e.push({ mutationInQueue: r, builtNode: n });
      }
    }
    waitForStylesheetLoad() {
      var e;
      const n = (e = this.iframe.contentDocument) == null ? void 0 : e.head;
      if (n) {
        const r = new Set();
        let o,
          a = this.service.state;
        const i = () => {
          a = this.service.state;
        };
        this.emitter.on(L.Start, i), this.emitter.on(L.Pause, i);
        const s = () => {
          this.emitter.off(L.Start, i), this.emitter.off(L.Pause, i);
        };
        n.querySelectorAll('link[rel="stylesheet"]').forEach((l) => {
          l.sheet ||
            (r.add(l),
            l.addEventListener("load", () => {
              r.delete(l),
                r.size === 0 &&
                  o !== -1 &&
                  (a.matches("playing") && this.play(this.getCurrentTime()),
                  this.emitter.emit(L.LoadStylesheetEnd),
                  o && clearTimeout(o),
                  s());
            }));
        }),
          r.size > 0 &&
            (this.service.send({ type: "PAUSE" }),
            this.emitter.emit(L.LoadStylesheetStart),
            (o = setTimeout(() => {
              a.matches("playing") && this.play(this.getCurrentTime()),
                (o = -1),
                s();
            }, this.config.loadTimeout)));
      }
    }
    preloadAllImages() {
      return At(this, null, function* () {
        this.service.state;
        const e = () => {
          this.service.state;
        };
        this.emitter.on(L.Start, e), this.emitter.on(L.Pause, e);
        const n = [];
        for (const r of this.service.state.context.events)
          r.type === N.IncrementalSnapshot &&
            r.data.source === C.CanvasMutation &&
            (n.push(this.deserializeAndPreloadCanvasEvents(r.data, r)),
            ("commands" in r.data ? r.data.commands : [r.data]).forEach((o) => {
              this.preloadImages(o, r);
            }));
        return Promise.all(n);
      });
    }
    preloadImages(e, n) {
      if (
        e.property === "drawImage" &&
        typeof e.args[0] == "string" &&
        !this.imageMap.has(n)
      ) {
        const r = document.createElement("canvas"),
          o = r.getContext("2d"),
          a = o?.createImageData(r.width, r.height);
        a?.data, JSON.parse(e.args[0]), o?.putImageData(a, 0, 0);
      }
    }
    deserializeAndPreloadCanvasEvents(e, n) {
      return At(this, null, function* () {
        if (!this.canvasEventMap.has(n)) {
          const r = { isUnchanged: !0 };
          if ("commands" in e) {
            const o = yield Promise.all(
              e.commands.map((a) =>
                At(this, null, function* () {
                  const i = yield Promise.all(
                    a.args.map(Se(this.imageMap, null, r))
                  );
                  return Lt(ot({}, a), { args: i });
                })
              )
            );
            r.isUnchanged === !1 &&
              this.canvasEventMap.set(n, Lt(ot({}, e), { commands: o }));
          } else {
            const o = yield Promise.all(e.args.map(Se(this.imageMap, null, r)));
            r.isUnchanged === !1 &&
              this.canvasEventMap.set(n, Lt(ot({}, e), { args: o }));
          }
        }
      });
    }
    applyIncremental(e, n) {
      var r, o, a;
      const { data: i } = e;
      switch (i.source) {
        case C.Mutation: {
          try {
            this.applyMutation(i, n);
          } catch (s) {
            this.warn(`Exception in mutation ${s.message || s}`, i);
          }
          break;
        }
        case C.Drag:
        case C.TouchMove:
        case C.MouseMove:
          if (n) {
            const s = i.positions[i.positions.length - 1];
            this.mousePos = { x: s.x, y: s.y, id: s.id, debugData: i };
          } else
            i.positions.forEach((s) => {
              const l = {
                doAction: () => {
                  this.moveAndHover(s.x, s.y, s.id, n, i);
                },
                delay:
                  s.timeOffset +
                  e.timestamp -
                  this.service.state.context.baselineTime,
              };
              this.timer.addAction(l);
            }),
              this.timer.addAction({
                doAction() {},
                delay:
                  e.delay -
                  ((r = i.positions[0]) == null ? void 0 : r.timeOffset),
              });
          break;
        case C.MouseInteraction: {
          if (i.id === -1) break;
          const s = new Event(V[i.type].toLowerCase()),
            l = this.mirror.getNode(i.id);
          if (!l) return this.debugNodeNotFound(i, i.id);
          this.emitter.emit(L.MouseInteraction, { type: i.type, target: l });
          const { triggerFocus: c } = this.config;
          switch (i.type) {
            case V.Blur:
              "blur" in l && l.blur();
              break;
            case V.Focus:
              c && l.focus && l.focus({ preventScroll: !0 });
              break;
            case V.Click:
            case V.TouchStart:
            case V.TouchEnd:
            case V.MouseDown:
            case V.MouseUp:
              n
                ? (i.type === V.TouchStart
                    ? (this.touchActive = !0)
                    : i.type === V.TouchEnd && (this.touchActive = !1),
                  i.type === V.MouseDown
                    ? (this.lastMouseDownEvent = [l, s])
                    : i.type === V.MouseUp && (this.lastMouseDownEvent = null),
                  (this.mousePos = { x: i.x, y: i.y, id: i.id, debugData: i }))
                : (i.type === V.TouchStart && (this.tailPositions.length = 0),
                  this.moveAndHover(i.x, i.y, i.id, n, i),
                  i.type === V.Click
                    ? (this.mouse.classList.remove("active"),
                      this.mouse.offsetWidth,
                      this.mouse.classList.add("active"))
                    : i.type === V.TouchStart
                    ? (this.mouse.offsetWidth,
                      this.mouse.classList.add("touch-active"))
                    : i.type === V.TouchEnd
                    ? this.mouse.classList.remove("touch-active")
                    : l.dispatchEvent(s));
              break;
            case V.TouchCancel:
              n
                ? (this.touchActive = !1)
                : this.mouse.classList.remove("touch-active");
              break;
            default:
              l.dispatchEvent(s);
          }
          break;
        }
        case C.Scroll: {
          if (i.id === -1) break;
          if (this.usingVirtualDom) {
            const s = this.virtualDom.mirror.getNode(i.id);
            if (!s) return this.debugNodeNotFound(i, i.id);
            s.scrollData = i;
            break;
          }
          this.applyScroll(i, n);
          break;
        }
        case C.ViewportResize:
          this.emitter.emit(L.Resize, { width: i.width, height: i.height });
          break;
        case C.Input: {
          if (i.id === -1) break;
          if (this.usingVirtualDom) {
            const s = this.virtualDom.mirror.getNode(i.id);
            if (!s) return this.debugNodeNotFound(i, i.id);
            s.inputData = i;
            break;
          }
          this.applyInput(i);
          break;
        }
        case C.MediaInteraction: {
          const s = this.usingVirtualDom
            ? this.virtualDom.mirror.getNode(i.id)
            : this.mirror.getNode(i.id);
          if (!s) return this.debugNodeNotFound(i, i.id);
          const l = s;
          try {
            i.currentTime !== void 0 && (l.currentTime = i.currentTime),
              i.volume !== void 0 && (l.volume = i.volume),
              i.muted !== void 0 && (l.muted = i.muted),
              i.type === me.Pause && l.pause(),
              i.type === me.Play && l.play(),
              i.type === me.RateChange && (l.playbackRate = i.playbackRate);
          } catch (c) {
            this.warn(`Failed to replay media interactions: ${c.message || c}`);
          }
          break;
        }
        case C.StyleSheetRule:
        case C.StyleDeclaration: {
          this.usingVirtualDom
            ? i.styleId
              ? this.constructedStyleMutations.push(i)
              : i.id &&
                ((o = this.virtualDom.mirror.getNode(i.id)) == null ||
                  o.rules.push(i))
            : this.applyStyleSheetMutation(i);
          break;
        }
        case C.CanvasMutation: {
          if (!this.config.UNSAFE_replayCanvas) return;
          if (this.usingVirtualDom) {
            const s = this.virtualDom.mirror.getNode(i.id);
            if (!s) return this.debugNodeNotFound(i, i.id);
            s.canvasMutations.push({ event: e, mutation: i });
          } else {
            const s = this.mirror.getNode(i.id);
            if (!s) return this.debugNodeNotFound(i, i.id);
            rr({
              event: e,
              mutation: i,
              target: s,
              imageMap: this.imageMap,
              canvasEventMap: this.canvasEventMap,
              errorHandler: this.warnCanvasMutationFailed.bind(this),
            });
          }
          break;
        }
        case C.Font: {
          try {
            const s = new FontFace(
              i.family,
              i.buffer
                ? new Uint8Array(JSON.parse(i.fontSource))
                : i.fontSource,
              i.descriptors
            );
            (a = this.iframe.contentDocument) == null || a.fonts.add(s);
          } catch (s) {
            this.warn(s);
          }
          break;
        }
        case C.Selection: {
          if (n) {
            this.lastSelectionData = i;
            break;
          }
          this.applySelection(i);
          break;
        }
        case C.AdoptedStyleSheet: {
          this.usingVirtualDom
            ? this.adoptedStyleSheets.push(i)
            : this.applyAdoptedStyleSheet(i);
          break;
        }
      }
    }
    applyMutation(e, n) {
      if (
        this.config.useVirtualDom &&
        !this.usingVirtualDom &&
        n &&
        ((this.usingVirtualDom = !0),
        ds(this.iframe.contentDocument, this.mirror, this.virtualDom),
        Object.keys(this.legacy_missingNodeRetryMap).length)
      )
        for (const c in this.legacy_missingNodeRetryMap)
          try {
            const u = this.legacy_missingNodeRetryMap[c],
              d = Un(u.node, this.virtualDom, this.mirror);
            d && (u.node = d);
          } catch (u) {
            this.warn(u);
          }
      const r = this.usingVirtualDom ? this.virtualDom.mirror : this.mirror;
      (e.removes = e.removes.filter((c) =>
        r.getNode(c.id) ? !0 : (this.warnNodeNotFound(e, c.id), !1)
      )),
        e.removes.forEach((c) => {
          var u;
          const d = r.getNode(c.id);
          if (!d) return;
          let h = r.getNode(c.parentId);
          if (!h) return this.warnNodeNotFound(e, c.parentId);
          if (
            (c.isShadow && ge(h) && (h = h.shadowRoot),
            r.removeNodeFromMap(d),
            h)
          )
            try {
              h.removeChild(d),
                this.usingVirtualDom &&
                  d.nodeName === "#text" &&
                  h.nodeName === "STYLE" &&
                  ((u = h.rules) == null ? void 0 : u.length) > 0 &&
                  (h.rules = []);
            } catch (f) {
              if (f instanceof DOMException)
                this.warn("parent could not remove child in mutation", h, d, e);
              else throw f;
            }
        });
      const o = ot({}, this.legacy_missingNodeRetryMap),
        a = [],
        i = (c) => {
          let u = null;
          return (
            c.nextId && (u = r.getNode(c.nextId)),
            c.nextId !== null && c.nextId !== void 0 && c.nextId !== -1 && !u
          );
        },
        s = (c) => {
          var u, d;
          if (!this.iframe.contentDocument)
            return this.warn("Looks like your replayer has been destroyed.");
          let h = r.getNode(c.parentId);
          if (!h)
            return c.node.type === I.Document
              ? this.newDocumentQueue.push(c)
              : a.push(c);
          c.node.isShadow &&
            (ge(h) || h.attachShadow({ mode: "open" }), (h = h.shadowRoot));
          let f = null,
            m = null;
          if (
            (c.previousId && (f = r.getNode(c.previousId)),
            c.nextId && (m = r.getNode(c.nextId)),
            i(c))
          )
            return a.push(c);
          if (c.node.rootId && !r.getNode(c.node.rootId)) return;
          const y = c.node.rootId
            ? r.getNode(c.node.rootId)
            : this.usingVirtualDom
            ? this.virtualDom
            : this.iframe.contentDocument;
          if (De(h, r)) {
            this.attachDocumentToIframe(c, h);
            return;
          }
          const g = (v, E) => {
              if (!this.usingVirtualDom)
                for (const D of this.config.plugins || [])
                  D.onBuild && D.onBuild(v, { id: E, replayer: this });
            },
            p = $e(c.node, {
              doc: y,
              mirror: r,
              skipChild: !0,
              hackCss: !0,
              cache: this.cache,
              afterAppend: g,
            });
          if (c.previousId === -1 || c.nextId === -1) {
            o[c.node.id] = { node: p, mutation: c };
            return;
          }
          const S = r.getMeta(h);
          if (
            S &&
            S.type === I.Element &&
            S.tagName === "textarea" &&
            c.node.type === I.Text
          ) {
            const v = Array.isArray(h.childNodes)
              ? h.childNodes
              : Array.from(h.childNodes);
            for (const E of v) E.nodeType === h.TEXT_NODE && h.removeChild(E);
          } else if (S?.type === I.Document) {
            const v = h;
            c.node.type === I.DocumentType &&
              ((u = v.childNodes[0]) == null ? void 0 : u.nodeType) ===
                Node.DOCUMENT_TYPE_NODE &&
              v.removeChild(v.childNodes[0]),
              p.nodeName === "HTML" &&
                v.documentElement &&
                v.removeChild(v.documentElement);
          }
          if (
            (f && f.nextSibling && f.nextSibling.parentNode
              ? h.insertBefore(p, f.nextSibling)
              : m && m.parentNode
              ? h.contains(m)
                ? h.insertBefore(p, m)
                : h.insertBefore(p, null)
              : h.appendChild(p),
            g(p, c.node.id),
            this.usingVirtualDom &&
              p.nodeName === "#text" &&
              h.nodeName === "STYLE" &&
              ((d = h.rules) == null ? void 0 : d.length) > 0 &&
              (h.rules = []),
            De(p, this.mirror))
          ) {
            const v = this.mirror.getId(p),
              E = this.newDocumentQueue.find((D) => D.parentId === v);
            E &&
              (this.attachDocumentToIframe(E, p),
              (this.newDocumentQueue = this.newDocumentQueue.filter(
                (D) => D !== E
              )));
          }
          (c.previousId || c.nextId) &&
            this.legacy_resolveMissingNode(o, h, p, c);
        };
      e.adds.forEach((c) => {
        s(c);
      });
      const l = Date.now();
      for (; a.length; ) {
        const c = Qt(a);
        if (((a.length = 0), Date.now() - l > 500)) {
          this.warn(
            "Timeout in the loop, please check the resolve tree data:",
            c
          );
          break;
        }
        for (const u of c)
          r.getNode(u.value.parentId)
            ? gt(u, (d) => {
                s(d);
              })
            : this.debug(
                "Drop resolve tree since there is no parent for the root node.",
                u
              );
      }
      Object.keys(o).length &&
        Object.assign(this.legacy_missingNodeRetryMap, o),
        qt(e.texts).forEach((c) => {
          var u;
          const d = r.getNode(c.id);
          if (!d)
            return e.removes.find((h) => h.id === c.id)
              ? void 0
              : this.warnNodeNotFound(e, c.id);
          if (((d.textContent = c.value), this.usingVirtualDom)) {
            const h = d.parentNode;
            ((u = h?.rules) == null ? void 0 : u.length) > 0 && (h.rules = []);
          }
        }),
        e.attributes.forEach((c) => {
          const u = r.getNode(c.id);
          if (!u)
            return e.removes.find((d) => d.id === c.id)
              ? void 0
              : this.warnNodeNotFound(e, c.id);
          for (const d in c.attributes)
            if (typeof d == "string") {
              const h = c.attributes[d];
              if (h === null) u.removeAttribute(d);
              else if (typeof h == "string")
                try {
                  if (
                    d === "_cssText" &&
                    (u.nodeName === "LINK" || u.nodeName === "STYLE")
                  )
                    try {
                      const f = r.getMeta(u);
                      Object.assign(f.attributes, c.attributes);
                      const m = $e(f, {
                          doc: u.ownerDocument,
                          mirror: r,
                          skipChild: !0,
                          hackCss: !0,
                          cache: this.cache,
                        }),
                        y = u.nextSibling,
                        g = u.parentNode;
                      if (m && g) {
                        g.removeChild(u),
                          g.insertBefore(m, y),
                          r.replace(c.id, m);
                        break;
                      }
                    } catch {}
                  u.setAttribute(d, h);
                } catch (f) {
                  this.warn(
                    "An error occurred may due to the checkout feature.",
                    f
                  );
                }
              else if (d === "style") {
                const f = h,
                  m = u;
                for (const y in f)
                  if (f[y] === !1) m.style.removeProperty(y);
                  else if (f[y] instanceof Array) {
                    const g = f[y];
                    m.style.setProperty(y, g[0], g[1]);
                  } else {
                    const g = f[y];
                    m.style.setProperty(y, g);
                  }
              }
            }
        });
    }
    applyScroll(e, n) {
      var r, o;
      const a = this.mirror.getNode(e.id);
      if (!a) return this.debugNodeNotFound(e, e.id);
      const i = this.mirror.getMeta(a);
      if (a === this.iframe.contentDocument)
        (r = this.iframe.contentWindow) == null ||
          r.scrollTo({ top: e.y, left: e.x, behavior: n ? "auto" : "smooth" });
      else if (i?.type === I.Document)
        (o = a.defaultView) == null ||
          o.scrollTo({ top: e.y, left: e.x, behavior: n ? "auto" : "smooth" });
      else
        try {
          a.scrollTo({ top: e.y, left: e.x, behavior: n ? "auto" : "smooth" });
        } catch {}
    }
    applyInput(e) {
      const n = this.mirror.getNode(e.id);
      if (!n) return this.debugNodeNotFound(e, e.id);
      try {
        (n.checked = e.isChecked), (n.value = e.text);
      } catch {}
    }
    applySelection(e) {
      try {
        const n = new Set(),
          r = e.ranges.map(
            ({ start: o, startOffset: a, end: i, endOffset: s }) => {
              const l = this.mirror.getNode(o),
                c = this.mirror.getNode(i);
              if (!l || !c) return;
              const u = new Range();
              u.setStart(l, a), u.setEnd(c, s);
              const d = l.ownerDocument,
                h = d?.getSelection();
              return h && n.add(h), { range: u, selection: h };
            }
          );
        n.forEach((o) => o.removeAllRanges()),
          r.forEach((o) => {
            var a;
            return (
              o && ((a = o.selection) == null ? void 0 : a.addRange(o.range))
            );
          });
      } catch {}
    }
    applyStyleSheetMutation(e) {
      var n;
      let r = null;
      e.styleId
        ? (r = this.styleMirror.getStyle(e.styleId))
        : e.id &&
          (r =
            ((n = this.mirror.getNode(e.id)) == null ? void 0 : n.sheet) ||
            null),
        r &&
          (e.source === C.StyleSheetRule
            ? this.applyStyleSheetRule(e, r)
            : e.source === C.StyleDeclaration &&
              this.applyStyleDeclaration(e, r));
    }
    applyStyleSheetRule(e, n) {
      var r, o, a, i;
      if (
        ((r = e.adds) == null ||
          r.forEach(({ rule: s, index: l }) => {
            try {
              if (Array.isArray(l)) {
                const { positions: c, index: u } = bt(l);
                ke(n.cssRules, c).insertRule(s, u);
              } else {
                const c =
                  l === void 0 ? void 0 : Math.min(l, n.cssRules.length);
                n?.insertRule(s, c);
              }
            } catch {}
          }),
        (o = e.removes) == null ||
          o.forEach(({ index: s }) => {
            try {
              if (Array.isArray(s)) {
                const { positions: l, index: c } = bt(s);
                ke(n.cssRules, l).deleteRule(c || 0);
              } else n?.deleteRule(s);
            } catch {}
          }),
        e.replace)
      )
        try {
          (a = n.replace) == null || a.call(n, e.replace);
        } catch {}
      if (e.replaceSync)
        try {
          (i = n.replaceSync) == null || i.call(n, e.replaceSync);
        } catch {}
    }
    applyStyleDeclaration(e, n) {
      e.set &&
        ke(n.rules, e.index).style.setProperty(
          e.set.property,
          e.set.value,
          e.set.priority
        ),
        e.remove &&
          ke(n.rules, e.index).style.removeProperty(e.remove.property);
    }
    applyAdoptedStyleSheet(e) {
      var n;
      const r = this.mirror.getNode(e.id);
      if (!r) return;
      (n = e.styles) == null ||
        n.forEach((s) => {
          var l;
          let c = null,
            u = null;
          if (
            (ge(r)
              ? (u =
                  ((l = r.ownerDocument) == null ? void 0 : l.defaultView) ||
                  null)
              : r.nodeName === "#document" && (u = r.defaultView),
            !!u)
          )
            try {
              (c = new u.CSSStyleSheet()),
                this.styleMirror.add(c, s.styleId),
                this.applyStyleSheetRule(
                  { source: C.StyleSheetRule, adds: s.rules },
                  c
                );
            } catch {}
        });
      const o = 10;
      let a = 0;
      const i = (s, l) => {
        const c = l
          .map((u) => this.styleMirror.getStyle(u))
          .filter((u) => u !== null);
        ge(s)
          ? (s.shadowRoot.adoptedStyleSheets = c)
          : s.nodeName === "#document" && (s.adoptedStyleSheets = c),
          c.length !== l.length &&
            a < o &&
            (setTimeout(() => i(s, l), 0 + 100 * a), a++);
      };
      i(r, e.styleIds);
    }
    legacy_resolveMissingNode(e, n, r, o) {
      const { previousId: a, nextId: i } = o,
        s = a && e[a],
        l = i && e[i];
      if (s) {
        const { node: c, mutation: u } = s;
        n.insertBefore(c, r),
          delete e[u.node.id],
          delete this.legacy_missingNodeRetryMap[u.node.id],
          (u.previousId || u.nextId) &&
            this.legacy_resolveMissingNode(e, n, c, u);
      }
      if (l) {
        const { node: c, mutation: u } = l;
        n.insertBefore(c, r.nextSibling),
          delete e[u.node.id],
          delete this.legacy_missingNodeRetryMap[u.node.id],
          (u.previousId || u.nextId) &&
            this.legacy_resolveMissingNode(e, n, c, u);
      }
    }
    moveAndHover(e, n, r, o, a) {
      const i = this.mirror.getNode(r);
      if (!i) return this.debugNodeNotFound(a, r);
      const s = St(i, this.iframe),
        l = e * s.absoluteScale + s.x,
        c = n * s.absoluteScale + s.y;
      (this.mouse.style.left = `${l}px`),
        (this.mouse.style.top = `${c}px`),
        o || this.drawMouseTail({ x: l, y: c }),
        this.hoverElements(i);
    }
    drawMouseTail(e) {
      if (!this.mouseTail) return;
      const {
          lineCap: n,
          lineWidth: r,
          strokeStyle: o,
          duration: a,
        } = this.config.mouseTail === !0
          ? _t
          : Object.assign({}, _t, this.config.mouseTail),
        i = () => {
          if (!this.mouseTail) return;
          const s = this.mouseTail.getContext("2d");
          !s ||
            !this.tailPositions.length ||
            (s.clearRect(0, 0, this.mouseTail.width, this.mouseTail.height),
            s.beginPath(),
            (s.lineWidth = r),
            (s.lineCap = n),
            (s.strokeStyle = o),
            s.moveTo(this.tailPositions[0].x, this.tailPositions[0].y),
            this.tailPositions.forEach((l) => s.lineTo(l.x, l.y)),
            s.stroke());
        };
      this.tailPositions.push(e),
        i(),
        setTimeout(() => {
          (this.tailPositions = this.tailPositions.filter((s) => s !== e)), i();
        }, a / this.speedService.state.context.timer.speed);
    }
    hoverElements(e) {
      var n;
      (n = this.lastHoveredRootNode || this.iframe.contentDocument) == null ||
        n.querySelectorAll(".\\:hover").forEach((o) => {
          o.classList.remove(":hover");
        }),
        (this.lastHoveredRootNode = e.getRootNode());
      let r = e;
      for (; r; )
        r.classList && r.classList.add(":hover"), (r = r.parentElement);
    }
    isUserInteraction(e) {
      return e.type !== N.IncrementalSnapshot
        ? !1
        : e.data.source > C.Mutation && e.data.source <= C.Input;
    }
    backToNormal() {
      (this.nextUserInteractionEvent = null),
        !this.speedService.state.matches("normal") &&
          (this.speedService.send({ type: "BACK_TO_NORMAL" }),
          this.emitter.emit(L.SkipEnd, {
            speed: this.speedService.state.context.normalSpeed,
          }));
    }
    warnNodeNotFound(e, n) {
      this.warn(`Node with id '${n}' not found. `, e);
    }
    warnCanvasMutationFailed(e, n) {
      this.warn("Has error on canvas update", n, "canvas mutation:", e);
    }
    debugNodeNotFound(e, n) {
      this.debug(`Node with id '${n}' not found. `, e);
    }
    warn(...e) {
      !this.config.showWarning || this.config.logger.warn(ir, ...e);
    }
    debug(...e) {
      !this.config.showDebug || this.config.logger.log(ir, ...e);
    }
  }
  const { addCustomEvent: Gs } = Ce,
    { freezePage: zs } = Ce;
  return (
    (ee.EventType = N),
    (ee.IncrementalSource = C),
    (ee.MouseInteractions = V),
    (ee.Replayer = js),
    (ee.ReplayerEvents = L),
    (ee.addCustomEvent = Gs),
    (ee.freezePage = zs),
    (ee.record = Ce),
    (ee.utils = jr),
    Object.defineProperty(ee, "__esModule", { value: !0 }),
    ee
  );
})({});
//# sourceMappingURL=rrweb.min.js.map

// Create a Pascal object and assign it to the global scope
window.Pascal = {
  init: function (apiKey, config) {
    this.apiKey = apiKey;
    this.config = config;
    this.startRecording();
  },

  startRecording: function () {
    rrwebRecord({
      emit: (event) => {
        this.sendEvents(event);
      },
    });
  },

  sendEvents: function (event) {
    console.log(event);
    // Implement the logic to send to your backend
    // Example: send an HTTP request with the event data and your API key

    const xhr = new XMLHttpRequest();
    xhr.open("POST", this.config.api_host + "/api/events", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader("x-api-key", this.apiKey);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status !== 200) {
          console.error(
            "Failed to send events to Pascal backend:",
            xhr.responseText
          );
        }
      }
    };

    xhr.send(JSON.stringify(event));
  },
};
