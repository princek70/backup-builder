-- CreateTable
CREATE TABLE "LandingContent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "heroTagline" TEXT NOT NULL DEFAULT 'Agentic Intelligence Redefined',
    "heroTitle" TEXT NOT NULL DEFAULT 'Build Your AI-Powered Resume',
    "heroSubtitle" TEXT NOT NULL DEFAULT 'A career-changing resume, powered by agentic AI. Architect your future with intelligent bullet points, real-time tone analysis, and professional editorial precision.',
    "heroCta" TEXT NOT NULL DEFAULT 'Get Started',
    "heroCtaSecondary" TEXT NOT NULL DEFAULT 'View Templates',
    "heroImageUrl" TEXT NOT NULL DEFAULT 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfzfgGZUvRl-pJLYcR-Tj7IeO3wk1k2LkxN3FVPNa-tVRtV1XQBYl--V4mstB_aWSXflBFBmeFFWyuHefGjX0ZtrzSTko7WlECsOKSAaYAU543KBVSBqcwAqHjhxkM5NSduSOCkHwKmzf5T9JTjPT_sIk90o0wQ7avbGx1cZogVIXWJnPlPUnt8YV6pA-Yhx00JBpYaTQ60_sQtyYSsn6QPNmPOoiLzPGVSXVl8E8nsxFLCnPTXm6kyATawlETMADEyRVqSFph_9c',
    "feature1Title" TEXT NOT NULL DEFAULT 'AI-Powered Bullet Points',
    "feature1Desc" TEXT NOT NULL DEFAULT 'Transform basic descriptions into high-impact, achievement-oriented statements using our agentic brain.',
    "feature1Icon" TEXT NOT NULL DEFAULT 'smart_toy',
    "feature2Title" TEXT NOT NULL DEFAULT 'Real-Time Live Preview',
    "feature2Desc" TEXT NOT NULL DEFAULT 'Watch your professional identity take shape instantly as you edit. No context switching, just pure focus.',
    "feature2Icon" TEXT NOT NULL DEFAULT 'visibility',
    "feature3Title" TEXT NOT NULL DEFAULT 'Professional PDF Export',
    "feature3Desc" TEXT NOT NULL DEFAULT 'Generate ATS-friendly, high-fidelity PDF documents that look perfect in every recruiter''s inbox.',
    "feature3Icon" TEXT NOT NULL DEFAULT 'ios_share',
    "editorialTagline" TEXT NOT NULL DEFAULT 'Agentic Thought Process',
    "editorialTitle" TEXT NOT NULL DEFAULT 'The intelligence of an editor, the speed of AI.',
    "editorialPoint1Title" TEXT NOT NULL DEFAULT 'Contextual Awareness',
    "editorialPoint1Desc" TEXT NOT NULL DEFAULT 'AI that understands the nuances of your specific industry and target role.',
    "editorialPoint2Title" TEXT NOT NULL DEFAULT 'Precision Delivery',
    "editorialPoint2Desc" TEXT NOT NULL DEFAULT 'Every sentence is optimized for readability and keyword density.',
    "editorialImageUrl" TEXT NOT NULL DEFAULT 'https://lh3.googleusercontent.com/aida-public/AB6AXuCml2pKOwrVMOQK-0UV2ooXa5S2UF0wb-L4hhCStl50wGxHoRh1AslCCs8KqPRk9umOzjPU2T7ApsTO-eb7KUm7NdswEjG6_0uFeK583lKCplK1Nd3lM1ELQqpTrwLaYUmnB_kJ0QbbRxOIuhQN8Gisz5K8wEjOrj_xjR8djiYCLl3XxkvPziAiSLmmEFzWDelKnnmkxTB1TjjYVfG5ddo1sB_Zj_agTHrb8BHbjAgQh4-jB4vFqqpvQDXdzx5qqiOr5uGMhd6j3qo',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
