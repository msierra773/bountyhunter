import React, { useEffect, useState } from "react";
import uiSound from "../uiSound.mp3";

export default function BountyCard(props) {
  const [color, setColor] = useState("bounty-card");
  function setColorFunc() {
    if (props.living) {
      setColor("bounty-card");
    }
    if (!props.living) {
      setColor("completed");
    }
  }

  useEffect(() => {
    setColorFunc();
  }, []);

  function activate() {
    let a = new Audio(uiSound);
    a.play();
    props.setBounties((prevState) => {
      let result = [...prevState];
      for (let i = 0; i < result.length; i++) {
        result[i].active = false;
      }
      return result;
    });
    let index = props.bounties.findIndex((item) => item._id === props._id);

    props.setActiveBountyNotes((prevState) => {
      let result = { ...prevState };
      result.huntersNotes = props.bounties[index].huntersNotes;
      return result
    });

    props.setBounties((prevState) => {
      let result = [...prevState];
      result[index].active = true;
      return result;
    });
    props.setCount((prevState) => prevState + 1);
  }
  useEffect(() => {
    setColorFunc();
  }, [props.count]);

  return (
    <>
      <div id="bountyCard" className={props.active ? "bounty-card-selected" : `${color}`} onClick={activate}>
        <div className="bounty-card-thumbnail" style={{ backgroundImage: `url(${props.image})` }}></div>
        <div className="card-right">
          <p>Name: {props.name}</p>
          <p>Bounty: ${props.bountyAmount}.00</p>
        </div>
      </div>
    </>
  );
}
