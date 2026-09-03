import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { AlHamraFloors } from "@/components/shared/AlHamraFloors";
import { useI18n } from "@/lib/i18n";

/* Experience-2 — the floor-by-floor explorer (One Vanderbilt "Floors"
   pattern, rebuilt in Al Hamra identity). Working name for now. */
export default function Experience2() {
  const { lang } = useI18n();
  return (
    <PageLayout>
      <PageHero
        title="Experience-2"
        crumbs={[
          { label: lang === "ar" ? "الرئيسية" : "Home", href: "/" },
          { label: lang === "ar" ? "التجربة" : "Experience", href: "/experience/overview" },
        ]}
      />
      <AlHamraFloors />
    </PageLayout>
  );
}
