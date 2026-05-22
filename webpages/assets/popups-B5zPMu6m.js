import {
  L as b,
  G as y,
  m as u,
  t as g,
  y as A,
  w as e,
  b as c,
  I,
  V as l,
  W as L,
  n as M,
  u as G,
  M as o,
  T as C,
  l as E,
  c as R,
  A as T,
  D as k,
} from "./page-init-D8Z4tyJC.js";
import { S as x, C as U } from "./ScratchMessaging-X1AZcYfJ.js";
var q = G('<pre style="padding:1em"> </pre>');
function B(p, f) {
  b(f, !0);
  const i = { "cloud-games": U, "scratch-messaging": x };
  let r = l(null),
    d = l(null),
    n = l(null);
  y(() => {
    chrome.runtime.sendMessage("getSettingsInfo", (s) => {
      (window.scratchAddons = window.scratchAddons || {}),
        (window.scratchAddons.globalState = window.scratchAddons.globalState || {}),
        (window.scratchAddons.globalState.addonSettings = s.addonSettings);
    });
    const a = new URLSearchParams(location.search).get("id");
    if (!a) {
      o(n, "Missing ?id= query parameter");
      return;
    }
    if ((o(r, a, !0), !i[a])) {
      o(n, `Unknown popup: ${a}`);
      return;
    }
    o(d, i[a], !0);
  });
  var m = u(),
    h = g(m);
  {
    var w = (t) => {
        var a = q(),
          s = E(a);
        L(() => C(s, e(n))), c(t, a);
      },
      S = (t) => {
        var a = u(),
          s = g(a);
        M(
          s,
          () => e(d),
          (v, _) => {
            _(v, {
              get addonId() {
                return e(r);
              },
            });
          }
        ),
          c(t, a);
      };
    A(h, (t) => {
      e(n) ? t(w) : e(d) && e(r) && t(S, 1);
    });
  }
  c(p, m), I();
}
document.documentElement.classList.add("fullscreen");
document.body.classList.add("fullscreen");
R();
T();
k(B, { target: document.getElementById("app") });
