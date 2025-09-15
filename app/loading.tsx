import { Loader2 } from "lucide-react";

function Loader() {
  return (
    <div className="flex justify-center items-center h-40 w-full">
      <Loader2 className="h-8 w-8 animate-spin text-accent-500" />
      <span className="ml-3 text-primary-200 text-lg">Loading...</span>
    </div>
  );
}

export default Loader;
