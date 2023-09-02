const ping = require('ping');

const HOSTS = [
    'google.com',
    'yahoo.com',
    'bing.com',
    'duckduckgo.com',
    'github.com',
    'stackoverflow.com',
    'amazon.com',
    'reddit.com',
    'wikipedia.org',
    'microsoft.com'
];
const INTERVAL_MS = 1 * 60 * 1000;
const TIMEOUT_SECONDS = 30;
const DURATION_MS = 8 * 60 * 60 * 1000;
let numPings = 0;
let currentIndex = 0;

const pingHost = async (host) => {
    try {
        let res = await ping.promise.probe(host, {
            timeout: TIMEOUT_SECONDS
        });
        numPings++;

        if (!res.alive) {
            console.log(`Failed to ping ${host} within ${TIMEOUT_SECONDS} seconds.`);
        } else {
            console.log(`Successfully pinged ${host}! Round-trip time: ${res.time}ms`);
        }
    } catch (error) {
        console.error(`Error while pinging ${host}: ${error.message}`);
    }
    console.log(`Number of pings: ${numPings}`);
};

const pingNext = () => {
    pingHost(HOSTS[currentIndex]);
    currentIndex = (currentIndex + 1) % HOSTS.length;  // Rotate through the hosts
};

setInterval(pingNext, INTERVAL_MS);
pingNext();

// Terminate the program after 8 hours
setTimeout(() => {
    console.log("8 hours have passed. Exiting program.");
    console.log(`Number of pings: ${numPings}`);
    process.exit(0);
}, DURATION_MS);
