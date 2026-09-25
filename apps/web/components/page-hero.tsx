type PageHeroProps = Readonly<{
  eyebrow: string;
  title: string;
  description: string;
}>;

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--dso-ink)] pb-24 pt-44 text-white sm:pb-32">
      <div className="starburst absolute inset-0" aria-hidden="true" />
      <div className="container-shell relative max-w-5xl">
        <span className="eyebrow eyebrow-light">{eyebrow}</span>
        <h1 className="display-heading mt-7 max-w-4xl text-4xl font-extrabold leading-[1.04] sm:text-6xl">{title}</h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">{description}</p>
      </div>
    </section>
  );
}
