import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    longDescription: { type: String, default: "" },
    techStack: [{ type: String, trim: true }],
    imageUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    repoUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["in-progress", "completed", "archived"],
      default: "completed",
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;