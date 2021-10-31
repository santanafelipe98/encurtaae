const remainingTimeEl = document.getElementById('remaining_time');
const originalURLEl   = document.getElementById('original_url');
const btnAccessURL    = document.getElementById('btn_access_url');
const messageEl       = document.getElementById('message');

let counter = 5;

const timer = setInterval(() => {
    if (counter === 0) {
        remainingTimeEl.classList.add('hidden');
        messageEl.innerHTML = 'Tudo pronto!';

        showURLNAccessButton();
        clearInterval(timer);
    }

    remainingTimeEl.innerHTML = `${counter} s`;

    counter--;
}, 1000);

btnAccessURL.addEventListener('click', accessURL);

function showURLNAccessButton() {
    let originalURL = decodeURIComponent(atob(btnAccessURL.value));
    originalURLEl.innerHTML = originalURL;
    document.title          = 'Encurta.ae - Tudo pronto!';

    btnAccessURL.removeAttribute('disabled');
    btnAccessURL.classList.remove('hidden');
}

function accessURL(e) {
    let originalURL = decodeURIComponent(atob(e.target.value));
    location.href   = originalURL;
}