import { prisma } from "@/lib/db";
import { UserProvider } from "@/context/UserContext";
import { notFound } from "next/navigation";
import BuilderShell from "@/components/BuilderShell";

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
      <BuilderShell />
    </UserProvider>
  );
}
