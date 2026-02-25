import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const DEMO_EMAIL = "malesija.nemanja@gmail.com";
const DEMO_PASSWORD = "He5r4dOVdy9x6IT";

function LogIn() {
  const [isActive, setIsActive] = useState(false);

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (inputEmail.includes("@") && inputPassword.length > 8) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isActive, inputEmail, inputPassword]);

  const logIn = async (e: any) => {
    e.preventDefault();
    try {
      const userResponse = await fetch(
        "https://api.hr.constel.co/api/v1/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: inputEmail,
            password: inputPassword,
          }),
        },
      );
      const data = await userResponse.json();
      localStorage.setItem("token", data.token); // Store token

      navigate("/");
      setInputEmail("");
      setInputPassword("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="min-h-screen !mt-[5%]">
      <div className="w-[fit-content] !mx-auto flex justify-center items-center gap-2">
        <img className="w-12 h-12" src="logo.jpg" />
      </div>

      <form
        onSubmit={logIn}
        className="w-104 h-[fit-content] !px-14 !py-9 flex flex-col !mx-auto items-start justify-start gap-5 rounded-xl !my-5"
      >
        <div className="flex flex-col w-full">
          Email
          <input
            className="bg-white w-full !p-1 !pl-2  border-2 border-solid border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter your email here..."
            type="text"
            onChange={(e) => setInputEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full">
          Password
          <input
            className="bg-white w-full !p-1 !pl-2  border-2 border-solid border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter your password here..."
            type="password"
            onChange={(e) => setInputPassword(e.target.value)}
          />
        </div>

        <button
          onClick={(e) => logIn(e)}
          className={`w-full py-2 text-gray-100 transition duration-300 rounded cursor-pointer ${isActive ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 hover:bg-gray-400"}`}
        >
          Confirm
        </button>
      </form>
    </section>
  );
}

export default LogIn;
