const ping = require('ping');

const GOOGLE_HOST = 'google.com';
const INTERVAL_MS = 5 * 60 * 1000;
const TIMEOUT_SECONDS = 30;
let numPings = 0;

const pingGoogle = async () => {
    try {
        let res = await ping.promise.probe(GOOGLE_HOST, {
            timeout: TIMEOUT_SECONDS
        });
        numPings++;

        if (!res.alive) {
            console.log(`Failed to ping ${GOOGLE_HOST} within ${TIMEOUT_SECONDS} seconds.`);
        } else {
            console.log(`Successfully pinged ${GOOGLE_HOST}! Round-trip time: ${res.time}ms`);
        }
    } catch (error) {
        console.error(`Error while pinging ${GOOGLE_HOST}: ${error.message}`);
    }
    console.log(`Number of pings: ${numPings}`);
};

setInterval(pingGoogle, INTERVAL_MS);
pingGoogle();
