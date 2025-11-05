import { useEffect, useMemo, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { FaHome } from "react-icons/fa"
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
    if (isHome) return "Lojas"
    if (isLoja) {
      const suffix = lojaNome ? `Loja de ${lojaNome}` : "Loja"
      return suffix
    }
    return ""
  }, [isHome, isLoja, lojaNome])

  const accentColor = lojaCor || "#374151"

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="flex w-full items-center gap-3 px-4 py-4 sm:px-6">
        <Link
          to="/"
          className="flex h-12 w-12 shrink-0 items-center justify-center text-3xl transition hover:opacity-75"
          aria-label="Ir para a Home"
          title="Home"
          style={{ color: accentColor }}
        >
          <FaHome />
        </Link>

        <span
          className="truncate text-xl font-bold tracking-tight sm:text-3xl"
          style={{ color: accentColor }}
        >
          {pageTitle}
        </span>
      </div>
    </nav>
  )
}
