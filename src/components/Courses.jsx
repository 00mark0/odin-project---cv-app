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
        title: "",
        institution: "",
        period: "",
        location: "",
      },
    ]
  );
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const handleSave = (index, title, institution, period, location) => {
    if (!title || !institution || !period || !location) {
      alert("Please fill out all fields of the course.");
      return;
    }

    const newCourses = [...courses];
    newCourses[index] = { title, institution, period, location };
    setCourses(newCourses);
    setIsEditing(false);
  };

  const handleAdd = () => {
    setCourses([
      ...courses,
      {
        title: "",
        institution: "",
        period: "",
        location: "",
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
            <button onClick={handleAdd} className="mr-2">
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
                          className="border border-black"
                          placeholder="Course Title"
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
                          className="border border-black"
                          placeholder="Institution"
                        />
                      ) : (
                        <h4 className="font-semibold text-slate-800">
                          <span className="italic font-medium text-slate-700">
                            at
                          </span>{" "}
                          {course.institution}
                        </h4>
                      )}
                    </div>
                    <div className="col-span-2">
                      {isEditing ? (
                        <input
                          defaultValue={course.period}
                          onChange={(e) => (course.period = e.target.value)}
                          className="border border-black"
                          placeholder="Period"
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
                          className="border border-black"
                          placeholder="Location"
                        />
                      ) : (
                        <p className="italic text-sm text-slate-600">
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
                        className="mr-2"
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
