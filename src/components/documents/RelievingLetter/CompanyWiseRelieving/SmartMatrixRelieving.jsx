import React from "react";
import sign from "../../../../assets/images/smartmatrix/Smartmatrix_sign.png";
const SmartMatrixRelieving = ({ company, data }) => {
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const issueDate = data.relieving_letter?.issueDate ?? data.issueDate;

  return (
    <div
      className="a4-content-only"
      style={{
        width: "210mm",
        minHeight: "297mm",
        position: "relative",
        fontFamily: "'Roboto', 'Calibri', 'Segoe UI', sans-serif",
        fontSize: "13pt",
        lineHeight: "1.6",
        color: "#000",
        backgroundColor: "#fff",
        overflow: "hidden",
      }}
    >
      {/* ================= WATERMARK ================= */}
      {company.watermark && (
        <img
          src={company.watermark}
          alt="SmartMatrix Watermark"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "320px",
            opacity: 0.07,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      )}

      {/* ================= HEADER ================= */}
      {company.header && (
        <img
          src={company.header}
          alt="Company Header"
          style={{
            width: "100%",
            display: "block",
            position: "relative",
            zIndex: 1,
          }}
        />
      )}

      {/* ================= CONTENT ================= */}
      <div
        style={{
          padding: "10mm 20mm 5mm 20mm",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            textAlign: "right",
            marginBottom: "8mm",
            fontFamily: "Bahnschrift",
          }}
        >
          {formatDate(issueDate)}
        </div>
        {/* ================= TITLE ================= */}
        <div
          style={{
            textAlign: "center",
            fontWeight: "600",
            fontSize: "5mm",
            marginBottom: "10mm",
            textDecoration: "underline",
          }}
        >
          Relieving Letter
        </div>

        {/* ================= EMPLOYEE NAME ================= */}
        <div style={{ marginBottom: "10mm" }}>
          <strong>
            {data.mrms} {data.employeeName}
          </strong>
          <br />
          <b>{data.currentDesignation ?? data.designation}</b>
        </div>

        {/* ================= SALUTATION ================= */}
        <p>Dear {data.employeeName.split(" ")[0]},</p>
        <br />

        {/* ================= BODY ================= */}
        <p style={{ textAlign: "justify" }}>
          This is to certify that <strong>{data.employeeName}</strong>,{" "}
          <strong>{data.currentDesignation ?? data.designation}</strong> was employed with{" "}
          <strong>{company.name}</strong> from{" "}
          <strong>
            {new Date(data.joiningDate).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </strong>{" "}
          to{" "}
          <strong>
            {new Date(data.lastWorkingDay).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </strong>
          .
        </p>
        <br />

        <p style={{ textAlign: "justify" }}>
          {data.employeeName.split(" ")[0]} has completed the required handover,
          cleared company property and obligation and relieved from duties
          effective{" "}
          <strong>
            {new Date(data.lastWorkingDay).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </strong>
          .
        </p>
        <br />
        <p>
          We appreciate their contributions during the period of employment and
          wish them success in future endeavors.
        </p>
        <br />
        <br />
        <br />
        <p
          style={{
            marginTop: "3mm",
            marginBottom: "0",
            fontWeight: "400",
            fontFamily: "Verdana",
          }}
        >
          {/* ⬆️ negative margin lifts company name upward */}
          <strong>SmartMatrix Digital Services Pvt Ltd.</strong>
        </p>
        {/* ================= SIGNATURE SECTION (FIXED) ================= */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "6mm",
            marginTop: "20mm",
          }}
        >
          {/* LEFT: STAMP + NAME */}
          <div style={{ textAlign: "left", marginTop: "30px" }}>
            {company.signature && (
              <img src={sign} alt="HR Signature" style={{ width: "130px" }} />
            )}

            <p style={{ margin: 0, fontWeight: "600" }}>
              <strong>{company.hrName}</strong>
            </p>
            <p style={{ margin: 0 }}>
              <strong>HR Manager - HR Services</strong>
            </p>
          </div>

          {/* RIGHT: SIGNATURE (PULLED LEFT) */}
          <div style={{ marginLeft: "-25mm", marginTop: "-12mm" }}>
            {company.stamp && (
              <img
                src={company.stamp}
                alt="Company Stamp"
                style={{ width: "110px", marginBottom: "6mm" }}
              />
            )}
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      {company.footer && (
        <img
          src={company.footer}
          alt="Company Footer"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            display: "block",
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
};

export default SmartMatrixRelieving;
