// Build-time image generation: Open Graph cards and PWA icons, rendered with
// satori (layout → SVG) and resvg (SVG → PNG). Nothing here ships to the client.
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const font = (weight: 400 | 700) =>
  readFile(require.resolve(`@fontsource/inter/files/inter-latin-${weight}-normal.woff`));

const BG = "#0b0c0f";
const FG = "#f2f3f5";
const MUTED = "#a3aab8";
const LIME = "#d4ff00";

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

function png(svg: string, width: number) {
  return new Uint8Array(new Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng());
}

export async function ogImage(opts: { kicker: string; title: string; subtitle: string }) {
  const [regular, bold] = await Promise.all([font(400), font(700)]);
  const tree = h(
    "div",
    {
      // satori sizes boxes content-box: 1200 = 16 border + 80 + 1024 + 80; 630 = 72 + 486 + 72
      width: 1024,
      height: 486,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background: BG,
      padding: "72px 80px",
      fontFamily: "Inter",
      borderLeft: `16px solid ${LIME}`,
    },
    [
      h("div", { display: "flex", fontSize: 28, color: LIME, fontWeight: 700 }, opts.kicker),
      h("div", { display: "flex", flexDirection: "column", width: 1024 }, [
        h("div", { display: "flex", fontSize: 76, fontWeight: 700, color: FG, lineHeight: 1.05, letterSpacing: -2 }, opts.title),
        h("div", { display: "flex", flexWrap: "wrap", width: 1024, fontSize: 34, color: MUTED, marginTop: 24, lineHeight: 1.3 }, opts.subtitle),
      ]),
      h("div", { display: "flex", justifyContent: "space-between", width: 1024, fontSize: 26, color: MUTED }, [
        h("div", { display: "flex" }, "Leslie Angu · Data Engineer"),
        h("div", { display: "flex" }, "Nairobi / Remote"),
      ]),
    ]
  );
  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Inter", data: regular, weight: 400, style: "normal" },
      { name: "Inter", data: bold, weight: 700, style: "normal" },
    ],
  });
  return png(svg, 1200);
}

/** Square app icon: lime tile with "LA". `maskable` keeps the mark inside Android's safe zone. */
export async function iconPng(width: number, maskable = false) {
  const bold = await font(700);
  const tile = maskable ? 300 : 448;
  const tree = h(
    "div",
    { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: maskable ? BG : "transparent" },
    h(
      "div",
      {
        width: tile,
        height: tile,
        borderRadius: maskable ? 56 : 96,
        background: LIME,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: BG,
        fontFamily: "Inter",
        fontWeight: 700,
        fontSize: tile * 0.42,
        letterSpacing: -tile * 0.02,
      },
      "LA"
    )
  );
  const svg = await satori(tree as never, {
    width: 512,
    height: 512,
    fonts: [{ name: "Inter", data: bold, weight: 700, style: "normal" }],
  });
  return png(svg, width);
}
