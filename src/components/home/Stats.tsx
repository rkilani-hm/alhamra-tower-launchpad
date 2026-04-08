import { ScrollReveal } from "../shared/ScrollReveal";

const STATS = [
  { number: "412", unit: "m",  label: "Landmark Height" },
  { number: "80",  unit: "",   label: "Stories of Premium Office Space" },
  { number: "#23", unit: "",   label: "World Ranking at Completion" },
  { number: "52",  unit: "",   label: "Elevators · 6 m/s Express" },
];

export function Stats() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        borderTop: "1px solid rgba(29,29,27,0.09)",
        borderBottom: "1px solid rgba(29,29,27,0.09)",
      }}
    >
      {STATS.map(({ number, unit, label }, i) => (
        <ScrollReveal key={label} delay={i * 0.1}>
          <div
            style={{
              padding: "52px 44px",
              borderRight: i < 3 ? "1px solid rgba(29,29,27,0.09)" : "none",
              transition: "background 0.3s",
              cursor: "default",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#FAFAFA")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#fff")}
          >
            <div
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 58,
                fontWeight: 300,
                lineHeight: 1,
                marginBottom: 10,
                color: "#1D1D1B",
              }}
            >
              {number}
              {unit && (
                <span
                  style={{
                    fontFamily: "Jost, sans-serif",
                    fontSize: 24,
                    fontWeight: 200,
                    color: "#B2B2B2",
                  }}
                >
                  {unit}
                </span>
              )}
            </div>
            <div
              style={{
                fontFamily: "Jost, sans-serif",
                fontSize: "9.5px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#B2B2B2",
              }}
            >
              {label}
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
