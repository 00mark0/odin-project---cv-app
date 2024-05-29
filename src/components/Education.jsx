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
    setTitle(localStorage.getItem("title") || "Finansijski Tehnicar");
    setSchool(localStorage.getItem("school") || "Macvanksa srednja skola");
    setYear(localStorage.getItem("year") || "2014 - 2018");
    setLocation(localStorage.getItem("location") || "Bogatić, Serbia");
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
                <div>
                  <div>
                    {isEditing ? (
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    ) : (
                      <h3 className="font-bold">{title}</h3>
                    )}
                    {isEditing ? (
                      <input
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                      />
                    ) : (
                      <h4 className="italic">
                        <span>at</span> {school}
                      </h4>
                    )}
                  </div>
                  <div>
                    {isEditing ? (
                      <input
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      />
                    ) : (
                      <p>{year}</p>
                    )}
                    {isEditing ? (
                      <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    ) : (
                      <p className="mb-3">{location}</p>
                    )}
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
                        <FontAwesomeIcon
                          icon={isVisible ? faEyeSlash : faEye}
                        />
                      </button>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </section>
      )}
      {!isVisible && (
        <button onClick={() => setIsVisible(!isVisible)}>
          <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} />
        </button>
      )}
    </>
  );
}

export default Education;
