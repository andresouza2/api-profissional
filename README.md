# API REST Documentation

## Visão Geral

Esta documentação descreve a API RESTful para gerenciamento de clientes, produtos, pedidos e itens de pedido.

**Base URL:** `https://api.exemplo.com/v1`

**Content-Type:** `application/json`

## Lista MVP da API

"Usuários autenticados podem gerenciar seus produtos e criar pedidos com cálculo automático de valor."

**AUTENTICAÇÃO**

- Usuário pode se cadastrar com email e senha
- Usuário pode se autenticar (login)
- Usuário autenticado pode acessar rotas protegidas

**USUÁRIO**

- Buscar dados do usuário autenticado (/me)

**PRODUTOS**

- Usuário autenticado pode cadastrar um produto
- Usuário pode listar produtos
- Usuário pode buscar um produto por ID
- Usuário autenticado pode editar seus próprios produtos
- Usuário autenticado pode deletar seus próprios produtos

**Pedidos (MVP REAL)**

- Usuário autenticado pode criar um pedido
- Pedido deve conter ao menos 1 produto
- Pedido deve calcular o valor total automaticamente
- Pedido inicia com status PENDING

---

## Autenticação

Todas as requisições devem incluir o header de autenticação:

```
Authorization: Bearer {token}
```

---

## Respostas Padrão

### Sucesso

| Código | Descrição                                                    |
| ------ | ------------------------------------------------------------ |
| 200    | OK - Requisição bem-sucedida                                 |
| 201    | Created - Recurso criado com sucesso                         |
| 204    | No Content - Requisição bem-sucedida sem conteúdo de retorno |

### Erros

| Código | Descrição                                        |
| ------ | ------------------------------------------------ |
| 400    | Bad Request - Dados inválidos                    |
| 401    | Unauthorized - Não autenticado                   |
| 403    | Forbidden - Sem permissão                        |
| 404    | Not Found - Recurso não encontrado               |
| 422    | Unprocessable Entity - Erro de validação         |
| 500    | Internal Server Error - Erro interno do servidor |

### Estrutura de Erro

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Descrição do erro",
    "details": []
  }
}
```

---

## Entidades

### Customer (Cliente)

| Campo      | Tipo     | Obrigatório | Descrição                |
| ---------- | -------- | ----------- | ------------------------ |
| id         | UUID     | Auto        | Identificador único      |
| name       | String   | Sim         | Nome completo do cliente |
| email      | String   | Sim         | E-mail (único)           |
| phone      | String   | Não         | Telefone de contato      |
| document   | String   | Sim         | CPF/CNPJ (único)         |
| address    | Object   | Não         | Endereço do cliente      |
| created_at | DateTime | Auto        | Data de criação          |
| updated_at | DateTime | Auto        | Data de atualização      |

**Objeto Address:**

| Campo        | Tipo   | Descrição   |
| ------------ | ------ | ----------- |
| street       | String | Logradouro  |
| number       | String | Número      |
| complement   | String | Complemento |
| neighborhood | String | Bairro      |
| city         | String | Cidade      |
| state        | String | Estado (UF) |
| zip_code     | String | CEP         |

---

### Product (Produto)

| Campo       | Tipo     | Obrigatório | Descrição                    |
| ----------- | -------- | ----------- | ---------------------------- |
| id          | UUID     | Auto        | Identificador único          |
| name        | String   | Sim         | Nome do produto              |
| description | String   | Não         | Descrição detalhada          |
| sku         | String   | Sim         | Código SKU (único)           |
| price       | Decimal  | Sim         | Preço unitário               |
| stock       | Integer  | Sim         | Quantidade em estoque        |
| currency    | String   | Sim         | Moeda                        |
| active      | Boolean  | Não         | Status ativo (default: true) |
| created_at  | DateTime | Auto        | Data de criação              |
| updated_at  | DateTime | Auto        | Data de atualização          |

---

### Order (Pedido)

| Campo       | Tipo     | Obrigatório | Descrição           |
| ----------- | -------- | ----------- | ------------------- |
| id          | UUID     | Auto        | Identificador único |
| customer_id | UUID     | Sim         | ID do cliente       |
| status      | Enum     | Auto        | Status do pedido    |
| subtotal    | Decimal  | Auto        | Subtotal dos itens  |
| discount    | Decimal  | Não         | Valor do desconto   |
| total       | Decimal  | Auto        | Valor total         |
| notes       | String   | Não         | Observações         |
| created_at  | DateTime | Auto        | Data de criação     |
| updated_at  | DateTime | Auto        | Data de atualização |

**Status do Pedido:**

- `PENDING` - Pendente
- `CONFIRMED` - Confirmado
- `PROCESSING` - Em processamento
- `SHIPPED` - Enviado
- `DELIVERED` - Entregue
- `CANCELLED` - Cancelado

---

### OrderItem (Item do Pedido)

| Campo       | Tipo     | Obrigatório | Descrição                            |
| ----------- | -------- | ----------- | ------------------------------------ |
| id          | UUID     | Auto        | Identificador único                  |
| order_id    | UUID     | Sim         | ID do pedido                         |
| product_id  | UUID     | Sim         | ID do produto                        |
| quantity    | Integer  | Sim         | Quantidade                           |
| unit_price  | Decimal  | Auto        | Preço unitário no momento            |
| total_price | Decimal  | Auto        | Preço total (quantity \* unit_price) |
| created_at  | DateTime | Auto        | Data de criação                      |

---

## Endpoints

### Customer

#### Listar Clientes

```
GET /customers
```

**Query Parameters:**

| Parâmetro | Tipo    | Descrição                                |
| --------- | ------- | ---------------------------------------- |
| page      | Integer | Número da página (default: 1)            |
| limit     | Integer | Itens por página (default: 20, max: 100) |
| search    | String  | Busca por nome ou email                  |
| sort      | String  | Campo para ordenação                     |
| order     | String  | Direção: asc ou desc                     |

**Response 200:**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "João Silva",
      "email": "joao@email.com",
      "phone": "(11) 99999-9999",
      "document": "123.456.789-00",
      "address": {
        "street": "Rua das Flores",
        "number": "123",
        "complement": "Apto 45",
        "neighborhood": "Centro",
        "city": "São Paulo",
        "state": "SP",
        "zip_code": "01234-567"
      },
      "created_at": "2025-01-10T10:00:00Z",
      "updated_at": "2025-01-10T10:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 20,
    "total": 150,
    "total_pages": 8
  }
}
```

---

#### Buscar Cliente por ID

```
GET /customers/{id}
```

**Response 200:**

```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "(11) 99999-9999",
    "document": "123.456.789-00",
    "address": {
      "street": "Rua das Flores",
      "number": "123",
      "complement": "Apto 45",
      "neighborhood": "Centro",
      "city": "São Paulo",
      "state": "SP",
      "zip_code": "01234-567"
    },
    "created_at": "2025-01-10T10:00:00Z",
    "updated_at": "2025-01-10T10:00:00Z"
  }
}
```

---

#### Criar Cliente

```
POST /customers
```

**Request Body:**

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999",
  "document": "123.456.789-00",
  "address": {
    "street": "Rua das Flores",
    "number": "123",
    "complement": "Apto 45",
    "neighborhood": "Centro",
    "city": "São Paulo",
    "state": "SP",
    "zip_code": "01234-567"
  }
}
```

**Response 201:**

```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "(11) 99999-9999",
    "document": "123.456.789-00",
    "address": {
      "street": "Rua das Flores",
      "number": "123",
      "complement": "Apto 45",
      "neighborhood": "Centro",
      "city": "São Paulo",
      "state": "SP",
      "zip_code": "01234-567"
    },
    "created_at": "2025-01-10T10:00:00Z",
    "updated_at": "2025-01-10T10:00:00Z"
  }
}
```

---

#### Atualizar Cliente

```
PUT /customers/{id}
```

**Request Body:**

```json
{
  "name": "João Silva Santos",
  "email": "joao.santos@email.com",
  "phone": "(11) 88888-8888"
}
```

**Response 200:**

```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva Santos",
    "email": "joao.santos@email.com",
    "phone": "(11) 88888-8888",
    "document": "123.456.789-00",
    "address": {
      "street": "Rua das Flores",
      "number": "123",
      "complement": "Apto 45",
      "neighborhood": "Centro",
      "city": "São Paulo",
      "state": "SP",
      "zip_code": "01234-567"
    },
    "created_at": "2025-01-10T10:00:00Z",
    "updated_at": "2025-01-10T12:00:00Z"
  }
}
```

---

#### Excluir Cliente

```
DELETE /customers/{id}
```

**Response 204:** No Content

---

### Product

#### Listar Produtos

```
GET /products
```

**Query Parameters:**

| Parâmetro | Tipo    | Descrição                                |
| --------- | ------- | ---------------------------------------- |
| page      | Integer | Número da página (default: 1)            |
| limit     | Integer | Itens por página (default: 20, max: 100) |
| search    | String  | Busca por nome ou SKU                    |
| active    | Boolean | Filtrar por status                       |
| min_price | Decimal | Preço mínimo                             |
| max_price | Decimal | Preço máximo                             |
| sort      | String  | Campo para ordenação                     |
| order     | String  | Direção: asc ou desc                     |

**Response 200:**

```json
{
  "data": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "name": "Notebook Dell Inspiron",
      "description": "Notebook Dell Inspiron 15, 8GB RAM, 256GB SSD",
      "sku": "NOTE-DELL-001",
      "price": 3499.99,
      "stock": 25,
      "active": true,
      "created_at": "2025-01-08T14:30:00Z",
      "updated_at": "2025-01-08T14:30:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 20,
    "total": 85,
    "total_pages": 5
  }
}
```

---

#### Buscar Produto por ID

```
GET /products/{id}
```

**Response 200:**

```json
{
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "name": "Notebook Dell Inspiron",
    "description": "Notebook Dell Inspiron 15, 8GB RAM, 256GB SSD",
    "sku": "NOTE-DELL-001",
    "price": 3499.99,
    "stock": 25,
    "active": true,
    "created_at": "2025-01-08T14:30:00Z",
    "updated_at": "2025-01-08T14:30:00Z"
  }
}
```

---

#### Criar Produto

```
POST /products
```

**Request Body:**

```json
{
  "name": "Notebook Dell Inspiron",
  "description": "Notebook Dell Inspiron 15, 8GB RAM, 256GB SSD",
  "sku": "NOTE-DELL-001",
  "price": 3499.99,
  "stock": 25,
  "active": true
}
```

**Response 201:**

```json
{
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "name": "Notebook Dell Inspiron",
    "description": "Notebook Dell Inspiron 15, 8GB RAM, 256GB SSD",
    "sku": "NOTE-DELL-001",
    "price": 3499.99,
    "stock": 25,
    "active": true,
    "created_at": "2025-01-08T14:30:00Z",
    "updated_at": "2025-01-08T14:30:00Z"
  }
}
```

---

#### Atualizar Produto

```
PUT /products/{id}
```

**Request Body:**

```json
{
  "name": "Notebook Dell Inspiron 15",
  "price": 3299.99,
  "stock": 30
}
```

**Response 200:**

```json
{
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "name": "Notebook Dell Inspiron 15",
    "description": "Notebook Dell Inspiron 15, 8GB RAM, 256GB SSD",
    "sku": "NOTE-DELL-001",
    "price": 3299.99,
    "stock": 30,
    "active": true,
    "created_at": "2025-01-08T14:30:00Z",
    "updated_at": "2025-01-10T09:00:00Z"
  }
}
```

---

#### Excluir Produto

```
DELETE /products/{id}
```

**Response 204:** No Content

---

### Order

#### Listar Pedidos

```
GET /orders
```

**Query Parameters:**

| Parâmetro   | Tipo    | Descrição                                |
| ----------- | ------- | ---------------------------------------- |
| page        | Integer | Número da página (default: 1)            |
| limit       | Integer | Itens por página (default: 20, max: 100) |
| customer_id | UUID    | Filtrar por cliente                      |
| status      | String  | Filtrar por status                       |
| start_date  | Date    | Data inicial (YYYY-MM-DD)                |
| end_date    | Date    | Data final (YYYY-MM-DD)                  |
| sort        | String  | Campo para ordenação                     |
| order       | String  | Direção: asc ou desc                     |

**Response 200:**

```json
{
  "data": [
    {
      "id": "770e8400-e29b-41d4-a716-446655440002",
      "customer_id": "550e8400-e29b-41d4-a716-446655440000",
      "customer": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "João Silva",
        "email": "joao@email.com"
      },
      "status": "CONFIRMED",
      "subtotal": 3499.99,
      "discount": 100.0,
      "total": 3399.99,
      "notes": "Entregar no período da manhã",
      "items_count": 1,
      "created_at": "2025-01-10T15:00:00Z",
      "updated_at": "2025-01-10T15:30:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 20,
    "total": 342,
    "total_pages": 18
  }
}
```

---

#### Buscar Pedido por ID

```
GET /orders/{id}
```

**Response 200:**

```json
{
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "customer_id": "550e8400-e29b-41d4-a716-446655440000",
    "customer": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "João Silva",
      "email": "joao@email.com",
      "phone": "(11) 99999-9999"
    },
    "status": "CONFIRMED",
    "subtotal": 3499.99,
    "discount": 100.0,
    "total": 3399.99,
    "notes": "Entregar no período da manhã",
    "items": [
      {
        "id": "880e8400-e29b-41d4-a716-446655440003",
        "product_id": "660e8400-e29b-41d4-a716-446655440001",
        "product": {
          "id": "660e8400-e29b-41d4-a716-446655440001",
          "name": "Notebook Dell Inspiron",
          "sku": "NOTE-DELL-001"
        },
        "quantity": 1,
        "unit_price": 3499.99,
        "total_price": 3499.99,
        "created_at": "2025-01-10T15:00:00Z"
      }
    ],
    "created_at": "2025-01-10T15:00:00Z",
    "updated_at": "2025-01-10T15:30:00Z"
  }
}
```

---

#### Criar Pedido

```
POST /orders
```

**Request Body:**

```json
{
  "customer_id": "550e8400-e29b-41d4-a716-446655440000",
  "discount": 100.0,
  "notes": "Entregar no período da manhã",
  "items": [
    {
      "product_id": "660e8400-e29b-41d4-a716-446655440001",
      "quantity": 1
    },
    {
      "product_id": "660e8400-e29b-41d4-a716-446655440099",
      "quantity": 2
    }
  ]
}
```

**Response 201:**

```json
{
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "customer_id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "PENDING",
    "subtotal": 4299.97,
    "discount": 100.0,
    "total": 4199.97,
    "notes": "Entregar no período da manhã",
    "items": [
      {
        "id": "880e8400-e29b-41d4-a716-446655440003",
        "product_id": "660e8400-e29b-41d4-a716-446655440001",
        "quantity": 1,
        "unit_price": 3499.99,
        "total_price": 3499.99,
        "created_at": "2025-01-10T15:00:00Z"
      },
      {
        "id": "880e8400-e29b-41d4-a716-446655440004",
        "product_id": "660e8400-e29b-41d4-a716-446655440099",
        "quantity": 2,
        "unit_price": 399.99,
        "total_price": 799.98,
        "created_at": "2025-01-10T15:00:00Z"
      }
    ],
    "created_at": "2025-01-10T15:00:00Z",
    "updated_at": "2025-01-10T15:00:00Z"
  }
}
```

---

#### Atualizar Pedido

```
PUT /orders/{id}
```

**Request Body:**

```json
{
  "status": "CONFIRMED",
  "discount": 150.0,
  "notes": "Cliente VIP - prioridade na entrega"
}
```

**Response 200:**

```json
{
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "customer_id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "CONFIRMED",
    "subtotal": 4299.97,
    "discount": 150.0,
    "total": 4149.97,
    "notes": "Cliente VIP - prioridade na entrega",
    "created_at": "2025-01-10T15:00:00Z",
    "updated_at": "2025-01-10T16:00:00Z"
  }
}
```

---

#### Excluir Pedido

```
DELETE /orders/{id}
```

**Response 204:** No Content

> **Nota:** Pedidos só podem ser excluídos se estiverem com status `PENDING` ou `CANCELLED`.

---

### OrderItem

#### Listar Itens de um Pedido

```
GET /orders/{order_id}/items
```

**Response 200:**

```json
{
  "data": [
    {
      "id": "880e8400-e29b-41d4-a716-446655440003",
      "order_id": "770e8400-e29b-41d4-a716-446655440002",
      "product_id": "660e8400-e29b-41d4-a716-446655440001",
      "product": {
        "id": "660e8400-e29b-41d4-a716-446655440001",
        "name": "Notebook Dell Inspiron",
        "sku": "NOTE-DELL-001"
      },
      "quantity": 1,
      "unit_price": 3499.99,
      "total_price": 3499.99,
      "created_at": "2025-01-10T15:00:00Z"
    }
  ]
}
```

---

#### Buscar Item por ID

```
GET /orders/{order_id}/items/{id}
```

**Response 200:**

```json
{
  "data": {
    "id": "880e8400-e29b-41d4-a716-446655440003",
    "order_id": "770e8400-e29b-41d4-a716-446655440002",
    "product_id": "660e8400-e29b-41d4-a716-446655440001",
    "product": {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "name": "Notebook Dell Inspiron",
      "sku": "NOTE-DELL-001",
      "price": 3499.99
    },
    "quantity": 1,
    "unit_price": 3499.99,
    "total_price": 3499.99,
    "created_at": "2025-01-10T15:00:00Z"
  }
}
```

---

#### Adicionar Item ao Pedido

```
POST /orders/{order_id}/items
```

**Request Body:**

```json
{
  "product_id": "660e8400-e29b-41d4-a716-446655440050",
  "quantity": 3
}
```

**Response 201:**

```json
{
  "data": {
    "id": "880e8400-e29b-41d4-a716-446655440005",
    "order_id": "770e8400-e29b-41d4-a716-446655440002",
    "product_id": "660e8400-e29b-41d4-a716-446655440050",
    "quantity": 3,
    "unit_price": 199.99,
    "total_price": 599.97,
    "created_at": "2025-01-10T16:30:00Z"
  }
}
```

---

#### Atualizar Item do Pedido

```
PUT /orders/{order_id}/items/{id}
```

**Request Body:**

```json
{
  "quantity": 5
}
```

**Response 200:**

```json
{
  "data": {
    "id": "880e8400-e29b-41d4-a716-446655440005",
    "order_id": "770e8400-e29b-41d4-a716-446655440002",
    "product_id": "660e8400-e29b-41d4-a716-446655440050",
    "quantity": 5,
    "unit_price": 199.99,
    "total_price": 999.95,
    "created_at": "2025-01-10T16:30:00Z"
  }
}
```

---

#### Remover Item do Pedido

```
DELETE /orders/{order_id}/items/{id}
```

**Response 204:** No Content

---

## Regras de Negócio

1. **Customer:** O campo `email` e `document` devem ser únicos no sistema.

2. **Product:** O campo `sku` deve ser único. Produtos com `stock = 0` não podem ser adicionados a novos pedidos.

3. **Order:** O campo `subtotal` é calculado automaticamente com base nos itens. O campo `total` é calculado como `subtotal - discount`. Pedidos só podem ser excluídos nos status `PENDING` ou `CANCELLED`.

4. **OrderItem:** O campo `unit_price` é capturado do produto no momento da criação. O campo `total_price` é calculado como `quantity * unit_price`. Ao adicionar/atualizar/remover itens, o `subtotal` e `total` do pedido são recalculados automaticamente.

---

## Versionamento

A API utiliza versionamento via URL. A versão atual é `v1`.

Exemplo: `https://api.exemplo.com/v1/customers`

---

## Rate Limiting

| Plano | Requisições/minuto |
| ----- | ------------------ |
| Free  | 60                 |
| Basic | 300                |
| Pro   | 1000               |

Headers de resposta:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1704895200
```

---

## Changelog

| Versão | Data       | Descrição             |
| ------ | ---------- | --------------------- |
| 1.0.0  | 2025-01-13 | Versão inicial da API |
