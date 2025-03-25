export default function Footer() {
  return (
    <footer className="bg-zinc-100 dark:bg-zinc-800/50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              &copy; {new Date().getFullYear()} Eaglesong Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 