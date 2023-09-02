const ping = require('ping');
const fs = require('fs');

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
const LOG_FILE = 'ping-log.txt';
let numPings = 0;
let currentIndex = 0;

const logToFile = (message) => {
    const timestampedMessage = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, timestampedMessage);
};

const pingHost = async (host) => {
    try {
        let res = await ping.promise.probe(host, {
            timeout: TIMEOUT_SECONDS
        });
        numPings++;

        if (!res.alive) {
            const errorMsg = `Failed to ping ${host} within ${TIMEOUT_SECONDS} seconds.`;
            console.log(errorMsg);
            logToFile(errorMsg);
        } else {
            const successMsg = `Successfully pinged ${host}! Round-trip time: ${res.time}ms`;
            console.log(successMsg);
            logToFile(successMsg);
        }
    } catch (error) {
        const errorMsg = `Error while pinging ${host}: ${error.message}`;
        console.error(errorMsg);
        logToFile(errorMsg);
    }
    const pingMsg = `Number of pings: ${numPings}`;
    console.log(pingMsg);
    logToFile(pingMsg);
};

const pingNext = () => {
    pingHost(HOSTS[currentIndex]);
    currentIndex = (currentIndex + 1) % HOSTS.length;  // Rotate through the hosts
};

setInterval(pingNext, INTERVAL_MS);
pingNext();

// Terminate the program after 8 hours
setTimeout(() => {
    const exitMsg = "8 hours have passed. Exiting program.";
    console.log(exitMsg);
    logToFile(exitMsg);
    const numPingsMsg = `Number of pings: ${numPings}`;
    console.log(numPingsMsg);
    logToFile(numPingsMsg);
    process.exit(0);
}, DURATION_MS);
