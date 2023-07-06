# Workshop structure

On this file you'll find a list of useful resources to be used during the workshop.

## Data Sources

For this section we will install an `npm` package called `gatsby-transformer-json`.

To install it, run:

```bash
yarn add gatsby-transformer-json
```

### Product schema

This is an example schema for our product.

```typescript
type Product = {
  __typename: "Product"; // Field required for the workshop
  name: string; // Field required for the workshop
  slug: string; // Field required for the workshop
  shortDescription: string;
  isInStock: boolean;
};
```

## FrontEgg

Once our application is up and running we would like to have our users login to the system and have them identified on our backend
​
By the end of this tutorial we will have

- A working login page
- A working logout button
- A working user profile
- A working user management page
  ​

## Prerequisites

- [ ] An account opened on the frontegg platform (https://portal.frontegg.com)
- [ ] Onboarding completed and pending on the frontegg integration page
- [ ] Setting the application URL in the frontegg portal to http://localhost:8000
      ​

## Steps for the integration

### 1. Install the frontegg package

```shell
npm i @frontegg/react react-router-dom
```

​

### 2. Add the frontegg provider

Create a file called `gatsby-browser.tsx` in the root of your project and add the following code

```typescript
import React from "react";
import { navigate } from "gatsby";
import { FronteggProvider } from "@frontegg/react";
export const wrapRootElement = ({ element }) => {
  return (
    <FronteggProvider
      contextOptions={{
        baseUrl: YOUR_BASE_URL,
        clientId: YOUR_CLIENT_ID,
      }}
      history={{
        push: (path) => navigate(path),
        replace: (path) => navigate(path, { replace: true }),
      }}
      hostedLoginBox={true}
      authOptions={{
        keepSessionAlive: true,
      }}
    >
      {element}
    </FronteggProvider>
  );
};
```

​
**_Replace the `YOUR_BASE_URL` and the `YOUR_CLIENT_ID` with the relevant parameters from the frontegg portal_**
​
`YOUR_BASE_URL` is available from the [domains page](https://portal.frontegg.com/development/settings/domains) (The Frontegg domain)
​
`YOUR_CLIENT_ID` is available from the [Environment settings](https://portal.frontegg.com/development/settings/general) (The Frontegg client id)
​
Under `gatsby-config.js`, add the following:

```javascript
trailingSlash: "never";
```

​

> If your application is running, stop it using CTRL+C and restart it using `yarn start`
> ​

### 3. Prepare the application for oauth

Under the pages folder, create an empty page called oauth/callback.tsx
​
Great! Our application is now ready for login!
Let's get this rolling!
​

### 4. Add the login button and redirect

Under the src/components/UserLogin/src/UserLogin.tsx replace the contents of the file with the following:

```tsx
import userIcon from "../../../images/user.svg";
import * as styles from "./UserLogin.module.scss";
import {
  useAuthUserOrNull,
  useIsAuthenticated,
  useLoginWithRedirect,
  AdminPortal,
  ContextHolder,
  AuthorizedContent,
} from "@frontegg/react";
import { useState } from "react";
const UserLogin = () => {
  const loginWithRedirect = useLoginWithRedirect();
  const user = useAuthUserOrNull();
  const isAuthenticated = useIsAuthenticated();
  const [showUserMenu, setsShowUserMenu] = useState(false);

  const MenuDivider = () => (
    <div style={{ width: "100%", backgroundColor: "black", height: "1px" }} />
  );
  return (
    <>
      {showUserMenu && (
        <div
          style={{
            width: "190px",
            border: "solid",
            position: "absolute",
            top: "70px",
            right: "66px",
            background: "white",
          }}
        >
          {isAuthenticated ? (
            <>
              <div style={{ padding: "10px" }}>
                {`You are logged in as ${user?.name}`}
              </div>
              <MenuDivider />
              <div style={{ padding: "10px" }}>{"Logout"}</div>
              <MenuDivider />
              <div style={{ padding: "10px" }}>{"Open Account Settings"}</div>
            </>
          ) : (
            <div
              onClick={() => loginWithRedirect()}
              style={{ padding: "10px" }}
            >
              {"Login"}
            </div>
          )}
        </div>
      )}
      <a
        onClick={() => setsShowUserMenu((prev) => !prev)}
        className={styles.userLogin}
      >
        <img className={styles.image} src={userIcon} alt="Login" />
      </a>
    </>
  );
};

export default UserLogin;
```

Yay! Your application should have now an active and functioning login button!
​

### 5. Add the logout button

Under the src/components/UserLogin/src/UserLogin.tsx add the following click handler to the `UserLogin` class:

```tsx
const logout = () => {
  const baseUrl = ContextHolder.getContext().baseUrl;
  window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
};
```

​
And add the matching handler on the logout button:

```tsx
<div onClick={() => logout()} style={{ padding: "10px" }}>
  {"Logout"}
</div>
```

​
Yay! Your application now have a logout capability!
​

### 6. Showing the account settings page

Now, that our users can login and logout, let's allow them to control their profile and security.
Under the src/components/UserLogin/src/UserLogin.tsx add the following admin panel handler to the `UserLogin` class:

```tsx
const openAccountSettings = () => {
  AdminPortal.show();
};
```

​
And add the matching handler on the user profile button:

```tsx
<div style={{ padding: "10px" }} onClick={() => openAccountSettings()}>
  {"Open Account Settings"}
</div>
```

Yay! Now your users have the ability to change their own profile, password, onboard MFA and more.
They can even invite another user to collaborate with them on the specific account!
​

### 7. Spicing things up with authorization

Now that we have a working login and logout, let's add some authorization to our application.
Let's add menu item that can be visible only by users with an `admin` role
​
Under the src/components/UserLogin/src/UserLogin.tsx add the following menu item after the account settings menu:

```tsx
<AuthorizedContent requiredRoles={["admin"]}>
  <div style={{ padding: "10px" }} onClick={() => openAccountSettings()}>
    {"Some serious admin stuff"}
  </div>
</AuthorizedContent>
```

​
Now only users with Authorized roles will be able to see this menu item.
