import React, { useState } from "react";
import "./App.css";
import Info from "./components/Info";
import Summary from "./components/Summary";
import Objective from "./components/Objective";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Courses from "./components/Courses";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const PrintContext = React.createContext();

function App() {
  const [isPrinting, setIsPrinting] = useState(false);

  const printDocument = () => {
    setIsPrinting(true);
    setTimeout(() => {
      const input = document.getElementById("printable-area");
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("download.pdf");
        setIsPrinting(false);
      });
    }, 0);
  };

  return (
    <PrintContext.Provider value={isPrinting}>
      <div className="min-h-screen w-full flex justify-center">
        <div className="md:w-7/12">
          <div id="printable-area" className="mb-6 p-10">
            <Info />
            <hr />
            <Summary />
            <Objective />
            <Skills />
            <Education />
            <Courses />
          </div>
          <button className="ml-10" onClick={printDocument}>
            Download as PDF
          </button>
        </div>
      </div>
    </PrintContext.Provider>
  );
}

export default App;
