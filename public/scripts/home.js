const closeNotifBtn = document.getElementById("closeBtn");

if (closeNotifBtn) {
  closeNotifBtn.addEventListener("click", () => {
    document.getElementById("notif").classList.remove("flex");
    document.getElementById("notif").classList.add("hidden");
  });
}
