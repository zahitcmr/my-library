const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookHolderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
    set: function(value) {
      if (value != null) {
        this.pickedAt = new Date();
        this.dueTime = new Date(this.pickedAt.getTime() + 24 * 60 * 60 * 1000);
        this.status = "Not Available";
      }
      return value;
    },
  },
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
    validate: {
      validator: async function(value) {
        const book = await mongoose.model("Book").findById(value);
        return book !== null;
      },
      message: "Book does not exist in the database",
    },
  },
  status: { type: String, enum: ["Available", "Not Available"], default: "Available" },
  pickedAt: { type: Date },
  dueTime: { type: Date },
  returnedAt: {
    type: Date,
    set: function(value) {
      if (this.status === "Available") {
        return new Date();
      }
      if (this.status === "Not Available") {
        return null;
      }
      return value;
    },
  },
  lateFee: {
    type: Number,
    set: function(value) {
      if (this.status === "Not Available" && this.returnedAt > this.dueTime) {
        const diffInDays = Math.ceil((this.returnedAt - this.dueTime) / (1000 * 60 * 60 * 24));
        return diffInDays * 100;
      }
      return value;
    },
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("BookHolder", BookHolderSchema)