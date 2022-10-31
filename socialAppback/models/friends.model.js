const mongoose = require("mongoose");
const friendsSchema = mongoose.Schema(
  {
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: Number,
      enums: [0, 1, 2, 3],
    },
  },
  { timestamps: true }
);
const Friends = mongoose.model("Friends", friendsSchema);
module.exports = Friends;
