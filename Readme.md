# mmk.defs.gapi.auth2

MaulingMonKey's typescript definitions for Google's Auth2 API.

License: [Apache 2.0](LICENSE.txt)



# Documentation

See https://developers.google.com/identity/sign-in/web/reference



# Usage

## Install Via NuGet
<strike>Add [mmk.defs.gapi.auth2](https://www.nuget.org/packages/mmk.defs.gapi.auth2/) to your project via nuget.  Done!</strike>  **TODO:  Soon (tm)**

## Configure Google Signin API
```html
<html><head>
	<meta name="google-signin-client_id" content="[...].apps.googleusercontent.com">
	<script src="https://apis.google.com/js/platform.js" async defer></script>
	...
</head><body>
	...
</html>
```
## Profit


# TODO

- [ ] Properly test all exposed APIs for correctness
- [ ] Add advanced auth2 APIs from https://developers.google.com/identity/sign-in/web/reference#advanced
- [ ] Decide how to fill in documentation where Google doesn't explicitly
