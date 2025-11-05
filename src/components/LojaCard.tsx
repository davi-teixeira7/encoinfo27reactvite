import { Link } from "react-router-dom"

interface LojaCardProps {
  lojaid: string
  imgURL: string
  nome: string
}

export default function LojaCard({ lojaid, imgURL, nome }: LojaCardProps) {
  return (
    <Link
      to={`/loja/${lojaid}`}
      className="group block w-64 rounded-lg border border-gray-200 bg-white p-6 text-center shadow-md transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:border-gray-300"
    >
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 shadow-inner">
        <img
          src={imgURL}
          alt={`Icone da loja ${nome}`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-900 transition">
          {nome}
        </h2>
      </div>
    </Link>
  )
}
