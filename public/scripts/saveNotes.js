const notesPaper = document.getElementById("note");

const noteLink = window.location.pathname.split("/")[1];

let previousValue = notesPaper.value;

notesPaper.addEventListener("change", async () => {
  if (notesPaper.value !== previousValue) {
    previousValue = notesPaper.value;
    await saveNotes(notesPaper.value);
  }
});

async function saveNotes(val) {
  const res = await fetch("/api/v1/note/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: val,
      noteLink,
    }),
  });

  const data = await res.json();
}
