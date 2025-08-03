import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaImage } from "react-icons/fa";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EmojiPicker from "emoji-picker-react";

export default function AddForm({
  data,
  open,
  handleClose,
  input,
  setInput,
  handleSubmit,
}) {
  let [emojiOpen, setEmojiOpen] = useState(false);
  let [selectedEmoji, setSelectedEmoji] = useState("");
  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-1/2 left-1/2 bg-bgColor -translate-y-1/2 -translate-x-1/2 w-[400px] min-h-min rounded-md shadow-xl px-6 py-10">
            <IoClose
              onClick={handleClose}
              className="absolute right-4 bg-primary text-2xl rounded-full text-white p-1 cursor-pointer"
            />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography
              id="modal-modal-description"
              component="div"
              sx={{ mt: 2 }}
            >
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                  {data.map((e, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-1">
                        {e.name === "icon" ? (
                          <>
                            <label htmlFor={e.id}>{e.label}</label>

                            <button
                              type="button"
                              onClick={() => {
                                setEmojiOpen(!emojiOpen);
                              }}
                              className="text-5xl w-20 h-20 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition-all"
                            >
                              {selectedEmoji || <FaImage />}
                            </button>
                            {emojiOpen && (
                              <div className="w-full fixed top-[20%] left-[50%] z-[1000]">
                                <div className="relative w-full">
                                  <IoClose
                                    onClick={() => setEmojiOpen(false)}
                                    className="absolute right-[55px] top-1 z-[2000] bg-primary text-2xl rounded-full text-white p-1 cursor-pointer"
                                  />
                                  <div className="absolute top-0 z-50">
                                    <EmojiPicker
                                      height={350}
                                      onEmojiClick={(emoji) => {
                                        setInput((prev) => ({
                                          ...prev,
                                          [e.name]:
                                            (prev[e.name] || "") + emoji.emoji,
                                        }));
                                        setSelectedEmoji(emoji.emoji);
                                        setEmojiOpen(false);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <label htmlFor={e.id}>{e.label}</label>
                            <input
                              type={e.input}
                              name={e.name}
                              id={e.id}
                              value={input[e.name]}
                              onChange={(inputValue) => {
                                setInput((prev) => ({
                                  ...prev,
                                  [inputValue.target.name]:
                                    inputValue.target.value,
                                }));
                              }}
                              className="w-full rounded-md border-2 border-borderLight py-1.5 ps-2"
                            />
                          </>
                        )}
                      </div>
                    );
                  })}
                  <div>
                    <button className="bg-primary text-white w-full rounded-md py-1.5 hover:bg-secondary font-semibold">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
}
