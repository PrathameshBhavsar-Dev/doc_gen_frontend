// sagar
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { createRoot } from "react-dom/client";
import React from "react";

export const generatePDF = async (
  TemplateComponent,
  props,
  fileName
) => {

  return new Promise(async (resolve, reject) => {

    let root = null;
    let container = null;

    try {

      // =========================
      // SAFE PROPS
      // =========================

      const safeProps =
        typeof props === "object" && props !== null
          ? props
          : {};

      console.log("🚀 PDF TEMPLATE:", TemplateComponent);
      console.log("🚀 PDF PROPS:", safeProps);

      // =========================
      // VALIDATION
      // =========================

      if (!TemplateComponent) {
        throw new Error("TemplateComponent is undefined");
      }

      if (typeof TemplateComponent !== "function") {
        throw new Error(
          `Invalid TemplateComponent type: ${typeof TemplateComponent}`
        );
      }

      // =========================
      // CONTAINER
      // =========================

      container = document.createElement("div");

      container.style.cssText = `
        position: fixed;
        top: -99999px;
        left: -99999px;
        width: 794px;
        background: #ffffff;
        z-index: 999999;
        overflow: visible;
        padding: 0;
        margin: 0;
      `;

      document.body.appendChild(container);

      // =========================
      // ROOT
      // =========================

      root = createRoot(container);

      // =========================
      // ERROR BOUNDARY
      // =========================

      class ErrorBoundary extends React.Component {

        constructor(props) {
          super(props);

          this.state = {
            hasError: false,
            error: null,
          };
        }

        static getDerivedStateFromError(error) {
          return {
            hasError: true,
            error,
          };
        }

        componentDidCatch(error, info) {

          console.error("❌ TEMPLATE RENDER ERROR:");
          console.error(error);
          console.error(info);

        }

        render() {

          if (this.state.hasError) {

            return React.createElement(
              "div",
              {
                id: "pdf-render-error",
                style: {
                  padding: "20px",
                  color: "red",
                  background: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                },
              },
              `PDF Render Error: ${this.state.error?.message}`
            );
          }

          return this.props.children;
        }
      }

      // =========================
      // RENDER TEMPLATE
      // =========================

      root.render(
        React.createElement(
          ErrorBoundary,
          null,
          React.createElement(
            TemplateComponent,
            safeProps
          )
        )
      );

      // =========================
      // WAIT FOR FULL RENDER
      // =========================

      await new Promise((res) => setTimeout(res, 2500));

      // =========================
      // WAIT FOR FONTS
      // =========================

      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      console.log("✅ CONTAINER HTML:", container.innerHTML);

      // =========================
      // RENDER ERROR CHECK
      // =========================

      const renderError =
        container.querySelector("#pdf-render-error");

      if (renderError) {

        const msg = renderError.innerText;

        alert(msg);

        throw new Error(msg);
      }

      // =========================
      // EMPTY HTML CHECK
      // =========================

      if (
        !container.innerHTML ||
        container.innerHTML.trim() === ""
      ) {
        throw new Error(
          "Template rendered empty HTML"
        );
      }

      // =========================
      // HEIGHT CHECK
      // =========================

      if (container.scrollHeight <= 0) {

        console.error("❌ HEIGHT:", container.scrollHeight);

        throw new Error(
          "Template height is 0"
        );
      }

      console.log("📏 HEIGHT:", container.scrollHeight);

      // =========================
      // GENERATE CANVAS
      // =========================

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: true,
        imageTimeout: 15000,
        scrollX: 0,
        scrollY: 0,
        windowWidth: container.scrollWidth,
        windowHeight: container.scrollHeight,
      });

      if (!canvas) {
        throw new Error("Canvas generation failed");
      }

      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error("Generated canvas is empty");
      }

      // =========================
      // PDF
      // =========================

      const imgData = canvas.toDataURL(
        "image/jpeg",
        1.0
      );

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth =
        pdf.internal.pageSize.getWidth();

      const pageHeight =
        pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;

      const imgHeight =
        (canvas.height * imgWidth) /
        canvas.width;

      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(
        imgData,
        "JPEG",
        0,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pageHeight;

      while (heightLeft > 0) {

        position = heightLeft - imgHeight;

        pdf.addPage();

        pdf.addImage(
          imgData,
          "JPEG",
          0,
          position,
          imgWidth,
          imgHeight
        );

        heightLeft -= pageHeight;
      }

      // =========================
      // SAVE PDF
      // =========================

      pdf.save(`${fileName}.pdf`);

      console.log("✅ PDF SAVED");

      // =========================
      // CLEANUP DELAY
      // =========================

      setTimeout(() => {

        try {

          if (root) {
            root.unmount();
          }

          if (
            container &&
            document.body.contains(container)
          ) {
            document.body.removeChild(container);
          }

          console.log("✅ CLEANUP DONE");

        } catch (cleanupErr) {

          console.error(
            "❌ CLEANUP ERROR:",
            cleanupErr
          );

        }

      }, 1000);

      resolve();

    } catch (err) {

      console.error("❌ PDF ERROR:", err);

      alert(
        err?.message ||
        "PDF generation failed"
      );

      // =========================
      // SAFE CLEANUP
      // =========================

      try {

        if (root) {
          root.unmount();
        }

        if (
          container &&
          document.body.contains(container)
        ) {
          document.body.removeChild(container);
        }

      } catch (cleanupErr) {

        console.error(
          "❌ FINAL CLEANUP ERROR:",
          cleanupErr
        );

      }

      reject(err);
    }
  });
};