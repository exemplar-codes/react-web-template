export default function getTimeFromEnv() {
  return (
    import.meta.env?.VITE_CURRENT_TIME_FOR_DEPLOYMENT ??
    new Date().toLocaleTimeString()
  ); //Thu Sep 28 02:14:10 IST 2023
}

console.log(getTimeFromEnv());
