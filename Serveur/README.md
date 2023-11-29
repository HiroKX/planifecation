Installation : 
```bash
npm install
```

Regenerer le client prisma :
```bash
npx prisma generate --schema ./prisma/schema.prisma
```


```bash
docker-compose up -d
npx prisma init
npx prisma migrate dev --name "migrationA" 
```
Puis :
```bash
npm start
```