import { useMemo, useState } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';
import { useLanguage } from '../translations/LanguageContext';

const WIDTH = 1000;
const HEIGHT = 500;

const ORIGIN = new Set(['792']);
const DEST = new Set(['840', '414', '682', '422', '887', '608']);
const HOME = new Set(['818']);
const LABEL_KEYS = {
  '792': 'mapLabels.turkey',
  '840': 'mapLabels.usa',
  '414': 'mapLabels.kuwait',
  '682': 'mapLabels.saudi',
  '422': 'mapLabels.lebanon',
  '887': 'mapLabels.yemen',
  '608': 'mapLabels.philippines',
  '818': 'mapLabels.egypt',
};

export default function WorldMap() {
  const [hoverId, setHoverId] = useState(null);
  const { t } = useLanguage();

  const { landPaths, highlightPaths } = useMemo(() => {
    const countries = feature(
      worldData,
      worldData.objects.countries
    ).features;

    const projection = geoNaturalEarth1()
      .center([38, 18])
      .scale(215)
      .translate([WIDTH / 2 + 45, HEIGHT / 2 + 20]);

    const pathGen = geoPath(projection);

    const land = [];
    const highlight = [];

    let unnamedIdx = 0;
    for (const c of countries) {
      const id = c.id !== undefined ? String(c.id) : `__u_${unnamedIdx++}`;
      const d = pathGen(c);
      if (!d) continue;
      const isOrigin = ORIGIN.has(id);
      const isDest = DEST.has(id);
      const isHome = HOME.has(id);
      if (isOrigin || isDest || isHome) {
        const [[x0, y0], [x1, y1]] = pathGen.bounds(c);
        highlight.push({
          id,
          d,
          kind: isOrigin ? 'origin' : isHome ? 'home' : 'dest',
          labelKey: LABEL_KEYS[id],
          fallback: c.properties?.name || id,
          cx: (x0 + x1) / 2,
          cy: y0 - 8,
        });
      } else {
        land.push({ id, d });
      }
    }

    return { landPaths: land, highlightPaths: highlight };
  }, []);

  const nameOf = (c) => (c.labelKey ? t(c.labelKey) : c.fallback);

  const hovered = highlightPaths.find((c) => c.id === hoverId);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="shipping-map-svg"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={t('mapLabels.aria')}
    >
      <rect width={WIDTH} height={HEIGHT} fill="#0b0b0e" />

      <g className="world-map-land">
        {landPaths.map((c) => (
          <path key={c.id} d={c.d} className="world-map-country" />
        ))}
      </g>

      <g className="world-map-highlight">
        {highlightPaths.map((c) => (
          <path
            key={c.id}
            d={c.d}
            className={`world-map-country world-map-country--${c.kind}${hoverId === c.id ? ' is-hovered' : ''}`}
            onMouseEnter={() => setHoverId(c.id)}
            onMouseLeave={() => setHoverId(null)}
          >
            <title>{nameOf(c)}</title>
          </path>
        ))}
      </g>

      {hovered && (
        <text
          x={hovered.cx}
          y={hovered.cy}
          textAnchor="middle"
          className="world-map-tooltip-text"
          pointerEvents="none"
        >
          {nameOf(hovered)}
        </text>
      )}
    </svg>
  );
}
