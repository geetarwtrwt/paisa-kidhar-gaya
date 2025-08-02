import React from "react";
import EmojiPicker from "emoji-picker-react";

export default function AddForm({ data }) {
  console.log(data);
  return (
    <>
      <div className="flex flex-col gap-4">
        {data.map((e, index) => {
          return (
            <div key={index} className="flex flex-col gap-4">
              <div>
                <label className="text-lg" htmlFor={e.id}>{e.label}</label>
                <input
                  type={e.input}
                  name={e.name}
                  id={e.id}
                  className="w-full rounded-md border-2 border-borderLight py-1.5 ps-2"
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
