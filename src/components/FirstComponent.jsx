// Imports work simple - you import the url
import CliboardUrl from "../assets_/Clipboard.png";

export default function FirstComponent_() {
  return (
    <div className="block w-full text-blue-500">
      <img
        src={CliboardUrl}
        className="m-2 -translate-x-full rounded-lg border border-white p-2"
      />
    </div>
  );
}
