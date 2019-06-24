const express = require('express');
const path = require('path');
const logger = require('./Middlewares/logger');
const members = require('./Members');
const app = express();


// Init middleware
// app.use(logger);

// Get All Members
app.get('/api/members', (req, res) => {
    res.json(members);
})

// Get Single Member
app.get('/api/members/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    found ? res.json(members.filter(member => member.id === parseInt(req.params.id))) : 
    res.status(400).json({msg: `No member with the id of ${req.params.id} found`});
})

// Set static folder
app.use(express.static(path.join(__dirname, '/public')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))



