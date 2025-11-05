import { type FormEvent, useState } from "react"
import { createLoja } from "../api/client"

interface StatusMessage {
  type: "success" | "error"
  message: string
}

export default function FormLoja() {
  const [isOpen, setIsOpen] = useState(false)
  const [nome, setNome] = useState("")
  const [banner, setBanner] = useState("")
  const [icone, setIcone] = useState("")
  const [corLoja, setCorLoja] = useState("#ffffff")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null)

  function resetFields() {
    setNome("")
    setBanner("")
    setIcone("")
    setCorLoja("#ffffff")
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    setStatusMessage(null)

    try {
      await createLoja(nome.trim(), banner.trim(), icone.trim(), corLoja)
      setStatusMessage({
        type: "success",
        message: "Loja criada com sucesso!",
      })
      resetFields()
    } catch (error) {
      setStatusMessage({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Nao foi possivel criar a loja. Tente novamente.",
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
      >
        Criar nova loja
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
                Nova Loja
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
                  placeholder="Nome da loja"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-medium text-gray-700">
                  Link do banner
                </span>
                <input
                  type="url"
                  value={banner}
                  onChange={(event) => setBanner(event.target.value)}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
                  placeholder="https://exemplo.com/banner.png"
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

              <label className="block">
                <span className="block text-sm font-medium text-gray-700">
                  Cor da loja
                </span>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="color"
                    value={corLoja}
                    onChange={(event) => setCorLoja(event.target.value)}
                    className="h-10 w-16 cursor-pointer border border-gray-300 rounded"
                    aria-label="Selecionar cor da loja"
                  />
                  <span className="text-sm text-gray-600">{corLoja}</span>
                </div>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-emerald-600 px-4 py-2 text-white font-semibold transition hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Criando..." : "Criar loja"}
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
