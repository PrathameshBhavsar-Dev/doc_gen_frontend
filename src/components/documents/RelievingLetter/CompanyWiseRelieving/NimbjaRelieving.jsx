// import React from "react";

// const NimbjaRelieving = ({ company, data }) => {
//   return (
//     <div
//       className="a4-content-only"
//       style={{
//         width: "210mm",
//         minHeight: "297mm",
//         position: "relative", // 🔴 UPDATED (needed for watermark & footer)
//         fontFamily: "Bahnschrift, 'Segoe UI', Arial, sans-serif",
//         fontSize: "12pt",
//         lineHeight: "1.55",
//         color: "#000",
//         backgroundColor: "#fff",
//         overflow: "hidden",
//       }}
//     >
//       {/* ================= WATERMARK ================= */}
//       {company.watermark && (
//         <img
//           src={company.watermark} // 🔴 UPDATED (from mockdata)
//           alt="Company Watermark"
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)", // 🔴 UPDATED (centered)
//             width: "300px", // 🔴 UPDATED (balanced size)
//             opacity: 0.08, // 🔴 UPDATED (behind content)
//             zIndex: 0, // 🔴 UPDATED
//             pointerEvents: "none", // 🔴 UPDATED
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
//             zIndex: 1, // 🔴 UPDATED
//             position: "relative",
//           }}
//         />
//       )}

//       {/* ================= CONTENT ================= */}
//       <div
//         style={{
//           padding: "22mm 22mm 30mm 22mm",
//           position: "relative", // 🔴 UPDATED
//           zIndex: 1, // 🔴 UPDATED (above watermark)
//         }}
//       >
//         {/* ================= DATE ================= */}
//         <div style={{ textAlign: "right", marginBottom: "16mm" }}>
//           {new Date(data.issueDate).toLocaleDateString("en-US", {
//             month: "long",
//             day: "2-digit",
//             year: "numeric",
//           })}
//         </div>

//         {/* ================= RECEIVER ================= */}
//         <div style={{ marginBottom: "10mm" }}>
//           <strong>{data.employeeName}</strong>
//           <br />
//           {data.designation}
//         </div>

//         {/* ================= SALUTATION ================= */}
//         <p>Dear {data.employeeName.split(" ")[0]},</p>

//         {/* ================= BODY ================= */}
//         <p style={{ textAlign: "justify" }}>
//           This letter confirms that we accept your voluntary and irrevocable
//           resignation from employment of your position as{" "}
//           <strong>{data.designation}</strong> Engineer in the Department of{" "}
//           <strong>{data.department}</strong>. Your last day of employment will
//           be{" "}
//           <strong>
//             {new Date(data.lastWorkingDay).toLocaleDateString("en-US", {
//               month: "long",
//               day: "2-digit",
//               year: "numeric",
//             })}
//           </strong>
//           .
//         </p>

//         <p>We wish you success in all of your future endeavors.</p>

//         {/* ================= SIGNATURE + STAMP ================= */}
//         <div
//           style={{
//             marginTop: "18mm",
//             display: "flex",
//             alignItems: "flex-start",
//             gap: "24px",
//           }}
//         >
//           {/* SIGNATURE */}
//           <div>
//             {company.signature && (
//               <img
//                 src={company.signature}
//                 alt="HR Signature"
//                 style={{
//                   width: "130px",
//                   display: "block",
//                   marginBottom: "6px",
//                 }}
//               />
//             )}

//             <p style={{ margin: 0, fontWeight: "600" }}>{company.hrName}</p>
//             <p style={{ margin: 0 }}>HR Relations Lead</p>
//             <p style={{ margin: 0 }}>Department of HR Relations</p>
//           </div>

//           {/* STAMP */}
//           {company.stamp && (
//             <img
//               src={company.stamp}
//               alt="Company Stamp"
//               style={{
//                 width: "115px",
//                 marginTop: "10px",
//               }}
//             />
//           )}
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
//             zIndex: 1, // 🔴 UPDATED
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default NimbjaRelieving;

import React from "react";

const NimbjaRelieving = ({ company, data }) => {
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
            width: "300px",
            opacity: 0.08,
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
          textAlign: "center",
          fontWeight: "600",
          fontStyle: "Verdana",
          fontSize: "5mm",
          marginTop: "15mm",
          marginBottom: "14mm",
          textDecoration: "underline",
        }}
      >
        Relieving Letter
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
            textAlign: "right",
            marginBottom: "26mm", // ✅ matches Word spacing
            marginTop: "-20mm",
          }}
        >
          {new Date(data.issueDate).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
        </div>

        {/* ================= RECEIVER ================= */}
        <div style={{ marginBottom: "18mm", marginTop: "15mm" }}>
          <strong>{data.employeeName}</strong>
          <br />
          <strong>{data.designation}</strong>
        </div>

        {/* ================= SALUTATION ================= */}
        <p style={{ marginBottom: "10mm" }}>
          Dear {data.employeeName.split(" ")[0]},
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
          <strong>{data.designation}</strong> Engineer in the Department of{" "}
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

        <p style={{ marginBottom: "24mm" }}>
          We wish you success in all of your future endeavors.
        </p>

        <p
          style={{
            textAlign: "left",
            marginBottom: "22mm",
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
                  width: "220px",
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
