# TEST DA FASTERS

> [!IMPORTANT]
> Os arquivos .env não deveriam estar no repositório, mas para simplificar, deixei-os aqui

:writing_hand:Para resolver o desafio decidi aplicar arquitetura limpa, arquitetura hexagonal, que na minha opinião é mais uma arquitetura de portas e adaptadores.

Entender que no final das contas a arquitetura hexagonal tem muitas formas de ser aplicada e depende muito da visão do arquiteto. 

- [Como você executa o projeto](#como-você-executa-o-projeto)
- [Abordagem](#abordagem)
- [Considerações](#considerações)
- [Swagger](#swagger)


## Como você executa o projeto

1. Execute o contêiner postgres, na raiz do projeto (docker-compose.yml)


```bash
docker-compose up -d
```
> [!WARNING]
> Execute apenas uma vez se as migrações do banco de dados não forem concluídas, 

2. Quando o contêiner postgres estiver instalado e funcionando corretamente, execute as migrações do prisma, também na raiz do projeto.

```bash
npx prisma migrate dev 
```

3. Por fim, execute o aplicativo dockerfile em Node js, na mesma network que os aplicativos docker compose.

```bash
docker build -t node-app .
```
```bash
docker run -p 3000:3000 --name node-app-fasters --network test-da-fasters_default -d node-app
```

## Abordagem

Criei uma arquitetura hexagonal, onde as coisas mais importantes para o foco do negócio estão na pasta “core”. 

Tente deixar o código o mais agnóstico possível, já que você nunca chegará a 100%, na minha perspectiva. A ideia é que o código não dependa de frameworks, bancos de dados, etc.
 
Respeitando contratos de interface, injeção de dependência e inversão de dependência para promover o desacoplamento de camadas que vão desde domian (menor acoplamento) e infraestrutura com maior acoplamento (pasta com uso do framework)

## Considerações

- Criei diferentes módulos, como database, utils, etc. Minha justificativa é porque acho que módulos são algo que pode mudar e não é algo específico do negócio.

- É claro que outro mecanismo de pasta pode ser aplicado com um nível de abstração ainda maior com o uso de mais genéricos "<T>" , por exemplo.

- Poderia ter aplicado mais testes nos controllers, service porem eu apliquei os testes na capa do negocio(use cases).


## Como você executa o projeto

* http://localhost:3000/api-docs

