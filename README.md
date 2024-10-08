# SerraHome

## Desarrollo

Pasos para levantar el proyecto en desarrollo

1. Clonar el repositorio
2. Instalar dependencias

```
npm i
```

3. Renombrar .env.template a .env
4. Completar valores de variables de entorno.
5. Levantar la base de datos

```
docker compose up -d
```

6. Correr migracion y Generar Prisma Client

```
npx prisma migrate dev
npx prisma generate
```

7. Correr el proyecto

```
npm run dev
```
8. Navegador -> localhost:3000
9. Ejecutar [SEED](localhost:3000/api/seed) para poblar la BD con datos de
   prueba

## Comandos Prisma

- Ejecutar en la db los cambios hechos en el modelo

```
npx prisma migrate dev --name nombre_cambio
```

- Regenerar Prisma Client basado en el schema.prisma (Si se hacen cambios que
  afectan al codigo)

```
npx prisma generate
```
