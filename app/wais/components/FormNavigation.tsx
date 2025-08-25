"use client"

interface Props {
  formId: string
  onBack?: () => void
  submitLabel?: string
  canSubmit?: boolean
  className?: string
  onSubmit?: () => void // 👈 NEW
}

export default function FormNavigation({
  formId,
  onBack,
  submitLabel = "Continue →",
  canSubmit = true,
  className = "",
  onSubmit,
}: Props) {
  return (
    <div
      className={`border-t bg-white rounded-b-2xl px-6 py-4 flex items-center justify-end gap-3 ${className}`}
    >
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          Back
        </button>
      )}
      <button
        type={onSubmit ? "button" : "submit"}
        form={onSubmit ? undefined : formId}
        disabled={!canSubmit}
        onClick={onSubmit}
        className="inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
      >
        {submitLabel}
      </button>
    </div>
  )
}
