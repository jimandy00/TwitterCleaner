console.log("content.js loaded");

let isCleaning = false;
let cleanedCount = 0;

chrome.runtime.onMessage.addListener((message) => {
    console.log("message received", message);

    if (message.type === "START_RETWEET_CLEAN") {
        if (isCleaning) {
            sendStatus("이미 실행 중입니다.");
            return;
        }

        isCleaning = true;
        cleanedCount = 0;
        cleanPostsAndReposts();
    }

    if (message.type === "STOP_RETWEET_CLEAN") {
        isCleaning = false;
        sendStatus(`중지했습니다.\n처리한 수: ${cleanedCount}`);
    }
});

async function cleanPostsAndReposts() {
    sendStatus("삭제/재게시 취소 대상을 찾는 중입니다.");

    while (isCleaning) {
        const article = findFirstArticle();

        if (!article) {
            sendStatus(`현재 화면에서 게시물을 찾지 못했습니다.\n처리한 수: ${cleanedCount}`);
            isCleaning = false;
            return;
        }

        article.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        await wait(600);

        const deleted = await tryDeleteOwnPost(article);

        if (deleted) {
            cleanedCount++;
            sendStatus(`내 글 삭제 중...\n처리한 수: ${cleanedCount}`);
            await wait(2000);
            continue;
        }

        const unretweeted = await tryUndoRepost(article);

        if (unretweeted) {
            cleanedCount++;
            sendStatus(`재게시 취소 중...\n처리한 수: ${cleanedCount}`);
            await wait(1800);
            continue;
        }

        sendStatus("현재 게시물에서 삭제/재게시 취소 버튼을 찾지 못했습니다.\n다음 게시물이 보이도록 스크롤 후 다시 실행하세요.");
        isCleaning = false;
        return;
    }
}

function findFirstArticle() {
    const articles = Array.from(document.querySelectorAll("article"));
    return articles[0] || null;
}

async function tryDeleteOwnPost(article) {
    const moreButton = findMoreButtonInArticle(article);

    if (!moreButton) {
        return false;
    }

    moreButton.click();
    await wait(700);

    const deleteMenu = findDeleteMenuItem();

    if (!deleteMenu) {
        pressEscape();
        await wait(300);
        return false;
    }

    deleteMenu.click();
    await wait(700);

    const confirmButton = findDeleteConfirmButton();

    if (!confirmButton) {
        return false;
    }

    confirmButton.click();
    return true;
}

async function tryUndoRepost(article) {
    const repostButton = findRepostButtonInArticle(article);

    if (!repostButton) {
        return false;
    }

    repostButton.click();
    await wait(700);

    const undoMenu = findUndoRepostMenuItem();

    if (!undoMenu) {
        pressEscape();
        await wait(300);
        return false;
    }

    undoMenu.click();
    return true;
}

function findMoreButtonInArticle(article) {
    const buttons = Array.from(article.querySelectorAll("button"));

    return buttons.find(button => {
        const testId = button.getAttribute("data-testid") || "";
        const ariaLabel = button.getAttribute("aria-label") || "";

        return testId === "caret"
            || ariaLabel.includes("More")
            || ariaLabel.includes("더 보기")
            || ariaLabel.includes("더보기");
    });
}

function findRepostButtonInArticle(article) {
    const buttons = Array.from(article.querySelectorAll("button"));

    return buttons.find(button => {
        const testId = button.getAttribute("data-testid") || "";
        const ariaLabel = button.getAttribute("aria-label") || "";

        return testId === "unretweet"
            || testId === "retweet"
            || ariaLabel.includes("Undo repost")
            || ariaLabel.includes("Repost")
            || ariaLabel.includes("재게시")
            || ariaLabel.includes("리트윗")
            || ariaLabel.includes("리포스트");
    });
}

function findDeleteMenuItem() {
    const menuItems = Array.from(document.querySelectorAll('[role="menuitem"]'));

    return menuItems.find(item => {
        const text = item.innerText || "";
        return text.includes("삭제하기") || text.includes("Delete");
    });
}

function findDeleteConfirmButton() {
    const buttons = Array.from(document.querySelectorAll("button"));

    return buttons.find(button => {
        const text = (button.innerText || "").trim();
        const testId = button.getAttribute("data-testid") || "";

        return testId === "confirmationSheetConfirm"
            || text === "삭제"
            || text === "Delete";
    });
}

function findUndoRepostMenuItem() {
    const menuItems = Array.from(document.querySelectorAll('[role="menuitem"]'));

    return menuItems.find(item => {
        const text = item.innerText || "";

        return text.includes("재게시 취소")
            || text.includes("리포스트 취소")
            || text.includes("리트윗 취소")
            || text.includes("Undo repost");
    });
}

function pressEscape() {
    document.dispatchEvent(new KeyboardEvent("keydown", {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        which: 27,
        bubbles: true
    }));
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sendStatus(text) {
    chrome.runtime.sendMessage({
        type: "RETWEET_CLEAN_STATUS",
        text
    });
}