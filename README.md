# CRM Imobiliário

Sistema de gestão para imobiliárias desenvolvido com React.

## 📁 Estrutura do Projeto

```
crm_imob/
├── components/          # Componentes reutilizáveis
│   ├── layout/         # Componentes de layout (Header, Sidebar, etc.)
│   └── ui/             # Componentes de interface (Button, Card, Input, etc.)
├── context/            # Contextos React (AuthContext, ThemeContext)
├── hooks/              # Custom hooks (userAuth, userFetch, userLocalStorage)
├── modules/            # Módulos de funcionalidades
│   ├── clientes/       # Módulo de clientes
│   ├── configuracoes/  # Módulo de configurações
│   ├── home/           # Módulo da página inicial
│   ├── login/          # Módulo de autenticação
│   └── processos/      # Módulo de processos
├── pages/              # Páginas principais da aplicação
├── router/             # Configuração de rotas
├── src/                # Recursos estáticos
│   └── assets/         # CSS, ícones, imagens
└── utils/              # Funções utilitárias (formatters, validators)
```

## 🏗️ Arquitetura

### Organização por Módulos

O projeto segue uma arquitetura modular onde cada funcionalidade possui seu próprio diretório dentro de `modules/`. Cada módulo deve conter:

- **Componentes**: Componentes específicos do módulo
- **Serviços**: Lógica de negócio e comunicação com APIs
- **Validações**: Regras de validação específicas (quando necessário)

**Exemplo de estrutura de módulo:**
```
modules/clientes/
├── ClienteForm.jsx        # Formulário de cliente
├── ClientesList.jsx       # Lista de clientes
├── ClientesProfile.jsx    # Perfil do cliente
└── clienteService.js      # Serviço de API para clientes
```

### Camadas da Aplicação

1. **Pages** (`pages/`): Páginas principais que compõem as rotas da aplicação
2. **Modules** (`modules/`): Lógica de negócio e componentes específicos de cada funcionalidade
3. **Components** (`components/`): Componentes reutilizáveis de UI e layout
4. **Hooks** (`hooks/`): Custom hooks para lógica compartilhada
5. **Context** (`context/`): Gerenciamento de estado global
6. **Utils** (`utils/`): Funções auxiliares e utilitários
7. **Router** (`router/`): Configuração de rotas da aplicação

## 📋 Boas Práticas de Implementação

### 1. Nomenclatura de Arquivos

- **Componentes React**: Use PascalCase (ex: `ClienteForm.jsx`, `Button.jsx`)
- **Serviços/Utils**: Use camelCase (ex: `clienteService.js`, `formatters.js`)
- **Hooks customizados**: Use camelCase com prefixo `use` (ex: `useAuth.js`, `useFetch.js`)
- **Contextos**: Use PascalCase com sufixo `Context` (ex: `AuthContext.jsx`)

### 2. Estrutura de Componentes

```jsx
// Exemplo de estrutura de componente
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { clienteService } from './clienteService';

export const ClienteForm = ({ clienteId, onSave }) => {
  // 1. Hooks de estado
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  // 2. Hooks de efeito
  useEffect(() => {
    // Lógica de inicialização
  }, []);

  // 3. Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica de submit
  };

  // 4. Render
  return (
    <form onSubmit={handleSubmit}>
      {/* JSX */}
    </form>
  );
};
```

### 3. Organização de Imports

Ordene os imports na seguinte ordem:

1. Bibliotecas externas (React, React Router, etc.)
2. Imports de componentes internos (`@/components/...`)
3. Imports de hooks (`@/hooks/...`)
4. Imports de contextos (`@/context/...`)
5. Imports de utils (`@/utils/...`)
6. Imports relativos (mesmo módulo)
7. Imports de tipos/interfaces (se TypeScript)

```jsx
// Exemplo
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import { clienteService } from './clienteService';
```

### 4. Serviços (Services)

Os serviços devem conter toda a lógica de comunicação com APIs e transformação de dados:

```javascript
// modules/clientes/clienteService.js
const API_BASE_URL = '/api/clientes';

export const clienteService = {
  // Listar todos
  async listar() {
    const response = await fetch(API_BASE_URL);
    return response.json();
  },

  // Buscar por ID
  async buscarPorId(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    return response.json();
  },

  // Criar
  async criar(dados) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    return response.json();
  },

  // Atualizar
  async atualizar(id, dados) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    return response.json();
  },

  // Deletar
  async deletar(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};
```

### 5. Custom Hooks

Crie hooks customizados para lógica reutilizável:

```javascript
// hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  
  return context;
};
```

### 6. Contextos

Use Context API para estado global:

```jsx
// context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    // Lógica de login
  };

  const logout = () => {
    // Lógica de logout
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
```

### 7. Formatação e Validação

Mantenha funções de formatação e validação em arquivos separados:

```javascript
// utils/formatters.js
export const formatters = {
  formatCurrency: (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  },

  formatDate: (date) => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
  },

  formatCPF: (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },
};
```

```javascript
// utils/validators.js
export const validators = {
  isEmail: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  isCPF: (cpf) => {
    // Lógica de validação de CPF
    return true;
  },

  isRequired: (value) => {
    return value && value.trim().length > 0;
  },
};
```

### 8. Componentes de UI

Crie componentes de UI reutilizáveis e consistentes:

```jsx
// components/ui/Button.jsx
import React from 'react';
import './Button.css'; // Se usar CSS modules

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick,
  disabled = false,
  type = 'button',
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
```

### 9. Tratamento de Erros

Sempre trate erros adequadamente:

```javascript
// Em serviços
try {
  const data = await clienteService.listar();
  return data;
} catch (error) {
  console.error('Erro ao listar clientes:', error);
  throw new Error('Não foi possível carregar os clientes');
}

// Em componentes
const [error, setError] = useState(null);

const handleSubmit = async () => {
  try {
    setLoading(true);
    setError(null);
    await clienteService.criar(formData);
    onSave?.();
  } catch (err) {
    setError(err.message || 'Erro ao salvar cliente');
  } finally {
    setLoading(false);
  }
};
```

### 10. Estados de Loading

Sempre forneça feedback visual durante operações assíncronas:

```jsx
{loading && <Spinner />}
{error && <ErrorMessage message={error} />}
```

### 11. Responsividade

Garanta que os componentes sejam responsivos:

- Use CSS Grid ou Flexbox para layouts
- Implemente breakpoints consistentes
- Teste em diferentes tamanhos de tela

### 12. Acessibilidade

- Use elementos semânticos HTML
- Adicione `aria-label` quando necessário
- Garanta navegação por teclado
- Mantenha contraste adequado de cores

## 🔧 Configuração de Rotas

As rotas devem ser configuradas em `router/AppRouters.jsx`:

```jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Home } from '@/pages/Home';
import { Clientes } from '@/pages/Clientes';
import { Processos } from '@/pages/Processos';
import { Configuracoes } from '@/pages/Configuracoes';
import { Login } from '@/pages/Login';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export const AppRouters = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/clientes"
        element={
          <PrivateRoute>
            <Clientes />
          </PrivateRoute>
        }
      />
      {/* Outras rotas */}
    </Routes>
  );
};
```

## 🎨 Estilização

- Use CSS Modules ou styled-components para estilos scoped
- Mantenha tokens de design em `src/assets/css/tokens.css`
- Estilos globais em `src/assets/css/global.css`
- Siga um design system consistente

## 📝 Convenções de Código

1. **Use const/let** ao invés de var
2. **Use arrow functions** para métodos e callbacks
3. **Use template literals** para strings complexas
4. **Desestruturação** quando apropriado
5. **Evite mutações diretas** de estado
6. **Use async/await** ao invés de Promises encadeadas
7. **Comente código complexo**, mas prefira código autoexplicativo

## 🚀 Próximos Passos

- [ ] Configurar ESLint e Prettier
- [ ] Adicionar testes unitários
- [ ] Implementar tratamento de erros global
- [ ] Adicionar loading states consistentes
- [ ] Documentar APIs e endpoints
- [ ] Configurar CI/CD

## 📚 Recursos

- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
