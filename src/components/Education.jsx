import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCheck,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { PrintContext } from "../App";

function Education() {
  const isPrinting = useContext(PrintContext);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [school, setSchool] = useState("");
  const [year, setYear] = useState("");
  const [location, setLocation] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTitle(localStorage.getItem("title") || "");
    setSchool(localStorage.getItem("school") || "");
    setYear(localStorage.getItem("year") || "");
    setLocation(localStorage.getItem("location") || "");
  }, []);

  const handleSave = () => {
    localStorage.setItem("title", title);
    localStorage.setItem("school", school);
    localStorage.setItem("year", year);
    localStorage.setItem("location", location);
    setIsEditing(false);
  };

  return (
    <>
      {isVisible && (
        <section id="education" className="grid grid-cols-5 gap-4 h-auto py-4">
          <h2 className="font-bold text-green-700 text-2xl col-span-3 lg:col-span-1">
            Education
          </h2>
          <div className="border-l border-black col-span-4 px-3">
            <ul>
              <li>
                <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-48 mb-3 mt-6">
                  <div className="flex flex-col col-span-3">
                    {isEditing ? (
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-black"
                        placeholder="Degree"
                      />
                    ) : (
                      <h3 className="text-xl font-bold">{title}</h3>
                    )}
                    {isEditing ? (
                      <input
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        className="border border-black"
                        placeholder="School"
                      />
                    ) : (
                      <h4 className="font-semibold text-slate-800">
                        <span className="italic font-medium text-slate-700">
                          at
                        </span>{" "}
                        {school}
                      </h4>
                    )}
                  </div>
                  <div className="col-span-2">
                    {isEditing ? (
                      <input
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="border border-black"
                        placeholder="Period"
                      />
                    ) : (
                      <p className="italic text-sm text-slate-600">{year}</p>
                    )}
                    {isEditing ? (
                      <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="border border-black"
                        placeholder="Location"
                      />
                    ) : (
                      <p className="italic text-sm text-slate-600 mb-3">
                        {location}
                      </p>
                    )}
                  </div>
                </div>
                {!isPrinting && (
                  <div>
                    <button
                      onClick={
                        isEditing ? handleSave : () => setIsEditing(true)
                      }
                      className="mr-2"
                    >
                      {isEditing ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        <FontAwesomeIcon icon={faEdit} />
                      )}
                    </button>
                    <button onClick={() => setIsVisible(!isVisible)}>
                      <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} />
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </section>
      )}
      {!isPrinting && !isVisible && (
        <button onClick={() => setIsVisible(!isVisible)}>
          <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} />
        </button>
      )}
    </>
  );
}

export default Education;
