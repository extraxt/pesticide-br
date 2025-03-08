chrome.action.onClicked.addListener((tab) => {
  function toggleStyle() {
    const styleId = "pesticide-br-style";
    const existingStyle = document.getElementById(styleId);

    if (existingStyle) {
      existingStyle.remove();
      return false;
    } else {
      document.head.insertAdjacentHTML(
        "beforeend",
        `<style id="${styleId}">* { outline: 1px solid blue; }</style>`
      );
      return true;
    }
  }

  chrome.scripting
    .executeScript({ target: { tabId: tab.id }, func: toggleStyle })
    .then((results) => {
      const isEnabled = results[0].result;

      chrome.action.setIcon(
        isEnabled
          ? { path: { 64: "icon_blue.png" } }
          : { path: { 64: "icon.png" } }
      );
    });
});
