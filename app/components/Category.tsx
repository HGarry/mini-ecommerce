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
  const {selectedCategory, setSelectedCategory}= useCategoryStore();
  const isActive =selectedCategory===category.slug;

  return (
    <Grid
      size={{ xs: 6, md: 4, lg: 2 }}
      sx={{ position: "relative",
        backgroundColor: isActive ? "#7fffd4" : "transparent",
        color: isActive ? "#fefefe" : "#333",
        borderRadius: 4,
        "&:nth-of-type(2n) .category-border": {
          borderRight: { xs: "none", md: "1px solid #e0e0e0" },
        },
        "&:nth-of-type(3n) .category-border": {
          borderRight: { md: "none", lg: "1px solid #e0e0e0" },
        },
        "&:nth-of-type(6n) .category-border": {
          borderRight: { lg: "none" },
        },
      }}
      onClick={()=>setSelectedCategory(category.slug)}
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
          borderTopColor: isActive ? "#7fffd4" : "transparent",
          
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

        <Image src={categoryImage} alt={category.name} width={500} height={500} style={{width: 50,height:50, margin: "auto"}}></Image>
        <Typography component="h2" sx={{mt:2}}>
          {category.name}
        </Typography>
      </Box>
    </Grid>
  );
}

export default Category;
