const timer = document.getElementById("duration");

function showDuration(time) {
  const timerInterval = setInterval(updateTimer, 1000);

  function updateTimer() {
    const now = new Date().getTime();

    const distance = time - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timer.innerHTML = `Deleted in: ${days}:${hours}:${minutes}:${seconds}`;

    if (distance <= 0) {
      clearInterval(timerInterval);
      timer.innerHTML = "Deleted!";
    }
  }
  updateTimer();
}

const dateString = document.getElementById("link").value;
console.log(dateString);

if (dateString) {
  const deletedAt = new Date(dateString);

  showDuration(deletedAt);
} else {
  timer.innerText = "Not deleted";
}
