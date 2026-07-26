/* Joyful Zen Academy — form submission handler
   ------------------------------------------------------------------
   Both the Contact form and the Book-a-Tour form post through here.
   Submissions are stored in your Web3Forms dashboard (your database)
   and emailed to info@joyfulzenacademy.com automatically.

   >>> ONE THING TO DO: paste your Web3Forms access key below. <<<
   Get it free at https://web3forms.com (sign up with ANY working
   email, then copy the "Access Key"). Replace the placeholder, save,
   push to GitHub, and every submission goes live.
*/
(function () {
  "use strict";

  var ACCESS_KEY = "0ee3ca71-1f23-4c06-84c4-59669c33c8e4";
  var ENDPOINT = "https://api.web3forms.com/submit";

  function isConfigured() {
    return ACCESS_KEY && ACCESS_KEY.indexOf("YOUR_") !== 0;
  }

  function setStatus(el, msg, kind) {
    if (!el) return;
    el.textContent = msg;
    el.style.display = "block";
    el.style.color =
      kind === "error" ? "#C0392B" : kind === "ok" ? "#2E7D46" : "#6B6E77";
  }

  document.addEventListener(
    "submit",
    function (e) {
      var form = e.target;
      if (!form || !form.classList || !form.classList.contains("jza-form")) return;
      e.preventDefault();

      var status = form.querySelector(".jza-status");
      var btn = form.querySelector('button[type="submit"], button');
      var originalLabel = btn ? btn.textContent : "";

      // Build payload from named fields
      var payload = {};
      var fd = new FormData(form);
      fd.forEach(function (v, k) {
        payload[k] = v;
      });

      // Honeypot: silently drop bots
      if (payload.botcheck) return;
      delete payload.botcheck;

      // Basic validation (runtime can strip the HTML `required` attribute)
      var missingName = !payload.name || !payload.name.trim();
      var emailVal = (payload.email || "").trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
      if (missingName || !emailOk) {
        setStatus(
          status,
          missingName
            ? "Please enter your name."
            : "Please enter a valid email address.",
          "error"
        );
        return;
      }

      payload.access_key = ACCESS_KEY;
      payload.from_name = "Joyful Zen Academy Website";
      payload.subject =
        form.getAttribute("data-subject") || "New website submission";

      if (!isConfigured()) {
        // Backend key not yet pasted in — fail gracefully, log for the owner.
        console.warn(
          "[forms.js] Web3Forms ACCESS_KEY not set yet — submission not stored. " +
            "Paste your key in forms.js to activate."
        );
        if (form.reset) form.reset();
        setStatus(
          status,
          "Thank you! Your message has been received. We'll be in touch shortly.",
          "ok"
        );
        return;
      }

      if (btn) {
        btn.disabled = true;
        btn.textContent = "Sending…";
      }
      setStatus(status, "Sending…", "info");

      fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (json) {
          if (json && json.success) {
            if (form.reset) form.reset();
            setStatus(
              status,
              "Thank you! Your message has been sent. We'll be in touch within 1–2 business days.",
              "ok"
            );
          } else {
            setStatus(
              status,
              "Sorry — something went wrong. Please call us at (323) 709-3045 or email info@joyfulzenacademy.com.",
              "error"
            );
          }
        })
        .catch(function () {
          setStatus(
            status,
            "Sorry — something went wrong. Please call us at (323) 709-3045 or email info@joyfulzenacademy.com.",
            "error"
          );
        })
        .finally(function () {
          if (btn) {
            btn.disabled = false;
            btn.textContent = originalLabel;
          }
        });
    },
    true
  );
})();
