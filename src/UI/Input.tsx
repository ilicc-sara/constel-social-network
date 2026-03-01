type InputProps = {
  type: string;
  variation: string;
  value: string;
  handleChange: (e: any) => void;
};

function Input({ type, variation, value, handleChange }: InputProps) {
  let baseClassName;
  let placeholder;

  if (variation === "post") {
    baseClassName =
      "border-b border-gray-300 w-full focus:outline-none focus:border-blue-500";
    placeholder = "What's happening";
  }

  return (
    <input
      type={type}
      className={baseClassName}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}

export default Input;
