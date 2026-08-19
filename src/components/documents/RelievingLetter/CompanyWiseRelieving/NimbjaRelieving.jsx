import React from "react";

const NimbjaRelieving = ({ company, data }) => {

  const issueDate = data.relieving_letter?.issueDate ?? data.issueDate;

  return (
    <div
      className="a4-content-only"
      style={{
        width: "210mm",
        minHeight: "297mm",
        position: "relative",
        fontFamily: "Bahnschrift, 'Segoe UI', Arial, sans-serif", // ❌ NOT TOUCHED
        fontSize: "12pt",
        lineHeight: "1.55",
        color: "#000",
        backgroundColor: "#fff",
        overflow: "hidden",
      }}
    >
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
            width: "50%",
            opacity: 0.4,
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
      <div
        style={{
          textAlign: "Right",
          fontWeight: "",
          fontStyle: "Verdana",
          fontSize: "mm",
          marginTop: "16mm",
          // marginBottom: "14mm",
          textDecoration: "",
          marginRight: "12mm",
        }}
      >
        {new Date(issueDate).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })}
      </div>

      {/* ================= CONTENT ================= */}
      <div
        style={{
          padding: "25mm 25mm 45mm 25mm", // ✅ larger bottom padding = blank area
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ================= DATE ================= */}
        <div
          style={{
            textAlign: "Center",
            marginBottom: "26mm", // ✅ matches Word spacing
            marginTop: "-22mm",
            textDecoration: "underline",
          }}
        >
          Relieving Letter
        </div>

        {/* ================= RECEIVER ================= */}
        <div
          style={{
            marginBottom: "18mm",
            marginTop: "-20mm",
          }}
        >
          <strong>{data.employeeName}</strong>
          <br />
          <strong>{data.currentDesignation ?? data.designation}</strong>
        </div>

        {/* ================= SALUTATION ================= */}
        <p style={{ marginBottom: "1mm", marginTop: "-15mm" }}>
          Dear {data.employeeName?.split(" ")[0] || ""},
        </p>

        {/* ================= BODY ================= */}
        <p
          style={{
            textAlign: "justify",
            marginBottom: "20mm", // ✅ key paragraph gap
          }}
        >
          This letter confirms that we accept your voluntary and irrevocable
          resignation from employment of your position as{" "}
          <strong>{data.currentDesignation ?? data.designation}</strong> in the Department of{" "}
          <strong>{data.department}</strong>. Your last day of employment will
          be{" "}
          <strong>
            {new Date(data.lastWorkingDay).toLocaleDateString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </strong>
          .
        </p>

        <p style={{ marginBottom: "24mm", marginTop: "-12mm" }}>
          We wish you success in all of your future endeavors.
        </p>

        <p
          style={{
            textAlign: "left",
            marginBottom: "22mm",
            marginTop: "-13mm",
          }}
        >
          Sincerely,
        </p>

        {/* ================= SIGNATURE + STAMP ================= */}
        {/* ================= SIGNATURE + STAMP ================= */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start", // ✅ keeps top aligned like Word doc
            gap: "40px", // ✅ comfortable spacing
          }}
        >
          {/* SIGNATURE */}
          <div>
            {company.signature && (
              <img
                src={company.signature}
                alt="HR Signature"
                style={{
                  width: "180px",
                  display: "block",
                  marginBottom: "8px",
                }}
              />
            )}

            <strong>
              <p style={{ margin: 0 }}>{company.hrName}</p>
            </strong>
            <strong>
              <p style={{ margin: 0 }}>HR Relations Lead</p>
            </strong>
            <strong>
              <p style={{ margin: 0 }}>Department of HR Relations</p>
            </strong>
          </div>

          {/* STAMP */}
          {company.stamp && (
            <div
              style={{
                marginTop: "-39px", // 🔼 lifts stamp up
                transform: "translate(-40px, -12px)", // 🔼 fine-tune overlap
              }}
            >
              <img
                src={company.stamp}
                alt="Company Stamp"
                style={{
                  width: "112px",
                  display: "block",
                }}
              />
            </div>
          )}
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
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
};

export default NimbjaRelieving;
