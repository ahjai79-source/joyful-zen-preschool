// "Read our Parent FAQs" panel on the Admissions page uses a native
// <details id="faqDetails"> so open/close state is fully browser-managed
// (not JS style mutation, which this environment's rendering pipeline
// can stomp). This script only wires the "X" close button, via event
// delegation on document (same resilient pattern as forms.js), since it
// just needs to flip the `open` property/attribute, not styles.
(function () {
  document.addEventListener("click", function (e) {
    var closeBtn = e.target.closest && e.target.closest("#faqCloseBtn");
    if (!closeBtn) return;
    var details = document.getElementById("faqDetails");
    if (details) details.open = false;
  });
})();
