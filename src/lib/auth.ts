import { auth } from "@clerk/nextjs/server";

export const requireAuth = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
};
