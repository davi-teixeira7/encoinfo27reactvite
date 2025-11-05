import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchLoja } from "../api/client"
import type { Loja } from "../api/models/Loja"
import ProdutoCard from "../components/ProdutoCard"
import Banner from "../components/Banner"
import LoadingSpinner from "../components/LoadingSpinner"

export default function Loja() {
  const { lojaId } = useParams<{ lojaId: string }>() 
  const [loja, setLoja] = useState<Loja | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!lojaId) {
      setLoja(null)
      setHasError(true)
      setIsLoading(false)
      return
    }

    let active = true
    setIsLoading(true)
    setHasError(false)
    setLoja(null)

    fetchLoja(lojaId)
      .then((data) => {
        if (!active) return
        setLoja(data)
      })
      .catch(() => {
        if (!active) return
        setLoja(null)
        setHasError(true)
      })
      .finally(() => {
        if (!active) return
        setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [lojaId])

  if (isLoading) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4">
        <LoadingSpinner label="Carregando loja..." />
      </main>
    )
  }

  if (!loja || hasError) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4">
        <p className="text-center text-lg font-medium text-gray-700">
          Nao foi possivel carregar a loja.
        </p>
      </main>
    )
  }

  const accentColor = loja.cor_loja || "#1f2937"

  return (
    <main
      className="flex min-h-screen w-full flex-col items-center pb-14"
      style={{ backgroundColor: accentColor }}
    >
      <Banner src={loja.banner} alt={`Banner da loja ${loja.nome}`} />

      <div className="mt-8 w-full px-4 sm:px-6">
        <div
          className="mx-auto w-full max-w-5xl rounded-3xl border border-white/40 bg-white/90 px-4 pb-10 pt-8 text-center shadow-xl backdrop-blur-sm sm:px-8"
          style={{ color: accentColor }}
        >
          <div>
            <h2 className="text-4xl font-black">Produtos</h2>
            <div className="mt-6 grid grid-cols-2 place-items-center gap-4 sm:grid-cols-3 lg:grid-cols-4">
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
      </div>
    </main>
  )
}
