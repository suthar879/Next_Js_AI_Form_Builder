import AiGeneratedForm from '@/components/AiGeneratedForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/lib/prisma'
import React from 'react'

const SubmitForm = async ({ params }: { params: Promise<{ formId: string }> }) => {
    const formId = (await params).formId;

  if (!formId) {
    return <h1>No form id found for id {formId}</h1>;
  }
  const form : any = await prisma.form.findUnique({
    where: {
      id: Number(formId),
    },
  });
  return (
    <Card className='max-w-xl mx-auto py-10'>
    <CardHeader>
      <CardTitle>
        <h1 className="font-bold text-2xl text-center">{form.content.formTitle || "NA" }</h1>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <AiGeneratedForm form = {form} isEditMode={false}/>
    </CardContent>
  </Card>
  )
}

export default SubmitForm