chrome.action.onClicked.addListener(async (tab) => {
    // Get the current tab's URL
    const [currentTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });
    if (currentTab) {
        const currentTabUrl = currentTab.url;

        // Url to check if 12ft.io will work
        const apiUrlToCheck = `https://12ft.io/api/proxy?ref=&q${encodeURIComponent(
            currentTabUrl,
        )}`;

        let urlToNavigateTo;

        // If 12ft.io has the article go there, if not go to archive.ph
        // If neccessary this could check an array of different sites to see which one works
        https: fetch(apiUrlToCheck)
            .then((res) => res.ok)
            .then((statusOk) => {
                if (statusOk) {
                    return `https://12ft.io/proxy?q=${encodeURIComponent(
                        currentTabUrl,
                    )}`;
                } else {
                    return `https://archive.ph/${encodeURIComponent(
                        currentTabUrl,
                    )}`;
                    // console.log("Cant find it, redirecting to archive.ph");
                }
            })
            .then((givenUrl) => {
                // console.log(urlToNavigateTo);
                // Perform the redirection
                chrome.tabs.update(currentTab.id, { url: givenUrl });
            });
    }
});
