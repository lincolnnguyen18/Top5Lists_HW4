const Top5List = require('../models/top5list-model');
const User = require('../models/user-model')

createTop5List = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Top 5 List',
        })
    }

    const { name, items, ownerEmail } = body;

    const savedUser = await User.findOne({ email: ownerEmail });

    if (!savedUser) {
        return res.status(401).json({
            message: 'Invalid email'
        });
    }

    console.log(savedUser);
    const top5List = new Top5List({name, items});

    savedUser.top5Lists.push(top5List);
    await savedUser.save();
    await top5List.save();

    return res.status(201).json({
        success: true,
        top5List: top5List,
        message: 'Top 5 List created!',
    })
}


updateTop5List = async (req, res) => {
    let { top5Lists } = await User.findById({ _id: req.userId});
    if (!top5Lists.includes(req.params.id)) {
        return res
            .status(404)
            .json({ success: false, error: `Top 5 List not found` })
    }
    const body = req.body
    console.log("updateTop5List: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Top5List.findOne({ _id: req.params.id }, (err, top5List) => {
        console.log("top5List found: " + JSON.stringify(top5List));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }

        top5List.name = body.name
        top5List.items = body.items
        top5List
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: top5List._id,
                    message: 'Top 5 List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Top 5 List not updated!',
                })
            })
    })
}

deleteTop5List = async (req, res) => {
    let { top5Lists } = await User.findById({ _id: req.userId});
    if (!top5Lists.includes(req.params.id)) {
        return res
            .status(404)
            .json({ success: false, error: `Top 5 List not found` })
    }
    Top5List.findById({ _id: req.params.id }, (err, top5List) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }
        Top5List.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: top5List })
        }).catch(err => console.log(err))
    })
}

getTop5ListById = async (req, res) => {
    let { top5Lists } = await User.findById({ _id: req.userId});
    if (!top5Lists.includes(req.params.id)) {
        return res
            .status(404)
            .json({ success: false, error: `Top 5 List not found` })
    }
    Top5List.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!list) {
            return res.status(404).json({ success: false, error: `Top 5 List not found` });
        }
        return res.status(200).json({ success: true, top5List: list })
    }).catch(err => console.log(err))
}
getTop5Lists = async (req, res) => {
    await Top5List.find({}, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Top 5 Lists not found` })
        }
        return res.status(200).json({ success: true, data: top5Lists })
    }).catch(err => console.log(err))
}
getTop5ListPairs = async (req, res) => {
    try {
        let { top5Lists } = await User.findOne({ _id: req.userId }).populate('top5Lists');
        if (!top5Lists) {
            return res
                .status(404)
                .json({ success: false, error: `Top 5 Lists not found` })
        } else {
            let pairs = [];
            top5Lists.forEach(list => {
                pairs.push({
                    _id: list._id,
                    name: list.name
                });
            });
            console.log(pairs);
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    } catch (error) {
        return res.status(400).json({ success: false, error: err })
    }
}
    // await Top5List.find({ }, (err, top5Lists) => {
    //     if (err) {
    //         return res.status(400).json({ success: false, error: err })
    //     }
    //     if (!top5Lists) {
    //         console.log("!top5Lists.length");
    //         return res
    //             .status(404)
    //             .json({ success: false, error: 'Top 5 Lists not found' })
    //     }
    //     else {
    //         // PUT ALL THE LISTS INTO ID, NAME PAIRS
    //         let pairs = [];
    //         for (let key in top5Lists) {
    //             let list = top5Lists[key];
    //             let pair = {
    //                 _id: list._id,
    //                 name: list.name
    //             };
    //             pairs.push(pair);
    //         }
    //         return res.status(200).json({ success: true, idNamePairs: pairs })
    //     }
    // }).catch(err => console.log(err))
// }

module.exports = {
    createTop5List,
    updateTop5List,
    deleteTop5List,
    getTop5Lists,
    getTop5ListPairs,
    getTop5ListById
}