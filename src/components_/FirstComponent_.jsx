// Imports work simple - you import the url
import CliboardUrl from "../assets_/Clipboard.png";
import PerceptionAudioUrl from "../assets_/perception.mp3";
import FormHTML from "../assets_/form.html";
import PerceptionAudioTextUrl from "../assets_/perception-actually-em-pee-three.txt";
import VideoUrl from "../assets_/video.mp4";
import ZipFileUrl from "../assets_/zip-file.zip";

export default function FirstComponent_() {
  return (
    <div className="block w-full text-blue-500">
      <img
        src={CliboardUrl}
        className="absolute -translate-x-full cursor-pointer"
      />

      <audio src={PerceptionAudioUrl} controls></audio>
      <audio src={PerceptionAudioTextUrl} controls></audio>
      <iframe src={FormHTML} className="m-1 resize" />
      <video src={VideoUrl} controls></video>
      <a href={ZipFileUrl} download>
        Zip file
      </a>
    </div>
  );
}
