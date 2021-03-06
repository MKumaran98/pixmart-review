import classes from "./Catagorical.module.css";
import {CatagoricalCard} from "./CatagoricalCard/CatagoricalCard";

export const Catagorical = () => {
  const catagories = [
    {
      name: "DSLR",
      type: "FILTER_ONLY_DSLR",
      image:
        "https://res.cloudinary.com/docpuxue8/image/upload/v1616861716/Pixmart/Catagories/DSLR_catagory_xkie7q.jpg",
    },
    {
      name: "Mirrorless",
      type: "FILTER_ONLY_MIRRORLESS",
      image:
        "https://res.cloudinary.com/docpuxue8/image/upload/v1616861373/Pixmart/Catagories/Mirrorless_catagory_faffub.jpg",
    },
    {
      name: "Point and Shoot",
      type: "FILTER_ONLY_POINT_AND_SHOOT",
      image:
        "https://res.cloudinary.com/docpuxue8/image/upload/v1616861373/Pixmart/Catagories/Point_and_shoot_catagory_hivtfm.jpg",
    },
    {
      name: "Accessories",
      type: "FILTER_ONLY_ACCESSORIES",
      image:
        "https://res.cloudinary.com/docpuxue8/image/upload/v1616861373/Pixmart/Catagories/Accessories_catagory_ho57bm.jpg",
    },
  ];

  return (
    <div>
      <ul className={classes["catagory-list"]}>
        {catagories.map(({ name, type, image }) => (
          <li key={type}>
            <CatagoricalCard type={type} image={image}>
              {name}
            </CatagoricalCard>
          </li>
        ))}
      </ul>
    </div>
  );
};
