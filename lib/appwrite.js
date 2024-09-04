import { Client, Account, ID, Avatars, Databases, Query} from 'react-native-appwrite';
import signIn from '../app/(auth)/signIn';
export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aora',
    projectId: '66c5dc3c0010660be871',
    databaseId: '66c5ddf0002e2bee131f',
    userCollectionId: '66c5de1e00132aa55568',
    videoCollectionId: '66c5de55001fe83f1cd5',
    storageId:'66c5e03200041aa13c5c'

}

const{
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = config;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async(email,password,username) => {
try{
const newAccount = await account.create(
    ID.unique(),
    email,
    password,
    username
)
if(!newAccount) throw Error;

const avatarUrl = avatars.getInitials(username)

await signInn(email,password)

const newUser = await databases.createDocument(
    config.databaseId,
    config.userCollectionId,
    ID.unique(),
    {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
    }
)
return newUser;
}catch(error){
    console.log(error);
    throw new Error(error);
}
}
export const signInn= async (email,password) =>{
   try{
    const session = await account.createEmailPasswordSession
    (email,password)
    return session;

   }catch(error){
    throw new Error(error)
   } 
}

export const getCurrentUser = async () => {
    try{
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];

    }catch(error){
      console.log(error);  
    }
}

export const getAllPosts = async () => {
    try {
       const posts = await databases.listDocuments(
        databaseId,
        videoCollectionId
       ) 
       return posts.documents;
    } catch (error) {
      throw new Error(error);  
    }
}

export const getLatestPosts = async () => {
    try {
       const posts = await databases.listDocuments(
        databaseId,
        videoCollectionId,
        [Query.orderDesc('$createdAt', Query.limit(7))]

       ) 
       return posts.documents;
    } catch (error) {
      throw new Error(error);  
    }
}

export const searchPosts = async (query) => {
    try {
       const posts = await databases.listDocuments(
        databaseId,
        videoCollectionId,
        [Query.search('title', query)]

       ) 
       return posts.documents;
    } catch (error) {
      throw new Error(error);  
    }
}
