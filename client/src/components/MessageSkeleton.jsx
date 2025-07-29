import React from "react";

const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {skeletonMessages.map((_, idx) => {
        const isSender = idx % 2 === 0;

        return (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              isSender ? "justify-end" : ""
            }`}
          >
            {!isSender && (
              <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
            )}

            <div className="space-y-2 max-w-xs">
              <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
              <div className="h-16 w-48 bg-gray-300 rounded-lg animate-pulse" />
            </div>

            {isSender && (
              <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;
