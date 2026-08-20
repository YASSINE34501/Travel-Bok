import type { Locale } from "@/i18n/routing";

/**
 * Real city photography for the country guides, sourced from Wikimedia Commons
 * and served from /public — not a stock library, and not hotlinked.
 *
 * Three things to keep in mind before editing:
 *
 *  1. Almost every file is CC-BY or CC-BY-SA. Visible attribution is a licence
 *     condition, not a nicety, which is why `credit` is required rather than
 *     optional. Removing the credit from the UI puts the site out of compliance.
 *  2. The photo shows the city each guide actually quotes cost figures for,
 *     which is not always the capital — Zurich rather than Bern, Milan rather
 *     than Rome. A capital shot beside another city's prices misreads.
 *  3. Alt text is derived from the city name at render time rather than stored.
 *     Hand-written descriptions drift the moment a photo is replaced, and an
 *     alt string that misdescribes the image is worse than a plain one.
 *
 * Regenerate with: node scripts/fetch-city-photos.mjs
 */
export type ImageCredit = {
  author: string;
  licence: string;
  /** Commons file page. Required for CC-BY attribution. */
  source: string;
};

export type CountryImageSet = {
  src: string;
  credit: ImageCredit;
};

export const COUNTRY_IMAGES: Record<string, CountryImageSet> = {
  de: {
    src: "/countries/de.jpg",
    credit: {
      author: "User:Angr",
      licence: "CC BY-SA 2.5",
      source: "https://commons.wikimedia.org/wiki/File:Berlin_skyline_2.jpg",
    },
  },
  fr: {
    src: "/countries/fr.jpg",
    credit: {
      author: "Benh LIEU SONG",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Paris_Night.jpg",
    },
  },
  es: {
    src: "/countries/es.jpg",
    credit: {
      author: "Taken by w:es:Usuario:Barcex",
      licence: "CC BY-SA 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Madrid_Skyline_II.jpg",
    },
  },
  it: {
    src: "/countries/it.jpg",
    credit: {
      author: "Lauri Kangas from Espoo, Finland",
      licence: "CC BY-SA 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Milan-skyline-lcpitkan-pano_60-61.jpg",
    },
  },
  nl: {
    src: "/countries/nl.jpg",
    credit: {
      author: "Gabriele Giuseppini",
      licence: "CC BY 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Amsterdam_Skyline_-_panoramio.jpg",
    },
  },
  be: {
    src: "/countries/be.jpg",
    credit: {
      author: "Michel wal",
      licence: "CC BY-SA 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Brussels_skyline_1001.JPG",
    },
  },
  se: {
    src: "/countries/se.jpg",
    credit: {
      author: "Alex Nordstrom",
      licence: "CC BY-SA 2.5",
      source: "https://commons.wikimedia.org/wiki/File:S%C3%B6dermalmstorg_and_Stockholm_skyline_from_S%C3%B6dermalm.jpg",
    },
  },
  ch: {
    src: "/countries/ch.jpg",
    credit: {
      author: "sdh_zh",
      licence: "CC BY 2.0",
      source: "https://commons.wikimedia.org/wiki/File:The_Zurich_skyline.jpg",
    },
  },
  at: {
    src: "/countries/at.jpg",
    credit: {
      author: "Schmock",
      licence: "CC BY-SA 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Skyline_of_St._Charles%27s_Church_(Vienna).JPG",
    },
  },
  pt: {
    src: "/countries/pt.jpg",
    credit: {
      author: "Bosc d'Anjou from New York, NY, USA",
      licence: "CC BY 2.0",
      source: "https://commons.wikimedia.org/wiki/File:The_new_Lisbon_skyline_01_(11512322673).jpg",
    },
  },
  pl: {
    src: "/countries/pl.jpg",
    credit: {
      author: "Sebacalka",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Warsaw_skyline_from_boat.jpg",
    },
  },
  ie: {
    src: "/countries/ie.jpg",
    credit: {
      author: "www.Pixel.la Free Stock Photos",
      licence: "CC0",
      source: "https://commons.wikimedia.org/wiki/File:Dublin_with_Spire_(23698542464).jpg",
    },
  },
  gb: {
    src: "/countries/gb.jpg",
    credit: {
      author: "Diliff",
      licence: "CC BY-SA 3.0",
      source: "https://commons.wikimedia.org/wiki/File:City_of_London_skyline_from_London_City_Hall_-_Oct_2008.jpg",
    },
  },
  ae: {
    src: "/countries/ae.jpg",
    credit: {
      author: "Imre Solt",
      licence: "CC BY-SA 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Dubai_Skyline_on_10_January_2008.jpg",
    },
  },
  sa: {
    src: "/countries/sa.jpg",
    credit: {
      author: "B.alotaby",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Riyadh_North_Skyline_.jpg",
    },
  },
  qa: {
    src: "/countries/qa.jpg",
    credit: {
      author: "Zairon",
      licence: "CC BY 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Doha_Skyline_01.jpg",
    },
  },
  kw: {
    src: "/countries/kw.jpg",
    credit: {
      author: "Francisco Anzola from United States",
      licence: "CC BY 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Kuwait_City_skyline_(39710595225).jpg",
    },
  },
  om: {
    src: "/countries/om.jpg",
    credit: {
      author: "Domenico Convertini",
      licence: "CC BY-SA 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Old_Muscat_City_View,_Muscat,_Oman3.jpg",
    },
  },
  bh: {
    src: "/countries/bh.jpg",
    credit: {
      author: "Zairon",
      licence: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Manama_Manama_Skyline_04.jpg",
    },
  },
  us: {
    src: "/countries/us.jpg",
    credit: {
      author: "Martin Dürrschnabel (Martin-D1 of de.wikipedia.org)",
      licence: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:Skyline-New-York-City.jpg",
    },
  },
  ca: {
    src: "/countries/ca.jpg",
    credit: {
      author: "Wladyslaw (talk)",
      licence: "CC BY-SA 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Toronto_-_ON_-_Skyline_bei_Nacht.jpg",
    },
  },
  au: {
    src: "/countries/au.jpg",
    credit: {
      author: "Diliff",
      licence: "CC BY-SA 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Sydney_Harbour_Bridge_night.jpg",
    },
  },
};

export function getCountryImage(code: string): CountryImageSet | undefined {
  return COUNTRY_IMAGES[code.toLowerCase()];
}

/** "View over Berlin" / "منظر عام لمدينة برلين" */
export function cityAlt(city: string, locale: Locale): string {
  return locale === "ar" ? `منظر عام لمدينة ${city}` : `View over ${city}`;
}
