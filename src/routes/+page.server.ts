import type { PageServerLoad, Actions } from './$types';
import { ObjectId } from 'mongodb';

import type { Todos } from '$lib/types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
    const mongodb = locals.mongodb;

    const collection = mongodb.collection('todos');
    const todosMongo = await collection.find().toArray();

    const todos: Todos = todosMongo.map((todo) => {
        return {
            _id: todo._id.toString(),
            title: todo.title,
            completed: todo.completed
        }
    });

    return {
        "todos": todos
    };
}) satisfies PageServerLoad;


export const actions = {
    changeState: async ({ request, locals }) => {
        console.log('changeState');

        const mongodb = locals.mongodb;

        const formData = await request.formData();
        const id = formData.get('id') as string;
        const isCompleted = formData.get('completed') as string === 'true' ? true : false;

        console.log('id', id);
        console.log('isCompleted', isCompleted);

        const collection = mongodb.collection('todos');
        const res = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { completed: !isCompleted } }
        );

        // check if the update was successful
        if (res.modifiedCount !== 1) {
            console.log('Error updating todo');
            return { success: false };
        }

        return { success: true };
    },

    delete: async ({ request, locals }) => {
        console.log('delete');

        const mongodb = locals.mongodb;

        const formData = await request.formData();
        const id = formData.get('id') as string;

        const collection = mongodb.collection('todos');
        const res = await collection.deleteOne({ _id: new ObjectId(id) });

        // check if the delete was successful
        if (res.deletedCount !== 1) {
            console.log('Error deleting todo');
            return { success: false };
        }

        throw redirect(301, '/');
    },

    add: async ({ request, locals }) => {
        console.log('add');

        const mongodb = locals.mongodb;

        const formData = await request.formData();
        const title = formData.get('title') as string;

        const collection = mongodb.collection('todos');
        const res = await collection.insertOne({ title, completed: false });

        // check if the insert was successful
        if (res.insertedId === null) {
            console.log('Error adding todo');
            return { success: false };
        }

        throw redirect(301, '/');
    }
} satisfies Actions;