import React from 'react';

import { Accordion } from '@/components/common';

import { memeCategories, exploreCategories } from '@/constants/screens';
import { useToggle } from '@/hooks';

export default function Accordions() {
  const [memeVisible, toggleVisibleMeme] = useToggle(false);
  const [exploreVisible, toggleVisibleExplore] = useToggle(false);

  return (
    <>
      <Accordion
        title="Meme Lain"
        options={memeCategories}
        toggleVisible={toggleVisibleMeme}
        visible={memeVisible}
      />

      <Accordion
        title="Jelajah"
        options={exploreCategories}
        toggleVisible={toggleVisibleExplore}
        visible={exploreVisible}
      />
    </>
  );
}
