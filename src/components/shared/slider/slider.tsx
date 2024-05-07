import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "../../../lib/utils";
import { TickAxis } from './tickAxis';

interface Props {
  trackClassname?: string;
  thumbClassname?: string;
  tickAxis?: boolean;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & Props
>(({ className, trackClassname, thumbClassname, tickAxis,  ...props }, ref) => {
  // Your logic here
  const someLogicResult = true; // Example logic result

  return (
    <div className="flex flex-col">
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          className
        )}
        {...props}
      >
        {/* Logic result applied to className */}
        <SliderPrimitive.Track
          className={cn(
            'relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800',
            { 'some-condition-class': someLogicResult }
          )}
        >
          <SliderPrimitive.Range
            className={cn(
              'absolute h-full bg-neutral-900 dark:bg-neutral-50',
              trackClassname
            )}
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cn(
            'block h-5 w-5 rounded-full border-2 border-neutral-900 bg-white ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-50 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300',
            thumbClassname
          )}
        />
      </SliderPrimitive.Root>
      {tickAxis
        && <TickAxis />}
    </div>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
