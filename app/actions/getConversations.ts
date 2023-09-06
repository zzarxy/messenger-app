import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversations = async () => {
   const currentUser = await getCurrentUser();

   if (!currentUser?.id) {
      return [];
   }

   try {
      const conversations = await prisma.conversation.findMany({
         orderBy: {
            lastMessageAt: 'desc'
         },
         where: {
            userIds: {
               has: currentUser.id
            }
         },
         include: {
            // return only users which id not equal currentUser.id
            users: {
               where: {
                  NOT: {
                     id: currentUser.id
                  }
               }
            },
            messages: {
               include: {
                  sender: true,
                  seen: true,
               }
            },
         }
      });

      return conversations;
   } catch (error: any) {
      return [];
   }
}

export default getConversations;