import { Button, Card } from "@heroui/react";
import { useEffect, useState } from "react";
import {io} from "socket.io-client";

const server = io("https://probable-yodel-q79prxjx5474f9j74-8000.app.github.dev/");

function Ui() {
  const [emoji, setEmoji] = useState("😎");

  useEffect(() => {
    server.on("new_emoji", (data) => {
      setEmoji(data);
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-5">
      <h1 className="text-gray-600 uppercase text-sm">MADE App</h1>
      <EmojiPreview emoji={emoji} />
      <EmojiSelect onClick={setEmoji} />
    </div>
  );
}

function EmojiPreview({ emoji }) {
  return <Card className="text-7xl p-4">{emoji}</Card>;
}

function EmojiSelect({ onClick }) {
  const emojiOptions = "😈,🙈,🐭,🐶,🙉,😉".split(",");

  return (
    <div className="flex gap-1 flex-wrap justify-center">
      {emojiOptions.map((emoji) => (
        <Button
          className="text-2xl"
          variant="faded"
          onPress={() => {onClick(emoji);
            server.emit("message", emoji)   
          }}
          key={emoji}
        >
          {emoji}
        </Button>
      ))}
    </div>
  );
}

export default Ui;