import "./App.css";
import Info from "./components/Info";
import Summary from "./components/Summary";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function App() {
  const printDocument = () => {
    const input = document.getElementById("printable-area");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
    });
  };

  return (
    <>
      <div className="min-h-screen w-full flex justify-center">
        <div className="md:w-7/12">
          <div id="printable-area">
            <Info />
            <hr />
            <Summary />
          </div>
          <button onClick={printDocument}>Download as PDF</button>
        </div>
      </div>
    </>
  );
}

export default App;
