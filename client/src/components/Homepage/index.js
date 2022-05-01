import React from "react";
import { primaryNavigations } from "../../utils/configs";
import Header from "../reusable/Header";

export default function Homepage(props) {
  return (
    <div className="homepage">
      <Header navigations={primaryNavigations} />
      <h1>'Welcome to the HOMEPAGE')</h1>
    </div>
  )
}
