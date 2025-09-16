import { Client, Account, Databases, Storage, Query, ID } from 'appwrite';

// Production configuration for GitHub Pages deployment
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://nyc.cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID || '68c421f100155aee655e';

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database and Collection IDs with fallback values for production
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || '68c4288d002de0868cf0';
export const PROPERTIES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PROPERTIES_COLLECTION_ID || 'properties';
export const USERS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID || 'user-profiles';
export const FAVORITES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_FAVORITES_COLLECTION_ID || 'favorites';

export const VIEWS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_VIEWS_COLLECTION_ID || 'property-views';
export const INQUIRIES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_INQUIRIES_COLLECTION_ID || 'property-inquiries';
export const COMMENTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID || 'comments';
export const NOTIFICATIONS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_NOTIFICATIONS_COLLECTION_ID || 'notifications';

// Storage Bucket ID
export const STORAGE_BUCKET_ID = import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID || 'property-images';

// Helper functions
export const appwriteConfig = {
  client,
  account,
  databases,
  storage,
  databaseId: DATABASE_ID,
  propertiesCollectionId: PROPERTIES_COLLECTION_ID,
  usersCollectionId: USERS_COLLECTION_ID,
  favoritesCollectionId: FAVORITES_COLLECTION_ID,

  viewsCollectionId: VIEWS_COLLECTION_ID,
  inquiriesCollectionId: INQUIRIES_COLLECTION_ID,
  commentsCollectionId: COMMENTS_COLLECTION_ID,
  notificationsCollectionId: NOTIFICATIONS_COLLECTION_ID,
  storageId: STORAGE_BUCKET_ID,
};

export { Query, ID };
export default client;