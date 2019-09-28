// setup
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

const Database = [
  {
    id: 1,
    name: 'Mike',
    age: 20,
    job: 'Salesman'
  },
  {
    id: 2,
    name: 'Karen',
    age: 27,
    job: 'Manager'
  },
  {
    id: 3,
    name: 'Josh',
    age: 23,
    job: 'Driver'
  },
  {
    id: 4,
    name: 'Robert',
    age: 56,
    job: 'Owner'
  }
];

app.get("/", (request, response) => {
  response.json(Database);
});

app.post('/user/new/', (request, response) => {

  const {
    name,
    age,
    job
  } = request.body;

  const id = Database.length + 1;

  const newUser = {
    id,
    name,
    age,
    job,
  };

  // Adds the user to the fake database
  Database.push(newUser);

  // send success back in the response
  response.json({ success: true });
  
});

app.get('/user/:id', (request, response) => {

  // Grabbing the id parameter
  const { 
    id 
  } = request.params;
  
  // Searching for user with that id
  const searchedUser = Database.filter(user => {

    if (user.id === +id) {
      return user;
    }
    
  });

  // send searched user in the response
  response.json(searchedUser);
});

app.put('/user/update/name/', (request, response) => {

  // Grab name and id
  const {
    name,
    id
  } = request.body;

  // loops through the database
  Database.forEach(user => {

    // If the id matches then change the name
    if (user.id === +id) {
      user.name = name;
    }

  });

  // send success back in the response
  response.json({ success: true });
  
});

app.delete('/user/delete/:id', (request, response) => {

  // Grab the id
  const {
    id
  } = request.params;

  // Looking up the user with the same id
  const index = Database.findIndex(user => user.id === +id);

  // Deleting the user
  Database.splice(index, 1);

  // send success back in the response
  response.json({success: true });

});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
