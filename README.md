# graphql-search

[![License](https://img.shields.io/badge/License-BSD%202--Clause-blue.svg)](LICENSE)  
[![Dependency Status](https://david-dm.org/dictybase-playground/graphql-search/develop.svg?style=flat-square)](https://david-dm.org/dictybase-playground/graphql-search/develop)
[![devDependency Status](https://david-dm.org/dictybase-playground/graphql-search/develop/dev-status.svg?style=flat-square)](https://david-dm.org/dictybase-playground/graphql-search/develop?type=dev)  
[![Technical debt](https://badgen.net/codeclimate/tech-debt/dictybase-playground/graphql-search)](https://codeclimate.com/github/dictybase-playground/graphql-search/trends/technical_debt)
[![Issues](https://badgen.net/codeclimate/issues/dictybase-playground/graphql-search)](https://codeclimate.com/github/dictybase-playground/graphql-search/issues)
[![Maintainability](https://badgen.net/codeclimate/maintainability/dictybase-playground/graphql-search)](https://codeclimate.com/github/dictybase-playground/graphql-search)  
![Issues](https://badgen.net/github/issues/dictybase-playground/graphql-search)
![Open Issues](https://badgen.net/github/open-issues/dictybase-playground/graphql-search)
![Closed Issues](https://badgen.net/github/closed-issues/dictybase-playground/graphql-search)
![Total PRS](https://badgen.net/github/prs/dictybase-playground/graphql-search)
![Open PRS](https://badgen.net/github/open-prs/dictybase-playground/graphql-search)
![Closed PRS](https://badgen.net/github/closed-prs/dictybase-playground/graphql-search)
![Merged PRS](https://badgen.net/github/merged-prs/dictybase-playground/graphql-search)  
![Commits](https://badgen.net/github/commits/dictybase-playground/graphql-search/main)
![Last commit](https://badgen.net/github/last-commit/dictybase-playground/graphql-search/main)
![Branches](https://badgen.net/github/branches/dictybase-playground/graphql-search)
![Tags](https://badgen.net/github/tags/dictybase-playground/graphql-search)
![GitHub repo size](https://img.shields.io/github/repo-size/dictybase-playground/graphql-search?style=plastic)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/dictybase-playground/graphql-search?style=plastic)
[![Lines of Code](https://badgen.net/codeclimate/loc/dictybase-playground/graphql-search)](https://codeclimate.com/github/dictybase-playground/graphql-search/code)  
[![Funding](https://badgen.net/badge/NIGMS/Rex%20L%20Chisholm,dictyBase/yellow?list=|)](https://projectreporter.nih.gov/project_info_description.cfm?aid=9476993)
[![Funding](https://badgen.net/badge/NIGMS/Rex%20L%20Chisholm,DSC/yellow?list=|)](https://projectreporter.nih.gov/project_info_description.cfm?aid=9438930)

Demo app to experiment with searching using GraphQL.

This has a working example of a dropdown menu that changes the URL and issues a GraphQL query upon selection. To fetch the
data, I opted to use `client.query` directly since it returns a promise. This lets us manually set loading/error states when
the query is being issued. My first thought was to use `useLazyQuery` and call the query that way, but that does not return a promise.
