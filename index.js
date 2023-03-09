const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const port = 5001;
const url = 'https://api.telegram.org/bot';
const apiToken = process.env.telegramToken;
// Configurations
app.use(bodyParser.json());
// Endpoints
app.post('/', (req, res) => {
     
     const chatId = req.body.message.chat.id;
     const sentMessage = req.body.message.text;
     // Regex for hello
     console.log((sentMessage);
     
     if (sentMessage.match(/hello/gi)) {
        console.log("----------")
          axios.post(`${url}${apiToken}/sendMessage`,
               {
                    chat_id: chatId,
                    text: 'hello back 👋'
               })
               .then((response) => { 
                    res.status(200).send(response);
               }).catch((error) => {
                    res.send(error);
               });
     } else {
          // if no hello present, just respond with 200 
          res.status(200).send({});
     }
});
// Listening
app.listen(port, () => {
     console.log(`Listening on port ${port}`);
});