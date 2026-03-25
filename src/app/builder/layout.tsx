'use client';

import { UserProvider } from "@/context/UserContext";

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}
