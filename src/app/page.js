'use client'
require('dotenv').config()

import './globals.css'

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  const router = useRouter()
  const [user_id, setUser_id] = useState('');
  const [password, setPassword] = useState('');
  const [inputValue, setInputValue] = useState('')
  const [userData, setUserData] = useState();


  const handleLogin = () => {
    const data = new URLSearchParams();
    data.append('username', user_id);
    data.append('password', password);

    console.log({
      user_id: user_id,
      password: password
    });

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    try {
      axios.post('http://localhost:3003/auth/login', data, config)
        .then((response) => {
          const userData = response.data;
          console.log(userData);
          setUserData(JSON.stringify(userData))
          localStorage.setItem('user', JSON.stringify(userData));

          toast.success('Welcome to Payroll', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

          });
          router.push('/dashboard/index');
        })
        .catch((error) => {
          console.error(error);
          // withReactContent(Swal).fire({
          //   title: "Error",
          //   text: error.response.data.message,
          //   icon: "error"
          // })
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

          });
        });
    } catch (error) {
      console.log(error);
    }


  };


  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <p
          className="mb-6 text-2xl font-semibold text-gray-900 dark:text-black"
        >
         Payroll App
        </p>
        <div className="card w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-primary-1">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="mb-6 text-xl font-semibold text-gray-900 dark:text-black">
              Plase enter Username and Password
            </p>
            <form className="space-y-4 md:space-y-6" action="#" method="post">
              <div>
                {/* <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label> */}
                <input
                  type="username"
                  name="username"
                  id="username"
                  className="bg-gray-50 border ring-primary-600 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  required=""
                  value={user_id} onChange={(e) => setUser_id(e.target.value)}
                />
              </div>
              <div>
                {/* <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label> */}
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="bg-gray-50 border text-gray sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-black">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  hidden
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-black"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="button"
                // onClick={() => router.push('/about')}
                onClick={handleLogin}
                className="w-full text-white button hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
              <p hidden className="text-sm font-light text-gray-500 dark:text-black">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-black"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </section>
  );
}

