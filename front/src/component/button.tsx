export const Button = (props:any) => {
  return (
    <div className="item-center flex">
      <button
        className={`${props.color} ${props.decoration} px-6 py-2 my-auto ${props.font}`}
        onClick={props.action}
      >
        {props.name}
      </button>
    </div>
  );
};
