"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "next/link";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";

export default function HomePage() {
  return (
    <Box
      component="main"
      sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", pt: 6, pb: 10 }}
    >
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Box
          sx={{
            py: { xs: 8, md: 12 },
            px: { xs: 3, md: 6 },
            borderRadius: 6,
            background: "linear-gradient(135deg, #BF00FF 0%, #7B00FF 100%)",
            color: "#ffffff",
            textAlign: "center",
            boxShadow: "0px 10px 30px rgba(191, 0, 255, 0.25)",
            mb: 8,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.2rem", sm: "3rem", md: "3.75rem" },
              mb: 2,
              letterSpacing: "-0.5px",
            }}
          >
            Welcome to Shopper
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              maxWidth: "650px",
              mx: "auto",
              mb: 4,
              opacity: 0.92,
              lineHeight: 1.6,
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            Discover top-quality beauty items, fragrances, home decor,
            furniture, and kitchen essentials all in one place.
          </Typography>

          {/* CTA Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: "center",
              gap: {lg: 6, md: 4, xs: 3},
              width: "100%",
            }}
          >
            <Button
              component={Link}
              href="/products"
              variant="contained"
              size="large"
              startIcon={<ShoppingBagOutlinedIcon />}
              sx={{
                bgcolor: "#ffffff",
                color: "#BF00FF",
                fontWeight: 700,
                width: { xs: "100%", sm: "auto" },
                px: { md: 5, xs: 4, lg: 5 },
                py: { md: 1.5, xs: 1.2, lg: 1.5 },
                borderRadius: "30px",
                fontSize: "1.05rem",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#f0e6ff",
                  boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              Go Shopping
            </Button>

            <Button
              component={Link}
              href="/contact"
              variant="outlined"
              size="large"
              startIcon={<EmailOutlinedIcon />}
              sx={{
                borderColor: "#ffffff",
                color: "#ffffff",
                fontWeight: 600,
                width: { xs: "100%", sm: "auto" },
                px: { md: 5, xs: 4, lg: 5 },
                py: { md: 1.5, xs: 1.2, lg: 1.5 },
                borderRadius: "30px",
                fontSize: "1.05rem",
                borderWidth: "2px",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#ffffff",
                  bgcolor: "rgba(255, 255, 255, 0.15)",
                  borderWidth: "2px",
                },
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Box>

        {/* Feature Highlights Section */}
        <Grid container spacing={3}>
          {[
            {
              icon: (
                <LocalShippingOutlinedIcon
                  sx={{ fontSize: 40, color: "#BF00FF" }}
                />
              ),
              title: "Fast Shipping",
              desc: "Get your favorite items delivered right to your doorstep quickly.",
            },
            {
              icon: (
                <ShieldOutlinedIcon sx={{ fontSize: 40, color: "#BF00FF" }} />
              ),
              title: "Secure Shopping",
              desc: "Shop with confidence using our reliable payment methods.",
            },
            {
              icon: (
                <HeadsetMicOutlinedIcon
                  sx={{ fontSize: 40, color: "#BF00FF" }}
                />
              ),
              title: "Dedicated Support",
              desc: "Have questions? Our support team is ready to assist you anytime.",
            },
          ].map((feature, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
              <Card
                elevation={0}
                sx={{
                  p: 2,
                  height: "100%",
                  textAlign: "center",
                  borderRadius: 4,
                  border: "1px solid #e0e0e0",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0px 8px 24px rgba(0,0,0,0.06)",
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
