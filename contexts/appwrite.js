import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
  .setProject("68477ac60034aed3bc24"); // Replace with your project ID

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
