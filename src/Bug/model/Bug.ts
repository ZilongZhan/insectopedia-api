import mongoose, { Schema } from "mongoose";
import { BugStructure } from "../types.js";

const BugSchema = new Schema<BugStructure>({
  commonName: {
    type: String,
    required: true,
  },
  latinName: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isDangerous: {
    type: Boolean,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    required: true,
  },
  order: {
    type: String,
    required: true,
  },
  phylum: {
    type: String,
    required: true,
  },
});

const Bug = mongoose.model("Bug", BugSchema, "bugs");

export default Bug;
