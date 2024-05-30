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

function Projects() {
  const isPrinting = useContext(PrintContext);
  const [projects, setProjects] = useState(() => {
    const localData = localStorage.getItem("projects");
    return localData ? JSON.parse(localData) : [];
  });
  const [editing, setEditing] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProjects = () => {
    const newProject = {
      title: "",
      company: "",
      period: "",
      location: "",
      description: "",
      responsibilities: [""],
    };
    setProjects([...projects, newProject]);
    setEditing(projects.length);
  };

  const removeProjects = (index) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
    if (editing === index) setEditing(null);
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);
  };

  const addResponsibility = (index) => {
    const newProjects = [...projects];
    newProjects[index].responsibilities.push("");
    setProjects(newProjects);
  };

  const removeResponsibility = (projectIndex, responsibilityIndex) => {
    const newProjects = [...projects];
    newProjects[projectIndex].responsibilities.splice(responsibilityIndex, 1);
    setProjects(newProjects);
  };

  const updateResponsibility = (projectIndex, responsibilityIndex, value) => {
    const newProjects = [...projects];
    newProjects[projectIndex].responsibilities[responsibilityIndex] = value;
    setProjects(newProjects);
  };

  return (
    <>
      {!isPrinting && (
        <button onClick={() => setIsVisible(!isVisible)}>
          <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} />
        </button>
      )}
      {isVisible && (
        <section id="projects" className="grid grid-cols-5 gap-4 h-auto py-4">
          <h2 className="font-bold text-green-700 text-2xl col-span-3 lg:col-span-1">
            Projects
          </h2>
          <div className="border-l border-black col-span-4 px-3">
            <ul>
              {projects.map((project, index) => (
                <li key={index}>
                  <div>
                    {editing === index ? (
                      <>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) =>
                            updateProject(index, "title", e.target.value)
                          }
                          placeholder="Project Title"
                          className="border border-black"
                        />
                        <input
                          type="text"
                          value={project.company}
                          onChange={(e) =>
                            updateProject(index, "company", e.target.value)
                          }
                          placeholder="Role"
                          className="border border-black"
                        />
                        <input
                          type="text"
                          value={project.period}
                          onChange={(e) =>
                            updateProject(index, "period", e.target.value)
                          }
                          placeholder="Project Period"
                          className="border border-black"
                        />
                        <input
                          type="text"
                          value={project.location}
                          onChange={(e) =>
                            updateProject(index, "location", e.target.value)
                          }
                          placeholder="Location"
                          className="border border-black"
                        />
                        <textarea
                          value={project.description}
                          onChange={(e) =>
                            updateProject(index, "description", e.target.value)
                          }
                          placeholder="Description"
                          className="border border-black w-64 h-52 md:w-96 rounded-md p-2 mt-2"
                        />
                        <ul>
                          <h5>Responsibilities</h5>
                          {project.responsibilities.map((responsibility, i) => (
                            <li key={i}>
                              <input
                                type="text"
                                value={responsibility}
                                onChange={(e) =>
                                  updateResponsibility(index, i, e.target.value)
                                }
                                placeholder="Responsibility"
                                className="border border-black"
                              />
                              {!isPrinting && (
                                <>
                                  <button
                                    onClick={() => addResponsibility(index)}
                                    className="mr-2 ml-1"
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
                          ))}
                        </ul>
                        {!isPrinting && (
                          <button
                            onClick={() => {
                              if (projects.length > 0) {
                                const lastProject =
                                  projects[projects.length - 1];
                                if (
                                  !lastProject.title ||
                                  !lastProject.company ||
                                  !lastProject.period ||
                                  !lastProject.location ||
                                  !lastProject.description ||
                                  lastProject.responsibilities.some(
                                    (resp) => !resp
                                  )
                                ) {
                                  alert(
                                    "Please fill out all the fields of the project."
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
                        <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-48 mb-3 mt-6">
                          <div className="flex flex-col col-span-3">
                            <h3 className="text-xl font-bold">
                              {project.title}
                            </h3>
                            <h4 className="font-semibold text-slate-800">
                              <span className="font-medium text-slate-700">
                                role
                              </span>{" "}
                              {project.company}
                            </h4>
                          </div>
                          <div className="col-span-2">
                            <p className="italic text-sm text-slate-600">
                              {project.period}
                            </p>
                            <p className="italic text-sm text-slate-600">
                              {project.location}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="mb-3">{project.description}</p>
                          <b>Responsibilities:</b>
                          <ul className="list-disc list-inside ml-3">
                            {project.responsibilities.map(
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
                      <button
                        onClick={() => removeProjects(index)}
                        className="ml-2"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {!isPrinting && editing === null && (
              <button onClick={addProjects}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default Projects;
