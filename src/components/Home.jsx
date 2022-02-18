import React, { useState } from "react";
import { user, rides } from "./Data";
import dateFormat, { masks } from "dateformat";

const Home = () => {
  const [User, setUser] = useState(user);
  const [Rides, setRides] = useState(rides);
  const [tempRides, setTemprides] = useState(rides);

  //handle upcoming rides
  const handleUpcoming = () => {
    setRides(tempRides);

    const currentDate = new Date();

    const newRides = Rides.filter((ride) => {
      const date = new Date(ride.date);
      if (date.getFullYear() > currentDate.getFullYear()) return true;
      else if (
        date.getFullYear() === currentDate.getFullYear() &&
        date.getMonth() > currentDate.getMonth()
      )
        return true;
      else if (
        date.getFullYear() === currentDate.getFullYear() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getDate() > date.getDate()
      )
        return true;
      else return false;
    });
    console.log(newRides);
    setRides(newRides);
  };

  //find distance of each ride
  const findDistance = (ride) => {
    var distance = -1;
    ride.station_path.every((x) => {
      if (x >= User.station_code) {
        distance = x - User.station_code;

        return false;
      }
      return true;
    });
    ride["distance"] = distance;
  };
  Rides.forEach((ride) => findDistance(ride));
  Rides.sort((a, b) => (a.distance > b.distance ? 1 : -1));

  return (
    <div className="bg-zinc-700 h-fit">
      <div className="flex flex-row p-6">
        <ul className="flex flex-row px-10 text-white">
          <li
            className="mr-6 cursor-pointer"
            onClick={() => setRides(tempRides)}
          >
            Nearest Rides
          </li>

          <li className="mr-6 cursor-pointer" onClick={handleUpcoming}>
            Upcoming rides
            <span className="text-black text-lg">({Rides.length})</span>
          </li>

          <li
            className="mr-6 cursor-pointer"
            onClick={() => setRides(tempRides)}
          >
            Past Rides
          </li>
        </ul>
      </div>
      <div>
        {Rides.map((ride) => {
          const date = new Date(ride.date);

          const formatedDate = dateFormat(date, " dS mmmm, yyyy, h:MM:ss TT");

          return (
            <div className="flex justify-between bg-gray-800 h-full m-4 ml-16 rounded-lg p-6 ">
              <img
                src={ride.map_url}
                className="h-36 w-72 rounded-lg"
                alt="map"
              />
              <ul className="flex mr-72 flex-col justify-around ml-5">
                <li className="text-gray-300">Ride Id: {ride.id}</li>
                <li className="text-gray-300">
                  Origin Station : {ride.origin_station_code}
                </li>
                <li className="text-gray-300">
                  station Path : [
                  {ride.station_path.map((val) => (
                    <span> {val}, </span>
                  ))}
                  ]
                </li>
                <li className="text-gray-300">Date : {formatedDate}</li>
                <li className="text-gray-300">Distance : {ride.distance}</li>
              </ul>
              <div className="flex flex-row">
                <li className="text-white mx-2 list-none rounded-full text-sm bg-zinc-900 p-1 h-fit">
                  <span className="mx-2">{ride.state}</span>
                </li>
                <li className="text-white mx-2 list-none rounded-full text-sm bg-zinc-900 p-1 h-fit">
                  <span className="mx-2">{ride.city}</span>
                </li>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
