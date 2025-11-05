interface LojaBannerProps {
  src?: string | null
  alt: string
}

export default function Banner({ src, alt }: LojaBannerProps) {
  return (
    <section className="w-full border-b border-black bg-gray-950">
      <div className="flex h-64 w-full items-center justify-center sm:h-80">
        {src ? (
          <img
            src={src}
            alt={alt}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <p className="text-sm font-medium text-white/80">Sem banner</p>
        )}
      </div>
    </section>
  )
}
