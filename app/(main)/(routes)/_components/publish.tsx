"use client";

import { Doc } from "@/convex/_generated/dataModel";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface PublishProps {
  initialData: Doc<"documents">;
}

export const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => {
      setIsSubmitting(true);
    });

    toast.promise(promise, {
      loading: "Publishing",
      success: "Note Published",
      error: "Failed to Publish",
    });
  };

  const onUnPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => {
      setIsSubmitting(true);
    });

    toast.promise(promise, {
      loading: "UnPublishing",
      success: "Note UnPublished",
      error: "Failed to UnPublish",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"sm"} variant={"ghost"}>
          {initialData.isPublished && (
            <Globe className="text-sky-500 w-4 h-4 ml-2" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">Publis</div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publish this Note</p>
            <span className="text-xs text-muted-foreground mb-4">
                Share Your Work with others
            </span>
            <Button disabled={isSubmitting}
            onClick={onPublish}
            className="w-full text-xs"
            size="sm"
            >
                Publish</Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
