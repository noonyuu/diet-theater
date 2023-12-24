import { useState, FormEvent } from "react";

export const Form = (props: any) => {
  const [name, setName] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="m-auto w-full text-center">
      <h2 className="label-wrapper ml-[10%] text-left">{props.title}</h2>
      <input
        type="text"
        id="new-todo-input"
        className="input__lg input w-[80%] border border-black bg-white text-black focus:border-black focus:outline-none"
        name="text"
        autoComplete="off"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={props.title + "を入力"}
        required
      />
    </div>
  );
};
