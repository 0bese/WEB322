/*********************************************************************************
* WEB322 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Kojo Anyane Obese Student ID: 137653226 Date: May 15, 2024
*
********************************************************************************/

const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function findLongestWord(fileDataArray) {
  return fileDataArray.reduce((longest, current) => {
    return current.length > longest.length ? current : longest;
  });
}

function findMostFrequentWord(fileDataArray) {
    if (!fileDataArray.length) return null;
    var words = {};
    var mostRepeatedWord = fileDataArray[0], maxRepetitions = 1;
    fileDataArray.forEach(word => {
        if (!words[word]) words[word] = 1;
        else words[word]++;

        if (words[word] >= maxRepetitions && word != mostRepeatedWord) {
            mostRepeatedWord = word;
            maxRepetitions = words[word];
        }
    });
    return [mostRepeatedWord, maxRepetitions];
}


rl.question(
  "Do you wish to process a File (f) or directory (d): ",
  function (answer) {
    if (answer === "f") {
      rl.question("File: ", function (filename) {
        fs.readFile(filename, function (err, file) {
          if (err) {
            console.log(err.message);
          } else {
            file = file.toString().replace(/\s+/g, " ");
            console.log(
              "Number of Characters (including spaces): " + file.length
            );
            file = file.replace(/[^\w\s\']/g, "").split(" ");
            console.log("Number of Words: " + file.length);
            console.log("Longest Word: " + findLongestWord(file));
            console.log("Most repeated Word: " + findMostFrequentWord(file).join(" - ") + " times.");
          }
        });
        rl.close();
      });
    } else if (answer === "d") {
      rl.question("Directory: ", function (directory) {
        fs.readdir(directory, function (err, dirContent){
            if(err){
                console.log(err.message);
            } else {
                dirContent.sort().reverse();
                console.log("Files (reverse alphabetical order): " + dirContent.join(","));

                dirContent.forEach(file => {
                    console.log(file + ": " + fs.statSync(directory+"/"+file).size + " bytes");
                })
            }
        })
        rl.close();
      });
    } else {
      console.log("Invalid selection");
      rl.close();
    }
  }
);
