import React, { useState } from "react";
import "./App.css";
import { readTextFile } from "./utils/utils";
import Forest from './component/Forest'

function App() {
  const [forest, updateState] = useState(createForest("/18.txt"))
  const [counter, updateCounter] = useState(0)
  const onClick = () => {
    updateState(updateForest(forest))
    updateCounter(counter + 1)
  }
  return <div className="App">
    <Forest table={forest} />
    <button onClick={onClick}>Next</button>
    <label>{counter}</label>
    <label>{calculateResult(forest)}</label>
  </div>;
}

const calculateResult = forest =>
  forest.flat().filter(c => c === "|").length *
  forest.flat().filter(c => c === "#").length;

const createForest = fileName =>
  readTextFile(fileName)
    .split("\n")
    .map(line => line.replace("\r", ""))
    .map(chaine => chaine.split(""));

const updateForest = function(forest) {
  let newForest = [];
  for (let i = 0; i < forest.length; i++) {
    newForest.push([]);
    for (let j = 0; j < forest[0].length; j++) {
      newForest[i].push(updateAcre(forest, i, j));
    }
  }
  return newForest;
};

const updateAcre = function(forest, i, j) {
  let newSectorAcre = [forest[i + 1], forest[i], forest[i - 1]]
    .filter(line => line !== undefined)
    .map(line => [line[j - 1], line[j], line[j + 1]])
    .flat();

  switch (forest[i][j]) {
    case ".":
      if (newSectorAcre.filter(a => a === "|").length >= 3) {
        return "|";
      }
      break;
    case "|":
      if (newSectorAcre.filter(a => a === "#").length >= 3) {
        return "#";
      }
      break;
    case "#":
      if (
        newSectorAcre.filter(a => a === "#").length === 1 ||
        newSectorAcre.filter(a => a === "|").length === 0
      ) {
        return ".";
      }
      break;
    default:
      break;
  }
  return forest[i][j];
};

export default App;
