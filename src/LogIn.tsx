import { Link } from "react-router-dom";

function LogIn() {
  return (
    <section className="min-h-screen !mt-[5%]">
      <div className="w-[fit-content] !mx-auto flex justify-center items-center gap-2">
        <img className="w-12 h-12" src="logo.jpg" />
      </div>

      <form className="w-104 h-[fit-content] !px-14 !py-9 flex flex-col bg-[#2222] !mx-auto items-start justify-start gap-5 rounded-xl !my-5">
        <div className="flex flex-col w-full">
          Email
          <input
            className="bg-white w-full !pl-2"
            placeholder="Enter your email here..."
            type="text"
          />
        </div>

        <div className="flex flex-col w-full">
          Password
          <input
            className="bg-white w-full !pl-2  "
            placeholder="Enter your password here..."
            type="password"
          />
        </div>

        <Link className="w-full" to="/home">
          <button className="w-full bg-white py-2">Confirm</button>
        </Link>
      </form>
    </section>
  );
}

export default LogIn;
