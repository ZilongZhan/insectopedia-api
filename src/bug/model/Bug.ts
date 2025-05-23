import mongoose, { Schema } from "mongoose";
import { BugStructure } from "../types.js";

const BugSchema = new Schema<BugStructure>(
  {
    commonName: {
      type: String,
      minlength: [3, "Minimum 3 characters required"],
      maxlength: [50, "Maximum 50 characters allowed"],
      required: true,
    },
    latinName: {
      type: String,
      minlength: [3, "Minimum 3 characters required"],
      maxlength: [50, "Maximum 50 characters allowed"],
      required: true,
    },
    description: {
      type: String,
      minlength: [50, "Minimum 50 characters required"],
      maxlength: [400, "Maximum 400 characters allowed"],
      required: true,
    },
    imageUrl: {
      type: String,
      match: [/\.(jpg|jpeg|png|gif|webp)$/i, "Invalid media/url format"],
      required: true,
    },
    isDangerous: {
      type: Boolean,
      default: false,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
      required: true,
    },
    phylum: {
      type: String,
      default: "other",
      required: true,
    },
    className: {
      type: String,
      default: "other",
      required: true,
    },
    order: {
      type: String,
      default: "other",
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

const Bug = mongoose.model("Bug", BugSchema, "bugs");

export default Bug;
