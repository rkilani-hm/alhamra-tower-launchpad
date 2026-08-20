import { useMemo } from "react";
import { useI18n } from "@/lib/i18n";
import { ScrollPanRows, type PanRow } from "@/components/shared/ScrollPanRows";
import { usePageContent } from "@/lib/useCmsContent";

/* ──────────────────────────────────────────────────────────────────────────
   FeatureRows — three image + text rows presented as a pinned horizontal pan
   (the page holds still and the rows slide sideways as you scroll). Images and
   copy are PLACEHOLDERS from existing assets; swap them for final content later.
────────────────────────────────────────────────────────────────────────────── */

const CONTENT: Record<string, PanRow[]> = {
  en: [
    {
      img: "/assets/tower-exterior-blue-sky.jpg",
      eyebrow: "Sample eyebrow",
      heading: "A headline for the first row.",
      body: "Placeholder copy for row one. Replace this with the final text later. Two short sentences that state one clear idea about the tower or the tenant experience.",
    },
    {
      img: "/assets/boardroom-gulf-view.jpg",
      eyebrow: "Sample eyebrow",
      heading: "A headline for the second row.",
      body: "Placeholder copy for row two. This is sample text to be replaced. Keep it concise and specific to the point this row is making.",
    },
    {
      img: "/assets/sky-lobby-panoramic-gulf.jpg",
      eyebrow: "Sample eyebrow",
      heading: "A headline for the third row.",
      body: "Placeholder copy for row three. Sample text, to be finalised later. One idea, stated plainly, with a supporting detail.",
    },
  ],
  ar: [
    {
      img: "/assets/tower-exterior-blue-sky.jpg",
      eyebrow: "عنوان تجريبي",
      heading: "عنوان للصف الأول.",
      body: "نصٌّ مؤقت للصف الأول. استبدله بالنص النهائي لاحقاً. جملتان قصيرتان تعبّران عن فكرة واحدة واضحة عن البرج أو تجربة المستأجر.",
    },
    {
      img: "/assets/boardroom-gulf-view.jpg",
      eyebrow: "عنوان تجريبي",
      heading: "عنوان للصف الثاني.",
      body: "نصٌّ مؤقت للصف الثاني. هذا نصٌّ تجريبيّ سيُستبدل لاحقاً. اجعله موجزاً ومحدَّداً بالفكرة التي يطرحها هذا الصف.",
    },
    {
      img: "/assets/sky-lobby-panoramic-gulf.jpg",
      eyebrow: "عنوان تجريبي",
      heading: "عنوان للصف الثالث.",
      body: "نصٌّ مؤقت للصف الثالث. نصٌّ تجريبيّ سيُحدَّد لاحقاً. فكرة واحدة تُذكر ببساطة مع تفصيل داعم.",
    },
  ],
};

export function FeatureRows() {
  const { lang } = useI18n();
  // Wrap the rows array under a `rows` key so the CMS overlay path
  // "rows.N.heading" (written by the Editable ids in ScrollPanRows) lands on the
  // same array the component renders. Passing a bare array here silently drops
  // every published edit (it writes to out.rows while render reads out[N]).
  // MUST be memoised — a fresh object each render makes usePageContent re-run
  // its effect and reset to the static base before the DB overlay can stick.
  const staticBase = useMemo(() => ({ rows: CONTENT[lang] ?? CONTENT.en }), [lang]);
  const data = usePageContent<any>("home2feature", staticBase, lang);
  return <ScrollPanRows rows={data.rows} idBase="home2feature" />;
}
