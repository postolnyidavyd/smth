import React from "react";

import TitleTexts from "../components/TitleTexts";
import { HorizontalGallery } from "../components/layouts/HorizontalGallery";
import Menu from "../components/Menu";

function PortfolioPage() {

  return (
    <>
      <Menu currentPage={"portfolio"}></Menu>
      <TitleTexts text="Portfolio" />

      <HorizontalGallery type={'view'} alt={'красивий краєвид'}></HorizontalGallery>
      <HorizontalGallery type={'studio'} alt={'красива людина'}></HorizontalGallery>
      <HorizontalGallery type={'outdoor'} alt={'красива людина'}></HorizontalGallery>
    </>
  );
}

export default PortfolioPage;
