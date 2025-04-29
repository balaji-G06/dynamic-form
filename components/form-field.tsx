"use client"

import type React from "react"

import type { FormField as FieldType } from "@/lib/types"

interface FormFieldProps {
  field: FieldType
  value: string | string[] | boolean | undefined
  error?: string
  onChange: (value: string | string[] | boolean) => void
}

export default function FormField({ field, value, error, onChange }: FormFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (field.type === "checkbox") {
      onChange((e.target as HTMLInputElement).checked)
    } else {
      onChange(e.target.value)
    }
  }

  const handleCheckboxGroupChange = (optionValue: string) => {
    const currentValues = (value as string[]) || []
    const newValues = currentValues.includes(optionValue)
      ? currentValues.filter((v) => v !== optionValue)
      : [...currentValues, optionValue]
    onChange(newValues)
  }

  const renderField = () => {
    switch (field.type) {
      case "text":
      case "tel":
      case "email":
      case "date":
        return (
          <input
            type={field.type}
            id={field.fieldId}
            value={(value as string) || ""}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            minLength={field.minLength}
            maxLength={field.maxLength}
            className="w-full p-2 border rounded-md"
            data-testid={field.dataTestId}
          />
        )

      case "textarea":
        return (
          <textarea
            id={field.fieldId}
            value={(value as string) || ""}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            minLength={field.minLength}
            maxLength={field.maxLength}
            rows={4}
            className="w-full p-2 border rounded-md"
            data-testid={field.dataTestId}
          />
        )

      case "dropdown":
        return (
          <select
            id={field.fieldId}
            value={(value as string) || ""}
            onChange={handleChange}
            required={field.required}
            className="w-full p-2 border rounded-md"
            data-testid={field.dataTestId}
          >
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value} data-testid={option.dataTestId}>
                {option.label}
              </option>
            ))}
          </select>
        )

      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`${field.fieldId}-${option.value}`}
                  name={field.fieldId}
                  value={option.value}
                  checked={(value as string) === option.value}
                  onChange={() => onChange(option.value)}
                  required={field.required}
                  className="mr-2"
                  data-testid={option.dataTestId}
                />
                <label htmlFor={`${field.fieldId}-${option.value}`}>{option.label}</label>
              </div>
            ))}
          </div>
        )

      case "checkbox":
        if (field.options) {
          // Multiple checkboxes (checkbox group)
          return (
            <div className="space-y-2">
              {field.options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${field.fieldId}-${option.value}`}
                    value={option.value}
                    checked={((value as string[]) || []).includes(option.value)}
                    onChange={() => handleCheckboxGroupChange(option.value)}
                    className="mr-2"
                    data-testid={option.dataTestId}
                  />
                  <label htmlFor={`${field.fieldId}-${option.value}`}>{option.label}</label>
                </div>
              ))}
            </div>
          )
        } else {
          // Single checkbox
          return (
            <div className="flex items-center">
              <input
                type="checkbox"
                id={field.fieldId}
                checked={(value as boolean) || false}
                onChange={(e) => onChange(e.target.checked)}
                required={field.required}
                className="mr-2"
                data-testid={field.dataTestId}
              />
              <label htmlFor={field.fieldId}>{field.label}</label>
            </div>
          )
        }

      default:
        return <div>Unsupported field type: {field.type}</div>
    }
  }

  return (
    <div className="space-y-1">
      <label htmlFor={field.fieldId} className="block text-sm font-medium mb-1">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
