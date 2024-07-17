import app from "./app/application.js";
import "./services/delete-expired-note.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running in http://localhost:${PORT}/`);
});
