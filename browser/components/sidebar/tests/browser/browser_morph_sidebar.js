/* Any copyright is dedicated to the Public Domain.
   http://creativecommons.org/publicdomain/zero/1.0/ */

"use strict";

function selectedBackground() {
  return gBrowser.selectedTab.querySelector(".tab-background");
}

function radiusOf(tab) {
  return parseFloat(
    getComputedStyle(tab.querySelector(".tab-background")).borderTopLeftRadius
  );
}

add_task(async function test_morph_defaults() {
  const defaults = Services.prefs.getDefaultBranch("");
  ok(defaults.getBoolPref("browser.morph.enabled"), "Morph is on by default");
  ok(
    defaults.getBoolPref("sidebar.verticalTabs"),
    "Vertical tabs are on by default"
  );
});

add_task(async function test_selected_tab_geometry() {
  await SpecialPowers.pushPrefEnv({
    set: [
      ["sidebar.verticalTabs", true],
      ["browser.morph.enabled", true],
      ["ui.prefersReducedMotion", 1],
    ],
  });
  const tab = BrowserTestUtils.addTab(gBrowser, "about:blank");
  await BrowserTestUtils.switchTab(gBrowser, tab);
  const other = gBrowser.tabs.find(t => t != tab);

  Assert.equal(
    gBrowser.tabContainer.getAttribute("orient"),
    "vertical",
    "Tab strip is vertical"
  );
  Assert.greater(
    radiusOf(tab),
    radiusOf(other),
    "Selected tab has a rounder shape than resting tabs"
  );
  is(
    getComputedStyle(selectedBackground()).boxShadow,
    "none",
    "Selected surface is flat"
  );

  await SpecialPowers.pushPrefEnv({ set: [["browser.morph.enabled", false]] });
  await TestUtils.waitForCondition(
    () => radiusOf(tab) == radiusOf(other),
    "Without Morph the selected tab keeps the upstream shape"
  );
  ok(true, "Morph styling is removed when the pref is off");

  BrowserTestUtils.removeTab(tab);
  await SpecialPowers.popPrefEnv();
  await SpecialPowers.popPrefEnv();
});

add_task(async function test_reduced_motion() {
  await SpecialPowers.pushPrefEnv({
    set: [
      ["sidebar.verticalTabs", true],
      ["browser.morph.enabled", true],
      ["ui.prefersReducedMotion", 0],
    ],
  });
  Assert.greater(
    parseFloat(getComputedStyle(selectedBackground()).transitionDuration),
    0,
    "Selection surface transitions by default"
  );

  await SpecialPowers.pushPrefEnv({ set: [["ui.prefersReducedMotion", 1]] });
  is(
    parseFloat(getComputedStyle(selectedBackground()).transitionDuration),
    0,
    "Reduced motion removes the selection transition"
  );

  await SpecialPowers.popPrefEnv();
  await SpecialPowers.popPrefEnv();
});
