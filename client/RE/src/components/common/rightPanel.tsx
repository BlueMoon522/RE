import { useState } from "react";

interface RightPanelProps {
  isPanelOpen: boolean;
}

const RightPanel: React.FC<RightPanelProps> = ({ isPanelOpen }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-xl p-4 transition-all duration-300 ease-in-out transform ${
        isPanelOpen ? "w-1/3 translate-x-0" : "w-0 translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Title */}
        <h2 className="text-xl font-bold mb-4">Panel Title</h2>
        {/* Description */}
        <div className="flex-1 overflow-auto mb-4">
          <p>
            This is the description section. You can put a large amount of text
            This is the description section. You can put a large amount of text
            This is the description section. You can put a large amount of text
            This is the description section. You can put a large amount of text
            This is the description section. You can put a large amount of text
            here. It will scroll if the content exceeds the available space.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            auctor velit dui, ac consequat lorem venenatis id. Curabitur
            facilisis nunc ac tortor vestibulum, a pretium felis iaculis. Donec
            eget diam tristique, lacinia odio et, aliquam tortor. Integer
            laoreet, erat sit amet gravida convallis, ante risus auctor metus,
            sit amet tempor dui metus id elit. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
            Integer id vestibulum arcu. Nullam tincidunt metus eget dui euismod
            tincidunt. Sed eget sem malesuada, gravida ligula in, tempor ante.
            Nam varius vehicula dui sit amet fermentum. Cras porttitor ipsum ac
            lorem finibus, sed fermentum arcu scelerisque. Donec fermentum nisi
            eget velit condimentum, et tincidunt elit tincidunt. here. It will
            scroll if the content exceeds the available space. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Fusce auctor velit dui, ac
            consequat lorem venenatis id. Curabitur facilisis nunc ac tortor
            vestibulum, a pretium felis iaculis. Donec eget diam tristique,
            lacinia odio et, aliquam tortor. Integer laoreet, erat sit amet
            gravida convallis, ante risus auctor metus, sit amet tempor dui
            metus id elit. Pellentesque habitant morbi tristique senectus et
            netus et malesuada fames ac turpis egestas. Integer id vestibulum
            arcu. Nullam tincidunt metus eget dui euismod tincidunt. Sed eget
            sem malesuada, gravida ligula in, tempor ante. Nam varius vehicula
            dui sit amet fermentum. Cras porttitor ipsum ac lorem finibus, sed
            fermentum arcu scelerisque. Donec fermentum nisi eget velit
            condimentum, et tincidunt elit tincidunt. here. It will scroll if
            the content exceeds the available space. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Fusce auctor velit dui, ac consequat
            lorem venenatis id. Curabitur facilisis nunc ac tortor vestibulum, a
            pretium felis iaculis. Donec eget diam tristique, lacinia odio et,
            aliquam tortor. Integer laoreet, erat sit amet gravida convallis,
            ante risus auctor metus, sit amet tempor dui metus id elit.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Integer id vestibulum arcu. Nullam
            tincidunt metus eget dui euismod tincidunt. Sed eget sem malesuada,
            gravida ligula in, tempor ante. Nam varius vehicula dui sit amet
            fermentum. Cras porttitor ipsum ac lorem finibus, sed fermentum arcu
            scelerisque. Donec fermentum nisi eget velit condimentum, et
            tincidunt elit tincidunt. here. It will scroll if the content
            exceeds the available space. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Fusce auctor velit dui, ac consequat lorem
            venenatis id. Curabitur facilisis nunc ac tortor vestibulum, a
            pretium felis iaculis. Donec eget diam tristique, lacinia odio et,
            aliquam tortor. Integer laoreet, erat sit amet gravida convallis,
            ante risus auctor metus, sit amet tempor dui metus id elit.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Integer id vestibulum arcu. Nullam
            tincidunt metus eget dui euismod tincidunt. Sed eget sem malesuada,
            gravida ligula in, tempor ante. Nam varius vehicula dui sit amet
            fermentum. Cras porttitor ipsum ac lorem finibus, sed fermentum arcu
            <div className="mt-4">
              <img
                src="https://c7.alamy.com/comp/MR0G79/random-pictures-MR0G79.jpg"
                alt="Placeholder Image"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            scelerisque. Donec fermentum nisi eget velit condimentum, et
            tincidunt elit tincidunt. here. It will scroll if the content
            exceeds the available space. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Fusce auctor velit dui, ac consequat lorem
            venenatis id. Curabitur facilisis nunc ac tortor vestibulum, a
            pretium felis iaculis. Donec eget diam tristique, lacinia odio et,
            aliquam tortor. Integer laoreet, erat sit amet gravida convallis,
            ante risus auctor metus, sit amet tempor dui metus id elit.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Integer id vestibulum arcu. Nullam
            tincidunt metus eget dui euismod tincidunt. Sed eget sem malesuada,
            gravida ligula in, tempor ante. Nam varius vehicula dui sit amet
            fermentum. Cras porttitor ipsum ac lorem finibus, sed fermentum arcu
            scelerisque. Donec fermentum nisi eget velit condimentum, et
            tincidunt elit tincidunt.
          </p>
        </div>
        {/* Example Image in Description */}
        {/* Uncomment the following lines to display an image */}
        {/* Footer */}
        <div className="mt-4 border-t pt-2">
          <p>Panel Footer</p>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
