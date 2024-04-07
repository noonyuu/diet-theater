export const Button = (props:any) => {
  return (
    <div className="item-center flex">
      <button
        className={`${props.color} ${props.decoration} mx-4 px-6 py-2.5 ${props.font}`}
        onClick={props.action}
      >
        {props.name}
      </button>
    </div>
  );
};
