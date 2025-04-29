# Dynamic Form Generator

A React-based application that demonstrates dynamic form generation and handling with multiple sections, validation, and user authentication.

## Features

- **User Authentication**

  - Login with Roll Number and Name
  - User registration via API
  - Automatic handling of existing users

- **Dynamic Form Generation**

  - Fetches form structure from API
  - Multiple form sections with navigation
  - Progress indicator for form completion
  - Section-by-section validation

- **Form Field Types Support**

  - Text inputs
  - Email inputs
  - Telephone inputs
  - Textareas
  - Date inputs
  - Dropdowns
  - Radio buttons
  - Checkboxes

- **Validation Features**
  - Required field validation
  - Min/Max length validation
  - Field-specific validation rules
  - Section-level validation
  - Prevents proceeding until current section is valid

## Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd dynamic-form
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Build for production:

   ```bash
   npm run build
   # or
   yarn build
   ```

5. Start production server:
   ```bash
   npm run start
   # or
   yarn start
   ```

## Usage

1. Access the application at `http://localhost:3000`
2. Login with your credentials:
   - Roll Number: RA2211004050003
   - Name: Balaji G
3. The dynamic form will be fetched and displayed
4. Fill out each section of the form
5. Use Next/Previous buttons to navigate between sections
6. Submit the form when all sections are complete

## API Endpoints

The application interacts with two main API endpoints:

1. **Create User**

   ```
   POST https://dynamic-form-generator-9rl7.onrender.com/create-user
   ```

   Request body:

   ```json
   {
     "rollNumber": "string",
     "name": "string"
   }
   ```

2. **Get Form Structure**
   ```
   GET https://dynamic-form-generator-9rl7.onrender.com/get-form?rollNumber={rollNumber}
   ```

## Form Data Structure

The form structure follows this interface:

```typescript
interface FormResponse {
  message: string;
  form: {
    formTitle: string;
    formId: string;
    version: string;
    sections: FormSection[];
  };
}

interface FormSection {
  sectionId: number;
  title: string;
  description: string;
  fields: FormField[];
}

interface FormField {
  fieldId: string;
  type:
    | "text"
    | "tel"
    | "email"
    | "textarea"
    | "date"
    | "dropdown"
    | "radio"
    | "checkbox";
  label: string;
  placeholder?: string;
  required: boolean;
  dataTestId: string;
  validation?: {
    message: string;
  };
  options?: Array<{
    value: string;
    label: string;
    dataTestId?: string;
  }>;
  maxLength?: number;
  minLength?: number;
}
```

## Technology Stack

- Next.js 15.2.4
- React 19
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod (for validation)

## Project Structure

```
dynamic-form/
├── app/
│   ├── components/
│   │   ├── Login.tsx
│   │   ├── DynamicForm.tsx
│   │   ├── FormSection.tsx
│   │   └── FormField.tsx
│   ├── types/
│   │   └── form.ts
│   ├── page.tsx
│   └── layout.tsx
├── public/
├── styles/
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
