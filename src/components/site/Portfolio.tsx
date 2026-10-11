import { useEffect, useState } from "react";
import { X, MapPin } from "lucide-react";
import { projects } from "@/config/business";

export function Portfolio() {
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    if (active === null) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [active]);
  const p = active !== null ? projects[active] : null;

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {projects.map((pr, i) => (
          <button key={i} onClick={() => setActive(i)} className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl border text-left">
            <img src={pr.image} alt={pr.title} loading="lazy" className={`w-full object-cover transition duration-700 group-hover:scale-105 ${pr.tall ? "aspect-[4/5]" : "aspect-[4/3]"}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            {pr.demo && <span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">Image de démonstration</span>}
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">{pr.category}</p>
              <h3 className="mt-1 text-lg font-semibold">{pr.title}</h3>
            </div>
          </button>
        ))}
      </div>
      {p && (
        <div role="dialog" aria-modal="true" aria-label={p.title} className="fixed inset-0 z-[60] grid place-items-center bg-background/90 p-4 backdrop-blur-md" onClick={() => setActive(null)}>
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border bg-surface" onClick={(e) => e.stopPropagation()}>
            <button autoFocus onClick={() => setActive(null)} aria-label="Fermer" className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-background/80"><X className="h-5 w-5" /></button>
            <img src={p.image} alt={p.title} className="max-h-[65vh] w-full object-cover" />
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">{p.category}</p>
              <h3 className="mt-1 text-2xl font-semibold">{p.title}</h3>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{p.location}</p>
              <p className="mt-3 text-muted-foreground">{p.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
