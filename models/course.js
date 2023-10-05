const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 2000,
    },
    category: {
      type: String,
      enum: ["IT", "Design", "Music", "Marketing", "Health", "Finance"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      minlength: 0,
      maxlength: 9999,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

// Define a function that validates journal entry input using Joi
function validateCourse(course) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    description: Joi.string().min(2).max(2000).required(),
    category: Joi.string().required(),
    price: Joi.number().integer().min(0).max(9999).required(),
    user: Joi.objectId().required(),
  });
  return schema.validate(course);
}

module.exports.Course = Course;
module.exports.validateCourse = validateCourse;
