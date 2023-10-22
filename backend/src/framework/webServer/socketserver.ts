import { Socket,Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface User {
    userId:string,
    socketId:string
}

let activeUsers:User[] =[]

const socketconfig=(
    io:Server<DefaultEventsMap>
)=>{
    io.on('connection',(socket:Socket)=>{
          console.log('A usersocket is connected');
          
         socket.emit('me',socket.id)
        socket.on('addnewuser',(newUserId:string)=>{
            if(!activeUsers.some((user)=>user.userId===newUserId))
            {
                activeUsers.push({userId:newUserId,socketId:socket.id})
            }
            console.log(activeUsers,"000000000000");
            
            io.emit('get-users',activeUsers)
        })
        socket.on('send-message',(data)=>{
            console.log("jjjjstrein",data);
            
             const {chattinguserid}=data
             console.log(chattinguserid,"3333333333333data");

             console.log(activeUsers,"kggggggggggggggfffffffffffffffffff");
             
             const user=activeUsers.find((user)=>user.userId===chattinguserid)
            // 
            //   console.log(user.userId,chattinguserid,"useriddddd")
             

            console.log(user,"userreeeeeeeeeeeeeeee");
            
             if(user)
             {
                // console.log(user,"userdara");
                
                io.to(user.socketId).emit("receive-message",data)
             }
             else{
                console.log(`User with userId ${chattinguserid} is not currently active.`);
             }
             
        })

        socket.on('disconnect',()=>{
            activeUsers=activeUsers.filter((user)=>user.socketId !==socket.id)
            io.emit('get-users',activeUsers)
        })

    })
}

export default socketconfig