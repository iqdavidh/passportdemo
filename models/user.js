'use strict';

/**
 * Created by David on 11/07/2019.
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: String,
	password: String,
	intentosLogin: Number
}, {
	timestamps: {createdAt: "created_at", updatedAt: "updated_at"}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
