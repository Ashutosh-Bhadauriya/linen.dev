import prisma from 'client';

class UserThreadStatusService {
  static async markAsUnreadForAllUsers(threadId: string) {
    return prisma.userThreadStatus.deleteMany({
      where: {
        threadId,
        read: true,
        muted: false,
      },
    });
  }

  static async markAsUnmutedForMentionedUsers(
    threadId: string,
    userIds: string[]
  ) {
    if (userIds.length === 0) {
      return Promise.resolve();
    }
    return prisma.userThreadStatus.deleteMany({
      where: {
        threadId,
        userId: {
          in: userIds,
        },
        read: false,
        muted: true,
      },
    });
  }

  static async markAllAsRead(channelId: string, userId: string) {
    return prisma.$queryRaw`
      INSERT INTO "userThreadStatus" ("userId", "threadId", "muted", "read", "createdAt", "updatedAt")
      SELECT ${userId}, t.id, false, true, current_timestamp, current_timestamp
      from threads as t
      join channels as c on t."channelId" = c.id
      where c.id = ${channelId}
    `;
  }
}

export default UserThreadStatusService;