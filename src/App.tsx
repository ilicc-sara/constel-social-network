import "./App.css";

function App() {
  return (
    <section className="min-h-screen !mt-[5%]">
      <form className="w-104 h-[fit-content] !px-14 !py-9 flex flex-col bg-[#2222] !mx-auto items-center gap-5 rounded-xl !my-5">
        <label>Email</label>
        <input
          className="bg-white"
          placeholder="Enter your email here..."
          type="text"
        />

        <label>Password</label>
        <input
          className="bg-white"
          placeholder="Enter your password here..."
          type="password"
        />

        <div className="flex flex-col gap-2">
          <p className="text-[#e8f0fe]">
            Don't have an account ?{" "}
            <span className="text-[#fc4747] cursor-pointer">Sign up</span>
          </p>
          <p className="text-[#e8f0fe]">
            Or,
            <span className="text-[#fc4747] cursor-pointer">
              &nbsp; Log in as guest
            </span>
          </p>
        </div>
      </form>
    </section>
  );
}

export default App;
