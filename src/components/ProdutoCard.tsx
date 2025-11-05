interface ProdutoCardProps {
  imgURL?: string | null
  nome: string
  cor: string
}

export default function ProdutoCard({ imgURL, nome, cor }: ProdutoCardProps) {
  const accent = cor || "#1f2937"

  return (
    <div
      className="group block w-64 rounded-lg border border-gray-200 bg-white p-6 text-center shadow-md transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:border-gray-300"
      style={{ borderColor: accent }}
    >
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 shadow-inner">
        {imgURL ? (
          <img
            src={imgURL}
            alt={`Imagem do produto ${nome}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-sm font-medium text-gray-500">
            Sem imagem
          </span>
        )}
      </div>
      <h3
        className="mt-4 text-xl font-semibold transition group-hover:text-emerald-700"
        style={{ color: accent }}
      >
        {nome}
      </h3>
    </div>
  )
}
