import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchLoja } from "../api/client"
import type { Loja } from "../api/models/Loja"
import ProdutoCard from "../components/ProdutoCard"
import Banner from "../components/Banner"

export default function Loja() {
  const { lojaId } = useParams<{ lojaId: string }>() 
  const [loja, setLoja] = useState<Loja | null>(null)

  useEffect(() => {
    if (lojaId) fetchLoja(lojaId).then(setLoja)
  }, [lojaId])

  if (!loja) return <p className="text-center mt-10">Carregando...</p>

  const accentColor = loja.cor_loja || "#1f2937"

  return (
    <main
      className="flex min-h-screen flex-col items-center"
      style={{ backgroundColor: accentColor }}
    >
      <Banner src={loja.banner} alt={`Banner da loja ${loja.nome}`} />

      <div
        className="mt-8 w-full max-w-5xl rounded-3xl border border-white/40 bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm"
        style={{ color: accentColor }}
      >
        <div>
          <h2 className="text-4xl font-black">Produtos</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            {loja.produtos.map((produto) => (
              <ProdutoCard
                key={produto.id}
                imgURL={produto.icone}
                nome={produto.nome}
                cor={accentColor}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
