const express = require('express');
const cors = require('cors');
const axios = require('axios');
const port = process.env.port || 9999;
const url = 'https://api.telegram.org/bot';
const apiToken = process.env.telegramToken;


const callMyfunction= async (req, res) => {
     const chatId = req?.body?.message?.chat?.id
     const sentMessage = req?.body?.message?.text;

    console.log(req.body)
    axios.post(`${url}${apiToken}/sendMessage`,
            {
                chat_id: chatId,
                text: finalResponse.join(" ")
            })
            .then((response) => { 
                res.status(200).send(response);
            }).catch((error) => {
                res.send(error);
            });

          
};



const main = async () => {
    try {
      const server = express();
      server.use(express.json({ extended: false }));
      server.use(cors());
      server.post('/new', async (req, res) => {
        callMyfunction(req,res)
      })
      server.get('/',(req,res)=>{
        res.send("Welcome")
      })
  
      server.listen(port, (err) => {
        if (err) throw err;
        console.log(`server started at ${port}`);
      });
    } catch (err) {
      console.log('error in starting server', err);
      process.exit(1);
    }
  };



main();
