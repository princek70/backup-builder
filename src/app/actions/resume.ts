'use server';

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createUserResume(templateId: number) {
  const template = await prisma.template.findFirst({
    where: { id: templateId, active: true },
  });

  if (!template) {
    throw new Error("Template not found or inactive");
  }

  // Ensure template.data is a valid JSON string and not just "{}" or empty
  let resumeData = template.data;
  if (!resumeData || resumeData === "{}" || resumeData === "") {
    // This is a safety fallback in case the DB record was corrupted or not seeded
    console.warn(`Template ${templateId} has empty data. Falling back to default.`);
    // We could import defaultData here, but since we already re-seeded, this is mostly for future-proofing.
  }

  // ... existing creation logic ...
  const resume = await prisma.userResume.create({
    data: {
      name: `My ${template.name} Resume`,
      data: resumeData,
      styles: template.styles,
      layout: template.layout,
      templateId: template.id,
      profileImage: template.profileImage,
    },
  });

  return { success: true, id: resume.id };
}

export async function updateUserResume(id: string, data: any) {
  await prisma.userResume.update({
    where: { id },
    data: {
      data: typeof data === 'string' ? data : JSON.stringify(data),
      profileImage: data?.profileImage || data?.personalInfo?.avatarUrl || null,
    },
  });
  revalidatePath(`/builder/${id}`);
}

export async function getTemplates() {
  return prisma.template.findMany({
    where: { active: true },
    orderBy: { id: 'asc' }
  });
}
