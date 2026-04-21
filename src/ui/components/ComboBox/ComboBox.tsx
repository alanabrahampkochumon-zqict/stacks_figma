import {
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
    Combobox as HUICombobox,
} from "@headlessui/react";
import clsx from "clsx";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";

const people = [
    { id: 1, name: "Tom Cook" },
    { id: 2, name: "Wade Cooper" },
    { id: 3, name: "Tanya Fox" },
    { id: 4, name: "Arlene Mccoy" },
    { id: 5, name: "Devon Webb" },
];

type ComboBoxProps = {
    options: string[];
};

export default function ComboBox({ options }: ComboBoxProps) {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState("");

    const filteredOptions =
        query === ""
            ? options
            : options.filter((option) => {
                  return option.toLowerCase().includes(query.toLowerCase());
              });

    return (
        <div className="mx-auto h-screen w-52 pt-20">
            <HUICombobox
                value={selected}
                onChange={(value) => setSelected(value)}
                onClose={() => setQuery("")}
            >
                <div className="relative">
                    <ComboboxInput
                        className={clsx(
                            "w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white",
                            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25",
                        )}
                        displayValue={(option) => option}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                        <ChevronDownIcon className="size-4 fill-white/60 group-data-hover:fill-white" />
                    </ComboboxButton>
                </div>

                <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                        "w-(--input-width) rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:--spacing(1)] empty:invisible",
                        "transition duration-100 ease-in data-leave:data-closed:opacity-0",
                    )}
                >
                    {filteredOptions.map((option) => (
                        <ComboboxOption
                            key={option}
                            value={option}
                            className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
                        >
                            <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
                            <div className="text-sm/6 text-white">{option}</div>
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </HUICombobox>
        </div>
    );
}
