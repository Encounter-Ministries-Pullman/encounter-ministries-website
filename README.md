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

Create and preview a production build with:

```sh
npm run build
npm run preview
```

The app has Home, About, and Connect pages. The existing `about.html` and `connect.html` URLs are preserved as React entry points. Shared layouts and content blocks live in `src/components`, with route-specific content in `src/pages`.

The prayer and connect forms currently provide browser-side validation only. Connect a form service or backend before expecting submissions to reach church staff.

## Maintainers

Please contact the following people for any assistance with the church's codebase.

### Gabriel Shirey

**Position**: Encounter Ministries Media Technician  
**Email**: gabrieldainshirey@gmail.com  

### Joshua Chadwick

**Position**: Encounter Ministries Media Technician  
**Email**: jchadwick423@gmail.com  

