import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Admin() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/stats")
      .then((res) => {
        console.log(res.data);
        setStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      <h2>Total Revenue: {stats.data.totalRevenue}/-</h2>
      
      <h2>Total Students</h2>
      <ul>
        <li>Total: {stats.data.totalStudents.total}</li>
        <li>Male: {stats.data.totalStudents.male}</li>
        <li>Female: {stats.data.totalStudents.female}</li>
      </ul>
      
      <h2>Accommodation</h2>
      <ul>
        <li>Total: {stats.data.accommodation.total}</li>
        <li>Male: {stats.data.accommodation.male}</li>
        <li>Female: {stats.data.accommodation.female}</li>
      </ul>
      
      <h2>Meal Requirements</h2>
      <ul>
        <li>Breakfast: {stats.data.mealRequirements.breakfast}</li>
        <li>Lunch: {stats.data.mealRequirements.lunch}</li>
        <li>Dinner: {stats.data.mealRequirements.dinner}</li>
      </ul>
      
      <h2>Sport Participation</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Teams</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {stats.data.sportParticipation.map((sport, index) => (
            <tr key={index}>
              <Link to={`/admin/${sport.category}`}><td>{sport.category}</td></Link>
              <td>{sport.teams}</td>
              <td>{sport.revenue}/-</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h2>College Participation</h2>
      {Object.keys(stats.data.collegeParticipation).length === 0 ? (
        <p>No college participation data available.</p>
      ) : (
        <ul>
          {Object.entries(stats.data.collegeParticipation).map(([college, count], index) => (
            <li key={index}>{college}: {count}</li>
          ))}
        </ul>
      )}
    </div>
  );
}