// import React from "react";
// import { Building2, Image, FileText, PenTool } from "lucide-react";

// import { useParams } from "react-router-dom";
// import { companies } from "../../constant/publicData/mockData"; // adjust path
// // import { useParams } from "react-router-dom";
// // import { companies } from "../../constant/publicData/mockData";

// const { id } = useParams();

// const company = companies.find((c) => c.id === Number(id));

// const CompanyBranding = () => {
//   const assets = [
//   {
//     id: 1,
//     title: "Company Header",
//     desc: "Header image displayed in your company profile",
//     img: company?.headerImage
//   },
//   {
//     id: 2,
//     title: "Company Footer",
//     desc: "Footer image displayed in your company profile",
//     img: company?.footerImage
//   },
//   {
//     id: 3,
//     title: "Document Watermark",
//     desc: "Watermark displayed on generated documents",
//     img: company?.watermarkImage
//   },
//   {
//     id: 4,
//     title: "Authorized Signature",
//     desc: "Signature displayed on official documents",
//     img: company?.signature
//   },
//   {
//     id: 5,
//     title: "Company Stamp",
//     desc: "Company stamp displayed on generated documents",
//     img: company?.stamp
//   }
// ];

//   const { id } = useParams();

//   const company = companies.find(
//     (c) => c.id === Number(id)
//   );

//   return (
//     <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5">
//   {assets.map((item) => (
//     <div key={item.id} className="bg-white rounded-lg shadow p-4">

//       <div className="flex items-center gap-2 mb-2">
//         <div className="bg-purple-100 p-2 rounded">
//           <Image className="text-purple-600" size={16} />
//         </div>

//         <h3 className="font-medium text-gray-800">
//           {item.title}
//         </h3>
//       </div>

//       <p className="text-gray-500 text-sm mb-3">
//         {item.desc}
//       </p>

//       {item.img ? (
//         <img
//           src={item.img}
//           alt={item.title}
//           className="rounded-md w-full h-32 object-contain"
//         />
//       ) : (
//         <div className="flex items-center justify-center h-32 border rounded text-gray-400 text-sm">
//           Not Uploaded
//         </div>
//       )}

//     </div>
//   ))}
// </div>
//   );
// };

// export default CompanyBranding;



import React from "react";
import { Building2, Image, PenTool } from "lucide-react";
import { useParams } from "react-router-dom";
import { companies } from "../../constant/publicData/mockData";

const CompanyBranding = () => {

  const { id } = useParams();
  const company = companies.find((c) => c.id === Number(id));

  const assets = [
    {
      id: 1,
      title: "Company Header",
      desc: "Header image displayed at the top of documents",
      img: company?.headerImage
    },
    {
      id: 2,
      title: "Company Footer",
      desc: "Footer image displayed at the bottom of documents",
      img: company?.footerImage
    },
    {
      id: 3,
      title: "Document Watermark",
      desc: "Watermark overlay for document protection",
      img: company?.watermarkImage
    },
    {
      id: 4,
      title: "Authorized Signature",
      desc: "Signature of authorized personnel for document signing",
      img: company?.signature
    },
    {
      id: 5,
      title: "Company Stamp",
      desc: "Official company stamp/seal for document authentication",
      img: company?.stamp
    }
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">

        <div className="flex items-center gap-3">
          <div className="bg-purple-600 text-white p-2 rounded-lg">
            <Building2 size={18} />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {company?.shortName || company?.name}
            </h1>

            <p className="text-sm text-gray-500">
              Created: {company?.date}
            </p>
          </div>
        </div>

        <button className="bg-linear-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm">
          Edit Company
        </button>

      </div>

      {/* Company Information */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <h2 className="font-semibold text-gray-700 mb-4">
          Company Information
        </h2>

        <div className="grid grid-cols-2 gap-6 text-sm">

          <div>
            <p className="text-gray-500">Company Name</p>
            <p className="font-medium">{company?.name}</p>
          </div>

          <div>
            <p className="text-gray-500">Created Date</p>
            <p className="font-medium">{company?.date}</p>
          </div>

        </div>
      </div>

      {/* Branding Assets */}
      <h2 className="font-semibold text-gray-700 mb-4">
        Branding Assets
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {assets.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow p-4"
          >

            <div className="flex items-center gap-2 mb-2">

              <div className="bg-purple-100 p-2 rounded-md">
                <Image className="text-purple-600" size={16} />
              </div>

              <h3 className="font-medium text-gray-800">
                {item.title}
              </h3>

            </div>

            <p className="text-gray-500 text-sm mb-3">
              {item.desc}
            </p>

            {item.img ? (
              <img
                src={item.img}
                alt={item.title}
                className="rounded-md w-full h-28 object-contain "
              />
            ) : (
              <div className="flex items-center justify-center h-28 border rounded text-gray-400 text-sm">
                Not Uploaded
              </div>
            )}

          </div>
        ))}

      </div>

    </div>
  );
};

export default CompanyBranding;