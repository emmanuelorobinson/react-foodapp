import React from "react";
import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Extraordinary food. Delivered to your home</h2>
      <p>
        Choose your favourite meal from our range of cusine available to deliver
        right to your home
      </p>
      <p>
        All cusine are prepared with high quality ingredients from renowned
        chefs from across the globe.
      </p>
    </section>
  );
};

export default MealsSummary;
