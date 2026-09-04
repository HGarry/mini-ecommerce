"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CustomBadge from "./CustomBadge";
import Link from "next/link";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          Shopper
        </Typography>
      </Link>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ width: "100%" }}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{ background: "linear-gradient(135deg, #BF00FF 0%, #7B00FF 100%)" }}
      >
        <Toolbar sx={{ justifyContent: "space-between", position: "relative" }}>
          {/* Left: Mobile Menu Icon */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Center on Mobile (xs) / Left-aligned on Desktop (sm) */}
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              color: "inherit",
              textDecoration: "none",
              fontWeight: "bold",
              // Mobile centering logic
              position: { xs: "absolute", sm: "static" },
              left: { xs: "50%", sm: "auto" },
              transform: { xs: "translateX(-50%)", sm: "none" },
              // Desktop layout logic
              flexGrow: { sm: 1 },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            Shopper
          </Typography>

          {/* Desktop Nav Items */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                href={item.path}
                sx={{ color: "#fff" }}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          {/* Right: Cart Badge */}
          <CustomBadge />
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
