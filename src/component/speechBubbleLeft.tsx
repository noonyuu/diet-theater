import React from "react";

interface BtnName {
  name: string[];
  color: string[];
}

export const BubbleLeft = (props:any) => {
  return (
    <div className="flex pb-8">
      <div className="chat chat-end">
        <div className="chat-bubble tracking-wide">
          この際、上川外務大臣、辻外務副大臣、高村外務大臣政務官、穂坂外務大臣政務官及び深澤外務大臣政務官から、それぞれ発言を求められておりますので、順次これを許します。外務大臣上川陽子君。
        </div>
      </div>
    </div>
  );
};
