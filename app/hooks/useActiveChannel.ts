import { Channel, Members } from "pusher-js";
import useActiveList from "./useActiveList";
import { useEffect, useMemo, useState } from "react";
import { pusherClient } from "../libs/pusher";

const useActiveChannel = () => {
   const { set, add, remove } = useActiveList();
   const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
   let someshit = 1;

   useEffect(() => {
      let channel = activeChannel;

      if (!channel) {
         channel = pusherClient.subscribe('presence-messanger');
         console.log("channel", channel)
         setActiveChannel(channel);
      }

      if (channel.subscribed) {
         someshit += 1;
      }

      channel.bind('pusher:subscription_succeeded', (members: Members) => {
         const initialMembers: string[] = [];

         members.each((member: Record<string, any>) => initialMembers.push(member.id));
         set(initialMembers);
      })

      channel.bind("pusher:member_added", (member: Record<string, any>) => {
         add(member.id);
      });

      channel.bind("pusher:member_removed", (member: Record<string, any>) => {
         remove(member.id);
      });

      return () => {
         if (activeChannel) {
            pusherClient.unsubscribe('presence-messenger');
            setActiveChannel(null);
         }
      }
   }, [activeChannel, set, add, remove, someshit])
}

export default useActiveChannel;