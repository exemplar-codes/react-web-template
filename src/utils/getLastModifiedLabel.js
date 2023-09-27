export default function getLastModifiedLabel() {
  const lastModifiedToday =
    new Date(document.lastModified).getDate() === new Date().getDate();

  // const lastModifiedDate = new Date(document.lastModified).toLocaleDateString();
  const lastModifiedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
  }).format(new Date(document.lastModified));

  const lastModifiedTime = new Date(document.lastModified).toLocaleTimeString();

  const lastModifiedString = lastModifiedToday
    ? `${lastModifiedTime} ${lastModifiedToday ? "today" : lastModifiedDate}`
    : `${lastModifiedToday ? "today" : lastModifiedDate} ${lastModifiedTime}`;

  return lastModifiedString;
}
