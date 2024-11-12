import React from "react";
import Navbar from "../components/Navbar";
import "../styles/userDashBoard.css"
import user1 from "../assets/1.png"
import user2 from "../assets/2.png"
import user3 from "../assets/3.png"
import { Link } from "react-router-dom";

export default function UserDashBoard() {



  return (
    <>
      <Navbar />
      <div className="container">
        <div className="team-select">
          <div>
            <label htmlFor="team">Select team:</label>
            <select id="team">
              <option value="Technical">Technical</option>
            </select>
          </div>
          <Link to={"/admin"}> <button className="admin-button">Admin Portal</button></Link>
         
        </div>
        <div className="top-three">
          <div>
            <img src={user1} alt="Wiktoria" />
            <p>2. Wiktoria</p>
          </div>
          <div>
            <img src={user2} alt="Matt Dickerson" />
            <p>1. Matt Dickerson</p>
          </div>
          <div>
            <img src={user3} alt="Trixie Byrd" />
            <p>3. Trixie Byrd</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Team Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="aligntrophy">
                <span className="trophy">🏆</span> #1
              </td>
              <td>Matt Dickerson</td>
              <td>Technical</td>
            </tr>
            <tr>
              <td className="aligntrophy">
                <span className="trophy">🥈</span> #2
              </td>
              <td>Wiktoria</td>
              <td>Technical</td>
            </tr>
            <tr>
              <td className="aligntrophy">
                <span className="trophy">🥉</span> #3
              </td>
              <td>Trixie Byrd</td>
              <td>Technical</td>
            </tr>
            <tr>
              <td>#4</td>
              <td>Brad Mason</td>
              <td>Technical</td>
            </tr>
            <tr>
              <td>#5</td>
              <td>Sanderson</td>
              <td>Technical</td>
            </tr>
            <tr>
              <td>#6</td>
              <td>Jun Redfern</td>
              <td>Technical</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
