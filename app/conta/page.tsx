"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { BibliotecaNav } from "@/components/biblioteca-nav"
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
import { Loader2, Eye, EyeOff, User } from "lucide-react"

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Senha atual obrigatória"),
    newPassword: z.string().min(6, "Nova senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirme a nova senha"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

type ChangePasswordForm = z.infer<typeof changePasswordSchema>

export default function ContaPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/conta")
    }
  }, [status, router])

  const onSubmit = async (data: ChangePasswordForm) => {
    setError(null)
    setSuccess(null)
    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }),
    })

    const json = await res.json()
    if (!res.ok) {
      setError(json.error ?? "Erro ao alterar senha")
      return
    }

    setSuccess("Senha alterada com sucesso!")
    form.reset()
  }

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BibliotecaNav />
      <main className="flex-1 container py-8 px-4 max-w-2xl">
        <h1 className="font-serif text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
          <User className="h-8 w-8" />
          Minha conta
        </h1>

        {/* Dados do usuário */}
        <Card className="mb-6 border-border">
          <CardHeader>
            <CardTitle>Seus dados</CardTitle>
            <CardDescription>
              Informações da sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Nome</p>
              <p className="font-medium">{session.user?.name ?? "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{session.user?.email ?? "—"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Alterar senha */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Alterar senha</CardTitle>
            <CardDescription>
              Digite sua senha atual e a nova senha desejada
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
                {success && (
                  <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
                )}
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha atual</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showCurrent ? "text" : "password"}
                            placeholder="••••••••"
                            className="pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrent((v) => !v)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            tabIndex={-1}
                            aria-label={showCurrent ? "Ocultar senha" : "Mostrar senha"}
                          >
                            {showCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nova senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showNew ? "text" : "password"}
                            placeholder="••••••••"
                            className="pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowNew((v) => !v)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            tabIndex={-1}
                            aria-label={showNew ? "Ocultar senha" : "Mostrar senha"}
                          >
                            {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar nova senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirm ? "text" : "password"}
                            placeholder="••••••••"
                            className="pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirm((v) => !v)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            tabIndex={-1}
                            aria-label={showConfirm ? "Ocultar senha" : "Mostrar senha"}
                          >
                            {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Alterar senha"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </main>
    </div>
  )
}
