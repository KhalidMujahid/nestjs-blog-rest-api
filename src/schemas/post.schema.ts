import * as mongoose from "mongoose";

export const PostSchema: mongoose.Schema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);
