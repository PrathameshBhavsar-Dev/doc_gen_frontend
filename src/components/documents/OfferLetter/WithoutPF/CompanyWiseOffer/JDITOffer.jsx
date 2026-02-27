// import React, { useMemo } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableHead,
//   TableContainer,
// } from "@mui/material";
// import A4Layout from "../../../layout/A4Page";
// import { formatCurrency, generateOfferLetterComponents, numberToWords } from "../../../../utils/salaryCalculations";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     })
//     : "";

// /* ================= STYLES ================= */
// const TEXT = {
//   fontFamily: "Times New Roman, serif",
//   fontSize: "14px",
//   lineHeight: 1.7,
// };

// /* ================= COMPONENT ================= */
// const JDITOffer = ({ company, data }) => {
//   if (!company || !data) return null;

//   /* 🔥 OFFER LETTER FIELD NAMES */
//   const {
//     issueDate,
//     candidateName,
//     position,
//     joiningDate,
//     employeeId,
//     signatoryName,
//     signatoryDesignation,
//     newCTC,
//     salary,          // Annual CTC
//     location,
//   } = data;

//   /* 🔥 DERIVED VALUES */
//   // const annualCTC = Number(salary || 0);
//   // const monthlyCTC = Math.round(annualCTC / 12);
//   const annualCTC = Number(salary || 0);

//   const salaryComponents = useMemo(
//     () => generateOfferLetterComponents(annualCTC),
//     [annualCTC]
//   );

//   const totalAnnual = annualCTC;
//   const totalMonthly = Math.round(annualCTC / 12);




import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
} from "@mui/material";
import A4Layout from "../../../../layout/A4Page";
import { formatCurrency, generateOfferLetterComponents, numberToWords } from "../../../../../utils/salaryCalculations";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    : "";

/* ================= STYLES ================= */
const TEXT = {
  fontFamily: "Times New Roman, serif",
  fontSize: "14px",
  lineHeight: 1.7,
};

/* ================= COMPONENT ================= */
const JDITOffer = ({ company, data }) => {
  if (!company || !data) return null;

  /* 🔥 OFFER LETTER FIELD NAMES */
  const {
    issueDate,
    candidateName,
    position,
    joiningDate,
    employeeId,
    signatoryName,
    signatoryDesignation,
    newCTC,
    salary,          // Annual CTC
    location,
  } = data;

  /* 🔥 DERIVED VALUES */
  // const annualCTC = Number(salary || 0);
  // const monthlyCTC = Math.round(annualCTC / 12);
  const annualCTC = Number(salary || 0);

  const salaryComponents = useMemo(
    () => generateOfferLetterComponents(annualCTC),
    [annualCTC]
  );

  const totalAnnual = annualCTC;
  const totalMonthly = Math.round(annualCTC / 12);




  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>

        {/* ================= COMPANY HEADER ================= */}
        <Typography align="center" sx={{ ...TEXT, fontWeight: "bold" }}>
          JDIT Software Solutions Pvt. Ltd.
        </Typography>

        <Typography align="center" sx={TEXT}>
          301 A, 3rd Floor, Sai Villa Commercial Appartment, Sr No 166, Malwadi Road,
        </Typography>
        <Typography align="center" sx={TEXT}>
          Opp. to Sahyadri Hospital, Hadapsar, Pune - 411028
        </Typography>
        <Typography align="center" sx={{ ...TEXT, mb: 2 }}>
          Telephone: 020-27212597, URL: www.jditbs.com
        </Typography>

        {/* ================= TITLE ================= */}
        <Typography align="center" sx={{ ...TEXT, fontWeight: "bold", mb: 1 }}>
          EMPLOYMENT OFFER
        </Typography>

        {/* ---- thin line below title ---- */}
        <Box
          sx={{
            width: "180px",
            height: "1px",
            backgroundColor: "#000",
            margin: "0 auto 14px",
          }}
        />

        {/* ================= AGREEMENT BLOCK ================= */}
        <Typography align="center" sx={TEXT}>
          This agreement is made on <b>{formatDate(issueDate)}</b> at {location}.
        </Typography>

        <Typography align="center" sx={TEXT}>Between</Typography>

        <Typography align="center" sx={TEXT}>
          JDIT Software Solutions (hereinafter referred to as ‘JDIT’ or ‘Company’)
        </Typography>

        <Typography align="center" sx={TEXT}>And</Typography>

        <Typography align="center" sx={{ ...TEXT, fontWeight: "bold", mb: 2 }}>
          {candidateName}
        </Typography>

        {/* ---- full width divider like screenshot ---- */}
        <Box
          sx={{
            borderBottom: "1px solid #000",
            mb: 2,
          }}
        />

        {/* ================= OFFER DETAILS ================= */}
        <Box sx={{ ...TEXT, mb: 3 }}>
          {employeeId && (
            <Typography sx={{ mb: 1 }}>
              ➢ Offer ID / Employee ID: <b>{employeeId}</b>
            </Typography>
          )}
          <Typography sx={{ mb: 1 }}>
            ➢ Position: <b>{position}</b>
          </Typography>
          <Typography sx={{ mb: 1 }}>
            ➢ Employee’s Name: <b>{candidateName}</b>
          </Typography>
          <Typography sx={{ mb: 1 }}>
            ➢ Business / Work Hours per Day: As per business requirement of the client.
          </Typography>
          <Typography sx={{ mb: 1 }}>
            ➢ Payment Date of Salary: On the 7th Working day of the next month.
          </Typography>
        </Box>

        {/* ================= NOTICE PERIOD ================= */}
        <Typography sx={{ ...TEXT, mb: 3 }}>
          ➢ <b>Notice Period:</b> A notice of 1 month is required if you wish to resign
          or terminate this contract. Notice period is considered to start from the
          point when the written communication is received from the Client / Company /
          You. However when the client ends the contract without notice to JDIT, same
          clause is applicable to you as well. When situations warrant, as in the case
          of breach of policies, the company may decide to terminate the contract with
          immediate effect.
        </Typography>

        {/* ================= COMPENSATION ================= */}
        <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 1 }}>
          Compensation Structure:
        </Typography>

        <Typography sx={TEXT}>
          Compensation is strictly confidential between the employee and the employer.
          It has been determined based on various factors such as employee job, skills,
          specific background and professional merit. This information and any changes
          therein should be treated as personal and confidential.
        </Typography>

      </A4Layout>





      {/* ================= PAGE 2 : SALARY ================= */}
      <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Typography sx={{ ...TEXT, mb: 2 }}>
          <b>Name : {candidateName}</b>
          <span style={{ marginLeft: "120px" }}>
            <b>Designation :{position}</b>
          </span>
        </Typography>


        <TableContainer sx={{ mb: "4mm" }}>
          <Table
            size="small"
            sx={{
              border: "1px solid #333",       // 🔽 thinner outer border
              borderCollapse: "collapse",
              width: "100%",
              color: "#ffff !important",
            }}
          >
            <TableHead>
              <TableRow sx={{
                backgroundColor: "#000 !important",
                "& th": {
                  color: "#fff !important",
                  fontWeight: 600,
                  fontSize: "10pt",
                  border: "1px solid #333",
                  py: "0.4mm",
                },
              }}>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",          // 🔽 smaller font
                    color: "#fff !important",
                    py: "0.4mm",               // 🔽 compact header height
                  }}
                >
                  Salary Components
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",
                    color: "#fff !important",
                    py: "0.4mm",
                  }}
                >
                  Per month (Rs.)
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",
                    color: "#fff !important",
                    py: "0.4mm",
                  }}
                >
                  Per Annum (Rs.)
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* 🔽 Removed tall blank row – keeps table compact */}

              {salaryComponents.map((row, i) => (
                <TableRow key={i}>
                  <TableCell
                    sx={{
                      border: "1px solid #333",
                      fontSize: "9.75pt",       // 🔽 smaller body text
                      py: "0.35mm",             // 🔽 tight rows
                    }}
                  >
                    {row.name}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid #333",
                      fontSize: "9.75pt",
                      py: "0.35mm",
                    }}
                  >
                    {formatCurrency(row.monthly)}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid #333",
                      fontSize: "9.75pt",
                      py: "0.35mm",
                    }}
                  >
                    {formatCurrency(row.annual)}
                  </TableCell>
                </TableRow>
              ))}

              {/* Totals Row */}
              <TableRow sx={{
                backgroundColor: "#000 !important",
                "& td": {
                  color: "#fff !important",
                  fontWeight: 600,
                  fontSize: "10pt",
                  border: "1px solid #333",
                  py: "0.4mm",
                },
              }}>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",
                    py: "0.4mm",
                    // color: "#fff !important",
                  }}
                >
                  Total Monthly Gross Salary
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",
                    py: "0.4mm",
                    // color: "#fff !important",
                  }}
                >
                  {formatCurrency(totalMonthly)}
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    border: "1px solid #333",
                    fontSize: "10pt",
                    py: "0.4mm",
                    // color: "#fff !important",
                  }}
                >
                  {formatCurrency(totalAnnual)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* ================= RETENTION BONUS ================= */}
        <Typography sx={{ ...TEXT, fontWeight: "bold", mt: 3, mb: 1 }}>
          Niche Skill Retention Bonus:
        </Typography>

        <Typography sx={{ ...TEXT, mb: 3 }}>
          You would be eligible for retention bonus. You will receive 48% of Annual
          earnings of your salary other than special and statutory benefits for each
          year. This amount is payable subject to completion of 42 Months at JDIT.
          Please note, this amount is not payable in case of project ramp down or
          closure, contract completion, termination due to code of conduct or for
          what so ever is the reason. It is Mandatory to be on project and billable
          at the time payout after 42 months completion at People Prime.
        </Typography>

        {/* ================= BACKGROUND CHECK ================= */}
        <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 1 }}>
          Background Check:
        </Typography>

        <Typography sx={{ ...TEXT, mb: 3 }}>
          The company reserves the right to verify the information furnished by you
          in your application for employment and through other documents. If it is
          found that you have misrepresented any information in your application for
          employment or have furnished any false information or have concealed /
          suppressed any relevant facts, your services are liable to be terminated
          any time, without any notice or compensation in lieu thereof. If the client
          is asking for the BGV report of the deployed resource then, charges may be
          applicable for BGV Process and will be deducted from your salary in the
          preceding month. Report will be shared with you for your reference post
          completion of BGV.
        </Typography>

        {/* ================= NOTE ================= */}
        <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 1 }}>
          Note:
        </Typography>

        <Typography sx={{ ...TEXT, mb: 3 }}>
          During the first month of your employment with JDIT, an amount of Rs.750
          will be deducted towards Administrative expense for Statutory Compliance.
        </Typography>

        {/* ================= STATUTORY BENEFITS ================= */}
        <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 2 }}>
          Statutory Benefits:
        </Typography>

        <Typography sx={{ ...TEXT }}>
          You will be governed as per the respective acts of Gratuity as per the rules
          in force, from time to time.
        </Typography>

        {/* ================= PAYMENT OF SALARY ================= */}
        <Typography sx={{ ...TEXT, }}>
          Payment of Salary:
        </Typography>



      </A4Layout>

      {/* ================= PAGE 3 : SIGNATURE ================= */}
      <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>

        {/* ================= PAYMENT OF SALARY ================= */}

        <Typography sx={{ ...TEXT }}>
          a) The employee shall be paid his/her salary on the date specified in the
          main details of this agreement. JDIT shall not be responsible for any
          delays in payment of salary of the employee caused by his or her late
          submission of time sheet. For prompt and accurate payment of salary, the
          contract employee should keep JDIT informed about all payments due to
          him/her.
        </Typography>

        <Typography sx={{ ...TEXT }}>
          b) It is agreed by the employee, that this present engagement on contract
          shall be co-terminus with Terms of Business/Main Contract between JDIT and
          its Client where being placed in terms of this engagement. In case, same
          is determined before the expiration of Contract period on any account
          whatsoever, in that eventuality the services of employee shall also come
          to an end immediately. The employee has understood in clear terms that
          tenure of its contract for employment is dependent upon the tenure of the
          agreement executed between JDIT and Client/Organization/Institution/Entity.
        </Typography>

        {/* ================= JOB ROLES ================= */}
        <Typography sx={{ ...TEXT, fontWeight: "bold" }}>
          Job Roles & Responsibilities:
        </Typography>

        <Typography sx={{ ...TEXT }}>
          You shall be responsible for the performance of the functions expected as{" "}
          <b>{position}</b> and any additional functions and duties that may be
          assigned to you in connection with the business and operations of the
          client Company. You shall use the best of your efforts to promote,
          develop and extend the business of the Company and comply with the
          directions and regulations of the Company at all times, and in all
          respects.
        </Typography>

        {/* ================= TERMINATION ================= */}
        <Typography sx={{ ...TEXT, fontWeight: "bold" }}>
          Termination of Employment:
        </Typography>

        <Typography sx={{ ...TEXT, mb: 1 }}>
          In the event that the employee decides to terminate his or her employment
          under this agreement with JDIT, he or she shall be required to give notice
          in writing. Failing to serve notice period as per policy, company can
          initiate legal proceedings against you. Salary in lieu of notice in
          accordance with the notice period specified in the main details of this
          agreement shall be acceptable only at management’s discretion. The client
          may also terminate the employment with or without notice for any business
          reasons. JDIT reserves its right to terminate this agreement forthwith
          without notice or payment in lieu of notice in cases of poor performance,
          neglect of duty, misconduct, conduct not beneficial to the interests of
          JDIT or the Client.
        </Typography>

        {/* ================= LEAVE POLICY ================= */}
        <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 1 }}>
          Leave Policy:
        </Typography>

        <Typography sx={{ ...TEXT, mb: 1 }}>
          Each Personnel are entitled for total 12 days’ annual leaves. The
          Personnel shall not be entitled for any advance paid leave. These paid
          leaves cannot be carrying forwarded to month on month and year on year
          and there shall not be any leave encashment. You shall be entitled to
          avail only one leave per month and only with prior approval from your
          Manager. If you avail more than one day in a month, then that would be
          loss of pay. Pre-approved leave from your manager at the client’s place
          is only a sanction of leave and does not entitle you to paid leave beyond
          the stipulated eligible leaves.
        </Typography>

        {/* ================= FULL & FINAL ================= */}
        <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 1 }}>
          Full & Final Settlement:
        </Typography>

        <Typography sx={{ ...TEXT, mb: 1 }}>
          In case of employees who have resigned from JDIT or Converted to fulltime
          or Termination from client, their Full & final settlement would be made
          after 60 days from their last working day with JDIT on receipt of
          approved time sheet and all tax-related documents.
        </Typography>



      </A4Layout>




      {/* ================= PAGE 4 : SIGNATURE ================= */}


      <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>

        {/* ================= ABSENTEEISM ================= */}
        <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 1 }}>
          Absenteeism from Work:
        </Typography>

        <Typography sx={{ ...TEXT, mb: 3 }}>
          Should the employee fail to report for work for more than one (1) day(s)
          without justifiable reasons, the contract employee’s employment shall be
          deemed to be terminated forthwith by the Employee himself/ herself and
          the Employee shall be deemed to be relieved automatically except for any
          saving by law. Further if any Employee stays absent from work without
          proper permission/sanction or there being leave due to his credit and / or
          overstays his leave the same will render the Employee liable for legal
          action and damages also.
        </Typography>

        {/* ================= NO SHOW ================= */}
        <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 1 }}>
          No-Show:
        </Typography>

        <Typography sx={{ ...TEXT, mb: 3 }}>
          Failure to report at the specified office on{" "}
          <b>{formatDate(joiningDate)}</b> shall be deemed as “No-Show”. In such an
          event, the offer stands cancelled, and you shall be liable to pay one
          month’s salary as penalty to the company for the loss suffered by the
          company.
        </Typography>

        {/* ================= EXTENSION ================= */}
        <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 1 }}>
          Extension of Contract:
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          The employee shall remain on Contract, unless his services are confirmed
          in writing by the client group.
        </Typography>

        {/* ================= DECLARATION ================= */}
        <Typography sx={{ ...TEXT, fontWeight: "bold", mb: 1 }}>
          DECLARATION:
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          This is to confirm that the documents and information provided by me to
          the Company for the purpose of my services are true and accurate to the
          best of my knowledge and belief.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          I also agree that the various terms and conditions set forth in this
          Agreement are fair, just and reasonable and I shall strictly adhere to
          the terms specified.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 3 }}>
          I will at all times follow the rules at regulations at the client’s
          organizations. I will keep all client information/data confidential. I
          will be solely responsible for any loss/damages that may arise as a
          result of my actions.
        </Typography>

        {/* ================= SIGNATURE SECTION ================= */}

        {/* ================= EMPLOYEE SIGNATURE BLOCK ================= */}
        <Box sx={{ mt: 4, mb: 2 }}>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            {/* ================= LEFT COLUMN ================= */}
            <Box>
              {/* Employee Signature */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography sx={{ fontWeight: 600, width: "150px", fontSize: "13px" }}>
                  Employee Signature :
                </Typography>
                <Box
                  sx={{
                    borderBottom: "1.5px solid #000",
                    width: "180px",
                    height: "14px",
                  }}
                />
              </Box>

              {/* Employee Full Name */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontWeight: 600, width: "150px", fontSize: "13px" }}>
                  Employee Full Name :
                </Typography>
                <Typography sx={{ fontWeight: 600, fontSize: "13px" }}>
                  {candidateName}
                </Typography>
              </Box>
            </Box>

            {/* ================= RIGHT COLUMN ================= */}
            <Box>
              {/* Place */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography sx={{ fontWeight: 600, width: "50px", fontSize: "13px" }}>
                  Place :
                </Typography>
                <Box
                  sx={{
                    borderBottom: "1.5px solid #000",
                    width: "180px",
                    height: "16px",
                  }}
                />
              </Box>

              {/* Date */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontWeight: 600, width: "40px", fontSize: "13px" }}>
                  Date :
                </Typography>
                <Box
                  sx={{
                    borderBottom: "1.5px solid #000",
                    width: "180px",
                    height: "16px",
                  }}
                />
              </Box>
            </Box>
          </Box>

        </Box>

        <Typography sx={{ mb: 0 }}>
          For <b>JDIT SOFTWARE SOLUTIONS PVT. LTD.</b>
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          {/* LEFT SIDE : Signature + Stamp (ONE LINE) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {company.signature && (
              <img
                src={company.signature}
                alt="Signature"
                style={{ height: "60px" }}
              />
            )}

            {company.stamp && (
              <img
                src={company.stamp}
                alt="Stamp"
                style={{ height: "100px" }}
              />
            )}
          </Box>
        </Box>

        <Box sx={{ mt: 0 }}>
          <Typography sx={{ fontWeight: 500 }}>
            {signatoryName}
          </Typography>
          <Typography>
            {signatoryDesignation}
          </Typography>
        </Box>
        <Typography><b>{company.hrName}</b></Typography>
        <Typography><b>HR Department Lead</b></Typography>

      </A4Layout>

    </>
  );
};

export default JDITOffer;
