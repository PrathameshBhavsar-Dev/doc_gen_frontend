import React from "react";
import cubeage_stamp from "../../../../assets/images/cubeagetechnology/cubeage_stamp.png";

/* ================= DATE FORMAT ================= */
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB");
};

const CubeageRelieving = ({ company, data }) => {
  if (!company || !data) return null;

  const header = data?.header || company?.header;

  const isFemale =
    data.mrms === "Ms." ||
    data.mrms === "Mrs." ||
    data.mrms === "Miss" ||
    data.mrms === "Miss.";

  const isNeutral = data.mrms === "Mx" || data.mrms === "Mx.";

  const heShe = isNeutral ? "they" : isFemale ? "she" : "he";
  const hisHer = isNeutral ? "their" : isFemale ? "her" : "his";
  const wasWere = isNeutral ? "were" : "was";

   const issueDate = data.relieving_letter?.issueDate ?? data.issueDate;

  return (
    <div
      className="a4-content-only"
      style={{
        width: "210mm",
        minHeight: "297mm",
        position: "relative",
        fontFamily: 'Cambria, "Cambria Math", serif',
        fontSize: "13.5pt",
        lineHeight: "1.6",
        color: "#000",
        backgroundColor: "#fff",
        overflow: "hidden",
      }}
    >
      {/* ================= HEADER: Logo left | Company info right ================= */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "12px 20px 10px", borderBottom: "2px solid #000" }}>
        {/* Logo */}
        <div style={{ flexShrink: 0 }}>
          {company.logo
            ? <img src={company.logo} alt="logo" style={{ height: "70px" }} />
            : header
              ? <img src={header} alt="header" style={{ height: "70px" }} />
              : null}
        </div>
        {/* Company Info */}
        <div>
          <p style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}>{company.name || company.companyName}</p>
          {company.address && <p style={{ margin: 0, fontSize: "11px" }}>{company.address}</p>}
          {company.phone && <p style={{ margin: 0, fontSize: "11px" }}><strong>Contact No:</strong> {company.phone}</p>}
          {company.email && <p style={{ margin: 0, fontSize: "11px" }}><strong>Email:</strong> {company.email}</p>}
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div
        style={{
          padding: "28mm 25mm 30mm 25mm", // Word margins
          boxSizing: "border-box",
        }}
      >
        {/* ================= DATE ================= */}
        <p style={{ textAlign: "right", marginBottom: "2mm", marginTop: "-10mm" }}>
          Date: {formatDate(issueDate)}
        </p>

        <p
          style={{
            textAlign: "center",
            fontWeight: 600,
            marginTop: "20mm",
          }}
        >
          RELIEVING & EXPERIENCE LETTER
        </p>



        {/* ================= BODY ================= */}
        <p
          style={{
            marginBottom: "10pt",
            marginTop: "20pt",
            textAlign: "justify",
            letterSpacing: "0.1px", // ✅ Cambria readability
          }}
        >
          This is to certify that{" "}
          <strong>
            {data.mrms} {data.employeeName}
          </strong>{" "}
          was working with us as <strong>{data.currentDesignation ?? data.designation}</strong> from{" "}
          <strong>{formatDate(data.joiningDate)}</strong> to{" "}
          <strong>{formatDate(data.lastWorkingDay || data.relievingDate)}</strong> in the{" "}
          <strong>{data.department}</strong> Department.
        </p>

        <p
          style={{
            marginBottom: "10pt",
            textAlign: "justify",
            letterSpacing: "0.1px",
          }}
        >
          During the tenure of {hisHer} job, {heShe} {wasWere} found to be sincere and loyal
          towards the company. Due to {hisHer} own wish, for better future prospects,
          {heShe} has been relieved from our organization on{" "}
          <strong>{formatDate(data.lastWorkingDay || data.relievingDate)}</strong>.
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
              gap: "10mm",
              marginBottom: "6mm",
            }}
          >
            {/* STAMP */}
            <img
              src={cubeage_stamp}
              alt="Company Stamp"
              style={{ width: "110px" }}
            />

            {/* SIGNATURE */}
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

export default CubeageRelieving;
