'use client'
import React, { useState, useEffect } from 'react';

export default function Header() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [userData, setUserData] = useState();
  const user = JSON.parse(typeof window !== 'undefined' ? window?.localStorage?.getItem('user') : null) || {};

  useEffect(() => {
    // Update the current date and time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);


    return () => clearInterval(intervalId);
  }, []);

  const options = { weekday: 'long', year: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const formattedDateTime = currentDateTime.toLocaleString(undefined, options);

  return (
    <header className="text-gray py-4">
      <div className="grid grid-cols-3 items-center p-2">
        <div className="col-span-1 pl-2">
          <h1 className="text-2xl font-bold text-gray-600">Payroll App</h1>
        </div>
        <div className="col-span-1 text-right">
          {/* {formattedDateTime} */}
        </div>

        {user?.data && (
          <div className="col-span-1 text-right">
            <h1 className="text-2xl font-bold text-gray-600">{user.data.username}</h1>
          </div>
        )}
      </div>
    </header>
  );
}
