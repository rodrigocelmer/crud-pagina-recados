import { User } from "../../models/user";
import fs from "fs";

 const dbPath = 'db.json';

 export function getUserSync(): User[] {
     if(!fs.existsSync(dbPath)){
         return [];
     }
 
     const data = fs.readFileSync(dbPath);
     const userJSON = JSON.parse(data.toString()) as any[];
 
     return userJSON.map((user) =>
         User.fill(
             user.id,
             user.name,
             user.password,
             user.email,
             user.messages
         )
     );
 }
 
 export function saveUserSync(users: User[]): void {
     const dataJSON = JSON.stringify(
         users.map((user) => user.toFileSystem())
     )

     fs.writeFileSync(dbPath, dataJSON);
 }