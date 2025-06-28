import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20 flex justify-center items-center min-h-screen">
        <p className="text-lg">Welcome to the homepage</p>
      </main>
    </>
  );
}
