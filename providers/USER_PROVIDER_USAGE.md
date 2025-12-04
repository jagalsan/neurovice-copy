# UserProvider - Documentación de Uso

## Descripción

`UserProvider` es un Context Provider de React que proporciona acceso global a la información del usuario autenticado en toda la aplicación.

## Características

- ✅ Acceso global al usuario autenticado desde cualquier componente
- ✅ Integración con React Query para caché y sincronización automática
- ✅ Estado de carga y autenticación
- ✅ Función de refetch para actualizar datos manualmente
- ✅ TypeScript completo con tipos seguros

## Uso Básico

### 1. El Provider ya está configurado en el layout principal

```tsx
// app/[locale]/layout.tsx
<QueryProvider>
  <UserProvider>
    {/* Tu aplicación */}
  </UserProvider>
</QueryProvider>
```

### 2. Usar el hook `useUser` en cualquier componente

```tsx
"use client";

import { useUser } from "@/providers/UserProvider";

export default function MyComponent() {
  const { user, isLoading, isAuthenticated } = useUser();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <div>No autenticado</div>;
  }

  return (
    <div>
      <h1>Hola, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Referral Code: {user.referralCode}</p>
    </div>
  );
}
```

## API del Hook `useUser`

### Retorna un objeto con:

```typescript
interface UserContextValue {
  user: MyUserResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refetch: () => void;
}
```

### Propiedades:

- **`user`**: Objeto con los datos del usuario o `null` si no está autenticado
  - `id: number`
  - `email: string`
  - `name: string`
  - `referralCode: string`
  - `facebookId: string | null`
  - `googleId: string | null`
  - `createdAt: string`
  - `secretContent: boolean`
  - `updatedAt: string`

- **`isLoading`**: `true` mientras se cargan los datos del usuario

- **`isAuthenticated`**: `true` si el usuario está autenticado

- **`refetch`**: Función para refrescar manualmente los datos del usuario

## Hooks Adicionales para Mutaciones

### Actualizar datos del usuario

```tsx
import { useUpdateUserData } from "@/lib/hooks/api/useUser";

export default function EditProfile() {
  const { user } = useUser();
  const updateData = useUpdateUserData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await updateData.mutateAsync({
      name: "Nuevo Nombre",
      lastName: "Nuevo Apellido",
      country: "España",
      city: "Madrid",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Formulario */}
      <button type="submit" disabled={updateData.isPending}>
        {updateData.isPending ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
```

### Actualizar teléfono

```tsx
import { useUpdateUserPhone } from "@/lib/hooks/api/useUser";

const updatePhone = useUpdateUserPhone();

await updatePhone.mutateAsync({
  phoneExt: "+34",
  phoneNumber: "612345678",
});
```

### Actualizar idioma

```tsx
import { useUpdateUserLanguage } from "@/lib/hooks/api/useUser";

const updateLanguage = useUpdateUserLanguage();

await updateLanguage.mutateAsync({
  language: "ES",
});
```

## Ejemplo Completo

```tsx
"use client";

import { useUser } from "@/providers/UserProvider";
import { useUpdateUserData } from "@/lib/hooks/api/useUser";
import { useState } from "react";

export default function ProfilePage() {
  const { user, isLoading, isAuthenticated, refetch } = useUser();
  const updateData = useUpdateUserData();
  const [name, setName] = useState("");

  if (isLoading) {
    return <div>Cargando perfil...</div>;
  }

  if (!isAuthenticated) {
    return <div>Debes iniciar sesión</div>;
  }

  const handleUpdate = async () => {
    try {
      await updateData.mutateAsync({
        name,
        lastName: user.name, // Mantener el apellido actual
      });
      // Los datos se actualizan automáticamente gracias a React Query
      alert("Perfil actualizado!");
    } catch (error) {
      alert("Error al actualizar");
    }
  };

  return (
    <div>
      <h1>Mi Perfil</h1>
      <p>Email: {user.email}</p>
      <p>Nombre actual: {user.name}</p>
      
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nuevo nombre"
      />
      
      <button onClick={handleUpdate} disabled={updateData.isPending}>
        {updateData.isPending ? "Actualizando..." : "Actualizar Nombre"}
      </button>
      
      <button onClick={() => refetch()}>
        Refrescar Datos
      </button>
    </div>
  );
}
```

## Notas Importantes

1. **El componente debe ser "use client"**: El hook `useUser` solo funciona en Client Components.

2. **Caché automático**: Los datos del usuario se cachean durante 5 minutos (staleTime).

3. **Sincronización automática**: Después de cualquier mutación (update), los datos se refrescan automáticamente.

4. **Manejo de errores**: Los hooks de mutación incluyen manejo de errores automático con logs en consola.

5. **Token requerido**: El usuario debe tener un token válido en `tokenManager` para que funcione.
