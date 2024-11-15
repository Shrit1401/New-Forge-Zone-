"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowRightIcon } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserData } from "@/db/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../../firebase";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import { doc, updateDoc } from "firebase/firestore";
import { howLong, LookingFor, User } from "@/lib/types/user.types";
import { updateProfile } from "firebase/auth";

const howLongOptions = [
  "One Month Or More",
  "One Year or More",
  "Two Years or More",
  "Three Years or More",
  "Five Years or More",
  "Very Long",
] as const;

const lookingForOptions = ["Job", "Internship", "Meet Crazy People"] as const;

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .optional(),
  avatar: z.string().optional(),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  oneLiner: z
    .string()
    .min(10, {
      message: "One liner must be at least 10 characters.",
    })
    .optional(),
  workingOn: z
    .string()
    .min(5, {
      message: "Please provide more details about what you're working on.",
    })
    .optional(),
  lookingFor: z.enum(lookingForOptions).optional(),
  howLong: z.enum(howLongOptions).optional(),
  projectsBuilt: z.number().min(0).optional(),
  socials: z.object({
    twitter: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
  }),
});

export default function ProfileForm() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      avatar: "",
      location: "",
      oneLiner: "",
      workingOn: "",
      lookingFor: "Internship",
      howLong: "One Month Or More",
      projectsBuilt: 0,
      socials: {
        twitter: "",
        github: "",
        linkedin: "",
      },
    },
  });

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      const data = await getUserData(user);
      setUserData(data);
      setLoading(false);
    };

    fetchUser();
  }, [user]);

  useEffect(() => {
    if (userData) {
      form.reset({
        name: userData.name || "",
        email: userData.email || "",
        avatar: userData.avatar || "",
        location: userData.location || "",
        oneLiner: userData.oneLiner || "",
        workingOn: userData.workingOn || "",
        lookingFor: userData.lookingFor || "Internship",
        howLong: userData.howLong || "One Month Or More",
        projectsBuilt: userData.projectsBuilt || 0,
        socials: {
          twitter: userData.socials?.twitter || "",
          github: userData.socials?.github || "",
          linkedin: userData.socials?.linkedin || "",
        },
      });
    }
  }, [userData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsUploading(true);
    if (user && user.email) {
      const userRef = doc(db, "users", user?.email);
      const howLong = values.howLong as howLong;
      const lookingFor = values.lookingFor as LookingFor;

      console.log("values", values);

      if (values.name) {
        updateProfile(user, {
          displayName: values.name,
        });
      }

      if (values.avatar) {
        updateProfile(user, {
          photoURL: values.avatar,
        });
      }

      const newUser: User = {
        name: values.name,
        email: user.email,
        avatar: values.avatar || "",
        location: values.location,
        oneLiner: values.oneLiner || "",
        workingOn: values.workingOn || "",
        lookingFor: lookingFor || "Internship",
        howLong: howLong || "One Month Or More",
        projectsBuilt: values.projectsBuilt || 0,
        socials: {
          twitter: values.socials.twitter || "",
          github: values.socials.github || "",
          linkedin: values.socials.linkedin || "",
        },
      };
      await updateDoc(userRef, {
        ...newUser,
        updatedAt: new Date(),
      });
    }
    toast("Profile updated successfully!");
    window.location.reload();
    setIsUploading(false);
  }

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Skeleton className="w-28 h-28 rounded-full" />
          </div>
          <Skeleton className="h-6 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold manrope text-center">
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex justify-center mb-4">
              <Avatar
                className="w-28 h-28 border-2 border-gray-400 shadow-lg rounded-full overflow-hidden
              "
              >
                <AvatarImage
                  src={form.watch("avatar")}
                  alt={form.watch("name")}
                />
                <AvatarFallback>{form.watch("name").charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex justify-center">
              <UploadDropzone
                endpoint="imageUploader"
                className="w-full"
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    form.setValue("avatar", res[0].url);
                    toast.success("Click Submit to save your changes!");
                  }
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                disabled
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Feel free to input whatever you're comfortable with (ex. city, country, etc)."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="oneLiner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One Liner</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex. Frontend engineer @ Forge Zone, formerly @ mom kid, lover of cofee."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workingOn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Working On</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="talking shit, js, rapping (comma seperated)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="lookingFor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Looking For</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {lookingForOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="howLong"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How Long</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {howLongOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="projectsBuilt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Projects Built</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      disabled
                      onChange={(e) => field.onChange(+e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socials"
              render={() => (
                <FormItem>
                  <FormLabel>Socials</FormLabel>
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="socials.twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Twitter" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="socials.github"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="GitHub" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="socials.linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="LinkedIn" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          variant="expandIcon"
          Icon={ArrowRightIcon}
          iconPlacement="right"
          size="lg"
          className="w-full font-bold text-xl manrope py-6 shadow-none"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isUploading}
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
