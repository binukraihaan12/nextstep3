import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: {
    type: String,
    default: function () {
      // Split the name into first and last names
      const [firstName, lastName] = this.name.split(" ");
      // Generate the API URL using the full first and last names
      return `https://avatar.iran.liara.run/username?username=${encodeURIComponent(
        firstName
      )}+${encodeURIComponent(lastName || "")}`;
    },
  },
  address: { type: Object, default: { line1: "", line2: "" } },
  gender: { type: String, default: "Not Selected" },
  dob: { type: String, default: "Not Selected" },
  mobile: { type: String, default: "0000000000" },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
