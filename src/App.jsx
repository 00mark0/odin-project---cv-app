import React, { useState } from "react";
import "./App.css";
import Info from "./components/Info";
import Summary from "./components/Summary";
import Objective from "./components/Objective";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Courses from "./components/Courses";
import Employments from "./components/Employment";
import Projects from "./components/Projects";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const PrintContext = React.createContext();

function App() {
  const [isPrinting, setIsPrinting] = useState(false);
  const [offset, setOffset] = useState(10);

  const printDocument = () => {
    setIsPrinting(true);
    setTimeout(() => {
      const printableArea = document.getElementById("printable-area-1");

      html2canvas(printableArea, { scale: 1 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeightMM = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        const totalPDFPages = Math.ceil(pdfHeight / pdfHeightMM);

        for (let i = 0; i < totalPDFPages; i++) {
          if (i !== 0) pdf.addPage();
          const srcY = i * pdfHeightMM - offset;
          pdf.addImage(
            imgData,
            "PNG",
            0,
            -srcY,
            pdfWidth,
            pdfHeight,
            undefined,
            "FAST"
          );
        }

        pdf.save("yourCV.pdf");
        setIsPrinting(false);
      });
    }, 0);
  };

  return (
    <PrintContext.Provider value={isPrinting}>
      <div className="min-h-screen w-full flex justify-center">
        <div className="md:w-7/12 pb-6">
          <div id="printable-area-1" className="mb-6 p-10">
            <Info />
            <hr />
            <Summary />
            <Objective />
            <Skills />
            <Education />
            <Courses />
            <Employments />
            <Projects />
          </div>
          <div className="flex">
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="offset" className="mr-2">
                Offset:
              </label>
              <input
                id="offset"
                type="range"
                min="-10"
                max="30"
                value={offset}
                onChange={(e) => setOffset(Number(e.target.value))}
                title="Adjust the offset to avoid cutting off the content in the PDF."
              />
              <span className="ml-2">{offset}</span>
            </div>
            <button
              className="ml-10 bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded mb-3"
              onClick={printDocument}
            >
              Download as PDF
            </button>
          </div>
        </div>
      </div>
    </PrintContext.Provider>
  );
}

export default App;
