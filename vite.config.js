import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/market/',
  define: {
    'import.meta.env.VITE_APPWRITE_PROJECT_ID': JSON.stringify('68c421f100155aee655e'),
    'import.meta.env.VITE_APPWRITE_ENDPOINT': JSON.stringify('https://nyc.cloud.appwrite.io/v1'),
    'import.meta.env.VITE_APPWRITE_DATABASE_ID': JSON.stringify('68c4288d002de0868cf0'),
    'import.meta.env.VITE_APPWRITE_PROPERTIES_COLLECTION_ID': JSON.stringify('properties'),
    'import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID': JSON.stringify('user-profiles'),
    'import.meta.env.VITE_APPWRITE_FAVORITES_COLLECTION_ID': JSON.stringify('favorites'),
    'import.meta.env.VITE_APPWRITE_MESSAGES_COLLECTION_ID': JSON.stringify('messages'),
    'import.meta.env.VITE_APPWRITE_VIEWS_COLLECTION_ID': JSON.stringify('property-views'),
    'import.meta.env.VITE_APPWRITE_INQUIRIES_COLLECTION_ID': JSON.stringify('property-inquiries'),
    'import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID': JSON.stringify('comments'),
    'import.meta.env.VITE_APPWRITE_NOTIFICATIONS_COLLECTION_ID': JSON.stringify('notifications'),
    'import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID': JSON.stringify('property-images'),
    'import.meta.env.VITE_GEOCODING_API_KEY': JSON.stringify('68c7bf6a4f3bb696953885wtbf619fa')
  },
  server: {
    host: true, // This exposes the server to your network
    port: 5175,
    allowedHosts: [
      '561a4937678e.ngrok-free.app',
      '.ngrok-free.app', // Allow all ngrok subdomains
      'localhost'
    ]
  }
})
