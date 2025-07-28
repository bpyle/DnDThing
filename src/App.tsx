import React, { useEffect, useState } from "react";
import { DeskThing } from "@deskthing/client";
import { AppSettings, DEVICE_CLIENT } from "@deskthing/types";

const App: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [icons, setIcons] = useState<string[]>([]);
  const [actions, setActions] = useState<string[]>([]);
  const [backgroundColor, setBackgroundColor] = useState<string>();
  const [iconColor, setIconColor] = useState<string>();


  // Load settings on mount and subscribe to changes
  useEffect(() => {
    async function initialize() {
      const loadedSettings = await DeskThing.getSettings();
      console.log("Initial settings loaded:", loadedSettings);
      if (loadedSettings) {
        setSettings(loadedSettings);
      }
      DeskThing.send({ type: "get", request: "sampleData" });
    }
    initialize();

    const removeListener = DeskThing.on(
      DEVICE_CLIENT.SETTINGS,
      (data) => {
        console.log("Settings update received:", data.payload);
        if (data.payload) {
          setSettings(data.payload);
        }
      }
    );

    return () => {
      removeListener();
    };
  }, []);

  // Derive icons and actions when settings changes
  useEffect(() => {
    if (!settings) return;

    console.log("Processing settings to extract icons and actions...");

    const iconList = Object.values(settings)
      .filter(
        (setting) =>
          setting.id.startsWith("icon")
      )
      .map((setting) => setting.value as string);

    const actionList = Object.values(settings)
      .filter(
        (setting) =>
          setting.id.startsWith("act") && typeof setting.value === "string"
      )
      .map((setting) => setting.value as string);

    console.log("Extracted icons:", iconList);
    console.log("Extracted actions:", actionList);

    setIcons(iconList);
    setActions(actionList);
    setBackgroundColor((settings.color?.value as string) ?? "#000000");
    setIconColor((settings.buttonColor?.value as string) ?? "#A7A6BA");

  }, [settings]);
  // Send corresponding action to server
  function requestAction(index: number) {
    const action = actions[index - 1];
    console.log("Button clicked:", index, "-> action:", action);
    if (action) {
      DeskThing.send({ type: "action", payload: action });
    }
  }

  const buttons = Array.from({ length: 15 }, (_, i) => i + 1);

  if (!settings) {
    return <p className="text-white text-2xl">Loading settings...</p>;
  }

  return (
    <div style={{ backgroundColor: backgroundColor as string ?? "#000000"}} className="bg-black gap-2 flex-col w-screen h-screen flex justify-center items-center">
      <div className="table-container">
        {buttons.map((num) => (
          <button key={num} className="box" style={{ backgroundColor: iconColor as string ?? "#A7A6BA"}} onClick={() => requestAction(num)}>
            {icons[num-1] ? (<img
              src={ DeskThing.useProxy(icons[num - 1]) ?? "/icons/default.png"}
              
              className="w-full h-full object-cover box"
            />) : (<div></div>)}
            
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
