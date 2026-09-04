import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useCategoryStore } from "../store/useCategoryStore";

type CategoryType = {
  name: string;
  slug: string;
};

interface CategoryProps {
  category: CategoryType;
  categoryImage: string;
  isLast?: boolean;
}

function Category({ category, categoryImage }: CategoryProps) {
  const { selectedCategory, setSelectedCategory } = useCategoryStore();
  const isActive = selectedCategory === category.slug;

  return (
   
      <Box
      sx={{
        // Mobile: Flex item with fixed width to prevent shrinking
        flex: { xs: "0 0 auto", md: "1" },
        width: { xs: "100px", sm: "120px", md: "auto" },
        position: "relative",
        backgroundColor: isActive ? "#BF00FF" : "transparent",
        color: isActive ? "#fefefe" : "#333",
        borderRadius: 4,
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        p: 1.5,
      }}
      onClick={() => setSelectedCategory(category.slug)}
    >
<Box
        sx={{
          border: "2rem solid transparent",
          width: "0",
          position: "absolute",
          right: 0,
          left: 0,
          bottom: "-3rem",
          margin: "auto",
          borderTopColor: isActive ? "#BF00FF" : "transparent",
        }}
      ></Box>
      <Box
        className="category-border"
        sx={{
          borderRight: "1px solid #e0e0e0",
          textAlign: "center",
          margin: "2rem 0",
          cursor: "pointer",
        }}
      >
        <Image
          src={categoryImage}
          alt={category.name}
          width={500}
          height={500}
          style={{ width: 50, height: 50, margin: "auto" }}
        ></Image>
        <Typography component="h2" sx={{ mt: 2 }}>
          {category.name}
        </Typography>
      </Box>
      </Box>
   
          
  );
}

export default Category;
