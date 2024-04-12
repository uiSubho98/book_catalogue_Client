import React, { useState } from "react";
import MultiStepLoader from "./ui/LoaderUI";
import { IconSquareRoundedX } from "@tabler/icons-react";

const loadingStates = [
  {
    text: "Checking Internet Cponnection",
  },
  {
    text: "Checking Email",
  },
  {
    text: "Checking Password",
  },
];

function MultiStepLoaderDemo({ loading }) {
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      {/* Core Loader Modal */}
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={loading}
        duration={2000}
      />
    </div>
  );
}

export default MultiStepLoaderDemo;
