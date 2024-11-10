# Testing Guide

## Overview
This guide covers testing practices for our React application using Vitest and React Testing Library.

## Test Setup

### Configuration
```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
      ],
    },
  },
})
```

## Writing Tests

### Component Tests
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-primary')
  })

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-secondary')
  })
})
```

### Hook Tests
```tsx
import { renderHook, act } from '@testing-library/react'
import { useToast } from '@/components/ui/use-toast'

describe('useToast', () => {
  it('shows and dismisses toast', () => {
    const { result } = renderHook(() => useToast())
    
    act(() => {
      result.current.toast({
        title: 'Test Toast',
        description: 'Test Description'
      })
    })

    expect(result.current.toasts).toHaveLength(1)
  })
})
```

### Integration Tests
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { HabitCard } from '@/components/habits/HabitCard'

describe('HabitCard Integration', () => {
  it('completes a habit', async () => {
    const onComplete = vi.fn()
    render(
      <HabitCard 
        habit={{ id: '1', title: 'Test Habit' }}
        onComplete={onComplete}
      />
    )

    const completeButton = screen.getByRole('button', { name: /complete/i })
    await fireEvent.click(completeButton)

    expect(onComplete).toHaveBeenCalledWith('1')
  })
})
```

## Testing Categories

### Unit Tests
- Individual components
- Custom hooks
- Utility functions
- State management

### Integration Tests
- Component interactions
- Form submissions
- API calls
- State updates

### E2E Tests
- User flows
- Navigation
- Data persistence
- Authentication

## Best Practices

1. **Component Testing**
   - Test user interactions
   - Verify rendered content
   - Check accessibility
   - Test all variants

2. **Hook Testing**
   - Test state changes
   - Verify side effects
   - Test error cases
   - Check cleanup

3. **Integration Testing**
   - Test component combinations
   - Verify data flow
   - Test error boundaries
   - Check loading states

4. **Mocking**
   ```tsx
   import { vi } from 'vitest'
   
   // Mock API calls
   vi.mock('@/lib/api', () => ({
     api: {
       get: vi.fn(),
       post: vi.fn()
     }
   }))
   
   // Mock hooks
   vi.mock('@/hooks/useAuth', () => ({
     useAuth: () => ({
       user: { id: '1' },
       isAuthenticated: true
     })
   }))
   ```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run coverage

# Run specific test file
npm test -- src/components/ui/button.test.tsx
```

## Coverage Requirements

- Minimum coverage: 80%
- Critical paths: 90%
- UI components: 85%
- Utility functions: 100%

## Continuous Integration

Tests are automatically run in GitHub Actions:
- On pull requests
- On merge to main
- Nightly for all branches

## Debugging Tests

1. Use `screen.debug()` to view rendered output
2. Use `console.log` with `vi.spyOn(console, 'log')`
3. Use VS Code debugger with launch configuration
4. Check test coverage reports

---

For more details, check the [Vitest documentation](https://vitest.dev) and [Testing Library documentation](https://testing-library.com/docs/react-testing-library/intro/).