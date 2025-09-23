import { click, visit } from "@ember/test-helpers";
import { test } from "qunit";
import { cloneJSON } from "discourse/lib/object";
import topicFixtures from "discourse/tests/fixtures/topic";
import { acceptance } from "discourse/tests/helpers/qunit-helpers";
import selectKit from "discourse/tests/helpers/select-kit-helper";
import { i18n } from "discourse-i18n";

acceptance("Scrollable post content", function (needs) {
  needs.user();

  test("composer button", async function (assert) {
    await visit("/");

    await click("#create-topic");
    await click(".d-editor-button-bar .options");

    const categoryChooser = selectKit(".category-chooser");
    await categoryChooser.expand();
    await categoryChooser.selectRowByValue(2);

    const buttonSelector = `.dropdown-menu__item .btn[title='${i18n(
      themePrefix("insert_scrollable_content")
    )}']`;
    await click(buttonSelector);

    assert
      .dom("textarea.d-editor-input")
      .hasValue(
        `<div data-theme-scrollable="true">${i18n(
          "composer.scrollable_content_text"
        )}</div>`
      );
  });

  needs.pretender((server, helper) => {
    server.get("/t/45.json", () => {
      let topic = cloneJSON(topicFixtures["/t/28830/1.json"]);
      topic["post_stream"]["posts"][0]["cooked"] =
        '<div data-theme-scrollable="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>';
      return helper.response(topic);
    });
  });

  test("render in post", async function (assert) {
    await visit("/t/-/45");

    assert.dom(".scrollable-content").exists();
    assert.dom(".scrollable-initialized").exists();
    assert
      .dom(".scrollable-content-inner")
      .hasText("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  });
});
