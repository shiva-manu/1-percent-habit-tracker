# Component Documentation

## Overview
This document provides detailed information about the reusable components in our application.

## Component Categories

### UI Components
- `Button`: Custom button component with variants
- `Card`: Container component for content
- `Chart`: Base chart component for data visualization
- `Checkbox`: Interactive checkbox component
- `Input`: Form input component
- `Toast`: Notification component
- `Toaster`: Toast container and manager
- `use-toast`: Hook for managing toasts

### Chart Components
- `RadarChartDemo`: Radar chart for habit visualization

## Usage Examples

### Button Component
```tsx
import { Button } from "@/components/ui/button"

// Primary button
<Button variant="default">Click me</Button>

// Secondary button
<Button variant="secondary">Secondary</Button>

// Destructive button
<Button variant="destructive">Delete</Button>
```

### Toast Usage
```tsx
import { useToast } from "@/components/ui/use-toast"

const { toast } = useToast()

// Show success toast
toast({
  title: "Success!",
  description: "Action completed successfully",
  variant: "default",
})
```

### Card Component
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
</Card>
```

### Chart Component
```tsx
import { RadarChartDemo } from "@/components/charts/RadarChartDemo"

<RadarChartDemo data={habitData} />
```

## Component Architecture

### Directory Structure
```
src/components/
├── ui/
│   ├── button.tsx
│   ├── card.tsx
│   ├── chart.tsx
│   ├── checkbox.tsx
│   ├── input.tsx
│   ├── toast.tsx
│   ├── toaster.tsx
│   └── use-toast.tsx
└── charts/
    └── RadarChartDemo.tsx
```

## Best Practices

1. **Component Usage**
   - Import components from the ui directory
   - Use TypeScript interfaces for props
   - Follow ShadcnUI patterns for consistency

2. **Styling**
   - Use Tailwind classes for styling
   - Follow the project's color scheme
   - Maintain responsive design principles

3. **Accessibility**
   - Include ARIA labels where needed
   - Ensure keyboard navigation works
   - Maintain proper contrast ratios

4. **State Management**
   - Use hooks for complex state
   - Keep components focused and small
   - Follow React best practices