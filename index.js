const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const port = 5001;
const url = 'https://api.telegram.org/bot';
const apiToken = '5602715484:AAFoeGmUud57haPHYvfKdV8MYvBEmbv88zQ'
const mongoose = require('mongoose')

// mongoose.connect('mongodb+srv://ramit:ramit@cluster0.8fdlu.mongodb.net/TeleBot?retryWrites=true&w=majority', (err)=>{
//     console.log("connected to db", err) 
// })
var subscribers = []

// const User = require('./model/user')
// Configurations
app.use(bodyParser.json());

// const getUsers = async () => {
//      const chatIds = [];
//      User.find({})
//     .then((users) => {
//         users.forEach((user) => {
//             chatIds.push(user.chatId);
//         });
//         console.log(chatIds);
//     })
//     .catch((err) => {
//         console.error(err);
//     });
//      return chatIds
// }
// // Endpoints
// var subscribers = getUsers()


app.post('/', (req, res) => {
     
     const chatId = req.body.message.chat.id;
     const sentMessage = req.body.message.text;
     // Regex for hello
     console.log(sentMessage, "this is sent message")
     
     if (sentMessage == "subscribe") {
        var text = ""
        if(!subscribers.includes(chatId)){
            text = 'You have subscribed for daily updates'
            subscribers.push(chatId)
          //   users.save()
            
        }else{
            text = "You have already subscribed"
        }
        
        // console.log("here1")
          axios.post(`${url}${apiToken}/sendMessage`,
               {
                    chat_id: chatId,
                    text: text
               })
               .then((response) => { 
                    res.status(200).send(response);
                    // console.log("here2", response)
               }).catch((error) => {
                    // console.log("here3",error)
                    res.send(error);
               });
               // sentMessage.match(/unsubscribe/gi)){
     }else if (sentMessage == "unsubscribe"){
        var text = ""
        if(subscribers.includes(chatId)){
            text = 'You have been unsubscribed'
            subscribers.pop(chatId)
        }else{
            text = "You have not subscribed"
        }
        axios.post(`${url}${apiToken}/sendMessage`,
               {
                    chat_id: chatId,
                    text: text
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
          text = "Enter subscribe or unsubscribe"
          axios.post(`${url}${apiToken}/sendMessage`,
               {
                    chat_id: chatId,
                    text: text
               })
               .then((response) => { 
                    res.status(200).send(response);
                    // console.log("here2", response)
               }).catch((error) => {
                    // console.log("here3",error)
                    res.send(error);
               });
     }
});



const getiPhone14Price = async () => {
    try {
      
      const price = 120000 // adjust this based on your API response
      return price;
    } catch (error) {
      console.error(error);
    }
  };
  
  // Send iPhone14 price update to all subscribers
  const sendiPhone14PriceUpdate = async () => {
    const price = await getiPhone14Price();
    const message = `???? iPhone14 Price Update ????\n\nThe latest price is $${price}.`;
//     console.log(users, "this is users info-----------------------------")
     subscribers.forEach((chatId) => {
        axios.post(`${url}${apiToken}/sendMessage`,
               {
                    chat_id: chatId,
                    text: message
               })
               .then((response) => { 
                    res.status(200).send(response);
                    // console.log("here2", response)
               }).catch((error) => {
                    // console.log("here3",error)
                    res.send(error);
               });
    });
  };
  
  // Set up a daily cron job to send price updates
  const cron = require('node-cron');
  cron.schedule('*/10 * * * * *', () => {
    sendiPhone14PriceUpdate();
  });
// Listening
app.listen(port, () => {
     console.log(`Listening on port ${port}`);
});