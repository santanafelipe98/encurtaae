const inputURL               = document.getElementById('original_url');
const inputExpirationTime    = document.getElementById('expiration_time');
const btnShorten             = document.getElementById('btn_shorten');
const preloader              = document.getElementById('loading_spinner');
const feedbackMessage        = document.getElementById('feedback_message');
const shortURLEl             = document.getElementById('short_url');

function showFeedbackMessage(message, type = 'info') {
    feedbackMessage.classList.remove('alert-info');
    feedbackMessage.classList.remove('alert-success');
    feedbackMessage.classList.remove('alert-warning');
    feedbackMessage.classList.remove('alert-danger');

    feedbackMessage.innerHTML = message;
    feedbackMessage.classList.remove('hidden');
    feedbackMessage.classList.add('fadein');
    feedbackMessage.classList.add(`alert-${type}`);
}

function showShortURL(shortURL) {
    shortURLEl.classList.remove('hidden');
    shortURLEl.classList.add('fadein');

    let href = location.href;
    let fullURL = href.substr(0, href.length - 1) + shortURL;


    shortURLEl.innerHTML = 
    `
        <a class="txt-lg txt-strong" href="${shortURL}">
            encurtaae${shortURL}
        </a>
        <textarea id="short_url_text" class="hidden" value="${fullURL}">${fullURL}</textarea>
        <div class="tooltip">
            <button type="button" id="btn_copy_url_clipboard" value="${shortURL}" class="btn btn-action">
                <i class="far fa-clipboard"></i>
            </button>
            <span class="tooltiptext" id="tooltip_copy_url">Copiar</span>
        </div>
        
    `;
}

function urlToClipboard() {
    let tooltip = document.getElementById('tooltip_copy_url');
    let url     = document.getElementById('short_url_text');

    url.select()
    url.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(url.value);

    tooltip.innerHTML = 'Copiado';
}

function resetCAPTCHA() {
    grecaptcha.reset();
}

document.addEventListener('click', e => {
    let target = e.target;

    if (target.tagName == 'BUTTON'
        && target.id == 'btn_copy_url_clipboard') {
        urlToClipboard();
    } else {
        let parentEl = target.parentElement; 
        if (parentEl
                && parentEl.tagName == 'BUTTON'
                && parentEl.id == 'btn_copy_url_clipboard') {
            urlToClipboard();
        }
    }
});

btnShorten.addEventListener('click', () => {
    let originalURL     = inputURL.value;
    let expirationTime  = inputExpirationTime.value;
    let reCaptcha       = grecaptcha.getResponse();

    if (reCaptcha.length == 0) {
        showFeedbackMessage('Resolva o CAPTCHA acima.', 'danger');

        return;
    }

    inputURL.setAttribute('disabled', true);
    inputExpirationTime.setAttribute('disabled', true);
    btnShorten.setAttribute('disabled', true);
    
    preloader.classList.remove('hidden');

    shortenURL(originalURL, expirationTime, reCaptcha,(err, data) => {

        if (!err) {
            if (data['error']) {
                if (data['errors']) {
                    showFeedbackMessage(data['errors'][0].msg, 'danger');
                } else {
                    showFeedbackMessage(data['error'], 'danger');
                }
            } else {
                let { short_url, expire_at } = data.payload;
                let expireAt      = new Date(expire_at);
                let formattedDate = `${expireAt.toLocaleDateString()} às ${expireAt.toLocaleTimeString()}`;


                showFeedbackMessage(`Sua URL está pronta! Expira em ${formattedDate}.`, 'success');
                showShortURL(short_url);
            }
        } else {
            showFeedbackMessage(err.toString(), 'danger');
        }

        preloader.classList.add('hidden');

        inputURL.removeAttribute('disabled');
        inputExpirationTime.removeAttribute('disabled');
        btnShorten.removeAttribute('disabled');

        resetCAPTCHA();
    });
});