"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Loader } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { extractSchema } from "@/lib/validations/form.validation"

const ExtractForm = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof extractSchema>>({
    resolver: zodResolver(extractSchema),
    defaultValues: {
      transcript: "",

    },
  })

   async function onSubmit(data: z.infer<typeof extractSchema>) {
      try {
      setLoading(true)

      const response = await fetch("/api/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript: data.transcript,
        }),
      })

      if (!response.ok) {
        throw new Error("Extraction failed")
      }
      const result = await response.json()
      
      router.push(`/extract/${result.transcriptId}`)
      router.refresh()

    } catch (error) {
      console.error("Extraction error:", error)
      form.setError("transcript", {
        message: "Failed to extract action items. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-4">
          <FormField
            control={form.control}
            name="transcript"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black text-xl font-semibold">Paste Meeting Transcript</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Paste your meeting transcript"
                    className="bg-white h-[200px] text-black border-neutral-300"
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-sm" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading}
            className="bg-black hover:bg-black text-white px-4 py-2 rounded-lg transition cursor-pointer"
          >
         {loading ? (
          <>
            <Loader className='animate-spin h-6 w-6' />
          </>
         ) : (
          <>
            <span>Extract Action Items</span>
          </>
         )}
             </Button>
        </form>
      </Form>
    </div>
  )
}
export default ExtractForm