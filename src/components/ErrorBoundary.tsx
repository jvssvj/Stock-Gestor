import { Component, type ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  key: number
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, key: 0 }

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true }
  }

  reset = () => {
    this.setState((prev) => ({ hasError: false, key: prev.key + 1 }))
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onReset={this.reset} />
    }
    return <div key={this.state.key}>{this.props.children}</div>
  }
}

function ErrorFallback({ onReset }: { onReset: () => void }) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        {/* Animação */}
        <div className="relative h-64 flex items-end justify-center overflow-hidden mb-8">

          {/* Prateleira */}
          <div
            className="absolute top-16 left-1/2 -translate-x-1/2 w-64 h-3 bg-primary rounded"
            style={{ animation: "shake 0.5s ease 0.05s both" }}
          >
            <div className="absolute left-2 top-3 w-2 h-12 bg-primary rounded" />
            <div className="absolute right-2 top-3 w-2 h-12 bg-primary rounded" />
          </div>

          {/* Caixas */}
          {BOXES.map((box, i) => (
            <div
              key={i}
              className="absolute top-12 w-11 h-10 rounded-lg flex items-center justify-center text-xl shadow-md"
              style={{
                left: box.left,
                backgroundColor: box.bg,
                color: box.color,
                animation: `fall ${box.duration}s linear ${box.delay}s both`,
                "--rot": box.rot,
              } as React.CSSProperties}
            >
              {box.emoji}
            </div>
          ))}

          {/* Poeira */}
          {DUST.map((d, i) => (
            <div
              key={i}
              className="absolute bottom-4 left-1/2 w-1.5 h-1.5 rounded-full bg-primary/20"
              style={{
                animation: `puff 1s ease ${d.delay}s both`,
                "--dx": d.dx,
                "--dy": d.dy,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Texto */}
        <div
          className="text-center"
          style={{ animation: "fadeUp 0.5s ease 1.2s both" }}
        >
          <h2 className="text-xl font-bold text-text-main mb-2">
            Algo deu errado 😬
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-6">
            Um erro inesperado derrubou o estoque.<br />
            Tente recarregar a página.
          </p>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            ↺ Tentar novamente
          </button>
        </div>

      </div>

      <style>{CSS}</style>
    </div>
  )
}

const BOXES = [
  { left: "calc(50% - 120px)", bg: "#3852B4", color: "#fff", duration: 0.9, delay: 0.1, rot: "-30deg", emoji: "📦" },
  { left: "calc(50% - 68px)", bg: "#9bace9", color: "#fff", duration: 1.0, delay: 0.3, rot: "18deg", emoji: "📦" },
  { left: "calc(50% - 16px)", bg: "#3852B4", color: "#fff", duration: 0.85, delay: 0.05, rot: "-12deg", emoji: "🗃️" },
  { left: "calc(50% + 36px)", bg: "#e4e5ff", color: "#3852B4", duration: 1.1, delay: 0.2, rot: "35deg", emoji: "📦" },
  { left: "calc(50% + 88px)", bg: "#9bace9", color: "#fff", duration: 0.95, delay: 0.4, rot: "-22deg", emoji: "🗃️" },
]

const DUST = [
  { delay: 0.8, dx: "-60px", dy: "-20px" },
  { delay: 0.9, dx: "60px", dy: "-15px" },
  { delay: 1.0, dx: "-30px", dy: "-30px" },
  { delay: 1.0, dx: "30px", dy: "-28px" },
  { delay: 1.1, dx: "0px", dy: "-35px" },
]

const CSS = `
  @keyframes fall {
    0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
    60%  { opacity: 1; }
    100% { transform: translateY(240px) rotate(var(--rot)); opacity: 0; }
  }
  @keyframes shake {
    0%   { transform: translateX(-50%) rotate(0deg); }
    20%  { transform: translateX(-50%) rotate(-4deg); }
    40%  { transform: translateX(-50%) rotate(4deg); }
    60%  { transform: translateX(-50%) rotate(-3deg); }
    80%  { transform: translateX(-50%) rotate(2deg); }
    100% { transform: translateX(-50%) rotate(0deg); }
  }
  @keyframes puff {
    0%   { opacity: 0; transform: translate(0, 0) scale(0.5); }
    30%  { opacity: 1; }
    100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(2); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`
