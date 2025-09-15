import Image from "next/image";
import bg_img from "@/public/bg.png";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className=" mt-24">
        {/* Background image */}
        <Image
          src={bg_img}
          fill
          quality={80}
          placeholder="blur"
          className="object-cover object-top -z-10"
          alt="Mountains and forests with two cabins"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1 className="sm:text-8xl text-primary-50 mb-10 tracking-tight font-normal text-6xl">
            Welcome to paradise.
          </h1>
          <Link
            href="/cabins"
            className="bg-accent-500 px-8 py-6 text-primary-800 text-xl font-semibold hover:bg-accent-600 transition-all"
          >
            Explore luxury cabins
          </Link>
        </div>
      </main>
    </>
  );
}
