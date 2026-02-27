// import React from "react";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) => {
//   if (!date) return "";
//   return new Date(date).toLocaleDateString("en-US", {
//     month: "long",
//     day: "2-digit",
//     year: "numeric",
//   });
// };

// const NimbjaExperience = ({ company, data }) => {
//   return (
//     <div
//       className="a4-content-only"
//       style={{
//         width: "210mm",
//         minHeight: "297mm",
//         position: "relative",
//         fontFamily: "Bahnschrift, Arial, sans-serif",
//         fontSize: "12pt",
//         lineHeight: "1.55",
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
//             opacity: 0.04,
//             zIndex: 0,
//             pointerEvents: "none",
//           }}
//         />
//       )}

//       {/* ================= CONTENT ================= */}
//       <div
//         style={{
//           padding: "25mm 25mm 35mm 25mm",
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         {/* DATE — TOP RIGHT */}
//         <div
//           style={{
//             textAlign: "right",
//             marginBottom: "22mm",
//           }}
//         >
//           {formatDate(data.issueDate)}
//         </div>

//         {/* TITLE */}
//         <p
//           style={{
//             textAlign: "center",
//             fontWeight: 600,
//             textDecoration: "underline",
//             marginBottom: "18mm",
//           }}
//         >
//           Experience Letter
//         </p>

//         {/* PARAGRAPH 1 */}
//         <p
//           style={{
//             textAlign: "justify",
//             marginBottom: "10mm",
//           }}
//         >
//           This letter certifies that <strong>{data.employeeName}</strong> was an
//           employee in the role of <strong>{data.designation}</strong> with{" "}
//           <strong>{company.name}</strong> during the period beginning{" "}
//           <strong>{formatDate(data.joiningDate)}</strong> and ending{" "}
//           <strong>{formatDate(data.relievingDate)}</strong>.
//         </p>

//         {/* PARAGRAPH 2 */}
//         <p
//           style={{
//             textAlign: "justify",
//             marginBottom: "10mm",
//           }}
//         >
//           During her time with <strong>{company.name}</strong>,{" "}
//           {data.employeeName} has remained dedicated and loyal to her work and
//           responsibilities with our company. She has done an exemplary job while
//           in this role.
//         </p>

//         {/* PARAGRAPH 3 */}
//         <p
//           style={{
//             textAlign: "justify",
//           }}
//         >
//           <strong>{company.name}</strong> has always maintained a professional
//           and courteous attitude and appearance while with our company. Her
//           decision to end her employment with our company is solely her own
//           decision and we wish her all the best in her future career
//           opportunities.
//         </p>

//         {/* ================= SIGNATURE SECTION ================= */}
//         <div style={{ marginTop: "28mm" }}>
//           <p style={{ marginBottom: "12mm" }}>Sincerely,</p>

//           {/* SIGNATURE + STAMP SIDE BY SIDE */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "flex-end",
//               gap: "18mm",
//               marginBottom: "10mm",
//             }}
//           >
//             {company.signature && (
//               <img
//                 src={company.signature}
//                 alt="HR Signature"
//                 style={{
//                   width: "130px",
//                   display: "block",
//                   transform: "translateY(-8mm)",
//                 }}
//               />
//             )}

//             {company.stamp && (
//               <img
//                 src={company.stamp}
//                 alt="Company Stamp"
//                 style={{
//                   width: "120px",
//                   display: "block",
//                 }}
//               />
//             )}
//           </div>

//           <p style={{ fontWeight: 600, marginBottom: "2mm" }}>
//             {company.hrName}
//           </p>
//           <p style={{ margin: 0 }}>HR Relations Lead</p>
//           <p style={{ margin: 0 }}>Department of HR Relations</p>
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

// export default NimbjaExperience;


import React from "react";

/* ================= DATE FORMAT ================= */
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

const NimbjaExperience = ({ company, data }) => {
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
        fontFamily: "Bahnschrift, Arial, sans-serif",
        fontSize: "12pt",
        lineHeight: "1.55",
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
            opacity: 0.04,
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
        {/* DATE — TOP RIGHT */}
        {/* TITLE */}
        <p
          style={{
            textAlign: "center",
            fontWeight: 600,
            marginBottom: "6mm", // space between heading & date
            textDecoration:"underline",
            fontSize:"12pt"
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
        {/* PARAGRAPH 1 */}
        <p
          style={{
            textAlign: "justify",
            marginBottom: "10mm",
          }}
        >
          This is to certify that{" "}
          <strong>
            {data.mrms} {data.employeeName}
          </strong>{" "}
          was in our employment from{" "}
          <strong>{formatDate(data.joiningDate)}</strong> to{" "}
          <strong>{formatDate(data.relievingDate)}</strong>. {pronouns.subject}{" "}
          was efficient and hardworking in this tenure. At the time of leaving
          the services of the company, {pronouns.subject.toLowerCase()} was
          designated as <strong>{data.designation}</strong>.
        </p>

        {/* PARAGRAPH 2 */}
        <p
          style={{
            textAlign: "justify",
            marginBottom: "10mm",
          }}
        >
          During {pronouns.possessive} time with <strong>{company.name}</strong>
          , {data.employeeName} remained dedicated and loyal to{" "}
          {pronouns.possessive} work and responsibilities with our company.{" "}
          {pronouns.subject} has done an exemplary job while in this role.
        </p>

        {/* PARAGRAPH 3 */}
        <p
          style={{
            textAlign: "justify",
          }}
        >
          {/* We wish {pronouns.object} success in {pronouns.possessive} future
          career. */}{" "}
          {data.employeeName} has always maintained a professional and courteous
          attitude and appearance while with our company. {pronouns.possessive}{" "}
          decision to end {pronouns.possessive} employment with our company is
          solely {pronouns.possessive} own decision and we wish{" "}
          {pronouns.object} all the best in {pronouns.possessive} future career
          opportunities.
        </p>

        {/* ================= SIGNATURE SECTION ================= */}
        <div style={{ marginTop: "28mm" }}>
          <p style={{ marginBottom: "12mm" }}>Sincerely,</p>

          {/* SIGNATURE + STAMP SIDE BY SIDE */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "18mm",
              marginBottom: "10mm",
            }}
          >
            {company.signature && (
              <img
                src={company.signature}
                alt="HR Signature"
                style={{
                  width: "170px",
                  height: "40px",
                  display: "block",
                  transform: "translateY(-8mm)",
                }}
              />
            )}

            {company.stamp && (
              <img
                src={company.stamp}
                alt="Company Stamp"
                style={{
                  width: "120px",
                  display: "block",
                  marginLeft: "-15mm",
                }}
              />
            )}
          </div>

          <strong>
            <p style={{ fontWeight: 600, marginBottom: "" }}>
              <strong>{company.hrName}</strong>
            </p>
          </strong>
          <strong>
            <p style={{ margin: 0 }}>HR Relations Lead</p>
          </strong>
          <strong>
            <p style={{ margin: 0 }}>Department of HR Relations</p>
          </strong>
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

export default NimbjaExperience;
