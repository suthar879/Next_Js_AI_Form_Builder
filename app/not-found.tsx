import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center ">
      <h2 className="font-bold text-4xl">Not Found 😥</h2>
      <br />
      <p className="text-2xl">Could not find requested resource</p>
      <br />
      <Link
        className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-2xl px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        href="/"
      >
        Return Home
      </Link>
    </div>
  );
}
