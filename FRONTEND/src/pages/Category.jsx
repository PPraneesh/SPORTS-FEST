import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Category() {
  const { category } = useParams();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/api/teams/${category}`)
      .then((res) => {
        setTeams(res.data.teams);
        console.log(res.data.teams);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching teams:", err);
        setError("Failed to fetch teams. Please try again later.");
        setLoading(false);
      });
  }, [category]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{category} Teams</h1>
      {teams.length === 0 ? (
        <p>No teams registered for this category.</p>
      ) : (
        <ul>
          {teams.map((team) => (
            <li key={team.id}>
              <h2>College: {team.collegeName}</h2>
              <p>Amount Paid: ${team.amount}</p>
              <h3>Main Players:</h3>
              <ul>
                {team?.mainplayers?.map((player, index) => (
                  <li key={index}>
                    <p>Name: {player.name}</p>
                    <p>Gender: {player.gender}</p>
                    <p>Email: {player.email}</p>
                    <p>Phone: {player.phone}</p>
                    <p>College ID: {player.collegeID}</p>
                  </li>
                ))}
              </ul>
              <h3>Substitutes:</h3>
              <ul>
                {team?.substitutes?.map((player, index) => (
                  <li key={index}>
                    <p>Name: {player.name}</p>
                    <p>Gender: {player.gender}</p>
                    <p>Email: {player.email}</p>
                    <p>Phone: {player.phone}</p>
                    <p>College ID: {player.collegeID}</p>
                  </li>
                ))}
              </ul>
              <h3>Payers Contact:</h3>
              <p>Name: {team.payersContact.name}</p>
              <p>Email: {team.payersContact.email}</p>
              <p>Mobile: {team.payersContact.mobileNumber}</p>
              <p>Payment Status: {team.payment_status ? "Paid" : "Pending"}</p>
              <p>Order ID: {team.order_id}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}