import React, { useEffect, useRef } from "react";
import { Tab } from "@headlessui/react";
interface TabItem {
  title: string;
  content: React.ReactNode;
  id: string;
}

interface TabProps {
  items: TabItem[];
  selectedIndex?: number;
  onChange?: (index: number) => void;
}

export default function Tabs({ items, selectedIndex, onChange }: TabProps) {
  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={onChange}>
      <Tab.List>
        {items.map((item) => (
          <Tab key={item.id}>
            {({ selected }) => (
              <span
                className={`font-semibold  px-6 py-4 focus:outline-0 border-accent ${
                  selected ? "border-b-2 text-accent" : ""
                }`}
              >
                {item.title}
              </span>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {items.map((item) => (
          <Tab.Panel
            key={item.id}
            className="flex items-center flex-wrap overflow-y-auto"
          >
            {item.content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
