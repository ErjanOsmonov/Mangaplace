import { Container, Grid } from "@mui/material";
import React from "react";

const Footer = () => {
  const faq = [
    "Our Contacts",
    "About us",
    "Terms & Conditions",
    "Privacy Policy",
    "Something else",
    "PERPKERJWOIJ",
  ];
  return (
    <div className="footer-body">
      <Container maxWidth="lg">
        <div className="footer-text">
          <p>
            В случае нарушения авторских прав обращайтесь на почту
            info@erjanLib.me
          </p>
        </div>
        <div className="footer-list">
          <ul>
            <Grid container>
              {faq.map((item) => (
                <Grid key={item} item xs={3} sm={3} md={2}>
                  {item}
                </Grid>
              ))}
            </Grid>
          </ul>
        </div>
        <div className="footer-copyright">
          <p>&copy;2025 ErjanLib</p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
