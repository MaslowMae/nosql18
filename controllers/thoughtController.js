const {User, Thought} = require('../models');

const thoughtController = {

    async getThoughts(req,res) {
        try{
            const thoguhts = await Thoughts.find().populate('thoughts');
            res.json(thoughts);
            } catch(err) {
                res.status(500).json(err);
                }
        },

        //get a thought
    async getSingleThought(req,res) {
        try{
            const thought = await Thought.findOne({_id: req.params.thoughtId})
            .populate('thoughts');

        if (!thought) {
            return res.status(404)
            .json({message: 'No thought with this ID'});
            }
        res.json(course);
            } catch(err) {
                res.status(500).json(err);
                }
        }
        
    };

    module.exports = thoughtController;