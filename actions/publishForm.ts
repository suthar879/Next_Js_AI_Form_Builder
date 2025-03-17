import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const publishForm = async (formId: number) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }

    if (!formId) {
      return { success: false, message: "Form with Id not found" };
    }

    const form = await prisma.form.findUnique({
      where: {
        id: formId,
      },
    });

    if (!form) {
      return { success: false, message: "Form not found" };
    }

    if (form.ownerId !== user.id) {
      return { success: false, message: "Unauthorized" };
    }

    await prisma.form.update({
      where: {
        id: formId,
      },
      data: {
        published: true,
      },
    });
  } catch (error) {
    console.log("Error while publishing form ::=> ", error);
    return { success: false, message: "Error while publishing form" };
  }
};
