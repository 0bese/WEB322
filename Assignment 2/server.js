/********************************************************************************
 * WEB322 – Assignment 02
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
const app = express();
const API_PORT = process.env.PORT || 8000;
const legoData = require("./modules/legoSets");

//route
legoData.initialize().then(() => {
  app.get("/", (req, res) => {
    res.send("<h1>Assignment 2: Kojo Anyane Obese - 137653226</h1>");
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

  //SERVER RUNNING
  app.listen(API_PORT, () => {
    console.log(`Server running on port ${API_PORT}`);
  });
});
