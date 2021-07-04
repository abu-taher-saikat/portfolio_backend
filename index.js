const express = require("express");
const cors = require("cors");
const experienceRoutes = require("./routes/ExperienceRoutes");
const educationRoutes = require("./routes/EducationRoutes");
const languageRoutes = require("./routes/LanguageRoutes");
const projetRoutes = require("./routes/ProjetRoutes");
const skillRoutes = require("./routes/SkillRoutes");
const userRoutes = require("./routes/UserRoutes");
const messageRoutes = require("./routes/MessageRoutes");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
// app.use(cors({origin : process.env.CLIENT_URL}));
app.use(cors());
app.use(bodyParser.json());

app.use("/educations", educationRoutes);
app.use("/experiences", experienceRoutes);
app.use("/languages", languageRoutes);
app.use("/projects", projetRoutes);
app.use("/skills", skillRoutes);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

app.use(express.static('uploads'));
app.use("/uploads", express.static("uploads"));

app.get('/check',(req,res)=>{
  res.status(200).send({
    "working" : true
  })
})

app.post('/postcheck',(req,res)=>{
  const getit = req.body.name;
  res.status(200).json({
    setit : getit
  })
})

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`server is running in port ${process.env.PORT}`)
);

mongoose
  .connect("mongodb+srv://saikat:saikat1095@cluster0.htwdq.mongodb.net/done_with_portfolio", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to db"))
  .catch((err) => console.error(err));
