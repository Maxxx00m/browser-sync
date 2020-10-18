function code() {
    chrome.storage.sync.get(['socket_host', 'socket_port', 'page_domain_for_refresh'], function (result) {
        for (let key in result) {
            if (!result.hasOwnProperty(key)) {
                continue;
            }

            setValueForInput(key, result[key]);
        }
    });

    let saveButton = getElementById('save-configs');
    saveButton.addEventListener('click', () => {
        let configs = {
            'socket_host': getElementById('socket_host').value,
            'socket_port': getElementById('socket_port').value,
            'page_domain_for_refresh': getElementById('page_domain_for_refresh').value,
        }

        chrome.storage.sync.set(configs, function () {
            setNotificationText('Config saved');
            setTimeout(() => {
                setNotificationText('')
            }, 4000);
        });
    })

    function setNotificationText(text) {
        document.getElementById('notifications').textContent = text;
    }

    function getElementById(id) {
        return document.getElementById(id);
    }

    function setValueForInput(inputId, value) {
        getElementById(inputId).value = value;
    }
}

document.addEventListener('DOMContentLoaded', code);