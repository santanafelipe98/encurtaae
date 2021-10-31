module.exports.parse = (str) => {
    let number   = parseInt(str.match(/(\d)/)[0]);
    let timeUnit = (str.match(/([sihdwmy]{1})/i)[0]).toLowerCase();

    let time = 0;

    switch (timeUnit) {
        case 's':
            time = 1000 * number; // Converte segundos para milisegundos
            break;
        case 'i':
            time = 1000 * number * 60; // Converte minutos para milisegundos
            break;
        case 'h':
            time = 1000 * number * 3600; // Converte horas para milisegundos
            break;
        case 'd':
            time = 1000 * number * 3600 * 24; // Converte dias para milisegundos
            break;
        case 'w':
            time = 1000 * number * 3600 * 24 * 7; // Converte semanas para milisegundos
            break;
        case 'm':
            time = 1000 * number * 3600 * 24 * 30; // Converte meses para milisegundos
            break;
        case 'y':
            time = 1000 * number * 3600 * 24 * 365; // Converte anos para milisegundos
            break;
        default:
            throw new TypeError(`"${timeUnit}" is not a valid time unit. Use [sihdwmy] instead.`);
    }

    return time;
};