// import { Schema, model } from "mongoose";

// import { emailRegexp } from "../../constants/users.js";

// import { handleSaveError, setUpdateOptions } from "./hooks.js";

// const authUserSchema = new Schema({
// 	name: {
// 		type: String,
// 		required: true,
// 	},
// 	email: {
// 		type: String,
// 		unique: true,
// 		match: emailRegexp,
// 		required: true,
// 	},
// 	password: {
// 		type: String,
// 		required: true,
// 	}
// }, { versionKey: false, timestamps: true });

// authUserSchema.post("save", handleSaveError);

// authUserSchema.pre("findOneAndUpdate", setUpdateOptions);

// authUserSchema.post("findOneAndUpdate", handleSaveError);

// const authUserModel = model("user", authUserSchema);

// export default authUserModel;