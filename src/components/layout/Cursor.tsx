import { useEffect, useRef } from "react";

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top  = e.clientY + "px";
    };

    const expand = () => cursor.classList.add("big");
    const shrink = () => cursor.classList.remove("big");

    document.addEventListener("mousemove", move);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", expand);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      document.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="cursor-dot"
      style={{
        position: "fixed",
        width: 8,
        height: 8,
        background: "#1D1D1B",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        transition: "width .25s, height .25s, background .25s, border .25s",
      }}
    />
  );
}
