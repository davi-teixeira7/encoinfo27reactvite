import { type FormEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createProduto, fetchLoja } from "../api/client"

type StatusMessage = {
  type: "success" | "error"
  message: string
}

export default function FormProduto() {
  const { lojaId } = useParams<{ lojaId: string }>()
  const [isOpen, setIsOpen] = useState(false)
  const [nome, setNome] = useState("")
  const [icone, setIcone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null)
  const [lojaCor, setLojaCor] = useState<string>("")

  useEffect(() => {
    let active = true
    if (!lojaId) {
      setLojaCor("")
      return
    }

    fetchLoja(lojaId)
      .then((loja) => {
        if (!active) return
        setLojaCor(loja.cor_loja || "")
      })
      .catch(() => {
        if (!active) return
        setLojaCor("")
      })

    return () => {
      active = false
    }
  }, [lojaId])

  function resetFields() {
    setNome("")
    setIcone("")
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return

    if (!lojaId) {
      setStatusMessage({
        type: "error",
        message: "ID da loja nao encontrado na URL.",
      })
      return
    }

    setIsSubmitting(true)
    setStatusMessage(null)

    try {
      await createProduto(lojaId, nome.trim(), icone.trim())
      setStatusMessage({
        type: "success",
        message: "Produto adicionado com sucesso!",
      })
      resetFields()
    } catch (error) {
      setStatusMessage({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Nao foi possivel adicionar o produto. Tente novamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function closeModal() {
    setIsOpen(false)
    resetFields()
    setStatusMessage(null)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          resetFields()
          setStatusMessage(null)
          setIsOpen(true)
        }}
        className="flex h-12 min-w-[220px] items-center justify-center rounded-xl border border-gray-600 bg-gray-700 px-6 text-base font-semibold text-white shadow transition hover:opacity-90 whitespace-nowrap"
        style={
          lojaCor
            ? {
                backgroundColor: lojaCor,
                borderColor: lojaCor,
              }
            : undefined
        }
      >
        Adicionar produto
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeModal}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Adicionar produto
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Fechar
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="block text-sm font-medium text-gray-700">
                  Nome
                </span>
                <input
                  type="text"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  required
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
                  placeholder="Nome do produto"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-medium text-gray-700">
                  Link do icone
                </span>
                <input
                  type="url"
                  value={icone}
                  onChange={(event) => setIcone(event.target.value)}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
                  placeholder="https://exemplo.com/icone.png"
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-emerald-600 px-4 py-2 text-white font-semibold transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Adicionando..." : "Adicionar produto"}
              </button>
            </form>

            {statusMessage && (
              <p
                className={`mt-4 text-sm ${
                  statusMessage.type === "success"
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {statusMessage.message}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
