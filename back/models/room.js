'use strict';

/**
 * Created by David on 13/07/2019.
 */


const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User=require('./user');

const roomSchema = Schema({
	name:  String,
	desc:  String,
	owner: User
});


const Room = mongoose.model("Room", roomSchema);

module.exports=Room;
