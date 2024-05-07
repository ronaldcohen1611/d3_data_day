import { RadioGroup, RadioGroupItem } from '../../shared/radio_group';
import { cn } from '../../../lib/utils';

interface Props {
  items: string[];
  className?: string
  defaultValue?: string;
}

const RadioButtons = ({ items, className, defaultValue }:Props) => {
  return (
    <div className="">
      <RadioGroup
        className="flex w-full justify-center relative top-2 right-2 gap-4"
        defaultValue={defaultValue ?? ''}
      >
        {items.map((item, idx) => {
          return (
            <div key={idx} className="flex items-center">
              <label className="">{item}</label>
              <RadioGroupItem
                className={cn('ml-1', className)}
                value={item}
                id={item}
                onClick={(e: any) => {
                  // setCategoricalSelectedValue((prevVal) => {
                  //   return e.target.value ?? prevVal;
                  // });
                }}
              >
                {item}
              </RadioGroupItem>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export { RadioButtons }