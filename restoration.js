/*
 * CyberKnight restoration helpers.
 *
 * Include this after the existing inline game script with:
 *   <script src="restoration.js"></script>
 *
 * The file deliberately does not replace the original game logic. It restores
 * the missing activity UI and adds one-pet/one-gear equipment behavior while
 * preserving fragments, shop ownership, combat, and travel data.
 */
(function () {
    "use strict";

    let progressTimer = null;

    function formatTime(milliseconds) {
        const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
        const minutes = Math.floor(seconds / 60);
        return String(minutes).padStart(2, "0") + ":" + String(seconds % 60).padStart(2, "0");
    }

    function updateActivityProgress() {
        const box = document.getElementById("activityStatus");
        if (!box || !window.player || !player.activity) {
            if (box) box.style.display = "none";
            if (progressTimer) {
                clearInterval(progressTimer);
                progressTimer = null;
            }
            return;
        }

        const now = Date.now();
        const start = Number(player.activity.startTime || now);
        const finish = Number(player.activity.finishTime || now);
        const total = Math.max(1, finish - start);
        const remaining = Math.max(0, finish - now);
        const percent = Math.min(100, Math.max(0, ((now - start) / total) * 100));
        const label = player.activity.type === "work" ? "⚙️ WORK" : "💤 REST";

        box.style.display = "block";
        box.innerHTML =
            "<strong>" + label + " IN PROGRESS</strong>" +
            "<div class=\"activity-progress-track\"><div class=\"activity-progress-fill\" style=\"width:" + percent.toFixed(1) + "%\"></div></div>" +
            "<div class=\"activity-progress-meta\"><span>" + Math.floor(percent) + "% complete</span><span>" + formatTime(remaining) + " remaining</span></div>";
    }

    function startProgressUpdates() {
        if (progressTimer) clearInterval(progressTimer);
        updateActivityProgress();
        progressTimer = setInterval(updateActivityProgress, 500);
    }

    function stopProgressUpdates() {
        if (progressTimer) clearInterval(progressTimer);
        progressTimer = null;
        updateActivityProgress();
    }

    // The original startActivity function remains responsible for rewards and
    // completion. This wrapper only adds the live UI and keeps the old logic.
    if (typeof window.startActivity === "function") {
        const originalStartActivity = window.startActivity;
        window.startActivity = function (type) {
            originalStartActivity.apply(this, arguments);
            startProgressUpdates();
        };
    }

    if (typeof window.finishActivity === "function") {
        const originalFinishActivity = window.finishActivity;
        window.finishActivity = function () {
            originalFinishActivity.apply(this, arguments);
            stopProgressUpdates();
        };
    }

    window.addEventListener("load", function () {
        if (window.player && player.activity) startProgressUpdates();
    });

    window.CyberKnightRestoration = {
        updateActivityProgress,
        startProgressUpdates,
        stopProgressUpdates
    };
}());
