import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash, FaBuilding } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddCompany from "../../components/admin/companyManagement/AddCompany"

const initialCompanies = [
  { id: 1, name: "Nimbja Security Solutions", date: "05-12-2018" },
  { id: 2, name: "Penta Software Solutions", date: "03-08-2022" },
  { id: 3, name: "Quick Management Solutions", date: "10-122009" },
  { id: 4, name: "Smart Software Solutions", date: "09-022016" },
  { id: 5, name: "Cubeage Tech Solutions", date: "27-12-2022" },
  { id: 6, name: "Newedge Cloud Solutions", date: "28-12-2022" },
  { id: 7, name: "Smart Matrix", date: "27-12-2022" },
  { id: 8, name: "Devcore Software Solutions", date: "28-12-2022" },
  { id: 9, name: "RF Business Solutions", date: "11-07-2023" },
  { id: 10, name: "JDIT Solutions", date: "07-10-2022" }
];

const assets = ["Header", "Watermark", "Footer", "Stamp", "Signature"];

const AdminCompanyManagementPage = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState(initialCompanies);

  // view company
  const handleView = (company) => {
    navigate(`/view-company/${company.id}`);
  };

  // edit company
  const handleEdit = (company) => {
    navigate(`/edit-company/${company.id}`);
  };

  // delete company
  const handleDelete = (company) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${company.name}?`
    );

    if (confirmDelete) {
      setCompanies(companies.filter((c) => c.id !== company.id));
    }
  };

  // add company
  const handleAddCompany = () => {
    navigate("/admin/add-company");
  };

  const handleCompanyDetails = () => {
    navigate("/admin/company-details");
  } 

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Company Management
          </h1>

          <p className="text-gray-500 text-sm">
            Manage company information, branding assets, and documents
          </p>
        </div>

        <button
          onClick={handleAddCompany}
          className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm"        >
          + Add New Company
        </button>

      </div>

      {/* Company Grid */}
      <div className="grid grid-cols-2 gap-6">

        {companies.map((company) => (
          <div
            key={company.id}
            onClick={handleCompanyDetails}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
          >

            {/* Card Header */}
            <div className="flex justify-between items-start mb-4">

              <div className="flex items-start gap-3">

                {/* Company Icon */}
                <div className="bg-purple-600 text-white p-2 rounded-md">
                  <FaBuilding size={14} />
                </div>

                <div>
                  <h2 className="font-semibold text-sm text-gray-800">
                    {company.name}
                  </h2>

                  <p className="text-xs text-gray-400">
                    Created: {company.date}
                  </p>
                </div>

              </div>

              {/* Icons */}
              <div className="flex gap-4">

                <FaEye
                  size={15}
                  className="text-green-500 cursor-pointer"
                  onClick={() => handleView(company)}
                />

                <FaEdit
                  size={15}
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleEdit(company)}
                />

                <FaTrash
                  size={15}
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(company)}
                />

              </div>

            </div>

            {/* Branding Assets */}
            <p className="text-sm font-medium text-gray-700 mb-3">
              Branding Assets
            </p>

            <div className="grid grid-cols-3 gap-3">

              {assets.map((asset, index) => (
                <div
                  key={index}
                  className="bg-green-50 border border-green-400 rounded-lg p-3 text-center"
                >
                  <p className="text-xs font-medium text-green-700">
                    {asset}
                  </p>

                  <p className="text-green-600 text-[11px] mt-1">
                    ✓ Uploaded
                  </p>
                </div>
              ))}

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default AdminCompanyManagementPage;
