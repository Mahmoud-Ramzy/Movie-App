import { Client, Databases, ID, Query } from "appwrite";

// all needed IDs to connect to appwrite
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

const database = new Databases(client);

//function to update the counter after each search for search term
export const updateSearchCount = async (searchTerm, movie) => {
    //1- use Appwrite to check if the search term exists in database
    try {
        //list documents wait for array of queries, even when you need only one query
        const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
            Query.equal("searchTerm", searchTerm),
        ]);
        //2- if it does, update the count
        if (result.documents.length > 0) {
            const doc = result.documents[0];
            await database.updateDocument(DATABASE_ID, TABLE_ID, doc.$id, {
                count: doc.count + 1,
            });
        }
        //3- if it doesn't, create a new document with the search term and count as 1
        else {
            await database.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            });
        }
    } catch (error) {
        console.error(error);
    }
};
//function to fetch the trending movies from the Database
export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
            Query.orderDesc("count"),
            Query.limit(5),
        ]);
        return result.documents;
    } catch (error) {
        console.error(error);
    }
};
