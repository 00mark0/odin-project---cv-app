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

  const printDocument = () => {
    setIsPrinting(true);
    setTimeout(() => {
      const input1 = document.getElementById("printable-area-1");
      const input2 = document.getElementById("printable-area-2");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfHeightMM = pdf.internal.pageSize.getHeight();

      html2canvas(input1, { scale: 2 }).then((canvas1) => {
        const imgData1 = canvas1.toDataURL("image/png");
        const imgProps1 = pdf.getImageProperties(imgData1);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight1 = (imgProps1.height * pdfWidth) / imgProps1.width;
        pdf.addImage(imgData1, "PNG", 0, 0, pdfWidth, pdfHeight1);

        html2canvas(input2, { scale: 2 }).then((canvas2) => {
          const imgData2 = canvas2.toDataURL("image/png");
          const imgProps2 = pdf.getImageProperties(imgData2);
          const pdfHeight2 = (imgProps2.height * pdfWidth) / imgProps2.width;

          if (pdfHeight1 + pdfHeight2 <= pdfHeightMM) {
            pdf.addImage(imgData2, "PNG", 0, pdfHeight1, pdfWidth, pdfHeight2);
          } else {
            pdf.addPage();
            pdf.addImage(imgData2, "PNG", 0, 0, pdfWidth, pdfHeight2);
          }

          pdf.save("yourCV.pdf");
          setIsPrinting(false);
        });
      });
    }, 0);
  };

  return (
    <PrintContext.Provider value={isPrinting}>
      <div className="min-h-screen w-full flex justify-center">
        <div className="md:w-7/12">
          <div id="printable-area-1" className="mb-6 p-10">
            <Info />
            <hr />
            <Summary />
            <Objective />
            <Skills />
            <Education />
            <Courses />
            <Employments />
          </div>
          <div id="printable-area-2" className="mb-6 p-10">
            <Projects />
          </div>
          <button
            className="ml-10 bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded mb-3"
            onClick={printDocument}
          >
            Download as PDF
          </button>
        </div>
      </div>
    </PrintContext.Provider>
  );
}

export default App;
