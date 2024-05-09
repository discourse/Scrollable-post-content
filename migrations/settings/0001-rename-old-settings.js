export default function migrate(settings) {
  const oldToNewSetings = {
    Content_height: "scrollable_content_height",
    Scrollable_content_button_icon: "scrollable_content_button_icon",
  };

  Object.keys(oldToNewSetings).forEach((oldSetting) => {
    if (settings.has(oldSetting)) {
      settings.set(oldToNewSetings[oldSetting], settings.get(oldSetting));
      settings.delete(oldSetting);
    }
  });

  return settings;
}
