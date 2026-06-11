/* ──────────────────────────────────────────────────────────────────────────
   Admin auth — Supabase email/password session + role lookup.

   Wraps the /admin area only. Exposes the current session, the signed-in
   user's profile role ('editor' | 'manager'), and sign-in/out actions.
   Role drives what the UI offers (editors can't publish); the database RLS
   is the real enforcement — this is just UX.
────────────────────────────────────────────────────────────────────────── */

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

export type Role = "editor" | "manager";

interface AdminAuth {
  session: Session | null;
  role: Role | null;
  email: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AdminAuth | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  /* Load the profile role for the current user. */
  async function loadRole(userId: string) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .maybeSingle();
      if (error || !data) { setRole(null); return; }
      setRole((data.role as Role) ?? null);
    } catch {
      setRole(null);
    }
  }

  useEffect(() => {
    let active = true;

    // Initial session
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      if (data.session?.user) loadRole(data.session.user.id).finally(() => active && setLoading(false));
      else setLoading(false);
    });

    // React to auth changes
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      if (sess?.user) loadRole(sess.user.id);
      else setRole(null);
    });

    return () => { active = false; sub.subscription.unsubscribe(); };
  }, []);

  const signIn: AdminAuth["signIn"] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setRole(null);
  };

  return (
    <Ctx.Provider value={{ session, role, email: session?.user?.email ?? null, loading, signIn, signOut }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAdminAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return v;
}
