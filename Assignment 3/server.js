/********************************************************************************
 * WEB322 – Assignment 03
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Kojo Anyane Obese Student ID: 137653226 Date: May 23, 2024
 *
 ********************************************************************************/
const express = require("express");
const legoData = require("./modules/legoSets");
const app = express();
const path = require("path");

const API_PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "public")));
//route
app.get("/", async (req, res) => {
  await res.sendFile(__dirname, "views", "home.html");
});

//GET LEGO SETS
app.get("/lego/sets", async (req, res) => {
  try {
    const sets = await legoData.getAllSets();
    res.json(sets);
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET LEGO SETS NUM-DEMO
app.get("/lego/sets/num-demo", async (req, res) => {
  const demoNum = "03093-1";
  try {
    const sets = await legoData.getSetByNum(demoNum);
    res.json(sets);
  } catch (error) {
    res.status(400).send(error);
  }
});

//GET LEGO SETS THEME-DEMO
app.get("/lego/sets/theme-demo", async (req, res) => {
  const demoTheme = "town";

  try {
    const set = await legoData.getSetsByTheme(demoTheme);
    res.json(set);
  } catch (error) {
    res.status(400).send(error);
  }
});

//ABOUT
app.get("/about", async (req, res) => {
  try {
    res.render("./views/about.html");
  } catch (error) {
    res.status(501).send(error);
  }
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

//SERVER RUNNING
app.listen(API_PORT, () => {
  console.log(`Server running on port ${API_PORT}`);
});
