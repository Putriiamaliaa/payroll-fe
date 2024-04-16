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
            autoClose: 3000,
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
            autoClose: 3000,
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

      <div class="d-flex flex-column flex-root" id="kt_app_root">


        <div class="d-flex flex-column flex-lg-row flex-column-fluid">

          <div class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1">

            <div class="d-flex flex-center flex-column flex-lg-row-fluid">

              <div class="w-lg-500px p-10">


                <form class="form w-100" novalidate="novalidate" id="kt_sign_in_form" action="#" method="post">
                  {/*begin::Heading*/}
                  <div class="text-center mb-11">
                    {/*begin::Title*/}
                    <h1 class="text-gray-900 fw-bolder mb-3">
                      Sign In Payroll
                    </h1>
                    {/*end::Title*/}

                    {/*begin::Subtitle*/}
                    <div class="text-gray-500 fw-semibold fs-6">
                      Your Social Campaigns
                    </div>
                    {/*end::Subtitle-*/}
                  </div>
                  {/*begin::Heading*/}

                  {/*begin::Login options*/}
                  <div class="row g-3 mb-9">
                    {/*begin::Col*/}
                    <div class="col-md-6">
                      {/*begin::Google link-*/}
                      <a href="#" class="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100">
                        <img alt="Logo" src="/media/svg/brand-logos/google-icon.svg" class="h-15px me-3" />
                        Sign in with Google
                      </a>
                      {/*end::Google link-*/}
                    </div>
                    {/*end::Col*/}

                    {/*begin::Col*/}
                    <div class="col-md-6">
                      {/*begin::Google link-*/}
                      <a href="#" class="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100">
                        <img alt="Logo" src="/media/svg/brand-logos/apple-black.svg" class="theme-light-show h-15px me-3" />
                        <img alt="Logo" src="/media/svg/brand-logos/apple-black-dark.svg" class="theme-dark-show h-15px me-3" />
                        Sign in with Apple
                      </a>
                      {/*end::Google link-*/}
                    </div>
                    {/*end::Col*/}
                  </div>
                  {/*end::Login options*/}

                  {/*begin::Separator*/}
                  <div class="separator separator-content my-14">
                    <span class="w-125px text-gray-500 fw-semibold fs-7">Or with email</span>
                  </div>
                  {/*end::Separator*/}

                  {/*begin::Input group-*/}
                  <div class="fv-row mb-8">
                    {/*begin::Email*/}
                    <input type="text" placeholder="Username" name="email" autocomplete="off" class="form-control bg-transparent" value={user_id} onChange={(e) => setUser_id(e.target.value)}/>
                    {/*end::Email*/}
                  </div>

                  {/*end::Input group-*/}
                  <div class="fv-row mb-3">
                    {/*begin::Password*/}
                    <input type="password" placeholder="Password" name="password" autocomplete="off" class="form-control bg-transparent" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {/*end::Password*/}
                  </div>
                  {/*end::Input group-*/}

                  {/*begin::Wrapper*/}
                  <div class="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                    <div></div>

                    {/*begin::Link*/}
                    <a href="/metronic8/demo1/authentication/layouts/corporate/reset-password.html" class="link-primary">
                      Forgot Password ?
                    </a>
                    {/*end::Link*/}
                  </div>
                  {/*end::Wrapper*/}

                  {/*begin::Submit button*/}
                  <div class="d-grid mb-10">
                    <button type="button" id="kt_sign_in_submit" class="btn btn-primary" onClick={handleLogin}>

                      {/*begin::Indicator label*/}
                      <span class="indicator-label">
                        Sign In</span>
                      {/*end::Indicator label*/}

                      {/*begin::Indicator progress*/}
                      <span class="indicator-progress">
                        Please wait...    <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                      {/*end::Indicator progress*/}        </button>
                  </div>
                  {/*end::Submit button*/}

                  {/*begin::Sign up*/}
                  <div class="text-gray-500 text-center fw-semibold fs-6">
                    Not a Member yet?

                    <a href="/metronic8/demo1/authentication/layouts/corporate/sign-up.html" class="link-primary">
                      Sign up
                    </a>
                  </div>
                  {/*end::Sign up*/}
                </form>
                {/*end::Form*/}
              </div>
              {/*end::Wrapper*/}
            </div>
            {/*end::Form*/}

            {/*begin::Footer*/}
            <div class="w-lg-500px d-flex flex-stack px-10 mx-auto">
              {/*begin::Languages*/}
              <div class="me-10">
                {/*begin::Toggle*/}
                <button class="btn btn-flex btn-link btn-color-gray-700 btn-active-color-primary rotate fs-base" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start" data-kt-menu-offset="0px, 0px">
                  <img data-kt-element="current-lang-flag" class="w-20px h-20px rounded me-3" src="/media/flags/united-states.svg" alt="" />

                  <span data-kt-element="current-lang-name" class="me-1">English</span>

                  <span class="d-flex flex-center rotate-180">
                    <i class="ki-duotone ki-down fs-5 text-muted m-0"></i>                    </span>
                </button>
                {/*end::Toggle*/}

                {/*begin::Menu*/}
                <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-4 fs-7" data-kt-menu="true" id="kt_auth_lang_menu">
                  {/*begin::Menu item*/}
                  <div class="menu-item px-3">
                    <a href="#" class="menu-link d-flex px-5" data-kt-lang="English">
                      <span class="symbol symbol-20px me-4">
                        <img data-kt-element="lang-flag" class="rounded-1" src="/media/flags/united-states.svg" alt="" />
                      </span>
                      <span data-kt-element="lang-name">English</span>
                    </a>
                  </div>
                  {/*end::Menu item*/}
                  {/*begin::Menu item*/}
                  <div class="menu-item px-3">
                    <a href="#" class="menu-link d-flex px-5" data-kt-lang="Spanish">
                      <span class="symbol symbol-20px me-4">
                        <img data-kt-element="lang-flag" class="rounded-1" src="/media/flags/spain.svg" alt="" />
                      </span>
                      <span data-kt-element="lang-name">Spanish</span>
                    </a>
                  </div>
                  {/*end::Menu item*/}
                  {/*begin::Menu item*/}
                  <div class="menu-item px-3">
                    <a href="#" class="menu-link d-flex px-5" data-kt-lang="German">
                      <span class="symbol symbol-20px me-4">
                        <img data-kt-element="lang-flag" class="rounded-1" src="/media/flags/germany.svg" alt="" />
                      </span>
                      <span data-kt-element="lang-name">German</span>
                    </a>
                  </div>
                  {/*end::Menu item*/}
                  {/*begin::Menu item*/}
                  <div class="menu-item px-3">
                    <a href="#" class="menu-link d-flex px-5" data-kt-lang="Japanese">
                      <span class="symbol symbol-20px me-4">
                        <img data-kt-element="lang-flag" class="rounded-1" src="/media/flags/japan.svg" alt="" />
                      </span>
                      <span data-kt-element="lang-name">Japanese</span>
                    </a>
                  </div>
                  {/*end::Menu item*/}
                  {/*begin::Menu item*/}
                  <div class="menu-item px-3">
                    <a href="#" class="menu-link d-flex px-5" data-kt-lang="French">
                      <span class="symbol symbol-20px me-4">
                        <img data-kt-element="lang-flag" class="rounded-1" src="/media/flags/france.svg" alt="" />
                      </span>
                      <span data-kt-element="lang-name">French</span>
                    </a>
                  </div>
                  {/*end::Menu item*/}
                </div>
                {/*end::Menu*/}
              </div>
              {/*end::Languages*/}

              {/*begin::Links*/}
              <div class="d-flex fw-semibold text-primary fs-base gap-5">
                <a href="/metronic8/demo1/pages/team.html" target="_blank">Terms</a>

                <a href="/metronic8/demo1/pages/pricing/column.html" target="_blank">Plans</a>

                <a href="/metronic8/demo1/pages/contact.html" target="_blank">Contact Us</a>
              </div>
              {/*end::Links*/}
            </div>
            {/*end::Footer*/}
          </div>
          {/*end::Body*/}

          {/*begin::Aside*/}
          <div class="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2" style={{ backgroundImage: `url(/media/misc/auth-bg.png)` }}>
            {/*begin::Content*/}
            <div class="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100">
              {/*begin::Logo*/}
              <a href="/metronic8/demo1/index.html" class="mb-0 mb-lg-12">
                <img alt="Logo" src="/media/logos/custom-1.png" class="h-60px h-lg-75px" />
              </a>
              {/*end::Logo*/}

              {/*begin::Image*/}
              <img class="d-none d-lg-block mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20" src="/media/misc/auth-screens.png" alt="" />
              {/*end::Image*/}

              {/*begin::Title*/}
              <h1 class="d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7">
                Payroll Apps
              </h1>
              {/*end::Title*/}

              {/*begin::Text*/}
              <div class="d-none d-lg-block text-white fs-base text-center">
                In this kind of post, <a href="#" class="opacity-75-hover text-warning fw-bold me-1">the blogger</a>

                introduces a person they’ve interviewed <br /> and provides some background information about

                <a href="#" class="opacity-75-hover text-warning fw-bold me-1">the interviewee</a>
                and their <br /> work following this is a transcript of the interview.
              </div>
              {/*end::Text*/}
            </div>
            {/*end::Content*/}
          </div>
          {/*end::Aside*/}
        </div>
        {/*end::Authentication - Sign-in*/}



      </div>
      {/*end::Root*/}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
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

