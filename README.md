# Encounter Ministries Pullman Church Website

## Description

skills will ideally be able to update relevant portions of this website at-will through  
easy-to-use user interfaces.  
This repository contains the website for Encounter Ministries Church in Pullman, WA. It is built with React and Vite, with shared components for repeated site sections and content.

## Development

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

The About page loads photo keys from the FastAPI media catalog and requests the image transforms from the media CDN. During development, the catalog defaults to `http://localhost:8000`; set `VITE_MEDIA_API_ORIGIN` to override it. Production Docker builds require that variable, and the API's `CORS_ORIGINS` must include the deployed website origin.

Create and preview a production build with:

```sh
npm run build
npm run preview
```

The app has Home, About, and Connect pages. Shared layouts and content blocks live in `src/components`, with route-specific content in `src/pages`.

The prayer and connect forms are connected to Formspree forms through a free tier subscription that is established with the Encounter Ministries media account. The Formspree service allows 50 form submissions per month before charging based on a per-request API rate. Make sure to monitor this in case requests get to be above 50 in one month which would cause us to need to either upgrade our account or implement our own custom solution which would take more effort and resources.

## Maintainers

Please contact the following people for any assistance with the church's codebase.

### Gabriel Shirey

**Position**: Encounter Ministries Media Technician  
**Email**: gabrieldainshirey@gmail.com  

### Joshua Chadwick

**Position**: Encounter Ministries Media Technician  
**Email**: jchadwick423@gmail.com  

