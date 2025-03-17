"use server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getFormStats = async () => {
  const user = await currentUser();

  if (!user || !user.id) {
    // throw new Error("User not found")
    console.log("User not found");
    return;
  }

  const stats = await prisma.form.aggregate({
    where: {
      ownerId: user?.id as string,
    },

    _sum: {
      submissions: true,
    },
  });

  const submission = stats._sum.submissions || 0;
  return submission;
};
