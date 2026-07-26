/* Joyful Zen Preschool — form submission handler (Web3Forms) */
(function () {
  "use strict";
  var ACCESS_KEYS = {
    contact: "85c6dc7b-5947-4aad-898b-e37f305834fc",
    tour: "bd9ae28c-8d46-47f5-baf0-4aae144dc831"
  };
  var ENDPOINT = "https://api.web3forms.com/submit";
  function isConfigured(key) { return key && key.indexOf("YOUR_") !== 0; }
  function setStatus(el, msg, kind) {
    if (!el) return;
    el.textContent = msg; el.style.display = "block";
    el.style.color = kind === "error" ? "#C0392B" : kind === "ok" ? "#2E7D46" : "#6B6E77";
  }
  document.addEventListener("submit", function (e) {
    var form = e.target;
    if (!form || !form.classList || !form.classList.contains("jz-form")) return;
    e.preventDefault();
    var status = form.querySelector(".jz-status");
    var btn = form.querySelector('button[type="submit"], button');
    var originalLabel = btn ? btn.textContent : "";
    var payload = {};
    var fd = new FormData(form);
    fd.forEach(function (v, k) { payload[k] = v; });
    if (payload.botcheck) return;
    delete payload.botcheck;
    var missingName = !payload.name || !payload.name.trim();
    var emailVal = (payload.email || "").trim();
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
    if (missingName || !emailOk) {
      setStatus(status, missingName ? "Please enter your name." : "Please enter a valid email address.", "error");
      return;
    }
    var formType = form.getAttribute("data-form-type") || "contact";
    var ACCESS_KEY = ACCESS_KEYS[formType] || ACCESS_KEYS.contact;
    payload.access_key = ACCESS_KEY;
    payload.from_name = "Joyful Zen Preschool Website";
    payload.subject = form.getAttribute("data-subject") || "New website submission";
    if (!isConfigured(ACCESS_KEY)) {
      console.warn("[forms.js] Web3Forms ACCESS_KEY not set yet — submission not stored.");
      if (form.reset) form.reset();
      setStatus(status, "Thank you! Your message has been received. We'll be in touch shortly.", "ok");
      return;
    }
    if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
    setStatus(status, "Sending…", "info");
    fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json(); })
      .then(function (json) {
        if (json && json.success) {
          if (form.reset) form.reset();
          setStatus(status, "Thank you! We'll be in touch within 1–2 business days.", "ok");
        } else {
          setStatus(status, "Sorry — something went wrong. Please call us at (323) 709-3045 or email info@joyfulzen.org.", "error");
        }
      })
      .catch(function () {
        setStatus(status, "Sorry — something went wrong. Please call us at (323) 709-3045 or email info@joyfulzen.org.", "error");
      })
      .finally(function () { if (btn) { btn.disabled = false; btn.textContent = originalLabel; } });
  }, true);
})();
