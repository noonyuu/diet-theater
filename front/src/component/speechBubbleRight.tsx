import React from "react";

interface BtnName {
  name: string[];
  color: string[];
}

export const BubbleRight = (props: any) => {
  return (
    <div className="flex pb-5">
      <div className="chat chat-start w-full">
        <div className="bg-sub_blue chat-bubble max-w-[80vw] tracking-wide shadow-xl text-black">
          {props.content}
        </div>
      </div>
    </div>
  );
};
