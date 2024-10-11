"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/useCoverImage";
import { useParams } from "next/navigation";
import { useEdgeStore } from "@/lib/mockFileUpload";
import { Skeleton } from "./ui/skeleton";
import { updateTask } from "@/src/mockBackend/mockApi";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: CoverImageProps) => {
  const { publicFiles } = useEdgeStore();

  const params = useParams();
  const coverImage = useCoverImage();

  const onRemove = async () => {
    if (url) {
      // In a real app, we would delete the file here
      // For now, we'll just log the action
      console.log(`Deleting file: ${url}`);
    }
    try {
      await updateTask(params.documentId as string, { coverImage: undefined });
      console.log("Cover image removed successfully");
    } catch (error) {
      console.error("Failed to remove cover image:", error);
    }
  };

  return (
    <div
      className={cn(
        "group relative h-[35vh] w-full",
        !url && "h-[12vh]",
        url && "bg-muted",
      )}
    >
      {!!url && (
        <Image src={url} fill alt="cover" className="object-cover" priority />
      )}
      {url && !preview && (
        <div className="absolute bottom-5 right-5 flex items-center gap-x-2 opacity-0 group-hover:opacity-100">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-xs text-muted-foreground"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Change cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-xs text-muted-foreground"
            variant="outline"
            size="sm"
          >
            <X className="mr-2 h-4 w-4" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="h-[12vh] w-full" />;
};
