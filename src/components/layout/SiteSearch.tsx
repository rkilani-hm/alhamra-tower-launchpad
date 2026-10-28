import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowUpRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Editable } from "@/lib/EditMode";
import { usePageContent } from "@/lib/useCmsContent";
import { useI18n } from "@/lib/i18n";
import { initialSearchPages, loadSearchPages, searchPages } from "@/lib/siteSearch";

const COPY = {
  en: { title: "Search the website", placeholder: "Search", empty: "No matching pages", loading: "Updating results…", partial: "Some latest updates are unavailable. Showing available website content." },
  ar: { title: "البحث في الموقع", placeholder: "بحث", empty: "لا توجد صفحات مطابقة", loading: "جارٍ تحديث النتائج…", partial: "بعض التحديثات غير متاحة. يتم عرض المحتوى المتاح." },
};

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [pages, setPages] = useState(initialSearchPages);
  const [loading, setLoading] = useState(false);
  const [partial, setPartial] = useState(false);
  const { lang } = useI18n();
  const copy = usePageContent("siteSearch", COPY[lang], lang);
  const results = useMemo(() => searchPages(pages, query), [pages, query]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    loadSearchPages().then(result => {
      if (!cancelled) { setPages(result.pages); setPartial(result.partial); }
    }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [open]);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setOpen(true);
  }

  return (
    <>
      <form role="search" onSubmit={submit} className="flex h-9 items-center rounded-md border border-input bg-background text-foreground">
        <Input aria-label={copy.title} placeholder={copy.placeholder} value={query}
          onChange={event => { setQuery(event.target.value); setOpen(true); }}
          className="hidden h-9 w-28 border-0 bg-transparent px-2 focus-visible:ring-0 lg:block" />
        <Button type="submit" variant="ghost" size="icon" className="h-9 w-9 shrink-0" aria-label={copy.title} title={copy.title}>
          <Search aria-hidden="true" />
        </Button>
      </form>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-2xl gap-5 rounded-md p-5 sm:p-7">
          <DialogTitle className="pr-7 tracking-normal">
            <Editable id="page_prose:siteSearch:title">{copy.title}</Editable>
          </DialogTitle>
          <DialogDescription className="sr-only">{copy.title}</DialogDescription>
          <form role="search" onSubmit={event => event.preventDefault()} className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <Input type="search" aria-label={copy.title} placeholder={copy.placeholder} value={query}
              onChange={event => setQuery(event.target.value)} className="h-11 pl-11 text-base" autoFocus />
          </form>
          <div aria-live="polite" className="text-sm text-muted-foreground">
            {loading ? <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /><Editable id="page_prose:siteSearch:loading">{copy.loading}</Editable></span>
              : query.trim() ? `${results.length} ${results.length === 1 ? "result" : "results"}` : null}
            {partial && <p><Editable id="page_prose:siteSearch:partial">{copy.partial}</Editable></p>}
          </div>
          <div className="max-h-[55dvh] overflow-y-auto overscroll-contain">
            {query.trim() && !results.length && !loading && <p className="py-8 text-center text-muted-foreground"><Editable id="page_prose:siteSearch:empty">{copy.empty}</Editable></p>}
            {(query.trim() ? results : pages).map(page => (
              <Link key={page.path} to={page.path} onClick={() => setOpen(false)}
                className="group block border-b border-border py-4 text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span className="flex items-center justify-between gap-4 font-medium"><span>{page.title}</span><ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" /></span>
                {"snippet" in page && <p className="mt-2 break-words text-sm leading-relaxed text-muted-foreground">{String(page.snippet)}</p>}
              </Link>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}