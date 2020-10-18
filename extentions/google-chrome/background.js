// listen messages from popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'refresh-configuration') {
        initSocketIO();
    }

    sendResponse({result: true});
});

function initSocketIO() {
    chrome.storage.sync.get(['socket_host', 'socket_port', 'page_domain_for_refresh', 'enabled'], function (result) {
        if (result.enabled !== true) {
            return;
        }
        const socket = io(result.socket_host + ':' + result.socket_port);
        socket.on('connect', () => {

        });
        socket.on('refresh', () => {
            chrome.tabs.getSelected(null, function (tab) {
                console.log(tab);
            });
        });
    });
}

initSocketIO();
