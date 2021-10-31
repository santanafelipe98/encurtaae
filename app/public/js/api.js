function shortenURL(originalURL, expirationTime, reCaptcha, callback) {
    const url = '/shorten';

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            original_url: originalURL,
            expiration_time: expirationTime,
            recaptcha: reCaptcha
        })
    }).then(response => {
        response.json().then(data => {
            callback(null, data);
        }).catch(err => {
            callback(err, null);
        });
    }).catch(err => {
        callback(err, null);
    });
}