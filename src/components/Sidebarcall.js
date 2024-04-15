'use client'

import React, { useState, useEffect } from 'react';
// import { StyleSheet } from "react-native";

// const [data, setData] = useState([]);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:3003/question/read/1');

//       setData(response.data.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   fetchData();
//   const intervalId = setInterval(fetchData, 5000);
//   return () => clearInterval(intervalId);
// }, [token]);


export default function Sidebarcall() {
  return (
    <aside className="menu text-black w-full md:w-64">
      <nav>
        <ul>
          <li className="block py-3 px-4 item-menu m-2"><a href="/dashboard/pending-now">View Question Script</a></li>
          <li className="pl-5"><a href="/dashboard/pending-now" className="block py-3 px-4 item-menu m-2">Indonesia</a></li>
          <li className="pl-5"><a href="/dashboard/pending-later" className="block py-3 px-4 item-menu m-2">English</a></li>
        </ul>
      </nav>
      <br/>
      <nav>
        <ul className="p-2">
          <li>
            <select id="countries" class="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
              <option selected>Select Question Type</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </li>
          <li></li>
        </ul>
      </nav>
    </aside>
  );
}

// const styles = StyleSheet.create({
//   active: {
//     backgroundColor: "red",
//   },
// });
