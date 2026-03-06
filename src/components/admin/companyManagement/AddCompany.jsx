import React from "react";
import {
  Upload,
  FileText,
  Image,
  Stamp,
  PenTool,
  Droplet,
  ArrowLeft,
} from "lucide-react";

const AddCompany = () => {
  const brandingFields = [
    {
      title: "Company Header",
      desc: "Upload company header image (recommended: 1200x200px)",
      icon: <Image size={18} />,
    },
    {
      title: "Company Footer",
      desc: "Upload company footer image (recommended: 1200x150px)",
      icon: <FileText size={18} />,
    },
    {
      title: "Company Stamp",
      desc: "Upload company stamp/seal (recommended: 300x300px)",
      icon: <Stamp size={18} />,
    },
    {
      title: "Authorized Signature",
      desc: "Upload authorized signature (recommended: 400x150px)",
      icon: <PenTool size={18} />,
    },
    {
      title: "Document Watermark",
      desc: "Upload watermark for documents (recommended: 500x500px)",
      icon: <Droplet size={18} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Top Header */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">

        <div className="flex gap-3 items-center">
          <ArrowLeft className="text-gray-500 cursor-pointer" />

          <div>
            <h1 className="text-xl font-semibold">Company Management</h1>
            <p className="text-sm text-gray-500">
              Manage company information, branding assets, and documents
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Admin</span>

          <div
            className="w-8 h-8 text-white flex items-center justify-center rounded-full"
            style={{ background: "linear-gradient(135deg,#0E145E,#B37BD6)" }}
          >
            A
          </div>
        </div>

      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">

        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">

          <div className="flex items-center gap-3">

            {/* Icon */}
            <div
              className="p-3 rounded-lg text-white"
              style={{ background: "linear-gradient(135deg,#0E145E,#B37BD6)" }}
            >
              <FileText size={20} />
            </div>

            <div>
              <h2 className="text-3xl font-bold">Add New Company</h2>
              <p className="text-sm text-gray-500">
                Create a new company profile with branding assets
              </p>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-3">

            <button className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
              Cancel
            </button>

            <button
              className="px-5 py-2 text-white rounded-lg font-medium"
              style={{ background: "linear-gradient(90deg,#0E145E,#B37BD6)" }}
            >
              Create Company
            </button>

          </div>

        </div>

        {/* Basic Information */}
        <div className="mb-8">

          <h3 className="text-2xl font-bold mb-2">Basic Information</h3>

          <label className="text-sm text-gray-600">
            Company Name *
          </label>

          <input
            type="text"
            placeholder="Enter company name"
            className="w-full mt-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

        </div>

        {/* Branding Assets */}
        <div>

          <h3 className="text-2xl font-bold">Branding Assets</h3>

          <p className="text-sm text-gray-500 mb-4">
            Upload company branding materials for document generation (optional)
          </p>

          <div className="space-y-4">

            {brandingFields.map((item, index) => (

              <div
                key={index}
                className="bg-gray-100 rounded-xl p-4 shadow-sm"
              >

                {/* Title Section */}
                <div className="flex items-center gap-3 mb-3">

                  <div
                    className="text-white p-2 rounded-lg"
                    style={{ background: "linear-gradient(135deg,#0E145E,#B37BD6)" }}
                  >
                    {item.icon}
                  </div>

                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>

                </div>

                {/* Input + Upload */}
                <div className="flex gap-2">

                  <input
                    type="text"
                    placeholder="Enter image URL or upload file"
                    className="flex-1 border rounded-md px-3 py-2 text-sm"
                  />

                  <button className="flex items-center gap-1 border px-4 py-2 rounded-md bg-white hover:bg-gray-100">
                    <Upload size={14} />
                    Upload
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default AddCompany;