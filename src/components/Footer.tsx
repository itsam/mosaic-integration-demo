// import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="flex h-12 w-full items-center justify-between border-t bg-gray-50 px-4 text-sm dark:bg-neutral-800">
      <span>© {new Date().getFullYear()} INFALIA PC</span>
      <div className="flex gap-4">Demonstrating MOSAIC integration</div>
    </footer>
  );
}
