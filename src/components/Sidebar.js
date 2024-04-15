'use client'

import React from "react";
// import { StyleSheet } from "react-native";

export default function Sidebar() {
  return (
    <aside className="menu text-black w-full md:w-64">
      <nav>
        <ul>
          <li className="block py-3 px-4 item-menu m-2">Pending Video Call</li>
          <li className="pl-5"><a href="/dashboard/pending-now" className="block py-3 px-4 item-menu m-2">Pending Video Call Now</a></li>
          <li className="pl-5"><a href="/dashboard/pending-later" className="block py-3 px-4 item-menu m-2">Pending Video Call Later</a></li>
          <li><a href="#" className="block py-3 px-4 item-menu m-2">Video Call Status</a></li>
          <li><a href="#" className="block py-3 px-4 item-menu m-2">Report</a></li>
          <li><a href="/dashboard/create-room" className="block py-3 px-4 item-menu m-2">Create Room</a></li>
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
