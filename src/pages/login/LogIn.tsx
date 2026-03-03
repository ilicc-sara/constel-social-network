import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../UI/Input";
import Button from "../../UI/Button";

const DEMO_EMAIL = "malesija.nemanja@gmail.com";
const DEMO_PASSWORD = "He5r4dOVdy9x6IT";

function LogIn() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const navigate = useNavigate();

  const isActive = useMemo(() => {
    if (inputEmail.includes("@") && inputPassword.length > 4) {
      return true;
    } else {
      return false;
    }
  }, [inputEmail, inputPassword]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

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

      if (!userResponse.ok) {
        toast.error(data.error.message);

        return;
      }

      if (data.token) {
        localStorage.setItem("jwt", data.token);
        navigate("/");
        setInputEmail("");
        setInputPassword("");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Ups, something went wrong...");
    }
  };

  return (
    <section className="!mt-[5%]">
      <ToastContainer position="bottom-left" />
      <div className="w-[fit-content] !mx-auto flex justify-center items-center gap-2">
        <img className="w-12 h-12" src="logo.jpg" />
      </div>

      <form
        onSubmit={logIn}
        className="w-104 h-[fit-content] !px-14 !py-9 flex flex-col !mx-auto items-start justify-start gap-5 rounded-xl !my-5"
      >
        <div className="flex flex-col w-full">
          Email
          <Input
            type="text"
            variation="email"
            value={inputEmail}
            handleChange={(e) => setInputEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full">
          Password
          <Input
            type="password"
            variation="password"
            value={inputPassword}
            handleChange={(e) => setInputPassword(e.target.value)}
          />
        </div>

        <Button active={isActive} variation="login" type="submit">
          Confirm
        </Button>
      </form>
    </section>
  );
}

export default LogIn;
