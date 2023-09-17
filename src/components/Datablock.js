import React from "react";
import { translateDay } from "../helpers/translateDay";

function Datablock({ data }) {
  console.log(data);
  const temp = data.map((item) => item.TEMP);
  const visibilty = data.map((item) => item.VISIB);
  const windSpeec = data.map((item) => item.WDSP);
  const maxTemp = data.map((item) => item.MAX);
  const minTemp = data.map((item) => item.MIN);
  const fog = data.map((item) => item.FOG);
  const rain = data.map((item) => item.PRCP);
  const snow = data.map((item) => item.SNDP);

  return (
    <>
      {data[0].DAY}/{data[0].MONTH}/{data[0].YEAR} was a{" "}
      {translateDay(data[0].WEEKDAY)} <br />
      Average temperature was {temp}F <br />
      The Max temperature was {maxTemp}F <br />
      The Min temperature was {minTemp}F <br />
      There was {rain} inches of rain recorded <br />
      {fog[0] === 1 ? "It was foggy" : "No fog"} <br />
      {snow[0] !== 999.9
        ? `The snow was ${snow} inches`
        : "No snow this day"}{" "}
      <br />
    </>
  );
}

export default Datablock;
