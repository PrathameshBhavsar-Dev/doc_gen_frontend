import React, { useMemo } from 'react';
import { ArrowLeft, Download, Eye, FileText, User, Building, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ROUTES from "../../core/constants/routes.constant";

const UserEmployeeDocumentsPage = () => {
  const documents = [
    { type: 'Offer Letter', fileSize: '245 KB', date: 'Feb 15, 2026', generatedBy: 'Aditi Khade', status: 'Completed', checked: true },
    { type: 'Appointment Letter', checked: false },
    { type: 'Experience Letter', checked: false },
    { type: 'Salary Slip', checked: false },
    { type: 'Increment Letter', checked: false },
    { type: 'Confirmation Letter', checked: false },
  ];

  const navigate = useNavigate();

  // Split docs
  const { generatedDocs, pendingDocs } = useMemo(() => {
    return {
      generatedDocs: documents.filter(d => d.checked),
      pendingDocs: documents.filter(d => !d.checked)
    };
  }, [documents]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Back */}
        <button className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
          onClick={() => navigate(ROUTES.USER_EMPLOYEE_DATA)}>
          <ArrowLeft size={20} /> Back
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#0E145E] to-[#B37BD6] rounded-3xl p-8 text-white shadow-xl mb-8">
          <h1 className="text-3xl font-bold mb-2">Employee Documents</h1>
          <p className="text-sm opacity-80">Manage and preview all generated documents</p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <User className="text-blue-600" />
              <h2 className="font-semibold">Employee</h2>
            </div>
            <p className="font-medium">Rahul Sharma</p>
            <p className="text-sm text-gray-500">EMP001</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Building className="text-purple-600" />
              <h2 className="font-semibold">Company</h2>
            </div>
            <p className="font-medium">Nimbja Security Solutions</p>
          </div>
        </div>

        {/* Generated Docs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="text-green-600" /> Generated Documents
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedDocs.map((doc, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition">
                <div className="flex justify-between items-start mb-3">
                  <FileText className="text-indigo-600" />
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{doc.status}</span>
                </div>

                <h3 className="font-semibold mb-2">{doc.type}</h3>
                <p className="text-sm text-gray-500">{doc.fileSize}</p>
                <p className="text-sm text-gray-500">{doc.date}</p>

                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-1">
                    <Eye size={16} /> Preview
                  </button>
                  <button className="flex-1 border py-2 rounded-lg text-sm flex items-center justify-center gap-1">
                    <Download size={16} /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pending Docs */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="text-yellow-600" /> Not Generated Yet
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingDocs.map((doc, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-dashed border-gray-300">
                <FileText className="text-gray-400 mb-3" />
                <h3 className="font-medium text-gray-700">{doc.type}</h3>
                <p className="text-xs text-gray-400 mt-1">Not generated</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default UserEmployeeDocumentsPage;

