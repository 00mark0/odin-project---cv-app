import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeSquare,
  faPhoneSquare,
  faEdit,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { PrintContext } from "../App";

function Info() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const isPrinting = useContext(PrintContext);

  useEffect(() => {
    const savedName = localStorage.getItem("name");
    const savedJob = localStorage.getItem("job");
    const savedEmail = localStorage.getItem("email");
    const savedPhone = localStorage.getItem("phone");

    if (savedName) setName(savedName);
    if (savedJob) setJob(savedJob);
    if (savedEmail) setEmail(savedEmail);
    if (savedPhone) setPhone(savedPhone);
  }, []);

  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("job", job);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
  }, [name, job, email, phone]);

  const formatPhone = (phone) => {
    let cleaned = ("" + phone).replace(/\D/g, "");
    let match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{4})$/);
    if (match) {
      return "+" + match[1] + " " + match[2] + " " + match[3] + " " + match[4];
    }
    return phone;
  };

  const handleSubmit = () => {
    setIsEditing(false);
  };

  return (
    <section id="info" className="text-start border-b border-black mt-5 pb-10">
      <div className="flex flex-col mb-5">
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onClick={(e) => e.preventDefault()}
            className="text-4xl border border-black w-64 md:w-96 rounded-md"
          />
        ) : (
          <h1 className="text-4xl">{name}</h1>
        )}
        {isEditing ? (
          <input
            type="text"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            onClick={(e) => e.preventDefault()}
            className="text-2xl border border-black w-64 md:w-96 text-green-700 font-bold rounded-md "
          />
        ) : (
          <h2 className="font-bold text-green-700 text-2xl">{job}</h2>
        )}
      </div>

      <ul className="flex flex-col gap-7 md:flex-row md:gap-14">
        <li>
          <a
            href={isEditing ? "" : `mailto:${email}`}
            className="flex items-center"
          >
            {isPrinting ? (
              <span role="img" aria-label="Envelope emoji">
                📧
              </span>
            ) : (
              <FontAwesomeIcon
                icon={faEnvelopeSquare}
                className="text-green-700"
              />
            )}
            {isEditing ? (
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onClick={(e) => e.preventDefault()}
                className="border border-black rounded-md ml-1"
              />
            ) : (
              <span className="ml-1">{email}</span>
            )}
          </a>
        </li>
        <li>
          <a
            href={isEditing ? "" : `tel:${phone}`}
            className="flex items-center"
          >
            {isPrinting ? (
              <span role="img" aria-label="Phone emoji">
                📞
              </span>
            ) : (
              <FontAwesomeIcon
                icon={faPhoneSquare}
                className="text-green-700"
              />
            )}
            {isEditing ? (
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                onClick={(e) => e.preventDefault()}
                className="border border-black rounded-md ml-1"
              />
            ) : (
              <span className="ml-1">{formatPhone(phone)}</span>
            )}
          </a>
        </li>
      </ul>
      {isEditing ? (
        <button onClick={handleSubmit} className="mt-3">
          <FontAwesomeIcon icon={faCheck} />
        </button>
      ) : (
        !isPrinting && (
          <button onClick={() => setIsEditing(true)} className="mt-3">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )
      )}
    </section>
  );
}

export default Info;
