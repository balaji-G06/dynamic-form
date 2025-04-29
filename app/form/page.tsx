import DynamicForm from "@/components/dynamic-form"

export default function FormPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <DynamicForm />
      </div>
    </main>
  )
}
