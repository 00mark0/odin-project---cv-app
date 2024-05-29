import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCheck,
  faEye,
  faEyeSlash,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { PrintContext } from "../App";

function Courses() {
  const isPrinting = useContext(PrintContext);

  const [isEditing, setIsEditing] = useState(false);
  const [courses, setCourses] = useState(
    JSON.parse(localStorage.getItem("courses")) || [
      {
        title: "Certified Web Designer",
        institution: "ITAcademy by LINKgroup",
        period: "November 2019 - July 2020",
        location: "On-site - Belgrade, Serbia",
      },
      {
        title: "Certified Front-end JavaScript Web Developer",
        institution: "ITAcademy by LINKgroup",
        period: "November 2020 - July 2021",
        location: "Remote",
      },
    ]
  );
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const handleSave = (index, title, institution, period, location) => {
    const newCourses = [...courses];
    newCourses[index] = { title, institution, period, location };
    setCourses(newCourses);
    setIsEditing(false);
  };

  const handleAdd = () => {
    setCourses([
      ...courses,
      {
        title: "New Course",
        institution: "New Institution",
        period: "New Period",
        location: "New Location",
      },
    ]);
    setIsEditing(true);
  };

  const handleRemove = (index) => {
    const newCourses = [...courses];
    newCourses.splice(index, 1);
    setCourses(newCourses);
  };

  return (
    <>
      {!isPrinting && (
        <div className="flex justify-end">
          {isVisible && (
            <button onClick={handleAdd}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
          <button onClick={() => setIsVisible(!isVisible)}>
            <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} />
          </button>
        </div>
      )}
      {isVisible && (
        <section id="courses" className="grid grid-cols-5 gap-4 h-auto py-4">
          <h2 className="font-bold text-green-700 text-2xl col-span-3 lg:col-span-1">
            Courses And Certifications
          </h2>
          <div className="border-l border-black col-span-4 px-3">
            <ul>
              {courses.map((course, index) => (
                <li key={index} className="mb-6">
                  <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-48 mb-3">
                    <div className="flex flex-col col-span-3">
                      {isEditing ? (
                        <input
                          defaultValue={course.title}
                          onChange={(e) => (course.title = e.target.value)}
                        />
                      ) : (
                        <h3 className="text-xl font-bold">{course.title}</h3>
                      )}
                      {isEditing ? (
                        <input
                          defaultValue={course.institution}
                          onChange={(e) =>
                            (course.institution = e.target.value)
                          }
                        />
                      ) : (
                        <h4 className="font-semibold text-slate-800">
                          <span className="font-medium text-slate-700">at</span>{" "}
                          {course.institution}
                        </h4>
                      )}
                    </div>
                    <div className="col-span-2">
                      {isEditing ? (
                        <input
                          defaultValue={course.period}
                          onChange={(e) => (course.period = e.target.value)}
                        />
                      ) : (
                        <p className="italic text-sm text-slate-600">
                          {course.period}
                        </p>
                      )}
                      {isEditing ? (
                        <input
                          defaultValue={course.location}
                          onChange={(e) => (course.location = e.target.value)}
                        />
                      ) : (
                        <p className="italic text-slate-600">
                          {course.location}
                        </p>
                      )}
                    </div>
                  </div>
                  {!isPrinting && (
                    <div>
                      <button
                        onClick={() =>
                          isEditing
                            ? handleSave(
                                index,
                                course.title,
                                course.institution,
                                course.period,
                                course.location
                              )
                            : setIsEditing(true)
                        }
                      >
                        {isEditing ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          <FontAwesomeIcon icon={faEdit} />
                        )}
                      </button>
                      <button onClick={() => handleRemove(index)}>
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

export default Courses;
