// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Dashboard = () => {
//   const [materials, setMaterials] = useState([]);

//   useEffect(() => {
//     const fetchMaterials = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/materials', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setMaterials(response.data.materials);
//       } catch (error) {
//         console.error('Error fetching materials:', error);
//       }
//     };

//     fetchMaterials();
//   }, []);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <ul>
//         {materials.map((material) => (
//           <li key={material.id}>{material.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Dashboard;
