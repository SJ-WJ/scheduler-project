import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spot === 0
  })
  
  const formatSpots = (props) => {
    if (props.spots === 0) {return <h3 className="text--light"> no spots remaining</h3>}
    else if (props.spot === 1) {return <h3 className="text--light"> 1 spot remaining</h3>}
    else {return <h3 className="text--light">{props.spots} spots remaining</h3>}
  }

  return (
    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2>
      {formatSpots(props)}
    </li>
  );
  
}