"use client"

import type { FormSection, FormValues, FieldErrors } from "@/lib/types"
import FormField from "./form-field"

interface FormSectionProps {
  section: FormSection
  formValues: FormValues
  fieldErrors: FieldErrors
  onFieldChange: (fieldId: string, value: string | string[] | boolean) => void
}

export default function FormSectionComponent({ section, formValues, fieldErrors, onFieldChange }: FormSectionProps) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
      {section.description && <p className="text-gray-600 mb-4">{section.description}</p>}

      <div className="space-y-4">
        {section.fields.map((field) => (
          <FormField
            key={field.fieldId}
            field={field}
            value={formValues[field.fieldId]}
            error={fieldErrors[field.fieldId]}
            onChange={(value) => onFieldChange(field.fieldId, value)}
          />
        ))}
      </div>
    </div>
  )
}
