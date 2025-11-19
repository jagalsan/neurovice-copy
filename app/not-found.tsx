'use client';
import { useEffect } from "react";

export default async function NotFound({}: { params: Promise<{ locale: string }> }) {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }, []);
  return (
    <section className="min-h-screen flex justify-center items-center w-full flex-col gap-4">
      <h1 className="w-fit font-heading text-[6rem]">404 Not found</h1>
      <p className="w-fit font-heading text-[2rem]">Redirecting to home page in 2 seconds...</p>
    </section>
  );
}
