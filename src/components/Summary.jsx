import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCheck,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

function Summary() {
  const [isEditing, setIsEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [summary, setSummary] = useState("");

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
    <section id="summary">
      <h2>Summary</h2>
      <div>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
            <button type="submit">
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </form>
        ) : (
          <p>{summary}</p>
        )}
        {!isEditing && (
          <button onClick={() => setIsEditing(true)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}
        <button onClick={() => setIsVisible(false)}>
          <FontAwesomeIcon icon={faEyeSlash} />
        </button>
      </div>
    </section>
  ) : (
    <button onClick={() => setIsVisible(true)}>
      <FontAwesomeIcon icon={faEye} />
    </button>
  );
}

export default Summary;
