# Stripe Node.js Library

The Playa Node library provides convenient access to the Playa API from applications written in JavaScript.

# Documentation

TODO

# Requirements

Node 18 or higher.

# Installation

```bash
npm install stripe --save
# or
yarn add stripe
```

# Usage

The package needs to be configured with your account's secret key, which is available in the Stripe Dashboard. Require it with the key's value:

```javascript
const Playa = require('playa').default();
const playa = new Playa({ apiVersion: '2023-01-01' });

// TODO: Put an example
```

Or using ES modules and async/await:

```javascript
import Playa from 'playa';
const playa = new Playa({ apiVersion: '2023-01-01' });

// TODO: Put an example
```

# Configuration

```javascript
const playa = Playa({ apiVersion: '2023-01-01' });
```

| Option     | Default  | Description |
| :--------- | :------- | :---------- |
| apiVersion | null     | Playa API version to be used. If not set the account's default version will be used. |

# Support

New features and bug fixes are released on the latest major version of the stripe package. If you are on an older major version, we recommend that you upgrade to the latest in order to use the new features and bug fixes including those for security vulnerabilities. Older major versions of the package will continue to be available for use, but will not be receiving any updates.
