// import React from "react";

// const SmartMatrixRelieving = ({ company, data }) => {
//   return (
//     <div
//       className="a4-content-only"
//       style={{
//         width: "210mm",
//         minHeight: "297mm",
//         position: "relative", // REQUIRED for watermark & footer
//         fontFamily: "Bahnschrift, 'Segoe UI', Arial, sans-serif", // FONT
//         fontSize: "12pt", // FONT SIZE (matches doc)
//         lineHeight: "1.55",
//         color: "#000",
//         backgroundColor: "#fff",
//         overflow: "hidden",
//       }}
//     >
//       {/* ================= WATERMARK ================= */}
//       {company.watermark && (
//         <img
//           src={company.watermark}
//           alt="SmartMatrix Watermark"
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "320px",
//             opacity: 0.07,
//             zIndex: 0,
//             pointerEvents: "none",
//           }}
//         />
//       )}

//       {/* ================= HEADER ================= */}
//       {company.header && (
//         <img
//           src={company.header}
//           alt="Company Header"
//           style={{
//             width: "100%",
//             display: "block",
//             position: "relative",
//             zIndex: 1,
//           }}
//         />
//       )}

//       {/* ================= CONTENT ================= */}
//       <div
//         style={{
//           padding: "22mm 22mm 30mm 22mm",
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         {/* ================= TITLE ================= */}
//         <div
//           style={{
//             textAlign: "center",
//             fontWeight: "600",
//             marginBottom: "14mm",
//           }}
//         >
//           Relieving Letter
//         </div>

//         {/* ================= EMPLOYEE NAME ================= */}
//         <div style={{ marginBottom: "10mm" }}>
//           <strong>
//             {data.mrms} {data.employeeName}
//           </strong>
//           <br />
//           <b>{data.designation}</b>
//         </div>

//         {/* ================= SALUTATION ================= */}
//         <p>Dear {data.employeeName.split(" ")[0]},</p>

//         {/* ================= BODY (MATCHES DOC) ================= */}
//         <p style={{ textAlign: "justify" }}>
//           This is to certify that <strong>{data.employeeName}</strong>,{" "}
//           <strong>{data.designation}</strong> was employed with{" "}
//           <strong>{company.name}</strong> from{" "}
//           <strong>
//             {new Date(data.joiningDate).toLocaleDateString("en-US", {
//               day: "2-digit",
//               month: "long",
//               year: "numeric",
//             })}
//           </strong>{" "}
//           to{" "}
//           <strong>
//             {new Date(data.lastWorkingDay).toLocaleDateString("en-US", {
//               day: "2-digit",
//               month: "long",
//               year: "numeric",
//             })}
//           </strong>
//           .
//         </p>

//         <p style={{ textAlign: "justify" }}>
//           {data.employeeName.split(" ")[0]} has completed the required handover,
//           cleared company property and obligation and relieved from duties
//           effective{" "}
//           <strong>
//             {new Date(data.lastWorkingDay).toLocaleDateString("en-US", {
//               day: "2-digit",
//               month: "long",
//               year: "numeric",
//             })}
//           </strong>
//           .
//         </p>

//         <p>
//           We appreciate their contributions during the period of employment and
//           wish them success in future endeavors.
//         </p>

//         {/* ================= SIGNATURE ================= */}
//         <div style={{ marginTop: "22mm" }}>
//           <p>
//             <strong>{company.name}</strong>
//           </p>

//           <div
//             style={{
//               display: "flex",
//               alignItems: "flex-start",
//               gap: "24px",
//               marginTop: "12px",
//             }}
//           >
//             {/* SIGNATURE */}
//             <div style={{ marginTop: "6mm" }}>
//               {company.signature && (
//                 <img
//                   src={company.signature}
//                   alt="HR Signature"
//                   style={{ width: "130px", marginBottom: "20px" }}
//                 />
//               )}

//               <p style={{ margin: 0, fontWeight: "600", marginBottom: "4mm" }}>
//                 {company.hrName}
//               </p>

//               <p style={{ margin: 0 }}>HR Manager - HR Services</p>
//             </div>

//             {/* STAMP */}
//             {company.stamp && (
//               <img
//                 src={company.stamp}
//                 alt="Company Stamp"
//                 style={{ width: "115px", marginTop: "8px" }}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ================= FOOTER ================= */}
//       {company.footer && (
//         <img
//           src={company.footer}
//           alt="Company Footer"
//           style={{
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//             width: "100%",
//             display: "block",
//             zIndex: 1,
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default SmartMatrixRelieving;

import React from "react";

const SmartMatrixRelieving = ({ company, data }) => {
  return (
    <div
      className="a4-content-only"
      style={{
        width: "210mm",
        minHeight: "297mm",
        position: "relative",
        fontFamily: "Bahnschrift, 'Segoe UI', Arial, sans-serif",
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
          padding: "22mm 22mm 30mm 22mm",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ================= TITLE ================= */}
        <div
          style={{
            textAlign: "center",
            fontWeight: "600",
            fontStyle: "Verdana",
            fontSize: "5mm",
            marginBottom: "14mm",
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
          <b>{data.designation}</b>
        </div>

        {/* ================= SALUTATION ================= */}
        <p>Dear {data.employeeName.split(" ")[0]},</p>
        <br />

        {/* ================= BODY ================= */}
        <p style={{ textAlign: "justify" }}>
          This is to certify that <strong>{data.employeeName}</strong>,{" "}
          <strong>{data.designation}</strong> was employed with{" "}
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
            marginTop: "15mm",
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
            gap: "6mm", // minimal natural gap
            marginTop: "20mm",
          }}
        >
          {/* LEFT: STAMP + NAME */}
          <div style={{ textAlign: "left" }}>
            {company.signature && (
              <img
                src={company.signature}
                alt="HR Signature"
                style={{ width: "130px" }}
              />
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

