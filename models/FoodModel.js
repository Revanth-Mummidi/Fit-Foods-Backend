import mongoose from "mongoose";
const { Schema } = mongoose;

const foodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    nutrition: {
      type: Object,
      required: true,
    },
    categories: [
      {
        ref: "Categories",
        type: Schema.Types.ObjectId,
        required: true,
      },
    ],
    nonConsumableByHealthIssues: [{ type: String, required: true }],
    nonConsumableByAllergies: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

// Ensure indexes are created
foodSchema.index({ name: "text", desc: "text" });

const FoodModel = mongoose.model("Foods", foodSchema);
export default FoodModel;
