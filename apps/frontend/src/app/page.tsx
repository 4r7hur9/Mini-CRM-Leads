const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost/api/v1";

const items = [
  "Traefik na porta 80 roteando frontend e backend no mesmo host.",
  "MySQL e phpMyAdmin integrados ao compose raiz.",
  "Backend pronto para aplicar migrations automaticamente no start.",
];

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "32px 16px",
      }}
    >
      <section
        style={{
          width: "min(720px, 100%)",
          background: "#ffffff",
          border: "1px solid #dbe3f0",
          borderRadius: 8,
          padding: 32,
          boxShadow: "0 12px 32px rgba(15, 23, 42, 0.08)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 0,
            textTransform: "uppercase",
            color: "#2563eb",
          }}
        >
          Etapa 7
        </p>
        <h1 style={{ margin: "12px 0 16px", fontSize: 32 }}>
          Stack Docker do Mini CRM pronta para evoluir.
        </h1>
        <p style={{ margin: 0, lineHeight: 1.6, color: "#475569" }}>
          Este frontend e minimo de proposito: ele existe para validar o compose
          completo agora, sem antecipar as features de autenticacao e produto da
          Etapa 8.
        </p>

        <div
          style={{
            marginTop: 24,
            padding: 16,
            borderRadius: 8,
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
          }}
        >
          <strong>API esperada:</strong>
          <div style={{ marginTop: 8, fontFamily: "Consolas, monospace" }}>{apiUrl}</div>
        </div>

        <ul style={{ margin: "24px 0 0", paddingLeft: 20, lineHeight: 1.7 }}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
