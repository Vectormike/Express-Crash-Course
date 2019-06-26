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

// Update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
		const updateMember = req.body;
		members.map(member => {
            if (member.id === parseInt(req.params.id)) {
				member.name = updateMember.name ? updateMember.name : member.name;
                member.age = updateMember.age ? updateMember.age : member.age; 
		
				res.json({msg: 'Member updated', member});           
			} 
        })
    } else {
		res.status(400).json({msg: `No member with the id of ${req.params.id}`})
	}
});

// Delete Single Member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    found ? res.json({
        msg: 'Message deleted',
        members: members.filter(member => member.id !== parseInt(req.params.id))
    }) : 
    res.status(400).json({msg: `No member with the id of ${req.params.id} found`});
});


module.exports = router;