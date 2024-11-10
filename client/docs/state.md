# State Management Guide

## Overview
This document explains our state management approach using Zustand and React Query for different types of application state.

## State Categories

### Client State (Zustand)
Used for UI state and client-side application state.

### Server State (React Query)
Used for server data caching and synchronization.

## Zustand Store Structure

### Habit Store
```tsx
// src/store/habitStore.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Habit {
  id: string
  title: string
  description?: string
  frequency: 'daily' | 'weekly' | 'monthly'
  completedDates: string[]
}

interface HabitStore {
  habits: Habit[]
  selectedHabit: Habit | null
  isCreatingHabit: boolean
  
  // Actions
  setSelectedHabit: (habit: Habit | null) => void
  setIsCreatingHabit: (isCreating: boolean) => void
  addHabit: (habit: Habit) => void
  updateHabit: (id: string, updates: Partial<Habit>) => void
  deleteHabit: (id: string) => void
  toggleHabitCompletion: (id: string, date: string) => void
}

export const useHabitStore = create<HabitStore>()(
  devtools(
    persist(
      (set) => ({
        habits: [],
        selectedHabit: null,
        isCreatingHabit: false,

        setSelectedHabit: (habit) => set({ selectedHabit: habit }),
        setIsCreatingHabit: (isCreating) => set({ isCreatingHabit: isCreating }),
        addHabit: (habit) => 
          set((state) => ({ 
            habits: [...state.habits, habit] 
          })),
        updateHabit: (id, updates) =>
          set((state) => ({
            habits: state.habits.map((h) => 
              h.id === id ? { ...h, ...updates } : h
            )
          })),
        deleteHabit: (id) =>
          set((state) => ({
            habits: state.habits.filter((h) => h.id !== id)
          })),
        toggleHabitCompletion: (id, date) =>
          set((state) => ({
            habits: state.habits.map((h) => {
              if (h.id !== id) return h
              const dates = h.completedDates.includes(date)
                ? h.completedDates.filter((d) => d !== date)
                : [...h.completedDates, date]
              return { ...h, completedDates: dates }
            })
          }))
      }),
      {
        name: 'habit-storage'
      }
    )
  )
)
```

### UI Store
```tsx
// src/store/uiStore.ts
import { create } from 'zustand'

interface UIStore {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  
  // Actions
  toggleTheme: () => void
  toggleSidebar: () => void
  setSidebarOpen: (isOpen: boolean) => void
}

export const useUIStore = create<UIStore>((set) => ({
  theme: 'dark',
  sidebarOpen: true,
  
  toggleTheme: () => 
    set((state) => ({ 
      theme: state.theme === 'light' ? 'dark' : 'light' 
    })),
  toggleSidebar: () => 
    set((state) => ({ 
      sidebarOpen: !state.sidebarOpen 
    })),
  setSidebarOpen: (isOpen) => 
    set({ sidebarOpen: isOpen })
}))
```

## React Query Usage

### Fetching Habits
```tsx
// src/hooks/useHabits.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

export function useHabits() {
  const queryClient = useQueryClient()

  const habitsQuery = useQuery({
    queryKey: ['habits'],
    queryFn: () => api.get('/habits')
  })

  const createHabit = useMutation({
    mutationFn: (newHabit: Habit) => api.post('/habits', newHabit),
    onSuccess: () => {
      queryClient.invalidateQueries(['habits'])
    }
  })

  const updateHabit = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Habit> }) =>
      api.put(`/habits/${id}`, updates),
    onSuccess: () => {
      queryClient.invalidateQueries(['habits'])
    }
  })

  return {
    habits: habitsQuery.data,
    isLoading: habitsQuery.isLoading,
    createHabit,
    updateHabit
  }
}
```

## Best Practices

1. **State Organization**
   - Use Zustand for UI state
   - Use React Query for server state
   - Keep stores focused and small
   - Use TypeScript for type safety

2. **Performance**
   - Minimize store updates
   - Use selectors for derived state
   - Implement proper memoization
   - Monitor re-renders

3. **Data Flow**
   - Maintain unidirectional data flow
   - Keep state updates predictable
   - Handle side effects properly
   - Implement proper error handling

4. **Development Tools**
   - Use Redux DevTools with Zustand
   - Enable React Query DevTools
   - Implement proper logging
   - Monitor performance

## Examples

### Using Multiple Stores
```tsx
function HabitDashboard() {
  const { habits, selectedHabit } = useHabitStore()
  const { theme, sidebarOpen } = useUIStore()
  const { habits: serverHabits, isLoading } = useHabits()

  // Component logic
}
```

### Store Selectors
```tsx
const completedHabits = useHabitStore(
  (state) => state.habits.filter(
    (h) => h.completedDates.includes(today)
  )
)
```

---

For more details, check:
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Query Documentation](https://tanstack.com/query/latest)