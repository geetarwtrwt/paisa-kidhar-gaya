import mongoose, { Schema, model, models } from "mongoose";

let expenseSchema = new Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
    icon: { type: String },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    type: { type: String, default: "expense", required: true },
    date: { type: Date, default: Date.now },
    note: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Expense = models.expense || model("expense", expenseSchema);
