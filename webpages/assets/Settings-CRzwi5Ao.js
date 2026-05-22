import {
  i as Ea,
  E as Sa,
  B as xa,
  K as Fn,
  p as Ft,
  L as bt,
  m as pt,
  t as ze,
  y as W,
  w as c,
  b as E,
  I as _t,
  $ as q,
  U as y,
  W as T,
  Q as Pe,
  S as jt,
  O as I,
  T as F,
  q as H,
  u as C,
  l as h,
  M as we,
  V as ut,
  J as At,
  a0 as ft,
  g as pn,
  F as ci,
  a as Ia,
  Z as Aa,
  r as rt,
  G as yr,
  s as Ca,
  R as an,
  x as Da,
  z as $t,
  e as wr,
  f as Ma,
  h as Dn,
  v as ui,
  X as Hr,
  n as zr,
  N as ka,
  C as Wr,
  P as Gr,
  d as Oa,
} from "./page-init-D8Z4tyJC.js";
function fi(r, e, ...t) {
  var n = new xa(r);
  Ea(() => {
    const i = e() ?? null;
    n.ensure(i, i && ((a) => i(a, ...t)));
  }, Sa);
}
const Ta = [
    {
      id: "recentlyUsed",
      name: chrome.i18n.getMessage("recentlyUsed"),
      addonIds: [],
      expanded: !0,
      iframeShow: !0,
      fullscreenShow: !1,
    },
    {
      id: "runningOnTab",
      name: chrome.i18n.getMessage("runningOnThisPage"),
      addonIds: [],
      expanded: !0,
      iframeShow: !0,
      fullscreenShow: !1,
    },
    { id: "_iframeSearch", name: "", addonIds: [], expanded: !0, iframeShow: !0, fullscreenShow: !1 },
    {
      id: "featuredNew",
      name: chrome.i18n.getMessage("featuredNew"),
      addonIds: [],
      expanded: !0,
      iframeShow: !1,
      fullscreenShow: !0,
      customOrder: ["new", "updated"],
    },
    {
      id: "new",
      name: chrome.i18n.getMessage("newGroup"),
      addonIds: [],
      expanded: new URLSearchParams(window.location.search).get("source") === "updatenotif",
      iframeShow: !1,
      fullscreenShow: !0,
      customOrder: ["new", "updated"],
    },
    {
      id: "enabled",
      name: chrome.i18n.getMessage("enabled"),
      addonIds: [],
      expanded: !0,
      iframeShow: !0,
      fullscreenShow: !0,
    },
    {
      id: "recommended",
      name: chrome.i18n.getMessage("recommended"),
      addonIds: [],
      expanded: !0,
      iframeShow: !1,
      fullscreenShow: !0,
    },
    {
      id: "featured",
      name: chrome.i18n.getMessage("featured"),
      addonIds: [],
      expanded: !0,
      iframeShow: !1,
      fullscreenShow: !0,
    },
    {
      id: "forums",
      name: chrome.i18n.getMessage("forums"),
      addonIds: [],
      expanded: !1,
      iframeShow: !1,
      fullscreenShow: !0,
    },
    {
      id: "others",
      name: chrome.i18n.getMessage("others"),
      addonIds: [],
      expanded: !0,
      iframeShow: !1,
      fullscreenShow: !0,
    },
    {
      id: "beta",
      name: chrome.i18n.getMessage("beta"),
      addonIds: [],
      expanded: !1,
      iframeShow: !1,
      fullscreenShow: !0,
    },
  ],
  Pa = [
    { id: "all", icon: "list", name: chrome.i18n.getMessage("all") },
    { id: "editor", icon: "puzzle", name: chrome.i18n.getMessage("editorFeatures") },
    { id: "codeEditor", parent: "editor", icon: "code", name: chrome.i18n.getMessage("codeEditorFeatures") },
    { id: "costumeEditor", parent: "editor", icon: "brush2", name: chrome.i18n.getMessage("costumeEditorFeatures") },
    { id: "editorOthers", parent: "editor", icon: "dots", name: chrome.i18n.getMessage("others") },
    { id: "player", icon: "player", name: chrome.i18n.getMessage("playerFeatures") },
    { id: "community", icon: "web", name: chrome.i18n.getMessage("websiteFeatures") },
    {
      id: "projectPage",
      parent: "community",
      icon: "projectpage",
      name: chrome.i18n.getMessage("projectPageFeatures"),
    },
    { id: "profiles", parent: "community", icon: "users", name: chrome.i18n.getMessage("profilesFeatures") },
    { id: "forums", parent: "community", icon: "forum", name: chrome.i18n.getMessage("forums") },
    { id: "communityOthers", parent: "community", icon: "dots", name: chrome.i18n.getMessage("others") },
    { id: "theme", icon: "brush", name: chrome.i18n.getMessage("themes") },
    { id: "themesForEditor", parent: "theme", icon: "puzzle", name: chrome.i18n.getMessage("editorThemes") },
    { id: "themesForPlayer", parent: "theme", icon: "player", name: chrome.i18n.getMessage("playerThemes") },
    { id: "themesForWebsite", parent: "theme", icon: "web", name: chrome.i18n.getMessage("websiteThemes") },
    { id: "popup", icon: "popup", name: chrome.i18n.getMessage("popupFeatures"), marginBottom: !0 },
    { id: "easterEgg", name: chrome.i18n.getMessage("easterEggs"), hidden: !0 },
  ],
  g = Fn({
    smallMode: !1,
    devMode: !1,
    theme: !1,
    forceEnglishSetting: null,
    forceEnglishSettingInitial: null,
    moreSettingsOpen: !1,
    relatedAddonsOpen: !1,
    relatedToAddonName: null,
    relatedAddons: [],
    relatedAddonsHistory: [],
    categoryOpen: !0,
    loaded: !1,
    searchLoaded: !1,
    manifests: [],
    manifestsById: {},
    selectedCategory: "all",
    previousCategory: "all",
    searchInput: "",
    searchInputReal: "",
    addonSettings: {},
    addonToEnable: null,
    showPopupModal: !1,
    isIframe: !1,
    addonGroups: [],
    categories: Pa,
    browserLevelPermissions: ["notifications"],
    grantedOptionalPermissions: [],
    addonListObjs: [],
    sidebarUrls: { contributors: "", feedback: "", changelog: "" },
  });
function Yl({ isIframe: r } = {}) {
  (g.isIframe = !!r),
    (g.addonGroups = Ta.filter((a) => (r ? a.iframeShow : a.fullscreenShow)).map((a) => ({
      ...a,
      addonIds: [],
      expanded: a.expanded ?? !1,
    })));
  const e = chrome.i18n.getUILanguage(),
    t = e.startsWith("en") ? "" : `${e.split("-")[0]}/`,
    n = chrome.runtime.getManifest(),
    i = `utm_source=extension&utm_medium=settingspage&utm_campaign=v${n.version}`;
  g.sidebarUrls = {
    contributors: `https://scratchaddons.com/${t}credits?${i}`,
    feedback: `https://scratchaddons.com/${t}feedback/?ext_version=${n.version_name}&${i}`,
    changelog: `https://scratchaddons.com/${t}changelog?${i}`,
  };
}
const qt = { "close-pickers": new Set(), "close-dropdowns": new Set(), "toggle-addon-request": new Set() };
function gi(r, e) {
  return qt[r] || (qt[r] = new Set()), qt[r].add(e), () => qt[r].delete(e);
}
function Rn(r, ...e) {
  if (qt[r]) for (const t of [...qt[r]]) t(...e);
}
function N(r, ...e) {
  return chrome.i18n.getMessage(r, ...e);
}
function Fa() {
  return chrome.i18n.getMessage("@@bidi_dir");
}
function nt(r, { wait: e = 0, settingId: t = null } = {}) {
  const n = t && g.addonSettings[r._addonId][t];
  setTimeout(() => {
    (!t || g.addonSettings[r._addonId][t] === n) &&
      chrome.runtime.sendMessage({
        changeAddonSettings: { addonId: r._addonId, newSettings: g.addonSettings[r._addonId] },
      });
  }, e);
}
function Ra(r, e, { callCloseDropdowns: t = !0 } = {}) {
  Rn("close-pickers", e), t && un(r, e);
}
function un(r, e) {
  Rn("close-dropdowns", e);
}
var La = C('<button type="button"><img draggable="false" alt="" class="svelte-1tiuag2"/> <span> </span></button>');
function Ba(r, e) {
  bt(e, !0);
  let t = ut(0);
  const n = q(() => {
    const l = g.categories.filter((d) => d.parent === e.category.parent).map((d) => d.id);
    return !e.category.parent || [e.category.parent, ...l].includes(g.selectedCategory);
  });
  function i(l) {
    if ((l.stopPropagation(), g.selectedCategory === e.category.id))
      if (g.smallMode) g.categoryOpen = !1;
      else {
        if (e.category.parent || Date.now() - c(t) < 350) return;
        g.selectedCategory = "all";
      }
    else g.selectedCategory = e.category.id;
    we(t, Date.now(), !0), (g.relatedAddonsHistory.length = 0), (g.relatedAddonsOpen = !1);
  }
  var a = pt(),
    o = ze(a);
  {
    var s = (l) => {
      var d = La();
      let u, f;
      var v = h(d),
        m = y(v, 2),
        p = h(m);
      T(
        (_) => {
          (u = Pe(d, 1, "category svelte-1tiuag2", null, u, {
            sel: e.category.id === g.selectedCategory && !g.relatedAddonsOpen,
            hasParent: !!e.category.parent,
          })),
            (f = jt(d, "", f, { marginBottom: e.category.marginBottom ? "12px" : 0 })),
            I(v, "src", _),
            F(p, e.category.name);
        },
        [() => chrome.runtime.getURL(`images/icons/${e.category.icon}.svg`)]
      ),
        H("click", d, i),
        E(l, d);
    };
    W(o, (l) => {
      !e.category.hidden && c(n) && l(s);
    });
  }
  E(r, a), _t();
}
Ft(["click"]);
var Na = C(
  '<div role="button" tabindex="0"><button type="button" class="arrow-button svelte-8hg35j"><img draggable="false" alt=""/></button> </div>'
);
function ja(r, e) {
  bt(e, !0);
  let t = At(e, "group", 7);
  const n = q(() => (g.searchInput !== "" ? !1 : e.shownCount > 0));
  function i() {
    t().expanded = !t().expanded;
  }
  var a = pt(),
    o = ze(a);
  {
    var s = (l) => {
      var d = Na();
      let u;
      var f = h(d),
        v = h(f);
      I(v, "src", chrome.runtime.getURL("images/icons/expand.svg"));
      let m;
      var p = y(f);
      T(
        (_) => {
          (u = Pe(d, 1, "addon-group svelte-8hg35j", null, u, { "margin-above": e.marginAbove })),
            I(f, "title", _),
            (m = Pe(v, 1, "svelte-8hg35j", null, m, { reverted: t().expanded })),
            F(p, ` ${t().name ?? ""} (${e.shownCount ?? ""})`);
        },
        [() => N(t().expanded ? "collapse" : "expand")]
      ),
        H("click", d, i),
        H("keydown", d, (_) => _.key === "Enter" && i()),
        E(l, d);
    };
    W(o, (l) => {
      c(n) && l(s);
    });
  }
  E(r, a), _t();
}
Ft(["click", "keydown"]);
const hi = [
  { name: "danger", tooltipText: "dangerTooltip", matchName: "danger", color: "darkred", iframeAlwaysShow: !0 },
  { name: "recommended", tooltipText: "recommendedTooltip", matchName: "recommended", color: "blue" },
  { name: "new", matchName: "new", color: "purple" },
  { name: "updated", matchName: "updated", color: "purple" },
  { name: "updatedWithSettings", matchName: "updatedWithSettings", color: "purple" },
  { name: "beta", tooltipText: "betaTooltip", matchName: "beta", color: "red", iframeAlwaysShow: !0 },
  { name: "forums", tooltipText: "forumsTooltip", matchName: "forums", color: "green" },
  { name: "forEditor", matchName: "editor", color: "darkgreen", addonTabShow: { theme: !0 } },
  { name: "forPlayer", matchName: "player", color: "lightblue", addonTabShow: { theme: !0 } },
  { name: "forWebsite", matchName: "community", color: "yellow", addonTabShow: { theme: !0 } },
];
var Ua = C('<span class="tooltiptext tooltiptexttop"> </span>'),
  Ha = C("<div> <!></div>");
function ar(r, e) {
  bt(e, !0);
  const t = q(() => hi.find((d) => d.matchName === e.tag)),
    n = q(() =>
      c(t) ? (g.isIframe ? c(t).iframeAlwaysShow : !c(t).addonTabShow || c(t).addonTabShow[g.selectedCategory]) : !1
    ),
    i = q(() => (c(t) ? chrome.i18n.getMessage(c(t).name) : "")),
    a = q(() => (c(t)?.tooltipText ? chrome.i18n.getMessage(c(t).tooltipText) : ""));
  var o = pt(),
    s = ze(o);
  {
    var l = (d) => {
      var u = Ha();
      let f;
      var v = h(u),
        m = y(v);
      {
        var p = (_) => {
          var k = Ua(),
            ee = h(k);
          T(() => F(ee, c(a))), E(_, k);
        };
        W(m, (_) => {
          c(t).tooltipText && _(p);
        });
      }
      T(() => {
        (f = Pe(u, 1, "badge", null, f, {
          tooltip: !!c(t).tooltipText,
          blue: c(t).color === "blue",
          yellow: c(t).color === "yellow",
          red: c(t).color === "red",
          darkred: c(t).color === "darkred",
          green: c(t).color === "green",
          darkgreen: c(t).color === "darkgreen",
          lightblue: c(t).color === "lightblue",
          purple: c(t).color === "purple",
        })),
          I(u, "tabindex", c(t).tooltipText ? 0 : -1),
          F(v, `${c(i) ?? ""} `);
      }),
        E(d, u);
    };
    W(s, (d) => {
      c(n) && d(l);
    });
  }
  E(r, o), _t();
}
var za = C(
  '<div><button type="button" aria-haspopup="true"><img class="icon-type" draggable="false" alt=""/></button> <ul class="dropdown-list svelte-1h673fy" role="menu"><!></ul></div>'
);
function Er(r, e) {
  bt(e, !0);
  let t = At(e, "buttonClass", 3, ""),
    n = At(e, "buttonTitle", 3, ""),
    i = At(e, "disabled", 3, !1),
    a = ut(!1),
    o = ut(null),
    s = ut(null);
  const l = { ArrowUp: -1, ArrowDown: 1, ArrowLeft: -1, ArrowRight: 1, Home: -1 / 0, End: 1 / 0 };
  ft(() =>
    gi("close-dropdowns", (M) => {
      c(a) && M !== d && we(a, !1);
    })
  );
  const d = {};
  async function u() {
    we(a, !c(a)),
      Rn("close-pickers", null),
      Rn("close-dropdowns", d),
      c(a) && (await Aa(), c(s)?.firstElementChild?.focus?.());
  }
  function f(M) {
    M.target.closest("li") && un();
  }
  function v(M) {
    if (!(M.ctrlKey || M.metaKey || M.altKey))
      if (M.key === "Tab") c(o)?.focus(), un();
      else if (document.activeElement?.tagName === "LI" && M.key === "Enter") document.activeElement.click();
      else {
        const D = l[M.key];
        if (D === void 0) return;
        M.preventDefault();
        const J = c(s) ? Array.from(c(s).children) : [],
          A = J.indexOf(document.activeElement) + D,
          O = Math.min(Math.max(A, 0), J.length - 1);
        J[O]?.focus?.();
      }
  }
  function m(M) {
    function D(J) {
      !M.contains(J.target) && c(a) && un();
    }
    return (
      document.body.addEventListener("mousedown", D, !0),
      {
        destroy() {
          document.body.removeEventListener("mousedown", D, !0);
        },
      }
    );
  }
  var p = za(),
    _ = h(p),
    k = h(_);
  I(k, "src", chrome.runtime.getURL("images/icons/expand.svg")),
    pn(
      _,
      (M) => we(o, M),
      () => c(o)
    );
  var ee = y(_, 2),
    ne = h(ee);
  fi(ne, () => e.children ?? ci),
    pn(
      ee,
      (M) => we(s, M),
      () => c(s)
    ),
    Ia(p, (M) => m?.(M)),
    T(() => {
      I(_, "aria-expanded", c(a) ? "true" : "false"),
        Pe(_, 1, `dropdown-btn ${t()} ${c(a) ? "open" : ""}`, "svelte-1h673fy"),
        (_.disabled = i()),
        I(_, "title", n());
    }),
    H("keydown", p, v),
    H("click", _, u),
    H("click", ee, f),
    E(r, p),
    _t();
}
Ft(["keydown", "click"]);
var Wa = C('<span class="color-preview"><span></span></span>'),
  Ga = C('<span class="text-preview"> </span>'),
  Xa = C('<span class="color-preview"><span></span></span>'),
  Ya = C('<span class="text-preview"> </span>'),
  Ka = C('<li tabindex="0" role="menuitem"><!> <span> </span> <!></li>'),
  Va = C('<li tabindex="0" role="menuitem"><!> <span> </span> <!></li> <!>', 1),
  Ja = C('<div class="setting-dropdown"><!></div>');
function Qa(r, e) {
  bt(e, !0);
  let t = At(e, "addonSettings", 7);
  function n() {
    (t()[e.setting.id] = e.setting.default), nt(e.addon, { settingId: e.setting.id });
  }
  function i(l) {
    (t()[e.setting.id] = l.values[e.setting.id]), nt(e.addon, { settingId: e.setting.id });
  }
  function a(l) {
    return Object.prototype.hasOwnProperty.call(l.values, e.setting.id)
      ? e.setting.type === "color"
        ? l.values[e.setting.id].toLowerCase() !== e.setting.default.toLowerCase()
        : l.values[e.setting.id] !== e.setting.default
      : !1;
  }
  var o = Ja(),
    s = h(o);
  {
    let l = q(() => N("resetTo"));
    Er(s, {
      buttonClass: "large-button clear-button",
      get disabled() {
        return e.disabled;
      },
      get buttonTitle() {
        return c(l);
      },
      children: (d, u) => {
        var f = Va(),
          v = ze(f),
          m = h(v);
        {
          var p = (D) => {
            var J = Wa(),
              j = h(J);
            let A;
            T(() => (A = jt(j, "", A, { backgroundColor: e.setting.default }))), E(D, J);
          };
          W(m, (D) => {
            e.setting.type === "color" && D(p);
          });
        }
        var _ = y(m, 2),
          k = h(_),
          ee = y(_, 2);
        {
          var ne = (D) => {
            var J = Ga(),
              j = h(J);
            T(() => F(j, e.setting.default)), E(D, J);
          };
          W(ee, (D) => {
            e.setting.type !== "color" && D(ne);
          });
        }
        var M = y(v, 2);
        rt(
          M,
          17,
          () => e.presets,
          (D) => D.id ?? D.name,
          (D, J) => {
            var j = pt(),
              A = ze(j);
            {
              var O = (G) => {
                  var re = Ka(),
                    je = h(re);
                  {
                    var Ee = (de) => {
                      var Ae = Xa(),
                        Ge = h(Ae);
                      let Xe;
                      T(() => (Xe = jt(Ge, "", Xe, { backgroundColor: c(J).values[e.setting.id] }))), E(de, Ae);
                    };
                    W(je, (de) => {
                      e.setting.type === "color" && de(Ee);
                    });
                  }
                  var Ue = y(je, 2),
                    Se = h(Ue),
                    Me = y(Ue, 2);
                  {
                    var We = (de) => {
                      var Ae = Ya(),
                        Ge = h(Ae);
                      T(() => F(Ge, c(J).values[e.setting.id])), E(de, Ae);
                    };
                    W(Me, (de) => {
                      e.setting.type !== "color" && de(We);
                    });
                  }
                  T(() => F(Se, c(J).name)),
                    H("click", re, () => i(c(J))),
                    H("keydown", re, (de) => de.key === "Enter" && i(c(J))),
                    E(G, re);
                },
                R = q(() => a(c(J)));
              W(A, (G) => {
                c(R) && G(O);
              });
            }
            E(D, j);
          }
        ),
          T((D) => F(k, D), [() => N("default")]),
          H("click", v, n),
          H("keydown", v, (D) => D.key === "Enter" && n()),
          E(d, f);
      },
      $$slots: { default: !0 },
    });
  }
  E(r, o), _t();
}
Ft(["click", "keydown"]);
const qa = (function () {
    const e = typeof document < "u" && document.createElement("link").relList;
    return e && e.supports && e.supports("modulepreload") ? "modulepreload" : "preload";
  })(),
  Za = function (r, e) {
    return new URL(r, e).href;
  },
  Xr = {},
  $a = function (e, t, n) {
    let i = Promise.resolve();
    if (t && t.length > 0) {
      let o = function (u) {
        return Promise.all(
          u.map((f) =>
            Promise.resolve(f).then(
              (v) => ({ status: "fulfilled", value: v }),
              (v) => ({ status: "rejected", reason: v })
            )
          )
        );
      };
      const s = document.getElementsByTagName("link"),
        l = document.querySelector("meta[property=csp-nonce]"),
        d = l?.nonce || l?.getAttribute("nonce");
      i = o(
        t.map((u) => {
          if (((u = Za(u, n)), u in Xr)) return;
          Xr[u] = !0;
          const f = u.endsWith(".css"),
            v = f ? '[rel="stylesheet"]' : "";
          if (!!n)
            for (let _ = s.length - 1; _ >= 0; _--) {
              const k = s[_];
              if (k.href === u && (!f || k.rel === "stylesheet")) return;
            }
          else if (document.querySelector(`link[href="${u}"]${v}`)) return;
          const p = document.createElement("link");
          if (
            ((p.rel = f ? "stylesheet" : qa),
            f || (p.as = "script"),
            (p.crossOrigin = ""),
            (p.href = u),
            d && p.setAttribute("nonce", d),
            document.head.appendChild(p),
            f)
          )
            return new Promise((_, k) => {
              p.addEventListener("load", _),
                p.addEventListener("error", () => k(new Error(`Unable to preload CSS for ${u}`)));
            });
        })
      );
    }
    function a(o) {
      const s = new Event("vite:preloadError", { cancelable: !0 });
      if (((s.payload = o), window.dispatchEvent(s), !s.defaultPrevented)) throw o;
    }
    return i.then((o) => {
      for (const s of o || []) s.status === "rejected" && a(s.reason);
      return e().catch(a);
    });
  };
var eo = C("<color-picker></color-picker>", 2),
  to = C('<div class="color-container" role="presentation"><button type="button"></button> <!></div>');
function no(r, e) {
  bt(e, !0);
  let t = At(e, "no_alpha", 3, !1),
    n = At(e, "disabled", 3, !1),
    i = At(e, "addonSettings", 7),
    a = ut(!1),
    o = ut(Fn(e.value)),
    s = ut(!1),
    l = ut(null);
  const d = q(() => (t() ? "hex,rgb,hsv,hsl" : "hex,hex8,rgb,hsv,hsl")),
    u = {};
  ft(() => {
    if (c(s) && c(l)) {
      const M = (D) => {
        we(o, "#" + D.detail.value),
          e.value !== c(o) &&
            c(l).hex8 &&
            ((i()[e.setting.id] = "#" + c(l).hex8), nt(e.addon, { wait: 250, settingId: e.setting.id }));
      };
      return c(l).addEventListener("input", M), () => c(l).removeEventListener("input", M);
    }
  }),
    ft(() =>
      gi("close-pickers", (M) => {
        c(a) && u !== M && f(!1, { callCloseDropdowns: !1, callClosePickers: !1 });
      })
    ),
    ft(() => {
      we(o, e.value, !0), c(l)?._valueChanged?.();
    }),
    ft(() => {
      c(a), c(l)?._valueChanged?.();
    });
  function f(M = !c(a), { callCloseDropdowns: D = !0, callClosePickers: J = !0 } = {}) {
    if (!c(s)) {
      we(s, !0), queueMicrotask(() => f(M, { callCloseDropdowns: D, callClosePickers: J }));
      return;
    }
    we(a, M, !0),
      J && Ra(null, u, { callCloseDropdowns: !1 }),
      D && un(),
      c(l)?._valueChanged?.(),
      c(l)?.hex8 &&
        (we(o, "#" + c(l).hex8),
        e.value !== c(o) &&
          ((i()[e.setting.id] = "#" + c(l).hex8), nt(e.addon, { wait: 250, settingId: e.setting.id })));
  }
  yr(() => {
    $a(() => import("./color-picker-B5642zST.js"), [], import.meta.url).catch(() => {});
  });
  function v(M) {
    M.preventDefault(), we(s, !0), queueMicrotask(() => f());
  }
  var m = to(),
    p = h(m);
  let _, k;
  var ee = y(p, 2);
  {
    var ne = (M) => {
      var D = eo();
      T(() => an(D, "value", e.value ?? e.setting.default)),
        an(D, "id", "picker"),
        T(() => an(D, "formats", c(d))),
        T(() => an(D, "no_alpha", String(t()))),
        an(D, "dir", "ltr");
      let J;
      pn(
        D,
        (j) => we(l, j),
        () => c(l)
      ),
        T(() => {
          (J = jt(D, "", J, { display: c(a) ? "" : "none" })), (D.dir = D.dir);
        }),
        E(M, D);
    };
    W(ee, (M) => {
      c(s) && M(ne);
    });
  }
  T(() => {
    (_ = Pe(p, 1, "setting-input color", null, _, { "action-disabled": !e.addon._enabled, open: c(a) })),
      (p.disabled = n()),
      (k = jt(p, "", k, { "background-color": c(o) }));
  }),
    H("click", m, () => we(s, !0)),
    H("mouseover", m, () => we(s, !0)),
    Ca("focus", m, () => we(s, !0)),
    H("click", p, v),
    E(r, m),
    _t();
}
Ft(["click", "mouseover"]);
/**!
 * Sortable 1.15.7
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */ function ro(r, e, t) {
  return (
    (e = so(e)) in r
      ? Object.defineProperty(r, e, { value: t, enumerable: !0, configurable: !0, writable: !0 })
      : (r[e] = t),
    r
  );
}
function Pt() {
  return (
    (Pt = Object.assign
      ? Object.assign.bind()
      : function (r) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e];
            for (var n in t) ({}).hasOwnProperty.call(t, n) && (r[n] = t[n]);
          }
          return r;
        }),
    Pt.apply(null, arguments)
  );
}
function Yr(r, e) {
  var t = Object.keys(r);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(r);
    e &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(r, i).enumerable;
      })),
      t.push.apply(t, n);
  }
  return t;
}
function Mt(r) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2
      ? Yr(Object(t), !0).forEach(function (n) {
          ro(r, n, t[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(t))
        : Yr(Object(t)).forEach(function (n) {
            Object.defineProperty(r, n, Object.getOwnPropertyDescriptor(t, n));
          });
  }
  return r;
}
function io(r, e) {
  if (r == null) return {};
  var t,
    n,
    i = ao(r, e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(r);
    for (n = 0; n < a.length; n++)
      (t = a[n]), e.indexOf(t) === -1 && {}.propertyIsEnumerable.call(r, t) && (i[t] = r[t]);
  }
  return i;
}
function ao(r, e) {
  if (r == null) return {};
  var t = {};
  for (var n in r)
    if ({}.hasOwnProperty.call(r, n)) {
      if (e.indexOf(n) !== -1) continue;
      t[n] = r[n];
    }
  return t;
}
function oo(r, e) {
  if (typeof r != "object" || !r) return r;
  var t = r[Symbol.toPrimitive];
  if (t !== void 0) {
    var n = t.call(r, e);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(r);
}
function so(r) {
  var e = oo(r, "string");
  return typeof e == "symbol" ? e : e + "";
}
function or(r) {
  "@babel/helpers - typeof";
  return (
    (or =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          }),
    or(r)
  );
}
var lo = "1.15.7";
function Tt(r) {
  if (typeof window < "u" && window.navigator) return !!navigator.userAgent.match(r);
}
var Rt = Tt(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),
  _n = Tt(/Edge/i),
  Kr = Tt(/firefox/i),
  fn = Tt(/safari/i) && !Tt(/chrome/i) && !Tt(/android/i),
  Sr = Tt(/iP(ad|od|hone)/i),
  mi = Tt(/chrome/i) && Tt(/android/i),
  vi = { capture: !1, passive: !1 };
function le(r, e, t) {
  r.addEventListener(e, t, !Rt && vi);
}
function oe(r, e, t) {
  r.removeEventListener(e, t, !Rt && vi);
}
function Ln(r, e) {
  if (e) {
    if ((e[0] === ">" && (e = e.substring(1)), r))
      try {
        if (r.matches) return r.matches(e);
        if (r.msMatchesSelector) return r.msMatchesSelector(e);
        if (r.webkitMatchesSelector) return r.webkitMatchesSelector(e);
      } catch {
        return !1;
      }
    return !1;
  }
}
function pi(r) {
  return r.host && r !== document && r.host.nodeType && r.host !== r ? r.host : r.parentNode;
}
function xt(r, e, t, n) {
  if (r) {
    t = t || document;
    do {
      if ((e != null && (e[0] === ">" ? r.parentNode === t && Ln(r, e) : Ln(r, e))) || (n && r === t)) return r;
      if (r === t) break;
    } while ((r = pi(r)));
  }
  return null;
}
var Vr = /\s+/g;
function mt(r, e, t) {
  if (r && e)
    if (r.classList) r.classList[t ? "add" : "remove"](e);
    else {
      var n = (" " + r.className + " ").replace(Vr, " ").replace(" " + e + " ", " ");
      r.className = (n + (t ? " " + e : "")).replace(Vr, " ");
    }
}
function X(r, e, t) {
  var n = r && r.style;
  if (n) {
    if (t === void 0)
      return (
        document.defaultView && document.defaultView.getComputedStyle
          ? (t = document.defaultView.getComputedStyle(r, ""))
          : r.currentStyle && (t = r.currentStyle),
        e === void 0 ? t : t[e]
      );
    !(e in n) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), (n[e] = t + (typeof t == "string" ? "" : "px"));
  }
}
function en(r, e) {
  var t = "";
  if (typeof r == "string") t = r;
  else
    do {
      var n = X(r, "transform");
      n && n !== "none" && (t = n + " " + t);
    } while (!e && (r = r.parentNode));
  var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return i && new i(t);
}
function bi(r, e, t) {
  if (r) {
    var n = r.getElementsByTagName(e),
      i = 0,
      a = n.length;
    if (t) for (; i < a; i++) t(n[i], i);
    return n;
  }
  return [];
}
function Dt() {
  var r = document.scrollingElement;
  return r || document.documentElement;
}
function Ne(r, e, t, n, i) {
  if (!(!r.getBoundingClientRect && r !== window)) {
    var a, o, s, l, d, u, f;
    if (
      (r !== window && r.parentNode && r !== Dt()
        ? ((a = r.getBoundingClientRect()),
          (o = a.top),
          (s = a.left),
          (l = a.bottom),
          (d = a.right),
          (u = a.height),
          (f = a.width))
        : ((o = 0),
          (s = 0),
          (l = window.innerHeight),
          (d = window.innerWidth),
          (u = window.innerHeight),
          (f = window.innerWidth)),
      (e || t) && r !== window && ((i = i || r.parentNode), !Rt))
    )
      do
        if (i && i.getBoundingClientRect && (X(i, "transform") !== "none" || (t && X(i, "position") !== "static"))) {
          var v = i.getBoundingClientRect();
          (o -= v.top + parseInt(X(i, "border-top-width"))),
            (s -= v.left + parseInt(X(i, "border-left-width"))),
            (l = o + a.height),
            (d = s + a.width);
          break;
        }
      while ((i = i.parentNode));
    if (n && r !== window) {
      var m = en(i || r),
        p = m && m.a,
        _ = m && m.d;
      m && ((o /= _), (s /= p), (f /= p), (u /= _), (l = o + u), (d = s + f));
    }
    return { top: o, left: s, bottom: l, right: d, width: f, height: u };
  }
}
function Jr(r, e, t) {
  for (var n = Nt(r, !0), i = Ne(r)[e]; n; ) {
    var a = Ne(n)[t],
      o = void 0;
    if (((o = i >= a), !o)) return n;
    if (n === Dt()) break;
    n = Nt(n, !1);
  }
  return !1;
}
function tn(r, e, t, n) {
  for (var i = 0, a = 0, o = r.children; a < o.length; ) {
    if (
      o[a].style.display !== "none" &&
      o[a] !== Y.ghost &&
      (n || o[a] !== Y.dragged) &&
      xt(o[a], t.draggable, r, !1)
    ) {
      if (i === e) return o[a];
      i++;
    }
    a++;
  }
  return null;
}
function xr(r, e) {
  for (var t = r.lastElementChild; t && (t === Y.ghost || X(t, "display") === "none" || (e && !Ln(t, e))); )
    t = t.previousElementSibling;
  return t || null;
}
function wt(r, e) {
  var t = 0;
  if (!r || !r.parentNode) return -1;
  for (; (r = r.previousElementSibling); )
    r.nodeName.toUpperCase() !== "TEMPLATE" && r !== Y.clone && (!e || Ln(r, e)) && t++;
  return t;
}
function Qr(r) {
  var e = 0,
    t = 0,
    n = Dt();
  if (r)
    do {
      var i = en(r),
        a = i.a,
        o = i.d;
      (e += r.scrollLeft * a), (t += r.scrollTop * o);
    } while (r !== n && (r = r.parentNode));
  return [e, t];
}
function co(r, e) {
  for (var t in r)
    if (r.hasOwnProperty(t)) {
      for (var n in e) if (e.hasOwnProperty(n) && e[n] === r[t][n]) return Number(t);
    }
  return -1;
}
function Nt(r, e) {
  if (!r || !r.getBoundingClientRect) return Dt();
  var t = r,
    n = !1;
  do
    if (t.clientWidth < t.scrollWidth || t.clientHeight < t.scrollHeight) {
      var i = X(t);
      if (
        (t.clientWidth < t.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll")) ||
        (t.clientHeight < t.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll"))
      ) {
        if (!t.getBoundingClientRect || t === document.body) return Dt();
        if (n || e) return t;
        n = !0;
      }
    }
  while ((t = t.parentNode));
  return Dt();
}
function uo(r, e) {
  if (r && e) for (var t in e) e.hasOwnProperty(t) && (r[t] = e[t]);
  return r;
}
function Qn(r, e) {
  return (
    Math.round(r.top) === Math.round(e.top) &&
    Math.round(r.left) === Math.round(e.left) &&
    Math.round(r.height) === Math.round(e.height) &&
    Math.round(r.width) === Math.round(e.width)
  );
}
var gn;
function _i(r, e) {
  return function () {
    if (!gn) {
      var t = arguments,
        n = this;
      t.length === 1 ? r.call(n, t[0]) : r.apply(n, t),
        (gn = setTimeout(function () {
          gn = void 0;
        }, e));
    }
  };
}
function fo() {
  clearTimeout(gn), (gn = void 0);
}
function yi(r, e, t) {
  (r.scrollLeft += e), (r.scrollTop += t);
}
function wi(r) {
  var e = window.Polymer,
    t = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(r).cloneNode(!0) : t ? t(r).clone(!0)[0] : r.cloneNode(!0);
}
function Ei(r, e, t) {
  var n = {};
  return (
    Array.from(r.children).forEach(function (i) {
      var a, o, s, l;
      if (!(!xt(i, e.draggable, r, !1) || i.animated || i === t)) {
        var d = Ne(i);
        (n.left = Math.min((a = n.left) !== null && a !== void 0 ? a : 1 / 0, d.left)),
          (n.top = Math.min((o = n.top) !== null && o !== void 0 ? o : 1 / 0, d.top)),
          (n.right = Math.max((s = n.right) !== null && s !== void 0 ? s : -1 / 0, d.right)),
          (n.bottom = Math.max((l = n.bottom) !== null && l !== void 0 ? l : -1 / 0, d.bottom));
      }
    }),
    (n.width = n.right - n.left),
    (n.height = n.bottom - n.top),
    (n.x = n.left),
    (n.y = n.top),
    n
  );
}
var ct = "Sortable" + new Date().getTime();
function go() {
  var r = [],
    e;
  return {
    captureAnimationState: function () {
      if (((r = []), !!this.options.animation)) {
        var n = [].slice.call(this.el.children);
        n.forEach(function (i) {
          if (!(X(i, "display") === "none" || i === Y.ghost)) {
            r.push({ target: i, rect: Ne(i) });
            var a = Mt({}, r[r.length - 1].rect);
            if (i.thisAnimationDuration) {
              var o = en(i, !0);
              o && ((a.top -= o.f), (a.left -= o.e));
            }
            i.fromRect = a;
          }
        });
      }
    },
    addAnimationState: function (n) {
      r.push(n);
    },
    removeAnimationState: function (n) {
      r.splice(co(r, { target: n }), 1);
    },
    animateAll: function (n) {
      var i = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof n == "function" && n();
        return;
      }
      var a = !1,
        o = 0;
      r.forEach(function (s) {
        var l = 0,
          d = s.target,
          u = d.fromRect,
          f = Ne(d),
          v = d.prevFromRect,
          m = d.prevToRect,
          p = s.rect,
          _ = en(d, !0);
        _ && ((f.top -= _.f), (f.left -= _.e)),
          (d.toRect = f),
          d.thisAnimationDuration &&
            Qn(v, f) &&
            !Qn(u, f) &&
            (p.top - f.top) / (p.left - f.left) === (u.top - f.top) / (u.left - f.left) &&
            (l = mo(p, v, m, i.options)),
          Qn(f, u) || ((d.prevFromRect = u), (d.prevToRect = f), l || (l = i.options.animation), i.animate(d, p, f, l)),
          l &&
            ((a = !0),
            (o = Math.max(o, l)),
            clearTimeout(d.animationResetTimer),
            (d.animationResetTimer = setTimeout(function () {
              (d.animationTime = 0),
                (d.prevFromRect = null),
                (d.fromRect = null),
                (d.prevToRect = null),
                (d.thisAnimationDuration = null);
            }, l)),
            (d.thisAnimationDuration = l));
      }),
        clearTimeout(e),
        a
          ? (e = setTimeout(function () {
              typeof n == "function" && n();
            }, o))
          : typeof n == "function" && n(),
        (r = []);
    },
    animate: function (n, i, a, o) {
      if (o) {
        X(n, "transition", ""), X(n, "transform", "");
        var s = en(this.el),
          l = s && s.a,
          d = s && s.d,
          u = (i.left - a.left) / (l || 1),
          f = (i.top - a.top) / (d || 1);
        (n.animatingX = !!u),
          (n.animatingY = !!f),
          X(n, "transform", "translate3d(" + u + "px," + f + "px,0)"),
          (this.forRepaintDummy = ho(n)),
          X(n, "transition", "transform " + o + "ms" + (this.options.easing ? " " + this.options.easing : "")),
          X(n, "transform", "translate3d(0,0,0)"),
          typeof n.animated == "number" && clearTimeout(n.animated),
          (n.animated = setTimeout(function () {
            X(n, "transition", ""), X(n, "transform", ""), (n.animated = !1), (n.animatingX = !1), (n.animatingY = !1);
          }, o));
      }
    },
  };
}
function ho(r) {
  return r.offsetWidth;
}
function mo(r, e, t, n) {
  return (
    (Math.sqrt(Math.pow(e.top - r.top, 2) + Math.pow(e.left - r.left, 2)) /
      Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2))) *
    n.animation
  );
}
var Vt = [],
  qn = { initializeByDefault: !0 },
  yn = {
    mount: function (e) {
      for (var t in qn) qn.hasOwnProperty(t) && !(t in e) && (e[t] = qn[t]);
      Vt.forEach(function (n) {
        if (n.pluginName === e.pluginName)
          throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
      }),
        Vt.push(e);
    },
    pluginEvent: function (e, t, n) {
      var i = this;
      (this.eventCanceled = !1),
        (n.cancel = function () {
          i.eventCanceled = !0;
        });
      var a = e + "Global";
      Vt.forEach(function (o) {
        t[o.pluginName] &&
          (t[o.pluginName][a] && t[o.pluginName][a](Mt({ sortable: t }, n)),
          t.options[o.pluginName] && t[o.pluginName][e] && t[o.pluginName][e](Mt({ sortable: t }, n)));
      });
    },
    initializePlugins: function (e, t, n, i) {
      Vt.forEach(function (s) {
        var l = s.pluginName;
        if (!(!e.options[l] && !s.initializeByDefault)) {
          var d = new s(e, t, e.options);
          (d.sortable = e), (d.options = e.options), (e[l] = d), Pt(n, d.defaults);
        }
      });
      for (var a in e.options)
        if (e.options.hasOwnProperty(a)) {
          var o = this.modifyOption(e, a, e.options[a]);
          typeof o < "u" && (e.options[a] = o);
        }
    },
    getEventProperties: function (e, t) {
      var n = {};
      return (
        Vt.forEach(function (i) {
          typeof i.eventProperties == "function" && Pt(n, i.eventProperties.call(t[i.pluginName], e));
        }),
        n
      );
    },
    modifyOption: function (e, t, n) {
      var i;
      return (
        Vt.forEach(function (a) {
          e[a.pluginName] &&
            a.optionListeners &&
            typeof a.optionListeners[t] == "function" &&
            (i = a.optionListeners[t].call(e[a.pluginName], n));
        }),
        i
      );
    },
  };
function vo(r) {
  var e = r.sortable,
    t = r.rootEl,
    n = r.name,
    i = r.targetEl,
    a = r.cloneEl,
    o = r.toEl,
    s = r.fromEl,
    l = r.oldIndex,
    d = r.newIndex,
    u = r.oldDraggableIndex,
    f = r.newDraggableIndex,
    v = r.originalEvent,
    m = r.putSortable,
    p = r.extraEventProperties;
  if (((e = e || (t && t[ct])), !!e)) {
    var _,
      k = e.options,
      ee = "on" + n.charAt(0).toUpperCase() + n.substr(1);
    window.CustomEvent && !Rt && !_n
      ? (_ = new CustomEvent(n, { bubbles: !0, cancelable: !0 }))
      : ((_ = document.createEvent("Event")), _.initEvent(n, !0, !0)),
      (_.to = o || t),
      (_.from = s || t),
      (_.item = i || t),
      (_.clone = a),
      (_.oldIndex = l),
      (_.newIndex = d),
      (_.oldDraggableIndex = u),
      (_.newDraggableIndex = f),
      (_.originalEvent = v),
      (_.pullMode = m ? m.lastPutMode : void 0);
    var ne = Mt(Mt({}, p), yn.getEventProperties(n, e));
    for (var M in ne) _[M] = ne[M];
    t && t.dispatchEvent(_), k[ee] && k[ee].call(e, _);
  }
}
var po = ["evt"],
  lt = function (e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
      i = n.evt,
      a = io(n, po);
    yn.pluginEvent.bind(Y)(
      e,
      t,
      Mt(
        {
          dragEl: x,
          parentEl: Te,
          ghostEl: Q,
          rootEl: De,
          nextEl: Yt,
          lastDownEl: Mn,
          cloneEl: ke,
          cloneHidden: Bt,
          dragStarted: sn,
          putSortable: Ke,
          activeSortable: Y.active,
          originalEvent: i,
          oldIndex: Zt,
          oldDraggableIndex: hn,
          newIndex: vt,
          newDraggableIndex: Lt,
          hideGhostForTarget: Ai,
          unhideGhostForTarget: Ci,
          cloneNowHidden: function () {
            Bt = !0;
          },
          cloneNowShown: function () {
            Bt = !1;
          },
          dispatchSortableEvent: function (s) {
            tt({ sortable: t, name: s, originalEvent: i });
          },
        },
        a
      )
    );
  };
function tt(r) {
  vo(
    Mt(
      {
        putSortable: Ke,
        cloneEl: ke,
        targetEl: x,
        rootEl: De,
        oldIndex: Zt,
        oldDraggableIndex: hn,
        newIndex: vt,
        newDraggableIndex: Lt,
      },
      r
    )
  );
}
var x,
  Te,
  Q,
  De,
  Yt,
  Mn,
  ke,
  Bt,
  Zt,
  vt,
  hn,
  Lt,
  En,
  Ke,
  Qt = !1,
  Bn = !1,
  Nn = [],
  Gt,
  St,
  Zn,
  $n,
  qr,
  Zr,
  sn,
  Jt,
  mn,
  vn = !1,
  Sn = !1,
  kn,
  qe,
  er = [],
  sr = !1,
  jn = [],
  Wn = typeof document < "u",
  xn = Sr,
  $r = _n || Rt ? "cssFloat" : "float",
  bo = Wn && !mi && !Sr && "draggable" in document.createElement("div"),
  Si = (function () {
    if (Wn) {
      if (Rt) return !1;
      var r = document.createElement("x");
      return (r.style.cssText = "pointer-events:auto"), r.style.pointerEvents === "auto";
    }
  })(),
  xi = function (e, t) {
    var n = X(e),
      i =
        parseInt(n.width) -
        parseInt(n.paddingLeft) -
        parseInt(n.paddingRight) -
        parseInt(n.borderLeftWidth) -
        parseInt(n.borderRightWidth),
      a = tn(e, 0, t),
      o = tn(e, 1, t),
      s = a && X(a),
      l = o && X(o),
      d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + Ne(a).width,
      u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + Ne(o).width;
    if (n.display === "flex")
      return n.flexDirection === "column" || n.flexDirection === "column-reverse" ? "vertical" : "horizontal";
    if (n.display === "grid") return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
    if (a && s.float && s.float !== "none") {
      var f = s.float === "left" ? "left" : "right";
      return o && (l.clear === "both" || l.clear === f) ? "vertical" : "horizontal";
    }
    return a &&
      (s.display === "block" ||
        s.display === "flex" ||
        s.display === "table" ||
        s.display === "grid" ||
        (d >= i && n[$r] === "none") ||
        (o && n[$r] === "none" && d + u > i))
      ? "vertical"
      : "horizontal";
  },
  _o = function (e, t, n) {
    var i = n ? e.left : e.top,
      a = n ? e.right : e.bottom,
      o = n ? e.width : e.height,
      s = n ? t.left : t.top,
      l = n ? t.right : t.bottom,
      d = n ? t.width : t.height;
    return i === s || a === l || i + o / 2 === s + d / 2;
  },
  yo = function (e, t) {
    var n;
    return (
      Nn.some(function (i) {
        var a = i[ct].options.emptyInsertThreshold;
        if (!(!a || xr(i))) {
          var o = Ne(i),
            s = e >= o.left - a && e <= o.right + a,
            l = t >= o.top - a && t <= o.bottom + a;
          if (s && l) return (n = i);
        }
      }),
      n
    );
  },
  Ii = function (e) {
    function t(a, o) {
      return function (s, l, d, u) {
        var f = s.options.group.name && l.options.group.name && s.options.group.name === l.options.group.name;
        if (a == null && (o || f)) return !0;
        if (a == null || a === !1) return !1;
        if (o && a === "clone") return a;
        if (typeof a == "function") return t(a(s, l, d, u), o)(s, l, d, u);
        var v = (o ? s : l).options.group.name;
        return a === !0 || (typeof a == "string" && a === v) || (a.join && a.indexOf(v) > -1);
      };
    }
    var n = {},
      i = e.group;
    (!i || or(i) != "object") && (i = { name: i }),
      (n.name = i.name),
      (n.checkPull = t(i.pull, !0)),
      (n.checkPut = t(i.put)),
      (n.revertClone = i.revertClone),
      (e.group = n);
  },
  Ai = function () {
    !Si && Q && X(Q, "display", "none");
  },
  Ci = function () {
    !Si && Q && X(Q, "display", "");
  };
Wn &&
  !mi &&
  document.addEventListener(
    "click",
    function (r) {
      if (Bn)
        return (
          r.preventDefault(),
          r.stopPropagation && r.stopPropagation(),
          r.stopImmediatePropagation && r.stopImmediatePropagation(),
          (Bn = !1),
          !1
        );
    },
    !0
  );
var Xt = function (e) {
    if (x) {
      e = e.touches ? e.touches[0] : e;
      var t = yo(e.clientX, e.clientY);
      if (t) {
        var n = {};
        for (var i in e) e.hasOwnProperty(i) && (n[i] = e[i]);
        (n.target = n.rootEl = t), (n.preventDefault = void 0), (n.stopPropagation = void 0), t[ct]._onDragOver(n);
      }
    }
  },
  wo = function (e) {
    x && x.parentNode[ct]._isOutsideThisEl(e.target);
  };
function Y(r, e) {
  if (!(r && r.nodeType && r.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(r));
  (this.el = r), (this.options = e = Pt({}, e)), (r[ct] = this);
  var t = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(r.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    invertSwap: !1,
    invertedSwapThreshold: null,
    removeCloneOnHide: !0,
    direction: function () {
      return xi(r, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function (o, s) {
      o.setData("Text", s.textContent);
    },
    dropBubble: !1,
    dragoverBubble: !1,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: !1,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: !1,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: !1,
    fallbackTolerance: 0,
    fallbackOffset: { x: 0, y: 0 },
    supportPointer: Y.supportPointer !== !1 && "PointerEvent" in window && (!fn || Sr),
    emptyInsertThreshold: 5,
  };
  yn.initializePlugins(this, r, t);
  for (var n in t) !(n in e) && (e[n] = t[n]);
  Ii(e);
  for (var i in this) i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  (this.nativeDraggable = e.forceFallback ? !1 : bo),
    this.nativeDraggable && (this.options.touchStartThreshold = 1),
    e.supportPointer
      ? le(r, "pointerdown", this._onTapStart)
      : (le(r, "mousedown", this._onTapStart), le(r, "touchstart", this._onTapStart)),
    this.nativeDraggable && (le(r, "dragover", this), le(r, "dragenter", this)),
    Nn.push(this.el),
    e.store && e.store.get && this.sort(e.store.get(this) || []),
    Pt(this, go());
}
Y.prototype = {
  constructor: Y,
  _isOutsideThisEl: function (e) {
    !this.el.contains(e) && e !== this.el && (Jt = null);
  },
  _getDirection: function (e, t) {
    return typeof this.options.direction == "function"
      ? this.options.direction.call(this, e, t, x)
      : this.options.direction;
  },
  _onTapStart: function (e) {
    if (e.cancelable) {
      var t = this,
        n = this.el,
        i = this.options,
        a = i.preventOnFilter,
        o = e.type,
        s = (e.touches && e.touches[0]) || (e.pointerType && e.pointerType === "touch" && e),
        l = (s || e).target,
        d = (e.target.shadowRoot && ((e.path && e.path[0]) || (e.composedPath && e.composedPath()[0]))) || l,
        u = i.filter;
      if (
        (Mo(n),
        !x &&
          !((/mousedown|pointerdown/.test(o) && e.button !== 0) || i.disabled) &&
          !d.isContentEditable &&
          !(!this.nativeDraggable && fn && l && l.tagName.toUpperCase() === "SELECT") &&
          ((l = xt(l, i.draggable, n, !1)), !(l && l.animated) && Mn !== l))
      ) {
        if (((Zt = wt(l)), (hn = wt(l, i.draggable)), typeof u == "function")) {
          if (u.call(this, e, l, this)) {
            tt({ sortable: t, rootEl: d, name: "filter", targetEl: l, toEl: n, fromEl: n }),
              lt("filter", t, { evt: e }),
              a && e.preventDefault();
            return;
          }
        } else if (
          u &&
          ((u = u.split(",").some(function (f) {
            if (((f = xt(d, f.trim(), n, !1)), f))
              return (
                tt({ sortable: t, rootEl: f, name: "filter", targetEl: l, fromEl: n, toEl: n }),
                lt("filter", t, { evt: e }),
                !0
              );
          })),
          u)
        ) {
          a && e.preventDefault();
          return;
        }
        (i.handle && !xt(d, i.handle, n, !1)) || this._prepareDragStart(e, s, l);
      }
    }
  },
  _prepareDragStart: function (e, t, n) {
    var i = this,
      a = i.el,
      o = i.options,
      s = a.ownerDocument,
      l;
    if (n && !x && n.parentNode === a) {
      var d = Ne(n);
      if (
        ((De = a),
        (x = n),
        (Te = x.parentNode),
        (Yt = x.nextSibling),
        (Mn = n),
        (En = o.group),
        (Y.dragged = x),
        (Gt = { target: x, clientX: (t || e).clientX, clientY: (t || e).clientY }),
        (qr = Gt.clientX - d.left),
        (Zr = Gt.clientY - d.top),
        (this._lastX = (t || e).clientX),
        (this._lastY = (t || e).clientY),
        (x.style["will-change"] = "all"),
        (l = function () {
          if ((lt("delayEnded", i, { evt: e }), Y.eventCanceled)) {
            i._onDrop();
            return;
          }
          i._disableDelayedDragEvents(),
            !Kr && i.nativeDraggable && (x.draggable = !0),
            i._triggerDragStart(e, t),
            tt({ sortable: i, name: "choose", originalEvent: e }),
            mt(x, o.chosenClass, !0);
        }),
        o.ignore.split(",").forEach(function (u) {
          bi(x, u.trim(), tr);
        }),
        le(s, "dragover", Xt),
        le(s, "mousemove", Xt),
        le(s, "touchmove", Xt),
        o.supportPointer
          ? (le(s, "pointerup", i._onDrop), !this.nativeDraggable && le(s, "pointercancel", i._onDrop))
          : (le(s, "mouseup", i._onDrop), le(s, "touchend", i._onDrop), le(s, "touchcancel", i._onDrop)),
        Kr && this.nativeDraggable && ((this.options.touchStartThreshold = 4), (x.draggable = !0)),
        lt("delayStart", this, { evt: e }),
        o.delay && (!o.delayOnTouchOnly || t) && (!this.nativeDraggable || !(_n || Rt)))
      ) {
        if (Y.eventCanceled) {
          this._onDrop();
          return;
        }
        o.supportPointer
          ? (le(s, "pointerup", i._disableDelayedDrag), le(s, "pointercancel", i._disableDelayedDrag))
          : (le(s, "mouseup", i._disableDelayedDrag),
            le(s, "touchend", i._disableDelayedDrag),
            le(s, "touchcancel", i._disableDelayedDrag)),
          le(s, "mousemove", i._delayedDragTouchMoveHandler),
          le(s, "touchmove", i._delayedDragTouchMoveHandler),
          o.supportPointer && le(s, "pointermove", i._delayedDragTouchMoveHandler),
          (i._dragStartTimer = setTimeout(l, o.delay));
      } else l();
    }
  },
  _delayedDragTouchMoveHandler: function (e) {
    var t = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >=
      Math.floor(this.options.touchStartThreshold / ((this.nativeDraggable && window.devicePixelRatio) || 1)) &&
      this._disableDelayedDrag();
  },
  _disableDelayedDrag: function () {
    x && tr(x), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function () {
    var e = this.el.ownerDocument;
    oe(e, "mouseup", this._disableDelayedDrag),
      oe(e, "touchend", this._disableDelayedDrag),
      oe(e, "touchcancel", this._disableDelayedDrag),
      oe(e, "pointerup", this._disableDelayedDrag),
      oe(e, "pointercancel", this._disableDelayedDrag),
      oe(e, "mousemove", this._delayedDragTouchMoveHandler),
      oe(e, "touchmove", this._delayedDragTouchMoveHandler),
      oe(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function (e, t) {
    (t = t || (e.pointerType == "touch" && e)),
      !this.nativeDraggable || t
        ? this.options.supportPointer
          ? le(document, "pointermove", this._onTouchMove)
          : t
            ? le(document, "touchmove", this._onTouchMove)
            : le(document, "mousemove", this._onTouchMove)
        : (le(x, "dragend", this), le(De, "dragstart", this._onDragStart));
    try {
      document.selection
        ? On(function () {
            document.selection.empty();
          })
        : window.getSelection().removeAllRanges();
    } catch {}
  },
  _dragStarted: function (e, t) {
    if (((Qt = !1), De && x)) {
      lt("dragStarted", this, { evt: t }), this.nativeDraggable && le(document, "dragover", wo);
      var n = this.options;
      !e && mt(x, n.dragClass, !1),
        mt(x, n.ghostClass, !0),
        (Y.active = this),
        e && this._appendGhost(),
        tt({ sortable: this, name: "start", originalEvent: t });
    } else this._nulling();
  },
  _emulateDragOver: function () {
    if (St) {
      (this._lastX = St.clientX), (this._lastY = St.clientY), Ai();
      for (
        var e = document.elementFromPoint(St.clientX, St.clientY), t = e;
        e && e.shadowRoot && ((e = e.shadowRoot.elementFromPoint(St.clientX, St.clientY)), e !== t);

      )
        t = e;
      if ((x.parentNode[ct]._isOutsideThisEl(e), t))
        do {
          if (t[ct]) {
            var n = void 0;
            if (
              ((n = t[ct]._onDragOver({ clientX: St.clientX, clientY: St.clientY, target: e, rootEl: t })),
              n && !this.options.dragoverBubble)
            )
              break;
          }
          e = t;
        } while ((t = pi(t)));
      Ci();
    }
  },
  _onTouchMove: function (e) {
    if (Gt) {
      var t = this.options,
        n = t.fallbackTolerance,
        i = t.fallbackOffset,
        a = e.touches ? e.touches[0] : e,
        o = Q && en(Q, !0),
        s = Q && o && o.a,
        l = Q && o && o.d,
        d = xn && qe && Qr(qe),
        u = (a.clientX - Gt.clientX + i.x) / (s || 1) + (d ? d[0] - er[0] : 0) / (s || 1),
        f = (a.clientY - Gt.clientY + i.y) / (l || 1) + (d ? d[1] - er[1] : 0) / (l || 1);
      if (!Y.active && !Qt) {
        if (n && Math.max(Math.abs(a.clientX - this._lastX), Math.abs(a.clientY - this._lastY)) < n) return;
        this._onDragStart(e, !0);
      }
      if (Q) {
        o ? ((o.e += u - (Zn || 0)), (o.f += f - ($n || 0))) : (o = { a: 1, b: 0, c: 0, d: 1, e: u, f });
        var v = "matrix("
          .concat(o.a, ",")
          .concat(o.b, ",")
          .concat(o.c, ",")
          .concat(o.d, ",")
          .concat(o.e, ",")
          .concat(o.f, ")");
        X(Q, "webkitTransform", v),
          X(Q, "mozTransform", v),
          X(Q, "msTransform", v),
          X(Q, "transform", v),
          (Zn = u),
          ($n = f),
          (St = a);
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function () {
    if (!Q) {
      var e = this.options.fallbackOnBody ? document.body : De,
        t = Ne(x, !0, xn, !0, e),
        n = this.options;
      if (xn) {
        for (qe = e; X(qe, "position") === "static" && X(qe, "transform") === "none" && qe !== document; )
          qe = qe.parentNode;
        qe !== document.body && qe !== document.documentElement
          ? (qe === document && (qe = Dt()), (t.top += qe.scrollTop), (t.left += qe.scrollLeft))
          : (qe = Dt()),
          (er = Qr(qe));
      }
      (Q = x.cloneNode(!0)),
        mt(Q, n.ghostClass, !1),
        mt(Q, n.fallbackClass, !0),
        mt(Q, n.dragClass, !0),
        X(Q, "transition", ""),
        X(Q, "transform", ""),
        X(Q, "box-sizing", "border-box"),
        X(Q, "margin", 0),
        X(Q, "top", t.top),
        X(Q, "left", t.left),
        X(Q, "width", t.width),
        X(Q, "height", t.height),
        X(Q, "opacity", "0.8"),
        X(Q, "position", xn ? "absolute" : "fixed"),
        X(Q, "zIndex", "100000"),
        X(Q, "pointerEvents", "none"),
        (Y.ghost = Q),
        e.appendChild(Q),
        X(
          Q,
          "transform-origin",
          (qr / parseInt(Q.style.width)) * 100 + "% " + (Zr / parseInt(Q.style.height)) * 100 + "%"
        );
    }
  },
  _onDragStart: function (e, t) {
    var n = this,
      i = e.dataTransfer,
      a = n.options;
    if ((lt("dragStart", this, { evt: e }), Y.eventCanceled)) {
      this._onDrop();
      return;
    }
    lt("setupClone", this),
      Y.eventCanceled ||
        ((ke = wi(x)),
        ke.removeAttribute("id"),
        (ke.draggable = !1),
        (ke.style["will-change"] = ""),
        this._hideClone(),
        mt(ke, this.options.chosenClass, !1),
        (Y.clone = ke)),
      (n.cloneId = On(function () {
        lt("clone", n),
          !Y.eventCanceled &&
            (n.options.removeCloneOnHide || De.insertBefore(ke, x), n._hideClone(), tt({ sortable: n, name: "clone" }));
      })),
      !t && mt(x, a.dragClass, !0),
      t
        ? ((Bn = !0), (n._loopId = setInterval(n._emulateDragOver, 50)))
        : (oe(document, "mouseup", n._onDrop),
          oe(document, "touchend", n._onDrop),
          oe(document, "touchcancel", n._onDrop),
          i && ((i.effectAllowed = "move"), a.setData && a.setData.call(n, i, x)),
          le(document, "drop", n),
          X(x, "transform", "translateZ(0)")),
      (Qt = !0),
      (n._dragStartId = On(n._dragStarted.bind(n, t, e))),
      le(document, "selectstart", n),
      (sn = !0),
      window.getSelection().removeAllRanges(),
      fn && X(document.body, "user-select", "none");
  },
  _onDragOver: function (e) {
    var t = this.el,
      n = e.target,
      i,
      a,
      o,
      s = this.options,
      l = s.group,
      d = Y.active,
      u = En === l,
      f = s.sort,
      v = Ke || d,
      m,
      p = this,
      _ = !1;
    if (sr) return;
    function k(de, Ae) {
      lt(
        de,
        p,
        Mt(
          {
            evt: e,
            isOwner: u,
            axis: m ? "vertical" : "horizontal",
            revert: o,
            dragRect: i,
            targetRect: a,
            canSort: f,
            fromSortable: v,
            target: n,
            completed: ne,
            onMove: function (Xe, at) {
              return In(De, t, x, i, Xe, Ne(Xe), e, at);
            },
            changed: M,
          },
          Ae
        )
      );
    }
    function ee() {
      k("dragOverAnimationCapture"), p.captureAnimationState(), p !== v && v.captureAnimationState();
    }
    function ne(de) {
      return (
        k("dragOverCompleted", { insertion: de }),
        de &&
          (u ? d._hideClone() : d._showClone(p),
          p !== v && (mt(x, Ke ? Ke.options.ghostClass : d.options.ghostClass, !1), mt(x, s.ghostClass, !0)),
          Ke !== p && p !== Y.active ? (Ke = p) : p === Y.active && Ke && (Ke = null),
          v === p && (p._ignoreWhileAnimating = n),
          p.animateAll(function () {
            k("dragOverAnimationComplete"), (p._ignoreWhileAnimating = null);
          }),
          p !== v && (v.animateAll(), (v._ignoreWhileAnimating = null))),
        ((n === x && !x.animated) || (n === t && !n.animated)) && (Jt = null),
        !s.dragoverBubble && !e.rootEl && n !== document && (x.parentNode[ct]._isOutsideThisEl(e.target), !de && Xt(e)),
        !s.dragoverBubble && e.stopPropagation && e.stopPropagation(),
        (_ = !0)
      );
    }
    function M() {
      (vt = wt(x)),
        (Lt = wt(x, s.draggable)),
        tt({ sortable: p, name: "change", toEl: t, newIndex: vt, newDraggableIndex: Lt, originalEvent: e });
    }
    if (
      (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(),
      (n = xt(n, s.draggable, t, !0)),
      k("dragOver"),
      Y.eventCanceled)
    )
      return _;
    if (x.contains(e.target) || (n.animated && n.animatingX && n.animatingY) || p._ignoreWhileAnimating === n)
      return ne(!1);
    if (
      ((Bn = !1),
      d &&
        !s.disabled &&
        (u
          ? f || (o = Te !== De)
          : Ke === this || ((this.lastPutMode = En.checkPull(this, d, x, e)) && l.checkPut(this, d, x, e))))
    ) {
      if (((m = this._getDirection(e, n) === "vertical"), (i = Ne(x)), k("dragOverValid"), Y.eventCanceled)) return _;
      if (o)
        return (
          (Te = De),
          ee(),
          this._hideClone(),
          k("revert"),
          Y.eventCanceled || (Yt ? De.insertBefore(x, Yt) : De.appendChild(x)),
          ne(!0)
        );
      var D = xr(t, s.draggable);
      if (!D || (Io(e, m, this) && !D.animated)) {
        if (D === x) return ne(!1);
        if ((D && t === e.target && (n = D), n && (a = Ne(n)), In(De, t, x, i, n, a, e, !!n) !== !1))
          return ee(), D && D.nextSibling ? t.insertBefore(x, D.nextSibling) : t.appendChild(x), (Te = t), M(), ne(!0);
      } else if (D && xo(e, m, this)) {
        var J = tn(t, 0, s, !0);
        if (J === x) return ne(!1);
        if (((n = J), (a = Ne(n)), In(De, t, x, i, n, a, e, !1) !== !1))
          return ee(), t.insertBefore(x, J), (Te = t), M(), ne(!0);
      } else if (n.parentNode === t) {
        a = Ne(n);
        var j = 0,
          A,
          O = x.parentNode !== t,
          R = !_o((x.animated && x.toRect) || i, (n.animated && n.toRect) || a, m),
          G = m ? "top" : "left",
          re = Jr(n, "top", "top") || Jr(x, "top", "top"),
          je = re ? re.scrollTop : void 0;
        Jt !== n && ((A = a[G]), (vn = !1), (Sn = (!R && s.invertSwap) || O)),
          (j = Ao(
            e,
            n,
            a,
            m,
            R ? 1 : s.swapThreshold,
            s.invertedSwapThreshold == null ? s.swapThreshold : s.invertedSwapThreshold,
            Sn,
            Jt === n
          ));
        var Ee;
        if (j !== 0) {
          var Ue = wt(x);
          do (Ue -= j), (Ee = Te.children[Ue]);
          while (Ee && (X(Ee, "display") === "none" || Ee === Q));
        }
        if (j === 0 || Ee === n) return ne(!1);
        (Jt = n), (mn = j);
        var Se = n.nextElementSibling,
          Me = !1;
        Me = j === 1;
        var We = In(De, t, x, i, n, a, e, Me);
        if (We !== !1)
          return (
            (We === 1 || We === -1) && (Me = We === 1),
            (sr = !0),
            setTimeout(So, 30),
            ee(),
            Me && !Se ? t.appendChild(x) : n.parentNode.insertBefore(x, Me ? Se : n),
            re && yi(re, 0, je - re.scrollTop),
            (Te = x.parentNode),
            A !== void 0 && !Sn && (kn = Math.abs(A - Ne(n)[G])),
            M(),
            ne(!0)
          );
      }
      if (t.contains(x)) return ne(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function () {
    oe(document, "mousemove", this._onTouchMove),
      oe(document, "touchmove", this._onTouchMove),
      oe(document, "pointermove", this._onTouchMove),
      oe(document, "dragover", Xt),
      oe(document, "mousemove", Xt),
      oe(document, "touchmove", Xt);
  },
  _offUpEvents: function () {
    var e = this.el.ownerDocument;
    oe(e, "mouseup", this._onDrop),
      oe(e, "touchend", this._onDrop),
      oe(e, "pointerup", this._onDrop),
      oe(e, "pointercancel", this._onDrop),
      oe(e, "touchcancel", this._onDrop),
      oe(document, "selectstart", this);
  },
  _onDrop: function (e) {
    var t = this.el,
      n = this.options;
    if (
      ((vt = wt(x)),
      (Lt = wt(x, n.draggable)),
      lt("drop", this, { evt: e }),
      (Te = x && x.parentNode),
      (vt = wt(x)),
      (Lt = wt(x, n.draggable)),
      Y.eventCanceled)
    ) {
      this._nulling();
      return;
    }
    (Qt = !1),
      (Sn = !1),
      (vn = !1),
      clearInterval(this._loopId),
      clearTimeout(this._dragStartTimer),
      lr(this.cloneId),
      lr(this._dragStartId),
      this.nativeDraggable && (oe(document, "drop", this), oe(t, "dragstart", this._onDragStart)),
      this._offMoveEvents(),
      this._offUpEvents(),
      fn && X(document.body, "user-select", ""),
      X(x, "transform", ""),
      e &&
        (sn && (e.cancelable && e.preventDefault(), !n.dropBubble && e.stopPropagation()),
        Q && Q.parentNode && Q.parentNode.removeChild(Q),
        (De === Te || (Ke && Ke.lastPutMode !== "clone")) && ke && ke.parentNode && ke.parentNode.removeChild(ke),
        x &&
          (this.nativeDraggable && oe(x, "dragend", this),
          tr(x),
          (x.style["will-change"] = ""),
          sn && !Qt && mt(x, Ke ? Ke.options.ghostClass : this.options.ghostClass, !1),
          mt(x, this.options.chosenClass, !1),
          tt({ sortable: this, name: "unchoose", toEl: Te, newIndex: null, newDraggableIndex: null, originalEvent: e }),
          De !== Te
            ? (vt >= 0 &&
                (tt({ rootEl: Te, name: "add", toEl: Te, fromEl: De, originalEvent: e }),
                tt({ sortable: this, name: "remove", toEl: Te, originalEvent: e }),
                tt({ rootEl: Te, name: "sort", toEl: Te, fromEl: De, originalEvent: e }),
                tt({ sortable: this, name: "sort", toEl: Te, originalEvent: e })),
              Ke && Ke.save())
            : vt !== Zt &&
              vt >= 0 &&
              (tt({ sortable: this, name: "update", toEl: Te, originalEvent: e }),
              tt({ sortable: this, name: "sort", toEl: Te, originalEvent: e })),
          Y.active &&
            ((vt == null || vt === -1) && ((vt = Zt), (Lt = hn)),
            tt({ sortable: this, name: "end", toEl: Te, originalEvent: e }),
            this.save()))),
      this._nulling();
  },
  _nulling: function () {
    lt("nulling", this),
      (De =
        x =
        Te =
        Q =
        Yt =
        ke =
        Mn =
        Bt =
        Gt =
        St =
        sn =
        vt =
        Lt =
        Zt =
        hn =
        Jt =
        mn =
        Ke =
        En =
        Y.dragged =
        Y.ghost =
        Y.clone =
        Y.active =
          null);
    var e = this.el;
    jn.forEach(function (t) {
      e.contains(t) && (t.checked = !0);
    }),
      (jn.length = Zn = $n = 0);
  },
  handleEvent: function (e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        x && (this._onDragOver(e), Eo(e));
        break;
      case "selectstart":
        e.preventDefault();
        break;
    }
  },
  toArray: function () {
    for (var e = [], t, n = this.el.children, i = 0, a = n.length, o = this.options; i < a; i++)
      (t = n[i]), xt(t, o.draggable, this.el, !1) && e.push(t.getAttribute(o.dataIdAttr) || Do(t));
    return e;
  },
  sort: function (e, t) {
    var n = {},
      i = this.el;
    this.toArray().forEach(function (a, o) {
      var s = i.children[o];
      xt(s, this.options.draggable, i, !1) && (n[a] = s);
    }, this),
      t && this.captureAnimationState(),
      e.forEach(function (a) {
        n[a] && (i.removeChild(n[a]), i.appendChild(n[a]));
      }),
      t && this.animateAll();
  },
  save: function () {
    var e = this.options.store;
    e && e.set && e.set(this);
  },
  closest: function (e, t) {
    return xt(e, t || this.options.draggable, this.el, !1);
  },
  option: function (e, t) {
    var n = this.options;
    if (t === void 0) return n[e];
    var i = yn.modifyOption(this, e, t);
    typeof i < "u" ? (n[e] = i) : (n[e] = t), e === "group" && Ii(n);
  },
  destroy: function () {
    lt("destroy", this);
    var e = this.el;
    (e[ct] = null),
      oe(e, "mousedown", this._onTapStart),
      oe(e, "touchstart", this._onTapStart),
      oe(e, "pointerdown", this._onTapStart),
      this.nativeDraggable && (oe(e, "dragover", this), oe(e, "dragenter", this)),
      Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function (t) {
        t.removeAttribute("draggable");
      }),
      this._onDrop(),
      this._disableDelayedDragEvents(),
      Nn.splice(Nn.indexOf(this.el), 1),
      (this.el = e = null);
  },
  _hideClone: function () {
    if (!Bt) {
      if ((lt("hideClone", this), Y.eventCanceled)) return;
      X(ke, "display", "none"),
        this.options.removeCloneOnHide && ke.parentNode && ke.parentNode.removeChild(ke),
        (Bt = !0);
    }
  },
  _showClone: function (e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Bt) {
      if ((lt("showClone", this), Y.eventCanceled)) return;
      x.parentNode == De && !this.options.group.revertClone
        ? De.insertBefore(ke, x)
        : Yt
          ? De.insertBefore(ke, Yt)
          : De.appendChild(ke),
        this.options.group.revertClone && this.animate(x, ke),
        X(ke, "display", ""),
        (Bt = !1);
    }
  },
};
function Eo(r) {
  r.dataTransfer && (r.dataTransfer.dropEffect = "move"), r.cancelable && r.preventDefault();
}
function In(r, e, t, n, i, a, o, s) {
  var l,
    d = r[ct],
    u = d.options.onMove,
    f;
  return (
    window.CustomEvent && !Rt && !_n
      ? (l = new CustomEvent("move", { bubbles: !0, cancelable: !0 }))
      : ((l = document.createEvent("Event")), l.initEvent("move", !0, !0)),
    (l.to = e),
    (l.from = r),
    (l.dragged = t),
    (l.draggedRect = n),
    (l.related = i || e),
    (l.relatedRect = a || Ne(e)),
    (l.willInsertAfter = s),
    (l.originalEvent = o),
    r.dispatchEvent(l),
    u && (f = u.call(d, l, o)),
    f
  );
}
function tr(r) {
  r.draggable = !1;
}
function So() {
  sr = !1;
}
function xo(r, e, t) {
  var n = Ne(tn(t.el, 0, t.options, !0)),
    i = Ei(t.el, t.options, Q),
    a = 10;
  return e
    ? r.clientX < i.left - a || (r.clientY < n.top && r.clientX < n.right)
    : r.clientY < i.top - a || (r.clientY < n.bottom && r.clientX < n.left);
}
function Io(r, e, t) {
  var n = Ne(xr(t.el, t.options.draggable)),
    i = Ei(t.el, t.options, Q),
    a = 10;
  return e
    ? r.clientX > i.right + a || (r.clientY > n.bottom && r.clientX > n.left)
    : r.clientY > i.bottom + a || (r.clientX > n.right && r.clientY > n.top);
}
function Ao(r, e, t, n, i, a, o, s) {
  var l = n ? r.clientY : r.clientX,
    d = n ? t.height : t.width,
    u = n ? t.top : t.left,
    f = n ? t.bottom : t.right,
    v = !1;
  if (!o) {
    if (s && kn < d * i) {
      if ((!vn && (mn === 1 ? l > u + (d * a) / 2 : l < f - (d * a) / 2) && (vn = !0), vn)) v = !0;
      else if (mn === 1 ? l < u + kn : l > f - kn) return -mn;
    } else if (l > u + (d * (1 - i)) / 2 && l < f - (d * (1 - i)) / 2) return Co(e);
  }
  return (v = v || o), v && (l < u + (d * a) / 2 || l > f - (d * a) / 2) ? (l > u + d / 2 ? 1 : -1) : 0;
}
function Co(r) {
  return wt(x) < wt(r) ? 1 : -1;
}
function Do(r) {
  for (var e = r.tagName + r.className + r.src + r.href + r.textContent, t = e.length, n = 0; t--; )
    n += e.charCodeAt(t);
  return n.toString(36);
}
function Mo(r) {
  jn.length = 0;
  for (var e = r.getElementsByTagName("input"), t = e.length; t--; ) {
    var n = e[t];
    n.checked && jn.push(n);
  }
}
function On(r) {
  return setTimeout(r, 0);
}
function lr(r) {
  return clearTimeout(r);
}
Wn &&
  le(document, "touchmove", function (r) {
    (Y.active || Qt) && r.cancelable && r.preventDefault();
  });
Y.utils = {
  on: le,
  off: oe,
  css: X,
  find: bi,
  is: function (e, t) {
    return !!xt(e, t, e, !1);
  },
  extend: uo,
  throttle: _i,
  closest: xt,
  toggleClass: mt,
  clone: wi,
  index: wt,
  nextTick: On,
  cancelNextTick: lr,
  detectDirection: xi,
  getChild: tn,
  expando: ct,
};
Y.get = function (r) {
  return r[ct];
};
Y.mount = function () {
  for (var r = arguments.length, e = new Array(r), t = 0; t < r; t++) e[t] = arguments[t];
  e[0].constructor === Array && (e = e[0]),
    e.forEach(function (n) {
      if (!n.prototype || !n.prototype.constructor)
        throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(n));
      n.utils && (Y.utils = Mt(Mt({}, Y.utils), n.utils)), yn.mount(n);
    });
};
Y.create = function (r, e) {
  return new Y(r, e);
};
Y.version = lo;
var Be = [],
  ln,
  dr,
  cr = !1,
  nr,
  rr,
  Un,
  dn;
function ko() {
  function r() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0,
    };
    for (var e in this) e.charAt(0) === "_" && typeof this[e] == "function" && (this[e] = this[e].bind(this));
  }
  return (
    (r.prototype = {
      dragStarted: function (t) {
        var n = t.originalEvent;
        this.sortable.nativeDraggable
          ? le(document, "dragover", this._handleAutoScroll)
          : this.options.supportPointer
            ? le(document, "pointermove", this._handleFallbackAutoScroll)
            : n.touches
              ? le(document, "touchmove", this._handleFallbackAutoScroll)
              : le(document, "mousemove", this._handleFallbackAutoScroll);
      },
      dragOverCompleted: function (t) {
        var n = t.originalEvent;
        !this.options.dragOverBubble && !n.rootEl && this._handleAutoScroll(n);
      },
      drop: function () {
        this.sortable.nativeDraggable
          ? oe(document, "dragover", this._handleAutoScroll)
          : (oe(document, "pointermove", this._handleFallbackAutoScroll),
            oe(document, "touchmove", this._handleFallbackAutoScroll),
            oe(document, "mousemove", this._handleFallbackAutoScroll)),
          ei(),
          Tn(),
          fo();
      },
      nulling: function () {
        (Un = dr = ln = cr = dn = nr = rr = null), (Be.length = 0);
      },
      _handleFallbackAutoScroll: function (t) {
        this._handleAutoScroll(t, !0);
      },
      _handleAutoScroll: function (t, n) {
        var i = this,
          a = (t.touches ? t.touches[0] : t).clientX,
          o = (t.touches ? t.touches[0] : t).clientY,
          s = document.elementFromPoint(a, o);
        if (((Un = t), n || this.options.forceAutoScrollFallback || _n || Rt || fn)) {
          ir(t, this.options, s, n);
          var l = Nt(s, !0);
          cr &&
            (!dn || a !== nr || o !== rr) &&
            (dn && ei(),
            (dn = setInterval(function () {
              var d = Nt(document.elementFromPoint(a, o), !0);
              d !== l && ((l = d), Tn()), ir(t, i.options, d, n);
            }, 10)),
            (nr = a),
            (rr = o));
        } else {
          if (!this.options.bubbleScroll || Nt(s, !0) === Dt()) {
            Tn();
            return;
          }
          ir(t, this.options, Nt(s, !1), !1);
        }
      },
    }),
    Pt(r, { pluginName: "scroll", initializeByDefault: !0 })
  );
}
function Tn() {
  Be.forEach(function (r) {
    clearInterval(r.pid);
  }),
    (Be = []);
}
function ei() {
  clearInterval(dn);
}
var ir = _i(function (r, e, t, n) {
    if (e.scroll) {
      var i = (r.touches ? r.touches[0] : r).clientX,
        a = (r.touches ? r.touches[0] : r).clientY,
        o = e.scrollSensitivity,
        s = e.scrollSpeed,
        l = Dt(),
        d = !1,
        u;
      dr !== t && ((dr = t), Tn(), (ln = e.scroll), (u = e.scrollFn), ln === !0 && (ln = Nt(t, !0)));
      var f = 0,
        v = ln;
      do {
        var m = v,
          p = Ne(m),
          _ = p.top,
          k = p.bottom,
          ee = p.left,
          ne = p.right,
          M = p.width,
          D = p.height,
          J = void 0,
          j = void 0,
          A = m.scrollWidth,
          O = m.scrollHeight,
          R = X(m),
          G = m.scrollLeft,
          re = m.scrollTop;
        m === l
          ? ((J = M < A && (R.overflowX === "auto" || R.overflowX === "scroll" || R.overflowX === "visible")),
            (j = D < O && (R.overflowY === "auto" || R.overflowY === "scroll" || R.overflowY === "visible")))
          : ((J = M < A && (R.overflowX === "auto" || R.overflowX === "scroll")),
            (j = D < O && (R.overflowY === "auto" || R.overflowY === "scroll")));
        var je = J && (Math.abs(ne - i) <= o && G + M < A) - (Math.abs(ee - i) <= o && !!G),
          Ee = j && (Math.abs(k - a) <= o && re + D < O) - (Math.abs(_ - a) <= o && !!re);
        if (!Be[f]) for (var Ue = 0; Ue <= f; Ue++) Be[Ue] || (Be[Ue] = {});
        (Be[f].vx != je || Be[f].vy != Ee || Be[f].el !== m) &&
          ((Be[f].el = m),
          (Be[f].vx = je),
          (Be[f].vy = Ee),
          clearInterval(Be[f].pid),
          (je != 0 || Ee != 0) &&
            ((d = !0),
            (Be[f].pid = setInterval(
              function () {
                n && this.layer === 0 && Y.active._onTouchMove(Un);
                var Se = Be[this.layer].vy ? Be[this.layer].vy * s : 0,
                  Me = Be[this.layer].vx ? Be[this.layer].vx * s : 0;
                (typeof u == "function" &&
                  u.call(Y.dragged.parentNode[ct], Me, Se, r, Un, Be[this.layer].el) !== "continue") ||
                  yi(Be[this.layer].el, Me, Se);
              }.bind({ layer: f }),
              24
            )))),
          f++;
      } while (e.bubbleScroll && v !== l && (v = Nt(v, !1)));
      cr = d;
    }
  }, 30),
  Di = function (e) {
    var t = e.originalEvent,
      n = e.putSortable,
      i = e.dragEl,
      a = e.activeSortable,
      o = e.dispatchSortableEvent,
      s = e.hideGhostForTarget,
      l = e.unhideGhostForTarget;
    if (t) {
      var d = n || a;
      s();
      var u = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t,
        f = document.elementFromPoint(u.clientX, u.clientY);
      l(), d && !d.el.contains(f) && (o("spill"), this.onSpill({ dragEl: i, putSortable: n }));
    }
  };
function Ir() {}
Ir.prototype = {
  startIndex: null,
  dragStart: function (e) {
    var t = e.oldDraggableIndex;
    this.startIndex = t;
  },
  onSpill: function (e) {
    var t = e.dragEl,
      n = e.putSortable;
    this.sortable.captureAnimationState(), n && n.captureAnimationState();
    var i = tn(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(t, i) : this.sortable.el.appendChild(t),
      this.sortable.animateAll(),
      n && n.animateAll();
  },
  drop: Di,
};
Pt(Ir, { pluginName: "revertOnSpill" });
function Ar() {}
Ar.prototype = {
  onSpill: function (e) {
    var t = e.dragEl,
      n = e.putSortable,
      i = n || this.sortable;
    i.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), i.animateAll();
  },
  drop: Di,
};
Pt(Ar, { pluginName: "removeOnSpill" });
Y.mount(new ko());
Y.mount(Ar, Ir);
var Oo = C(
    '<div><img class="icon-type setting-help-icon" alt=""/> <span class="tooltiptext tooltiptexttop"> </span></div>'
  ),
  To = C(
    '<div class="setting-table-row"><div class="setting-table-options"><button type="button"><img class="icon-type" alt=""/></button> <button type="button" class="icon-button handle" tabindex="-1"><img class="icon-type" alt=""/></button> <button type="button"><img class="icon-type" alt=""/></button></div> <div class="setting-table-row-settings"></div> <div class="setting-table-options"><button type="button" class="icon-button"><img class="icon-type" alt=""/></button></div></div>'
  ),
  Po = C('<li tabindex="0" role="menuitem"> </li>'),
  Fo = C(
    '<div class="setting-table"><div class="setting-table-list"></div> <div class="split-button setting-table-dropdown dropdown-parent"><button type="button" class="large-button split-button-button"><img class="icon-type" draggable="false" alt=""/> </button> <!></div></div>'
  ),
  Ro = C('<input type="checkbox" class="switch blue"/>'),
  Lo = C('<div><input type="radio"/> <label class="filter-option"> </label></div>'),
  Bo = C('<div class="filter-options" role="radiogroup"></div>'),
  No = C('<input type="number" class="setting-input number" min="0"/>'),
  jo = C('<input type="number" class="setting-input number"/>'),
  Uo = C('<input type="text" class="setting-input string"/>'),
  Ho = C(
    '<button type="button" class="large-button clear-button"><img class="icon-type" draggable="false" alt=""/></button>'
  ),
  zo = C("<div><!> <!></div>"),
  Wo = C('<div><div class="setting-label-container"><div class="setting-label"></div> <!> <!></div> <!></div>');
function Mi(r, e) {
  bt(e, !0);
  const t = [];
  let n = At(e, "addonSettings", 7);
  const i = q(() => ["table", "boolean", "select"].includes(e.setting.type)),
    a = q(() => e.settingPath.length > 1),
    o = q(() => `${e.groupId}-${e.addon._addonId}-${e.settingPath.join("-")}`),
    s = q(
      () =>
        !!(
          !e.setting.if ||
          (e.setting.if.addonEnabled &&
            (Array.isArray(e.setting.if.addonEnabled) ? e.setting.if.addonEnabled : [e.setting.if.addonEnabled]).some(
              (A) => g.manifestsById[A]?._enabled === !0
            )) ||
          (e.setting.if.settings &&
            Object.keys(e.setting.if.settings).some((A) =>
              (Array.isArray(e.setting.if.settings[A]) ? e.setting.if.settings[A] : [e.setting.if.settings[A]]).some(
                (R) => n()[A] === R
              )
            ))
        )
    ),
    l = q(
      () =>
        !c(a) &&
        e.addon.presets &&
        e.addon.presets.some(
          (j) =>
            Object.prototype.hasOwnProperty.call(j.values, e.setting.id) &&
            (e.setting.type === "color"
              ? j.values[e.setting.id].toLowerCase() !== e.setting.default.toLowerCase()
              : j.values[e.setting.id] !== e.setting.default)
        )
    ),
    d = q(() => {
      if (!e.addon.latestUpdate) return !1;
      const j = chrome.runtime.getManifest(),
        [A, O] = j.version.split("."),
        [R, G] = e.addon.latestUpdate.version.split(".");
      return A !== R || O !== G ? !1 : !!e.addon.latestUpdate.newSettings?.includes(e.setting.id);
    });
  function u() {
    const j = e.setting.name,
      A = /([\\]*)(@|#)([a-zA-Z0-9.\-\/_]*)/g;
    return j.replace(A, (O) => {
      if (O[0] === "\\") return O.slice(1);
      if (O[0] === "@")
        return `<img class="inline-icon" src="${chrome.runtime.getURL(`images/icons/${O.split("@")[1]}`)}" draggable="false"/>`;
      if (O[0] === "#")
        return `<img class="inline-icon" src="${chrome.runtime.getURL(`addons/${e.addon._addonId}/${O.split("#")[1]}`)}" draggable="false"/>`;
    });
  }
  function f(j) {
    return `${c(o)}-${j.id}`;
  }
  function v(j) {
    j.target.validity.valid || (n()[e.setting.id] = e.setting.default);
  }
  let m = null,
    p = ut(null);
  function _(j, A) {
    const O = n()[e.setting.id];
    O.splice(A, 0, O.splice(j, 1)[0]), nt(e.addon);
    const R = document.activeElement;
    setTimeout(() => R?.focus?.(), 0);
  }
  function k(j) {
    n()[e.setting.id].splice(j, 1), nt(e.addon);
  }
  function ee(j = {}) {
    const A = Object.assign(
      {},
      e.setting.row.reduce((O, R) => ((O[R.id] = R.default), O), {}),
      j
    );
    n()[e.setting.id].push(A), nt(e.addon);
  }
  function ne(j) {
    (n()[e.setting.id] = j), nt(e.addon);
  }
  ft(
    () => (
      e.setting.type === "table" &&
        c(p) &&
        !m &&
        (m = new Y(c(p), {
          handle: ".handle",
          animation: 300,
          onUpdate: (j) => _(j.oldIndex, j.newIndex),
          disabled: !e.addon._enabled,
        })),
      () => {
        m?.destroy?.(), (m = null);
      }
    )
  ),
    ft(() => {
      m && m.option("disabled", !e.addon._enabled);
    });
  var M = pt(),
    D = ze(M);
  {
    var J = (j) => {
      var A = Wo();
      let O;
      var R = h(A),
        G = h(R);
      Da(G, u, !0);
      var re = y(G, 2);
      {
        var je = (de) => {
          var Ae = Oo();
          let Ge;
          var Xe = h(Ae);
          I(Xe, "src", chrome.runtime.getURL("images/icons/help.svg"));
          var at = y(Xe, 2),
            kt = h(at);
          T(() => {
            I(Ae, "tabindex", e.addon._enabled ? 0 : -1),
              (Ge = Pe(Ae, 1, "", null, Ge, { tooltip: e.addon._enabled })),
              F(kt, e.setting.description);
          }),
            E(de, Ae);
        };
        W(re, (de) => {
          e.setting.description && de(je);
        });
      }
      var Ee = y(re, 2);
      {
        var Ue = (de) => {
          ar(de, { tag: "new" });
        };
        W(Ee, (de) => {
          c(d) && de(Ue);
        });
      }
      var Se = y(R, 2);
      {
        var Me = (de) => {
            var Ae = pt(),
              Ge = ze(Ae);
            {
              var Xe = (Ve) => {
                  var He = Fo(),
                    Ze = h(He);
                  rt(
                    Ze,
                    21,
                    () => n()[e.setting.id],
                    $t,
                    (Re, yt, Oe) => {
                      var Ct = To(),
                        Ot = h(Ct),
                        Je = h(Ot);
                      Pe(Je, 1, "icon-button", null, {}, { disabled: Oe === 0 });
                      var gt = h(Je);
                      I(gt, "src", chrome.runtime.getURL("images/icons/move-up.svg"));
                      var et = y(Je, 2),
                        st = h(et);
                      I(st, "src", chrome.runtime.getURL("images/icons/drag.svg"));
                      var Qe = y(et, 2);
                      let b;
                      var S = h(Qe);
                      I(S, "src", chrome.runtime.getURL("images/icons/move-down.svg"));
                      var U = y(Ot, 2);
                      rt(
                        U,
                        21,
                        () => e.setting.row,
                        (ue) => ue.id,
                        (ue, se) => {
                          {
                            let _e = q(() => [...e.settingPath, Oe, c(se).id]);
                            Mi(ue, {
                              get addon() {
                                return e.addon;
                              },
                              get groupId() {
                                return e.groupId;
                              },
                              get setting() {
                                return c(se);
                              },
                              get settingPath() {
                                return c(_e);
                              },
                              get addonSettings() {
                                return c(yt);
                              },
                            });
                          }
                        }
                      );
                      var L = y(U, 2),
                        B = h(L),
                        me = h(B);
                      I(me, "src", chrome.runtime.getURL("images/icons/close.svg")),
                        T(
                          (ue, se, _e) => {
                            (Je.disabled = !e.addon._enabled || Oe === 0),
                              I(Je, "title", ue),
                              (et.disabled = !e.addon._enabled),
                              (Qe.disabled = !e.addon._enabled || Oe === n()[e.setting.id].length - 1),
                              (b = Pe(Qe, 1, "icon-button", null, b, {
                                disabled: Oe === n()[e.setting.id].length - 1,
                              })),
                              I(Qe, "title", se),
                              (B.disabled = !e.addon._enabled),
                              I(B, "title", _e);
                          },
                          [() => N("moveUp"), () => N("moveDown"), () => N("deleteRow")]
                        ),
                        H("click", Je, () => _(Oe, Oe - 1)),
                        H("click", Qe, () => _(Oe, Oe + 1)),
                        H("click", B, () => k(Oe)),
                        E(Re, Ct);
                    }
                  ),
                    pn(
                      Ze,
                      (Re) => we(p, Re),
                      () => c(p)
                    );
                  var $e = y(Ze, 2),
                    ot = h($e),
                    ae = h(ot);
                  I(ae, "src", chrome.runtime.getURL("images/icons/plus.svg"));
                  var P = y(ae),
                    te = y(ot, 2);
                  {
                    var Fe = (Re) => {
                      {
                        let yt = q(() => !e.addon._enabled),
                          Oe = q(() => N("addPresetRow"));
                        Er(Re, {
                          buttonClass: "large-button split-button-dropdown",
                          get disabled() {
                            return c(yt);
                          },
                          get buttonTitle() {
                            return c(Oe);
                          },
                          children: (Ct, Ot) => {
                            var Je = pt(),
                              gt = ze(Je);
                            rt(
                              gt,
                              17,
                              () => e.setting.presets,
                              (et) => et.id ?? et.name,
                              (et, st) => {
                                var Qe = Po(),
                                  b = h(Qe);
                                T(() => F(b, c(st).name)),
                                  H("click", Qe, () => ee(c(st).values)),
                                  H("keydown", Qe, (S) => S.key === "Enter" && ee(c(st).values)),
                                  E(et, Qe);
                              }
                            ),
                              E(Ct, Je);
                          },
                          $$slots: { default: !0 },
                        });
                      }
                    };
                    W(te, (Re) => {
                      e.setting.presets && Re(Fe);
                    });
                  }
                  T(
                    (Re) => {
                      (ot.disabled = !e.addon._enabled), F(P, ` ${Re ?? ""}`);
                    },
                    [() => N("addRow")]
                  ),
                    H("click", ot, () => ee()),
                    E(Ve, He);
                },
                at = (Ve) => {
                  var He = Ro();
                  T(() => (He.disabled = !e.addon._enabled)),
                    H("change", He, () => nt(e.addon)),
                    wr(
                      He,
                      () => n()[e.setting.id],
                      (Ze) => (n()[e.setting.id] = Ze)
                    ),
                    E(Ve, He);
                },
                kt = (Ve) => {
                  var He = Bo();
                  rt(
                    He,
                    21,
                    () => e.setting.potentialValues,
                    (Ze) => Ze.id,
                    (Ze, $e) => {
                      var ot = Lo(),
                        ae = h(ot),
                        P,
                        te = y(ae, 2),
                        Fe = h(te);
                      T(
                        (Re, yt) => {
                          I(ae, "name", c(o)),
                            I(ae, "id", Re),
                            (ae.disabled = !e.addon._enabled),
                            P !== (P = c($e).id) && (ae.value = (ae.__value = c($e).id) ?? ""),
                            I(te, "for", yt),
                            F(Fe, c($e).name);
                        },
                        [() => f(c($e)), () => f(c($e))]
                      ),
                        H("change", ae, () => nt(e.addon)),
                        Ma(
                          t,
                          [],
                          ae,
                          () => (c($e).id, n()[e.setting.id]),
                          (Re) => (n()[e.setting.id] = Re)
                        ),
                        E(Ze, ot);
                    }
                  ),
                    E(Ve, He);
                };
              W(Ge, (Ve) => {
                e.setting.type === "table"
                  ? Ve(Xe)
                  : e.setting.type === "boolean"
                    ? Ve(at, 1)
                    : e.setting.type === "select" && Ve(kt, 2);
              });
            }
            E(de, Ae);
          },
          We = (de) => {
            var Ae = zo();
            let Ge;
            var Xe = h(Ae);
            {
              var at = (ae) => {
                  var P = No();
                  T(() => (P.disabled = !e.addon._enabled)),
                    H("change", P, (te) => {
                      v(te), nt(e.addon);
                    }),
                    Dn(
                      P,
                      () => n()[e.setting.id],
                      (te) => (n()[e.setting.id] = te)
                    ),
                    E(ae, P);
                },
                kt = (ae) => {
                  var P = jo();
                  T(() => {
                    (P.disabled = !e.addon._enabled), I(P, "min", e.setting.min), I(P, "max", e.setting.max);
                  }),
                    H("change", P, (te) => {
                      v(te), nt(e.addon);
                    }),
                    Dn(
                      P,
                      () => n()[e.setting.id],
                      (te) => (n()[e.setting.id] = te)
                    ),
                    E(ae, P);
                },
                Ve = (ae) => {
                  var P = Uo();
                  T(() => {
                    (P.disabled = !e.addon._enabled),
                      I(P, "placeholder", e.setting.default),
                      I(P, "maxlength", e.setting.max || 100),
                      I(P, "minlength", e.setting.min || 0),
                      (P.required = !!e.setting.min);
                  }),
                    H("change", P, (te) => {
                      v(te), nt(e.addon);
                    }),
                    Dn(
                      P,
                      () => n()[e.setting.id],
                      (te) => (n()[e.setting.id] = te)
                    ),
                    E(ae, P);
                },
                He = (ae) => {
                  {
                    let P = q(() => n()[e.setting.id] || e.setting.default),
                      te = q(() => !e.setting.allowTransparency),
                      Fe = q(() => !e.addon._enabled);
                    no(ae, {
                      get value() {
                        return c(P);
                      },
                      get setting() {
                        return e.setting;
                      },
                      get addon() {
                        return e.addon;
                      },
                      get addonSettings() {
                        return n();
                      },
                      get no_alpha() {
                        return c(te);
                      },
                      get disabled() {
                        return c(Fe);
                      },
                    });
                  }
                };
              W(Xe, (ae) => {
                e.setting.type === "positive_integer"
                  ? ae(at)
                  : e.setting.type === "integer"
                    ? ae(kt, 1)
                    : e.setting.type === "string" || e.setting.type === "untranslated"
                      ? ae(Ve, 2)
                      : e.setting.type === "color" && ae(He, 3);
              });
            }
            var Ze = y(Xe, 2);
            {
              var $e = (ae) => {
                  {
                    let P = q(() => !e.addon._enabled);
                    Qa(ae, {
                      get setting() {
                        return e.setting;
                      },
                      get disabled() {
                        return c(P);
                      },
                      get presets() {
                        return e.addon.presets;
                      },
                      get addon() {
                        return e.addon;
                      },
                      get addonSettings() {
                        return n();
                      },
                    });
                  }
                },
                ot = (ae) => {
                  var P = Ho(),
                    te = h(P);
                  I(te, "src", chrome.runtime.getURL("images/icons/undo.svg")),
                    T(
                      (Fe) => {
                        (P.disabled = !e.addon._enabled), I(P, "title", Fe);
                      },
                      [() => N("reset")]
                    ),
                    H("click", P, () => ne(e.setting.default || "")),
                    E(ae, P);
                };
              W(Ze, (ae) => {
                c(l) ? ae($e) : c(a) || ae(ot, 1);
              });
            }
            T(() => (Ge = Pe(Ae, 1, "setting-input-container dropdown-parent", null, Ge, { "full-radius": c(a) }))),
              E(de, Ae);
          };
        W(Se, (de) => {
          c(i) ? de(Me) : de(We, -1);
        });
      }
      T(
        () =>
          (O = Pe(A, 1, "addon-setting", null, O, {
            "boolean-setting": e.setting.type === "boolean",
            "number-setting": e.setting.type === "integer" || e.setting.type === "positive_integer",
          }))
      ),
        E(j, A);
    };
    W(D, (j) => {
      c(s) && j(J);
    });
  }
  E(r, M), _t();
}
Ft(["click", "keydown", "change"]);
const ki = (r, e) => {
  const t = URL.createObjectURL(e),
    n = Object.assign(document.createElement("a"), { href: t, download: r, type: e.type });
  document.body.appendChild(n), n.click(), n.remove(), URL.revokeObjectURL(t);
};
var Go = C('<div class="preview-placeholder svelte-1oq9lco"><span>Preview unavailable</span></div>');
function Xo(r, e) {
  var t = Go();
  E(r, t);
}
var Yo = C('<div class="preview-placeholder svelte-1on6mma"><span>Preview unavailable</span></div>');
function Ko(r, e) {
  var t = Yo();
  E(r, t);
}
var Vo = C('<div class="preview-placeholder svelte-fes2eb"><span>Preview unavailable</span></div>');
function Jo(r, e) {
  var t = Vo();
  E(r, t);
}
var Qo = C("<span></span>"),
  qo = C('<span class="preset-palette svelte-5yym8q"></span>');
function Zo(r, e) {
  bt(e, !0);
  function t(i) {
    return e.settingData.find((a) => a.id === i)?.name ?? i;
  }
  var n = qo();
  rt(
    n,
    20,
    () => e.options.colors,
    (i) => i,
    (i, a) => {
      var o = Qo();
      let s;
      T(
        (l) => {
          I(o, "title", l), (s = jt(o, "", s, { backgroundColor: e.settings[a] }));
        },
        [() => `${t(a)}: ${e.settings[a]}`]
      ),
        E(i, o);
    }
  ),
    E(r, n),
    _t();
}
var $o = C('<div class="preview-placeholder svelte-14g6qjh"><span>Preview unavailable</span></div>');
function es(r, e) {
  var t = $o();
  E(r, t);
}
function It(r) {
  return {
    r: parseInt(r.substring(1, 3), 16),
    g: parseInt(r.substring(3, 5), 16),
    b: parseInt(r.substring(5, 7), 16),
    a: r.length >= 9 ? parseInt(r.substring(7, 9), 16) / 255 : 1,
  };
}
function An(r) {
  return (r = Math.round(r).toString(16)), r.length === 1 ? `0${r}` : r;
}
function wn(r) {
  const e = An(r.r),
    t = An(r.g),
    n = An(r.b),
    i = r.a !== void 0 ? An(255 * r.a) : "";
  return `#${e}${t}${n}${i}`;
}
function Oi({ h: r, s: e, v: t }) {
  if (e === 0) return { r: 255 * t, g: 255 * t, b: 255 * t };
  (r %= 360), r < 0 && (r += 360);
  const n = r / 60,
    i = Math.floor(n),
    a = t * (1 - e * (1 - n + i)),
    o = t * (1 - e * (n - i)),
    s = t * (1 - e);
  switch (i) {
    case 0:
      return { r: 255 * t, g: 255 * a, b: 255 * s };
    case 1:
      return { r: 255 * o, g: 255 * t, b: 255 * s };
    case 2:
      return { r: 255 * s, g: 255 * t, b: 255 * a };
    case 3:
      return { r: 255 * s, g: 255 * o, b: 255 * t };
    case 4:
      return { r: 255 * a, g: 255 * s, b: 255 * t };
    case 5:
      return { r: 255 * t, g: 255 * s, b: 255 * o };
  }
}
function cn({ r, g: e, b: t }) {
  (r /= 255), (e /= 255), (t /= 255);
  const n = Math.max(r, e, t),
    i = n - Math.min(r, e, t);
  if (i === 0) return { h: 0, s: 0, v: n };
  const a = i / n,
    o = (n - r) / i,
    s = (n - e) / i,
    l = (n - t) / i;
  let d;
  return o ? (s ? l || (d = 4 + s - o) : (d = 2 + o - l)) : (d = l - s), { h: (60 * d) % 360, s: a, v: n };
}
function ur(r) {
  const { r: e, g: t, b: n } = It(r);
  return e * 0.299 + t * 0.587 + n * 0.114;
}
function ts(r, e, t, n) {
  return (
    (n = n !== void 0 ? n : 170),
    typeof n != "number" && (n = ur(n)),
    ur(r) > n ? (e !== void 0 ? e : "#575e75") : t !== void 0 ? t : "#ffffff"
  );
}
function ns(r, e) {
  const { r: t, g: n, b: i, a } = It(r);
  return (
    e.r === void 0 && (e.r = 1),
    e.g === void 0 && (e.g = 1),
    e.b === void 0 && (e.b = 1),
    e.a === void 0 && (e.a = 1),
    wn({ r: e.r * t, g: e.g * n, b: e.b * i, a: e.a * a })
  );
}
function rs(r, e) {
  const { r: t, g: n, b: i, a } = It(r);
  return (
    e.r === void 0 && (e.r = 1),
    e.g === void 0 && (e.g = 1),
    e.b === void 0 && (e.b = 1),
    e.a === void 0 && (e.a = 1),
    wn({
      r: (1 - e.r) * 255 + e.r * t,
      g: (1 - e.g) * 255 + e.g * n,
      b: (1 - e.b) * 255 + e.b * i,
      a: a ? 1 - e.a + e.a * a : 0,
    })
  );
}
function is(r, e) {
  const { r: t, g: n, b: i } = It(r),
    { r: a, g: o, b: s, a: l } = It(e);
  return wn({ r: (1 - l) * t + l * a, g: (1 - l) * n + l * o, b: (1 - l) * i + l * s });
}
function as(r) {
  return r.substring(0, 7);
}
function os(r, e, t) {
  const n = typeof r == "number" ? r : cn(It(r)).h,
    i = typeof r != "number" && cn(It(r)).s === 0 ? 0 : typeof e == "number" ? e : cn(It(e)).s,
    a = typeof t == "number" ? t : cn(It(t)).v;
  return wn(Oi({ h: n, s: i, v: a }));
}
function ss(r) {
  const { r: e, g: t, b: n } = It(r);
  return `url("data:image/svg+xml,
    <svg xmlns='http://www.w3.org/2000/svg'>
      <filter id='recolor'>
        <feColorMatrix color-interpolation-filters='sRGB' values='
          0 0 0 0 ${e / 255}
          0 0 0 0 ${t / 255}
          0 0 0 0 ${n / 255}
          0 0 0 1 0
        '/>
      </filter>
    </svg>#recolor
  ")`
    .split(
      `
`
    )
    .join("");
}
globalThis.__scratchAddonsTextColor = {
  parseHex: It,
  convertToHex: wn,
  convertFromHsv: Oi,
  convertToHsv: cn,
  brightness: ur,
  textColor: ts,
  multiply: ns,
  brighten: rs,
  alphaBlend: is,
  removeAlpha: as,
  makeHsv: os,
  recolorFilter: ss,
};
const {
  parseHex: Kl,
  convertToHex: Vl,
  convertFromHsv: Jl,
  convertToHsv: Ql,
  brightness: ql,
  textColor: ti,
  multiply: Zl,
  brighten: $l,
  alphaBlend: ed,
  removeAlpha: td,
  makeHsv: nd,
  recolorFilter: rd,
} = globalThis.__scratchAddonsTextColor;
var ls = C(
  '<span role="presentation" class="monitor-preset-preview svelte-ttlh8k"><span class="monitor-preset-label svelte-ttlh8k">Aa</span> <span class="monitor-preset-value svelte-ttlh8k">123</span></span>'
);
function ds(r, e) {
  bt(e, !0);
  const t = q(() => {
    const a = e.settings.customValueColor ? e.settings.monitorValueBg : "#ff8c1a";
    return { monitorLabel: ti(e.settings.monitor), value: a, valueText: ti(a) };
  });
  var n = ls();
  let i;
  T(
    () =>
      (i = jt(n, "", i, {
        "--monitor": e.settings.monitor,
        "--monitor-label": c(t).monitorLabel,
        "--value": c(t).value,
        "--value-text": c(t).valueText,
      }))
  ),
    E(r, n),
    _t();
}
var cs = ui("<line></line>"),
  us = ui("<line></line>"),
  fs = C(
    '<div role="presentation" class="dots-preview svelte-x4cpa8"><svg width="100%" height="108" class="svelte-x4cpa8"><defs><pattern id="dots-pattern" patternUnits="userSpaceOnUse"><g stroke="var(--content-text)"><!><!></g></pattern></defs><rect width="100%" height="100%" fill="url(#dots-pattern)"></rect></svg></div>'
  );
function gs(r, e) {
  bt(e, !0);
  const t = q(() => 27 / e.settings.spacingDivisor),
    n = q(
      () =>
        ({ dots: 0.675, crosshairs: c(t) / 2.5, lines: c(t) + 1, vertical: c(t) + 1, horizontal: c(t) + 1 })[
          e.settings.theme
        ] || 0
    );
  var i = fs(),
    a = h(i),
    o = h(a),
    s = h(o),
    l = h(s),
    d = h(l);
  {
    var u = (m) => {
      var p = cs();
      T(() => {
        I(p, "x1", c(t) / 2 - 1), I(p, "x2", c(t) / 2 + 1), I(p, "y1", c(t) / 2), I(p, "y2", c(t) / 2);
      }),
        E(m, p);
    };
    W(d, (m) => {
      e.settings.theme !== "horizontal" && m(u);
    });
  }
  var f = y(d);
  {
    var v = (m) => {
      var p = us();
      T(() => {
        I(p, "x1", c(t) / 2), I(p, "x2", c(t) / 2), I(p, "y1", c(t) / 2 - 1), I(p, "y2", c(t) / 2 + 1);
      }),
        E(m, p);
    };
    W(f, (m) => {
      e.settings.theme !== "vertical" && m(v);
    });
  }
  T(() => {
    I(s, "width", c(t)), I(s, "height", c(t)), I(l, "stroke-width", c(n));
  }),
    E(r, i),
    _t();
}
var hs = C('<span class="tooltiptext tooltiptexttop"> </span>'),
  ms = C('<div class="addon-description" dir="auto"> </div>'),
  vs = C('<li role="menuitem" tabindex="0"> </li> <li role="menuitem" tabindex="0"> </li>', 1),
  ps = C(
    '<div class="split-button dropdown-parent"><button class="icon-button split-button-button"><img class="icon-type" draggable="false" alt=""/></button> <!></div>'
  ),
  bs = C('<div class="addon-message addon-update"><!> </div>'),
  _s = C('<div id="info"><div><img draggable="false" alt=""/> </div></div>'),
  ys = C('<a rel="noreferrer noopener" target="_blank"> </a>'),
  ws = C("<span><!> <!></span>"),
  Es = C('<div class="addon-credits"><span> </span> <!></div>'),
  Ss = C('<div class="addon-license"><a target="_blank"> </a></div>'),
  xs = C('<div><div class="setting-label"> </div> <!></div>'),
  Is = C(
    '<div class="addon-setting"><button type="button" class="large-button"><span class="preset-preview"><!></span> <span> </span></button></div>'
  ),
  As = C('<div><div class="setting-label"> </div> <!></div>'),
  Cs = C('<span><a href="#"> </a></span>'),
  Ds = C(
    '<div class="related-addons"><div class="addon-message"><span class="related-addons-text"> </span> <!></div></div>'
  ),
  Ms = C(
    '<div class="addon-settings"><div class="addon-description-full"> </div> <!> <!> <!> <!> <!> <div><!></div> <!> <!></div>'
  ),
  ks = C(
    '<div class="addon-body"><div class="addon-topbar"><div class="clickable-area" role="button" tabindex="0"><button type="button" class="arrow-button"><img draggable="false" alt=""/></button> <img class="icon-type addon-icon" draggable="false" alt=""/> <div class="addon-name-and-tags"><div class="addon-name tooltip"><span> </span> <!></div><!></div></div> <!> <div class="addon-check"><!> <input type="checkbox" class="switch"/></div></div> <!></div>'
  );
function ni(r, e) {
  bt(e, !0);
  const t = {
    "compact-messages": Xo,
    "dark-www": Ko,
    "editor-dark-mode": Jo,
    palette: Zo,
    "stage-monitor": es,
    "stage-monitor-preset": ds,
    "workspace-dots": gs,
  };
  let n = At(e, "addon", 7);
  const i = () => (g.isIframe ? !1 : e.groupId === "enabled");
  let a = ut(Fn(i())),
    o = ut(Fn(i())),
    s = null,
    l = ut(null);
  const d = q(() => e.visible && (g.searchInput === "" ? e.groupExpanded : !0)),
    u = q(() => {
      const A = {
        editor: "puzzle",
        player: "player",
        community: "web",
        theme: "brush",
        easterEgg: "egg-easter",
        popup: "popup",
      };
      return chrome.runtime.getURL(`images/icons/${A[n()._icon]}.svg`);
    }),
    f = q(() => g.addonSettings[n()._addonId]),
    v = q(() => {
      if (!n().latestUpdate?.temporaryNotice) return !1;
      const A = chrome.runtime.getManifest(),
        [O, R] = A.version.split("."),
        [G, re] = n().latestUpdate.version.split(".");
      return O === G && R === re;
    });
  ft(() => {
    e.groupId, we(a, i(), !0);
  }),
    ft(() => {
      g.searchInput === "" ? we(a, i(), !0) : we(a, !1);
    }),
    ft(() => {
      c(a) && we(o, !0);
    });
  function m(A) {
    if (window.confirm(chrome.i18n.getMessage("confirmPreset"))) {
      for (const O of Object.keys(A.values)) c(f)[O] = A.values[O];
      nt(n());
    }
  }
  function p() {
    const A = Object.assign(document.createElement("input"), { hidden: !0, type: "file", accept: "application/json" });
    A.addEventListener(
      "change",
      async () => {
        const O = await A.files[0].text();
        A.remove();
        let R;
        try {
          if (((R = JSON.parse(O)), !R.addonId)) {
            const G = R?.addons?.[n()._addonId]?.settings;
            if (G) {
              m({ id: "extracted-settings", values: G });
              return;
            }
            throw "Missing addon ID";
          }
          if (R.addonId !== n()._addonId) {
            alert(N("incorrectAddonImport", g.manifestsById[R.addonId]?.name));
            return;
          }
        } catch {
          alert(chrome.i18n.getMessage("importFailed"));
          return;
        }
        m(R);
      },
      { once: !0 }
    ),
      A.addEventListener("cancel", () => A.remove(), { once: !0 }),
      document.body.appendChild(A),
      A.click();
  }
  function _() {
    const A = { addonId: n()._addonId, id: "custom-preset", values: c(f) },
      O = new Blob([JSON.stringify(A)], { type: "application/json" }),
      R = n().name.replaceAll(" ", "-").toLowerCase();
    ki(`${R}.json`, O);
  }
  function k() {
    if (window.confirm(chrome.i18n.getMessage("confirmReset"))) {
      for (const A of n().settings) c(f)[A.id] = JSON.parse(JSON.stringify(A.default));
      nt(n());
    }
  }
  function ee(A) {
    const O = () => {
        const G = !n()._enabled;
        (n()._wasEverEnabled = n()._enabled || G),
          (n()._enabled = G),
          we(
            a,
            g.relatedAddonsOpen
              ? c(a)
              : (g.isIframe && !c(a) && (n().info || []).every((re) => re.type !== "warning")) || A.shiftKey
                ? !1
                : G,
            !0
          ),
          chrome.runtime.sendMessage({ changeEnabledState: { addonId: n()._addonId, newState: G } });
      },
      R = (n().permissions || []).filter((G) => g.browserLevelPermissions.includes(G));
    if (!n()._enabled && n().tags.includes("danger") && !confirm(chrome.i18n.getMessage("dangerWarning", [n().name]))) {
      A.preventDefault();
      return;
    }
    !n()._enabled && R.length
      ? R.every((re) => g.grantedOptionalPermissions.includes(re))
        ? O()
        : (A.preventDefault(),
          g.isIframe
            ? ((g.addonToEnable = n()), (g.showPopupModal = !0))
            : chrome.permissions.request({ permissions: R }, (re) => {
                re && O();
              }))
      : O();
  }
  function ne(A, O) {
    O.preventDefault(),
      document.dispatchEvent(new CustomEvent("sa:openRelated", { detail: { addon: n(), clickedAddon: A } }));
  }
  function M(A) {
    we(l, A, !0);
  }
  yr(() => {
    const A = () => {
      location.hash.replace(/^#addon-/, "") === n()._addonId && we(a, !0);
    };
    return (
      window.addEventListener("hashchange", A, { capture: !1 }),
      setTimeout(A, 0),
      () => window.removeEventListener("hashchange", A)
    );
  });
  var D = pt(),
    J = ze(D);
  {
    var j = (A) => {
      var O = ks(),
        R = h(O),
        G = h(R),
        re = h(G),
        je = h(re);
      I(je, "src", chrome.runtime.getURL("images/icons/expand.svg"));
      let Ee;
      var Ue = y(re, 2),
        Se = y(Ue, 2),
        Me = h(Se),
        We = h(Me),
        de = h(We),
        Ae = y(We, 2);
      {
        var Ge = (P) => {
          var te = hs(),
            Fe = h(te);
          T(() => F(Fe, n()._addonId)), E(P, te);
        };
        W(Ae, (P) => {
          g.devMode && P(Ge);
        });
      }
      var Xe = y(Me);
      rt(
        Xe,
        16,
        () => n().tags,
        (P) => P,
        (P, te) => {
          ar(P, {
            get tag() {
              return te;
            },
          });
        }
      );
      var at = y(G, 2);
      {
        var kt = (P) => {
          var te = ms(),
            Fe = h(te);
          T(() => {
            F(Fe, n().description), (te.dir = te.dir);
          }),
            E(P, te);
        };
        W(at, (P) => {
          c(a) || P(kt);
        });
      }
      var Ve = y(at, 2),
        He = h(Ve);
      {
        var Ze = (P) => {
          var te = ps(),
            Fe = h(te),
            Re = h(Fe);
          I(Re, "src", chrome.runtime.getURL("images/icons/undo.svg"));
          var yt = y(Fe, 2);
          {
            let Oe = q(() => N("importExport"));
            Er(yt, {
              buttonClass: "icon-button split-button-dropdown",
              get buttonTitle() {
                return c(Oe);
              },
              children: (Ct, Ot) => {
                var Je = vs(),
                  gt = ze(Je),
                  et = h(gt),
                  st = y(gt, 2),
                  Qe = h(st);
                T(
                  (b, S) => {
                    F(et, b), F(Qe, S);
                  },
                  [() => N("export"), () => N("import")]
                ),
                  H("click", gt, _),
                  H("keydown", gt, (b) => b.key === "Enter" && _()),
                  H("click", st, p),
                  H("keydown", st, (b) => b.key === "Enter" && p()),
                  E(Ct, Je);
              },
              $$slots: { default: !0 },
            });
          }
          T((Oe) => I(Fe, "title", Oe), [() => N("resetToDefault")]), H("click", Fe, k), E(P, te);
        };
        W(He, (P) => {
          c(a) && n()._enabled && n().settings && P(Ze);
        });
      }
      var $e = y(He, 2),
        ot = y(R, 2);
      {
        var ae = (P) => {
          var te = Ms();
          let Fe;
          var Re = h(te),
            yt = h(Re),
            Oe = y(Re, 2);
          {
            var Ct = (z) => {
              var V = bs(),
                ie = h(V);
              ar(ie, { tag: "new" });
              var ce = y(ie);
              T(() => F(ce, ` ${n().latestUpdate.temporaryNotice ?? ""}`)), E(z, V);
            };
            W(Oe, (z) => {
              c(v) && z(Ct);
            });
          }
          var Ot = y(Oe, 2);
          {
            var Je = (z) => {
              var V = pt(),
                ie = ze(V);
              rt(
                ie,
                17,
                () => n().info,
                $t,
                (ce, Ie) => {
                  var pe = _s(),
                    he = h(pe),
                    xe = h(he),
                    Ce = y(xe);
                  T(
                    (Le) => {
                      Pe(he, 1, `addon-message addon-${c(Ie).type || "info"}`),
                        I(xe, "src", Le),
                        F(Ce, ` ${c(Ie).text ?? ""}`);
                    },
                    [
                      () =>
                        chrome.runtime.getURL(
                          `images/icons/${{ warning: "warning.svg", notice: "notice.svg", info: "help.svg" }[c(Ie).type || "info"]}`
                        ),
                    ]
                  ),
                    E(ce, pe);
                }
              ),
                E(z, V);
            };
            W(Ot, (z) => {
              n().info && z(Je);
            });
          }
          var gt = y(Ot, 2);
          {
            var et = (z) => {
              var V = Es(),
                ie = h(V),
                ce = h(ie),
                Ie = y(ie, 2);
              rt(
                Ie,
                17,
                () => n().credits,
                $t,
                (pe, he) => {
                  var xe = ws(),
                    Ce = h(xe);
                  {
                    var Le = ($) => {
                        var ye = ys(),
                          ge = h(ye);
                        T(() => {
                          I(ye, "href", c(he).link), F(ge, c(he).name);
                        }),
                          E($, ye);
                      },
                      ht = ($) => {
                        var ye = Hr();
                        T(() => F(ye, c(he).name)), E($, ye);
                      };
                    W(Ce, ($) => {
                      c(he).link ? $(Le) : $(ht, -1);
                    });
                  }
                  var w = y(Ce, 2);
                  {
                    var fe = ($) => {
                      var ye = Hr();
                      T(() => F(ye, `(${c(he).note ?? ""})`)), E($, ye);
                    };
                    W(w, ($) => {
                      c(he).note && $(fe);
                    });
                  }
                  E(pe, xe);
                }
              ),
                T((pe) => F(ce, pe), [() => N("creditTo")]),
                E(z, V);
            };
            W(gt, (z) => {
              n().credits && z(et);
            });
          }
          var st = y(gt, 2);
          {
            var Qe = (z) => {
              var V = Ss(),
                ie = h(V),
                ce = h(ie);
              T(
                (Ie, pe) => {
                  I(ie, "href", Ie), F(ce, pe);
                },
                [() => `./licenses.html?libraries=${n().libraries.join(",")}`, () => N("viewLicenses")]
              ),
                E(z, V);
            };
            W(st, (z) => {
              n().libraries?.length && z(Qe);
            });
          }
          var b = y(st, 2);
          {
            var S = (z) => {
              const V = q(() => t[n()._addonId]);
              var ie = xs();
              let ce;
              var Ie = h(ie),
                pe = h(Ie),
                he = y(Ie, 2);
              zr(
                he,
                () => c(V),
                (xe, Ce) => {
                  Ce(xe, {
                    get settings() {
                      return c(f);
                    },
                    hoveredSettingId: s,
                    onAreaHover: M,
                  });
                }
              ),
                T(
                  (xe) => {
                    (ce = Pe(ie, 1, "preview-column", null, ce, { disabled: !n()._enabled })), F(pe, xe);
                  },
                  [() => N("preview")]
                ),
                E(z, ie);
            };
            W(b, (z) => {
              n().addonPreview && !g.isIframe && t[n()._addonId] && z(S);
            });
          }
          var U = y(b, 2);
          let L;
          var B = h(U);
          {
            var me = (z) => {
              var V = pt(),
                ie = ze(V);
              rt(
                ie,
                17,
                () => n().settings,
                (ce) => ce.id,
                (ce, Ie) => {
                  {
                    let pe = q(() => [c(Ie).id]);
                    Mi(ce, {
                      get addon() {
                        return n();
                      },
                      get groupId() {
                        return e.groupId;
                      },
                      get setting() {
                        return c(Ie);
                      },
                      get settingPath() {
                        return c(pe);
                      },
                      get addonSettings() {
                        return c(f);
                      },
                    });
                  }
                }
              ),
                E(z, V);
            };
            W(B, (z) => {
              n().settings && z(me);
            });
          }
          var ue = y(U, 2);
          {
            var se = (z) => {
              var V = As();
              let ie;
              var ce = h(V),
                Ie = h(ce),
                pe = y(ce, 2);
              rt(
                pe,
                17,
                () => n().presets,
                (he) => he.id ?? he.name,
                (he, xe) => {
                  var Ce = Is(),
                    Le = h(Ce),
                    ht = h(Le),
                    w = h(ht);
                  {
                    var fe = (ge) => {
                      const ve = q(() => t[n().presetPreview.type]);
                      var be = pt(),
                        Ye = ze(be);
                      zr(
                        Ye,
                        () => c(ve),
                        (Et, nn) => {
                          nn(Et, {
                            get options() {
                              return n().presetPreview;
                            },
                            get settingData() {
                              return n().settings;
                            },
                            get settings() {
                              return c(xe).values;
                            },
                          });
                        }
                      ),
                        E(ge, be);
                    };
                    W(w, (ge) => {
                      n().presetPreview && t[n().presetPreview.type] && ge(fe);
                    });
                  }
                  var $ = y(ht, 2),
                    ye = h($);
                  T(() => {
                    (Le.disabled = !n()._enabled), I(Le, "title", c(xe).description), F(ye, c(xe).name);
                  }),
                    H("click", Le, () => m(c(xe))),
                    E(he, Ce);
                }
              ),
                T(
                  (he) => {
                    (ie = Pe(V, 1, "presets-column", null, ie, { disabled: !n()._enabled })), F(Ie, he);
                  },
                  [() => N("presets")]
                ),
                E(z, V);
            };
            W(ue, (z) => {
              n().presets && z(se);
            });
          }
          var _e = y(ue, 2);
          {
            var Z = (z) => {
              var V = Ds(),
                ie = h(V),
                ce = h(ie),
                Ie = h(ce),
                pe = y(ce, 2);
              rt(
                pe,
                17,
                () => n()._relatedAddons,
                $t,
                (he, xe) => {
                  var Ce = Cs(),
                    Le = h(Ce),
                    ht = h(Le);
                  T(() => F(ht, c(xe).name)), H("click", Le, (w) => ne(c(xe), w)), E(he, Ce);
                }
              ),
                T((he) => F(Ie, he), [() => N("relatedAddons")]),
                E(z, V);
            };
            W(_e, (z) => {
              n()._relatedAddons && !g.isIframe && z(Z);
            });
          }
          T(() => {
            (Fe = jt(te, "", Fe, { display: c(a) ? "" : "none" })),
              F(yt, n().description),
              (L = Pe(U, 1, "settings-column", null, L, { disabled: !n()._enabled }));
          }),
            E(P, te);
        };
        W(ot, (P) => {
          c(o) && P(ae);
        });
      }
      T(
        (P) => {
          I(O, "id", `addon-${n()._addonId}`),
            I(re, "title", P),
            (Ee = Pe(je, 1, "", null, Ee, { reverted: c(a) })),
            I(Ue, "src", c(u)),
            F(de, n().name);
        },
        [() => N(c(a) ? "collapse" : "expand")]
      ),
        H("click", G, () => we(a, !c(a))),
        H("keydown", G, (P) => P.key === "Enter" && we(a, !c(a))),
        H("click", $e, ee),
        wr(
          $e,
          () => n()._enabled,
          (P) => (n()._enabled = P)
        ),
        E(A, O);
    };
    W(J, (A) => {
      c(d) && A(j);
    });
  }
  E(r, D), _t();
}
Ft(["click", "keydown"]);
var Os = C(
  '<dialog closedby="any" class="modal svelte-7tw4z8"><div class="modal-content svelte-7tw4z8"><div class="modal-header svelte-7tw4z8"><h1> </h1> <button type="button" class="close svelte-7tw4z8"><img draggable="false" alt="" class="svelte-7tw4z8"/></button></div> <!></div></dialog>'
);
function Ts(r, e) {
  bt(e, !0);
  let t = At(e, "modalRef", 15),
    n = ut(null);
  ft(() => {
    t() !== void 0 && t({ showModal: () => c(n)?.showModal(), close: () => c(n)?.close(), el: () => c(n) });
  });
  function i() {
    c(n)?.close();
  }
  var a = Os(),
    o = h(a),
    s = h(o),
    l = h(s),
    d = h(l),
    u = y(l, 2),
    f = h(u);
  I(f, "src", chrome.runtime.getURL("images/icons/close.svg"));
  var v = y(s, 2);
  fi(v, () => e.children ?? ci),
    pn(
      a,
      (m) => we(n, m),
      () => c(n)
    ),
    T(
      (m) => {
        F(d, e.title), I(u, "title", m);
      },
      [() => N("close")]
    ),
    H("click", u, i),
    E(r, a),
    _t();
}
Ft(["click"]);
function Ut(r) {
  return Array.isArray ? Array.isArray(r) : Pi(r) === "[object Array]";
}
function Ps(r) {
  if (typeof r == "string") return r;
  if (typeof r == "bigint") return r.toString();
  const e = r + "";
  return e == "0" && 1 / r == -1 / 0 ? "-0" : e;
}
function fr(r) {
  return r == null ? "" : Ps(r);
}
function it(r) {
  return typeof r == "string";
}
function Pn(r) {
  return typeof r == "number";
}
function Fs(r) {
  return r === !0 || r === !1 || (Rs(r) && Pi(r) == "[object Boolean]");
}
function Ti(r) {
  return typeof r == "object";
}
function Rs(r) {
  return Ti(r) && r !== null;
}
function dt(r) {
  return r != null;
}
function Cn(r) {
  return !r.trim().length;
}
function Pi(r) {
  return r == null ? (r === void 0 ? "[object Undefined]" : "[object Null]") : Object.prototype.toString.call(r);
}
const Ls = "Incorrect 'index' type",
  Bs = (r) => `Invalid value for key ${r}`,
  Ns = (r) => `Pattern length exceeds max of ${r}.`,
  js = (r) => `Missing ${r} property in key`,
  Us = (r) => `Property 'weight' in key '${r}' must be a positive integer`,
  ri = Object.prototype.hasOwnProperty;
class Hs {
  constructor(e) {
    (this._keys = []), (this._keyMap = {});
    let t = 0;
    e.forEach((n) => {
      const i = Fi(n);
      this._keys.push(i), (this._keyMap[i.id] = i), (t += i.weight);
    }),
      this._keys.forEach((n) => {
        n.weight /= t;
      });
  }
  get(e) {
    return this._keyMap[e];
  }
  keys() {
    return this._keys;
  }
  toJSON() {
    return JSON.stringify(this._keys);
  }
}
function Fi(r) {
  let e = null,
    t = null,
    n = null,
    i = 1,
    a = null;
  if (it(r) || Ut(r)) (n = r), (e = ii(r)), (t = gr(r));
  else {
    if (!ri.call(r, "name")) throw new Error(js("name"));
    const o = r.name;
    if (((n = o), ri.call(r, "weight") && ((i = r.weight), i <= 0))) throw new Error(Us(o));
    (e = ii(o)), (t = gr(o)), (a = r.getFn);
  }
  return { path: e, id: t, weight: i, src: n, getFn: a };
}
function ii(r) {
  return Ut(r) ? r : r.split(".");
}
function gr(r) {
  return Ut(r) ? r.join(".") : r;
}
function zs(r, e) {
  const t = [];
  let n = !1;
  const i = (a, o, s, l) => {
    if (dt(a))
      if (!o[s]) t.push(l !== void 0 ? { v: a, i: l } : a);
      else {
        const d = o[s],
          u = a[d];
        if (!dt(u)) return;
        if (s === o.length - 1 && (it(u) || Pn(u) || Fs(u) || typeof u == "bigint"))
          t.push(l !== void 0 ? { v: fr(u), i: l } : fr(u));
        else if (Ut(u)) {
          n = !0;
          for (let f = 0, v = u.length; f < v; f += 1) i(u[f], o, s + 1, f);
        } else o.length && i(u, o, s + 1, l);
      }
  };
  return i(r, it(e) ? e.split(".") : e, 0), n ? t : t[0];
}
const Ws = { includeMatches: !1, findAllMatches: !1, minMatchCharLength: 1 },
  Gs = {
    isCaseSensitive: !1,
    ignoreDiacritics: !1,
    includeScore: !1,
    keys: [],
    shouldSort: !0,
    sortFn: (r, e) => (r.score === e.score ? (r.idx < e.idx ? -1 : 1) : r.score < e.score ? -1 : 1),
  },
  Xs = { location: 0, threshold: 0.6, distance: 100 },
  Ys = {
    useExtendedSearch: !1,
    useTokenSearch: !1,
    getFn: zs,
    ignoreLocation: !1,
    ignoreFieldNorm: !1,
    fieldNormWeight: 1,
  },
  K = Object.freeze({ ...Gs, ...Ws, ...Xs, ...Ys }),
  Ks = /[^ ]+/g;
function Vs(r = 1, e = 3) {
  const t = new Map(),
    n = Math.pow(10, e);
  return {
    get(i) {
      const a = i.match(Ks).length;
      if (t.has(a)) return t.get(a);
      const o = 1 / Math.pow(a, 0.5 * r),
        s = parseFloat(Math.round(o * n) / n);
      return t.set(a, s), s;
    },
    clear() {
      t.clear();
    },
  };
}
class Cr {
  constructor({ getFn: e = K.getFn, fieldNormWeight: t = K.fieldNormWeight } = {}) {
    (this.norm = Vs(t, 3)),
      (this.getFn = e),
      (this.isCreated = !1),
      (this.docs = []),
      (this.keys = []),
      (this._keysMap = {}),
      this.setIndexRecords();
  }
  setSources(e = []) {
    this.docs = e;
  }
  setIndexRecords(e = []) {
    this.records = e;
  }
  setKeys(e = []) {
    (this.keys = e),
      (this._keysMap = {}),
      e.forEach((t, n) => {
        this._keysMap[t.id] = n;
      });
  }
  create() {
    this.isCreated ||
      !this.docs.length ||
      ((this.isCreated = !0),
      it(this.docs[0])
        ? this.docs.forEach((e, t) => {
            this._addString(e, t);
          })
        : this.docs.forEach((e, t) => {
            this._addObject(e, t);
          }),
      this.norm.clear());
  }
  add(e) {
    const t = this.size();
    it(e) ? this._addString(e, t) : this._addObject(e, t);
  }
  removeAt(e) {
    this.records.splice(e, 1);
    for (let t = e, n = this.size(); t < n; t += 1) this.records[t].i -= 1;
  }
  removeAll(e) {
    for (let t = e.length - 1; t >= 0; t -= 1) this.records.splice(e[t], 1);
    for (let t = 0, n = this.records.length; t < n; t += 1) this.records[t].i = t;
  }
  getValueForItemAtKeyId(e, t) {
    return e[this._keysMap[t]];
  }
  size() {
    return this.records.length;
  }
  _addString(e, t) {
    if (!dt(e) || Cn(e)) return;
    const n = { v: e, i: t, n: this.norm.get(e) };
    this.records.push(n);
  }
  _addObject(e, t) {
    const n = { i: t, $: {} };
    this.keys.forEach((i, a) => {
      const o = i.getFn ? i.getFn(e) : this.getFn(e, i.path);
      if (dt(o)) {
        if (Ut(o)) {
          const s = [];
          for (let l = 0, d = o.length; l < d; l += 1) {
            const u = o[l];
            if (dt(u)) {
              if (it(u)) {
                if (!Cn(u)) {
                  const f = { v: u, i: l, n: this.norm.get(u) };
                  s.push(f);
                }
              } else if (dt(u.v)) {
                const f = it(u.v) ? u.v : fr(u.v);
                if (!Cn(f)) {
                  const v = { v: f, i: u.i, n: this.norm.get(f) };
                  s.push(v);
                }
              }
            }
          }
          n.$[a] = s;
        } else if (it(o) && !Cn(o)) {
          const s = { v: o, n: this.norm.get(o) };
          n.$[a] = s;
        }
      }
    }),
      this.records.push(n);
  }
  toJSON() {
    return { keys: this.keys.map(({ getFn: e, ...t }) => t), records: this.records };
  }
}
function Ri(r, e, { getFn: t = K.getFn, fieldNormWeight: n = K.fieldNormWeight } = {}) {
  const i = new Cr({ getFn: t, fieldNormWeight: n });
  return i.setKeys(r.map(Fi)), i.setSources(e), i.create(), i;
}
function Js(r, { getFn: e = K.getFn, fieldNormWeight: t = K.fieldNormWeight } = {}) {
  const { keys: n, records: i } = r,
    a = new Cr({ getFn: e, fieldNormWeight: t });
  return a.setKeys(n), a.setIndexRecords(i), a;
}
function Qs(r = [], e = K.minMatchCharLength) {
  const t = [];
  let n = -1,
    i = -1,
    a = 0;
  for (let o = r.length; a < o; a += 1) {
    const s = r[a];
    s && n === -1 ? (n = a) : !s && n !== -1 && ((i = a - 1), i - n + 1 >= e && t.push([n, i]), (n = -1));
  }
  return r[a - 1] && a - n >= e && t.push([n, a - 1]), t;
}
const Kt = 32;
function qs(
  r,
  e,
  t,
  {
    location: n = K.location,
    distance: i = K.distance,
    threshold: a = K.threshold,
    findAllMatches: o = K.findAllMatches,
    minMatchCharLength: s = K.minMatchCharLength,
    includeMatches: l = K.includeMatches,
    ignoreLocation: d = K.ignoreLocation,
  } = {}
) {
  if (e.length > Kt) throw new Error(Ns(Kt));
  const u = e.length,
    f = r.length,
    v = Math.max(0, Math.min(n, f));
  let m = a,
    p = v;
  const _ = (O, R) => {
      const G = O / u;
      if (d) return G;
      const re = Math.abs(v - R);
      return i ? G + re / i : re ? 1 : G;
    },
    k = s > 1 || l,
    ee = k ? Array(f) : [];
  let ne;
  for (; (ne = r.indexOf(e, p)) > -1; ) {
    const O = _(0, ne);
    if (((m = Math.min(O, m)), (p = ne + u), k)) {
      let R = 0;
      for (; R < u; ) (ee[ne + R] = 1), (R += 1);
    }
  }
  p = -1;
  let M = [],
    D = 1,
    J = u + f;
  const j = 1 << (u - 1);
  for (let O = 0; O < u; O += 1) {
    let R = 0,
      G = J;
    for (; R < G; ) _(O, v + G) <= m ? (R = G) : (J = G), (G = Math.floor((J - R) / 2 + R));
    J = G;
    let re = Math.max(1, v - G + 1);
    const je = o ? f : Math.min(v + G, f) + u,
      Ee = Array(je + 2);
    Ee[je + 1] = (1 << O) - 1;
    for (let Se = je; Se >= re; Se -= 1) {
      const Me = Se - 1,
        We = t[r[Me]];
      if (
        (k && (ee[Me] = +!!We),
        (Ee[Se] = ((Ee[Se + 1] << 1) | 1) & We),
        O && (Ee[Se] |= ((M[Se + 1] | M[Se]) << 1) | 1 | M[Se + 1]),
        Ee[Se] & j && ((D = _(O, Me)), D <= m))
      ) {
        if (((m = D), (p = Me), p <= v)) break;
        re = Math.max(1, 2 * v - p);
      }
    }
    if (_(O + 1, v) > m) break;
    M = Ee;
  }
  const A = { isMatch: p >= 0, score: Math.max(0.001, D) };
  if (k) {
    const O = Qs(ee, s);
    O.length ? l && (A.indices = O) : (A.isMatch = !1);
  }
  return A;
}
function Zs(r) {
  const e = {};
  for (let t = 0, n = r.length; t < n; t += 1) {
    const i = r.charAt(t);
    e[i] = (e[i] || 0) | (1 << (n - t - 1));
  }
  return e;
}
function Dr(r) {
  if (r.length <= 1) return r;
  r.sort((t, n) => t[0] - n[0] || t[1] - n[1]);
  const e = [r[0]];
  for (let t = 1, n = r.length; t < n; t += 1) {
    const i = e[e.length - 1],
      a = r[t];
    a[0] <= i[1] + 1 ? (i[1] = Math.max(i[1], a[1])) : e.push(a);
  }
  return e;
}
const Li = { ł: "l", Ł: "L", đ: "d", Đ: "D", ø: "o", Ø: "O", ħ: "h", Ħ: "H", ŧ: "t", Ŧ: "T", ı: "i", ß: "ss" },
  $s = new RegExp("[" + Object.keys(Li).join("") + "]", "g"),
  bn = String.prototype.normalize
    ? (r) =>
        r
          .normalize("NFD")
          .replace(
            /[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/g,
            ""
          )
          .replace($s, (e) => Li[e])
    : (r) => r;
class Mr {
  constructor(
    e,
    {
      location: t = K.location,
      threshold: n = K.threshold,
      distance: i = K.distance,
      includeMatches: a = K.includeMatches,
      findAllMatches: o = K.findAllMatches,
      minMatchCharLength: s = K.minMatchCharLength,
      isCaseSensitive: l = K.isCaseSensitive,
      ignoreDiacritics: d = K.ignoreDiacritics,
      ignoreLocation: u = K.ignoreLocation,
    } = {}
  ) {
    if (
      ((this.options = {
        location: t,
        threshold: n,
        distance: i,
        includeMatches: a,
        findAllMatches: o,
        minMatchCharLength: s,
        isCaseSensitive: l,
        ignoreDiacritics: d,
        ignoreLocation: u,
      }),
      (e = l ? e : e.toLowerCase()),
      (e = d ? bn(e) : e),
      (this.pattern = e),
      (this.chunks = []),
      !this.pattern.length)
    )
      return;
    const f = (m, p) => {
        this.chunks.push({ pattern: m, alphabet: Zs(m), startIndex: p });
      },
      v = this.pattern.length;
    if (v > Kt) {
      let m = 0;
      const p = v % Kt,
        _ = v - p;
      for (; m < _; ) f(this.pattern.substr(m, Kt), m), (m += Kt);
      if (p) {
        const k = v - Kt;
        f(this.pattern.substr(k), k);
      }
    } else f(this.pattern, 0);
  }
  searchIn(e) {
    const { isCaseSensitive: t, ignoreDiacritics: n, includeMatches: i } = this.options;
    if (((e = t ? e : e.toLowerCase()), (e = n ? bn(e) : e), this.pattern === e)) {
      const _ = { isMatch: !0, score: 0 };
      return i && (_.indices = [[0, e.length - 1]]), _;
    }
    const {
        location: a,
        distance: o,
        threshold: s,
        findAllMatches: l,
        minMatchCharLength: d,
        ignoreLocation: u,
      } = this.options,
      f = [];
    let v = 0,
      m = !1;
    this.chunks.forEach(({ pattern: _, alphabet: k, startIndex: ee }) => {
      const {
        isMatch: ne,
        score: M,
        indices: D,
      } = qs(e, _, k, {
        location: a + ee,
        distance: o,
        threshold: s,
        findAllMatches: l,
        minMatchCharLength: d,
        includeMatches: i,
        ignoreLocation: u,
      });
      ne && (m = !0), (v += M), ne && D && f.push(...D);
    });
    const p = { isMatch: m, score: m ? v / this.chunks.length : 1 };
    return m && i && (p.indices = Dr(f)), p;
  }
}
class Ht {
  constructor(e) {
    this.pattern = e;
  }
  static isMultiMatch(e) {
    return ai(e, this.multiRegex);
  }
  static isSingleMatch(e) {
    return ai(e, this.singleRegex);
  }
  search(e) {
    return { isMatch: !1, score: 1 };
  }
}
function ai(r, e) {
  const t = r.match(e);
  return t ? t[1] : null;
}
class el extends Ht {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "exact";
  }
  static get multiRegex() {
    return /^="(.*)"$/;
  }
  static get singleRegex() {
    return /^=(.*)$/;
  }
  search(e) {
    const t = e === this.pattern;
    return { isMatch: t, score: t ? 0 : 1, indices: [0, this.pattern.length - 1] };
  }
}
class tl extends Ht {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "inverse-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"$/;
  }
  static get singleRegex() {
    return /^!(.*)$/;
  }
  search(e) {
    const n = e.indexOf(this.pattern) === -1;
    return { isMatch: n, score: n ? 0 : 1, indices: [0, e.length - 1] };
  }
}
class nl extends Ht {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "prefix-exact";
  }
  static get multiRegex() {
    return /^\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^\^(.*)$/;
  }
  search(e) {
    const t = e.startsWith(this.pattern);
    return { isMatch: t, score: t ? 0 : 1, indices: [0, this.pattern.length - 1] };
  }
}
class rl extends Ht {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "inverse-prefix-exact";
  }
  static get multiRegex() {
    return /^!\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^!\^(.*)$/;
  }
  search(e) {
    const t = !e.startsWith(this.pattern);
    return { isMatch: t, score: t ? 0 : 1, indices: [0, e.length - 1] };
  }
}
class il extends Ht {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "suffix-exact";
  }
  static get multiRegex() {
    return /^"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^(.*)\$$/;
  }
  search(e) {
    const t = e.endsWith(this.pattern);
    return { isMatch: t, score: t ? 0 : 1, indices: [e.length - this.pattern.length, e.length - 1] };
  }
}
class al extends Ht {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "inverse-suffix-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^!(.*)\$$/;
  }
  search(e) {
    const t = !e.endsWith(this.pattern);
    return { isMatch: t, score: t ? 0 : 1, indices: [0, e.length - 1] };
  }
}
class Bi extends Ht {
  constructor(
    e,
    {
      location: t = K.location,
      threshold: n = K.threshold,
      distance: i = K.distance,
      includeMatches: a = K.includeMatches,
      findAllMatches: o = K.findAllMatches,
      minMatchCharLength: s = K.minMatchCharLength,
      isCaseSensitive: l = K.isCaseSensitive,
      ignoreDiacritics: d = K.ignoreDiacritics,
      ignoreLocation: u = K.ignoreLocation,
    } = {}
  ) {
    super(e),
      (this._bitapSearch = new Mr(e, {
        location: t,
        threshold: n,
        distance: i,
        includeMatches: a,
        findAllMatches: o,
        minMatchCharLength: s,
        isCaseSensitive: l,
        ignoreDiacritics: d,
        ignoreLocation: u,
      }));
  }
  static get type() {
    return "fuzzy";
  }
  static get multiRegex() {
    return /^"(.*)"$/;
  }
  static get singleRegex() {
    return /^(.*)$/;
  }
  search(e) {
    return this._bitapSearch.searchIn(e);
  }
}
class Ni extends Ht {
  constructor(e) {
    super(e);
  }
  static get type() {
    return "include";
  }
  static get multiRegex() {
    return /^'"(.*)"$/;
  }
  static get singleRegex() {
    return /^'(.*)$/;
  }
  search(e) {
    let t = 0,
      n;
    const i = [],
      a = this.pattern.length;
    for (; (n = e.indexOf(this.pattern, t)) > -1; ) (t = n + a), i.push([n, t - 1]);
    const o = !!i.length;
    return { isMatch: o, score: o ? 0 : 1, indices: i };
  }
}
const hr = [el, Ni, nl, rl, al, il, tl, Bi],
  oi = hr.length,
  ol = "\0",
  sl = "|";
function ll(r) {
  const e = [],
    t = r.length;
  let n = 0;
  for (; n < t; ) {
    for (; n < t && r[n] === " "; ) n++;
    if (n >= t) break;
    let i = n;
    for (; i < t && r[i] !== " " && r[i] !== '"'; ) i++;
    if (i < t && r[i] === '"') {
      for (i++; i < t; ) {
        if (r[i] === '"') {
          const a = i + 1;
          if (a >= t || r[a] === " ") {
            i++;
            break;
          }
          if (r[a] === "$" && (a + 1 >= t || r[a + 1] === " ")) {
            i += 2;
            break;
          }
        }
        i++;
      }
      e.push(r.substring(n, i)), (n = i);
    } else {
      for (; i < t && r[i] !== " "; ) i++;
      e.push(r.substring(n, i)), (n = i);
    }
  }
  return e;
}
function dl(r, e = {}) {
  return r
    .replace(/\\\|/g, ol)
    .split(sl)
    .map((n) => {
      const i = n.replace(/\u0000/g, "|"),
        a = ll(i.trim()).filter((s) => s && !!s.trim()),
        o = [];
      for (let s = 0, l = a.length; s < l; s += 1) {
        const d = a[s];
        let u = !1,
          f = -1;
        for (; !u && ++f < oi; ) {
          const v = hr[f],
            m = v.isMultiMatch(d);
          m && (o.push(new v(m, e)), (u = !0));
        }
        if (!u)
          for (f = -1; ++f < oi; ) {
            const v = hr[f],
              m = v.isSingleMatch(d);
            if (m) {
              o.push(new v(m, e));
              break;
            }
          }
      }
      return o;
    });
}
const cl = new Set([Bi.type, Ni.type]);
class ul {
  constructor(
    e,
    {
      isCaseSensitive: t = K.isCaseSensitive,
      ignoreDiacritics: n = K.ignoreDiacritics,
      includeMatches: i = K.includeMatches,
      minMatchCharLength: a = K.minMatchCharLength,
      ignoreLocation: o = K.ignoreLocation,
      findAllMatches: s = K.findAllMatches,
      location: l = K.location,
      threshold: d = K.threshold,
      distance: u = K.distance,
    } = {}
  ) {
    (this.query = null),
      (this.options = {
        isCaseSensitive: t,
        ignoreDiacritics: n,
        includeMatches: i,
        minMatchCharLength: a,
        findAllMatches: s,
        ignoreLocation: o,
        location: l,
        threshold: d,
        distance: u,
      }),
      (e = t ? e : e.toLowerCase()),
      (e = n ? bn(e) : e),
      (this.pattern = e),
      (this.query = dl(this.pattern, this.options));
  }
  static condition(e, t) {
    return t.useExtendedSearch;
  }
  searchIn(e) {
    const t = this.query;
    if (!t) return { isMatch: !1, score: 1 };
    const { includeMatches: n, isCaseSensitive: i, ignoreDiacritics: a } = this.options;
    (e = i ? e : e.toLowerCase()), (e = a ? bn(e) : e);
    let o = 0;
    const s = [];
    let l = 0,
      d = !1;
    for (let u = 0, f = t.length; u < f; u += 1) {
      const v = t[u];
      (s.length = 0), (o = 0), (d = !1);
      for (let m = 0, p = v.length; m < p; m += 1) {
        const _ = v[m],
          { isMatch: k, indices: ee, score: ne } = _.search(e);
        if (k) {
          (o += 1), (l += ne);
          const M = _.constructor.type;
          M.startsWith("inverse") && (d = !0), n && (cl.has(M) ? s.push(...ee) : s.push(ee));
        } else {
          (l = 0), (o = 0), (s.length = 0), (d = !1);
          break;
        }
      }
      if (o) {
        const m = { isMatch: !0, score: l / o };
        return d && (m.hasInverse = !0), n && (m.indices = Dr(s)), m;
      }
    }
    return { isMatch: !1, score: 1 };
  }
}
const mr = [];
function kr(...r) {
  mr.push(...r);
}
function Hn(r, e) {
  for (let t = 0, n = mr.length; t < n; t += 1) {
    const i = mr[t];
    if (i.condition(r, e)) return new i(r, e);
  }
  return new Mr(r, e);
}
const zn = { AND: "$and", OR: "$or" },
  vr = { PATH: "$path", PATTERN: "$val" },
  pr = (r) => !!(r[zn.AND] || r[zn.OR]),
  fl = (r) => !!r[vr.PATH],
  gl = (r) => !Ut(r) && Ti(r) && !pr(r),
  si = (r) => ({ [zn.AND]: Object.keys(r).map((e) => ({ [e]: r[e] })) });
function ji(r, e, { auto: t = !0 } = {}) {
  const n = (i) => {
    if (it(i)) {
      const l = { keyId: null, pattern: i };
      return t && (l.searcher = Hn(i, e)), l;
    }
    const a = Object.keys(i),
      o = fl(i);
    if (!o && a.length > 1 && !pr(i)) return n(si(i));
    if (gl(i)) {
      const l = o ? i[vr.PATH] : a[0],
        d = o ? i[vr.PATTERN] : i[l];
      if (!it(d)) throw new Error(Bs(l));
      const u = { keyId: gr(l), pattern: d };
      return t && (u.searcher = Hn(d, e)), u;
    }
    const s = { children: [], operator: a[0] };
    return (
      a.forEach((l) => {
        const d = i[l];
        Ut(d) &&
          d.forEach((u) => {
            s.children.push(n(u));
          });
      }),
      s
    );
  };
  return pr(r) || (r = si(r)), n(r);
}
function br(r, { ignoreFieldNorm: e = K.ignoreFieldNorm }) {
  let t = 1;
  return (
    r.forEach(({ key: n, norm: i, score: a }) => {
      const o = n ? n.weight : null;
      t *= Math.pow(a === 0 && o ? Number.EPSILON : a, (o || 1) * (e ? 1 : i));
    }),
    t
  );
}
function hl(r, { ignoreFieldNorm: e = K.ignoreFieldNorm }) {
  r.forEach((t) => {
    t.score = br(t.matches, { ignoreFieldNorm: e });
  });
}
class ml {
  constructor(e) {
    (this.limit = e), (this.heap = []);
  }
  get size() {
    return this.heap.length;
  }
  shouldInsert(e) {
    return this.size < this.limit || e < this.heap[0].score;
  }
  insert(e) {
    this.size < this.limit
      ? (this.heap.push(e), this._bubbleUp(this.size - 1))
      : e.score < this.heap[0].score && ((this.heap[0] = e), this._sinkDown(0));
  }
  extractSorted(e) {
    return this.heap.sort(e);
  }
  _bubbleUp(e) {
    const t = this.heap;
    for (; e > 0; ) {
      const n = (e - 1) >> 1;
      if (t[e].score <= t[n].score) break;
      const i = t[e];
      (t[e] = t[n]), (t[n] = i), (e = n);
    }
  }
  _sinkDown(e) {
    const t = this.heap,
      n = t.length;
    let i = e;
    do {
      e = i;
      const a = 2 * e + 1,
        o = 2 * e + 2;
      if ((a < n && t[a].score > t[i].score && (i = a), o < n && t[o].score > t[i].score && (i = o), i !== e)) {
        const s = t[e];
        (t[e] = t[i]), (t[i] = s);
      }
    } while (i !== e);
  }
}
function vl(r, e) {
  const t = r.matches;
  (e.matches = []),
    dt(t) &&
      t.forEach((n) => {
        if (!dt(n.indices) || !n.indices.length) return;
        const { indices: i, value: a } = n,
          o = { indices: i, value: a };
        n.key && (o.key = n.key.src), n.idx > -1 && (o.refIndex = n.idx), e.matches.push(o);
      });
}
function pl(r, e) {
  e.score = r.score;
}
function bl(r, e, { includeMatches: t = K.includeMatches, includeScore: n = K.includeScore } = {}) {
  const i = [];
  return (
    t && i.push(vl),
    n && i.push(pl),
    r.map((a) => {
      const { idx: o } = a,
        s = { item: e[o], refIndex: o };
      return (
        i.length &&
          i.forEach((l) => {
            l(a, s);
          }),
        s
      );
    })
  );
}
const _l = /\b\w+\b/g;
function _r({ isCaseSensitive: r = !1, ignoreDiacritics: e = !1 } = {}) {
  return {
    tokenize(t) {
      return r || (t = t.toLowerCase()), e && (t = bn(t)), t.match(_l) || [];
    },
  };
}
function yl(r, e, t) {
  const n = new Map(),
    i = new Map();
  let a = 0;
  function o(s, l, d, u) {
    const f = t.tokenize(s);
    if (!f.length) return;
    a++;
    const v = new Map();
    for (const m of f) v.set(m, (v.get(m) || 0) + 1);
    for (const [m, p] of v) {
      const _ = { docIdx: l, keyIdx: d, subIdx: u, tf: p };
      let k = n.get(m);
      k || ((k = []), n.set(m, k)), k.push(_), i.set(m, (i.get(m) || 0) + 1);
    }
  }
  for (const s of r) {
    const { i: l, v: d, $: u } = s;
    if (d !== void 0) {
      o(d, l, -1, -1);
      continue;
    }
    if (u)
      for (let f = 0; f < e; f++) {
        const v = u[f];
        if (v)
          if (Array.isArray(v)) for (const m of v) o(m.v, l, f, m.i ?? -1);
          else o(v.v, l, f, -1);
      }
  }
  return { terms: n, fieldCount: a, df: i };
}
function wl(r, e, t, n) {
  const { i, v: a, $: o } = e;
  function s(l, d, u) {
    const f = n.tokenize(l);
    if (!f.length) return;
    r.fieldCount++;
    const v = new Map();
    for (const m of f) v.set(m, (v.get(m) || 0) + 1);
    for (const [m, p] of v) {
      const _ = { docIdx: i, keyIdx: d, subIdx: u, tf: p };
      let k = r.terms.get(m);
      k || ((k = []), r.terms.set(m, k)), k.push(_), r.df.set(m, (r.df.get(m) || 0) + 1);
    }
  }
  if (a !== void 0) {
    s(a, -1, -1);
    return;
  }
  if (o)
    for (let l = 0; l < t; l++) {
      const d = o[l];
      if (d)
        if (Array.isArray(d)) for (const u of d) s(u.v, l, u.i ?? -1);
        else s(d.v, l, -1);
    }
}
function li(r, e) {
  for (const [t, n] of r.terms) {
    const i = n.filter((o) => o.docIdx !== e),
      a = n.length - i.length;
    a > 0 &&
      ((r.fieldCount -= a),
      r.df.set(t, (r.df.get(t) || 0) - a),
      i.length === 0 ? (r.terms.delete(t), r.df.delete(t)) : r.terms.set(t, i));
  }
}
class zt {
  constructor(e, t, n) {
    (this.options = { ...K, ...t }),
      this.options.useExtendedSearch,
      this.options.useTokenSearch,
      (this._keyStore = new Hs(this.options.keys)),
      (this._docs = e),
      (this._myIndex = null),
      (this._invertedIndex = null),
      this.setCollection(e, n),
      (this._lastQuery = null),
      (this._lastSearcher = null);
  }
  _getSearcher(e) {
    if (this._lastQuery === e) return this._lastSearcher;
    const t = this._invertedIndex ? { ...this.options, _invertedIndex: this._invertedIndex } : this.options,
      n = Hn(e, t);
    return (this._lastQuery = e), (this._lastSearcher = n), n;
  }
  setCollection(e, t) {
    if (((this._docs = e), t && !(t instanceof Cr))) throw new Error(Ls);
    if (
      ((this._myIndex =
        t ||
        Ri(this.options.keys, this._docs, {
          getFn: this.options.getFn,
          fieldNormWeight: this.options.fieldNormWeight,
        })),
      this.options.useTokenSearch)
    ) {
      const n = _r({ isCaseSensitive: this.options.isCaseSensitive, ignoreDiacritics: this.options.ignoreDiacritics });
      this._invertedIndex = yl(this._myIndex.records, this._myIndex.keys.length, n);
    }
  }
  add(e) {
    if (dt(e) && (this._docs.push(e), this._myIndex.add(e), this._invertedIndex)) {
      const t = this._myIndex.records[this._myIndex.records.length - 1],
        n = _r({ isCaseSensitive: this.options.isCaseSensitive, ignoreDiacritics: this.options.ignoreDiacritics });
      wl(this._invertedIndex, t, this._myIndex.keys.length, n);
    }
  }
  remove(e = () => !1) {
    const t = [],
      n = [];
    for (let i = 0, a = this._docs.length; i < a; i += 1) e(this._docs[i], i) && (t.push(this._docs[i]), n.push(i));
    if (n.length) {
      if (this._invertedIndex) for (const i of n) li(this._invertedIndex, i);
      for (let i = n.length - 1; i >= 0; i -= 1) this._docs.splice(n[i], 1);
      this._myIndex.removeAll(n);
    }
    return t;
  }
  removeAt(e) {
    this._invertedIndex && li(this._invertedIndex, e);
    const t = this._docs.splice(e, 1)[0];
    return this._myIndex.removeAt(e), t;
  }
  getIndex() {
    return this._myIndex;
  }
  search(e, t) {
    const { limit: n = -1 } = t || {},
      { includeMatches: i, includeScore: a, shouldSort: o, sortFn: s, ignoreFieldNorm: l } = this.options;
    if (it(e) && !e.trim()) {
      let f = this._docs.map((v, m) => ({ item: v, refIndex: m }));
      return Pn(n) && n > -1 && (f = f.slice(0, n)), f;
    }
    const d = Pn(n) && n > 0 && it(e);
    let u;
    if (d) {
      const f = new ml(n);
      it(this._docs[0])
        ? this._searchStringList(e, { heap: f, ignoreFieldNorm: l })
        : this._searchObjectList(e, { heap: f, ignoreFieldNorm: l }),
        (u = f.extractSorted(s));
    } else
      (u = it(e)
        ? it(this._docs[0])
          ? this._searchStringList(e)
          : this._searchObjectList(e)
        : this._searchLogical(e)),
        hl(u, { ignoreFieldNorm: l }),
        o && u.sort(s),
        Pn(n) && n > -1 && (u = u.slice(0, n));
    return bl(u, this._docs, { includeMatches: i, includeScore: a });
  }
  _searchStringList(e, { heap: t, ignoreFieldNorm: n } = {}) {
    const i = this._getSearcher(e),
      { records: a } = this._myIndex,
      o = t ? null : [];
    return (
      a.forEach(({ v: s, i: l, n: d }) => {
        if (!dt(s)) return;
        const { isMatch: u, score: f, indices: v } = i.searchIn(s);
        if (u) {
          const m = { item: s, idx: l, matches: [{ score: f, value: s, norm: d, indices: v }] };
          t ? ((m.score = br(m.matches, { ignoreFieldNorm: n })), t.shouldInsert(m.score) && t.insert(m)) : o.push(m);
        }
      }),
      o
    );
  }
  _searchLogical(e) {
    const t = ji(e, this.options),
      n = (s, l, d) => {
        if (!("children" in s)) {
          const { keyId: m, searcher: p } = s;
          let _;
          return (
            m === null
              ? ((_ = []),
                this._myIndex.keys.forEach((k, ee) => {
                  _.push(...this._findMatches({ key: k, value: l[ee], searcher: p }));
                }))
              : (_ = this._findMatches({
                  key: this._keyStore.get(m),
                  value: this._myIndex.getValueForItemAtKeyId(l, m),
                  searcher: p,
                })),
            _ && _.length ? [{ idx: d, item: l, matches: _ }] : []
          );
        }
        const { children: u, operator: f } = s,
          v = [];
        for (let m = 0, p = u.length; m < p; m += 1) {
          const _ = u[m],
            k = n(_, l, d);
          if (k.length) v.push(...k);
          else if (f === zn.AND) return [];
        }
        return v;
      },
      i = this._myIndex.records,
      a = new Map(),
      o = [];
    return (
      i.forEach(({ $: s, i: l }) => {
        if (dt(s)) {
          const d = n(t, s, l);
          d.length &&
            (a.has(l) || (a.set(l, { idx: l, item: s, matches: [] }), o.push(a.get(l))),
            d.forEach(({ matches: u }) => {
              a.get(l).matches.push(...u);
            }));
        }
      }),
      o
    );
  }
  _searchObjectList(e, { heap: t, ignoreFieldNorm: n } = {}) {
    const i = this._getSearcher(e),
      { keys: a, records: o } = this._myIndex,
      s = t ? null : [];
    return (
      o.forEach(({ $: l, i: d }) => {
        if (!dt(l)) return;
        const u = [];
        let f = !1,
          v = !1;
        if (
          (a.forEach((m, p) => {
            const _ = this._findMatches({ key: m, value: l[p], searcher: i });
            _.length ? (u.push(..._), _[0].hasInverse && (v = !0)) : (f = !0);
          }),
          !(v && f) && u.length)
        ) {
          const m = { idx: d, item: l, matches: u };
          t ? ((m.score = br(m.matches, { ignoreFieldNorm: n })), t.shouldInsert(m.score) && t.insert(m)) : s.push(m);
        }
      }),
      s
    );
  }
  _findMatches({ key: e, value: t, searcher: n }) {
    if (!dt(t)) return [];
    const i = [];
    if (Ut(t))
      t.forEach(({ v: a, i: o, n: s }) => {
        if (!dt(a)) return;
        const { isMatch: l, score: d, indices: u, hasInverse: f } = n.searchIn(a);
        l && i.push({ score: d, key: e, value: a, idx: o, norm: s, indices: u, hasInverse: f });
      });
    else {
      const { v: a, n: o } = t,
        { isMatch: s, score: l, indices: d, hasInverse: u } = n.searchIn(a);
      s && i.push({ score: l, key: e, value: a, norm: o, indices: d, hasInverse: u });
    }
    return i;
  }
}
class El {
  static condition(e, t) {
    return t.useTokenSearch;
  }
  constructor(e, t) {
    (this.options = t),
      (this.analyzer = _r({ isCaseSensitive: t.isCaseSensitive, ignoreDiacritics: t.ignoreDiacritics }));
    const n = this.analyzer.tokenize(e),
      i = t._invertedIndex,
      { df: a, fieldCount: o } = i;
    (this.termSearchers = []), (this.idfWeights = []);
    for (const s of n) {
      this.termSearchers.push(
        new Mr(s, {
          location: t.location,
          threshold: t.threshold,
          distance: t.distance,
          includeMatches: t.includeMatches,
          findAllMatches: t.findAllMatches,
          minMatchCharLength: t.minMatchCharLength,
          isCaseSensitive: t.isCaseSensitive,
          ignoreDiacritics: t.ignoreDiacritics,
          ignoreLocation: !0,
        })
      );
      const l = a.get(s) || 0,
        d = Math.log(1 + (o - l + 0.5) / (l + 0.5));
      this.idfWeights.push(d);
    }
  }
  searchIn(e) {
    if (!this.termSearchers.length) return { isMatch: !1, score: 1 };
    const t = [];
    let n = 0,
      i = 0,
      a = 0;
    for (let l = 0; l < this.termSearchers.length; l++) {
      const d = this.termSearchers[l].searchIn(e),
        u = this.idfWeights[l];
      (i += u), d.isMatch && (a++, (n += u * (1 - d.score)), d.indices && t.push(...d.indices));
    }
    if (a === 0) return { isMatch: !1, score: 1 };
    const o = i > 0 ? 1 - n / i : 0,
      s = { isMatch: !0, score: Math.max(0.001, o) };
    return this.options.includeMatches && t.length && (s.indices = Dr(t)), s;
  }
}
zt.version = "7.3.0";
zt.createIndex = Ri;
zt.parseIndex = Js;
zt.config = K;
zt.match = function (r, e, t) {
  return Hn(r, { ...K, ...t }).searchIn(e);
};
zt.parseQuery = ji;
kr(ul);
kr(El);
zt.use = function (...r) {
  r.forEach((e) => kr(e));
};
const Sl = {
    includeScore: !0,
    threshold: 0.35,
    ignoreLocation: !0,
    useExtendedSearch: !0,
    keys: [
      { name: "name", weight: 1 },
      { name: "_addonId", weight: 1 },
      { name: "description", weight: 0.5 },
      { name: "_english.name", weight: 0.8 },
      { name: "_english.description", weight: 0.3 },
      { name: "settings.name", weight: 0.4 },
      { name: "credits.name", weight: 0.2 },
      { name: "info.text", weight: 0.1 },
      { name: "settings.potentialValues.name", weight: 0.1 },
      { name: "presets.name", weight: 0.1 },
    ],
  },
  xl = {
    name: "",
    description: "",
    tags: [],
    _categories: ["editor"],
    _icon: "editor",
    _displayedAddonId: "",
    _enabled: !0,
    _addonId: "example",
    _groups: ["enabled"],
  },
  Il = /\d|[a-d]/,
  Al = /[e-k]/,
  Cl = (r, e) => {
    const t = JSON.parse(JSON.stringify(r)),
      n = e && e.reduce((a, o) => ((a[o._addonId || o.addonId] = o.manifest || o), a), {}),
      i = { addonSettings1: {}, addonSettings2: {}, addonSettings3: {} };
    for (const [a, o] of Object.entries(t)) {
      if (n && !n[a]) delete t[a];
      else {
        for (const s of Object.keys(o))
          n && !s.startsWith("_") && !n[a].settings?.some((l) => s === l.id) && delete o[s];
        Object.keys(o).length === 0 && delete t[a];
      }
      a[0].match(Il)
        ? (i.addonSettings1[a] = t[a])
        : a[0].match(Al)
          ? (i.addonSettings2[a] = t[a])
          : (i.addonSettings3[a] = t[a]);
    }
    return i;
  };
let on = null;
const di = async () => {
    const r = await chrome.storage.sync.get([
        "globalTheme",
        "addonSettings1",
        "addonSettings2",
        "addonSettings3",
        "addonsEnabled",
      ]),
      e = { ...r.addonSettings1, ...r.addonSettings2, ...r.addonSettings3 },
      t = { core: { lightTheme: r.globalTheme, version: chrome.runtime.getManifest().version_name }, addons: {} };
    for (const n of Object.keys(r.addonsEnabled)) t.addons[n] = { enabled: r.addonsEnabled[n], settings: e[n] || {} };
    return JSON.stringify(t);
  },
  Dl = async (r, e, t, { browserLevelPermissions: n }) => {
    const i = JSON.parse(r),
      { addonsEnabled: a, ...o } = await chrome.storage.sync.get([
        "addonSettings1",
        "addonSettings2",
        "addonSettings3",
        "addonsEnabled",
      ]),
      s = { ...o.addonSettings1, ...o.addonSettings2, ...o.addonSettings3 },
      l = {};
    for (const f of Object.keys(i.addons)) {
      const v = i.addons[f],
        m = e.find((k) => k._addonId === f);
      if (!m) continue;
      const _ = (m.permissions || []).filter((k) => n.includes(k));
      v.enabled && _.length ? (l[f] = _) : (a[f] = v.enabled),
        (s[f] = Object.assign({}, s[f])),
        delete s[f]._version,
        Object.assign(s[f], v.settings);
    }
    on && t.removeEventListener("click", on, { once: !0 });
    let d = null;
    const u = new Promise((f) => {
      d = f;
    });
    return (
      (on = async () => {
        if (((on = null), Object.keys(l).length)) {
          const v = await chrome.permissions.request({ permissions: Object.values(l).flat() });
          Object.keys(l).forEach((m) => {
            a[m] = v;
          });
        }
        const f = chrome.runtime.getManifest().version_name.endsWith("-prerelease");
        await chrome.storage.sync.set({ globalTheme: !!i.core.lightTheme, addonsEnabled: a, ...Cl(s, f ? null : e) }),
          d();
      }),
      t.classList.remove("hidden-button"),
      t.addEventListener("click", on, { once: !0 }),
      u
    );
  };
var Ml = C('<button type="button" id="sidebar-toggle"><img draggable="false" alt=""/></button>'),
  kl = C('<button type="button" class="categories-shrink"><img draggable="false" alt=""/></button>'),
  Ol = C(
    '<div><!> <a class="category" style="margin-top: auto" target="_blank"><img draggable="false" alt=""/> <span> <img draggable="false" alt=""/></span></a> <a class="category" href="https://scratchaddons.com/translate" target="_blank"><img draggable="false" alt=""/> <span> <img draggable="false" alt=""/></span></a> <a class="category" target="_blank"><img draggable="false" alt=""/> <span> <img draggable="false" alt=""/></span></a> <button type="button" class="category" style="margin-top: 12px; margin-bottom: 14px"><img draggable="false" alt=""/> <span> </span></button></div> <!>',
    1
  ),
  Tl = C(
    '<div class="related-addons-header"><button type="button" class="arrow-button"><img draggable="false" alt=""/></button> <span> </span></div>'
  ),
  Pl = C("<span> </span>"),
  Fl = C('<div class="category-header-title"><!></div>'),
  Rl = C('<button type="button" disabled=""><img class="search-icon" alt=""/></button>'),
  Ll = C('<button type="button"><img class="search-icon" alt=""/></button>'),
  Bl = C('<div><input type="text" id="searchBox"/> <!></div>'),
  Nl = C('<p id="search-not-found"> </p>'),
  jl = C(
    '<div id="iframe-fullscreen-suggestion"><span> </span> <button type="button" class="large-button"> </button></div>'
  ),
  Ul = C("<div><!> <!> <!></div>"),
  Hl = C(
    '<button type="button" class="large-button" id="applyLanguageSettingsButton" style="margin-inline-start: 16px"> </button>'
  ),
  zl = C(
    '<div class="addon-block settings-block"><div class="addon-body"><div class="addon-topbar"><img class="icon-type addon-icon" draggable="false" alt=""/> <span class="addon-name-and-tags"> </span></div> <div class="addon-settings"><span class="addon-description-full"> </span> <div class="addon-setting"><div class="filter-selector"><div class="filter-text"> </div> <div class="filter-options" role="radiogroup"><div><input type="radio" name="theme-selector" id="theme-select-light"/> <label for="theme-select-light" class="filter-option"> </label></div> <div><input type="radio" name="theme-selector" id="theme-select-dark"/> <label for="theme-select-dark" class="filter-option"> </label></div></div></div></div></div></div> <div class="addon-body"><div class="addon-topbar"><img draggable="false" alt=""/> <span class="addon-name-and-tags"> </span></div> <div class="addon-settings"><span class="addon-description-full"> </span> <span class="addon-description-full"> </span> <div class="addon-setting export-actions"><div class="export-actions-group"><button type="button" class="large-button"> </button> <button type="button" class="large-button"> </button> <button type="button" class="large-button hidden-button" id="confirmImport"> </button></div> <div class="export-actions-group"><button type="button" class="large-button"> </button></div></div></div></div> <div class="addon-body"><div class="addon-topbar"><img class="icon-type addon-icon" draggable="false" alt=""/> <span class="addon-name-and-tags"> </span></div> <div class="addon-settings"><div class="addon-setting" style="margin-top: 0"><input type="checkbox" class="switch" style="margin-inline-start: 0; margin-inline-end: 8px"/> <span>Show addon names and descriptions in English</span> <div class="badge red"> </div> <!></div></div></div></div> <div class="footer"><p> <a target="_blank"> </a></p> <p><a href="./licenses.html?libraries=icu-message-formatter,svelte,color-picker-web-component,comlink,Sora,fuse,idb,sortable,Roboto" target="_blank"> </a></p></div>',
    1
  ),
  Wl = C(
    '<div class="popup"><div class="label"> </div> <div><button type="button" class="large-button"> </button> <button type="button" class="large-button"> </button></div></div>'
  ),
  Gl = C(
    '<div class="navbar"><!> <img class="logo" alt="Logo" draggable="false"/> <h1> </h1> <button type="button" class="header-button header-end"><img class="theme-switch" draggable="false" alt=""/></button></div> <div class="main"><!> <div class="addons-block"><div class="addons-block-header"><!> <!></div> <div><!> <!></div></div></div> <!> <!>',
    1
  );
function id(r, e) {
  bt(e, !0);
  const t = "#moresettings",
    n = "#addon-";
  let i = ut(null),
    a = null;
  const o = N("search"),
    s = q(() =>
      g.theme ? chrome.runtime.getURL("images/icons/moon.svg") : chrome.runtime.getURL("images/icons/theme.svg")
    ),
    l = q(() => chrome.runtime.getManifest().version),
    d = q(() => `${Math.floor(g.manifests.filter((b) => !b.tags.includes("easterEgg")).length / 5) * 5}+`),
    u = q(() => g.categories.find((b) => b.id === g.selectedCategory)?.name),
    f = q(() => {
      if (!g.searchInput)
        return (
          g.addonListObjs.forEach((L) => {
            L.group.id === "_iframeSearch" ? (L.matchesSearch = !1) : (L.matchesSearch = !0);
          }),
          g.addonListObjs.slice().sort((L, B) => L.naturalIndex - B.naturalIndex)
        );
      if (!a) return [];
      const b = Object.values(
          g.addonListObjs.reduce(
            (L, B) => (
              (!L[B.manifest._addonId] ||
                (L[B.manifest._addonId] && B.group.id !== "featuredNew" && B.group.id !== "new")) &&
                (L[B.manifest._addonId] = B),
              L
            ),
            Object.create(null)
          )
        ),
        U = a
          .search(g.searchInput)
          .sort((L, B) =>
            (L.score < 0.1) ^ (B.score < 0.1) ? (L.score < 0.1 ? -1 : 1) : B.item._enabled - L.item._enabled
          )
          .map((L) => b.find((B) => B.manifest._addonId === L.item._addonId));
      for (const L of b) L.matchesSearch = U.includes(L);
      return b.sort((L, B) => U.indexOf(L) - U.indexOf(B));
    }),
    v = q(() => !c(f).some((b) => b.matchesSearch && b.matchesCategory));
  function m(b) {
    return b.id === "_iframeSearch"
      ? -1
      : g.addonListObjs.filter((S) => S.group === b && S.matchesSearch && S.matchesCategory).length;
  }
  function p(b) {
    const S = g.addonGroups.find((U) => m(U) > 0);
    return b !== S;
  }
  function _(b) {
    ka(b), (g.theme = b);
  }
  function k() {
    g.categoryOpen = !g.categoryOpen;
  }
  function ee() {
    g.searchInputReal = "";
  }
  function ne() {
    ee(), document.querySelector("#searchBox")?.focus();
  }
  function M() {
    c(i)?.showModal(), g.smallMode && (g.categoryOpen = !1), (location.hash = "");
  }
  function D() {
    const b = g.relatedAddonsHistory.pop();
    g.relatedAddonsHistory.length === 0
      ? ((g.relatedAddonsOpen = !1), (g.selectedCategory = g.previousCategory))
      : J(g.relatedAddonsHistory.at(-1), !1),
      j(b._addonId);
  }
  function J(b, S = !0) {
    (g.relatedToAddonName = b.name),
      (g.relatedAddons.length = 0),
      g.relatedAddonsHistory.length === 0 &&
        ((g.previousCategory = g.selectedCategory), (g.selectedCategory = "all"), (g.relatedAddonsOpen = !0)),
      S && g.relatedAddonsHistory.push(b);
    for (const U of b._relatedAddons) g.relatedAddons.push(U);
  }
  function j(b) {
    setTimeout(() => {
      const S = document.getElementById("addon-" + b);
      S &&
        (S.scrollIntoView(), S.classList.add("addon-blink"), setTimeout(() => S.classList.remove("addon-blink"), 2001));
    }, 0);
  }
  function A() {
    di().then((b) => {
      const S = new Blob([b], { type: "application/json" });
      ki("scratch-addons-settings.json", S);
    });
  }
  function O() {
    const b = window.open("about:blank");
    di().then((S) => {
      const U = new Blob([S], { type: "text/plain" });
      b.location.replace(URL.createObjectURL(U));
    });
  }
  function R() {
    const b = Object.assign(document.createElement("input"), { hidden: !0, type: "file", accept: "application/json" });
    b.addEventListener(
      "change",
      async () => {
        const S = b.files[0];
        if (!S) {
          b.remove(), alert(chrome.i18n.getMessage("fileNotSelected"));
          return;
        }
        const U = await S.text();
        b.remove();
        const L = document.getElementById("confirmImport");
        try {
          await Dl(U, g.manifests, L, { browserLevelPermissions: g.browserLevelPermissions });
        } catch (B) {
          console.warn("Error when importing settings:", B),
            L.classList.add("hidden-button"),
            alert(chrome.i18n.getMessage("importFailed"));
          return;
        }
        alert(chrome.i18n.getMessage("importSuccess")), chrome.runtime.reload();
      },
      { once: !0 }
    ),
      document.body.appendChild(b),
      b.click();
  }
  function G() {
    alert(chrome.i18n.getMessage("importSuccess")), chrome.runtime.reload();
  }
  function re() {
    window.open(`${chrome.runtime.getURL("webpages/settings/index.html")}${n}${g.addonToEnable?._addonId ?? ""}`),
      setTimeout(() => window.parent.close(), 100);
  }
  function je() {
    g.showPopupModal = !1;
  }
  ft(() => {
    const b = g.searchInputReal;
    if (b === "") {
      g.searchInput = b;
      return;
    }
    const S = setTimeout(() => {
      g.searchInputReal === b && (g.searchInput = b);
    }, 150);
    return () => clearTimeout(S);
  }),
    ft(() => {
      const b = g.selectedCategory;
      if (
        (g.addonListObjs.forEach((S) => {
          const U = S.manifest._categories[0] === "easterEgg" && b !== "easterEgg" && S.manifest._wasEverEnabled === !1;
          S.matchesCategory = !U && (b === "all" || S.manifest._categories.includes(b));
        }),
        b === "forums")
      ) {
        const S = g.addonGroups.find((U) => U.id === "forums");
        S && (S.expanded = !0);
      }
    }),
    ft(() => {
      const b = g.forceEnglishSetting;
      g.forceEnglishSettingInitial !== null && b !== null && chrome.storage.local.set({ forceEnglish: b });
    });
  function Ee(b) {
    const { addon: S } = b.detail;
    J(S), j(b.detail.clickedAddon._addonId);
  }
  yr(() => {
    (document.title = chrome.i18n.getMessage("settingsTitle")),
      (g.isIframe || Wr()) && setTimeout(() => document.getElementById("searchBox")?.focus(), 0);
    const b = ["notifications"];
    Wr() && typeof Clipboard.prototype.write != "function" && b.push("clipboardWrite"), (g.browserLevelPermissions = b);
    const S = () => {
      chrome.permissions.getAll(({ permissions: Z }) => {
        g.grantedOptionalPermissions = Z.filter((z) => b.includes(z));
      });
    };
    S(), chrome.permissions.onAdded?.addListener(S), chrome.permissions.onRemoved?.addListener(S);
    const U = {
      group: g.addonGroups[0],
      manifest: JSON.parse(JSON.stringify(xl)),
      matchesSearch: !0,
      matchesCategory: !0,
      naturalIndex: -1,
      headerAbove: !1,
      footerBelow: !1,
      duplicate: !1,
    };
    setTimeout(() => {
      g.loaded ||
        (g.addonListObjs = Array(25)
          .fill("")
          .map(() => JSON.parse(JSON.stringify(U))));
    }, 0),
      chrome.storage.local.get("forceEnglish", ({ forceEnglish: Z }) => {
        (g.forceEnglishSettingInitial = Z ?? !1), (g.forceEnglishSetting = Z ?? !1);
      });
    const L = () => {
      if (location.hash === t) M();
      else if (location.hash.startsWith(n)) {
        const Z = location.hash.substring(n.length),
          z = g.addonGroups.find((ie) => ie.addonIds.includes(Z));
        if (!z) return;
        const V = g.manifestsById[Z];
        (z.expanded = !0),
          (g.selectedCategory = V?.tags.includes("easterEgg") ? "easterEgg" : "all"),
          ee(),
          setTimeout(() => document.getElementById("addon-" + Z)?.scrollIntoView(), 0);
      }
    };
    window.addEventListener("hashchange", L),
      chrome.runtime.sendMessage("getSettingsInfo", async ({ manifests: Z, addonsEnabled: z, addonSettings: V }) => {
        g.addonSettings = V;
        const ie = [];
        let ce;
        g.isIframe && (ce = await Ue());
        const Ie = (w) => JSON.parse(JSON.stringify(w));
        for (const { manifest: w, addonId: fe } of Z) {
          (w._categories = []),
            (w._categories[0] = w.tags.includes("popup")
              ? "popup"
              : w.tags.includes("easterEgg")
                ? "easterEgg"
                : w.tags.includes("theme")
                  ? "theme"
                  : w.tags.includes("community")
                    ? "community"
                    : w.tags.includes("player")
                      ? "player"
                      : "editor");
          const $ = (ge) => {
            let ve = 0;
            for (const be of ge) {
              const Ye = typeof be == "object" ? be.tag : be,
                Et = typeof be == "object" ? be.category : Ye;
              w.tags.includes(Ye) && (w._categories.push(Et), ve++);
            }
            return ve;
          };
          if (
            (w._categories[0] === "theme"
              ? $([{ tag: "editor", category: "themesForEditor" }]) ||
                $([{ tag: "community", category: "themesForWebsite" }]) ||
                $([{ tag: "player", category: "themesForPlayer" }])
              : w._categories[0] === "editor"
                ? $(["codeEditor", "costumeEditor"]) === 0 && w._categories.push("editorOthers")
                : w._categories[0] === "community" &&
                  $(["profiles", "projectPage", "forums"]) === 0 &&
                  w._categories.push("communityOthers"),
            fe === "cat-blocks" && w._categories.push("easterEgg"),
            (w._icon = w._categories[0]),
            (w._enabled = z[fe]),
            (w._wasEverEnabled = w._enabled),
            (w._addonId = fe),
            (w._groups = []),
            w.versionAdded)
          ) {
            const [ge, ve] = c(l).split("."),
              [be, Ye] = w.versionAdded.split(".");
            ge === be &&
              ve === Ye &&
              (w.tags.push("new"),
              w._groups.push(w.tags.includes("recommended") || w.tags.includes("featured") ? "featuredNew" : "new"));
          }
          if (w.latestUpdate) {
            const [ge, ve] = c(l).split("."),
              [be, Ye] = w.latestUpdate.version.split(".");
            ge === be &&
              ve === Ye &&
              (w.tags.push(w.latestUpdate.newSettings?.length ? "updatedWithSettings" : "updated"),
              w._groups.push(w.latestUpdate.isMajor ? "featuredNew" : "new"));
          }
          const ye = hi.map((ge) => ge.matchName);
          w.tags.sort((ge, ve) => ye.indexOf(ge) - ye.indexOf(ve)),
            ce?.addonsCurrentlyOnTab.includes(fe)
              ? w._groups.push("runningOnTab")
              : ce?.addonsPreviouslyOnTab.includes(fe) && w._groups.push("recentlyUsed"),
            w._enabled
              ? w._groups.push("enabled")
              : w.tags.includes("recommended")
                ? w._groups.push("recommended")
                : w.tags.includes("featured")
                  ? w._groups.push("featured")
                  : w.tags.includes("beta") || w.tags.includes("danger")
                    ? w._groups.push("beta")
                    : w.tags.includes("forums")
                      ? w._groups.push("forums")
                      : w._groups.push("others");
          for (const ge of w._groups) g.addonGroups.find((ve) => ve.id === ge)?.addonIds.push(w._addonId);
          ie.push(Ie(w));
        }
        for (const { manifest: w } of Z)
          w.relatedAddons &&
            (w._relatedAddons = w.relatedAddons
              .map((fe) => Z.find(({ addonId: $ }) => $ === fe)?.manifest)
              .filter(Boolean));
        for (const { manifest: w } of Z) g.manifestsById[w._addonId] = w;
        (g.manifests = Z.map(({ manifest: w }) => w)), (a = new zt(ie, Sl));
        const pe = (w, fe, $) => {
            const ye = Array.isArray(w) ? w : [w],
              ge = ye.some((be) => fe.tags.includes(be)),
              ve = ye.some((be) => $.tags.includes(be));
            return ge ^ ve ? ve - ge : ge && ve ? fe.name.localeCompare($.name) : null;
          },
          he = [["danger", "beta"], "editor", "player", "community", "popup"];
        if (
          (g.addonGroups.forEach((w) => {
            w.addonIds = w.addonIds
              .map((fe) => g.manifestsById[fe])
              .sort((fe, $) => {
                for (const ye of w.customOrder || he) {
                  const ge = pe(ye, fe, $);
                  if (ge !== null) return ge;
                }
                return 0;
              })
              .map((fe) => fe._addonId);
          }),
          g.isIframe)
        ) {
          const w = [];
          for (const $ of g.addonGroups) $.addonIds.forEach((ye) => w.push(ye));
          const fe = g.addonGroups.find(($) => $.id === "_iframeSearch");
          fe && (fe.addonIds = Object.keys(g.manifestsById).filter(($) => !w.includes($)));
        }
        let xe = 0;
        const Ce = [];
        for (const w of g.addonGroups)
          w.addonIds.forEach((fe, $) => {
            const ye = {
              manifest: g.manifestsById[fe],
              group: w,
              matchesSearch: !1,
              matchesCategory: !(
                g.manifestsById[fe]._categories[0] === "easterEgg" && g.manifestsById[fe]._enabled === !1
              ),
              naturalIndex: xe,
              headerAbove: $ === 0,
              footerBelow: $ === w.addonIds.length - 1,
              duplicate: Ce.some((ge) => ge.manifest._addonId === fe),
            };
            Ce.push(ye), xe++;
          });
        (g.addonListObjs = Ce), (g.loaded = !0), setTimeout(L, 0);
        let Le = "";
        Z.forEach(({ addonId: w }) => (Le += z[w] === !0 ? "1" : "0"));
        const ht = BigInt(`0b${Le}`).toString(36);
        g.sidebarUrls.feedback += `#_${ht}`;
      });
    const B = (Z) => {
      Z.ctrlKey && Z.key === "f"
        ? (Z.preventDefault(), document.querySelector("#searchBox")?.focus())
        : Z.key === "Escape" &&
          (document.activeElement === document.querySelector("#searchBox") && g.searchInputReal.length > 0
            ? (Z.preventDefault(), (g.searchInputReal = ""))
            : g.categoryOpen && g.smallMode && (g.categoryOpen = !1));
    };
    window.addEventListener("keydown", B);
    const me = () => {
      window.innerWidth < 1100
        ? ((g.smallMode = !0), (g.categoryOpen = !1))
        : g.smallMode !== !1 && ((g.smallMode = !1), (g.categoryOpen = !0));
    };
    window.addEventListener("resize", me),
      me(),
      chrome.management.getSelf((Z) => {
        Z.installType === "development" && (g.devMode = !0);
      });
    let ue = 0;
    const se = [
        "arrowup",
        "arrowup",
        "arrowdown",
        "arrowdown",
        "arrowleft",
        "arrowright",
        "arrowleft",
        "arrowright",
        "b",
        "a",
      ],
      _e = (Z) => {
        (ue = Z.key.toLowerCase() === se[ue] ? ue + 1 : 0),
          ue === se.length && ((g.selectedCategory = "easterEgg"), setTimeout(() => (g.searchInputReal = ""), 0));
      };
    return (
      document.addEventListener("keydown", _e),
      document.addEventListener("sa:openRelated", Ee),
      g.isIframe || chrome.runtime.sendMessage("checkPermissions"),
      () => {
        window.removeEventListener("hashchange", L),
          window.removeEventListener("keydown", B),
          window.removeEventListener("resize", me),
          document.removeEventListener("keydown", _e),
          document.removeEventListener("sa:openRelated", Ee);
      }
    );
  });
  function Ue() {
    return new Promise((b) => {
      chrome.tabs.query({ currentWindow: !0, active: !0 }, (S) => {
        if (!S[0]?.id) return b({ addonsCurrentlyOnTab: [], addonsPreviouslyOnTab: [] });
        chrome.tabs.sendMessage(S[0].id, "getRunningAddons", { frameId: 0 }, (U) => {
          chrome.runtime.lastError;
          const L = U ? [...U.userscripts, ...U.userstyles] : [],
            B = U ? U.disabledDynamicAddons : [];
          b({ addonsCurrentlyOnTab: L, addonsPreviouslyOnTab: B });
        });
      });
    });
  }
  var Se = Gl(),
    Me = ze(Se),
    We = h(Me);
  {
    var de = (b) => {
      var S = Ml();
      let U;
      var L = h(S);
      I(L, "src", chrome.runtime.getURL("images/icons/menu.svg")),
        T(
          (B) => {
            (U = Pe(S, 1, "header-button", null, U, { sidebarToggleOpen: g.categoryOpen })), I(S, "title", B);
          },
          [() => N("toggleSidebar")]
        ),
        H("click", S, k),
        E(b, S);
    };
    W(We, (b) => {
      g.smallMode && b(de);
    });
  }
  var Ae = y(We, 2);
  I(Ae, "src", chrome.runtime.getURL("images/icon-transparent.svg"));
  var Ge = y(Ae, 2),
    Xe = h(Ge),
    at = y(Ge, 2),
    kt = h(at),
    Ve = y(Me, 2),
    He = h(Ve);
  {
    var Ze = (b) => {
      var S = Ol(),
        U = ze(S);
      let L;
      var B = h(U);
      rt(
        B,
        17,
        () => g.categories,
        (ve) => ve.id,
        (ve, be) => {
          Ba(ve, {
            get category() {
              return c(be);
            },
          });
        }
      );
      var me = y(B, 2),
        ue = h(me);
      I(ue, "src", chrome.runtime.getURL("images/icons/users.svg"));
      var se = y(ue, 2),
        _e = h(se),
        Z = y(_e);
      I(Z, "src", chrome.runtime.getURL("images/icons/popout.svg"));
      var z = y(me, 2),
        V = h(z);
      I(V, "src", chrome.runtime.getURL("images/icons/translate.svg"));
      var ie = y(V, 2),
        ce = h(ie),
        Ie = y(ce);
      I(Ie, "src", chrome.runtime.getURL("images/icons/popout.svg"));
      var pe = y(z, 2),
        he = h(pe);
      I(he, "src", chrome.runtime.getURL("images/icons/comment.svg"));
      var xe = y(he, 2),
        Ce = h(xe),
        Le = y(Ce);
      I(Le, "src", chrome.runtime.getURL("images/icons/popout.svg"));
      var ht = y(pe, 2),
        w = h(ht);
      I(w, "src", chrome.runtime.getURL("images/icons/wrench.svg"));
      var fe = y(w, 2),
        $ = h(fe),
        ye = y(U, 2);
      {
        var ge = (ve) => {
          var be = kl(),
            Ye = h(be);
          I(Ye, "src", chrome.runtime.getURL("images/icons/left-arrow.svg"));
          let Et;
          T(
            (nn, Gn) => {
              I(be, "title", nn), (Et = Pe(Ye, 1, "", null, Et, Gn));
            },
            [() => N("toggleSidebar"), () => ({ flipped: g.categoryOpen === (Fa() === "rtl") })]
          ),
            H("click", be, k),
            E(ve, be);
        };
        W(ye, (ve) => {
          g.smallMode || ve(ge);
        });
      }
      T(
        (ve, be, Ye, Et) => {
          (L = Pe(U, 1, "categories-block", null, L, { closed: !g.categoryOpen, smallMode: g.smallMode })),
            I(me, "href", g.sidebarUrls.contributors),
            F(_e, `${ve ?? ""} `),
            F(ce, `${be ?? ""} `),
            I(pe, "href", g.sidebarUrls.feedback),
            F(Ce, `${Ye ?? ""} `),
            F($, Et);
        },
        [() => N("credits"), () => N("translate"), () => N("feedback"), () => N("moreSettings")]
      ),
        H("click", ht, M),
        E(b, S);
    };
    W(He, (b) => {
      g.isIframe || b(Ze);
    });
  }
  var $e = y(He, 2),
    ot = h($e),
    ae = h(ot);
  {
    var P = (b) => {
      var S = Fl(),
        U = h(S);
      {
        var L = (me) => {
            var ue = Tl(),
              se = h(ue),
              _e = h(se);
            I(_e, "src", chrome.runtime.getURL("images/icons/left-arrow.svg"));
            var Z = y(se, 2),
              z = h(Z);
            T(
              (V, ie) => {
                I(se, "title", V), F(z, ie);
              },
              [() => N("back"), () => N("relatedTo", g.relatedToAddonName)]
            ),
              H("click", se, D),
              E(me, ue);
          },
          B = (me) => {
            var ue = Pl(),
              se = h(ue);
            T(() => F(se, c(u))), E(me, ue);
          };
        W(U, (me) => {
          g.relatedAddonsOpen ? me(L) : me(B, -1);
        });
      }
      E(b, S);
    };
    W(ae, (b) => {
      g.isIframe || b(P);
    });
  }
  var te = y(ae, 2);
  {
    var Fe = (b) => {
      var S = Bl();
      let U;
      var L = h(S);
      Oa(L);
      var B = y(L, 2);
      {
        var me = (se) => {
            var _e = Rl(),
              Z = h(_e);
            I(Z, "src", chrome.runtime.getURL("images/icons/search.svg")), E(se, _e);
          },
          ue = (se) => {
            var _e = Ll(),
              Z = h(_e);
            I(Z, "src", chrome.runtime.getURL("images/icons/x.svg")), H("click", _e, ne), E(se, _e);
          };
        W(B, (se) => {
          g.searchInput === "" ? se(me) : se(ue, -1);
        });
      }
      T(() => {
        (U = Pe(S, 1, "search-box", null, U, { smallMode: g.smallMode })), I(L, "placeholder", o);
      }),
        Dn(
          L,
          () => g.searchInputReal,
          (se) => (g.searchInputReal = se)
        ),
        E(b, S);
    };
    W(te, (b) => {
      g.relatedAddonsOpen || b(Fe);
    });
  }
  var Re = y(ot, 2);
  let yt;
  var Oe = h(Re);
  {
    var Ct = (b) => {
      var S = Nl(),
        U = h(S);
      T((L) => F(U, L), [() => N("searchNotFound")]), E(b, S);
    };
    W(Oe, (b) => {
      g.searchInput && c(v) && b(Ct);
    });
  }
  var Ot = y(Oe, 2);
  {
    var Je = (b) => {
        var S = pt(),
          U = ze(S);
        rt(
          U,
          17,
          () => g.relatedAddons,
          $t,
          (L, B) => {
            ni(L, {
              visible: !0,
              get addon() {
                return c(B);
              },
              groupId: "enabled",
              groupExpanded: !0,
            });
          }
        ),
          E(b, S);
      },
      gt = (b) => {
        var S = pt(),
          U = ze(S);
        rt(
          U,
          17,
          () => c(f),
          $t,
          (L, B) => {
            var me = Ul(),
              ue = h(me);
            {
              var se = (V) => {
                var ie = jl(),
                  ce = h(ie),
                  Ie = h(ce),
                  pe = y(ce, 2),
                  he = h(pe);
                T(
                  (xe, Ce) => {
                    F(Ie, xe), F(he, Ce);
                  },
                  [() => N("exploreAllAddons", [c(d)]), () => N("openFullSettings")]
                ),
                  H("click", pe, re),
                  E(V, ie);
              };
              W(ue, (V) => {
                g.isIframe &&
                  c(B).headerAbove &&
                  (c(v) || c(B).group.id === "enabled") &&
                  g.searchInput === "" &&
                  V(se);
              });
            }
            var _e = y(ue, 2);
            {
              var Z = (V) => {
                {
                  let ie = q(() => m(c(B).group)),
                    ce = q(() => p(c(B).group));
                  ja(V, {
                    get group() {
                      return c(B).group;
                    },
                    get shownCount() {
                      return c(ie);
                    },
                    get marginAbove() {
                      return c(ce);
                    },
                  });
                }
              };
              W(_e, (V) => {
                c(B).headerAbove && V(Z);
              });
            }
            var z = y(_e, 2);
            {
              let V = q(() => c(B).matchesSearch && c(B).matchesCategory);
              ni(z, {
                get visible() {
                  return c(V);
                },
                get addon() {
                  return c(B).manifest;
                },
                get groupId() {
                  return c(B).group.id;
                },
                get groupExpanded() {
                  return c(B).group.expanded;
                },
              });
            }
            E(L, me);
          }
        ),
          E(b, S);
      };
    W(Ot, (b) => {
      g.relatedAddonsOpen ? b(Je) : b(gt, -1);
    });
  }
  var et = y(Ve, 2);
  {
    let b = q(() => N("moreSettings"));
    Ts(et, {
      get title() {
        return c(b);
      },
      get modalRef() {
        return c(i);
      },
      set modalRef(S) {
        we(i, S, !0);
      },
      children: (S, U) => {
        var L = zl(),
          B = ze(L),
          me = h(B),
          ue = h(me),
          se = h(ue);
        I(se, "src", chrome.runtime.getURL("images/icons/theme.svg"));
        var _e = y(se, 2),
          Z = h(_e),
          z = y(ue, 2),
          V = h(z),
          ie = h(V),
          ce = y(V, 2),
          Ie = h(ce),
          pe = h(Ie),
          he = h(pe),
          xe = y(pe, 2),
          Ce = h(xe),
          Le = h(Ce),
          ht = y(Le, 2),
          w = h(ht),
          fe = y(Ce, 2),
          $ = h(fe),
          ye = y($, 2),
          ge = h(ye),
          ve = y(me, 2),
          be = h(ve),
          Ye = h(be);
        I(Ye, "src", chrome.runtime.getURL("images/icons/import-export.svg"));
        let Et;
        var nn = y(Ye, 2),
          Gn = h(nn),
          Ui = y(be, 2),
          Or = h(Ui),
          Hi = h(Or),
          Tr = y(Or, 2),
          zi = h(Tr),
          Wi = y(Tr, 2),
          Pr = h(Wi),
          Xn = h(Pr),
          Gi = h(Xn),
          Yn = y(Xn, 2),
          Xi = h(Yn),
          Yi = y(Yn, 2),
          Ki = h(Yi),
          Vi = y(Pr, 2),
          Fr = h(Vi),
          Ji = h(Fr),
          Qi = y(ve, 2),
          Rr = h(Qi),
          Lr = h(Rr);
        I(Lr, "src", chrome.runtime.getURL("images/icons/translate.svg"));
        var qi = y(Lr, 2),
          Zi = h(qi),
          $i = y(Rr, 2),
          ea = h($i),
          Br = h(ea),
          Nr = y(Br, 4),
          ta = h(Nr),
          na = y(Nr, 2);
        {
          var ra = (Wt) => {
            var rn = Hl(),
              Vn = h(rn);
            T((Jn) => F(Vn, Jn), [() => N("applySettings")]), H("click", rn, G), E(Wt, rn);
          };
          W(na, (Wt) => {
            g.forceEnglishSetting !== null && g.forceEnglishSetting !== g.forceEnglishSettingInitial && Wt(ra);
          });
        }
        var ia = y(B, 2),
          jr = h(ia),
          Ur = h(jr),
          Kn = y(Ur),
          aa = h(Kn),
          oa = y(jr, 2),
          sa = h(oa),
          la = h(sa);
        T(
          (Wt, rn, Vn, Jn, da, ca, ua, fa, ga, ha, ma, va, pa, ba, _a, ya, wa) => {
            F(Z, Wt),
              F(ie, rn),
              F(he, Vn),
              Gr(Le, g.theme === !0),
              F(w, Jn),
              Gr($, g.theme === !1),
              F(ge, da),
              (Et = Pe(Ye, 1, "icon-type addon-icon", null, Et, { dark: g.theme === !1 })),
              F(Gn, ca),
              F(Hi, ua),
              F(zi, fa),
              F(Gi, ga),
              F(Xi, ha),
              F(Ki, ma),
              F(Ji, va),
              F(Zi, pa),
              F(ta, ba),
              F(Ur, `${_a ?? ""} `),
              I(Kn, "href", g.sidebarUrls.changelog),
              I(Kn, "title", ya),
              F(aa, `v${c(l) ?? ""}`),
              F(la, wa);
          },
          [
            () => N("scratchAddonsTheme"),
            () => N("scratchAddonsThemeDescription"),
            () => N("theme"),
            () => N("light"),
            () => N("dark"),
            () => N("exportAndImportSettings"),
            () => N("exportAndImportSettingsDescription"),
            () => N("useBrowserSync"),
            () => N("export"),
            () => N("import"),
            () => N("confirmImport"),
            () => N("viewSettings"),
            () => N("language"),
            () => N("beta"),
            () => N("extensionName"),
            () => N("changelog"),
            () => N("libraryCredits"),
          ]
        ),
          H("change", Le, () => _(!0)),
          H("change", $, () => _(!1)),
          H("click", Xn, A),
          H("click", Yn, R),
          H("click", Fr, O),
          wr(
            Br,
            () => g.forceEnglishSetting,
            (Wt) => (g.forceEnglishSetting = Wt)
          ),
          E(S, L);
      },
      $$slots: { default: !0 },
    });
  }
  var st = y(et, 2);
  {
    var Qe = (b) => {
      var S = Wl(),
        U = h(S),
        L = h(U),
        B = y(U, 2),
        me = h(B),
        ue = h(me),
        se = y(me, 2),
        _e = h(se);
      T(
        (Z, z, V) => {
          F(L, Z), F(ue, z), F(_e, V);
        },
        [
          () => N("settingsPagePermission", g.addonToEnable ? g.addonToEnable.name : ""),
          () => N("openFullSettings"),
          () => N("skipOpenFullSettings"),
        ]
      ),
        H("click", me, re),
        H("click", se, je),
        E(b, S);
    };
    W(st, (b) => {
      g.showPopupModal && b(Qe);
    });
  }
  T(
    (b, S) => {
      F(Xe, b),
        I(at, "title", S),
        I(kt, "src", c(s)),
        (yt = Pe(Re, 1, "addons-container", null, yt, { placeholder: !g.loaded }));
    },
    [() => N("settings"), () => N(g.theme ? "switchDark" : "switchLight")]
  ),
    H("click", at, () => _(!g.theme)),
    E(r, Se),
    _t();
}
Ft(["click", "change"]);
export { g as S, id as a, Yl as i };
