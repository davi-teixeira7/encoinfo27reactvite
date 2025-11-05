import { useEffect, useState } from "react"
import { fetchLojas } from "../api/client"
import type { Loja } from "../api/models/Loja"
import LojaCard from "../components/LojaCard"
import LoadingSpinner from "../components/LoadingSpinner"

export default function Home() {
  const [lojas, setLojas] = useState<Loja[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    setIsLoading(true)
    fetchLojas()
      .then((data) => {
        if (!active) return
        setLojas(data)
      })
      .catch(() => {
        if (!active) return
        setLojas([])
      })
      .finally(() => {
        if (!active) return
        setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  if (isLoading) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4">
        <LoadingSpinner label="Carregando lojas..." />
      </main>
    )
  }

  return (
    <main className="flex w-full flex-col px-4 pb-10 pt-6 sm:px-6">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-2 place-items-center gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {lojas.map((loja) => (
          <LojaCard key={loja.id} lojaid={loja.id} imgURL={loja.icone} nome={loja.nome} />
        ))}
      </div>
    </main>
  )
}
