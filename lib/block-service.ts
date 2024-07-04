import { getSelf } from "./auth-service";
import { db } from "./db";

export const isBlockedByUser = async (id:string)=>{
    try{
        const self = await getSelf();
        const otheruser = await db.user.findUnique({
            where:{
                id
            },
        })
        if(!otheruser){
            throw new Error("User not found");
        }
        if(self.id === otheruser.id){
            return false;
        }
        const existingBlock = await db.block.findUnique({
            where:{
               blockerId_blockedId:{
                     blockerId:otheruser.id,
                     blockedId:self.id,
                
               }
            }
        })
        return !!existingBlock;
    }
    catch{
        return false;
    }
}

export const blockUser = async (id:string)=>{
    const self = await getSelf();
    if(self.id === id){
        throw new Error("You can't block yourself");
    }

    const otheruser = await db.user.findUnique({
        where:{
            id
        }
    })
    if(!otheruser){
        throw new Error("User not found");
    }
    const existingBlock = await db.block.findUnique({
        where:{
            blockerId_blockedId:{
                blockerId:self.id,
                blockedId:otheruser.id,
            }
        }
    })
    if(existingBlock){
        throw new Error("User already blocked");
    }
    const block = await db.block.create({
        data:{
            blockerId:self.id,
            blockedId:otheruser.id,
        },
        include:{
            blocked:true,
        }
    })
    return block;
}

export const unBlockUser = async (id:string)=>{
    const self = await getSelf();
    if(self.id === id){
        throw new Error("You can't unblock yourself");
    }
    const otheruser = await db.user.findUnique({
        where:{
            id
        }
    })
    if(!otheruser){
        throw new Error("User not found");
    }
    const existingBlock = await db.block.findUnique({
        where:{
            blockerId_blockedId:{
                blockerId:self.id,
                blockedId:otheruser.id,
            }
        }
    })
    if(!existingBlock){
        throw new Error("User not blocked");
    }
    const unblock = await db.block.delete({
        where:{
           id:existingBlock.id
        },
        include:{
            blocked:true,
        }
    })
    return unblock;
}