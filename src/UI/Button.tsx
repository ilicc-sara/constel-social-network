type ButtonProps = {
  active: boolean;
  variation: string;
  type: "submit" | "reset" | "button";
  children: string;
};

function Button({ active, variation, type, children }: ButtonProps) {
  let baseClassName;

  if (variation === "login") {
    baseClassName = `w-full py-2 text-gray-100 transition duration-300 rounded cursor-pointer 
            ${active ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 hover:bg-gray-400"}`;
  }
  if (variation === "post") {
    baseClassName = `!py-2 !px-4 text-gray-100 transition duration-300 rounded cursor-pointer 
            ${active ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 hover:bg-gray-400"}`;
  }
  return (
    <button type={type} className={baseClassName} disabled={!active}>
      {children}
    </button>
  );
}

export default Button;
