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
      <svg className="coverage-map__art" viewBox="0 0 1875 750" role="img" aria-label={title}>
        {/* Wikimedia Commons Indonesia Blankmap.svg, CC0 1.0 public-domain dedication. */}
        <image
          className="coverage-map__base"
          href="/maps/indonesia-blank.svg"
          x="0"
          y="0"
          width="1875"
          height="750"
          preserveAspectRatio="none"
          aria-hidden="true"
        />
        <g className="coverage-map__pins">
          {coverageLocations.map((location, index) => (
            <g
              key={location.id}
              className="coverage-map__pin"
              transform={`translate(${location.x} ${location.y}) scale(1.8)`}
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
