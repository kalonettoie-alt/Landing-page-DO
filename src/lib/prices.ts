import { useEffect, useState } from 'react';

export interface PriceItem {
  label: string;
  prix: string;
}

export interface Prices {
  note: string;
  menage: PriceItem[];
  blanchisserie: {
    intro: string;
    formules: { titre: string; sousTitre: string; items: PriceItem[] }[];
    serviettes: { titre: string; sousTitre: string; items: PriceItem[] };
  };
  consommables: PriceItem[];
  operateurs: { remuneration: string; detail: string };
}

/** Charge /prices.json au runtime (source unique, éditable sans rebuild). */
export function usePrices(): Prices | null {
  const [data, setData] = useState<Prices | null>(null);
  useEffect(() => {
    let alive = true;
    fetch('/prices.json')
      .then((r) => r.json())
      .then((d: Prices) => {
        if (alive) setData(d);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return data;
}
