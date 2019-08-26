import React from "react";
import "typeface-roboto";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

function Privacy() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"By signing up, you agree to Book’s "}
      <Link color="inherit" href="#">
        Terms and Conditions
      </Link>
      {"& "}
      <Link color="inherit" href="#">
        Privacy Policy
      </Link>
    </Typography>
  );
}

export default Privacy