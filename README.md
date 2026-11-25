# Encounter Ministries Pullman Church Website

## Description

skills will ideally be able to update relevant portions of this website at-will through  
easy-to-use user interfaces.  
This repository contains the Encounter Ministries website for Pullman, WA. It uses Next.js App Router, React, and TypeScript. The About route fetches media on the Next.js server and passes image metadata to the interactive carousel and leadership components.

## Development

Requires Node.js 20.9+.

Create `.env.local` in the website project root with the local API and public CDN origins:

```env
MEDIA_API_ORIGIN=http://localhost:8000
NEXT_PUBLIC_MEDIA_ORIGIN=https://your-public-media-host
```

`MEDIA_API_ORIGIN` is server-only. `NEXT_PUBLIC_MEDIA_ORIGIN` is embedded into browser code at build time because the browser loads transformed images directly from the CDN.

```sh
npm install
npm run dev
```

Run the FastAPI service locally on port `8000` for About-page media. The browser does not call the API; Next fetches the media catalog from the server.

Build and run the production server with:

```sh
npm run build
npm run start
```

The app has Home, About, and Connect routes under `src/app`. Shared UI lives in `src/components`.

## Docker Deployment

`make deploy` builds a standalone Next.js image, saves it as `encountersite-<tag>.tar`, and copies it to `~/images` on the deployment host. Configure `NEXT_PUBLIC_MEDIA_ORIGIN` in `environments/.deploy.env` or enter it when prompted. This public CDN origin is a build argument; do not pass `MEDIA_API_ORIGIN` during the image build.

Load the website and API image archives on the host, then run both containers on a private Docker network. Keep the API un-published (do not use `-p` for it):

```sh
API_IMAGE_TAG=latest
SITE_IMAGE_TAG=latest

docker network create encounter-private
docker load -i "$HOME/images/encounterapi-${API_IMAGE_TAG}.tar"
docker load -i "$HOME/images/encountersite-${SITE_IMAGE_TAG}.tar"

docker run -d --name encounterapi --restart unless-stopped \
	--network encounter-private \
	--env-file /etc/encounter-api.env \
	"encounterapi:${API_IMAGE_TAG}"

docker run -d --name encountersite --restart unless-stopped \
	--network encounter-private \
	-p 3000:3000 \
	-e MEDIA_API_ORIGIN=http://encounterapi:8001 \
	"encountersite:${SITE_IMAGE_TAG}"
```

Route public traffic through the host's reverse proxy to port `3000`. The API remains reachable only by containers attached to `encounter-private`; CORS is not needed for the server-to-server media request.

The prayer and connect forms are connected to Formspree forms through a free tier subscription that is established with the Encounter Ministries media account. The Formspree service allows 50 form submissions per month before charging based on a per-request API rate. Make sure to monitor this in case requests get to be above 50 in one month which would cause us to need to either upgrade our account or implement our own custom solution which would take more effort and resources.

## Maintainers

Please contact the following people for any assistance with the church's codebase.

### Gabriel Shirey

**Position**: Encounter Ministries Media Technician  
**Email**: gabrieldainshirey@gmail.com  

### Joshua Chadwick

**Position**: Encounter Ministries Media Technician  
**Email**: jchadwick423@gmail.com  

