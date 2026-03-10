"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Loader2, ArrowLeft } from "lucide-react"

const schema = z.object({
  email: z.string().email("Email inválido"),
})

type FormData = z.infer<typeof schema>

export default function EsqueciSenhaPage() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  })

  const onSubmit = async (data: FormData) => {
    setError(null)
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email }),
    })

    const json = await res.json()
    if (!res.ok) {
      setError(json.error ?? "Erro ao enviar. Tente novamente.")
      return
    }

    setSent(true)
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md border-border">
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-2xl">Email enviado</CardTitle>
            <CardDescription>
              Se existir uma conta com esse email, você receberá um link para redefinir sua
              senha. Verifique também a pasta de spam.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/login">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-2xl">Esqueci a senha</CardTitle>
          <CardDescription>
            Informe seu email e enviaremos um link para redefinir sua senha
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center text-sm text-muted-foreground">
                Lembrou a senha?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Voltar ao login
                </Link>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Enviar link"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
