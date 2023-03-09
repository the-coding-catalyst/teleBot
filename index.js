const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const port = 5001;
const url = 'https://api.telegram.org/bot';
const apiToken = '5602715484:AAFoeGmUud57haPHYvfKdV8MYvBEmbv88zQ'
const subscribers = []
// Configurations
app.use(bodyParser.json());
// Endpoints
app.post('/', (req, res) => {
     
     const chatId = req.body.message.chat.id;
     const sentMessage = req.body.message.text;
     // Regex for hello
     
     if (sentMessage.match(/subscribe/gi)) {
        
        // console.log("here1")
          axios.post(`${url}${apiToken}/sendMessage`,
               {
                    chat_id: chatId,
<<<<<<< HEAD
                    text: 'You have subscribed for daily updates'
=======
                    text: 'hello back 👋'
>>>>>>> parent of cb08d74... removed emoji
               })
               .then((response) => { 
                    res.status(200).send(response);
                    // console.log("here2", response)
               }).catch((error) => {
                    // console.log("here3",error)
                    res.send(error);
               });
     }else if (sentMessage.match(/unsubscribe/gi){
        axios.post(`${url}${apiToken}/sendMessage`,
               {
                    chat_id: chatId,
                    text: 'You have been unsubscribed'
               })
               .then((response) => { 
                    res.status(200).send(response);
                    // console.log("here2", response)
               }).catch((error) => {
                    // console.log("here3",error)
                    res.send(error);
               });
     }
      else {
          // if no hello present, just respond with 200 
          res.status(200).send({});
     }
});
// Listening
app.listen(port, () => {
     console.log(`Listening on port ${port}`);
});