import React from "react";

interface BtnName {
  name: string[];
  color: string[];
}

export const BubbleLeft = (props:any) => {
  return (
    <div className="flex pb-5">
      <div className="chat chat-end w-full">
        <div className="bg-chat chat-bubble max-w-[70vw] tracking-wide text-black shadow-lg">
          {props.content}
        </div>
      </div>
    </div>
  );
};
