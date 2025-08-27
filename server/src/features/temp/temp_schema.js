import { Schema, model } from "mongoose";
import toJSON from "../../plugin/toJSON.js";

// schema for temp user data
let tempSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  otp: String,
  createdAt: { 
    type: Date,
    expires: "15m",
    default: Date.now,
    select: false
   },
});

tempSchema.plugin(toJSON); 

//Export the model
export const Temp = model("temp", tempSchema);



