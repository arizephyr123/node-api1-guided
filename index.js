//import express from 'express'; //ES Modules
//but use diff syntax in node.js:
const express = require("express"); //CommonJS Modules
const db = require("./data/hubs-model") // <<<< 1: import the database file

//create server
const server = express();

//will send back a JSON obj
server.get("/", (req, res) => {
  res.send({ api: "up and running..." });
});

//list of hubs -> GET to /hubs <<< 2: implement endpoint
server.get("/hubs", (req, res) => {
  //get the list of hubs from DB, but need access first
  db.find()
  .then(hubs => {
    //expecting array, maybe empty
    //if no status code declared, will give 200 by default
    res.status(200).json(hubs);
  })
  .catch(err => {
    console.log("error on GET /hubs:", err);
    res.status(500).json({ errorMessage: "error getting list of hubs from database" });
  });
});

// add a hub
server.post('/hubs', (req, res) => {
  // get the data the client sent.
  const hubData = req.body; // express does not know how to parse JSON.
  db.add(hubData)
  .then(newHub => {
      res.status(201).json(newHub); // 201 status code to add something to server.
  })
  .catch(err => {
      console.log('erro on POST to /hubs', err);
      res.status(500).json({ errorMessage: 'Error getting list of hubs from database' }) // let's other developer know intended response is json.
  })

  // call the db and add the hub.
})


// remove a hub by it's id
server.delete('/hubs/:id', (req, res) => {
  const id = req.params.id; // get param id from url
  db.remove(id)
  .then(removed => {
      if(removed) {
          res.status(200).json({message: 'hub removed successfully'});
      } else {
          // there was no hub with that id.
          res.status(404).json({message: 'hub not found.'});
      }
  })
  .catch(err => {
      console.log('erro on DELETE to /hubs', err);
      res.status(500).json({ errorMessage: 'Error getting list of hubs from database' }) // let's other developer know intended response is json.
  })
})

// update a hub, passing the id and the changes

const port = 4000;
server.listen(
  port,
  () => console.log(`/n ** API runnnig on port ${port} ** /n`)
);
