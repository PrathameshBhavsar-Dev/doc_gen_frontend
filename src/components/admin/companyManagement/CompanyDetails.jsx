import React from "react";
import { Building2, Image, FileText, PenTool } from "lucide-react";

import { useParams } from "react-router-dom";
import { companies } from "../../constant/publicData/mockData"; // adjust path

const CompanyBranding = () => {
  const assets = [
    {
      id: 1,
      title: "Company Header",
      desc: "Header image displayed in your company profile",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    },
    {
      id: 2,
      title: "Company Header",
      desc: "Header image displayed in your company profile",
      img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    },
    {
      id: 3,
      title: "Document Watermark",
      desc: "Watermark displayed on generated documents",
      img: "https://images.unsplash.com/photo-1608889175123-8ee362201f81",
    },
    {
      id: 4,
      title: "Authorized Signature",
      desc: "Signature displayed on official documents",
      img: "https://images.unsplash.com/photo-1521790366320-7bda2f2f0d52",
    },
  ];

  const { id } = useParams();

const company = companies.find(
  (c) => c.id === Number(id)
);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Building2 className="text-gray-700" size={20} />
          <h1 className="text-xl font-semibold text-gray-800">
            Nimbja Security Solutions
          </h1>
        </div>

        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
          Edit Company
        </button>
      </div>

      {/* Company Info */}
      <div className="bg-white rounded-lg shadow p-5 mb-6">
        <h2 className="font-semibold text-gray-700 mb-3">
          Company Information
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Company Name</p>
            <p className="font-medium">Nimbja Security Solutions</p>
          </div>

          <div>
            <p className="text-gray-500">Established</p>
            <p className="font-medium">2024-05-16</p>
          </div>
        </div>
      </div>

      {/* Branding Assets */}
      <div>
        <h2 className="font-semibold text-gray-700 mb-4">
          Branding Assets
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5">

          {assets.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-purple-100 p-2 rounded">
                  <Image className="text-purple-600" size={16} />
                </div>
                <h3 className="font-medium text-gray-800">
                  {item.title}
                </h3>
              </div>

              <p className="text-gray-500 text-sm mb-3">
                {item.desc}
              </p>

              <img
                src={item.img}
                alt={item.title}
                className="rounded-md w-full h-32 object-cover"
              />
            </div>
          ))}

          {/* Company Stamp */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-purple-100 p-2 rounded">
                <PenTool className="text-purple-600" size={16} />
              </div>
              <h3 className="font-medium text-gray-800">
                Company Stamp
              </h3>
            </div>

            <p className="text-gray-500 text-sm">
              Company stamp displayed on generated documents
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CompanyBranding;