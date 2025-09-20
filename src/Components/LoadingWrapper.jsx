import React from "react";
import { Loader2 } from "lucide-react";

const LoaderWrapper = ({ loading = false, children }) => {
  if (loading) {
    return (
        <div className="flex justify-center items-center h-[600px]">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }
  return <>{children}</>;
};

export default LoaderWrapper;