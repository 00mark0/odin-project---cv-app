import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCheck,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { PrintContext } from "../App";

function Summary() {
  const [isEditing, setIsEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [summary, setSummary] = useState("");
  const isPrinting = useContext(PrintContext);

  useEffect(() => {
    const savedSummary = localStorage.getItem("summary");
    if (savedSummary) setSummary(savedSummary);
  }, []);

  useEffect(() => {
    localStorage.setItem("summary", summary);
  }, [summary]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEditing(false);
  };

  return isVisible ? (
    <section id="summary" className="grid grid-cols-5 gap-4 h-auto py-4">
      <h2 className="font-bold text-green-700 text-2xl col-span-3 lg:col-span-1">
        Summary
      </h2>
      <div className="border-l border-black col-span-4 px-3">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="border border-black w-28 h-52 md:w-96 rounded-md p-2"
              placeholder="Write a summary about yourself"
            />
            <button type="submit" className="md:ml-3">
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </form>
        ) : (
          <p className="mb-3 w-full">{summary}</p>
        )}
        {!isPrinting && !isEditing && (
          <button className="mr-2" onClick={() => setIsEditing(true)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}
        {!isPrinting && (
          <button onClick={() => setIsVisible(false)}>
            <FontAwesomeIcon icon={faEyeSlash} />
          </button>
        )}
      </div>
    </section>
  ) : (
    !isPrinting && (
      <button onClick={() => setIsVisible(true)}>
        <FontAwesomeIcon icon={faEye} />
      </button>
    )
  );
}

export default Summary;
