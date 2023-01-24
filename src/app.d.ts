// See https://kit.svelte.dev/docs/types#app

import type { Db } from "mongodb";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			mongodb: Db
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
