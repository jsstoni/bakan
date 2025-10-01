import {
  Tooltip as TooltipComponent,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TooltipProps = {
  children: Readonly<React.ReactNode>;
  content: string | Readonly<React.ReactNode>;
  align?: "center" | "start" | "end";
  side?: "top" | "right" | "bottom" | "left";
};

export function Tooltip({
  children,
  content,
  align = "center",
  side = "top",
}: TooltipProps) {
  return (
    <TooltipComponent>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent align={align} side={side}>
        {content}
      </TooltipContent>
    </TooltipComponent>
  );
}
