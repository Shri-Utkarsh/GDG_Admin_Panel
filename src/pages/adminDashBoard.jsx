import React, { useState, useEffect } from "react";
import { db } from "../firebaseconfig";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";

import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";

const AdmindashBoard = () => {

    const navigate = useNavigate();

    const goToUserDashBoard = () => {
      navigate("/");
    }



    const [members, setMembers] = useState([]);
  const [scores, setScores] = useState({});

  // Fetch members from Firebase with real-time updates
  useEffect(() => {
    const membersCollection = collection(db, "members");
    const unsubscribe = onSnapshot(membersCollection, (snapshot) => {
      const membersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMembers(membersList);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Handle score input change
  const handleScoreChange = (id, score) => {
    setScores((prevScores) => ({
      ...prevScores,
      [id]: score,
    }));
  };

  // Save updated scores and update ranks in Firebase
  const saveScores = async () => {
    // Update scores in Firebase
    for (const [id, score] of Object.entries(scores)) {
      const memberDoc = doc(db, "members", id);
      await updateDoc(memberDoc, { score: parseInt(score) });
    }

    // Update ranks based on new scores
    const updatedMembers = members.map((member) => ({
      ...member,
      score: scores[member.id] !== undefined ? parseInt(scores[member.id]) : member.score,
    }));

    // Sort updated members by score in descending order and assign ranks
    updatedMembers.sort((a, b) => b.score - a.score);
    for (let i = 0; i < updatedMembers.length; i++) {
      const memberDoc = doc(db, "members", updatedMembers[i].id);
      await updateDoc(memberDoc, { rank: i + 1 }); // Assign rank based on sorted order
    }

    alert("Scores and ranks updated successfully!");
    setScores({}); // Clear the input fields after save
  };

  // Sort members by rank before rendering
  const sortedMembers = members.sort((a, b) => a.rank - b.rank);

  return (
    <div>
      {/* Main GDG Heading */}
      <Navbar/>
<div className="container">
  
<div className="flex items-center justify-between">
        {/* Select team field */}
        <div >
          <label className="text-lg font-semibold mr-2">Select team:</label>
          <select className="p-2 ml-0 570px:ml-4 w-48 border border-gray-500 rounded-md cursor-pointer">
            <option value="Technical">Technical</option>
            <option value="Technical">Graphics</option>
            <option value="Technical">Social Media Management</option>
            <option value="Technical">Video/Photograpgy</option>
            <option value="Technical">Content</option>
            <option value="Technical">Sponsorship Management</option>
            <option value="Technical">Event Management</option>
            <option value="Technical">Community</option>
            
          </select>
        </div>
        {/* The Two buttons */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2">
          <button onClick={goToUserDashBoard} className="admin-button">User Portal</button>
          <button onClick={saveScores} className="admin-button">Save</button>
        </div>
      </div>

      {/* The table */}
      <div>
        <table className="text-center w-full bg-white rounded-lg my-4">
          <thead>
            <tr className="text-gray-700 font-semibold">
              <th className="p-4">Rank</th>
              <th>Member Name</th>
              <th>Update Score</th>
            </tr>
          </thead>
          <tbody >
            {sortedMembers.map((member) => (
              <tr key={member.id} className={member.rank % 2 === 0 ? "bg-white" : "bg-purple-100"  }>
                <td className="p-4 rounded-l-xl ">#{member.rank}</td>
                <td >{member.name}</td>
                <td className="rounded-r-xl">
                  <input
                    type="text"
                    placeholder="Enter Score"
                    className="p-2 border rounded-md"
                    value={scores[member.id] || ""}
                    onChange={(e) => handleScoreChange(member.id, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
</div>
    </div>
  );
}

export default AdmindashBoard;
