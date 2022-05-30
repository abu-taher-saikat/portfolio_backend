const express = require("express");
const cors = require("cors");
const projetRoutes = require("./routes/ProjetRoutes");
const userRoutes = require("./routes/UserRoutes");
const customerProjectRoutes = require("./routes/CustomerProjectRoutes");
const mongoose = require("mongoose");
require("dotenv").config();


const app = express();
// app.use(cors({origin : process.env.CLIENT_URL}));
app.use(cors());
app.use(express.json({extended: false}));



app.use("/projects", projetRoutes);
app.use("/users", userRoutes);
app.use("/customerProject", customerProjectRoutes);

app.use(express.static('uploads'));
app.use("/uploads", express.static("uploads"));

app.get('/check',(req,res)=>{
  res.status(200).send({
    "working" : true
  })
})


const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`server is running in port ${process.env.PORT || 5000}`)
);

mongoose
  .connect("mongodb+srv://saikat:saikat1095@cluster0.htwdq.mongodb.net/team_portfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("connected to db"))
  .catch((err) => console.error(err));


// old = mongodb+srv://saikat:saikat1095@cluster0.htwdq.mongodb.net/done_with_portfolio
