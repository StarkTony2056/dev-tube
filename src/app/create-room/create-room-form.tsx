"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createRoomAction } from "./actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(50),
    description: z
        .string()
        .min(20, {
            message: "Description must be at least 20 characters.",
        })
        .max(100),
    tags: z
        .string()
        .min(1, {
            message: "Language must be at least 1 character.",
        })
        .max(50),
    githubRepo: z
        .string()
        .min(20, {
            message: "Github Repo must be at least 20 characters.",
        })
        .max(100),
});

export function CreateRoomForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            tags: "",
            githubRepo: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // invoke a server action to store the data in our database
        await createRoomAction(values);
        router.push("/");
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Room Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Solving a challenging project."
                                />
                            </FormControl>
                            <FormDescription>
                                This is your public room name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Come join me on this project."
                                />
                            </FormControl>
                            <FormDescription>
                                Please describe your project.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="python, numpy, flask"
                                />
                            </FormControl>
                            <FormDescription>
                                Please mention the programming languages,
                                frameworks, libraries so that people can find
                                your content.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="githubRepo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Github Repository Link</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="https://www.github.com/your-user-name/project-name"
                                />
                            </FormControl>
                            <FormDescription>
                                Please provide the link to the github repo you
                                will be working on.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
