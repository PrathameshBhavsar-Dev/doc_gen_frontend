import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { createRoot } from "react-dom/client";
import React from "react";

export const generatePDF = async (TemplateComponent, props, fileName) => {
  return new Promise(async (resolve, reject) => {
    const safeProps = typeof props === "object" && props !== null ? props : {};

    // ✅ Validate component
    if (!TemplateComponent) {
      reject(new Error("TemplateComponent is null or undefined"));
      return;
    }

    if (typeof TemplateComponent !== "function") {
      console.error("❌ Invalid TemplateComponent — got:", typeof TemplateComponent, TemplateComponent);
      reject(new Error(`TemplateComponent must be a function, got: ${typeof TemplateComponent}`));
      return;
    }

    const container = document.createElement("div");
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 794px;
      background: #ffffff;
      z-index: 99999;
      opacity: 1;
      pointer-events: none;
    `;
    document.body.appendChild(container);

    const root = createRoot(container);

    // ✅ Error boundary to catch render crashes
    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
      }
      static getDerivedStateFromError(error) {
        return { hasError: true, error };
      }
      componentDidCatch(error) {
        console.error("❌ Template render error:", error);
      }
      render() {
        if (this.state.hasError) {
          return React.createElement("div", {
            id: "render-error",
            style: { color: "red", padding: "20px", fontSize: "14px" }
          }, `Render Error: ${this.state.error?.message}`);
        }
        return this.props.children;
      }
    }

    root.render(
      React.createElement(ErrorBoundary, null,
        React.createElement(TemplateComponent, safeProps)
      )
    );

    await new Promise((res) => setTimeout(res, 1500));
    container.style.top = "-99999px";
    await new Promise((res) => setTimeout(res, 100));

    try {
      console.log("Container dimensions:", container.scrollWidth, container.scrollHeight);
      console.log("Container innerHTML length:", container.innerHTML.length);
      console.log("Container innerHTML preview:", container.innerHTML.slice(0, 500)); // ✅ see what rendered

      // ✅ Check if error boundary caught something
      if (container.querySelector("#render-error")) {
        throw new Error("Template failed to render — check component and props");
      }

      if (container.scrollHeight === 0) {
        throw new Error("Container has no height — template may not be rendering");
      }

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        imageTimeout: 15000,
        width: container.scrollWidth,
        height: container.scrollHeight,
        windowWidth: container.scrollWidth,
        windowHeight: container.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          const clonedEl = clonedDoc.body.firstChild;
          if (clonedEl) {
            clonedEl.style.opacity = "1";
            clonedEl.style.visibility = "visible";
            clonedEl.style.display = "block";
          }
        },
      });

      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error("Canvas is empty");
      }

      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 1) {
        position = -(imgHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${fileName}.pdf`);
      resolve();
    } catch (err) {
      console.error("PDF Error:", err);
      reject(err);
    } finally {
      root.unmount();
      document.body.removeChild(container);
    }
  });
};