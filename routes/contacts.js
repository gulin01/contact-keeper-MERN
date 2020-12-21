
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../modules/User');
const Contact = require('../modules/Contact');



// @route    GET api/contacts
// @description Get all users' contacts
// @access   Private
router.get('/',auth, async(req, res)=>{
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({
            date: -1 
        });
         
        res.json(contacts);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route    POST api/contacts
// @description  Add new Contact
// @access  Private
router.post(
    '/',
    [
    auth,
        [
    check('name','name is required')
    .not()
    .isEmpty()
]
],
 async (req, res)=>{
    const errors = validationResult(req);
     
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, phone, type}  = req.body;

     try {
        const newContact = new Contact({
             name,
             email,
             phone,
             type,
             user:req.user.id
        
        }) ;

        const contact = await newContact.save();

        res.json(contact);

     } catch (error) {
         console.error(error.message);
         res.status(500).send('server error');
     }
});


// @route    PUT api/contacts:id
// @description  Update contact
// @access   Private
router.put('/:id',auth, async (req,res)=>{

    const {name, email, phone, type}  = req.body;

    // Build contact object 
    const contactFields = {};

    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({msg: "contact not found"});

        // make sure user owns contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'not authorized'});
        }

        contact = await Contact.findByIdAndUpdate(req.params.id,
            {
                $set: contactFields
            },
            {
                new:true
            });

            res.json(contact);

        
    } catch (error) {
        console.error(error.message);
         res.status(500).send('server error');
        
    }


});


// @route    DELETE api/contacts:id
// @description  Delete contact
// @access   Private
router.delete('/:id',auth,  async(req,res)=>{
    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({msg: "contact not found"});

        // make sure user owns contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'not authorized'});
        }

        await Contact.findByIdAndDelete(req.params.id);


            res.json({msg: 'contact removed'});

        
    } catch (error) {
        console.error(error.message);
         res.status(500).send('server error');
        
    }
});

module.exports = router;