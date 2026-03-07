import React, { useState } from "react";
import { FaRegEdit, FaBuilding } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { companies as mockCompanies } from "../../components/constant/publicData/mockData";

const assets = ["Header", "Watermark", "Footer", "Stamp", "Signature"];

const AdminCompanyManagementPage = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState(mockCompanies);
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

  const handleCompanyDetails = (company) => {
    navigate(`/admin/company-details/${company.id}`);
  };

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
        {/* Add Company Button */}
        <button
          onClick={handleAddCompany}
          className="bg-gradient-to-b from-[#0E145E] to-[#B37BD6] hover:opacity-90 text-white px-6 py-2 rounded-2xl text-sm font-medium shadow-md transition"
        >
          + Add New Company
        </button>
        {/* Admin Section */}


      </div>

      {/* Company Grid */}
      <div className="grid grid-cols-2 gap-6">

        {companies.map((company) => (
          <div
            key={company.id}
            onClick={() => handleCompanyDetails(company)} 
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
          >

            {/* Card Header */}
            <div className="flex justify-between items-start mb-4">

              <div className="flex items-start gap-3">

                {/* Company Icon */}
                <div className="bg-gradient-to-b from-[#0E145E] to-[#B37BD6] text-white p-2 rounded-md">
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

                <MdOutlineRemoveRedEye
                  size={15}
                  className="text-green-500 cursor-pointer"
                  onClick={() => handleView(company)}
                />

                <FaRegEdit
                  size={15}
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleEdit(company)}
                />

                <RiDeleteBin6Line size={15}
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
