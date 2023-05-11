# Linen.dev

## Requirements

- node >=16
- docker
- docker-compose

## Getting Started

```bash
# prepare environment variables
cp apps/web/.env.example .env
# generate secret
openssl rand -base64 32 # edit the .env file, update NEXTAUTH_SECRET key with the result
# export the envs into the shell
source .env

# install dependencies
yarn
# start local database
cd dev
docker-compose --profile app build
cd ..
# build dependencies
yarn turbo run build --filter web^...

## migrate database
cd packages/database
yarn migrate dev
cd ../..

# start the web
yarn dev
```

Only credentials sign-in method enabled by default. To setup github sign-in or magic link sign-in:
// TODO: steps to setup github signin and magic link

## (Optional) Local domain redirect testing

1. Ask for invite for ngrok account
2. Setup [ngrok](https://ngrok.io/)
3. pick subdomain i.e kam-test.ngrok.io
4. Update dev database to have the redirect url `update accounts set "redirectDomain"='kam-test.ngrok.io' where id = '9677cb41-033e-4c1a-9ae5-ef178606cad3';` - replace with your subdomain that you chose
5. run ngrok tunnel `ngrok http --region=us --hostname=kam-test.ngrok.io 3000`