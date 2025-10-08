import { apiInitializer } from "discourse/lib/api";
import I18n from "discourse-i18n";

export default apiInitializer((api) => {
  // This is a hack as applySurround expects a top level
  // composer key, not possible from a theme.
  const currentLocale = I18n.currentLocale();

  if (!I18n.translations[currentLocale].js.composer) {
    I18n.translations[currentLocale].js.composer = {};
  }
  I18n.translations[currentLocale].js.composer.scrollable_content_text = "  ";

  api.decorateCookedElement(
    (element) => {
      element
        .querySelectorAll(
          'div[data-theme-scrollable="true"]:not(.scrollable-initialized)'
        )
        .forEach((scrollableElement) => {
          scrollableElement.classList.add(
            "scrollable-content",
            "scrollable-initialized"
          );
          scrollableElement.innerHTML = `<div class="scrollable-content-inner">${scrollableElement.innerHTML}</div>`;
        });
    },
    { id: "scrollable-post-content" }
  );

  api.addComposerToolbarPopupMenuOption({
    action: (toolbarEvent) => {
      if (!toolbarEvent) {
        return;
      }
      toolbarEvent.applySurround(
        '<div data-theme-scrollable="true">',
        "</div>",
        "scrollable_content_text",
        { multiline: false }
      );
    },
    icon: settings.scrollable_content_button_icon,
    label: themePrefix("insert_scrollable_content"),
  });
});
