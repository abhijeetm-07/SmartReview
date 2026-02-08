const mongoose = require("mongoose");
const auditSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    aiResponse: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ruleSet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RuleSet",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Audit", auditSchema);
