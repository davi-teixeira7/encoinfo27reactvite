interface LoadingSpinnerProps {
  label?: string
  fullScreen?: boolean
}

export default function LoadingSpinner({ label, fullScreen = false }: LoadingSpinnerProps) {
  const wrapperClasses = fullScreen
    ? "flex min-h-screen w-full flex-col items-center justify-center gap-3"
    : "flex w-full flex-col items-center justify-center gap-3 py-16"

  return (
    <div className={wrapperClasses} role="status" aria-live="polite" aria-busy="true">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-700" />
      {label ? <span className="text-sm font-medium text-gray-700">{label}</span> : null}
    </div>
  )
}
