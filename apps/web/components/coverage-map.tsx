import type { Locale } from "@/i18n/routing";
import { coverageLocations, localize } from "@/lib/site-content";

type CoverageMapProps = Readonly<{
  locale: Locale;
  compact?: boolean;
}>;

export function CoverageMap({ locale, compact = false }: CoverageMapProps) {
  const title = locale === "id" ? "Peta jangkauan layanan DSO di Indonesia" : "DSO service coverage map in Indonesia";

  return (
    <div className={compact ? "coverage-map coverage-map--compact" : "coverage-map"}>
      <svg className="coverage-map__art" viewBox="0 0 1000 440" role="img" aria-label={title}>
        <g className="coverage-map__islands" aria-hidden="true">
          <path d="M145 115 198 128 239 160 268 190 280 223 264 249 281 274 267 302 244 324 214 326 190 309 171 283 151 256 132 221 118 187 125 152Z" />
          <path d="m329 343 39-8 36 7 38-3 43 10 40 4-12 15-49 5-52-6-46 1-36-9Z" />
          <path d="m439 130 34-24 58-8 57 16 45 40-8 49-34 39-15 50-43 25-43-20-21-40-42-34-15-47Z" />
          <path d="m666 200 30-24 21 13 18-29 17 14-8 35 22 16-27 20-18 44-20 16-16-29-27-8-20-32 17-23Z" />
          <path d="m801 214 56-15 63 10 41 24-24 30-63 2-42 18-38-18Z" />
          <path d="m565 362 17-7 13 5-7 9-17 2Z" />
          <path d="m604 367 21-6 15 6-8 8-24 1Z" />
          <path d="m649 374 21-5 18 7-12 7-22-2Z" />
          <path d="m706 323 22-13 19 11-7 13-22-3Z" />
          <path d="m744 342 17-7 17 6-9 10-18 1Z" />
        </g>
        <g className="coverage-map__pins">
          {coverageLocations.map((location, index) => (
            <g
              key={location.id}
              className="coverage-map__pin"
              transform={`translate(${location.x} ${location.y})`}
              style={{ "--pin-delay": `${index * 110}ms` } as React.CSSProperties}
            >
              <title>{localize(location, locale)}</title>
              <circle className="coverage-map__pulse" r="15" />
              <path d="M0-10c-5.5 0-10 4.5-10 10 0 7.2 10 18 10 18S10 7.2 10 0C10-5.5 5.5-10 0-10Z" />
              <circle className="coverage-map__pin-core" cy="-1" r="3" />
            </g>
          ))}
        </g>
      </svg>
      <ol className="coverage-map__legend" aria-label={locale === "id" ? "Area layanan" : "Service areas"}>
        {coverageLocations.map((location, index) => (
          <li key={location.id}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            {localize(location, locale)}
          </li>
        ))}
      </ol>
    </div>
  );
}
