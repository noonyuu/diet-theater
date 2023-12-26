import { useState, FormEvent } from "react";

export const Form = (props: any) => {
  const [name, setName] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <input
      type="text"
      id={props.label}
      className="input w-[70%] border border-black bg-white text-black focus:border-black focus:outline-none"
      name="text"
      autoComplete="off"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder={props.title + "を入力"}
      required
    />
  );
};
