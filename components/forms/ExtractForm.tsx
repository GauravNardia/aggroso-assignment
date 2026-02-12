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
 
const formSchema = z.object({
  transcript: z
    .string()
    .min(5, "Transcript must be at least 5 characters.")
})


const ExtractForm = () => {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transcript: "",

    },
  })

   function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log("transcript", data)
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