import FirstComponent_ from "../components_/FirstComponent_";

export default function FirstPage_() {
  return (
    <div>
      FirstPage_ <FirstComponent_ />
      {/* #step4 - this is commented but it would still be picked up by Tailwind

      Tailwind uses simple regex to pick up classes, it does not run the code, or considerJS
      See: https://tailwindcss.com/docs/content-configuration#class-detection-in-depth

      This is also the reason why string template styles don't work in Tailwind.
      See: https://tailwindcss.com/docs/content-configuration#dynamic-class-names
      Fix, use complete enums (single string) for style variations

      */}
      <p className="text-red-600">Hello this is sanjar</p>
    </div>
  );
}
