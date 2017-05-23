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

declare namespace gapi.signin2 {
	interface RenderOptions {
		/** The scopes to request when the user signs in (default: profile). */
		scope?:            string;

		/** The width of the button in pixels (default: 120). */
		width?:            number;

		/** The height of the button in pixels (default: 36). */
		height?:           number;

		/** Display long labels such as "Sign in with Google" rather than "Sign in" (default: false). When you use long titles, you should increase the width of the button from its default. */
		longtitle?:        boolean;

		/** The color theme of the button: either light or dark (default: light). */
		theme?:            "light" | "dark";

		/** The callback function to call when a user successfully signs in. This function must take one argument: an instance of gapi.auth2.GoogleUser (default: none). */
		onsuccess?:        (user: gapi.auth2.GoogleUser) => void;

		/** The callback function to call when sign-in fails. This function takes no arguments (default: none). */
		onfailure?:        () => void;

		/** The package name of the Android app to install over the air. See Android app installs from your web site. Optional. (default: none) */
		app_package_name?: string;
	}

	/**
	 * Renders a sign-in button in the element with the given ID, using the settings specified by the options object.
	 *
	 * https://developers.google.com/identity/sign-in/web/reference#gapisignin2renderid-options
	 */
	function render(id: string, options: RenderOptions): void;
}
