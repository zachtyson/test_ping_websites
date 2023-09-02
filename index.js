const ping = require('ping');

const GOOGLE_HOST = 'google.com';
const INTERVAL_MS = 5 * 60 * 1000;
const TIMEOUT_SECONDS = 30;

const pingGoogle = async () => {
    let res = await ping.promise.probe(GOOGLE_HOST, {
        timeout: TIMEOUT_SECONDS
    });

    if (!res.alive) {
        console.log(`Failed to ping ${GOOGLE_HOST} within ${TIMEOUT_SECONDS} seconds.`);
        process.exit(1);
    } else {
        console.log(`Successfully pinged ${GOOGLE_HOST}!`);
    }
};

setInterval(pingGoogle, INTERVAL_MS);


pingGoogle();
