chrome.action.onClicked.addListener(async (tab) => {
    // Get the current tab's URL
    const [currentTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });

    if (currentTab) {
        const currentTabUrl = new URL(currentTab.url);
        currentTabUrl.search = "";

        const redirectUrl = `https://archive.ph/${encodeURIComponent(
            currentTabUrl.toString()
        )}`;

        // Perform the redirection
        console.log(`Redirecting to ${redirectUrl}...`);
        chrome.tabs.update(currentTab.id, { url: redirectUrl });
    }
});
