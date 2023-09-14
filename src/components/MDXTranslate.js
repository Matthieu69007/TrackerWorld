import React from "react"

import { useState } from "react";

export default function MDXTranslate(Props)
{
  const [Desc]=useState(Props?.desc)

  const TR = Desc

  return TR
}