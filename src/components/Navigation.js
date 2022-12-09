import Link from "next/link";
import { Icon } from "@iconify/react";

const Navigation = () => {
  return (
    <ul className="navBar">
      <li className="navBar__home">
        <Link href={"/"}>
          <Icon icon="material-symbols:house-rounded" />
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;
