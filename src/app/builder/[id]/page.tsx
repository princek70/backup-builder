import { prisma } from "@/lib/db";
import Sidebar from "@/components/Sidebar";
import Preview from "@/components/Preview";
import { UserProvider } from "@/context/UserContext";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ResumeBuilderPage({ params }: PageProps) {
  const { id } = await params;

  const resume = await prisma.userResume.findUnique({
    where: { id },
    include: { template: true }
  });

  if (!resume) {
    notFound();
  }

  // Parse JSON data safely
  let parsedData;
  try {
    parsedData = typeof resume.data === 'string' ? JSON.parse(resume.data) : resume.data;
  } catch (e) {
    console.error("Failed to parse resume data", e);
    parsedData = {};
  }

  return (
    <UserProvider initialData={parsedData} resumeId={id}>
      <main className="flex h-screen w-full print:block print:h-auto overflow-hidden">
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
