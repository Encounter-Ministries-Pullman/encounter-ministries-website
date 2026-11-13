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

## Planning launch work

Use the [launch project](https://github.com/orgs/Encounter-Ministries-Pullman/projects/1)
to track goals and features needed before launch. To create an issue, choose
**Launch feature or goal** on the repository's **New issue** page. Enter the issue
title and complete the Description and Definition of Done fields. The form is
configured to add the issue to the launch project when the author has write
access to that project. Otherwise, a project writer can add it manually or
configure the project's auto-add workflow.

Use a parent issue for a larger goal and separate sub-issues for its features or
tasks. Create each issue with the form, then on the parent issue choose the
dropdown beside **Create sub-issue** and select **Add existing issue**. Add both
parent and child issues to the project; linking them does not automatically add
them to a project. A child can itself have sub-issues. Record measurable
completion criteria on each issue, and close a parent when its own criteria are
met, not just because its children are closed.

### Suggested project views

Project administrators can create and save these views using the view options:

- **Launch board:** Use the board layout with **Status** as the column field.
  Suggested statuses are Backlog, Ready, In progress, Review, and Done. Drag a
  card to change its status. Use existing status options where appropriate;
  adding or renaming options affects every view using that field.
- **Goals and features:** Use the table layout, show **Parent issue** and
  **Sub-issue progress**, and group by **Parent issue** to see related work.
- **Launch backlog:** Use a table with Status, Assignees, and Parent issue
  visible; group by Status to review unassigned or upcoming work.

Save changes to each view for the team. If the project includes work unrelated
to launch, apply an agreed milestone, label, or project field and filter the
views to those launch items. See GitHub's guides for
[project views](https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/managing-your-views)
and [sub-issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues).

## Maintainers

Please contact the following people for any assistance with the church's codebase.

### Gabriel Shirey

**Position**: Encounter Ministries Media Technician  
**Email**: gabrieldainshirey@gmail.com  

### Joshua Chadwick

**Position**: Encounter Ministries Media Technician  
**Email**: jchadwick423@gmail.com  
