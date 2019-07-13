'use strict';

/**
 * Created by David on 11/07/2019.
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: String,
	password: String,
	name: String,
	email: String,
	intentosLogin: Number,
	role: {
		type: String,
		enum: ['GUEST', 'EDITOR', 'ADMIN'],
		default: 'GUEST'
	},
}, {
	timestamps: {createdAt: "created_at", updatedAt: "updated_at"}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
