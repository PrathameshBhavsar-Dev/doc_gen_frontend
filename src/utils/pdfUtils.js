import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generates a PDF from a DOM element
 * @param {HTMLElement} element - The DOM element to convert to PDF
 * @param {string} fileName - The name of the PDF file to download
 * @returns {Promise<void>}
 */
export const generatePDF = async (element, fileName) => {
  if (!element) {
    console.error('Element not found');
    return;
  }

  try {
    // Increase delay to ensure fonts (like Bahnschrift) and stickers are 100% loaded
    await new Promise(resolve => setTimeout(resolve, 500));

    const canvas = await html2canvas(element, {
      scale: 2, 
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: element.offsetWidth,
      height: element.offsetHeight,
      windowWidth: element.offsetWidth || 1200, // Stabilize viewport
    });

    const imgData = canvas.toDataURL("image/png");
    
    // A4 dimensions in mm
    const imgWidth = 210;
    const pageHeight = 297; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const pdf = new jsPDF("p", "mm", "a4");
    
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Add additional pages if content exceeds one A4 page
    // Use a small threshold (2mm) to prevent extra blank pages due to rounding
    while (heightLeft > 2) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

/**
 * Formats a date to a readable string
 * @param {Date|string} date - The date to format
 * @returns {string} - The formatted date string
 */
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};