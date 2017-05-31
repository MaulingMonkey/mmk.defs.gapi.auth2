// Copyright 2017 MaulingMonkey
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

declare namespace gapi.auth2 {
	/**
	 * Interface that represents the different configuration parameters for the gapi.auth2.init method.
	 *
	 * https://developers.google.com/identity/sign-in/web/reference#gapiauth2clientconfig
	 */
	interface ClientConfig {
		/** Required. The app's client ID, found and created in the Google Developers Console. */
		client_id:             string;

		/** The domains for which to create sign-in cookies. Either a URI, single_host_origin, or none. Defaults to single_host_origin if unspecified. */
		cookie_policy?:        string;

		/** The scopes to request, as a space-delimited string. Optional if fetch_basic_profile is not set to false. */
		scope?:                string;

		/** Fetch users' basic profile information when they sign in. Adds 'profile', 'email' and 'openid' to the requested scopes. True if unspecified. */
		fetch_basic_profile?:  boolean;

		/** The G Suite domain to which users must belong to sign in. This is susceptible to modification by clients, so be sure to verify the hosted domain property of the returned user. Use GoogleUser.getHostedDomain() on the client, and the hd claim in the ID Token on the server to verify the domain is what you expected. */
		hosted_domain?:        string;

		/** Used only for OpenID 2.0 client migration. Set to the value of the realm that you are currently using for OpenID 2.0, as described in OpenID 2.0 (Migration). */
		openid_realm?:         string;

		/** The UX mode to use for the sign-in flow. By default, it will open the consent flow in a popup. Valid values are popup and redirect. */
		ux_mode?:              "popup" | "redirect";

		/** If using ux_mode='redirect', this parameter allows you to override the default redirect_uri that will be used at the end of the consent flow. The default redirect_uri is the current URL stripped of query parameters and hash fragment. */
		redirect_uri?:         string;
	}



	/**
	 * Initializes the GoogleAuth object. You must call this method before calling gapi.auth2.GoogleAuth's methods.
	 *
	 * When you initialize the GoogleAuth object, you configure the object with your OAuth 2.0 client ID and any additional
	 * options you want to specify. Then, if the user has already signed in, the GoogleAuth object restores the user's sign-in
	 * state from the previous session.
	 *
	 * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams
	 */
	function init(clientConfig: ClientConfig);



	/**
	 * Interface that represents the different configuration parameters for the GoogleAuth.signIn(options) method.
	 *
	 * https://developers.google.com/identity/sign-in/web/reference#gapiauth2signinoptions
	 */
	interface SignInOptions {
		app_package_name?:     string;
		fetch_basic_profile?:  boolean;
		prompt?:               "consent" | "select_account" | "none";
		scope?:                string; // space-delimited
		ux_mode?:              "popup" | "redirect";
		redirect_uri?:         string;
	}



	interface BasicProfile {
		getId():         string;
		getName():       string;
		getGivenName():  string;
		getFamilyName(): string;
		getImageUrl():   string;
		getEmail():      string;
	}



	/**
	 * The response returned when calling GoogleUser.getAuthResponse(includeAuthorizationData) or
	 * GoogleUser.reloadAuthResponse() methods.
	 *
	 * https://developers.google.com/identity/sign-in/web/reference#gapiauth2authresponse
	 */
	interface AuthResponse {
		/** The Access Token granted. */                                            access_token:    string;
		/** The ID Token granted. */                                                id_token:        string;
		/** The scopes granted in the Access Token. */                              scope:           string;
		/** The number of seconds until the Access Token expires. */                expires_in:      number;
		/** The timestamp at which the user first granted the scopes requested. */  first_issued_at: number;
		/** The timestamp at which the Access Token will expire. */                 expires_at:      number;
	}



	interface GoogleUser {
		/**
		 * Get the user's unique ID string.
		 *
		 * Do not use the Google IDs returned by getId() to communicate the currently signed in user to your backend server. Instead,
		 * send ID tokens, which can be securely validated on the server.
		 *
		 * https://developers.google.com/identity/sign-in/web/reference#googleusergetid
		 */
		getId(): string;

		/**
		 * Returns true if the user is signed in.
		 *
		 * https://developers.google.com/identity/sign-in/web/reference#googleuserissignedin
		 */
		isSignedIn(): boolean;

		/**
		 * Get the user's G Suite domain if the user signed in with a G Suite account.
		 *
		 * https://developers.google.com/identity/sign-in/web/reference#googleusergethosteddomain
		 */
		getHostedDomain(): string;

		/**
		 * Get the scopes that the user granted as a space-delimited string.
		 *
		 * https://developers.google.com/identity/sign-in/web/reference#googleusergetgrantedscopes
		 */
		getGrantedScopes(): string;

		/**
		 * Get the user's basic profile information.
		 *
		 * Do not use the user's profile information to communicate the currently signed in user to your backend server. Instead, send
		 * ID tokens, which can be securely validated on the server.
		 *
		 * https://developers.google.com/identity/sign-in/web/reference#googleusergetbasicprofile
		 */
		getBasicProfile(): BasicProfile;

		/**
		 * Get the response object from the user's auth session.
		 *
		 * https://developers.google.com/identity/sign-in/web/reference#googleusergetauthresponseincludeauthorizationdata
		 */
		getAuthResponse(includeAuthorizationData?: boolean): AuthResponse;

		/**
		 * Forces a refresh of the access token, and then returns a Promise for the new AuthResponse.
		 *
		 * https://developers.google.com/identity/sign-in/web/reference#googleuserreloadauthresponse
		 */
		reloadAuthResponse(): PromiseLike<AuthResponse>;

		/**
		 * Returns true if the user granted the specified scopes.
		 *
		 * https://developers.google.com/identity/sign-in/web/reference#googleuserhasgrantedscopesscopes
		 */
		hasGrantedScopes(scopes: string): boolean;

		/**
		 * Request additional scopes to the user.
		 *
		 * https://developers.google.com/identity/sign-in/web/reference#googleusergrantoptions
		 */
		grant(options: SignInOptions);

		/**
		 * Get permission from the user to access the specified scopes offline. When you use
		 * GoogleUser.grantOfflineAccess(), the sign-in flow skips the account chooser step.
		 *
		 * See GoogleAuth.grantOfflineAccess() for more details on the method.
		 *
		 * https://developers.google.com/identity/sign-in/web/reference#googleusergrantofflineaccessscopes
		 */
		grantOfflineAccess(scopes: OfflineAccessOptions);

		/**
		 * Revokes all of the scopes that the user granted for the application.
		 *
		 * https://developers.google.com/identity/sign-in/web/reference#googleuserdisconnect
		 */
		disconnect();
	}



	interface SignInError {
		error: "popup_closed_by_user" | "access_denied" | "immediate_failed";
	}



	/**
	 * Interface that represents the different configuration parameters for the GoogleAuth.grantOfflineAccess(options) method.
	 *
	 * https://developers.google.com/identity/sign-in/web/reference#gapiauth2offlineaccessoptions
	 */
	interface OfflineAccessOptions {
		app_package_name?:  string;
		prompt?:            "consent" | "select_account";
		scope?:             "string";
	}



	interface GoogleAuth {
		isSignedIn: {
			/** Returns whether the current user is currently signed in. */
			get(): boolean;

			/** Listen for changes in the current user's sign-in state. */
			listen(listener: (signedIn: boolean) => void);
		};

		/**
		 * Signs in the user with the options specified to gapi.auth2.init().
		 *
		 * https://developers.google.com/identity/sign-in/web/reference#googleauthsignin
		 * https://developers.google.com/identity/sign-in/web/reference#googleauthsigninoptions
		 */
		signIn(options?: SignInOptions): PromiseLike<GoogleUser | SignInError>;

		/**
		 * Signs out the current account from the application.
		 *
		 * https://developers.google.com/identity/sign-in/web/reference#googleauthsignout
		 */
		signOut():                                  PromiseLike<void>;

		/**
		 * Revokes all of the scopes that the user granted.
		 *
		 * https://developers.google.com/identity/sign-in/web/reference#googleauthdisconnect
		 */
		disconnect(): void;

		/**
		 * Get permission from the user to access the specified scopes offline.
		 *
		 * https://developers.google.com/identity/sign-in/web/reference#googleauthgrantofflineaccessoptions
		 */
		grantOfflineAccess(options?: OfflineAccessOptions): PromiseLike<any>;

		/**
		 * Attaches the sign-in flow to the specified container's click handler.
		 *
		 * https://developers.google.com/identity/sign-in/web/reference#googleauthattachclickhandlercontainer-options--onsuccess-onfailure
		 */
		attachClickHandler(container: HTMLDivElement, options: SignInOptions, onsuccess: ()=>void, onfailure: ()=>void);

		currentUser: {
			/**
			 * Returns a GoogleUser object that represents the current user. Note that in a newly-initialized GoogleAuth instance, the
			 * current user has not been set. Use the currentUser.listen() method or the GoogleAuth.then() to get an initialized
			 * GoogleAuth instance.
			 *
			 * https://developers.google.com/identity/sign-in/web/reference#googleauthcurrentuserget
			 */
			get(): GoogleUser;

			/**
			 * Listen for changes in currentUser.
			 *
			 * https://developers.google.com/identity/sign-in/web/reference#googleauthcurrentuserlistenlistener
			 */
			listen(listener: (user: GoogleUser) => void);
		};
	}



	/**
	 * Returns the GoogleAuth object. You must initialize the GoogleAuth object with gapi.auth2.init() before calling this method.
	 *
	 * https://developers.google.com/identity/sign-in/web/reference#gapiauth2getauthinstance
	 */
	function getAuthInstance(): GoogleAuth;



	// TODO: https://developers.google.com/identity/sign-in/web/reference#advanced
}
