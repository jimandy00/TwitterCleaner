document.getElementById("startBtn").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    if (!tab || !tab.id) {
        setStatus("현재 탭을 찾을 수 없습니다.");
        return;
    }

    chrome.tabs.sendMessage(tab.id, {
        type: "START_RETWEET_CLEAN"
    });

    setStatus("리트윗 청소 시작 요청을 보냈습니다.");
});

document.getElementById("stopBtn").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    if (!tab || !tab.id) {
        setStatus("현재 탭을 찾을 수 없습니다.");
        return;
    }

    chrome.tabs.sendMessage(tab.id, {
        type: "STOP_RETWEET_CLEAN"
    });

    setStatus("중지 요청을 보냈습니다.");
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "RETWEET_CLEAN_STATUS") {
        setStatus(message.text);
    }
});

function setStatus(text) {
    document.getElementById("status").innerText = text;
}