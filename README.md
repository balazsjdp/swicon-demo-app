# 🌍 Swicon Country Demo

An Nx monorepo project demonstrating a **NestJS + Angular** app that:

- Fetches country data from a public **SOAP API**
- Exposes a **REST API** using NestJS
- Renders country flags and details in a responsive **Angular** frontend
- Uses **Tailwind CSS** for styling
- Implements client-side caching, skeleton loaders, and modern Angular 17+ features

---

## 🧱 Monorepo Structure (Nx)

```
apps/
  ├── frontend/         → Angular 19 standalone app
  └── backend/          → NestJS backend (REST + SOAP integration)
libs/
  └── shared/           → Shared types, interfaces
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the backend

```bash
nx serve backend
```

Runs the NestJS backend at `http://localhost:3000/api`
A Swagger docs page is available on `http://localhost:3000/api/docs`

### 3. Run the frontend

```bash
nx serve frontend
```

Runs the Angular frontend at `http://localhost:4200`  
The Angular app uses a proxy to communicate with the backend (no CORS issues).

---

## 🐳 Docker Setup

You can build and run the full stack using Docker and Docker Compose.

### 📦 1. Build the containers

```bash
docker-compose build
```

### 🚀 2. Start the services

```bash
docker-compose up
```

- Frontend: [http://localhost:4200](http://localhost:4200)
- Backend API: [http://localhost:3000/api](http://localhost:3000/api)
- Backend Docs: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

### 🛑 3. Stop and clean up

```bash
docker-compose down --volumes --remove-orphans
```

## 🌐 API Overview (NestJS)

Base URL: `http://localhost:3000/api`

| Endpoint             | Method | Description                               |
|----------------------|--------|-------------------------------------------|
| `/countries`         | GET    | List of countries (with flag, name, etc)  |
| `/countries/:code`   | GET    | Detailed info for a country               |

Uses the public SOAP API:  
> `http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL`

---

## 🎨 Frontend Features (Angular 19)

- Standalone components by default
- Tailwind CSS for responsive design (using a CDN for easier setup)
- Skeleton loading for the flag grid
- Detail page with capital, currency, phone code
- Route caching in the browser
- Uses `@for` / `@if` Angular control flow syntax
- Modern `inject(HttpClient)` DI pattern
- Proxy config: `proxy.conf.json` (to avoid CORS errors when running on localhost)

---

## 🛠 Technologies Used

### Backend

- NestJS v11
- node-soap
- CacheInterceptor
- Swagger (`@nestjs/swagger`) — **backend only**

### Frontend

- Angular 19+
- Standalone components + signals
- Tailwind CSS (via CDN or postcss)
- Vite (default Angular builder)
- RxJS (`toSignal`, `lastValueFrom`, `tap`)

---

## 🚀 Improvement Ideas

- 🧹 Create a backend cache interceptor
- 🗂️ Angular route resolver for preloading data
- 🌐 Add Search Functionality

