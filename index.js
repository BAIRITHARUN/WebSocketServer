
const express = require("express");

const http = require('http')

const WebSocket = require('ws')

const PORT = process.env.PORT || 3001;


const app = express();

const server = http.createServer(app)

const wss = new WebSocket.Server({ server });

let sendEvents;


let starttimeout;

let count = 0;

wss.on('connection', (ws) => {

    ws.on('message', (message) => {
        console.log('received: %s', message);
        // ws.send(`Hello, you sent -> ${message}`);
        sendEvents =  setInterval(() => {
            let result = {
                time: Date.now(),
                count: count.toString()
            }
            ws.send(JSON.stringify(result))
            
        }, 1000)
    })
    
})

app.get('/removetimer', (req, res)=> {
    removeIntervals()
    res.send('cleared')
})

startincreament()

function startincreament () {
    starttimeout = setInterval(()=> {
        if(count == 0) {
            count = 10;
        } else {
            count = 0
        }
        console.log(count)
    }, 5000)
}

function removeIntervals () {
    clearInterval(starttimeout)
    clearInterval(sendEvents)
}

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
