"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {toast} from "sonner"

const Documents = () => {

    const {user} = useUser();
    const create = useMutation(api.documents.create)

    const onCreate = () =>{
        const promise = create({
            title : "Untitled"
        });

        toast.promise(promise,{
            loading : "Creating A New Note",
            success : "New Note Created",
            error : "Failed to Create A nite"
        })

    }


    return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src="/empty.png"
        alt="empty"
        height={"300"}
        width={"300"}
        className="dark:hidden"
      />

      <Image
        src="/empty-dark.png"
        alt="empty"
        height={"300"}
        width={"300"}
        className="hidden dark:block"
      />
<h2 className="text-lg font-medium">
      Welcome to {user?.firstName}&apos;s Jotion
      </h2>

      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2"/>
        Create Note
      </Button>
    </div>
  );
};


export default Documents;
