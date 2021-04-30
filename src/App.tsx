import React, { FunctionComponent, useEffect, useState} from "react";
import "./App.css";

type Meal = { key: number; name: string };

const data: Meal[] = [
  { key: 1, name: "Mac Cheese" },
  { key: 2, name: "Roast chicken" },
  { key: 3, name: "Fajita" },
  { key: 4, name: "Spicy Thai Peanut Sauce over Roasted Sweet Potatoes" },
  { key: 5, name: "Pizza" },
  { key: 6, name: "Prawn Masala" },
  { key: 7, name: "Beans and rice" },
  { key: 8, name: "Sugar Snap Pea and Carrot Soba Noodles" },
  { key: 9, name: "Eggs on Toast" },
];

// Challenge:
// Present the user with a list of meal suggestions.
// For each suggestion, the user can click a button labelled "Pick" or "Reject"
// Clicking the "Pick" button makes the selected meal appear in the list of "Chosen meals"
// Clicking the "Reject" button makes the selected meal appear in the list of "Rejected meals"
// After clicking either "Pick" or "Reject", the selected meal should be removed from the list of "Remaining suggestions"
//
// This App component provides the basic template for this functionality.
// Your challenge is to add click handlers to the "Pick" and "Reject" buttons
// and to compute the contents of the three lists:
//
// * remainingSuggestions
// * chosenMeals
// * rejectedMeals
//
// Good luck!

const App: FunctionComponent = () => {
  const allMeals = data;
  //const remainingSuggestions = allMeals;
  //const chosenMeals: Meal[] = [];
  // const rejectedMeals: Meal[] = [];

  const [remainingSuggestions, setRemainingSuggestions] = useState<Meal[]>(allMeals)
  const [chosenMeals, setChosenMeals] = useState<Meal[]>([])
  const [rejectedMeals, setRejectedMeals] = useState<Meal[]>([])

  /* You have to force re-render by copying the Meal arrays to a new object
  and work your changes on that object */
  const handlePick = (key: number, name: string) => {
    const idx = remainingSuggestions.findIndex(arr => arr.key === key);
    const newRemainingSuggestions : Meal[]  = [...remainingSuggestions];
    newRemainingSuggestions.splice(idx,1);
    setRemainingSuggestions(newRemainingSuggestions);
    const newChosenMeals : Meal [] = [...chosenMeals];
    newChosenMeals.push({"key":key, "name":name});
    setChosenMeals(newChosenMeals);
  }

  const handleReject = (key: number, name: string) => {
    const idx = remainingSuggestions.findIndex(arr => arr.key === key);
    const newRemainingSuggestions : Meal[]  = [...remainingSuggestions];
    newRemainingSuggestions.splice(idx,1);
    setRemainingSuggestions(newRemainingSuggestions);
    const newRejectedMeals : Meal [] = [...rejectedMeals];
    newRejectedMeals.push({"key":key, "name":name});
    setRejectedMeals(newRejectedMeals);
  }

  const handleReturn = (key: number, name: string) => {
    const idx = chosenMeals.findIndex(arr => arr.key === key);
    const newChosenMeals : Meal [] = [...chosenMeals];
    newChosenMeals.splice(idx,1);
    setChosenMeals(newChosenMeals);    
    const newRemainingSuggestions : Meal[]  = [...remainingSuggestions];
    newRemainingSuggestions.push({"key":key, "name":name});
    setRemainingSuggestions(newRemainingSuggestions);
  }

  const handleReturnFromRejected = (key: number, name: string) => {
    const idx = rejectedMeals.findIndex(arr => arr.key === key);
    const newRejectedMeals : Meal [] = [...rejectedMeals];
    newRejectedMeals.splice(idx,1);
    setRejectedMeals(newRejectedMeals);    
    const newRemainingSuggestions : Meal[]  = [...remainingSuggestions];
    newRemainingSuggestions.push({"key":key, "name":name});
    setRemainingSuggestions(newRemainingSuggestions);
  }

  useEffect (() => {

  })

  return (
    <div>
      <h1>Meal Planner</h1>

      <h2>Remaining suggestions</h2>
      <ul>
        {remainingSuggestions.map((meal) => {
          return (
            <li key={meal.key}>
              <span>{meal.name}</span>
              <button className="greenBtn" onClick={() => handlePick(meal.key, meal.name)}>Pick</button>
              <button className="redBtn" onClick={() => handleReject(meal.key, meal.name)}>Reject</button>
            </li>
          );
        })}
      </ul>

      <h2>Chosen meals</h2>
      <ul>
        {chosenMeals.map((meal) => {
          return (
          <li key={meal.key}>
          <span>{meal.name}</span>
          <button className="greenBtn" onClick={() => handleReturn(meal.key, meal.name)}>Return</button>
          </li>
        );
        })}
      </ul>

      <h2>Rejected meals</h2>
      <ul>
        {rejectedMeals.map((meal) => {
          return (
          <li key={meal.key}>
          <span>{meal.name}</span>
          <button className="greenBtn" onClick={() => handleReturnFromRejected(meal.key, meal.name)}>Return</button>
          </li>
        );
        })}
      </ul>
    </div>
  );
};

export default App;
