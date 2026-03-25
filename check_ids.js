const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const resumes = await prisma.userResume.findMany({ take: 5 });
  console.log(JSON.stringify(resumes.map(r => r.id), null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
