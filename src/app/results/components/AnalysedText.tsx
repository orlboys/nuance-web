"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const inputText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non fermentum erat, sit amet aliquam tellus. Etiam quis eleifend lorem, et egestas odio. Nulla diam lacus, semper in tincidunt ac, sodales ac est. Sed eu faucibus nulla. Ut a pellentesque massa. Pellentesque rhoncus purus a lectus finibus ornare. In eget augue lacus. Sed vitae volutpat ipsum. Proin vulputate orci mollis consectetur gravida. Etiam sagittis metus mauris, quis accumsan arcu accumsan in. Aenean condimentum eget orci dapibus efficitur. Suspendisse efficitur metus lorem, nec molestie eros gravida a. Sed rhoncus, orci vel tempor faucibus, ligula elit sagittis sapien, at consequat augue tellus in orci. Donec et molestie est. Nam magna nulla, gravida a urna id, feugiat dictum magna. Ut quam massa, ultrices eu venenatis eget, pulvinar vel felis. Donec vitae mauris nec dui tristique pellentesque. Aliquam porta in magna eu ullamcorper. Nulla facilisis tincidunt metus nec ullamcorper. Vestibulum lectus tellus, convallis non enim eu, ullamcorper consequat dolor. Vivamus aliquet nisl nec efficitur tincidunt. Quisque condimentum, justo vitae interdum consequat, dolor turpis fringilla arcu, non pharetra nisl nulla accumsan libero. Donec bibendum interdum tellus, rutrum finibus ante maximus consectetur. Etiam dui felis, iaculis eu nisl vel, egestas scelerisque nunc.";

interface AnalysedTextProps {
  maxHeight?: string | number;
  text?: string;
}

export function AnalysedText({
  maxHeight = "600px",
  text = inputText,
}: AnalysedTextProps) {
  const theme = useTheme();

  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        p: 3,
        maxWidth: "700px",
        mx: "auto",
        my: 4,
        bgcolor: "transparent",
        maxHeight: "80vh", // Prevent card from being too tall on small screens
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0, // Important for flex child with overflow
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, ml: 1 }} gutterBottom>
          Analysed Text
        </Typography>

        <Box
          sx={{
            maxHeight: maxHeight,
            overflowY: "auto",
            ml: 1,
            pr: 1, // Add some padding for the scrollbar
            // Custom scrollbar styling
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: theme.palette.grey[100],
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.grey[400],
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: theme.palette.grey[600],
              },
            },
            // Firefox scrollbar styling
            scrollbarWidth: "thin",
            scrollbarColor: `${theme.palette.grey[400]} ${theme.palette.grey[100]}`,
          }}
        >
          <Typography variant="body1">{text}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
