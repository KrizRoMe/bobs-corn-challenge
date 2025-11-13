import { Leaf } from "lucide-react";

export function Header() {
  return (
    <header className="text-center space-y-3">
      <div className="flex justify-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
          <Leaf className="w-6 h-6 text-primary" />
        </div>
      </div>
      <h1 className="text-3xl sm:text-4xl font-light tracking-tight">
        Bob&apos;s Corn
      </h1>
      <p className="text-sm text-muted-foreground">
        Compra corn fresco • Un grano por minuto
      </p>
    </header>
  );
}
