// Mock data for companies and document templates

// smart imports
// All Company's Logo images.
import cubeagelogo from "../../../../public/companylogos/cubeagelogo.webp";
import neweagelogo from "../../../../public/companylogos/neweagelogo.png";
import smartmatrixlogo from "../../../../public/companylogos/smartmatrixlogo.webp";
import devconslogo from "../../../../public/companylogos/devconslogo.webp";
import rpblogo from "../../../../public/companylogos/rbplogo.jpg";
import nimbjalogo from "../../../../public/companylogos/nimbjalogo.png";
import pentalogo from "../../../../public/companylogos/pentalogo.png";
import qmslogo from "../../../../public/companylogos/qmslogo.webp";
import jditlogo from "../../../../public/companylogos/jditlogo.png";

// import smart_header from '../assets/images/SmartSoftware/smartsoftware-header.png';
import smart_header from "../../../assets/images/SmartSoftware/smartsoftware-header.png";
import smartholderFooter from "../../../assets/images/SmartSoftware/smartfooters.png";
import smartholderHeader from "../../../assets/images/SmartSoftware/smart-header.png";
// import smartholderFooter from '../assets/images/SmartSoftware/smart-footer.png';
import smartholderWatermark from "../../../assets/images/SmartSoftware/Watermark.png";
import smartholderSignature from "../../../assets/images/SmartSoftware/Sign.png";
import vandanaSignature from "../../../assets/images/SmartSoftware/Sign2.jpeg";
import smartholderStamp from "../../../assets/images/SmartSoftware/Stamp.png";

// Import JDIT Company Data images
import jdit_header from "../../../assets/images/jdit/jdit_head.jpeg";
import jdit_footer from "../../../assets/images/jdit/jditFooter.png";
import jdit_watermark from "../../../assets/images/jdit/jdit_watermark.png";
import jdit_signature from "../../../assets/images/jdit/jdit_sweety_sign.png";
import ajaySignature from "../../../assets/images/jdit/jdit_sign.png";
import jdit_stamp from "../../../assets/images/jdit/jdit_stamp.png";

// rp imports  (watermark pending)
import rp_header from "../../../assets/images/rp/RP_header.png";
import rp_footer from "../../../assets/images/rp/RP_footer.png";
import Rpbuisness_stamp from "../../../assets/images/rp/Rpbuisness_stamp.png";
import Rpbuisness_signature from "../../../assets/images/rp/Rpbuisness_signature.png";

// Import placeholder images
import placeholderHeader from "../../../assets/images/SmartSoftware/smart-header.png";
// import placeholderHeader from '../assets/images/SmartSoftware/smartheaders.png';
// import placeholderFooter from '../assets/images/placeholder-footer.svg';
import placeholderFooter from "../../../assets/images/SmartSoftware/smart-footer.png";
import placeholderWatermark from "../../../assets/images/SmartSoftware/Watermark.png";
// import placeholderSignature from '../assets/images/SmartSoftware/Sign.png';
// import placeholderStamp from '../assets/images/SmartSoftware/Stamp.png';

//Newage
import Newage_header from "../../../assets/images/Newagecloud/Neweagehead.jpeg";
import Newage_footer from "../../../assets/images/Newagecloud/neweagefooter.jpeg";
import Newage_signature from "../../../assets/images/Newagecloud/Newage_signature.png";
import Newage_stamp from "../../../assets/images/Newagecloud/Newage_stamp.png";
import Newage_watermark from "../../../assets/images/Newagecloud/Newage_watermark.png";

//cubeage(footer and watermark pending)
import cubeage_header from "../../../assets/images/cubeagetechnology/cubeageheader.png";
import cubeage_signature from "../../../assets/images/cubeagetechnology/cubeage_signature.png";
import cubeage_stamp from "../../../assets/images/cubeagetechnology/cubeage_stamp.png";

//samrtmatrix (Header footer and watermark prnding)
import smartmatrix_stamp from "../../../assets/images/smartmatrix/Smartmatrix_stamp.png";
import smartmatrix_signature from "../../../assets/images/smartmatrix/Smartmatrix_sign.png";
import smartmatrix_header from "../../../assets/images/smartmatrix/smartmatrix_header.png";
import smartmatrix_footer from "../../../assets/images/smartmatrix/smartmatrix_footer.png";
import smartmatrix_CEO from "../../../assets/images/smartmatrix/Smartmatrix_CEO.png";

//  Devcons (watermark pending)
import devcons_header from "../../../assets/images/devconssoftware/devconsheaders.png";
import devcons_footer from "../../../assets/images/devconssoftware/devcons_footer.png";
import devcons_signature from "../../../assets/images/devconssoftware/devcons_signature.png";
import devcons_stamp from "../../../assets/images/devconssoftware/devcons_stamp.png";
// import dilip_sign from "../../../asse../../ts/images/devconssoftware/dilip_kumar_signature.png"

//penta
import Penta_header from "../../../assets/images/Penta/Penta_header.png";
import Penta_footer from "../../../assets/images/Penta/Penta_footer.png";
import Penta_signature from "../../../assets/images/Penta/Penta_sign.png";
import Penta_stamp from "../../../assets/images/Penta/Penta_stamp.png";
import Penta_watermark from "../../../assets/images/Penta/Penta_watermark.png";
import penta_jayabharti_sign from "../../../assets/images/Penta/jayabharti_sign.png";

//Nimbja( Watermark Pending)
import Nimbja_header from "../../../assets/images/Nimbja/Nimbja_header.png";
import Nimbja_footer from "../../../assets/images/Nimbja/Nimbja_footers.png";
import Nimbja_signature from "../../../assets/images/Nimbja/Nimbja_signature.png";
import Nimbja_stamp from "../../../assets/images/Nimbja/Nimbja_stamp.png";
import Nimbja_watermark from "../../../assets/images/Nimbja/nimbja_watermark.png";
import Nimbja_CEO from "../../../assets/images/Nimbja/Nimbja_CEO.png";

//QM  (Footer watermark Pending)
import QMS_Header from "../../../assets/images/QMS/QMS_Header.png";
import QMS_Sign from "../../../assets/images/QMS/QMS_Sign.png";
import satish_ingole_sign from "../../../assets/images/QMS/satish_ingole_sign.png";
import QMS_Stamp from "../../../assets/images/QMS/QMS_Stamp.png";

export const companies = [
  {
    id: 1,
    name: "Cubeage Technologies Services Pvt. Ltd.",
    shortName: "Cubeage Tech",
    date: "27-12-2022",
    logo: cubeagelogo,
    header: cubeage_header,
    footer: placeholderFooter,
    signature: cubeage_signature,
    stamp: cubeage_stamp,
    watermark: placeholderWatermark,
    headerImage: cubeage_header,
    footerImage: placeholderFooter,
    watermarkImage: placeholderWatermark,
    address:
      "Survey No. 21, Ganesham Commercial -A Office No. 102-B First Floor 18-21/24, BRTS Road Pimple Saudagar Pune, Maharashtra 411027 India",
    email: "hr@cubeagetech.com",
    phone: "+91 9112100661",
    website: "www.cubeagetech.com",
    city: "Pune",
    regNo: "CIN: U72900PN2022PTC217321",
    hrName: "Saloni Dere",
    brandColors: {
      primary: "#2196F3",
      secondary: "#1976D2",
      accent: "#03DAC6",
      textColor: "#212121",
      watermarkOpacity: 0.05,
      hueRotate: 0,
    },
  },

  {
    id: 2,
    name: "Neweage Cloud Solution Pvt. Ltd.",
    shortName: "Neweage Cloud",
    date: "28-12-2022",
    logo: neweagelogo,
    header: Newage_header,
    footer: Newage_footer,
    signature: Newage_signature,
    stamp: Newage_stamp,
    watermark: Newage_watermark,
    headerImage: Newage_header,
    footerImage: Newage_footer,
    watermarkImage: Newage_watermark,
    address:
      "Office No. 4-B, Ganesham Commercial - A, Survey No. 21/18-21/24 BRTS Road,Pimple Saudagar, Pune-411027",
    email: "contact@neweagecloud.com",
    phone: "+91 7066531234",
    website: "https://neweageclouds.com/",
    city: "Pune",
    regNo: "CIN: U72900PN2022PTC217339",
    hrName: "Shyam Patil",
    brandColors: {
      primary: "#4CAF50",
      secondary: "#388E3C",
      accent: "#8BC34A",
      textColor: "#1B5E20",
      watermarkOpacity: 0.06,
      hueRotate: 90,
    },
  },

  {
    id: 3,
    name: "SmartMatrix Digital Services Pvt. Ltd.",
    shortName: "SmartMatrix",
    date: "27-12-2022",
    logo: smartmatrixlogo,
    header: smartmatrix_header,
    footer: smartmatrix_footer,
    signature: smartmatrix_signature,
    CEO: smartmatrix_CEO,
    stamp: smartmatrix_stamp,
    watermark: null,
    headerImage: null,
    footerImage: null,
    watermarkImage: null,
    address:
      "Office No. 102-B, First Floor, Ganesham Commercial -A, Survey No. 21/18-21/24, BRTS Road, Pimple Saudagar, Pune- 411027",
    email: "contact@smartmatrixds.com",
    phone: "+91 9112108484",
    website: "https://smartmatrixds.com/",
    city: "Pune",
    regNo: "CIN: U72900PN2022PTC217318",
    hrName: "Shiv Lahane",
    ceoName: "Sanjay Kumar",
    brandColors: {
      primary: "#FF9800",
      secondary: "#F57C00",
      accent: "#FFB74D",
      textColor: "#E65100",
      watermarkOpacity: 0.04,
      hueRotate: 45,
    },
  },

  {
    id: 4,
    name: "Devcons Software Solution Pvt. Ltd.",
    shortName: "Devcons",
    date: "28-12-2022",
    logo: devconslogo,
    header: devcons_header,
    footer: devcons_footer,
    signature: devcons_signature,
    stamp: devcons_stamp,
    watermark: placeholderWatermark,
    headerImage: devcons_header,
    footerImage: devcons_footer,
    watermarkImage: placeholderWatermark,
    address:
      "Office No- 4A, Second Floor, Ganesham Wing A, On BRTS Road,Pimple Saudagar Pune- 411027",
    email: " hr@devconsoftware.com",
    phone: "+91 9112106565",
    website: "https://www.devconsoftware.com/",
    city: "Pune",
    regNo: "CIN: U72900MH2022PTC396129",
    hrName: "Mayur Patil ",
    brandColors: {
      primary: "#9C27B0",
      secondary: "#7B1FA2",
      accent: "#BA68C8",
      textColor: "#4A148C",
      watermarkOpacity: 0.05,
      hueRotate: 270,
    },
  },

  {
    id: 5,
    name: "RP Business Solution LLP",
    shortName: "RP Business",
    date: "11-07-2023",
    logo: rpblogo,
    header: rp_header,
    footer: rp_footer,
    signature: Rpbuisness_signature,
    stamp: Rpbuisness_stamp,
    watermark: placeholderWatermark,
    headerImage: rp_header,
    footerImage: rp_footer,
    watermarkImage: placeholderWatermark,
    address:
      "Address : 401,4th Floor,Sai Villa Commercial Appartment,Sr No 166,Malwadi road, Opps. to Sahyadri Hospital, Hadapsar,Pune-411028",
    email: " hr@rpbsolution.com",
    phone: "+91 9284888739",
    website: "https://www.rpbsolution.com/",
    city: "Pune",
    regNo: "396129",
    hrName: "Aditi Dhambare",
    brandColors: {
      primary: "#F44336",
      secondary: "#D32F2F",
      accent: "#FF5722",
      textColor: "#B71C1C",
      watermarkOpacity: 0.06,
      hueRotate: 0,
    },
  },

  {
    id: 6,
    name: "Penta Software Consultancy Services (I) Pvt Ltd",
    shortName: "Penta Software",
    date: "03-08-2022",
    logo: pentalogo,
    header: Penta_header,
    footer: Penta_footer,
    signature: Penta_signature,
    jaya_sign: penta_jayabharti_sign,
    stamp: Penta_stamp,
    watermark: Penta_watermark,
    headerImage: Penta_header,
    footerImage: Penta_footer,
    watermarkImage: Penta_watermark,
    address:
      "Office No. 102-C, First Floor, Ganesham Commercial -A, Survey No. 21/18-21/24, BRTS Road, Pimple Saudagar, Pune- 4110271",
    email: "hr@pentasoftwareconsultancy.com",
    phone: "+91 7066541234",
    website: "https://pentasoftwareconsultancy.com/",
    city: "Pune",
    regNo: "CIN: U72900MH2022PTC388125",
    hrName: "Neeta Dere",
    ceoName: "Jaya Bharati",
    brandColors: {
      primary: "#607D8B",
      secondary: "#455A64",
      accent: "#90A4AE",
      textColor: "#263238",
      watermarkOpacity: 0.05,
      hueRotate: 180,
    },
  },

  {
    id: 7,
    name: "NIMBJA SECURITY SOLUTIONS Pvt. Ltd.",
    shortName: "Nimbja Security",
    date: "05-12-2018",
    logo: nimbjalogo,
    header: Nimbja_header,
    footer: Nimbja_footer,
    signature: Nimbja_signature,
    CEO: Nimbja_CEO,
    stamp: Nimbja_stamp,
    watermark: null,
    headerImage: Nimbja_header,
    footerImage: Nimbja_footer,
    watermarkImage: null,
    address:
      "Office No. 4, 2nd Floor, Ganesham Commercial A, 13, Nashik Phata Road, Pimple Gurav, Pimpri-Chinchwad, Pune- 411027",
    email: "hr@nimbjasolution.com",
    phone: "+91 7066561234",
    website: "https://nimbjasolution.com/",
    city: "Pune",
    regNo: "CIN: U74999PN2018PTC177547",
    hrName: "Kalpana Khade ",
    brandColors: {
      primary: "#795548",
      secondary: "#5D4037",
      accent: "#A1887F",
      textColor: "#3E2723",
      watermarkOpacity: 0.04,
      hueRotate: 30,
    },
  },

  {
    id: 8,
    name: "JDIT Software Solutions Pvt. Ltd.",
    shortName: "JDIT",
    date: "07-10-2022",
    logo: jditlogo,
    header: jdit_header,
    footer: jdit_footer,
    signature: jdit_signature,
    sign: ajaySignature,
    incrementSignature: ajaySignature,
    stamp: jdit_stamp,
    watermark: jdit_watermark,
    headerImage: jdit_header,
    footerImage: jdit_footer,
    watermarkImage: jdit_watermark,
    address:
      "301, 3th Floor, Sai Vill Commercial Apartment,Next to Vaibhav Talkies, Behind RR Dage saries, Sr. No. 166,Malwadi Road, App. Sahyadri Hospital, Hadapsar, Pune 411028.",
    email: "hr@jditbs.com",
    phone: "+91 8390930580",
    website: "https://www.jditbs.com/",
    city: "Pune",
    regNo: "CIN: U72900PN2022PTC215539",
    hrName: " Sweety Khade",
    hrNameOne: "Ajay Wadatkar",
    brandColors: {
      primary: "#1976D2",
      secondary: "#1565C0",
      accent: "#42A5F5",
      textColor: "#0D47A1",
      watermarkOpacity: 0.07,
      hueRotate: 0,
    },
  },

  {
    id: 9,
    name: "Quick Management Services",
    shortName: "Quick Management",
    date: "10-12-2009",
    logo: qmslogo,
    header: QMS_Header,
    signature: QMS_Sign,
    satish_sign: satish_ingole_sign,
    stamp: QMS_Stamp,
    headerImage: QMS_Header,
    footerImage: placeholderFooter,
    address:
      "Quick Management Services 404,Changbhale Heights, Jawalkar Nagar, near Kalpataru Society, Phase-3, Pimple Gurav, Pune, Maharashtra 411061",
    email: "hr@quickmanagementservices.com",
    phone: "+91 7066521234",
    website: "https://www.quickmanagementservices.com/",
    city: "Pune",
    regNo: "CIN: U74140WB2009PLC135775",
    hrName: "Subhash Sarkate",
    ceoName: "Satish Ingole",
    brandColors: {
      primary: "#E91E63",
      secondary: "#C2185B",
      accent: "#F48FB1",
      textColor: "#880E4F",
      watermarkOpacity: 0.05,
      hueRotate: 315,
    },
  },

  {
    id: 10,
    name: "Smart Software Services (I) Pvt. Ltd.",
    shortName: "Smart Software",
    date: "09-02-2016",
    logo: "logos/SmartSoftwareServicesLogo.png",
    header: smart_header,
    footer: smartholderFooter,
    signature: smartholderSignature,
    incrementSignature: vandanaSignature,
    stamp: smartholderStamp,
    watermark: smartholderWatermark,
    headerImage: smartholderHeader,
    footerImage: smartholderFooter,
    watermarkImage: smartholderWatermark,
    address:
      "406 Changbhale Heights, Near Kalpataru Estate Phase III, Pimple Gurav, Pune 411061",
    email: "hr@smartsoftwareservice.com",
    phone: "+91 7066511234",
    website: "https://smartsoftwareservice.com/",
    city: "Pune",
    regNo: "CIN:U74990PN2016PTC158285",
    hrName: "Sandeep Patil",
    brandColors: {
      primary: "#00BCD4",
      secondary: "#0097A7",
      accent: "#4DD0E1",
      textColor: "#006064",
      watermarkOpacity: 0.06,
      hueRotate: 180,
    },
  },
];

export const documentTypes = [
    {
        id: 1,
        name: 'Salary Slip',
        template: 'salary-slip',
        fields: [
            { name: 'mrms', label: 'Identity', type: 'select', options: ['Mr.', 'Mrs.', 'Miss.', 'Mx.'], required: true },
            { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
            { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
            { name: 'designation', label: 'Designation', type: 'text', required: true },
            { name: 'department', label: 'Department', type: 'text', required: false },
            { name: 'month', label: 'Month', type: 'month', required: true },
            { name: 'totalSalary', label: 'Total Montly Salary', type: 'number', required: true },
            { name: 'doj', label: 'Date of Joining', type: 'date', require: true },
            { name: 'pan', label: 'PAN Card Number', type: 'text', required: true },
            { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
            { name: 'mode', label: 'Bank Name', type: 'text', required: false },
            { name: 'workdays', label: 'Total Workdays', type: 'number', required: true },
            { name: 'accountNo', label: 'Account Number', type: 'text', required: false },
            { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
            {
                name: 'salaryType',
                label: 'Offer Type',
                type: 'select',
                options: ['withPF', 'withoutPF'],
                required: true
            },
        ]
    },
    {
        id: 2,
        name: 'Offer Letter',
        template: 'offer-letter',
        fields: [
            { name: 'mrms', label: 'Identity', type: 'select', options: ['Mr.', 'Mrs.', 'Miss.', 'Mx.'], required: true },
            { name: 'candidateName', label: 'Employee Name', type: 'text', required: true },
            { name: 'address', label: 'Address', type: 'textarea', required: false },
            { name: 'position', label: 'Position', type: 'text', required: true },
            { name: 'department', label: 'Department', type: 'text', required: false },
            { name: 'employmentType', label: 'Employment Type', type: 'select', options: ['Full-time', 'Part-time', 'Contract', 'Internship'], required: false },
            { name: 'joiningDate', label: 'Joining Date', type: 'date', required: true },
            { name: 'probationPeriod', label: 'Probation Period (months)', type: 'number', required: false },
            { name: 'salary', label: 'Annual Salary (CTC)', type: 'number', required: true },
            { name: 'location', label: 'Work Location', type: 'text', required: false },
            { name: 'workHours', label: 'Work Hours', type: 'text', required: false },
            { name: 'reportingManager', label: 'Reporting Manager', type: 'text', required: false },
            { name: 'offerValidTill', label: 'Offer Valid Till', type: 'date', required: false },
            {
                name: 'offerType',
                label: 'Offer Type',
                type: 'select',
                options: ['withPF', 'withoutPF'],
                required: true
            },
            { name: 'issueDate', label: 'Issue Date', type: 'date', required: true },
        ]
    },
    {
        id: 3,
        name: 'Appointment Letter',
        template: 'appointment-letter',
        fields: [
            { name: 'mrms', label: 'Identity', type: 'select', options: ['Mr.', 'Mrs.', 'Miss.', 'Mx.'], required: true },
            { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
            { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
            { name: 'address', label: 'Address', type: 'textarea', required: true },
            { name: 'position', label: 'Position', type: 'text', required: true },
            { name: 'department', label: 'Department', type: 'text', required: false },
            { name: 'joiningDate', label: 'Joining Date', type: 'date', required: true },
            { name: 'probationPeriod', label: 'Probation Period (months)', type: 'number', required: true },
            { name: 'salary', label: 'Joining Annual Salary (CTC)', type: 'number', required: true },
            { name: 'workLocation', label: 'Work Location', type: 'text', required: true },
            { name: 'reportingManager', label: 'Reporting Manager', type: 'text', required: false },
            { name: 'workHours', label: 'Work Hours', type: 'text', required: false },
            {
                name: 'appointmentType',
                label: 'Appointment Type',
                type: 'select',
                options: ['withPF', 'withoutPF'],
                required: true
            },
            { name: 'issueDate', label: 'Issue Date', type: 'date', required: true }
        ]
    },
    {
        id: 4,
        name: 'Experience Letter',
        template: 'experience-letter',
        fields: [
            { name: 'mrms', label: 'Identity', type: 'select', options: ['Mr.', 'Mrs.', 'Miss.', 'Mx.'], required: true },
            { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
            { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
            { name: 'designation', label: 'Designation', type: 'text', required: true },
            { name: 'department', label: 'Department', type: 'text', required: false },
            { name: 'joiningDate', label: 'Joining Date', type: 'date', required: true },
            { name: 'relievingDate', label: 'Relieving Date', type: 'date', required: true },
            // { name: 'workDescription', label: 'Work Description', type: 'textarea', required: true },
            { name: 'conduct', label: 'Conduct & Performance', type: 'select', options: ['Excellent', 'Very Good', 'Good', 'Satisfactory'], required: false },
            { name: 'issueDate', label: 'Issue Date', type: 'date', required: true }
        ]
    },
    {
        id: 5,
        name: 'Relieving Letter',
        template: 'relieving-letter',
        fields: [
            { name: 'mrms', label: 'Identity', type: 'select', options: ['Mr.', 'Mrs.', 'Miss.', 'Mx.'], required: true },
            { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
            { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
            { name: 'designation', label: 'Designation', type: 'text', required: true },
            { name: 'department', label: 'Department', type: 'text', required: true },
            { name: 'joiningDate', label: 'Joining Date', type: 'date', required: true },
            { name: 'issueDate', label: 'Issue Date', type: 'date', required: true },
            { name: 'lastWorkingDay', label: 'Relieving Date', type: 'date', required: true },
            { name: 'noticePeriod', label: 'Notice Period (Days)', type: 'text', required: true },
            { name: 'handoverStatus', label: 'Handover Status', type: 'select', options: ['Completed', 'Partially Completed', 'Not Applicable'], required: true },
        ]
    },
    {
        id: 6,
        name: 'Employment Verification Letter',
        template: 'employment-verification',
        fields: [
            { name: 'mrms', label: 'Select Title', type: 'select', options: ['Mr.', 'Mrs.', 'Miss.', 'Mx.'], required: true },
            { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
            { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
            { name: 'designation', label: 'Designation', type: 'text', required: true },
            { name: 'department', label: 'Department', type: 'text', required: true },
            { name: 'joiningDate', label: 'Joining Date', type: 'date', required: true },
            { name: 'employmentStatus', label: 'Employment Status', type: 'select', options: ['Active', 'Former'], required: true },
            { name: 'currentSalary', label: 'Current Annual Salary', type: 'number', required: false },
            { name: 'workLocation', label: 'Work Location', type: 'text', required: true },
            { name: 'requestedBy', label: 'Requested By', type: 'text', required: true },
            { name: 'purpose', label: 'Purpose of Verification', type: 'text', required: false },
            { name: 'issueDate', label: 'Issue Date', type: 'date', required: true }
        ]
    },
    {
        id: 7,
        name: 'Increment Letter',
        template: 'increment-letter',
        fields: [
            { name: 'mrms', label: 'Identity', type: 'select', options: ['Mr.', 'Mrs.', 'Miss.', 'Mx.'], required: true },
            { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
            { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
            { name: 'designation', label: 'Designation', type: 'text', required: true },
            { name: 'department', label: 'Department', type: 'text', required: false },
            { name: 'newCTC', label: 'Increment Package', type: 'number', required: true },
            { name: 'performanceYear', label: 'Performance Year', type: 'text', required: true },
            { name: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
            {
                name: 'incrementType',
                label: 'Offer Type',
                type: 'select',
                options: ['withPF', 'withoutPF'],
                required: true
            },
            { name: 'issueDate', label: 'Issue Date', type: 'date', required: true },
        ]
    },
    {
        id: 8,
        name: 'Promotion Letter',
        template: 'promotion-letter',
        fields: [
            { name: 'mrms', label: 'Select Title', type: 'select', options: ['Mr.', 'Mrs.', 'Miss.', 'Mx.'], required: true },
            { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
            { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
            { name: 'currentDesignation', label: 'Current Designation', type: 'text', required: true },
            { name: 'newDesignation', label: 'New Designation', type: 'text', required: true },
            { name: 'currentDepartment', label: 'Current Department', type: 'text', required: true },
            { name: 'newDepartment', label: 'New Department', type: 'text', required: false },
            { name: 'currentCTC', label: 'Current CTC (Annual)', type: 'number', required: true },
            { name: 'newCTC', label: 'New CTC (Annual)', type: 'number', required: true },
            { name: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
            { name: 'newReportingManager', label: 'New Reporting Manager', type: 'text', required: false },
            { name: 'issueDate', label: 'Issue Date', type: 'date', required: true },
            { name: 'achievements', label: 'Key Achievements', type: 'textarea', required: false }
        ]
    },
    {
        id: 9,
        name: 'Warning Letter',
        template: 'warning-letter',
        fields: [
            { name: 'mrms', label: 'Select Title', type: 'select', options: ['Mr.', 'Mrs.', 'Miss.', 'Mx.'], required: true },
            { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
            { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
            { name: 'designation', label: 'Designation', type: 'text', required: true },
            { name: 'department', label: 'Department', type: 'text', required: true },
            { name: 'warningType', label: 'Warning Type', type: 'select', options: ['Verbal Warning', 'Written Warning', 'Final Warning'], required: true },
            { name: 'issueDescription', label: 'Issue Description', type: 'textarea', required: true },
            { name: 'previousWarnings', label: 'Previous Warnings', type: 'textarea', required: false },
            { name: 'expectedImprovement', label: 'Expected Improvement', type: 'textarea', required: true },
            { name: 'reviewDate', label: 'Review Date', type: 'date', required: true },
            { name: 'consequences', label: 'Consequences if Not Improved', type: 'textarea', required: true },
            { name: 'issueDate', label: 'Issue Date', type: 'date', required: true }
        ]
    },
    {
        id: 10,
        name: 'No Objection Certificate (NOC)',
        template: 'noc-letter',
        fields: [
            { name: 'mrms', label: 'Select Title', type: 'select', options: ['Mr.', 'Mrs.', 'Miss.', 'Mx.'], required: true },
            { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
            { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
            { name: 'designation', label: 'Designation', type: 'text', required: true },
            { name: 'department', label: 'Department', type: 'text', required: true },
            { name: 'purpose', label: 'Purpose of NOC', type: 'select', options: ['Higher Education', 'Part-time Job', 'Freelancing', 'Business Activity', 'Travel/Visa', 'Other'], required: true },
            { name: 'purposeDetails', label: 'Purpose Details', type: 'textarea', required: true },
            { name: 'duration', label: 'Duration/Period', type: 'text', required: false },
            { name: 'conditions', label: 'Conditions/Terms', type: 'textarea', required: false },
            { name: 'issueDate', label: 'Issue Date', type: 'date', required: true },
            { name: 'validTill', label: 'Valid Till', type: 'date', required: false }
        ]
    },
    {
        id: 11,
        name: 'Internship Certificate',
        template: 'internship-certificate',
        fields: [
            {
                name: 'mrms',
                label: 'Identity',
                type: 'select',
                options: ['Mr.', 'Mrs.', 'Miss.', 'Mx.'],
                required: true
            },

      {
        name: "employeeName",
        label: "Employee Name",
        type: "text",
        required: true,
      },

      {
        name: "designation",
        label: "Designation",
        type: "text",
        required: true,
      },
      {
        name: "department",
        label: "Department",
        type: "text",
        required: true,
      },
      {
        name: "address",
        label: "Address",
        type: "textarea",
        required: false,
      },

      {
        name: "internshipType",
        label: "Internship Type",
        type: "select",
        options: ["paid", "unpaid"],
        required: true,
      },

      // ✅ NEW — Stipend (Only for Paid)
      {
        name: "stipend",
        label: "Monthly Stipend",
        type: "number",
        required: false,
        dependsOn: {
          field: "internshipType",
          value: "paid",
        },
      },

      {
        name: "issueDate",
        label: "Issue Date",
        type: "date",
        required: true,
      },

      {
        name: "startDate",
        label: "Start Date",
        type: "date",
        required: true,
      },

      {
        name: "endDate",
        label: "End Date",
        type: "date",
        required: true,
      },
    ],
  },

  {
    id: 12,
    name: "Completion Certificate",
    template: "completion-certificate",
    fields: [
      {
        name: "mrms",
        label: "Identity",
        type: "select",
        options: ["Mr.", "Mrs.", "Miss.", "Mx."],
        required: true,
      },
      {
        name: "employeeName",
        label: "Employee Name",
        type: "text",
        required: true,
      },
      {
        name: "employeeId",
        label: "Employee ID",
        type: "text",
        required: true,
      },
      {
        name: "designation",
        label: "Designation",
        type: "text",
        required: true,
      },
      { name: "department", label: "Department", type: "text", required: true },
      {
        name: "projectName",
        label: "Project Name",
        type: "text",
        required: true,
      },
      { name: "startDate", label: "Start Date", type: "date", required: true },
      {
        name: "completionDate",
        label: "Completion Date",
        type: "date",
        required: true,
      },
      { name: "role", label: "Role in Project", type: "text", required: true },
      {
        name: "technologies",
        label: "Technologies Used",
        type: "textarea",
        required: true,
      },
      {
        name: "achievements",
        label: "Key Achievements",
        type: "textarea",
        required: true,
      },
      {
        name: "clientName",
        label: "Client Name",
        type: "text",
        required: false,
      },
      { name: "issueDate", label: "Issue Date", type: "date", required: true },
    ],
  },
  {
    id: 13,
    name: "Salary Transaction Certificate",
    template: "salary-transaction",
    fields: [
      {
        name: "mrms",
        label: "Select Title",
        type: "select",
        options: ["Mr.", "Mrs.", "Miss.", "Mx."],
        required: true,
      },
      {
        name: "employeeName",
        label: "Employee Name",
        type: "text",
        required: true,
      },
      {
        name: "employeeId",
        label: "Employee ID",
        type: "text",
        required: true,
      },
      {
        name: "designation",
        label: "Designation",
        type: "text",
        required: true,
      },
      { name: "month", label: "Salary Month", type: "month", required: true },
      { name: "ctc", label: "Annual CTC", type: "number", required: true },
      {
        name: "netSalary",
        label: "Net Salary Paid",
        type: "number",
        required: true,
      },
      { name: "bankName", label: "Bank Name", type: "text", required: true },
      {
        name: "accountNumber",
        label: "Account Number",
        type: "text",
        required: true,
      },
      {
        name: "transactionDate",
        label: "Transaction Date",
        type: "date",
        required: true,
      },
      {
        name: "transactionId",
        label: "Transaction ID",
        type: "text",
        required: true,
      },
      {
        name: "paymentMode",
        label: "Payment Mode",
        type: "select",
        options: ["Bank Transfer", "Cheque", "Cash"],
        required: true,
      },
    ],
  },
  {
    id: 14,
    name: "Termination Letter",
    template: "termination-letter",
    fields: [
      {
        name: "mrms",
        label: "Select Title",
        type: "select",
        options: ["Mr.", "Mrs.", "Miss.", "Mx."],
        required: true,
      },
      {
        name: "employeeName",
        label: "Employee Name",
        type: "text",
        required: true,
      },
      {
        name: "employeeId",
        label: "Employee ID",
        type: "text",
        required: true,
      },
      {
        name: "designation",
        label: "Designation",
        type: "text",
        required: true,
      },
      { name: "department", label: "Department", type: "text", required: true },
      {
        name: "terminationType",
        label: "Termination Type",
        type: "select",
        options: [
          "Voluntary Resignation",
          "Involuntary Termination",
          "Mutual Separation",
          "End of Contract",
        ],
        required: true,
      },
      {
        name: "terminationDate",
        label: "Termination Date",
        type: "date",
        required: true,
      },
      {
        name: "lastWorkingDay",
        label: "Last Working Day",
        type: "date",
        required: true,
      },
      {
        name: "reason",
        label: "Reason for Termination",
        type: "textarea",
        required: true,
      },
      {
        name: "noticePeriod",
        label: "Notice Period",
        type: "text",
        required: false,
      },
      {
        name: "finalSettlement",
        label: "Final Settlement Details",
        type: "textarea",
        required: false,
      },
      { name: "issueDate", label: "Issue Date", type: "date", required: true },
    ],
  },
  {
    id: 15,
    name: "Transfer Letter",
    template: "transfer-letter",
    fields: [
      {
        name: "mrms",
        label: "Select Title",
        type: "select",
        options: ["Mr.", "Mrs.", "Miss.", "Mx."],
        required: true,
      },
      {
        name: "employeeName",
        label: "Employee Name",
        type: "text",
        required: true,
      },
      {
        name: "employeeId",
        label: "Employee ID",
        type: "text",
        required: true,
      },
      {
        name: "currentDesignation",
        label: "Current Designation",
        type: "text",
        required: true,
      },
      {
        name: "currentDepartment",
        label: "Current Department",
        type: "text",
        required: true,
      },
      {
        name: "currentLocation",
        label: "Current Location",
        type: "text",
        required: true,
      },
      {
        name: "newDesignation",
        label: "New Designation",
        type: "text",
        required: false,
      },
      {
        name: "newDepartment",
        label: "New Department",
        type: "text",
        required: true,
      },
      {
        name: "newLocation",
        label: "New Location",
        type: "text",
        required: true,
      },
      {
        name: "transferDate",
        label: "Transfer Date",
        type: "date",
        required: true,
      },
      {
        name: "reason",
        label: "Reason for Transfer",
        type: "textarea",
        required: false,
      },
      {
        name: "newReportingManager",
        label: "New Reporting Manager",
        type: "text",
        required: false,
      },
      { name: "issueDate", label: "Issue Date", type: "date", required: true },
    ],
  },
  {
    id: 16,
    name: "Full and final Letter",
    template: "fullandfinal-letter",
    fields: [
      {
        name: "mrms",
        label: "Identity",
        type: "select",
        options: ["Mr.", "Mrs.", "Miss.", "Mx."],
        required: true,
      },
      {
        name: "employeeName",
        label: "Employee Name",
        type: "text",
        required: true,
      },
      {
        name: "employeeId",
        label: "Employee ID",
        type: "text",
        required: true,
      },
      {
        name: "designation",
        label: "Designation",
        type: "text",
        required: true,
      },
      { name: "department", label: "Department", type: "text", required: true },
      { name: "date", label: "F&F Date", type: "date", required: true },
      { name: "month", label: "For the Month", type: "month", required: true },
      {
        name: "totalSalary",
        label: "Total Salary",
        type: "number",
        required: true,
      },
      { name: "doj", label: "Joining Date", type: "date", require: true },
      {
        name: "dateofresignation",
        label: "Date of Resignation",
        type: "date",
        required: true,
      },
      {
        name: "dateofleaving",
        label: "Date of Leaving",
        type: "date",
        required: true,
      },
      {
        name: "leaveencashment",
        label: "Leave encashment",
        type: "number",
        required: false,
      },
      { name: "paiddays", label: "Paid days ", type: "number", required: true },
      {
        name: "finalType",
        label: "Offer Type",
        type: "select",
        options: ["withPF", "withoutPF"],
        required: true,
      },
      //{ name: 'mode', label: 'Mode Bank', type: 'text', required: true },
      {
        name: "workdays",
        label: "Total Day in the month",
        type: "number",
        required: true,
      },
      //{ name: 'dob', label: 'Date of Birth', type: 'date', required: true },
      // { name: 'basicSalary', label: 'Basic Salary', type: 'number', required: true },
      // { name: 'hra', label: 'HRA', type: 'number', required: true },
      // { name: 'conveyanceAllowance', label: 'Conveyance Allowance', type: 'number', required: true },
      // { name: 'medicalAllowance', label: 'Medical Allowance', type: 'number', required: true },
      // { name: 'specialAllowance', label: 'Special Allowance', type: 'number', required: true },
      // { name: 'pf', label: 'PF', type: 'number', required: true },
      // { name: 'professionalTax', label: 'Professional Tax', type: 'number', required: true },
      // { name: 'incomeTax', label: 'Income Tax', type: 'number', required: true }
    ],
  },

  {
    id: 17,
    name: "Confirmation Letter",
    template: "confirmation-letter",
    fields: [
      {
        name: "mrms",
        label: "Identity",
        type: "select",
        options: ["Mr.", "Mrs.", "Miss.", "Mx."],
        required: true,
      },
      {
        name: "employeeName",
        label: "Employee Name",
        type: "text",
        required: true,
      },
      // { name: 'employeeId', label: 'Employee ID', type: 'text', required: false },
      {
        name: "effectiveDate",
        label: "Effective Date",
        type: "date",
        required: true,
      },
      { name: "issueDate", label: "Issue Date", type: "date", required: true },
      {
        name: "totalSalary",
        label: "Total Montly Salary",
        type: "number",
        required: true,
      },
      { name: "address", label: "Address", type: "text", required: true },
      { name: "position", label: "Designation", type: "text", required: true },
      {
        name: "department",
        label: "Department",
        type: "text",
        required: false,
      },
      {
        name: "confirmationType",
        label: "Offer Type",
        type: "select",
        options: ["withPF", "withoutPF"],
        required: true,
      },
    ],
  },
];

// Mock user data for authentication
export const users = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
  {
    id: 2,
    username: "user",
    password: "user123",
    name: "Regular User",
    role: "user",
  },
];
