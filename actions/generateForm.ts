"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import OpenAI from "openai";
import { revalidatePath } from "next/cache";

const openai = new OpenAI({ apiKey: `${process.env.OPENAI_API_KEY!}` });

export const generateForm = async (prevState: unknown, formData: FormData) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { success: true, message: "User not found" };
    }

    // define the schema for validation
    const schema = z.object({
      description: z
        .string()
        .min(3, "Description must be at least 3 characters long"),
    });

    const result = schema.safeParse({
      description: formData.get("description") as string,
    });

    if (!result.success) {
      return { success: false, message: result.error.errors };
    }

    const description = result.data.description;

    if (!process.env.OPENAI_API_KEY) {
      return { success: false, message: "OPENAI api key not found" };
    }

    const prompt = `Generate a JSON response for a form with the following structure. Ensure the keys and format remain constant in every response.
                    {
                      "formTitle": "string", // The title of the form
                      "formFields": [        // An array of fields in the form
                        {
                          "label": "string", // The label to display for the field
                          "name": "string",  // The unique identifier for the field (used for form submissions)
                          "placeholder": "string" // The placeholder text for the field
                        }
                      ]
                    }
                    Requirements:
                    - Use only the given keys: "formTitle", "formFields", "label", "name", "placeholder".
                    - Always include at least 3 fields in the "formFields" array.
                    - Keep the field names consistent across every generation for reliable rendering.
                    - Provide meaningful placeholder text for each field based on its label.
                            `;

    // Request openai to generate the form content
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: `${description} ${prompt}` }],
      model: "gpt-4o",
    });

    // console.log("Ai generated form ::=> ", completion.choices[0]);
    const formContent = completion.choices[0]?.message.content;

    // if (!formContent) {
    //   return { success: false, message: "Failed to generate form contnet" };
    // }
    // let formJsonData;
    // try {
    //   formJsonData = JSON.parse(formContent);
    // } catch (error) {
    //   console.log("Error parsing Json ::=> ", error);
    //   return {
    //     success: false,
    //     message: "Generated form content is not valid JSON",
    //   };
    // }

    //  save the generated form to the database
    const form = await prisma.form.create({
      data: {
        ownerId: user.id,
        content: formContent,
      },
    });

    revalidatePath("/dashboard/forms");

    return {
      success: true,
      message: "Form generated Successfully",
      data: form,
    };
  } catch (error) {
    console.log("Error Generated Form ::=> ", error);
    return {
      success: false,
      message: "An Error occurred while generating the form",
    };
  }
};
