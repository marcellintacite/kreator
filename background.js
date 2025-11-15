// Open the welcome page after installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL("welcome.html") });
});

// Set the pannel to be shown when the icon is clicked
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));


//  Create context menu item : Summarize, Translate, Explain, etc.
const menuItems = [
  {
    id: "comment",
    title: "Sugérer un commentaire",
    contexts: ["selection"],
  },
  {
    id: "summarize",
    title: "Faire une synthèse",
    contexts: ["selection"],
  },
  {
    id: "explain",
    title: "Expliquez avec l'IA",
    contexts: ["selection"],
  },
];

// Add all menu items to the chrome context menu
menuItems.forEach((item) => {
  chrome.contextMenus.create({
    id: item.id,
    title: item.title,
    contexts: item.contexts,
  });
});

// Add envent listner for each context menu and store selected text
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (tab.url.includes("chrome://")) {
    return;
  }
  if (
    info.menuItemId === "summarize" ||
    info.menuItemId === "comment" ||
    info.menuItemId === "explain"
  ) {
    // get the selected text and store it, then open the side panel
    const selectedText = info.selectionText;
    const action = info.menuItemId;
    chrome.storage.local.set({ selectedText, action })
    chrome.sidePanel.open({ windowId: tab.windowId });
    // getSelecteTextAndSendMessage(tab, info.menuItemId);
  }
});
