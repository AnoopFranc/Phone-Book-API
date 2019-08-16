const Contact = require('../models/contact');

exports.createContact = async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;

    const contact = new Contact({
        name: name,
        email: email,
        phone: phone,
        owner: req.user._id //got after auth middleware function
    })

    try {
        await contact.save()
        res.status(201).send(contact)
    } catch (e) {
        res.status(400).send(e)
    }
}

//can set pagination as query string ?limit=2&skip=2
//or default value of limit 2 and skip 0
exports.getAll = async (req, res) => {

     try {
        await req.user.populate({
            path: 'contacts',
            options: {
                limit: parseInt(req.query.limit) || 2,//limit the no of datas shown
                skip: parseInt(req.query.skip) || 0,// skip the number of data
                sort: {
                    name: 1
                }
            }
        }).execPopulate()
        res.send(req.user.contacts)
    } catch (e) {
        res.status(500).send()
    }
}



exports.updateContact = async (req, res) => {
    //checking if valid update
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email','phone']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if (!isValid) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const contact = await Contact.findOne({ _id: req.params.id, owner: req.user._id})

        if (!contact) {
            return res.status(404).send()
        }
        // updates for each field
        updates.forEach((update) => contact[update] = req.body[update])
        await contact.save()
        res.status(202).send(contact)
    } catch (e) {
        res.status(400).send(e)
    }
}