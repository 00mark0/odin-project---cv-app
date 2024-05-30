import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCheck,
  faPlus,
  faMinus,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { PrintContext } from "../App";

function Employments() {
  const isPrinting = useContext(PrintContext);
  const [employments, setEmployments] = useState(() => {
    const localData = localStorage.getItem("employments");
    return localData ? JSON.parse(localData) : [];
  });
  const [editing, setEditing] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    localStorage.setItem("employments", JSON.stringify(employments));
  }, [employments]);

  const addEmployment = () => {
    const newEmployment = {
      title: "",
      company: "",
      period: "",
      location: "",
      description: "",
      responsibilities: [""],
    };
    setEmployments([...employments, newEmployment]);
    setEditing(employments.length);
  };

  const removeEmployment = (index) => {
    const newEmployments = [...employments];
    newEmployments.splice(index, 1);
    setEmployments(newEmployments);
    if (editing === index) setEditing(null);
  };

  const updateEmployment = (index, field, value) => {
    const newEmployments = [...employments];
    newEmployments[index][field] = value;
    setEmployments(newEmployments);
  };

  const addResponsibility = (index) => {
    const newEmployments = [...employments];
    newEmployments[index].responsibilities.push("");
    setEmployments(newEmployments);
  };

  const removeResponsibility = (employmentIndex, responsibilityIndex) => {
    const newEmployments = [...employments];
    newEmployments[employmentIndex].responsibilities.splice(
      responsibilityIndex,
      1
    );
    setEmployments(newEmployments);
  };

  const updateResponsibility = (
    employmentIndex,
    responsibilityIndex,
    value
  ) => {
    const newEmployments = [...employments];
    newEmployments[employmentIndex].responsibilities[responsibilityIndex] =
      value;
    setEmployments(newEmployments);
  };

  return (
    <>
      {!isPrinting && (
        <button onClick={() => setIsVisible(!isVisible)}>
          <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} />
        </button>
      )}
      {isVisible && (
        <section
          id="employments"
          className="grid grid-cols-5 gap-4 h-auto py-4"
        >
          <h2 className="font-bold text-green-700 text-2xl col-span-3 lg:col-span-1">
            Employments
          </h2>
          <div className="border-l border-black col-span-4 px-3">
            <ul>
              {employments.map((employment, index) => (
                <li key={index}>
                  <div>
                    {editing === index ? (
                      <>
                        <input
                          type="text"
                          value={employment.title}
                          onChange={(e) =>
                            updateEmployment(index, "title", e.target.value)
                          }
                          placeholder="Job Title"
                          className="border border-black"
                        />
                        <input
                          type="text"
                          value={employment.company}
                          onChange={(e) =>
                            updateEmployment(index, "company", e.target.value)
                          }
                          placeholder="Company"
                          className="border border-black"
                        />
                        <input
                          type="text"
                          value={employment.period}
                          onChange={(e) =>
                            updateEmployment(index, "period", e.target.value)
                          }
                          placeholder="Employment Period"
                          className="border border-black"
                        />
                        <input
                          type="text"
                          value={employment.location}
                          onChange={(e) =>
                            updateEmployment(index, "location", e.target.value)
                          }
                          placeholder="Location"
                          className="border border-black"
                        />
                        <textarea
                          value={employment.description}
                          onChange={(e) =>
                            updateEmployment(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Description"
                          className="border border-black w-64 h-52 md:w-96 rounded-md p-2 mt-2"
                        />
                        <ul>
                          <h5>Responsibilities</h5>
                          {employment.responsibilities.map(
                            (responsibility, i) => (
                              <li key={i}>
                                <input
                                  type="text"
                                  value={responsibility}
                                  onChange={(e) =>
                                    updateResponsibility(
                                      index,
                                      i,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Responsibility"
                                  className="border border-black"
                                />
                                {!isPrinting && (
                                  <>
                                    <button
                                      onClick={() => addResponsibility(index)}
                                    >
                                      <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                    <button
                                      onClick={() =>
                                        removeResponsibility(index, i)
                                      }
                                    >
                                      <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                  </>
                                )}
                              </li>
                            )
                          )}
                        </ul>
                        {!isPrinting && (
                          <button
                            onClick={() => {
                              if (employments.length > 0) {
                                const lastEmployment =
                                  employments[employments.length - 1];
                                if (
                                  !lastEmployment.title ||
                                  !lastEmployment.company ||
                                  !lastEmployment.period ||
                                  !lastEmployment.location ||
                                  !lastEmployment.description ||
                                  lastEmployment.responsibilities.some(
                                    (resp) => !resp
                                  )
                                ) {
                                  alert(
                                    "Please fill out all the fields of the last employment before adding a new one."
                                  );
                                  return;
                                }
                              }
                              setEditing(null);
                            }}
                          >
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-48 mb-3">
                          <div className="flex flex-col col-span-3">
                            <h3 className="text-xl font-bold">
                              {employment.title}
                            </h3>
                            <h4 className="font-semibold text-slate-800">
                              <span className="font-medium text-slate-700">
                                at
                              </span>{" "}
                              {employment.company}
                            </h4>
                          </div>
                          <div className="col-span-2">
                            <p className="italic text-sm text-slate-600">
                              {employment.period}
                            </p>
                            <p className="italic text-sm text-slate-600">
                              {employment.location}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="mb-3">{employment.description}</p>
                          <b>Responsibilities:</b>
                          <ul className="list-disc list-inside ml-3">
                            {employment.responsibilities.map(
                              (responsibility, i) => (
                                <li key={i}>{responsibility}</li>
                              )
                            )}
                          </ul>
                        </div>
                        {!isPrinting && (
                          <button
                            onClick={() => setEditing(index)}
                            className="mr-2"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        )}
                      </>
                    )}
                    {!isPrinting && (
                      <button onClick={() => removeEmployment(index)}>
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {!isPrinting && editing === null && (
              <button onClick={addEmployment}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default Employments;
