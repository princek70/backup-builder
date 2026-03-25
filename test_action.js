const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testAction() {
  const templateId = 1;
  console.log(`Testing with Template ID: ${templateId}`);
  
  const template = await prisma.template.findUnique({
    where: { id: templateId },
  });
  
  if (!template) {
    console.error("Template not found");
    return;
  }
  
  console.log("Template found, creating UserResume...");
  
  try {
    const newResume = await prisma.userResume.create({
      data: {
        name: `My ${template.name}`,
        data: template.data,
        styles: template.styles,
        layout: template.layout,
        templateId: template.id,
      },
    });
    console.log(`Success! New Resume ID: ${newResume.id}`);
  } catch (err) {
    console.error("Failed to create UserResume:", err);
  }
}

testAction().finally(() => prisma.$disconnect());
