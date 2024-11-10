# API Integration Guide

## Overview
This guide explains how to interact with our backend API using React Query and Axios for data fetching.

## Base Configuration

### API Setup
```tsx
// src/lib/api.ts
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

## API Endpoints

### Habits
```tsx
// src/lib/api/habits.ts
import { api } from '../api'
import { Habit } from '@/types'

export const habitApi = {
  // Get all habits
  getAll: () => 
    api.get<Habit[]>('/habits'),

  // Get single habit
  getById: (id: string) => 
    api.get<Habit>(`/habits/${id}`),

  // Create new habit
  create: (habit: Omit<Habit, 'id'>) => 
    api.post<Habit>('/habits', habit),

  // Update habit
  update: (id: string, updates: Partial<Habit>) => 
    api.put<Habit>(`/habits/${id}`, updates),

  // Delete habit
  delete: (id: string) => 
    api.delete(`/habits/${id}`),

  // Toggle habit completion
  toggleCompletion: (id: string, date: string) => 
    api.post(`/habits/${id}/toggle`, { date })
}
```

### User Profile
```tsx
// src/lib/api/user.ts
import { api } from '../api'
import { User, UserSettings } from '@/types'

export const userApi = {
  // Get user profile
  getProfile: () => 
    api.get<User>('/user/profile'),

  // Update user profile
  updateProfile: (updates: Partial<User>) => 
    api.put<User>('/user/profile', updates),

  // Get user settings
  getSettings: () => 
    api.get<UserSettings>('/user/settings'),

  // Update user settings
  updateSettings: (settings: Partial<UserSettings>) => 
    api.put<UserSettings>('/user/settings', settings)
}
```

## React Query Integration

### Custom Hooks

#### Habits Hooks
```tsx
// src/hooks/useHabits.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { habitApi } from '@/lib/api/habits'

export function useHabits() {
  const queryClient = useQueryClient()

  const habits = useQuery({
    queryKey: ['habits'],
    queryFn: habitApi.getAll
  })

  const createHabit = useMutation({
    mutationFn: habitApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['habits'])
    }
  })

  const updateHabit = useMutation({
    mutationFn: ({ id, updates }) => habitApi.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries(['habits'])
    }
  })

  const deleteHabit = useMutation({
    mutationFn: habitApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['habits'])
    }
  })

  return {
    habits: habits.data,
    isLoading: habits.isLoading,
    createHabit,
    updateHabit,
    deleteHabit
  }
}
```

#### User Hooks
```tsx
// src/hooks/useUser.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from '@/lib/api/user'

export function useUser() {
  const queryClient = useQueryClient()

  const profile = useQuery({
    queryKey: ['user'],
    queryFn: userApi.getProfile
  })

  const updateProfile = useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(['user'])
    }
  })

  return {
    profile: profile.data,
    isLoading: profile.isLoading,
    updateProfile
  }
}
```

## Error Handling

```tsx
// src/lib/api/error.ts
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message)
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    // Handle structured API errors
    return error.message
  }
  
  // Handle unexpected errors
  return 'An unexpected error occurred'
}
```

## Usage Examples

### In Components
```tsx
function HabitList() {
  const { habits, isLoading, deleteHabit } = useHabits()
  const { toast } = useToast()

  const handleDelete = async (id: string) => {
    try {
      await deleteHabit.mutateAsync(id)
      toast({
        title: 'Success',
        description: 'Habit deleted successfully'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: handleApiError(error),
        variant: 'destructive'
      })
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      {habits?.map(habit => (
        <HabitCard 
          key={habit.id} 
          habit={habit}
          onDelete={() => handleDelete(habit.id)}
        />
      ))}
    </div>
  )
}
```

## Best Practices

1. **Error Handling**
   - Use structured error responses
   - Implement proper error boundaries
   - Show user-friendly error messages

2. **Data Caching**
   - Configure proper cache times
   - Implement optimistic updates
   - Handle stale data appropriately

3. **Authentication**
   - Secure all API requests
   - Handle token expiration
   - Implement proper logout

4. **Performance**
   - Implement request debouncing
   - Use proper cache invalidation
   - Monitor API response times

---

For more details, check:
- [React Query Documentation](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/docs/intro)