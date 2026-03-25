import React from "react";
import sign from "../../../../assets/images/smartmatrix/Smartmatrix_sign.png";
/* ================= DATE FORMATTER ================= */
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

/* ================= MAIN COMPONENT ================= */
const SmartMatrixExperience = ({ company, data }) => {
  /* ================= PRONOUN LOGIC ================= */

  const title = data.mrms || "Mr.";

  // let subjectPronoun = "He";
  let objectPronoun = "him";
  let possessivePronoun = "his";

  if (title === "Mrs." || title === "Miss.") {
    // subjectPronoun = "She";
    objectPronoun = "her";
    possessivePronoun = "her";
  }

  if (title === "Mx.") {
    // subjectPronoun = "They";
    objectPronoun = "them";
    possessivePronoun = "their";
  }

  return (
    <div
      className="a4-content-only"
      style={{
        width: "210mm",
        minHeight: "297mm",
        position: "relative",
        fontFamily: "Calibri, Bahnschrift, 'Segoe UI', Arial, sans-serif",
        fontSize: "12pt",
        lineHeight: "1.6",
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

      {/* ================= WATERMARK ================= */}
      {company.watermark && (
        <img
          src={company.watermark}
          alt="Company Watermark"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "320px",
            opacity: company.brandColors?.watermarkOpacity || 0.05,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      )}

      {/* ================= CONTENT ================= */}
      <div
        style={{
          padding: "15mm 25mm 35mm 25mm",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* DATE – moved BELOW title, position unchanged (right aligned) */}
        <div style={{ textAlign: "right", fontSize: "14pt" }}>
          {formatDate(data.issueDate)}
        </div>
        {/* TITLE */}
        <p
          style={{
            fontWeight: 600,

            marginBottom: "10mm",
            marginTop: "10mm",
            textAlign: "center",
            fontSize: "15pt",
            textDecoration: "underline",
          }}
        >
          <strong>Experience Letter</strong>
        </p>
        <strong
          style={{
            fontSize: "13pt",
          }}
        >
          {data.employeeName}
        </strong>
        <br />
        <strong
          style={{
            fontSize: "13pt",
          }}
        >
          {data.designation}
        </strong>
        <br />
        <br />

        {/* BODY – paragraph 1 */}
        <p style={{ textAlign: "justify", fontSize: "17px" }}>
          It is certified that <strong>{data.employeeName}</strong>{" "}
          {/* (Employee ID: <strong>{data.employeeId}</strong>) as{" "}
          <strong>{data.designation}</strong> with our company,{" "} */}
          was under the employer of <strong>{company.name}</strong> as{" "}
          <strong>{data.designation}</strong> in the{" "}
          <strong>{data.department} Department </strong>from{" "}
          <strong>{formatDate(data.joiningDate)}</strong> to{" "}
          <strong>{formatDate(data.relievingDate)}</strong>.<br></br>
          <br></br> During {possessivePronoun} tenure, we observed{" "}
          {objectPronoun} obedience, honesty and dedication in{" "}
          {possessivePronoun} work.<br></br> <br></br>We wish {objectPronoun}{" "}
          bright and good speed in {possessivePronoun} future endeavors.
        </p>

        <br />

        {/* ================= SIGNATURE ================= */}
        <div style={{ marginTop: "25mm", fontSize: "18px" }}>
          <p>
            <strong>{company.name}</strong>
          </p>
          <br />

          <div style={{ display: "flex", gap: "32px", marginTop: "10px" }}>
            <div>
              {company.signature && (
                <img
                  // src={company.signature}
                  src={sign}
                  alt="HR Signature"
                  style={{
                    width: "130px",
                    marginTop: "50px",
                    marginBottom: "110px",
                    marginLeft: "10px",
                  }}
                />
              )}
              <p
                style={{
                  margin: 0,
                  fontWeight: 600,
                  marginTop: "-20mm",
                  marginBottom: "0.5mm",
                }}
              >
                <strong>{company.hrName}</strong>
              </p>

              <p
                style={{
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                <strong>HR Manager - HR Services</strong>
              </p>
            </div>

            {company.stamp && (
              <img
                src={company.stamp}
                alt="Company Stamp"
                style={{
                  width: "110px",
                  marginTop: "-6mm",
                  marginBottom: "28mm",
                  marginLeft: "-24mm",
                }}
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
          }}
        />
      )}
    </div>
  );
};

export default SmartMatrixExperience;
