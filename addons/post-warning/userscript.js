export default async function ({ addon, console }) {
  if (location.pathname === "discuss/3/topic/add/") forumWarning("forumWarning");
  else if (location.pathname.startsWith("discuss/topic/")) {
    if (document.querySelector('div.linkst > ul > li > a[href="/discuss/18/"]')) {
      forumWarning("forumWarningGeneral");
    }
  }

  function forumWarning(key) {
    let postArea = document.querySelector("form#post > label");
    if (postArea) {
      var errorList = document.querySelector("form#post > label > ul");
      if (!errorList) {
        let typeArea = postArea.querySelector("strong");
        errorList = document.createElement("ul");
        errorList.classList.add("errorlist");
        postArea.insertBefore(errorList, typeArea);
      }
      let addonError = document.createElement("li");
      let reportLink = document.createElement("a");
      const uiLanguage = chrome.i18n.getUILanguage();
      const localeSlash = uiLanguage.startsWith("en") ? "" : `${uiLanguage.split("-")[0]}/`;
      const utm = `utm_source=extension&utm_medium=forumwarning&utm_campaign=v${chrome.runtime.getManifest().version}`;
      reportLink.href = `https://scratchaddons.com/${localeSlash}feedback/?ext_version=${
        chrome.runtime.getManifest().version
      }&${utm}`;
      reportLink.target = "_blank";
      reportLink.innerText = chrome.i18n.getMessage("reportItHere");
      let text1 = document.createElement("span");
      text1.innerHTML = escapeHTML(chrome.i18n.getMessage(key, DOLLARS)).replace("$1", reportLink.outerHTML);
      addonError.appendChild(text1);
      errorList.appendChild(addonError);
    }
  }

  const pathArr = location.pathname.split("/");
  const isProfile = pathArr[0] === "users" && pathArr[2] === "";
  const isStudio = pathArr[0] === "studios";
  const isProject = pathArr[0] === "projects";
  const isForums = pathArr[0] === "discuss";

  const removeReiteratedChars = (string) =>
    string
      .split("")
      .filter((char, i, charArr) => (i === 0 ? true : charArr[i - 1] !== char))
      .join("");

  const shouldCaptureComment = (value) => {
    const trimmedValue = value.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""); // Trim like scratchr2
    const limitedValue = removeReiteratedChars(trimmedValue.toLowerCase().replace(/[^a-z]+/g, ""));
    const regex = /scratchadons/;
    return regex.test(limitedValue);
  };
  const extensionPolicyLink = document.createElement("a");
  extensionPolicyLink.href = "https://scratch.mit.edu/discuss/topic/284272/";
  extensionPolicyLink.target = "_blank";
  extensionPolicyLink.innerText = chrome.i18n.getMessage("captureCommentPolicy");
  Object.assign(extensionPolicyLink.style, {
    textDecoration: "underline",
    color: isForums ? "" : "white",
  });
  const errorMsgHtml = escapeHTML(chrome.i18n.getMessage("captureCommentError", DOLLARS)).replace(
    "$1",
    extensionPolicyLink.outerHTML
  );
  const sendAnywayMsg = chrome.i18n.getMessage("captureCommentPostAnyway");
  const confirmMsg = chrome.i18n.getMessage("captureCommentConfirm");

  if (isProfile) {
    window.addEventListener(
      "click",
      (e) => {
        if (e.target.tagName !== "A" || !e.target.parentElement.matches("div.button[data-commentee-id]")) return;
        const form = e.target.closest("form");
        if (!form) return;
        if (form.hasAttribute("data-sa-send-anyway")) {
          form.removeAttribute("data-sa-send-anyway");
          return;
        }
        const textarea = form.querySelector("textarea[name=content]");
        if (!textarea) return;
        if (shouldCaptureComment(textarea.value)) {
          e.stopPropagation();
          e.preventDefault(); // Avoid location.hash being set to null

          form.querySelector("[data-control=error] .text").innerHTML = errorMsgHtml + " ";
          const sendAnyway = document.createElement("a");
          sendAnyway.onclick = () => {
            const res = confirm(confirmMsg);
            if (res) {
              form.setAttribute("data-sa-send-anyway", "");
              form.querySelector("[data-control=post]").click();
            }
          };
          sendAnyway.textContent = sendAnywayMsg;
          Object.assign(sendAnyway.style, {
            textDecoration: "underline",
            color: "white",
          });
          form.querySelector("[data-control=error] .text").appendChild(sendAnyway);
          form.querySelector(".control-group").classList.add("error");
        }
      },
      { capture: true }
    );
  } else if (isProject || isStudio) {
    window.addEventListener(
      "click",
      (e) => {
        if (!(e.target.tagName === "SPAN" || e.target.tagName === "BUTTON")) return;
        if (!e.target.closest("button.compose-post")) return;
        const form = e.target.closest("form.full-width-form");
        if (!form) return;
        // Remove error when about to send comment anyway, if it exists
        form.parentNode.querySelector(".sa-compose-error-row")?.remove();
        if (form.hasAttribute("data-sa-send-anyway")) {
          form.removeAttribute("data-sa-send-anyway");
          return;
        }
        const textarea = form.querySelector("textarea[name=compose-comment]");
        if (!textarea) return;
        if (shouldCaptureComment(textarea.value)) {
          e.stopPropagation();
          const errorRow = document.createElement("div");
          errorRow.className = "flex-row compose-error-row sa-compose-error-row";
          const errorTip = document.createElement("div");
          errorTip.className = "compose-error-tip";
          const span = document.createElement("span");
          span.innerHTML = errorMsgHtml + " ";
          const sendAnyway = document.createElement("a");
          sendAnyway.onclick = () => {
            const res = confirm(confirmMsg);
            if (res) {
              form.setAttribute("data-sa-send-anyway", "");
              form.querySelector(".compose-post")?.click();
            }
          };
          sendAnyway.textContent = sendAnywayMsg;
          errorTip.appendChild(span);
          errorTip.appendChild(sendAnyway);
          errorRow.appendChild(errorTip);
          form.parentNode.prepend(errorRow);

          // Hide error after typing like scratch-www does
          textarea.addEventListener(
            "input",
            () => {
              errorRow.remove();
            },
            { once: true }
          );
          // Hide error after clicking cancel like scratch-www does
          form.querySelector(".compose-cancel").addEventListener(
            "click",
            () => {
              errorRow.remove();
            },
            { once: true }
          );
        }
      },
      { capture: true }
    );
  } else if (isForums) {
    window.addEventListener("click", (e) => {
      const potentialPostButton = e.target.closest("button[type=submit]");
      if (!potentialPostButton) return;
      const form = e.target.closest("form");
      if (!form) return;
      if (form.hasAttribute("data-sa-send-anyway")) {
        form.removeAttribute("data-sa-send-anyway");
        return;
      }
      const existingWarning = form.parentElement.querySelector(".sa-extension-policy-warning");
      if (existingWarning) {
        // Do nothing. The warning automatically disappears after typing into the form.
        e.preventDefault();
        existingWarning.scrollIntoView({ behavior: "smooth" });
        return;
      }
      const textarea = form.querySelector("textarea.markItUpEditor");
      if (!textarea) return;
      if (shouldCaptureComment(textarea.value)) {
        const errorTip = document.createElement("li");
        errorTip.classList.add("errorlist", "sa-extension-policy-warning");
        errorTip.style.scrollMarginTop = "50px";
        errorTip.style.fontWeight = "bold";
        errorTip.innerHTML = errorMsgHtml + " ";
        const sendAnyway = document.createElement("a");
        sendAnyway.onclick = () => {
          const res = confirm(confirmMsg);
          if (res) {
            form.setAttribute("data-sa-send-anyway", "");
            form.querySelector("button[type=submit]")?.click();
          }
        };
        sendAnyway.textContent = sendAnywayMsg;
        errorTip.appendChild(sendAnyway);

        const postArea = form.querySelector("label");
        if (!postArea) return;
        let errorList = form.querySelector("label > ul");
        if (!errorList) {
          const typeArea = postArea.querySelector("strong");
          errorList = document.createElement("ul");
          errorList.classList.add("errorlist");
          postArea.insertBefore(errorList, typeArea);
        }

        errorList.appendChild(errorTip);
        errorTip.scrollIntoView({ behavior: "smooth" });
        e.preventDefault();

        // Hide error after typing
        textarea.addEventListener(
          "input",
          () => {
            errorTip.remove();
            if (errorList.querySelector("li") === null) {
              errorList.remove();
            }
          },
          { once: true }
        );
      }
    });
  }
}
