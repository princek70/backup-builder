import Sidebar from "@/components/Sidebar";
import Preview from "@/components/Preview";
import { UserProvider } from "@/context/UserContext";

export default function BuilderPage() {
  return (
    <UserProvider>
      <main className="flex h-screen w-full print:block print:h-auto">
        {/* Sidebar Pane */}
        <div className="w-[40%] h-full bg-surface-container-low overflow-y-auto border-r border-surface-dim print:hidden">
          <Sidebar />
        </div>

        {/* Preview Pane */}
        <div className="flex-1 h-full bg-surface-container overflow-y-auto p-12 flex justify-center print:p-0 print:bg-white">
          <Preview />
        </div>
      </main>
    </UserProvider>
  );
}
