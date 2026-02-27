// import React from "react";

// /* ================= DATE FORMATTER ================= */
// const formatDate = (date) => {
//   if (!date) return "";
//   return new Date(date).toLocaleDateString("en-US", {
//     month: "long",
//     day: "2-digit",
//     year: "numeric",
//   });
// };

// /* ================= MAIN COMPONENT ================= */
// const SmartMatrixExperience = ({ company, data }) => {
//   return (
//     <div
//       className="a4-content-only"
//       style={{
//         width: "210mm",
//         minHeight: "297mm",
//         position: "relative",
//         fontFamily: "Bahnschrift, 'Segoe UI', Arial, sans-serif",
//         fontSize: "12pt",
//         lineHeight: "1.6",
//         color: "#000",
//         backgroundColor: "#fff",
//         overflow: "hidden",
//       }}
//     >
//       {/* ================= HEADER ================= */}
//       {company.header && (
//         <img
//           src={company.header}
//           alt="Company Header"
//           style={{ width: "100%", display: "block" }}
//         />
//       )}

//       {/* ================= WATERMARK ================= */}
//       {company.watermark && (
//         <img
//           src={company.watermark}
//           alt="Company Watermark"
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "320px",
//             opacity: company.brandColors?.watermarkOpacity || 0.05,
//             zIndex: 0,
//             pointerEvents: "none",
//           }}
//         />
//       )}

//       {/* ================= CONTENT ================= */}
//       <div
//         style={{
//           padding: "25mm 25mm 35mm 25mm", // 🔥 EXACT WORD MARGINS
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         {/* DATE */}
//         <div style={{ textAlign: "right", marginBottom: "18mm" }}>
//           {formatDate(data.issueDate)}
//         </div>

//         {/* TITLE */}
//         <p style={{ fontWeight: 600, marginBottom: "12mm", textAlign:"center",textDecoration:"underline" }}>
//           Experience Letter
//         </p>

//         {/* BODY */}
//         <p style={{ textAlign: "justify" }}>
//           This is to certify that <strong>{data.employeeName}</strong> (Employee
//           ID: <strong>{data.employeeId}</strong>) was employed with{" "}
//           <strong>{company.name}</strong> as a{" "}
//           <strong>{data.designation}</strong> in the{" "}
//           <strong>{data.department}</strong> department from{" "}
//           <strong>{formatDate(data.joiningDate)}</strong> to{" "}
//           <strong>{formatDate(data.relievingDate)}</strong>.
//         </p>

//         <p style={{ textAlign: "justify" }}>
//           During the tenure of employment, <strong>{data.employeeName}</strong>{" "}
//           was responsible for the following:
//         </p>

//         <p style={{ whiteSpace: "pre-line", textAlign: "justify" }}>
//           {data.workDescription}
//         </p>

//         <p style={{ textAlign: "justify" }}>
//           The conduct and performance during the employment period were found to
//           be <strong>{data.conduct}</strong>.
//         </p>

//         <p>We wish them all the best in their future endeavors.</p>

//         {/* ================= SIGNATURE ================= */}
//         <div style={{ marginTop: "26mm" }}>
//           <p>
//             <strong>For {company.name}</strong>
//           </p>

//           <div style={{ display: "flex", gap: "32px", marginTop: "10px" }}>
//             <div>
//               {company.signature && (
//                 <img
//                   src={company.signature}
//                   alt="HR Signature"
//                   style={{ width: "130px", marginBottom: "6px" }}
//                 />
//               )}
//               <p style={{ margin: 0, fontWeight: 600 }}>{company.hrName}</p>
//               <p style={{ margin: 0 }}>HR Manager</p>
//             </div>

//             {company.stamp && (
//               <img
//                 src={company.stamp}
//                 alt="Company Stamp"
//                 style={{ width: "110px", marginTop: "12px" }}
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
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default SmartMatrixExperience;

import React from "react";

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
  const title = (data?.mrms || "").toLowerCase().trim();

  const pronouns =
    title === "miss." || title === "mrs."
      ? { subject: "She", object: "her", possessive: "her" }
      : title === "mx."
      ? { subject: "They", object: "them", possessive: "their" }
      : { subject: "He", object: "him", possessive: "his" };

  return (
    <div
      className="a4-content-only"
      style={{
        width: "210mm",
        minHeight: "297mm",
        position: "relative",
        fontFamily: "Bahnschrift, 'Segoe UI', Arial, sans-serif",
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
          padding: "25mm 25mm 35mm 25mm",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* TITLE */}
        <p
          style={{
            fontWeight: 600,

            marginBottom: "6mm",
            marginTop: "-24mm",
            textAlign: "center",
            fontSize: "13pt",
            textDecoration:"underline"
          }}
        >
          <strong>Experience Letter</strong>
        </p>

        {/* DATE – moved BELOW title, position unchanged (right aligned) */}
        <div style={{ textAlign: "right", marginBottom: "20mm" }}>
          {formatDate(data.issueDate)}
        </div>

        <strong>{data.employeeName}</strong>
        <br />
        <strong>{data.designation}</strong>
        <br />
        <br />

        {/* BODY – paragraph 1 */}
        <p style={{ textAlign: "justify" }}>
          This letter certifies we employed <strong>{data.employeeName}</strong>{" "}
          (Employee ID: <strong>{data.employeeId}</strong>) as{" "}
          <strong>{data.designation}</strong> with our company,{" "}
          <strong>{company.name}</strong>, in the{" "}
          <strong>{data.department}</strong> department during the period
          beginning <strong>{formatDate(data.joiningDate)}</strong> and ending{" "}
          <strong>{formatDate(data.relievingDate)}</strong>. During{" "}
          {pronouns.possessive} time with SmartMatrix Digital Services Pvt Ltd.,{" "}
          {pronouns.subject.toLowerCase()} has remained dedicated and loyal to{" "}
          {pronouns.possessive} work and responsibilities with our company.{" "}
          {pronouns.subject} responsibilities met necessary standards, ensuring
          safe and secure data storage, assisting with tasks and resolving all
          coworker issues.
        </p>

        <br />

        {/* BODY – paragraph 2 */}
        <p style={{ textAlign: "justify" }}>
          I can confirm {pronouns.subject.toLowerCase()} possesses strong
          analytical and problem-solving skills needed to diagnose, resolve, and
          maintain IT systems and technology and has excellent verbal and
          written communication skills. {pronouns.subject} has done an exemplary
          job in {pronouns.possessive} role as{" "}
          <strong>{data.designation}</strong> at SmartMatrix Digital Services
          Pvt Ltd. {pronouns.subject} has always maintained a professional and
          courteous attitude and appearance while with SmartMatrix Digital
          Services Pvt Ltd. The decision to end {pronouns.possessive} employment
          with our company is solely {pronouns.possessive} own decision, and we
          wish {pronouns.object} all the best in {pronouns.possessive} future
          career opportunities.
        </p>

        {/* ================= SIGNATURE ================= */}
        <div style={{ marginTop: "10mm" }}>
          <p>
            <strong>{company.name}</strong>
          </p>
          <br />

          <div style={{ display: "flex", gap: "32px", marginTop: "10px" }}>
            <div>
              {company.signature && (
                <img
                  src={company.signature}
                  alt="HR Signature"
                  style={{ width: "130px", marginBottom: "6px" }}
                />
              )}
              <p
                style={{
                  margin: 0,
                  fontWeight: 600,
                  marginTop: "6mm", // block position
                  marginBottom: "0.5mm", // tight gap to designation
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
                style={{ width: "110px", marginTop: "-6mm", marginBottom:"28mm",marginLeft:"-24mm" }}
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


