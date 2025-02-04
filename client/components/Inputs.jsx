import { Input } from "@heroui/react";
import React from "react";

function Inputs() {
  return (
    <div className="absolute bottom-0 left-0 w-full sm:mb-5">
      <Input type="text" label="Enter your message" />
    </div>
  );
}

export default Inputs;