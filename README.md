# application-sdk

[![CodeFactor](https://www.codefactor.io/repository/github/ecomplus/application-sdk/badge)](https://www.codefactor.io/repository/github/ecomplus/application-sdk)
[![npm version](https://img.shields.io/npm/v/@ecomplus/application-sdk.svg)](https://www.npmjs.org/@ecomplus/application-sdk)
[![License MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Abstractions for apps authentication and methods to
[E-Com Plus Store API](https://developers.e-com.plus/docs/api/#/store/)
with NodeJS and Firestore/SQLite.

## Getting started

```bash
npm i --save @ecomplus/application-sdk --no-optional
```

## Environment variables

Variable            | Value
---                 | ---
`ECOM_AUTH_DB`      | `/dbs/ecom.sqlite3`
`ECOM_AUTH_UPDATE`  | `enabled`

- `ECOM_AUTH_DB` is **required** if you're not passing the DB filename
as argument of setup function;

- `ECOM_AUTH_UPDATE` is optional and enabled by default,
set it to `disabled` if you want to disable
the `update-tokens` automatic service.

## Documentation

> No documentation for methods yet (TODO)
