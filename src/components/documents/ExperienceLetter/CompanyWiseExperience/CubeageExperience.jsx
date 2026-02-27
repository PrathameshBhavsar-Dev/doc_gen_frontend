import React from "react";
import cubeage_stamp from "../../../../assets/images/cubeagetechnology/cubeage_stamp.png";

/* ================= DATE FORMAT ================= */
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB"); // ✅ DD/MM/YYYY
};

const CubeageExperience = ({ company, data }) => {
  if (!company || !data) return null;

  return (
    <div
      className="a4-content-only"
      style={{
        width: "210mm",
        minHeight: "297mm",
        position: "relative",
        fontFamily: 'Cambria, "Cambria Math", serif', // ✅ CHANGED
        fontSize: "12pt",
        lineHeight: "1.5", // ✅ Word exact
        color: "#000",
        backgroundColor: "#fff",
        overflow: "hidden",
      }}
    >
      {/* ================= HEADER ================= */}
      {company.header && (
        <img
          src={company.header}
          alt="Company Header"
          style={{ width: "100%", display: "block" }}
        />
      )}

      {/* ================= CONTENT ================= */}
      <div
        style={{
          padding: "28mm 25mm 30mm 25mm",
          boxSizing: "border-box",
        }}
      >
        {/* ================= DATE ================= */}
        {/* TITLE */}
        <p
          style={{
            textAlign: "center",
            fontWeight: 600,
            marginBottom: "6mm", // space between heading & date
            textDecoration:"underline"
          }}
        >
          Experience Letter
        </p>

        {/* ISSUE DATE */}
        <div
          style={{
            textAlign: "right",
            marginBottom: "18mm", // space before main content
          }}
        >
          {formatDate(data.issueDate)}
        </div>

        {/* ================= SUB TITLE ================= */}
        <p style={{ textAlign: "center", marginBottom: "14pt" }}>
          TO WHOM IT MAY CONCERN
        </p>

        {/* ================= BODY ================= */}
        <p
          style={{
            marginBottom: "10pt",
            textAlign: "justify",
            letterSpacing: "0.1px",
          }}
        >
          This is to certify that{" "}
          <strong>
            {data.mrms} {data.employeeName}
          </strong>{" "}
          was working with us as <strong>{data.designation}</strong> from{" "}
          <strong>{formatDate(data.joiningDate)}</strong> to{" "}
          <strong>{formatDate(data.lastWorkingDay)}</strong> in the{" "}
          <strong>{data.department}</strong> Department.
        </p>

        <p
          style={{
            marginBottom: "10pt",
            textAlign: "justify",
            letterSpacing: "0.1px",
          }}
        >
          During the tenure of his job, he was found to be sincere and loyal
          towards the company. Due to his own wish, for better future prospects,
          he has been relieved from our organization on{" "}
          <strong>{formatDate(data.lastWorkingDay)}</strong>.
        </p>

        <p
          style={{
            marginBottom: "10pt",
            textAlign: "justify",
            letterSpacing: "0.1px",
          }}
        >
          We wish <strong>{data.employeeName}</strong> all the best for bright
          future and career ahead.
        </p>

        {/* ================= SIGNATURE ================= */}
        <div style={{ marginTop: "55mm" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4mm",
              marginBottom: "6mm",
            }}
          >
            <img
              src={cubeage_stamp}
              alt="Company Stamp"
              style={{ width: "110px" }}
            />

            {company.signature && (
              <img
                src={company.signature}
                alt="Authorized Signature"
                style={{ width: "130px" }}
              />
            )}
          </div>

          <p style={{ margin: 0 }}>Authorized Signature,</p>
          <p style={{ margin: 0 }}>For {company.name}</p>
        </div>
      </div>
    </div>
  );
};

export default CubeageExperience;
