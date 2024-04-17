'use client'
require('dotenv').config()
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";


const MyForm = () => {
  const router = useRouter()
  const token = JSON.parse(localStorage.getItem('user')).access_token;
  const PageSizeOptions = [5, 10, 20]; // Options for items per page

  console.log(token);

  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [submitMethod, setsubmitMethod] = useState('post');
  const [idEdit, setIdEdit] = useState(null);

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
      localStorage.setItem('idEdit', id);
      localStorage.setItem('submitMethod', 'patch');
      // setsubmitMethod('patch');

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

  function deleteData(id) {
    // Display confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with deletion
        let config = {
          method: 'delete',
          maxBodyLength: Infinity,
          url: `http://localhost:3003/payroll/${id}`,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        };

        axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            toast.success('Data has been deleted.', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }





  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/payroll/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const sortedData = response.data.data.sort((a, b) => a.id - b.id);

        setData(sortedData);
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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(PageSizeOptions[0]); // Default to the first option

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to handle items per page change
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);


  return (
    <section>
      <div>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50">
            <div className="bg-white p-8 mx-auto my-8 max-w-md rounded-md text-center">
              <div className="mb-4">
                <h1 className="text-2xl font-semibold">Data</h1>
              </div>

              <p className="text-gray-700">
                <form className="max-w-md mt-8 text-left" onSubmit={handleSubmit}>
                  <div className="mb-4">
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

                  <div className="mb-4">
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

                  <div className="mb-4">
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
                  <div className="mb-4">
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
                  <div className="mb-4">
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
                  <div className="mb-4">
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

                  <div className="mb-4">
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
                  <div className="mb-4">
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

                  <button
                    type="submit"
                    className="bg-blue-500 text-whites  px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Submit
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-gray-500 text-whites  px-4 py-2 rounded-md ml-2"
                  >
                    Cancel
                  </button>
                </form>
              </p>

              {/* Modal Footer */}
              <div className="mt-6">
              </div>
            </div>
          </div>
        )}

      </div>
      <div className="container mx-auto mb-5" STY>


      </div>
      <div class="flex mb-4">
        <div class="w-1/2 font-bold text-lg">
          <input
            type="text"
            className="bg-gray-50 w-1/2 border text-sm ring-primary-600 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />


        </div>
        <div class="w-1/2 text-right">
          <DownloadTableExcel
            filename="Payroll"
            sheet="payroll"
            currentTableRef={tableRef.current}
          >

            {/* <button
              className="bg-blue-400 text-sm text-whites  px-4 py-2 rounded-md mr-1"
            > Export </button> */}

          </DownloadTableExcel>
          <button
            onClick={() => {
              router.push('/dashboard/add')
            }}
            className="bg-blue-400 text-sm text-whites  px-4 py-2 rounded-md"
          >
            + Add Data
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full">
          <div className="overflow-x-auto">
            <table className="w-full table-auto bg-white rounded" ref={tableRef}>
              <tbody className="divide-y divide-gray-200">
                <tr className="p-10 mt-10">
                  <td scope="col" className="py-5 text-center font-bold text-gray-200 tracking-wider">
                    Action
                  </td>
                  <td scope="col" className="text-center font-bold text-gray-200 tracking-wider">
                    Nama Karyawan
                  </td>
                  <td scope="col" className="text-center font-bold text-gray-200 tracking-wider">
                    Periode
                  </td>
                  <td scope="col" className="text-center font-bold text-gray-300 tracking-wider">
                    Jumlah Penghasilan
                  </td>
                  <td scope="col" className="text-center font-bold text-gray-200 tracking-wider">
                    Kode PPH21
                  </td>
                  <td scope="col" className="text-center font-bold text-gray-200 tracking-wider">
                    PTKP tahunan
                  </td>
                  <td scope="col" className="text-center font-bold text-gray-200 tracking-wider">
                    Dasar pengenaan pajak
                  </td>
                  <td scope="col" className="text-center font-bold text-gray-200 tracking-wider">
                    Tarif
                  </td>
                  <td scope="col" className="text-center font-bold text-gray-200 tracking-wider">
                    Nominal PPH21
                  </td>
                  <td scope="col" className="text-center font-bold text-gray-200 tracking-wider">
                    Nominal Takehomepay
                  </td>
                </tr>
                {currentItems.map((item, index) => (
                  <tr key={item.id}>
                    <td className="text-center pl-3 py-3">
                      <button className="bg-blue-400 text-whites  mr-1 py-1 px-2 rounded" onClick={() => editData(item.id)}>Edit</button>
                      <button className="bg-red-500 text-whites  py-1 px-2 rounded" onClick={() => deleteData(item.id)}>Hapus</button>
                    </td>
                    <td className="pl-3 py-3">{item.nama_karyawan}</td>
                    <td className="text-center pl-3 py-3">{item.periode}</td>
                    <td className="text-right px-6 py-3 ">Rp{item.jumlah_penghasilan.toLocaleString('id-ID', { minimumFractionDigits: 0 }).replace(',', '.')}</td>
                    <td className="text-center">{item.kode_pph21}</td>
                    <td className="text-right px-3 py-3 ">Rp{item.ptkp_tahunan.toLocaleString('id-ID', { minimumFractionDigits: 0 }).replace(',', '.')}</td>
                    <td className="text-right px-3 py-3 ">Rp{item.dasar_pengenaan_pajak.toLocaleString('id-ID', { minimumFractionDigits: 0 }).replace(',', '.')}</td>
                    <td className="text-right px-3 py-3 ">Rp{item.tarif.toLocaleString('id-ID', { minimumFractionDigits: 0 }).replace(',', '.')}</td>
                    <td className="text-right px-3 py-3 ">Rp{item.nominal_pph21.toLocaleString('id-ID', { minimumFractionDigits: 0 }).replace(',', '.')}</td>
                    <td className="text-right px-3 py-3 ">Rp{item.nominal_takehomepay.toLocaleString('id-ID', { minimumFractionDigits: 0 }).replace(',', '.')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex mt-4">
              {/* Items per page dropdown */}
              <div className='w-1/2 text-left'>
                <select className='mr-2 bg-gray-200 rounded' id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                  {PageSizeOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                Showing {currentPage} to {totalPages} of records
              </div>
              <div className='w-1/2 text-right'>
                <button className={`mx-1 px-3 py-1 rounded bg-white text-gray-200`}>{'<'}</button>
                {[...Array(totalPages).keys()].map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page + 1)}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === page + 1 ? 'bg-blue-500 text-whites' : 'bg-gray-300 text-gray-700'
                      }`}
                  >
                    {page + 1}
                  </button>
                ))}
                <button className={`mx-1 px-3 py-1 rounded bg-white text-gray-200`}>{'>'}</button>

              </div>

            </div>

          </div>
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
