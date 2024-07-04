"use client"

import { onBlock, onUnBlock } from "@/actions/block"
import { onFollow, unFollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { Toaster, toast } from "sonner"

interface ActionsProps{
    isFollowing:boolean,
    userId:string,
}

export const Actions = ({
    isFollowing,
    userId
}:ActionsProps)=>{
    const [isPending,startTransition] = useTransition();

    const onClickFollow = ()=>{
        startTransition(()=>{
          if(!isFollowing){
            onFollow(userId)
            .then((data) =>
              toast.success(`You have followed ${data.following.username} `)
            )
            .catch(() => toast.error("Something went wrong "));
          }
          else{
            unFollow(userId)
            .then((data)=>
              toast.success(`You have unfollowed ${data.following.username}`)
              )
              .catch(()=> toast.error("Something went wrong"));
          }
          
        })
        
    }

    const handleBlock = ()=>{
      startTransition(()=>{
        onUnBlock(userId)
        .then((data)=> toast.success(`You have blocked ${data.blocked.username}`))
        .catch(()=> toast.error("Something went wrong"))
      })
    }
    return (
      <>
        <Button
          disabled={ isPending}
          variant={"primary"}
          onClick={onClickFollow}
          >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
        <Button onClick={handleBlock} disabled={isPending} >
          block
        </Button>
      </>
    );
}