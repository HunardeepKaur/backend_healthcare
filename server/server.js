const express = require("express");
const connectDb = require("./config/dbConnections.js");
const errorHandler = require("./middlewares/errorHandler.js");
const cors = require("cors");
const multer = require("multer");
const hbs = require("hbs");
const path = require("path");
const dotenv = require("dotenv");
const Profile = require("./model/Profile");  // Changed Profie to Profile
dotenv.config();

// Connect to the database
connectDb();

const app = express();
const port = 3000 || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set up view engine for handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views/partials"));

// Routes
app.get("/", (req, res) => {
  res.send("working");
});

app.get("/home", (req, res) => {
  res.render("home", {
    username: "xyz",
    posts: "flana dhimkana",
  });
});

app.get("/allusers", (req, res) => {
  res.render("allusers", {
    data: [
      { name: "abc", age: 20 },
      { name: "def", age: 19 },
    ],
  });
});

const users = [
  { name: "Harman Dhiman", age: 20 },
  { name: "Hindveer", age: 19 },
  { name: "Jaikirat", age: 20 },
];

app.get("/alluser", (req, res) => {
  res.render("alluser", {
    users: users,
  });
});

// Set up storage for multer (local storage)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

// Profile upload route
app.post("/profile", upload.single("avatar"), async function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  const { title } = req.body;
  const { path } = req.file;
  
  // Save the uploaded profile image path and title in MongoDB
  const newProfile = new Profile({ title: title, image: path });  // Changed Profie to Profile
  await newProfile.save();
  
  res.render("profile", { image: path });
});

// Fetch all profiles from the database
app.get("/profile", async (req, res) => {
  const allProfiles = await Profile.find(); 
   // Changed Profie to Profile
   console.log("image working")
  res.render("profile", { profile: allProfiles });
});

// Register routes
app.use("/api/register", require("./routes/userRoutes"));
app.use("/api/doctorRegister", require("./routes/doctorsDetails.js"));

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
