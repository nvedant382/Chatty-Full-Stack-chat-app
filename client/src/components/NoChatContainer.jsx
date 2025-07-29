import React from "react";
import { MessageSquare } from "lucide-react";

const NoChatContainer = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
            <MessageSquare className="size-8 text-primary" />
          </div>
        </div>

        {/* You can add a friendly message here */}
        <h2 className="font-bold text-2xl">Welcome to Chatty</h2>
        <p className="text-base-content/80 text-sm">
          Select a user to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatContainer;
