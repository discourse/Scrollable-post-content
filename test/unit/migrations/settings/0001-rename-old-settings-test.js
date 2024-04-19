import { module, test } from "qunit";
import migrate from "../../../../migrations/settings/0001-rename-old-settings";

module("Unit | Migrations | Settings | 0001-rename-old-settings", function () {
  test("rename settings", function (assert) {
    const settings = new Map(
      Object.entries({
        Content_height: "300",
        Scrollable_content_button_icon: "file-invoice",
      })
    );

    const result = migrate(settings);

    const expectedResult = new Map(
      Object.entries({
        scrollable_content_height: "300",
        scrollable_content_button_icon: "file-invoice",
      })
    );

    assert.deepEqual(
      Object.fromEntries(result.entries()),
      Object.fromEntries(expectedResult.entries())
    );
  });
});
