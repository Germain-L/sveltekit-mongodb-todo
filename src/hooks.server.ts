import type { Handle } from "@sveltejs/kit";
import { MongoClient } from 'mongodb'
import { MONGO_URL } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
    const client = new MongoClient(MONGO_URL);
    await client.connect();

    event.locals.mongodb = client.db("todo");

    const response = await resolve(event);

    return response;
};
