const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');


// Get All Members
router.get('/', (req, res) => {
    res.json(members);
})

// Get Single Member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    found ? res.json(members.filter(member => member.id === parseInt(req.params.id))) : 
    res.status(400).json({msg: `No member with the id of ${req.params.id} found`});
})

// Create Members
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        age: req.body.age,
        status: "active"
    }

    !newMember.name || !newMember.age ? res.status(400).json({msg: 'Please, pass in your name/age'}) :
    members.push(newMember)
    res.json(members);
})

module.exports = router;