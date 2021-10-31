module.exports.unique = (length = 8) => {
    const k = 51;
    const charTable = 'abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWYZ0123456789_-';

    let id = '';

    for (let i = 0; i < length; i++) {
        let pos = (k + (Date.now() * Math.random())) % charTable.length;
        let char = charTable.charAt(pos);
        id += char;
    }

    return id;
};