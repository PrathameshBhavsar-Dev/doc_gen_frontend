import React from "react";
import A4Page from "../../../../layout/A4Page";

/* ================= HELPERS ================= */
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

const getFirstName = (name = "") => name.split(" ")[0];

const QuickManagementOffer = ({ company, data }) => {
  if (!company || !data) return null;

  const { mrms, employeeName, address } = data;

  /* ===== PARSE INPUT ===== */
  const parseNumber = (value) => {
    if (!value) return 0;
    return Number(String(value).replace(/,/g, ""));
  };
  const round0 = (n) => Math.round(n || 0);

  const annualCTC = round0(parseNumber(data.joiningCTC || data.salary));
  const monthlyCTC = round0(annualCTC / 12);

  /* ===== CUBEAGE SALARY LOGIC (WITH PF) ===== */
  const pfMonthly = 3750;

  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);
  const foodMonthly = round0(monthlyCTC * 0.06);

  const basicMonthly = round0(
    monthlyCTC - (hraMonthly + daMonthly + specialMonthly + foodMonthly + pfMonthly)
  );

  const basicAnnual = round0(basicMonthly * 12);
  const hraAnnual = round0(hraMonthly * 12);
  const daAnnual = round0(daMonthly * 12);
  const specialAnnual = round0(specialMonthly * 12);
  const foodAnnual = round0(foodMonthly * 12);
  const pfAnnual = round0(pfMonthly * 12);

  const salaryRows = [
    { label: "Basic", monthly: basicMonthly, annual: basicAnnual },
    { label: "House Rent Allowance", monthly: hraMonthly, annual: hraAnnual },
    { label: "Dearness Allowance", monthly: daMonthly, annual: daAnnual },
    { label: "Special Allowance", monthly: specialMonthly, annual: specialAnnual },
    { label: "Food Allowance", monthly: foodMonthly, annual: foodAnnual },
    { label: "Provident Fund (PF)", monthly: pfMonthly, annual: pfAnnual },
  ];

  const totalMonthly = round0(
    basicMonthly + hraMonthly + daMonthly + specialMonthly + foodMonthly + pfMonthly
  );
  const totalAnnual = round0(totalMonthly * 12);
  const position = data.joiningDesignation ?? data.position ?? "";
  const issueDate = data?.offer_letter?.issueDate ?? data?.issueDate;

  return (
    <>
      <A4Page
        headerSrc={company.header}
      // footerSrc={company.footer}
      // watermarkSrc={company.watermark}
      >

        {/* ================= PAGE 1 ================= */}
        <div>
          {/* <img
          src={company.header}
          alt="Company Header"
          style={{ width: "100%", display: "block" }}
        /> */}


          <div style={styles.date}>{formatDate(issueDate)}</div>

          <div style={styles.detailRow}>
            <span style={styles.label}>Name</span>
            <span style={styles.colon}>:</span>
            <span style={styles.value}>
              {mrms} {employeeName}
            </span>
          </div>

          <div style={styles.detailRow}>
            <span style={styles.label}>Address</span>
            <span style={styles.colon}>:</span>
            <span style={styles.value}>{address}</span>
          </div>

          <div style={styles.subjectRow}>
            <span style={styles.label}>Subject</span>
            <span style={styles.colon}>:</span>
            <span style={styles.value}>
              Letter of Intent for the position of {position}
            </span>
          </div>

          <p style={{ fontSize: "14px" }}>
            Dear {getFirstName(employeeName)},
          </p>
          <p style={styles.paragraph1}>
            Thank you for exploring career opportunities with{" "}
            <strong>QUICK MANAGEMENT SERVICES</strong>. You have successfully
            completed our initial selection process and we are pleased to make
            you an offer of employment.
          </p>

          <p style={styles.paragraph1}>
            This offer is based on your profile, and performance in the selection process.
            As discussed by us you are requested to join Dated{" "}
            <strong>{formatDate(data.joiningDate)}</strong>.
            You have been selected for the position of <strong>{position}</strong>.
            Your gross salary including all benefits will be{" "}
            <strong>Rs. {annualCTC.toLocaleString("en-IN")}/-</strong>.
            Annexure 1 provides a break-up of the compensation package.
          </p>

          <p style={styles.paragraph1}>
            Kindly confirm your acceptance of this offer. If not accepted within 7 days,
            this offer is liable to lapse at the discretion. Please initiate your
            Background Check and submit required documents within 5 days of your
            offer acceptance. Kindly note that you’re Offer is subject to a positive
            background check. On joining and successful completion of joining
            formalities, you will be issued a Letter of Appointment.
          </p>

          <p style={{ fontSize: "14px" }}>Yours Sincerely,</p>

          <div style={styles.signRow}>
            <div>
              <p><strong>For QUICK MANAGEMENT SERVICES</strong></p>

              <div style={styles.signStampRow}>
                <img src={company.signature} style={styles.signImg} alt="" />
                <img src={company.stamp} style={styles.stampImgInline} alt="" />
              </div>

              <p style={styles.hrName}>
                {company.hrName}<br />
                HR Department Pune
              </p>
            </div>

            <div style={styles.candidateBlock}>
              <p>Signature : ____________</p>
              <p>
                Candidate Name : <strong>{employeeName}</strong>
              </p>
            </div>
          </div>

          <div style={styles.paragraph}>
            <strong>Enclosures : Annexure A – Salary Structure</strong>
          </div>
        </div>

        <div style={styles.pageBreak} />

      </A4Page>

      {/* ================= PAGE 2 ================= */}
      <A4Page
        headerSrc={company.header}>
        {/* <img
          src={company.header}
          alt="Company Header"
          style={{ width: "100%", display: "block" }}
        /> */}

        <p style={styles.annexureTitle}>Annexure A Salary Structure</p>

        <table style={styles.salaryTable}>
          <thead>
            <tr>
              <th style={styles.th}>Salary Components</th>
              <th style={styles.th}>Per Month (Rs.)</th>
              <th style={styles.th}>Per Annum (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            {salaryRows.map((row) => (
              <tr key={row.label}>
                <td style={styles.td}>{row.label}</td>
                <td style={styles.td}>{row.monthly.toLocaleString("en-IN")}</td>
                <td style={styles.td}>{row.annual.toLocaleString("en-IN")}</td>
              </tr>
            ))}

            <tr style={{ fontWeight: "bold" }}>
              <td style={styles.td}>Total Monthly Gross Salary</td>
              <td style={styles.td}>{totalMonthly.toLocaleString("en-IN")}</td>
              <td style={styles.td}>{totalAnnual.toLocaleString("en-IN")}</td>
            </tr>
          </tbody>
        </table>

        <div style={styles.annexureSignRow}>
          <div style={styles.annexureLeft}>
            <div style={{ ...styles.hrName, fontSize: "14px" }}>
              {company.hrName}
            </div>
            <div style={styles.hrSignWrap}>
              {company.signature && (
                <img src={company.signature} alt="" style={styles.signInline} />
              )}
              {company.stamp && (
                <img src={company.stamp} alt="" style={styles.stampInline} />
              )}
            </div>
            <div>HR Department, Pune</div>
          </div>

          <div style={styles.annexureRight}>
            <div>Signature : ____________</div>
            <div>
              Candidate : <strong>{employeeName}</strong>
            </div>
          </div>
        </div>

      </A4Page>
    </>
  );
};

export default QuickManagementOffer;

/* ================= STYLES ================= */
const baseFont = "14px";

const styles = {
  wrapper: { background: "#eee", padding: 20 },

  page: {
    width: "185mm",
    minHeight: "297mm",
    background: "#fff",
    margin: "auto",
    padding: "40px",
    //  padding: "0px 12px 12px 12px",
    fontSize: baseFont,
    position: "relative",
  },

  pageBreak: { pageBreakAfter: "always" },

  header: { textAlign: "center", marginBottom: 20 },
  logo: { height: 45 },

  companyName: { fontSize: baseFont, fontWeight: "bold", color: "#0070C0" },
  headerLine: { height: 2, background: "#000", margin: "8px 0" },
  headerAddress: { fontWeight: "bold", fontSize: baseFont },
  headerContact: { fontWeight: "bold", fontSize: baseFont },

  date: { textAlign: "right", marginBottom: 15, fontSize: baseFont },

  detailRow: {
    display: "grid",
    gridTemplateColumns: "80px 10px 1fr",
    columnGap: "4px",
    marginBottom: 4,
    alignItems: "start",
    fontSize: baseFont,
  },

  label: { fontWeight: "bold", fontSize: baseFont },
  colon: { textAlign: "center", fontSize: baseFont },
  value: { lineHeight: "14px", fontSize: baseFont },

  subjectRow: {
    display: "grid",
    gridTemplateColumns: "80px 10px 1fr",
    columnGap: "4px",
    margin: "15px 0",
    fontWeight: "bold",
    fontSize: baseFont,
  },

  paragraph1: {
    textAlign: "justify",
    marginBottom: 10,
    fontSize: baseFont,
  },

  paragraph: {
    textAlign: "center",
    marginTop: 130,
    fontSize: baseFont,
  },

  signRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 40,
    fontSize: baseFont,
  },

  signStampRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  signImg: { height: 50, marginTop: 25 },
  stampImgInline: { height: 100, marginTop: 25 },

  hrName: { fontSize: baseFont },

  candidateBlock: {
    textAlign: "left",
    fontSize: baseFont,
    marginTop: 130,
  },

  annexureTitle: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: baseFont,
  },

  salaryTable: {
    width: "75%",
    margin: "0 auto",
    borderCollapse: "collapse",
    fontSize: baseFont,
  },

  th: {
    border: "1px solid #000",
    padding: "0px 12px 12px 12px",
    backgroundColor: "#00AEEF",
    textAlign: "center",
    fontSize: baseFont,
  },

  td: {
    border: "1px solid #000",
    padding: "0px 12px 12px 12px",
    textAlign: "center",
    fontSize: baseFont,
  },

  annexureSignRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: "50px",
    fontSize: "9px",
  },

  annexureLeft: { textAlign: "left", fontSize: baseFont },
  annexureRight: { textAlign: "right", fontSize: baseFont },

  hrSignWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "6px",
  },

  signInline: { height: "60px" },
  stampInline: { height: "100px", opacity: 0.9 },
};