import React from "react";
import { translateMonth } from "../helpers/translateMonth";

function Datablock({ data }) {
  const totalCollisions = data.reduce(
    (total, item) => total + item.NUM_COLS,
    0
  );

  const getCyclistInjuries = data.reduce(
    (total, item) => total + item.CYC_INJD,
    0
  );

  const getCyclistDeath = data.reduce(
    (total, item) => total + item.CYC_KILL,
    0
  );

  const getMotoristInjuries = data.reduce(
    (total, item) => total + item.MOTO_INJD,
    0
  );

  const getMotoristDeath = data.reduce(
    (total, item) => total + item.MOTO_KILL,
    0
  );

  const getPedestriansInjuries = data.reduce(
    (total, item) => total + item.PEDS_INJD,
    0
  );

  const getPedestriansDeath = data.reduce(
    (total, item) => total + item.PEDS_KILL,
    0
  );

  const getPersonsInjuries = data.reduce(
    (total, item) => total + item.PERS_INJD,
    0
  );

  const getPersonsDeath = data.reduce(
    (total, item) => total + item.PERS_KILL,
    0
  );

  const totalFatalities =
    getCyclistDeath + getMotoristDeath + getPedestriansDeath + getPersonsDeath;
  const fatalityRate = (totalFatalities / totalCollisions) * 100;
  return (
    <>
      During {translateMonth(data[0].MONTH)}, {data[0].YEAR} in{" "}
      {data[0].BOROUGH} there were: <br />
      <ul>
        <li>
          A total of <b>{totalCollisions}</b> Collisions.
        </li>
        <li>
          A total of {getCyclistInjuries} cyclists injured and {getCyclistDeath}{" "}
          cyclists killed.
        </li>
        <li>
          A total of {getMotoristInjuries} motorists injured and{" "}
          {getMotoristDeath} motorists killed.
        </li>
        <li>
          A total of {getPedestriansInjuries} pedestrians injured and{" "}
          {getPedestriansDeath} pedestrians killed.
        </li>
        <li>
          A total of {getPersonsInjuries} persons (individuals) injured and{" "}
          {getPersonsDeath} persons (individuals) killed.
        </li>
        <li>The fatality rate for this month is {fatalityRate.toFixed(2)}%</li>
      </ul>
    </>
  );
}

export default Datablock;
