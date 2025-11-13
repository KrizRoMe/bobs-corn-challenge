import { Separator } from "@/components/ui/separator";

export function Policy() {
  return (
    <section className="text-center space-y-4">
      <Separator />

      <div className="space-y-2">
        <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
          Política de compra
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Puedes comprar máximo 1 corn por minuto. Cada compra es validada en
          tiempo real.
        </p>
      </div>

      <Separator />
    </section>
  );
}
