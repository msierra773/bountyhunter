import React, { useEffect, useState } from "react";
import "./App.css";
import BountyCard from "./components/BountyCard";
import axios from "axios";
import frame from "./frame.png";
import hud from "./hud-trimmed.mp3";
import hudClose from "./hud-close.mp3";
import circle from "./circle3.png";
import buttonBlue from "./buttonBlue.png";
import submit from "./submit.mp3";

export default function App() {
  const [bounties, setBounties] = useState([]);
  const [activeBounty, setActiveBounty] = useState();
  const [count, setCount] = useState(0);
  const [toast, setToast] = useState(false);
  const [count2, setCount2] = useState(0);
  const [hudShow, setHudSHow] = useState(false);
  const [btn, setbtn] = useState(false);
  const [addBountyForm, setAddBountyForm] = useState({
    name: "",
    location: "",
    jediSith: false,
    living: true,
    image: "",
    skills: "",
    weapon: "",
    active: false,
    huntersNotes: "",
  });
  const [activeBountyNotes, setActiveBountyNotes] = useState({
    huntersNotes:""
  });



  function getBounties() {
    axios.get("/bounties").then((res) => {
      setBounties(res.data);
    });
  }

  useEffect(() => {
    getBounties();
  }, [count2]);

  useEffect(() => {
    let aB = bounties.filter((item) => item.active === true);
    setActiveBounty(aB[0]);
  }, [count, count2]);


  function updateNotes(e) {
    const {name , value} = e.target
      setActiveBountyNotes((prevState) =>{
        let result = {...prevState, [name]:value}
        return result
      })
   }

  function updateNotesSubmit() {
    console.log(activeBounty._id)

    axios.patch(`/bounties/${activeBounty._id}`, activeBountyNotes).then((res) => console.log(res));
  }

  function completeBounty() {
    setBounties((prevState) => {
      let result = [...prevState];
      let index = result.findIndex((item) => item.id === activeBounty.id);
      result[index].living = false;
      return result;
    });

    setToast(true);
  }

  function completeBountySubmit() {
    let index = bounties.findIndex((item) => item.id === activeBounty.id);
    let submitComplete = bounties[index];
    axios
      .put(`/bounties/${activeBounty.id}`, submitComplete)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    closeToast();
  }

  function closeToast() {
    setToast(false);
    setCount2((prevState) => prevState + 1);
  }

  function showHud() {
    let a = new Audio(hud);
    a.play();

    setHudSHow(true);
    setbtn(true);
  }

  function closeHud() {
    let a = new Audio(hudClose);
    a.play();
    setHudSHow(false);
  }

  function formChangeHandler(e) {
    const { name, value } = e.target;
    setAddBountyForm((prevState) => ({ ...prevState, [name]: value }));
    console.log(addBountyForm);
  }

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const submitBounty = async () => {
    let a = new Audio(submit);
    a.play();
    setbtn(false);
    axios
      .post("/bounties", addBountyForm)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    await delay(1500);
    setHudSHow(false);
    setCount2((prevState) => prevState + 1);
  };

  function checkBox(e) {
    let bool = e.target.checked;
    setAddBountyForm((prevState) => ({ ...prevState, jediSith: bool }));
  }

  function deleteBounty() {
    axios
      .delete(`/bounties/${activeBounty._id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setActiveBounty();
    setCount2((prevState) => prevState + 1);
  }

  const mappedBounties = bounties.map((item) => {
    return (
      <BountyCard
        {...item}
        key={item._id}
        setActiveBounty={setActiveBounty}
        activeBounty={activeBounty}
        bounties={bounties}
        setBounties={setBounties}
        count={count}
        setCount={setCount}
        activeBountyNotes={activeBountyNotes}
        setActiveBountyNotes={setActiveBountyNotes}

      />
    );
  });

  return (
    <>
      <div className="size-screen">
        Note: this is a desktop web application and is not meant for mobile displays please switch to a full view 
      </div>

      <div className={hudShow ? "hud active" : "hud"}>
        <div className="addBountyText">-- ADD BOUNTY -</div>
        <img src={frame} className="hud-image"></img>
        <div className="hud-div">
          <button
            onClick={() => {
              closeHud();
            }}
            className="hud-close-btn"
          >
            X
          </button>

          <img src={circle} width="70px" className="rotating"></img>

          <div className="add-bounty-form">
            <input className="input-form" placeholder="name" name="name" onChange={formChangeHandler}></input>
            <br />
            <input className="input-form" placeholder="location" name="location" onChange={formChangeHandler}></input>
            <br />
            <input className="input-form" placeholder="bountyAmount" name="bountyAmount" onChange={formChangeHandler}></input>
            <br />
            <input className="input-form" placeholder="Weapon of choice" name="weapon" onChange={formChangeHandler}></input>
            <br />
            <input className="input-form" placeholder="relevant skills" name="skills" onChange={formChangeHandler}></input>
            <input className="input-form" placeholder="Image Url" name="image" onChange={formChangeHandler}></input>
            <textarea placeholder="Hunters Notes" className="formTextArea input-form" name="huntersNotes" onChange={formChangeHandler}></textarea>

            <p className="jedi">Force User</p>
            <label className="switch">
              <input type="checkbox" name="jediSith" value="true" onChange={checkBox} />
              <span className="slider"></span>
            </label>

            <img src={buttonBlue} width="120px" className="button2c rotating" />
            <p className="form-submit-text pulsate" onClick={submitBounty}>
              Submit
            </p>
          </div>
        </div>
      </div>
      {toast && (
        <center>
          <div className="toast">
            <h2>Has the target been eliminated</h2>
            <button className="bounty-card-button" onClick={completeBountySubmit}>
              Yes
            </button>
            <button className="bounty-card-button toast-btn" onClick={closeToast}>
              Close
            </button>
          </div>
        </center>
      )}


      <div className="header">
        <button className="bounty-card-button" onClick={showHud}>
          ADD BOUNTY
        </button>
        <center>
          <h1 className="title">Bounty Hunters Terminal</h1>
        </center>
      </div>
      <div className="scanline"></div>
      <div className="body crt-scanlines crt-flicker crt-colorsep">



        <div className="bounties">{mappedBounties}</div>




        {activeBounty && (
          <center>
            <div className="active-bounty-card">
              <div
                className="active-bounty-picture"
                style={{
                  backgroundImage: activeBounty.living
                    ? `url(${activeBounty.image})`
                    : "url(https://t3.ftcdn.net/jpg/05/96/00/52/240_F_596005274_dhxXj37kQQ04VLYFWc06aGfSn6Kej1b8.jpg)",
                  backgroundRepeat: "noRepeat",
                }}
              ></div>
              <p className="active-bounty-title">{activeBounty.name}</p>
              <p className="active-bounty-ammount">${activeBounty.bountyAmount}.00</p>
            </div>
          </center>
        )}




        {activeBounty && (
          <div className="active-bounty-info">
            <div>
              <p>Force user : {activeBounty.jediSith ? "True" : "False"}</p>
              <p>Location : {activeBounty.location}</p>
              <p>Living : {activeBounty.living ? "True" : "False"}</p>
              <p>Skills : {activeBounty.skills}</p>
              <p>Weapon : {activeBounty.weapon}</p>
              <textarea
                className="hunters-notes"
                placeholder="Hunters Notes"
                name="huntersNotes"
                value={activeBountyNotes.huntersNotes}
                onChange={updateNotes}
              ></textarea>
              <br />
              <br />
              <button className="bounty-card-button" onClick={updateNotesSubmit}>
                Update Notes
              </button>
              <br />
              <br />
              <button className="bounty-card-button" onClick={completeBounty}>
                Complete
              </button>
              <br />
              <br />
              <button className="bounty-card-button" onClick={deleteBounty}>
                Delete
              </button>
              <br />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
