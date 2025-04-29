"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import FormSection from "./form-section"
import type { FormResponse, FormValues, FieldErrors, FormSection as FormSectionType } from "@/lib/types"

export default function DynamicForm() {
  const [formData, setFormData] = useState<FormResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [formValues, setFormValues] = useState<FormValues>({})
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const router = useRouter()

  useEffect(() => {
    const rollNumber = sessionStorage.getItem("rollNumber")
    const name = sessionStorage.getItem("name")

    if (!rollNumber || !name) {
      router.push("/")
      return
    }

    const fetchFormStructure = async () => {
      try {
        const response = await fetch(
          `https://dynamic-form-generator-9rl7.onrender.com/get-form?rollNumber=${rollNumber}`,
        )

        if (!response.ok) {
          throw new Error("Failed to fetch form structure")
        }

        const data = await response.json()
        setFormData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchFormStructure()
  }, [router])

  const validateSection = (section: FormSectionType): boolean => {
    const newErrors: FieldErrors = {}
    let isValid = true

    section.fields.forEach((field) => {
      const value = formValues[field.fieldId]

      // Check required fields
      if (field.required && (!value || (Array.isArray(value) && value.length === 0) || value === "")) {
        newErrors[field.fieldId] = field.validation?.message || "This field is required"
        isValid = false
        return
      }

      // Check minLength for string values
      if (field.minLength && typeof value === "string" && value.length < field.minLength) {
        newErrors[field.fieldId] = `Minimum length is ${field.minLength} characters`
        isValid = false
        return
      }

      // Check maxLength for string values
      if (field.maxLength && typeof value === "string" && value.length > field.maxLength) {
        newErrors[field.fieldId] = `Maximum length is ${field.maxLength} characters`
        isValid = false
        return
      }
    })

    setFieldErrors(newErrors)
    return isValid
  }

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1)
    }
  }

  const handleNext = () => {
    if (!formData) return

    const currentSection = formData.form.sections[currentSectionIndex]
    if (validateSection(currentSection)) {
      if (currentSectionIndex < formData.form.sections.length - 1) {
        setCurrentSectionIndex(currentSectionIndex + 1)
      }
    }
  }

  const handleSubmit = () => {
    if (!formData) return

    const currentSection = formData.form.sections[currentSectionIndex]
    if (validateSection(currentSection)) {
      console.log("Form submitted with values:", formValues)
      alert("Form submitted successfully! Check console for form data.")
    }
  }

  const handleFieldChange = (fieldId: string, value: string | string[] | boolean) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }))

    // Clear error for this field when user changes the value
    if (fieldErrors[fieldId]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[fieldId]
        return newErrors
      })
    }
  }

  if (loading) {
    return <div className="text-center">Loading form...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  if (!formData) {
    return <div className="text-center">No form structure found</div>
  }

  const currentSection = formData.form.sections[currentSectionIndex]
  const isLastSection = currentSectionIndex === formData.form.sections.length - 1

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center">{formData.form.formTitle}</h1>
      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <span>Form ID: {formData.form.formId}</span>
        <span>Version: {formData.form.version}</span>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{
              width: `${((currentSectionIndex + 1) / formData.form.sections.length) * 100}%`,
            }}
          ></div>
        </div>
        <div className="text-right text-sm mt-1">
          Section {currentSectionIndex + 1} of {formData.form.sections.length}
        </div>
      </div>

      {currentSection && (
        <FormSection
          section={currentSection}
          formValues={formValues}
          fieldErrors={fieldErrors}
          onFieldChange={handleFieldChange}
        />
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentSectionIndex === 0}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          data-testid="prev-button"
        >
          Previous
        </button>

        {isLastSection ? (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            data-testid="submit-button"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            data-testid="next-button"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}
