import { PrintContext } from "../App";
import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faCheck,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

function Skills() {
  const isPrinting = useContext(PrintContext);
  const [isVisible, setIsVisible] = useState(
    JSON.parse(localStorage.getItem("skillsIsVisible")) || true
  );
  const [skills, setSkills] = useState(
    JSON.parse(localStorage.getItem("skills")) || ["", ""]
  );
  const [newSkill, setNewSkill] = useState(["", ""]);
  const [showInput, setShowInput] = useState([false, false]);

  useEffect(() => {
    localStorage.setItem("skillsIsVisible", JSON.stringify(isVisible));
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [isVisible, skills]);

  const handleAddSkill = (index) => {
    if (newSkill[index].trim() !== "") {
      const newSkills = [...skills];
      newSkills[index].push(newSkill[index]);
      setSkills(newSkills);
    }
    setNewSkill(["", ""]);
    setShowInput([false, false]);
  };

  const handleRemoveSkill = (listIndex, skillIndex) => {
    const newSkills = [...skills];
    newSkills[listIndex].splice(skillIndex, 1);
    setSkills(newSkills);
  };

  const handleNewSkillChange = (e, index) => {
    const newSkills = [...newSkill];
    newSkills[index] = e.target.value;
    setNewSkill(newSkills);
  };

  return isVisible ? (
    <section id="skills" className="grid grid-cols-5 gap-4 h-auto py-4">
      <h2 className="font-bold text-green-700 text-2xl col-span-3 lg:col-span-1">
        Skills
      </h2>
      <div className="flex flex-col gap-20 md:flex-row md:gap-96 border-l border-black col-span-4 px-3">
        {skills.map((list, listIndex) => (
          <ul key={listIndex}>
            {list.map((skill, skillIndex) => (
              <li className="flex" key={skillIndex}>
                {skill}
                {!isPrinting && (
                  <button
                    onClick={() => handleRemoveSkill(listIndex, skillIndex)}
                    className="ml-2"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                )}
              </li>
            ))}
            {!isPrinting && showInput[listIndex] && (
              <>
                <input
                  type="text"
                  value={newSkill[listIndex]}
                  onChange={(e) => handleNewSkillChange(e, listIndex)}
                  className="border border-black w-28 rounded-md"
                />

                <button onClick={() => handleAddSkill(listIndex)}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </>
            )}
            {!isPrinting && !showInput[listIndex] && (
              <button
                onClick={() => setShowInput([listIndex === 0, listIndex === 1])}
                className="mr-2 mt-3"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            )}
            {!isPrinting && (
              <button onClick={() => setIsVisible(false)} className="mt-3">
                <FontAwesomeIcon icon={faEyeSlash} />
              </button>
            )}
          </ul>
        ))}
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

export default Skills;
