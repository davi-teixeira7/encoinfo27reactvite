import { useEffect, useMemo, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { FaHome } from "react-icons/fa"
import FormLoja from "./FormLoja"
import FormProduto from "./FormProduto"
import { fetchLoja } from "../api/client"

export default function Navbar() {
  const { pathname } = useLocation()
  const { lojaId } = useParams<{ lojaId: string }>()
  const [lojaNome, setLojaNome] = useState("")
  const [lojaCor, setLojaCor] = useState("")

  const isHome = pathname === "/"
  const isLoja = /^\/loja\/[^/]+/.test(pathname)

  useEffect(() => {
    let active = true

    if (!isLoja || !lojaId) {
      setLojaNome("")
      setLojaCor("")
      return
    }

    fetchLoja(lojaId)
      .then((loja) => {
        if (!active) return
        setLojaNome(loja.nome)
        setLojaCor(loja.cor_loja || "")
      })
      .catch(() => {
        if (!active) return
        setLojaNome("")
        setLojaCor("")
      })

    return () => {
      active = false
    }
  }, [isLoja, lojaId])

  const pageTitle = useMemo(() => {
    if (isHome) return "Lista de Lojas"
    if (isLoja) {
      const suffix = lojaNome
      return `Loja ${suffix}`
    }
    return ""
  }, [isHome, isLoja, lojaNome])

  const accentColor = lojaCor || "#374151"

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="relative flex w-full items-center py-4 px-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/"
            className="flex h-14 w-14 items-center justify-center text-3xl transition hover:opacity-75"
            aria-label="Ir para a Home"
            title="Home"
            style={{ color: accentColor }}
          >
            <FaHome />
          </Link>

          {isHome && <FormLoja />}
          {isLoja && <FormProduto />}
        </div>

        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-3xl font-extrabold tracking-tight"
          style={{ color: accentColor }}
        >
          {pageTitle}
        </div>

        <div className="ml-auto h-14 w-14" aria-hidden="true" />
      </div>
    </nav>
  )
}
