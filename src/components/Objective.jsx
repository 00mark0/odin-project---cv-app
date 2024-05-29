import { PrintContext } from "../App";
import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEdit,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

function Objective() {
  const isPrinting = useContext(PrintContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(
    JSON.parse(localStorage.getItem("isVisible")) || true
  );
  const [paragraph1, setParagraph1] = useState(
    localStorage.getItem("paragraph1") || ""
  );
  const [paragraph2, setParagraph2] = useState(
    localStorage.getItem("paragraph2") || ""
  );

  useEffect(() => {
    localStorage.setItem("isVisible", JSON.stringify(isVisible));
    localStorage.setItem("paragraph1", paragraph1);
    localStorage.setItem("paragraph2", paragraph2);
  }, [isVisible, paragraph1, paragraph2]);

  return isVisible ? (
    <section id="objective" className="grid grid-cols-5 gap-4 h-auto py-4">
      <h2 className="font-bold text-green-700 text-2xl col-span-3 lg:col-span-1">
        Career Objective
      </h2>
      <div className="border-l border-black col-span-4 px-3">
        {isEditing ? (
          <textarea
            value={paragraph1}
            onChange={(e) => setParagraph1(e.target.value)}
            className="border border-black w-28 h-52 md:w-96 rounded-md p-2"
          />
        ) : (
          <p>{paragraph1}</p>
        )}
        <br />
        {isEditing ? (
          <textarea
            value={paragraph2}
            onChange={(e) => setParagraph2(e.target.value)}
            className="border border-black w-28 h-52 md:w-96 rounded-md p-2"
          />
        ) : (
          <p className="mb-3">{paragraph2}</p>
        )}
        {!isPrinting && (
          <button className="mr-2" onClick={() => setIsEditing(!isEditing)}>
            <FontAwesomeIcon icon={isEditing ? faCheck : faEdit} />
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

export default Objective;
