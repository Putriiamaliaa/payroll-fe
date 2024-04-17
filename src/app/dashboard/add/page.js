'use client'
require('dotenv').config()

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";


const MyForm = () => {
  const router = useRouter()
  // const token = JSON.parse(localStorage.getItem('user')).token;
  const token = JSON.parse(localStorage.getItem('user')).access_token;
  console.log(token);

  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  // const [submitMethod, setsubmitMethod] = useState('post');
  // const [idEdit, setIdEdit] = useState(null);

  const submitMethod = localStorage.getItem('submitMethod')
  const idEdit = localStorage.getItem('idEdit')

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [formData, setFormData] = useState({
    "nama_karyawan": "",
    "periode": new Date(),
    "jumlah_penghasilan": "",
    "kode_pph21": "21-100-01 Pegawai Tetap",
    "ptkp_tahunan": "",
    "dasar_pengenaan_pajak": "",
    "tarif": "",
    "nominal_pph21": "",
    "nominal_takehomepay": ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    let url = `http://localhost:3003/payroll`
    if (submitMethod == 'patch') {
      url = `http://localhost:3003/payroll/${idEdit}`
    }

    let config = {
      method: submitMethod,
      maxBodyLength: Infinity,
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: formData
    };

    axios.request(config)
      .then(async (response) => {
        console.log(JSON.stringify(response.data));
        toast.success('Success operation', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        resetForm()
        setModalOpen(false);
        router.push('/dashboard/index');
      })
      .catch((error) => {
        console.log(error);
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


  };

  const resetForm = () => {
    // Reset the form data to its initial state
    setsubmitMethod('post')
    setFormData({
      "nama_karyawan": "",
      "periode": new Date(),
      "jumlah_penghasilan": "",
      "kode_pph21": "21-100-01 Pegawai Tetap",
      "ptkp_tahunan": "",
      "dasar_pengenaan_pajak": "",
      "tarif": "",
      "nominal_pph21": "",
      "nominal_takehomepay": ""
    });
  };

  const editData = async (id) => {

    try {
      //save edit edit
      // setIdEdit(id)
      setsubmitMethod('patch');

      const response = await axios.get(`http://localhost:3003/payroll/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log(response);
      setFormData({
        "nama_karyawan": response.data.data.nama_karyawan,
        "periode": response.data.data.periode,
        "jumlah_penghasilan": response.data.data.jumlah_penghasilan,
        "kode_pph21": response.data.data.kode_pph21,
        "ptkp_tahunan": response.data.data.ptkp_tahunan,
        "dasar_pengenaan_pajak": response.data.data.dasar_pengenaan_pajak,
        "tarif": response.data.data.tarif,
        "nominal_pph21": response.data.data.nominal_pph21,
        "nominal_takehomepay": response.data.data.nominal_takehomepay,
      });

      openModal()
    } catch (error) {
      console.error('Error fetching data:', error);
    }


  };







  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/payroll/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log(response);
        setFormData({
          "nama_karyawan": response.data.data.nama_karyawan,
          "periode": response.data.data.periode,
          "jumlah_penghasilan": response.data.data.jumlah_penghasilan,
          "kode_pph21": response.data.data.kode_pph21,
          "ptkp_tahunan": response.data.data.ptkp_tahunan,
          "dasar_pengenaan_pajak": response.data.data.dasar_pengenaan_pajak,
          "tarif": response.data.data.tarif,
          "nominal_pph21": response.data.data.nominal_pph21,
          "nominal_takehomepay": response.data.data.nominal_takehomepay,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);



  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = data.filter(item =>
    item.nama_karyawan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tableRef = useRef(null);

  return (
    <section>
      <div class="flex mb-4">
        <div class="w-full font-bold text-lg">
          ADD / UPDATE DATA
        </div>
      </div>
      <div className="flex">
        <div className="w-full">
          <form className="" onSubmit={handleSubmit}>
            <div className="w-full bg-blue-500 p-5 text-whites font-bold rounded">
              Tambah / Update Data
            </div>
            <div className="w-full bg-white p-10">
              <div className="flex space-x-4">
                <div className="mb-4 w-1/2">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    Name Karyawan
                  </label>
                  <input
                    type="text"
                    id="nama_karyawan"
                    name="nama_karyawan"
                    value={formData.nama_karyawan}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>

                <div className="mb-4 w-1/2">
                  <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                    Periode
                  </label>
                  <input
                    type="date"
                    id="periode"
                    name="periode"
                    value={formData.periode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="mb-4 w-1/2">
                  <label htmlFor="jumlah_penghasilan" className="block text-gray-700 text-sm font-bold mb-2">
                    Jumlah Penghasilan
                  </label>
                  <input
                    type="number"
                    id="jumlah_penghasilan"
                    name="jumlah_penghasilan"
                    value={formData.jumlah_penghasilan}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kode_pph21">
                    Kode PPH21
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded"
                    name="kode_pph21"
                    id="kode_pph21"
                    onChange={handleChange}
                    value={formData.kode_pph21}
                  >

                    <option value="21-100-01 Pegawai Tetap">21-100-01 Pegawai Tetap</option>
                    <option value="21-100-07 Tenaga Ahli">21-100-07 Tenaga Ahli</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="mb-4 w-1/2">
                  <label htmlFor="ptkp_tahunan" className="block text-gray-700 text-sm font-bold mb-2">
                    PTKP Tahunan
                  </label>
                  <input
                    type="number"
                    id="ptkp_tahunan"
                    name="ptkp_tahunan"
                    value={formData.ptkp_tahunan}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label htmlFor="dasar_pengenaan_pajak" className="block text-gray-700 text-sm font-bold mb-2">
                    Dasar Pengenaan Pajak
                  </label>
                  <input
                    type="number"
                    id="dasar_pengenaan_pajak"
                    name="dasar_pengenaan_pajak"
                    value={formData.dasar_pengenaan_pajak}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
              </div>
              <div className="flex space-x-4">

                <div className="mb-4 w-1/2">
                  <label htmlFor="tarif" className="block text-gray-700 text-sm font-bold mb-2">
                    Tarif
                  </label>
                  <input
                    type="number"
                    id="tarif"
                    name="tarif"
                    value={formData.tarif}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label htmlFor="nominal_pph21" className="block text-gray-700 text-sm font-bold mb-2">
                    Nominal PPH21
                  </label>
                  <input
                    type="number"
                    id="nominal_pph21"
                    name="nominal_pph21"
                    value={formData.nominal_pph21}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="nominal_takehomepay" className="block text-gray-700 text-sm font-bold mb-2">
                  Nominal Takehomepay
                </label>
                <input
                  type="number"
                  id="nominal_takehomepay"
                  name="nominal_takehomepay"
                  value={formData.nominal_takehomepay}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            </div>
            <div className="w-full bg-gray-300 p-10 text-right">
              <button
                onClick={closeModal}
                className="bg-white px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-whites px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Submit
              </button>

            </div>
          </form>
        </div>

      </div>
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
};

export default MyForm;
